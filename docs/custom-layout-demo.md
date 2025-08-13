---
layout: doc
title: "カスタムレイアウトデモ"
description: "新しく追加されたJekyllカスタムレイアウトの機能を紹介するデモページです"
category: "デモ"
tags: ["Jekyll", "レイアウト", "GitHub Pages"]
last_modified_at: 2024-08-13
---

# カスタムレイアウトデモ

このページは新しく追加されたJekyllカスタムレイアウトの機能を紹介するためのデモページです。

## 🎯 新機能の概要

今回追加されたカスタムレイアウトには以下の機能が含まれています：

### 1. 拡張されたページレイアウト (`page.html`)

- **自動目次生成**: ページ内のH2-H4見出しから自動的に目次を生成
- **日本語最適化**: 言語設定がデフォルトで日本語に設定
- **メタデータ表示**: 更新日時や作成日時の自動表示

### 2. ドキュメント専用レイアウト (`doc.html`)

- **パンくずナビ**: ホームからの階層表示
- **タグ・カテゴリ表示**: フロントマターで指定したタグとカテゴリの表示
- **拡張されたTOC**: より見やすい目次デザイン
- **フッターナビゲーション**: ドキュメント一覧への戻りリンク

### 3. 拡張されたデフォルトレイアウト (`default.html`)

- **スムーズスクロール**: アンカーリンクのスムーズスクロール機能
- **コピーボタン**: コードブロックに自動的にコピーボタンを追加

## 📝 使用方法

### ページレイアウトの使用

```yaml
---
layout: page
title: "ページタイトル"
description: "ページの説明（オプション）"
---
```

### ドキュメントレイアウトの使用

```yaml
---
layout: doc
title: "ドキュメントタイトル"
description: "ドキュメントの説明"
category: "カテゴリ名"
tags: ["タグ1", "タグ2"]
last_modified_at: 2024-08-13
---
```

### 目次の無効化

デフォルトでは目次が自動生成されますが、以下のように無効化できます：

```yaml
---
layout: page
title: "目次なしページ"
toc: false
---
```

## 🎨 デザインの特徴

### カラーパレット

- **プライマリカラー**: <span style="color: #007bff; font-weight: bold;">#007bff</span> (ブルー)
- **セカンダリカラー**: <span style="color: #6c757d; font-weight: bold;">#6c757d</span> (グレー)
- **アクセントカラー**: <span style="color: #28a745; font-weight: bold;">#28a745</span> (グリーン)

### タイポグラフィ

- **見出し**: 階層構造を明確にするカラーリング
- **コード**: 視認性の高い背景色とボーダー
- **引用**: 左側の青いボーダーで強調

## 📚 コードサンプル

以下は JavaScript のサンプルコードです（コピーボタン機能をお試しください）：

```javascript
// 目次生成の JavaScript サンプル
document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('h2, h3, h4');
  const toc = document.getElementById('toc');
  
  if (headings.length > 0 && toc) {
    const tocList = document.createElement('ul');
    headings.forEach(function(heading, index) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
    toc.appendChild(tocList);
  }
});
```

## 📊 表の例

| 機能 | ページレイアウト | ドキュメントレイアウト |
|------|------------------|------------------------|
| 目次生成 | ✅ | ✅ |
| パンくずナビ | ❌ | ✅ |
| タグ表示 | ❌ | ✅ |
| 拡張スタイル | ❌ | ✅ |

## 💡 ベストプラクティス

> **ヒント**: ドキュメントレイアウトは技術文書や詳細なリファレンスに最適です。
> 一般的なページにはページレイアウトを使用してください。

### 推奨事項

1. **適切なレイアウト選択**: コンテンツの性質に応じてレイアウトを選択
2. **メタデータの活用**: タイトル、説明、タグを適切に設定
3. **見出し構造**: H2-H4を適切に使用して読みやすい構造を作成

## 🔧 GitHub Pages での動作

これらのカスタムレイアウトは GitHub Pages で完全に動作します：

- 静的サイト生成時に適用
- JavaScript 機能も正常に動作
- モバイルレスポンシブ対応

## まとめ

新しいカスタムレイアウトにより、Jekyll サイトの機能性と見栄えが大幅に向上しました。ぜひ適切なレイアウトを選択してご活用ください！