# CLAUDE.md

このファイルは、このリポジトリで作業する際のClaude Code（claude.ai/code）向けのガイダンスです。

## リポジトリの目的

これは Astro + Starlight で構築した技術ドキュメントサイト（`技術ドキュメント集`）で、GitHub Pages により https://toshi0907.github.io/docs/ で公開されています。アプリケーションコードは存在せず、成果物は `src/content/docs/` 配下の Markdown リファレンスページと、それをレンダリングする Astro / Starlight の設定です。テストスイートはなく、「正しさ」とはサイトがエラーなくビルドでき（内部リンク検証を含む）、ページが期待通りにレンダリングされることを意味します。

## リポジトリ構成

- `astro.config.mjs` — Astro / Starlight の設定。`site` + `base: '/docs'`、日本語ロケール、`sidebar`（ナビゲーションの構成と順序）、プラグイン（`starlight-links-validator`、`starlight-image-zoom`）を定義する
- `src/content.config.ts` — コンテンツコレクションの定義。Starlight 標準スキーマに Q&A 用の `issue` フィールドを追加している
- `src/content/docs/` — ページ本体（ここに置いた `.md` / `.mdx` がそのまま URL になる）
  - `index.mdx` — トップページ（splash テンプレート、カテゴリ別のカード一覧）
  - `languages/` — プログラミング言語（python, javascript, csharp, bat, regexp, `shellscript/`）
  - `web/` — Web 開発（html, css, api, gas, `nodejs/`）
  - `tools/` — 開発ツール（github, vscode, gdb, jekyll, `git/`）
  - `infra/` — Linux・サーバー（linux, nginx, termux）
  - `qa/` — Issue からの質問への回答ページ。`qa/index.md` がハブページ
  - `404.md` — 404 ページ
  - 大きなページ（git, nodejs, shellscript）はディレクトリに分割されており、`index.md` が概要ページ、他はトピックごとのサブページ
- `src/components/DocCard.astro` — トップページのカードコンポーネント
- `src/integrations/pagefind-ja.mjs` — Pagefind の日本語検索を補正する Astro インテグレーション（後述）
- `src/content/i18n/ja.json` — Starlight に日本語訳がない UI 文字列（検索結果の文言など）の上書き
- `src/styles/custom.css` — フォント、アクセントカラー、トップページ用のスタイル
- `public/` — 静的ファイル。`favicon.svg` と、旧 Jekyll URL（`/docs/git.html` など）から新 URL へのリダイレクト用 HTML
- `claude-instructions.md` — `src/content/docs/` 配下のページ向けの日本語コンテンツ作成ガイドライン（フロントマター、文体、リンクの書き方、Issueからの回答ページ作成手順など）。下記のコンテンツ規約はこのファイルに由来する
- `.github/workflows/deploy.yml` — ビルドと GitHub Pages へのデプロイ
- `.github/ISSUE_TEMPLATE/question.md` — 技術的な質問用のIssueテンプレート（回答は `src/content/docs/qa/` 配下のページとして作成される）
- `.vscode/tasks.json` — ビルド・開発サーバーを実行する VS Code タスク

## ビルド・開発コマンド

コマンドはリポジトリルートで実行します（Node.js 22.12 以上）。

```bash
# 依存関係のインストール
npm ci

# 開発サーバー（ライブリロード付き。0.0.0.0 にバインド）
npm run dev
# サイトは http://localhost:4321/docs/ で確認できる（base が /docs である点に注意）

# 本番ビルド（dist/ に出力。Pagefind の検索インデックス生成と内部リンク検証も行う）
npm run build

# ビルド結果のプレビュー（全文検索はビルド後のプレビューでのみ動作する）
npm run preview
```

検証方法は「`npm run build` がエラーなく成功すること」（`starlight-links-validator` によりサイト内リンク切れがあるとビルドが失敗する）、そして必要に応じて `npm run preview` で表示と検索を確認することです。

既知の想定内のビルド出力（エラーではない）: `` Could not render `/404` from route `/[...slug]` `` の警告（カスタム 404 ページ `src/content/docs/404.md` を使っているため）と、`index.mdx` に関する Vite の `MODULE_LEVEL_DIRECTIVE` 警告。

