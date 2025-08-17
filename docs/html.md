---
layout: page
title: "HTML リファレンス"
---

# HTML リファレンス

HTMLの基本的な使い方から応用まで、Webページ作成に必要な知識を体系的に説明します。初学者でも理解しやすいように段階的に解説します。

* 目次
{:toc}

## 基本概念

### HTML とは

**HTML（HyperText Markup Language）** は、Webページの構造と内容を定義するマークアップ言語です。1990年代初頭にTim Berners-Leeによって開発され、現在はWorld Wide Web Consortium（W3C）によって標準化されています。

**特徴:**
- テキストベースのマークアップ言語
- タグを使用してコンテンツの意味と構造を定義
- ブラウザによって解釈・表示される
- CSS（スタイル）やJavaScript（動作）と組み合わせて使用
- プラットフォーム独立

### HTML の役割

HTMLは以下の3つの主要な役割を担います：

1. **構造の定義**: 見出し、段落、リスト、テーブルなどの文書構造
2. **意味の付与**: セマンティックなマークアップによる内容の意味付け
3. **リンクの作成**: ハイパーリンクによる文書間の関連付け

## 基本構造

### HTML文書の基本構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
<body>
    <!-- ここにページの内容を記述 -->
    <h1>メインタイトル</h1>
    <p>段落のテキストです。</p>
</body>
</html>
```

### 必須要素の説明

#### DOCTYPE宣言
```html
<!DOCTYPE html>
```
- HTML5文書であることを宣言
- ブラウザに正しい解釈モードを指示

#### html要素
```html
<html lang="ja">
```
- 文書全体を囲む最上位要素
- `lang`属性で言語を指定（日本語の場合は"ja"）

#### head要素
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
```
- ページのメタデータを定義
- ブラウザには表示されない情報

#### body要素
```html
<body>
    <!-- 実際のページ内容 -->
</body>
```
- ブラウザに表示される実際のコンテンツ

## 基本的なタグ

### 見出しタグ

```html
<h1>最も重要な見出し</h1>
<h2>2番目に重要な見出し</h2>
<h3>3番目に重要な見出し</h3>
<h4>4番目に重要な見出し</h4>
<h5>5番目に重要な見出し</h5>
<h6>最も重要度の低い見出し</h6>
```

**使用のポイント:**
- h1は1ページに1つが基本
- 見出しレベルを飛ばさない（h1の次はh2）
- SEOと読みやすさの両方に重要

### 段落と改行

```html
<p>これは段落です。複数の文を含むことができます。段落は自動的に前後に余白が挿入されます。</p>

<p>これは別の段落です。<br>
途中で改行したい場合はbrタグを使用します。</p>
```

### テキストの強調

```html
<strong>重要なテキスト（太字で表示）</strong>
<em>強調されたテキスト（斜体で表示）</em>
<mark>ハイライトされたテキスト</mark>
<small>小さいテキスト</small>
```

### リスト

#### 順序なしリスト（箇条書き）
```html
<ul>
    <li>項目1</li>
    <li>項目2</li>
    <li>項目3</li>
</ul>
```

#### 順序ありリスト（番号付き）
```html
<ol>
    <li>最初の項目</li>
    <li>2番目の項目</li>
    <li>3番目の項目</li>
</ol>
```

#### 定義リスト
```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>
```

## リンクと画像

### ハイパーリンク

```html
<!-- 外部サイトへのリンク -->
<a href="https://www.example.com">外部サイト</a>

<!-- 同じサイト内の別ページへのリンク -->
<a href="about.html">会社概要</a>

<!-- 同じページ内の特定の位置へのリンク -->
<a href="#section1">セクション1へ移動</a>

<!-- メールアドレスへのリンク -->
<a href="mailto:contact@example.com">お問い合わせ</a>

<!-- 電話番号へのリンク -->
<a href="tel:03-1234-5678">電話をかける</a>
```

**リンク属性:**
- `target="_blank"`: 新しいタブで開く
- `rel="noopener"`: セキュリティ対策（target="_blank"と併用）
- `download`: ファイルのダウンロードを指示

### 画像

```html
<!-- 基本的な画像表示 -->
<img src="image.jpg" alt="画像の説明">

<!-- より詳細な画像設定 -->
<img src="photo.jpg" 
     alt="美しい夕日の写真" 
     width="800" 
     height="600"
     loading="lazy">
```

**重要な属性:**
- `src`: 画像ファイルのパス（必須）
- `alt`: 代替テキスト（必須・アクセシビリティ重要）
- `width/height`: 画像のサイズ
- `loading="lazy"`: 遅延読み込み

## テーブル

### 基本的なテーブル

```html
<table>
    <thead>
        <tr>
            <th>名前</th>
            <th>年齢</th>
            <th>職業</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>田中太郎</td>
            <td>30</td>
            <td>エンジニア</td>
        </tr>
        <tr>
            <td>佐藤花子</td>
            <td>25</td>
            <td>デザイナー</td>
        </tr>
    </tbody>
</table>
```

