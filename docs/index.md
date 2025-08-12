---
layout: page
title: "技術ドキュメント集"
permalink: /
---

# 技術ドキュメント集

各種技術に関するドキュメントとリファレンスをまとめています。

## 検索

<div style="margin: 20px 0;">
  <input type="text" id="search-input-home" placeholder="ドキュメントを検索..." style="width: 100%; max-width: 400px; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px;">
  <div style="margin-top: 10px;">
    <a href="{{ '/search/' | relative_url }}" style="color: #2a7ae4; text-decoration: none;">詳細検索ページ →</a>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input-home');
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const query = encodeURIComponent(this.value);
          window.location.href = '{{ "/search/" | relative_url }}?q=' + query;
        }
      });
    }
  });
</script>

## ドキュメント一覧

- **[Git リファレンス](git.html)** - Gitの基本的な使い方とコマンドのリファレンス
- **[Node.js リファレンス](nodejs.html)** - Node.jsの基本的な使い方とAPIリファレンス
- **[Python リファレンス](python.html)** - Pythonの基本的な使い方とライブラリリファレンス
- **[Nginx リファレンス](nginx.html)** - Nginxの設定とコマンドリファレンス
- **[Shell Script リファレンス](shellscript.html)** - シェルスクリプトの基本的な書き方とコマンド
- **[バッチファイル リファレンス](bat.html)** - Windowsバッチファイルの基本的な使い方
- **[Jekyll リファレンス](jekyll.html)** - Jekyll の基本的な使い方と GitHub Pages でのベストプラクティス

---

*最終更新: {{ site.time | date: "%Y年%m月%d日" }}*