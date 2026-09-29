// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import pagefindJapanese from './src/integrations/pagefind-ja.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://toshi0907.github.io',
	base: '/docs',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: '技術ドキュメント集',
			description: '各種技術ドキュメントとリファレンス',
			defaultLocale: 'root',
			locales: {
				root: { label: '日本語', lang: 'ja' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/toshi0907/docs' },
			],
			editLink: {
				baseUrl: 'https://github.com/toshi0907/docs/edit/main/',
			},
			lastUpdated: true,
			customCss: [
				'@fontsource-variable/noto-sans-jp',
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/custom.css',
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			expressiveCode: {
				themes: ['github-dark', 'github-light'],
				styleOverrides: { borderRadius: '0.5rem' },
			},
			plugins: [starlightLinksValidator(), starlightImageZoom()],
			// サイドバー: カテゴリごとのグループ。新規ページはここに slug を追加する
			// （Q&A と分割ページのディレクトリは autogenerate で自動追加される）
			sidebar: [
				{
					label: 'プログラミング言語',
					items: [
						'languages/python',
						'languages/javascript',
						'languages/csharp',
						{ label: 'シェルスクリプト', collapsed: true, items: [{ autogenerate: { directory: 'languages/shellscript' } }] },
						'languages/bat',
						'languages/regexp',
					],
				},
				{
					label: 'Web 開発',
					items: [
						'web/html',
						'web/css',
						{ label: 'Node.js', collapsed: true, items: [{ autogenerate: { directory: 'web/nodejs' } }] },
						'web/api',
						'web/gas',
					],
				},
				{
					label: '開発ツール',
					items: [
						{ label: 'Git', collapsed: true, items: [{ autogenerate: { directory: 'tools/git' } }] },
						'tools/github',
						'tools/vscode',
						'tools/gdb',
						'tools/jekyll',
					],
				},
				{
					label: 'Linux・サーバー',
					items: ['infra/linux', 'infra/nginx', 'infra/termux'],
				},
				{ label: 'Q&A', collapsed: true, items: [{ autogenerate: { directory: 'qa' } }] },
			],
		}),
		// Starlight による Pagefind の索引生成後に実行する必要があるため、starlight() の後に置く
		pagefindJapanese(),
	],
});
