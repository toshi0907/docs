// @ts-check
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Pagefind の日本語検索を改善する Astro インテグレーション。
 *
 * Pagefind は索引作成時（Rust 側の形態素解析）と検索時（ブラウザの Intl.Segmenter）で
 * 日本語の単語分割の方法が異なるため、検索語が索引と一致せずヒットしないことがある。
 *   - カタカナ語: 索引は「リポジトリ」で 1 語だが、検索語は「リ|ポジ|トリ」に分割される
 *   - 漢字の複合語: 索引は「非|同期」や「正規表現」、検索語は「非同期」や「正規|表現」になる
 *
 * そこでビルド後の Pagefind のスクリプトを書き換え、日本語を含む検索語は次の 3 通りで
 * 検索して結果を統合する（同じページは最も高いスコアのものを残す）。
 *   1. 通常: Intl.Segmenter で分割し、連続するカタカナの断片は 1 語に結合する
 *   2. whole: 分割せずに検索する（「正規表現」のような複合語の索引に前方一致させる）
 *   3. fine: 通常の分割に加え、3 文字の漢字語を「1 文字 + 2 文字」に分割する（「非|同期」）
 *
 * Starlight が Pagefind の索引を生成した後に実行されるよう、starlight() より後に登録すること。
 * @returns {import('astro').AstroIntegration}
 */
export default function pagefindJapanese() {
	const helper = [
		'var __jaKatakana=/^[\\u30A1-\\u30FA\\u30FC-\\u30FF]+$/;',
		'var __jaKanji3=/^[\\u4E00-\\u9FFF\\u3005]{3}$/;',
		// 検索語の分割結果を補正する（カタカナの結合と、fine モードでの漢字 3 文字語の分割）
		'var __jaSegments=(segments,mode)=>{const out=[];for(const s of segments){const last=out[out.length-1];',
		'if(last&&__jaKatakana.test(last.segment)&&__jaKatakana.test(s.segment)){last.segment+=s.segment;}',
		'else if(mode==="fine"&&__jaKanji3.test(s.segment)){out.push({segment:s.segment.slice(0,1)},{segment:s.segment.slice(1)});}',
		'else{out.push({segment:s.segment});}}return out;};',
		// 日本語を含む検索語なら 3 通りのモードで検索する
		'var __jaModes=(term)=>typeof term==="string"&&/[\\u3040-\\u30FF\\u4E00-\\u9FFF]/.test(term)&&!/^\\s*".+"\\s*$/.test(term)?[null,"whole","fine"]:[null];',
		// スコア順に並んだ結果から重複ページを除く
		'var __jaDedupe=()=>{const seen=new Set();return(r)=>{if(seen.has(r.id))return false;seen.add(r.id);return true;};};',
		'',
	].join('\n');

	// 検索語の分割処理（PagefindInstance#search 内）。オプション引数の変数名はバンドルごとに異なるため
	// `$OPTS` を実際の変数名に置き換えて適用する
	/** @type {Array<[string, string, string]>} [ファイル, 置換対象, 置換後] */
	const patches = [];
	for (const file of ['pagefind.js', 'pagefind-worker.js']) {
		patches.push(
			[
				file,
				'if(needsWordSegmentation(trueLanguage)){',
				'if(needsWordSegmentation(trueLanguage)&&$OPTS.__jaMode!=="whole"){',
			],
			[
				file,
				'for(const{segment:word}of wordSegmenter.segment(term))',
				'for(const{segment:word}of __jaSegments(wordSegmenter.segment(term),$OPTS.__jaMode))',
			],
		);
	}
	// 検索の入口（メインスレッド側のみ）。Web Worker 経由の PagefindWrapper#search と、
	// Worker が使えない場合の Pagefind#search の両方で 3 通りの検索結果を統合する
	patches.push(
		[
			'pagefind.js',
			'async search(term,options2={}){const results=await this.sendMessage("search",[term,options2]);',
			'async search(term,options2={}){if(!options2.__jaMode&&__jaModes(term).length>1){const all=await Promise.all(__jaModes(term).map((m)=>this.search(term,{...options2,__jaMode:m??"default"})));const merged=all[0];merged.results=all.flatMap((r)=>r.results).sort((a,b)=>b.score-a.score).filter(__jaDedupe());return merged;}const results=await this.sendMessage("search",[term,options2]);',
		],
		[
			'pagefind.js',
			'async search(term,options2={}){let search2=await Promise.all(this.instances.map((i2)=>i2.search(term,options2)));',
			'async search(term,options2={}){let search2=await Promise.all((options2.__jaMode?[null]:__jaModes(term)).flatMap((m)=>this.instances.map((i2)=>i2.search(term,m?{...options2,__jaMode:m}:options2))));',
		],
		[
			'pagefind.js',
			'const results=search2.map((s)=>s.results).flat().sort((a,b)=>b.score-a.score);',
			'const results=search2.map((s)=>s.results).flat().sort((a,b)=>b.score-a.score).filter(__jaDedupe());',
		],
	);

	return {
		name: 'pagefind-ja',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				/** @type {Map<string, string>} */
				const sources = new Map();
				for (const [file, target, replacement] of patches) {
					const src = sources.get(file) ?? (await readFile(fileURLToPath(new URL(`pagefind/${file}`, dir)), 'utf-8'));
					const opts = src.match(/async search\(term,(\w+)=\{\}\)\{\1=\{verbose:false/)?.[1];
					if (!opts || src.split(target).length !== 2) {
						// Pagefind の更新で該当箇所が変わった場合に気付けるよう、ビルドを失敗させる
						throw new Error(
							`[pagefind-ja] ${file} に置換対象のコードが 1 箇所だけ見つかりませんでした: ${target}\n` +
								'Pagefind の更新に合わせて src/integrations/pagefind-ja.mjs のパッチを見直してください。',
						);
					}
					sources.set(file, src.replace(target, replacement.replaceAll('$OPTS', opts)));
				}
				for (const [file, src] of sources) {
					await writeFile(fileURLToPath(new URL(`pagefind/${file}`, dir)), helper + src);
				}
				logger.info('Pagefind の日本語検索を補正しました');
			},
		},
	};
}
