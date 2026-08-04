# CLAUDE.md

このファイルは、このリポジトリで作業する際のClaude Code（claude.ai/code）向けのガイダンスです。

## リポジトリの目的

これはJekyllベースの技術ドキュメントサイト（`各種ドキュメント保存用`）で、GitHub Pagesにより https://toshi0907.github.io/docs/ で公開されています。アプリケーションコードは存在せず、成果物は `docs/` 配下のMarkdownリファレンスページと、それをレンダリングするJekyllの設定・テーマです。このリポジトリにテストやリンターはなく、「正しさ」とはサイトがエラーなくビルドでき、ページが期待通りにレンダリングされることを意味します。

## リポジトリ構成

- `docs/` — 実際のJekyllサイトのルート（ビルド・サーブされるのはここであり、リポジトリのルートではない）
  - `_config.yml` — Jekyll設定。`header_pages:` がナビバーのページ順序を制御する
  - `Gemfile` — Rubyの依存関係（Jekyll 4.3.0、Minimaテーマ、jekyll-feed、jekyll-sitemap）
  - `_layouts/`, `_includes/` — カスタムレイアウト（`default.html`、`doc.html`、`page.html`）とパーツ（`head.html`、`header.html`）
  - `assets/js/search.js`, `assets/css/search.css`, `search.json` — クライアントサイド検索（コレクションから生成される `/docs/search.json` を取得する）
  - `index.md` — 手動のドキュメント一覧を持つホームページ（`_config.yml` の `header_pages` と同期させる必要がある）
  - `<topic>.md`（api, git, github, gdb, html, css, javascript, nodejs, python, csharp, regexp, nginx, shellscript, bat, jekyll, linux, termux, vscode, gas, ...）— 技術ごとの個別リファレンスドキュメント
  - `qa.md` — IssueでのQ&Aのハブページ。個別の回答ページ（`qa/<issue番号>-<スラッグ>.md`）への一覧リンクを持つ
  - `qa/` — Issueからの質問に対する個別回答ページを格納するディレクトリ（`header_pages`やホームページの一覧には載せず、`qa.md`からのみリンクする）
- `copilot-instructions.md`（リポジトリルート）— `docs/*.md` 配下のページ向けの日本語コンテンツ作成ガイドライン（TOC、フロントマター、文体、Liquid構文のエスケープ、Issueからの回答ページ作成手順など）。下記のコンテンツ規約はこのファイルに由来する
- `.github/ISSUE_TEMPLATE/question.md` — 技術的な質問用のIssueテンプレート（回答は`docs/qa/`配下のページとして作成される）
- `.vscode/tasks.json` — 下記のJekyllビルド・サーブコマンドを実行するVS Codeビルドタスク

## ビルド・サーブコマンド

Jekyllコマンドは必ずリポジトリルートではなく `docs/` サブディレクトリから実行してください。

```bash
cd docs

# 初回のみ: このユーザー用にbundlerをインストールし、PATHに追加する（新しいシェルセッションのたびに必要）
gem install --user-install bundler
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"

# gemのインストール（初回は15〜20秒程度かかる。キャンセルせず60秒以上のタイムアウトを設定すること）
bundle install --path ./vendor/bundle

# サイトのビルド（通常1秒未満で完了する。キャンセルせず30秒以上のタイムアウトを設定すること）
bundle exec jekyll build

# ローカルでライブリロード付きサーブ。コンテナ内から到達できるよう0.0.0.0にバインドする
bundle exec jekyll serve --host 0.0.0.0 --port 4000
# サイトは http://localhost:4000/docs/ で確認できる（baseurlが /docs/ である点に注意）
```

テストスイートやリンターは存在しません。検証方法は「ビルドがエラーなく成功すること」、そして「`jekyll serve` を起動した状態で手動確認すること（TOCが生成される、コードブロックがレンダリングされる、リンクが機能する）」です。

既知の想定内のビルド出力（エラーではない）: `github.md`（`${{ ... }}` というGitHub Actions構文を説明している）に起因するLiquid構文の警告、およびMinimaテーマによるSassの非推奨警告。

## コンテンツ規約（`copilot-instructions.md` より）

`docs/*.md` 配下のページを追加・編集する際は以下に従ってください。

- すべてのページにJekyllのフロントマター（`layout: page` と `title`）が必要です。
- すべてのページにJekyll/kramdownの自動TOC生成機能を使った目次が必要です。フロントマターの直後に `* 目次` と `{:toc}` を配置してください。手動でリスト形式の目次を書いてはいけません（見出しと同期しなくなります）。
- 本文は日本語（丁寧語）で記述し、必要に応じて英語の専門用語をインラインで併記します（例: `shebang（シバン）`）。
- GitHub Actionsの `${{ ... }}`、Docker Composeの `${VAR}`、Helmの `{{ .Values }}` など、Jekyllの Liquid パーサーと衝突するテンプレート構文を文書化する場合は、コードブロックを `{% raw %} ... {% endraw %}` で囲み、Jekyllが評価しないようにしてください。
- 新規ページを追加する場合、ナビゲーションの整合性を保つために2箇所の追加編集が必要です。`docs/_config.yml` の `header_pages:` にファイル名を追加すること、および `docs/index.md` の一覧に対応するリンクを追加すること。両方で並び順を揃えてください。
- 各技術ページの末尾には `## 参考資料`（参考資料）セクションを配置し、`### 公式ドキュメント` / `### 学習リソース` / `### ツールとライブラリ`（任意で `### ベストプラクティス・参考文献`）に分けます。`copilot-instructions.md` 自体には参考リンクを含めず、ルール・ガイドラインのみを記載します。

## Issueからの回答ページ作成

技術ページ全体の新規作成・更新を依頼するIssue（例：「git.mdの更新」）とは別に、単発の技術的な質問（例：「◯◯するにはどうすればいいか」）がIssueとして起票された場合は、既存ページを編集せず専用の回答ページを作成します。

1. `docs/qa/<issue番号>-<内容を表す英字スラッグ>.md` を作成する（フロントマターに `layout: page`、`title`、由来のIssue番号を示す `issue:` を含める）
2. 本文は `* 目次` + `{:toc}` の後、`## 質問` でIssue内容を要約し、`## 回答` に具体的な回答を書く（`## 参考資料` は必要な場合のみ）
3. `docs/qa.md` の「質問一覧」に作成したページへのリンクをIssue番号の降順で追記する
4. `docs/qa/` 配下の個別の回答ページは `header_pages:` や `index.md` には追加しない — ナビゲーションには `qa.md`（ハブページ）のみを掲載する
5. Issueには回答ページへのリンクをコメントし、クローズする

詳細は `copilot-instructions.md` の「Issueからの回答ページ作成」セクションを参照してください。

## デプロイ

GitHub Pagesは、mainブランチへのプッシュ時に `docs/` フォルダから自動的にサイトをビルド・デプロイします（Pagesの「Deploy from a branch」ソース）。このリポジトリにGitHub Actionsワークフローはなく、手動のデプロイ手順もありません。
