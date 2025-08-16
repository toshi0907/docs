---
layout: page
title: "GitHub Pagesセットアップガイド"
---

# GitHub Pagesセットアップガイド

このフォルダには、GitHub Pagesで公開するためのJekyll設定とドキュメントが含まれています。

* 目次
{:toc}

## GitHub Pagesの有効化手順

1. GitHubリポジトリの「Settings」タブに移動
2. 左サイドバーの「Pages」をクリック
3. 「Source」セクションで以下を設定：
   - Source: **Deploy from a branch**
   - Branch: **main** (またはメインブランチ)
   - Folder: **/ (root)** から **docs** に変更
4. 「Save」をクリック

## 設定後

- サイトのURLは `https://[username].github.io/[repository-name]/` になります
- 変更をプッシュすると自動的にサイトが更新されます
- Jekyll Actionsにより自動ビルドされます

## ローカルでのテスト

```bash
cd docs
bundle install
bundle exec jekyll serve
```

ローカルでは `http://localhost:4000/docs/` でサイトを確認できます。