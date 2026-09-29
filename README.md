# docs

各種技術ドキュメント保存用のリポジトリです。[Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) で構築しています。

サイトは以下の URL で公開されています：
https://toshi0907.github.io/docs/

## 主な機能

- 日本語の全文検索（Pagefind。`Ctrl` + `K` / `⌘` + `K`）
- ダークモード／ライトモードの切り替え
- 右サイドバーの自動目次、カテゴリ別のサイドバー
- コードブロックのシンタックスハイライトとコピーボタン
- ビルド時の内部リンク検証

## ローカルでの開発

Node.js 22.12 以上が必要です。

```bash
npm ci
npm run dev      # http://localhost:4321/docs/
npm run build    # dist/ に出力
npm run preview  # ビルド結果の確認（全文検索はここで動作）
```

## ディレクトリ構成

```
src/content/docs/
├── index.mdx     トップページ
├── languages/    プログラミング言語
├── web/          Web 開発
├── tools/        開発ツール
├── infra/        Linux・サーバー
└── qa/           Issue で寄せられた質問への回答
```

ページ作成のルールは [claude-instructions.md](claude-instructions.md) を参照してください。

## デプロイ

`main` ブランチへのプッシュで GitHub Actions が自動的にビルドし、GitHub Pages にデプロイします。
