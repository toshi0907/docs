# 検索機能 - Pagefind実装ガイド

この文書では、Jekyll技術ドキュメントサイトに実装されたPagefind検索機能について説明します。

## 概要

- **検索エンジン**: Pagefind v1.3.0
- **インデックス対象**: 18ページ、5516語（日本語対応）
- **UI配置**: ヘッダーナビゲーション内
- **GitHub Pages互換**: 静的ファイル生成

## 実装された機能

### 検索インターフェース
- ヘッダーナビゲーションに統合された検索ボックス
- 2文字以上の入力で検索開始
- リアルタイム検索結果表示
- 最大5件の検索結果表示

### レスポンシブ対応
- デスクトップ・モバイル両対応
- モバイルでは検索結果がfull-width表示
- 検索ボックスのサイズ調整

### スタイリング
- サイトテーマに調和するデザイン
- ホバー効果とクリックハンドリング
- 検索結果のハイライト表示

## ファイル構成

### 追加されたファイル
```
docs/
├── package.json                 # Node.js依存関係
├── _includes/                   # カスタムJekyllインクルード
│   ├── header.html             # 検索ボックス統合
│   ├── head.html               # CSS読み込み
│   └── (other includes)
├── _layouts/
│   └── default.html            # 検索JavaScript統合
├── assets/
│   ├── main.scss               # カスタムスタイリング
│   └── css/style.scss          # 追加スタイル
└── .gitignore                  # Node.js除外設定
```

### 生成されるファイル
```
_site/
└── pagefind/                   # Pagefind生成ファイル
    ├── pagefind.js             # 検索APIコア
    ├── pagefind-ui.js          # UI コンポーネント
    ├── pagefind-ui.css         # UIスタイル
    ├── index/                  # インデックスファイル
    ├── fragment/               # コンテンツフラグメント
    └── (other files)
```

## ビルドプロセス

### コマンド
```bash
# 完全ビルド（Jekyll + Pagefind）
npm run build

# Jekyllのみビルド
npm run serve

# 検索インデックスのみ再生成
npm run search-index
```

### 自動化
1. **Jekyll ビルド**: サイトの静的生成
2. **Pagefind インデックス**: コンテンツのインデックス化
3. **ファイル出力**: `_site/pagefind/` に検索ファイル生成

## 技術仕様

### 検索対象
- 全markdownページ（.md ファイル）
- ページタイトル、本文内容
- 日本語コンテンツ対応（ステミング未対応）

### パフォーマンス
- インデックスサイズ: 軽量化
- 検索速度: 高速レスポンス
- モバイル最適化: 効率的読み込み

### ブラウザ対応
- モダンブラウザ（ES6+ JavaScript）
- モバイルブラウザ
- Internet Explorer非対応

## 使用方法

### エンドユーザー
1. ヘッダーの検索ボックスに2文字以上入力
2. リアルタイムで検索結果が表示
3. 結果をクリックして該当ページへ移動
4. 検索ボックス外をクリックで結果を非表示

### 開発者
```bash
# 開発環境セットアップ
cd docs
npm install

# 開発サーバー起動
npm run serve

# プロダクションビルド
npm run build
```

## GitHub Pages デプロイ

### 自動デプロイ
GitHub Actions により自動的にビルド・デプロイされます。

### 手動デプロイ
```bash
# ローカルビルド
npm run build

# 生成されたファイルをcommit
git add .
git commit -m "Update search index"
git push
```

## トラブルシューティング

### よくある問題

**検索ボックスが表示されない**
- JavaScript が正しく読み込まれているか確認
- ブラウザのコンソールでエラーを確認

**検索結果が表示されない**
- Pagefind インデックスが生成されているか確認
- `/pagefind/` ディレクトリの存在を確認

**モバイルで検索結果が見切れる**
- レスポンシブCSSが適用されているか確認
- ビューポート設定を確認

### デバッグコマンド
```bash
# インデックス再生成
npx pagefind --site _site

# 詳細ログ出力
npx pagefind --site _site --verbose

# サーバー起動（デバッグ用）
python3 -m http.server 4000
```

## 今後の拡張

### 検討中の機能
- フィルター機能（カテゴリ別検索）
- 検索履歴保存
- 検索結果のハイライト強化
- 音声検索対応
- 検索統計収集

### パフォーマンス改善
- インデックス最適化
- 遅延読み込み実装
- キャッシュ戦略改善

---

*この文書は検索機能の実装と同時に作成されました。*
*最終更新: 2025年8月23日*