### 複雑なテーブル

```html
<table>
    <caption>売上実績表</caption>
    <thead>
        <tr>
            <th rowspan="2">商品</th>
            <th colspan="2">2023年</th>
        </tr>
        <tr>
            <th>Q1</th>
            <th>Q2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>商品A</td>
            <td>100万円</td>
            <td>120万円</td>
        </tr>
    </tbody>
</table>
```

## フォーム

### 基本的なフォーム

```html
<form action="/submit" method="post">
    <label for="name">お名前:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">メールアドレス:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">メッセージ:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <button type="submit">送信</button>
</form>
```

### 様々な入力タイプ

```html
<!-- テキスト入力 -->
<input type="text" placeholder="テキストを入力">

<!-- パスワード入力 -->
<input type="password" placeholder="パスワード">

<!-- メールアドレス -->
<input type="email" placeholder="example@email.com">

<!-- 数値入力 -->
<input type="number" min="1" max="100" step="1">

<!-- 日付選択 -->
<input type="date">

<!-- ファイル選択 -->
<input type="file" accept=".jpg,.png,.pdf">

<!-- チェックボックス -->
<input type="checkbox" id="agree" name="agree">
<label for="agree">利用規約に同意する</label>

<!-- ラジオボタン -->
<input type="radio" id="male" name="gender" value="male">
<label for="male">男性</label>
<input type="radio" id="female" name="gender" value="female">
<label for="female">女性</label>

<!-- セレクトボックス -->
<select name="prefecture">
    <option value="">都道府県を選択</option>
    <option value="tokyo">東京都</option>
    <option value="osaka">大阪府</option>
</select>
```

## セマンティックHTML

### HTML5のセマンティック要素

```html
<header>
    <nav>
        <ul>
            <li><a href="#home">ホーム</a></li>
            <li><a href="#about">会社概要</a></li>
            <li><a href="#contact">お問い合わせ</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <header>
            <h1>記事のタイトル</h1>
            <p>投稿日: <time datetime="2024-01-15">2024年1月15日</time></p>
        </header>
        
        <section>
            <h2>セクション1</h2>
            <p>記事の内容...</p>
        </section>
        
        <section>
            <h2>セクション2</h2>
            <p>記事の内容...</p>
        </section>
        
        <footer>
            <p>著者: 田中太郎</p>
        </footer>
    </article>
    
    <aside>
        <h2>関連記事</h2>
        <ul>
            <li><a href="#">関連記事1</a></li>
            <li><a href="#">関連記事2</a></li>
        </ul>
    </aside>
</main>

<footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
</footer>
```

### セマンティック要素の説明

- `<header>`: ページや記事のヘッダー
- `<nav>`: ナビゲーション
- `<main>`: メインコンテンツ
- `<article>`: 独立した記事
- `<section>`: 文書のセクション
- `<aside>`: サイドバーや補足情報
- `<footer>`: ページや記事のフッター
- `<time>`: 時刻や日付

## 属性

### グローバル属性

```html
<!-- id: 要素の一意識別子 -->
<div id="unique-element">内容</div>

<!-- class: CSSやJavaScriptで使用するクラス名 -->
<p class="highlight important">重要な段落</p>

<!-- title: ツールチップテキスト -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- data-*: カスタムデータ属性 -->
<div data-user-id="123" data-role="admin">ユーザー情報</div>

<!-- lang: 言語指定 -->
<p lang="en">This is English text.</p>

<!-- style: インラインスタイル -->
<p style="color: red; font-weight: bold;">赤い太字</p>
```

### アクセシビリティ属性

```html
<!-- aria-label: スクリーンリーダー用ラベル -->
<button aria-label="メニューを開く">☰</button>

<!-- aria-describedby: 説明要素の参照 -->
<input type="password" aria-describedby="pwd-help">
<div id="pwd-help">8文字以上で設定してください</div>

<!-- role: 要素の役割を明示 -->
<div role="button" tabindex="0">カスタムボタン</div>

<!-- tabindex: タブ順序の制御 -->
<div tabindex="0">フォーカス可能な要素</div>
```

## メタデータとSEO

### 重要なメタタグ

```html
<head>
    <!-- 文字エンコーディング -->
    <meta charset="UTF-8">
    
    <!-- ビューポート（レスポンシブ対応） -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- ページの説明 -->
    <meta name="description" content="Webサイトの説明文。検索結果に表示されます。">
    
    <!-- キーワード（現在はSEO効果低） -->
    <meta name="keywords" content="HTML, CSS, JavaScript">
    
    <!-- 著者情報 -->
    <meta name="author" content="作成者名">
    
    <!-- ロボット制御 -->
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph（SNS共有用） -->
    <meta property="og:title" content="ページタイトル">
    <meta property="og:description" content="ページの説明">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ページタイトル">
    <meta name="twitter:description" content="ページの説明">
    
    <!-- ファビコン -->
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

## HTML5の新機能

### 新しい入力タイプ

```html
<!-- 色選択 -->
<input type="color" value="#ff0000">

