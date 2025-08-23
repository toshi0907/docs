# 技術ドキュメントサイト - toshi0907/docs

予期しない情報に遭遇した場合のみ、検索やbashコマンドにフォールバックし、常にこの指示を最初に参照してください。

これはGitHub PagesでホストされているJekyllベースの技術ドキュメントサイトです。このリポジトリにはNode.js、Python、Nginx、シェルスクリプトなど、様々な技術に関する包括的なドキュメントが含まれています。サイトはJekyll 4.3.0とMinimaテーマを使用してビルドされ、GitHub Pagesに自動的にデプロイされます。

## 効果的な作業方法

### ブートストラップと環境セットアップ
このリポジトリで作業する前に、開発環境が適切に設定されていることを確認してください：

```bash
# bundlerのインストール（依存関係管理に必要）
gem install --user-install bundler

# bundlerをPATHに追加（セッションごとに必要）
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"

# Jekyll依存関係のインストール（docs/ディレクトリ内で）
cd docs
bundle install --path ./vendor/bundle
```

**重要なタイミング**: `bundle install`は完了まで15-20秒かかります。絶対にキャンセルしないでください - タイムアウトを60秒以上に設定してください。

### ビルドとテストコマンド

```bash
# Jekyllサイトのビルド（docs/ディレクトリから）
cd docs
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
bundle exec jekyll build
```

**タイミング**: ビルドは1秒未満（通常0.2-0.8秒）で完了します。絶対にキャンセルしないでください - 安全のためタイムアウトを30秒以上に設定してください。