全文検索は Starlight 標準の Pagefind を使用しています。Pagefind は索引作成時と検索時で日本語の単語分割方法が異なり、カタカナ語や漢字の複合語がヒットしにくいため、`src/integrations/pagefind-ja.mjs` がビルド後に Pagefind のスクリプトを書き換えて補正しています。Pagefind の更新でパッチ対象のコードが見つからなくなった場合はビルドが失敗するので、その際はこのファイルを見直してください。

## コンテンツ規約（`claude-instructions.md` より）

`src/content/docs/` 配下のページを追加・編集する際は以下に従ってください。

- すべてのページにフロントマター（`title` と `description`）が必要です。`layout` は書きません。長いタイトルには `sidebar.label` で短い表示名を付けます。
- 本文は H2（`##`）から始めます。H1 はフロントマターの `title` から自動表示され、目次は右サイドバーに自動生成されるため、H1・手動目次・`* 目次` + `{:toc}` は書きません。
- 本文は日本語（丁寧語）で記述し、必要に応じて英語の専門用語をインラインで併記します（例: `shebang（シバン）`）。
- GitHub Actions の `${{ ... }}` などのテンプレート構文は、`.md` ファイルではエスケープ不要でそのまま書けます（`{% raw %}` は不要）。`.mdx` では `{}` が式として解釈されるため、テンプレート構文を含むページは `.md` で作成します。
- サイト内リンクは `/docs/` から始まる絶対パス・末尾スラッシュ付きで書きます（例: `/docs/infra/linux/`、`/docs/languages/shellscript/#配列`）。
- 新規ページを追加する場合、ナビゲーションの整合性を保つために2箇所の追加編集が必要です。`astro.config.mjs` の `sidebar` の該当カテゴリに slug を追加すること、および `src/content/docs/index.mdx` の該当カテゴリに `<DocCard>` を追加すること。両方で並び順を揃えてください（分割ページのディレクトリと `qa/` は `autogenerate` のためサイドバーの編集は不要）。
- おおむね 2,000 行を超えるページはディレクトリに分割し、`index.md`（概要）とサブページ（`sidebar.order` で並び順を指定）で構成します。
- 各技術ページの末尾には `## 参考資料`（参考資料）セクションを配置し、`### 公式ドキュメント` / `### 学習リソース` / `### ツールとライブラリ`（任意で `### ベストプラクティス・参考文献`）に分けます。`claude-instructions.md` 自体には参考リンクを含めず、ルール・ガイドラインのみを記載します。

## Issueからの回答ページ作成

技術ページ全体の新規作成・更新を依頼するIssue（例：「git.mdの更新」）とは別に、単発の技術的な質問（例：「◯◯するにはどうすればいいか」）がIssueとして起票された場合は、既存ページを編集せず専用の回答ページを作成します。

1. `src/content/docs/qa/<issue番号>-<内容を表す英字スラッグ>.md` を作成する（フロントマターに `title`、`description`、由来のIssue番号を示す `issue:`、`sidebar.order: -<issue番号>` を含める）
2. 本文は `## 質問` でIssue内容を要約し、`## 回答` に具体的な回答を書く（`## 参考資料` は必要な場合のみ）
3. `src/content/docs/qa/index.md` の「質問一覧」に作成したページへのリンクをIssue番号の降順で追記する
4. `qa/` 配下はサイドバーの「Q&A」グループに自動で追加されるため、`astro.config.mjs` やトップページは編集しない
5. Issueには回答ページへのリンクをコメントし、クローズする

詳細は `claude-instructions.md` の「Issueからの回答ページ作成」セクションを参照してください。

## デプロイ

`main` ブランチへのプッシュ時に GitHub Actions（`.github/workflows/deploy.yml`、`withastro/action`）がサイトをビルドし、GitHub Pages にデプロイします（Pages のソースは「GitHub Actions」）。プルリクエストではビルド（リンク検証を含む）のみが実行されます。手動のデプロイ手順はありません。