<!-- 範囲選択（スライダー） -->
<input type="range" min="0" max="100" value="50">

<!-- 検索ボックス -->
<input type="search" placeholder="検索...">

<!-- URL入力 -->
<input type="url" placeholder="https://example.com">

<!-- 電話番号入力 -->
<input type="tel" placeholder="03-1234-5678">
```

### マルチメディア要素

```html
<!-- 動画 -->
<video controls width="640" height="480">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <p>お使いのブラウザは動画に対応していません。</p>
</video>

<!-- 音声 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>お使いのブラウザは音声に対応していません。</p>
</audio>

<!-- 外部コンテンツの埋め込み -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" 
        width="560" 
        height="315" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

### 図表要素

```html
<!-- 図表とキャプション -->
<figure>
    <img src="chart.png" alt="売上グラフ">
    <figcaption>2023年の売上推移</figcaption>
</figure>

<!-- 詳細・要約 -->
<details>
    <summary>詳細を表示</summary>
    <p>ここに詳細な内容が表示されます。</p>
</details>

<!-- 進行状況 -->
<progress value="70" max="100">70%</progress>

<!-- 測定値 -->
<meter value="6" min="0" max="10">10点中6点</meter>
```

## ベストプラクティス

### コードの書き方

```html
<!-- 良い例: 適切なインデントと構造 -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>適切なHTML</title>
</head>
<body>
    <header>
        <h1>サイトタイトル</h1>
        <nav>
            <ul>
                <li><a href="#home">ホーム</a></li>
                <li><a href="#about">概要</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h2>記事タイトル</h2>
            <p>記事の内容...</p>
        </article>
    </main>
</body>
</html>
```

### SEO対策

1. **適切な見出し構造**: h1-h6を順序正しく使用
2. **意味のあるalt属性**: 画像に適切な代替テキストを設定
3. **リンクテキスト**: 「こちら」ではなく具体的な内容を記載
4. **メタデータの充実**: title, description, keywordsを適切に設定

### アクセシビリティ

1. **セマンティックHTML**: 意味に応じた適切な要素を使用
2. **キーボード操作**: tabindexで適切なフォーカス順序を設定
3. **スクリーンリーダー対応**: aria属性を適切に使用
4. **色のコントラスト**: 十分な色の対比を確保

### パフォーマンス

1. **画像最適化**: 適切な形式とサイズで画像を使用
2. **遅延読み込み**: loading="lazy"で必要に応じて画像を読み込み
3. **外部リソース**: 必要最小限のCSSとJavaScriptを読み込み
4. **コード圧縮**: 本番環境では不要な空白や改行を削除

## よくあるエラーと対処法

### バリデーションエラー

```html
<!-- エラー例: 閉じタグがない -->
<p>段落のテキスト
<p>次の段落</p>

<!-- 正しい例 -->
<p>段落のテキスト</p>
<p>次の段落</p>
```

### 推奨されない書き方

```html
<!-- 非推奨: presentational要素 -->
<b>太字</b>
<i>斜体</i>
<u>下線</u>

<!-- 推奨: semantic要素 -->
<strong>重要</strong>
<em>強調</em>
<mark>ハイライト</mark>
```

## 開発ツール

### ブラウザの開発者ツール

1. **Elements**: HTML構造の確認と編集
2. **Console**: JavaScriptエラーの確認
3. **Network**: リソースの読み込み状況確認
4. **Lighthouse**: パフォーマンスとアクセシビリティの監査

### バリデーションツール

- [W3C Markup Validator](https://validator.w3.org/): HTML文法チェック
- [WAVE](https://wave.webaim.org/): アクセシビリティチェック
- [PageSpeed Insights](https://pagespeed.web.dev/): パフォーマンス測定

### エディタとプラグイン

- **Visual Studio Code**: HTML snippets, Live Server
- **Sublime Text**: Emmet, SublimeLinter
- **Atom**: emmet, linter-htmlhint

## 参考資料

### 公式ドキュメント

- [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTML): Mozilla開発者向けリソース
- [W3C HTML Specification](https://www.w3.org/TR/html52/): HTML5.2仕様書
- [HTML Living Standard](https://html.spec.whatwg.org/): WHATWG標準

### 学習リソース

- [HTML Dog](https://htmldog.com/): 初心者向けチュートリアル
- [W3Schools](https://www.w3schools.com/html/): 基礎から応用まで
- [Can I Use](https://caniuse.com/): ブラウザサポート状況確認

### ツールとライブラリ

- [Emmet](https://emmet.io/): HTML/CSS高速記述
- [Bootstrap](https://getbootstrap.com/): CSSフレームワーク
- [HTML5 Boilerplate](https://html5boilerplate.com/): HTMLテンプレート