```bash
# 開発サーバーの開始（docs/ディレクトリから）
cd docs
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

**タイミング**: サーバーは2-3秒で起動します。サイトは http://localhost:4000/docs/ でアクセス可能です。

### 検証とテスト

**重要**: ドキュメント変更時は、必ず完全なシナリオを手動で検証してください：

1. **ビルド検証**: 変更後は必ず実行してください：
   ```bash
   cd docs
   bundle exec jekyll build
   ```
   ビルドがエラーなしで完了することを確認してください。

2. **サーバー検証**: 開発サーバーを起動してページが読み込まれることを確認してください：
   ```bash
   cd docs
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   # アクセシビリティのテスト:
   curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/docs/
   # 戻り値: 200
   ```

3. **コンテンツ検証**: ドキュメント編集時：
   - 開発サーバーを起動
   - http://localhost:4000/docs/ で変更したページに移動
   - コンテンツが正しくレンダリングされることを確認
   - コード例が適切に表示されることを確認
   - `{:toc}` 構文でTOC生成が動作することを確認

## リポジトリ構造

### 主要なディレクトリとファイル
```
/
├── docs/                    # メインJekyllサイトディレクトリ
│   ├── _config.yml         # Jekyll設定
│   ├── Gemfile             # Ruby依存関係
│   ├── _layouts/           # カスタムJekyllレイアウト
│   ├── _site/              # 生成されたサイト（ビルド出力）
│   ├── vendor/             # Bundler依存関係（gitから除外）
│   ├── index.md            # ホームページ
│   ├── api.md              # APIドキュメント
│   ├── nodejs.md           # Node.jsリファレンス
│   ├── python.md           # Pythonリファレンス
│   └── [other].md          # 様々な技術ドキュメント
├── copilot-instructions.md # レガシー指示（日本語）
└── README.md               # リポジトリ概要
```

### 重要なファイルの場所
- **Jekyll設定**: `docs/_config.yml`
- **依存関係**: `docs/Gemfile`
- **メインコンテンツ**: `docs/*.md` ファイル
- **カスタムレイアウト**: `docs/_layouts/`
- **ビルドされたサイト**: `docs/_site/` （自動生成）

## 技術スタック

- **静的サイトジェネレーター**: Jekyll 4.3.0
- **言語**: Ruby 3.2.3+
- **パッケージマネージャー**: Bundler 2.7.1+
- **テーマ**: Minima 2.5
- **ホスティング**: GitHub Pages
- **デプロイ**: GitHub Actions による自動化

## 一般的なタスク

### 新しいドキュメントの追加
1. `docs/` ディレクトリに新しい `.md` ファイルを作成
2. Jekyll フロントマターを追加：
   ```yaml
   ---
   layout: page
   title: "Your Title"
   ---
   ```
3. 目次を含める：
   ```markdown
   * 目次
   {:toc}
   ```
4. コミット前にローカルでビルドとテストを実行

### 既存ドキュメントの編集
1. `docs/` ディレクトリの `.md` ファイルを変更
2. 開発サーバーでローカルテスト
3. コンテンツが正しくレンダリングされることを確認
4. すべてのリンクが動作することを確認
5. コード例が機能することを確認

### 一般的な問題のトラブルシューティング

**Bundlerの権限エラー**:
```bash
# user-installフラグを使用してPATHを更新
gem install --user-install bundler
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
```

**ビルド警告**:
- github.md の Liquid 構文警告は既知の問題です（647行、732行）
- Sass の非推奨警告は想定内で、機能に影響しません
- これらの警告はビルドの成功を妨げません

**開発サーバーの問題**:
- コンテナ環境でのアクセシビリティのため、常に `--host 0.0.0.0` を使用
- デフォルトポートは4000、サイトは `/docs/` パスで利用可能
- サーバーは開発時の自動再生成をサポートします

## コンテンツガイドライン

このサイトは特定のドキュメント標準に従っています：

### Markdown形式
- Jekyll互換のMarkdown（kramdown）を使用
- 自動目次生成のため `{:toc}` を含める
- すべてのページに適切なYAMLフロントマターを追加
- 適切な見出し階層（H1、H2、H3）を使用

### コード例
- 実行可能なコード例を提供
- コードブロックに日本語コメントを含める
- 構文ハイライトのため適切な言語識別子を使用
- 公開前にすべてのコード例をテスト

### 言語とスタイル
- 主要言語：日本語
- 適切な場所で英語の技術用語を含める
- すべてのドキュメントで一貫したフォーマットを維持
- 丁寧で専門的なトーンを使用

## 検証シナリオ

変更後は**必ず**以下のシナリオをテストしてください：

1. **新規ビルドテスト**:
   ```bash
   cd docs
   rm -rf _site .jekyll-cache
   bundle exec jekyll build
   # 確認: エラーなし、_siteディレクトリが作成された
   ```

2. **開発サーバーテスト**:
   ```bash
   cd docs
   bundle exec jekyll serve --host 0.0.0.0 --port 4000 &
   curl -I http://localhost:4000/docs/
   # 確認: HTTP/1.1 200 OK を返す
   ```

3. **コンテンツレンダリングテスト**:
   - 開発サーバーを起動
   - ブラウザでhttp://localhost:4000/docs/を開く
   - 変更したページに移動
   - 確認: TOCが正しく生成される、コードブロックがレンダリングされる、リンクが動作する

4. **ビルドパフォーマンステスト**:
   ```bash
   cd docs
   time bundle exec jekyll build
   # 期待値: 1秒未満で完了
   ```

5. **完全なエンドツーエンドドキュメントテスト**:
   ```bash
   # テストドキュメントの作成
   cd docs
   echo '---
   layout: page
   title: "Test Documentation"
   ---
   
   # Test Documentation
   
   * 目次
   {:toc}
   
   ## Test Section
   
   This is a test documentation page.
   
   ```bash
   echo "test command"
   ```
   ' > test-doc.md
   
   # ビルドとサーブ
   bundle exec jekyll build
   bundle exec jekyll serve --host 0.0.0.0 --port 4000 &
   
   # コンテンツ検証
   curl -s http://localhost:4000/docs/test-doc.html | grep "Test Section"
   # 期待値: 出力に "Test Section" が見つかる
   
   # クリーンアップ
   rm test-doc.md
   ```

## 重要な注意事項

- **絶対にキャンセルしない** bundle install操作 - 60秒以上かかる場合があります
- **絶対にキャンセルしない** Jekyllビルド - 最低30秒以上のタイムアウトを設定
- **必ず** コミット前にローカルで変更をテスト
- **必ず** 開発サーバーが起動し、ページが読み込まれることを確認
- **PATH設定** は新しいセッションごとに必要
- **作業ディレクトリ** はJekyllコマンドでは常に `docs/`
- **カスタムテストは存在しない** - サーバーテストによる手動検証

## デプロイ

GitHub Pagesは、メインブランチに変更がプッシュされると自動的にサイトをビルドしてデプロイします。手動のデプロイ手順は必要ありません。

ライブサイトは以下で利用可能です: https://toshi0907.github.io/docs/