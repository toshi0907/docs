---
layout: page
title: "CSS リファレンス"
---

# CSS リファレンス

CSS（Cascading Style Sheets）の基本的な使い方から応用まで、Webページのスタイリングに必要な知識を体系的に説明します。レスポンシブデザインやモダンなレイアウト技法も含めて解説します。

* 目次
{:toc}

## 基本概念

### CSS とは

**CSS（Cascading Style Sheets）** は、HTMLで構造化された文書の見た目やレイアウトを定義するためのスタイルシート言語です。1996年にW3Cによって初版が勧告され、現在はCSS3として多機能な仕様が利用可能です。

**特徴:**
- HTMLから見た目の定義を分離
- カスケーディング（優先順位）による柔軟なスタイル適用
- セレクタによる柔軟な要素選択
- レスポンシブデザインへの対応
- アニメーション機能

### CSS の役割

CSSは以下の主要な役割を担います：

1. **視覚的スタイリング**: 色、フォント、サイズ、装飾の定義
2. **レイアウト制御**: 要素の配置、位置、サイズの調整
3. **レスポンシブデザイン**: デバイスに応じた表示の最適化
4. **アニメーション**: 動的な視覚効果の実装

## 基本構文

### CSS の記述方法

```css
/* セレクタ { プロパティ: 値; } */
h1 {
    color: blue;
    font-size: 24px;
    margin-bottom: 16px;
}

/* 複数のセレクタに同じスタイルを適用 */
h1, h2, h3 {
    font-family: "Arial", sans-serif;
}

/* コメントの書き方 */
/* これはコメントです */
```

### CSS の適用方法

#### 1. 外部スタイルシート（推奨）

```html
<!-- HTMLファイル -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* styles.css */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}
```

#### 2. 内部スタイルシート

```html
<head>
    <style>
        body {
            background-color: #f0f0f0;
        }
        
        .highlight {
            background-color: yellow;
        }
    </style>
</head>
```

#### 3. インラインスタイル

```html
<p style="color: red; font-weight: bold;">赤い太字のテキスト</p>
```

## セレクタ

### 基本セレクタ

```css
/* 要素セレクタ */
p {
    color: black;
}

/* クラスセレクタ */
.my-class {
    background-color: lightblue;
}

/* IDセレクタ */
#my-id {
    font-size: 18px;
}

/* 全称セレクタ */
* {
    margin: 0;
    padding: 0;
}
```

### 属性セレクタ

```css
/* 特定の属性を持つ要素 */
[data-role] {
    border: 1px solid gray;
}

/* 特定の属性値を持つ要素 */
[type="text"] {
    padding: 8px;
}

/* 属性値が特定の文字列で始まる要素 */
[href^="https"] {
    color: green;
}

/* 属性値が特定の文字列で終わる要素 */
[href$=".pdf"] {
    background: url(pdf-icon.png) no-repeat;
}

/* 属性値に特定の文字列を含む要素 */
[class*="btn"] {
    cursor: pointer;
}
```

### 疑似クラス

```css
/* リンクの状態 */
a:link { color: blue; }       /* 未訪問 */
a:visited { color: purple; }  /* 訪問済み */
a:hover { color: red; }       /* ホバー時 */
a:active { color: orange; }   /* クリック時 */

/* フォーカス */
input:focus {
    outline: 2px solid blue;
    background-color: lightyellow;
}

/* 構造疑似クラス */
li:first-child { font-weight: bold; }     /* 最初の子要素 */
li:last-child { margin-bottom: 0; }       /* 最後の子要素 */
li:nth-child(odd) { background: #f9f9f9; } /* 奇数番目 */
li:nth-child(even) { background: #fff; }   /* 偶数番目 */
li:nth-child(3n) { color: red; }           /* 3の倍数番目 */

/* 状態疑似クラス */
input:checked + label { color: green; }    /* チェック済み */
input:disabled { opacity: 0.5; }           /* 無効状態 */
div:empty { display: none; }               /* 空要素 */
```

### 疑似要素

```css
/* 要素の前後にコンテンツを追加 */
.quote::before {
    content: "「";
    font-size: 1.2em;
}

.quote::after {
    content: "」";
    font-size: 1.2em;
}

/* 最初の行・文字のスタイル */
p::first-line {
    font-weight: bold;
}

p::first-letter {
    font-size: 2em;
    float: left;
    margin: 0.1em 0.1em 0.1em 0;
}

/* 選択されたテキストのスタイル */
::selection {
    background-color: yellow;
    color: black;
}
```

### 結合子

```css
/* 子孫セレクタ（スペース） */
div p {
    margin: 16px 0;
}

/* 子セレクタ（>） */
nav > ul {
    list-style: none;
}

/* 隣接兄弟セレクタ（+） */
h2 + p {
    margin-top: 0;
}

/* 一般兄弟セレクタ（~） */
h2 ~ p {
    color: gray;
}
```

## ボックスモデル

### ボックスモデルの構成

```css
.box {
    /* コンテンツ領域 */
    width: 200px;
    height: 100px;
    
    /* パディング（内側の余白） */
    padding: 20px;
    
    /* ボーダー（境界線） */
    border: 2px solid black;
    
    /* マージン（外側の余白） */
    margin: 10px;
}

/* box-sizingでボックスモデルを変更 */
.border-box {
    box-sizing: border-box; /* widthにpadding,borderを含む */
}

.content-box {
    box-sizing: content-box; /* デフォルト: widthはコンテンツのみ */
}
```

### マージンとパディング

```css
/* 4方向個別指定 */
.element {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
}

/* ショートハンド記法 */
.element {
    margin: 10px 20px;        /* 上下10px 左右20px */
    margin: 10px 20px 15px;   /* 上10px 左右20px 下15px */
    margin: 10px 20px 15px 5px; /* 上右下左の順（時計回り） */
}

/* 中央揃え */
.center {
    margin: 0 auto;
    width: 80%;
}

/* マージンの相殺 */
.margin-collapse {
    margin-bottom: 20px;
}

.margin-collapse + .margin-collapse {
    margin-top: 30px; /* 実際は30pxの余白（20pxではなく） */
}
```

## テキストとフォント

### フォント設定

```css
/* フォントファミリー */
.serif {
    font-family: "Times New Roman", Times, serif;
}

.sans-serif {
    font-family: "Arial", "Helvetica", sans-serif;
}

.monospace {
    font-family: "Courier New", Courier, monospace;
}

/* 日本語フォント */
.japanese {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", 
                 "メイリオ", Meiryo, "MS Pゴシック", sans-serif;
}

/* フォントサイズ */
.small { font-size: 12px; }      /* 絶対値 */
.medium { font-size: 1.2em; }    /* 相対値（親要素基準） */
.large { font-size: 1.5rem; }    /* 相対値（ルート要素基準） */
.responsive { font-size: 4vw; }  /* ビューポート基準 */

/* フォントの太さ */
.light { font-weight: 300; }
.normal { font-weight: 400; }    /* または normal */
.bold { font-weight: 700; }      /* または bold */
.bolder { font-weight: bolder; } /* 親要素より太く */

/* フォントスタイル */
.italic { font-style: italic; }
.oblique { font-style: oblique; }
```

### テキストスタイル

```css
/* テキストの装飾 */
.underline { text-decoration: underline; }
.overline { text-decoration: overline; }
.line-through { text-decoration: line-through; }
.no-decoration { text-decoration: none; }

/* 複数の装飾 */
.fancy {
    text-decoration: underline overline;
    text-decoration-color: red;
    text-decoration-style: wavy;
}

/* テキストの配置 */
.left { text-align: left; }
.center { text-align: center; }
.right { text-align: right; }
.justify { text-align: justify; }

/* 行の高さ */
.tight { line-height: 1.2; }
.normal { line-height: 1.6; }
.loose { line-height: 2.0; }

/* 文字間隔 */
.letter-spacing { letter-spacing: 0.1em; }
.word-spacing { word-spacing: 0.2em; }

/* テキストの変形 */
.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }

/* テキストのインデント */
.indent { text-indent: 2em; }

/* テキストの影 */
.shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

## 色と背景

### 色の指定方法

```css
/* 色名 */
.red { color: red; }
.blue { color: blue; }

/* 16進数カラーコード */
.custom1 { color: #ff0000; }  /* 赤 */
.custom2 { color: #00ff00; }  /* 緑 */
.custom3 { color: #0000ff; }  /* 青 */
.custom4 { color: #333; }     /* 短縮形（#333333と同じ） */

/* RGB */
.rgb { color: rgb(255, 0, 0); }           /* 赤 */
.rgba { color: rgba(255, 0, 0, 0.5); }    /* 半透明の赤 */

/* HSL */
.hsl { color: hsl(0, 100%, 50%); }        /* 赤 */
.hsla { color: hsla(0, 100%, 50%, 0.5); } /* 半透明の赤 */

/* CSS変数 */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
}

.primary { color: var(--primary-color); }
```

### 背景

```css
/* 背景色 */
.bg-color {
    background-color: #f0f0f0;
}

/* 背景画像 */
.bg-image {
    background-image: url('background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

/* 背景のショートハンド */
.bg-shorthand {
    background: url('bg.jpg') no-repeat center center / cover;
}

/* グラデーション */
.gradient-linear {
    background: linear-gradient(to right, #ff0000, #0000ff);
}

.gradient-radial {
    background: radial-gradient(circle, #ff0000, #0000ff);
}

/* 複数背景 */
.multiple-bg {
    background: 
        url('overlay.png') repeat,
        linear-gradient(to bottom, #fff, #ccc),
        url('main-bg.jpg') no-repeat center / cover;
}
```

## レイアウト

### Display プロパティ

```css
/* ブロック要素 */
.block {
    display: block;
    width: 100%;
    margin: 16px 0;
}

/* インライン要素 */
.inline {
    display: inline;
    /* width, height, margin-top/bottom は無効 */
}

/* インラインブロック要素 */
.inline-block {
    display: inline-block;
    width: 200px;
    height: 100px;
    vertical-align: top;
}

/* 非表示 */
.hidden {
    display: none; /* 要素が完全に除去される */
}

.invisible {
    visibility: hidden; /* 要素は残るが透明になる */
}
```

### Flexbox

```css
/* フレックスコンテナ */
.flex-container {
    display: flex;
    
    /* 主軸方向 */
    flex-direction: row;        /* 水平（デフォルト） */
    /* flex-direction: column; */ /* 垂直 */
    
    /* 主軸の配置 */
    justify-content: flex-start;  /* 開始位置 */
    /* justify-content: center; */    /* 中央 */
    /* justify-content: flex-end; */  /* 終了位置 */
    /* justify-content: space-between; */ /* 均等配置（両端） */
    /* justify-content: space-around; */  /* 均等配置（周囲） */
    /* justify-content: space-evenly; */  /* 完全均等配置 */
    
    /* 交差軸の配置 */
    align-items: stretch;       /* 引き伸ばし（デフォルト） */
    /* align-items: flex-start; */   /* 開始位置 */
    /* align-items: center; */       /* 中央 */
    /* align-items: flex-end; */     /* 終了位置 */
    
    /* 折り返し */
    flex-wrap: nowrap;          /* 折り返さない（デフォルト） */
    /* flex-wrap: wrap; */          /* 折り返す */
    
    /* 隙間 */
    gap: 16px;                  /* アイテム間の隙間 */
}

/* フレックスアイテム */
.flex-item {
    /* 伸縮の設定 */
    flex: 1;                    /* flex: 1 1 0% のショートハンド */
    /* flex-grow: 1; */             /* 拡大比率 */
    /* flex-shrink: 1; */           /* 縮小比率 */
    /* flex-basis: auto; */         /* 基本サイズ */
    
    /* 個別の交差軸配置 */
    align-self: center;
}

/* よくあるFlexboxパターン */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 300px; /* 最小幅300px */
}
```

### CSS Grid

```css
/* グリッドコンテナ */
.grid-container {
    display: grid;
    
    /* グリッドトラックの定義 */
    grid-template-columns: 1fr 2fr 1fr;  /* 3列（比率1:2:1） */
    grid-template-rows: auto 1fr auto;   /* 3行 */
    
    /* または具体的なサイズ */
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 60px 1fr 40px;
    
    /* 隙間 */
    gap: 20px;
    /* grid-column-gap: 20px; */
    /* grid-row-gap: 15px; */
    
    /* グリッドエリアの定義 */
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}

/* グリッドアイテム */
.grid-item {
    /* 位置の指定（ライン番号） */
    grid-column: 1 / 3;         /* 列1から3まで */
    grid-row: 2 / 4;            /* 行2から4まで */
    
    /* または */
    grid-column-start: 1;
    grid-column-end: 3;
    
    /* スパンを使用 */
    grid-column: span 2;        /* 2列分 */
    grid-row: span 3;           /* 3行分 */
}

/* エリア名で配置 */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* レスポンシブグリッド */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

### Position

```css
/* 静的位置（デフォルト） */
.static {
    position: static;
}

/* 相対位置 */
.relative {
    position: relative;
    top: 10px;     /* 元の位置から上に10px移動 */
    left: 20px;    /* 元の位置から左に20px移動 */
}

/* 絶対位置 */
.absolute {
    position: absolute;
    top: 0;
    right: 0;      /* 親要素（position: static以外）の右上角に配置 */
}

/* 固定位置 */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;   /* ビューポートの右下角に固定 */
}

/* 粘着位置 */
.sticky {
    position: sticky;
    top: 0;        /* スクロール時に画面上部に張り付く */
}

/* z-index（重なり順） */
.layer1 { z-index: 1; }
.layer2 { z-index: 2; }  /* より前面に表示 */
.layer3 { z-index: 10; } /* 最前面に表示 */
```

### Float と Clear

```css
/* フロート（現在は主にFlexboxやGridを推奨） */
.left-float {
    float: left;
    width: 200px;
    margin-right: 20px;
}

.right-float {
    float: right;
    width: 200px;
    margin-left: 20px;
}

/* フロートの解除 */
.clear {
    clear: both;
}

/* クリアフィックス（フロートを含む親要素用） */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

## レスポンシブデザイン

### メディアクエリ

```css
/* 基本的なメディアクエリ */
@media screen and (max-width: 768px) {
    .responsive {
        font-size: 14px;
        padding: 10px;
    }
}

/* 複数条件 */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .tablet {
        display: block;
    }
}

/* よくあるブレークポイント */
/* モバイル（スマートフォン） */
@media (max-width: 767px) {
    .mobile-only {
        display: block;
    }
    
    .hide-mobile {
        display: none;
    }
}

/* タブレット */
@media (min-width: 768px) and (max-width: 1023px) {
    .tablet-only {
        display: block;
    }
}

/* デスクトップ */
@media (min-width: 1024px) {
    .desktop-only {
        display: block;
    }
}

/* 高解像度ディスプレイ */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    .retina {
        background-image: url('high-res-image@2x.png');
    }
}

/* プリント用 */
@media print {
    .no-print {
        display: none;
    }
    
    body {
        font-size: 12pt;
        color: black;
    }
}
```

### フレキシブル単位

```css
/* ビューポート単位 */
.viewport-width { width: 50vw; }      /* ビューポート幅の50% */
.viewport-height { height: 100vh; }   /* ビューポート高さの100% */
.viewport-min { font-size: 4vmin; }   /* vw,vhの小さい方の4% */
.viewport-max { font-size: 4vmax; }   /* vw,vhの大きい方の4% */

/* フレキシブルサイズ */
.fluid-image {
    max-width: 100%;
    height: auto;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* clamp関数（最小、推奨、最大値） */
.responsive-text {
    font-size: clamp(16px, 4vw, 24px);
}

.responsive-width {
    width: clamp(300px, 50%, 800px);
}
```

## アニメーション

### Transition

```css
/* 基本的なトランジション */
.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: darkblue;
}

/* 複数プロパティのトランジション */
.card {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* 全プロパティのトランジション */
.smooth {
    transition: all 0.3s ease-in-out;
}

/* 遅延とイージング */
.delayed {
    transition: opacity 0.5s ease-in 0.2s; /* 0.2秒後に開始 */
}

/* カスタムイージング */
.custom-easing {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Keyframe アニメーション

```css
/* キーフレームの定義 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* パーセンテージでの指定 */
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}

/* アニメーションの適用 */
.fade-in {
    animation: fadeIn 1s ease-out;
}

.bounce {
    animation: bounce 2s infinite; /* 無限ループ */
}

/* 詳細設定 */
.complex-animation {
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: 3;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    animation-play-state: running;
}

/* ショートハンド */
.shorthand {
    animation: fadeIn 2s ease-in-out 0.5s 3 alternate forwards;
}
```

### Transform

```css
/* 2D変形 */
.transform-2d {
    transform: translate(50px, 100px);  /* 移動 */
    transform: scale(1.5);              /* 拡大縮小 */
    transform: rotate(45deg);           /* 回転 */
    transform: skew(10deg, 20deg);      /* 傾斜 */
}

/* 複数の変形を組み合わせ */
.combined {
    transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}

/* 3D変形 */
.transform-3d {
    transform: rotateX(45deg);          /* X軸回転 */
    transform: rotateY(45deg);          /* Y軸回転 */
    transform: rotateZ(45deg);          /* Z軸回転 */
    transform: translate3d(50px, 50px, 50px); /* 3D移動 */
}

/* 透視効果 */
.perspective-container {
    perspective: 1000px;
}

.perspective-item {
    transform-style: preserve-3d;
    transform: rotateY(45deg);
}

/* 変形の基準点 */
.transform-origin {
    transform-origin: top left;     /* 左上を基準 */
    transform: rotate(45deg);
}
```

## よく使うパターン

### ナビゲーション

```css
/* 水平ナビゲーション */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #007bff;
}

/* レスポンシブナビゲーション */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #333;
        display: none;
    }
    
    .nav-menu.active {
        display: flex;
    }
}
```

### カードレイアウト

```css
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
}

.card-title {
    margin: 0 0 1rem 0;
    color: #333;
}

.card-text {
    color: #666;
    line-height: 1.6;
}
```

### モーダル

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
```

### フォームスタイリング

```css
.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
}

.form-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.form-button:hover {
    background-color: #0056b3;
}

.form-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
```

## CSS方法論

### BEM（Block Element Modifier）

```css
/* Block */
.card {
    display: block;
    background: white;
    border-radius: 8px;
}

/* Element */
.card__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.card__content {
    padding: 1rem;
}

.card__button {
    background: blue;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
}

/* Modifier */
.card--featured {
    border: 2px solid gold;
}

.card__button--secondary {
    background: gray;
}

.card__title--large {
    font-size: 2rem;
}
```

### CSS変数（カスタムプロパティ）

```css
:root {
    /* カラーパレット */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    
    /* フォント */
    --font-family-base: "Arial", sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.6;
    
    /* スペーシング */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 3rem;
    
    /* ブレークポイント */
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
}

/* 変数の使用 */
.button {
    background-color: var(--primary-color);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-family-base);
}

/* フォールバック値 */
.element {
    color: var(--undefined-color, #333); /* 未定義の場合は#333を使用 */
}

/* 変数の上書き */
.dark-theme {
    --primary-color: #6610f2;
    --bg-color: #333;
    --text-color: #fff;
}
```

## パフォーマンス最適化

### CSS最適化のベストプラクティス

```css
/* 効率的なセレクタ */
/* 良い例 */
.nav-item { }
.card-title { }

/* 避けるべき例 */
div > ul > li > a { }  /* 深すぎる階層 */
* { }                  /* 全称セレクタ */
[attr="value"] { }     /* 属性セレクタの過度使用 */

/* CSSの読み込み順序最適化 */
/* 1. リセット・ノーマライズ */
/* 2. 基本スタイル */
/* 3. レイアウト */
/* 4. コンポーネント */
/* 5. ページ固有スタイル */

/* クリティカルCSS */
.above-fold {
    /* ファーストビューに必要なスタイルのみ */
    display: block;
    font-family: Arial, sans-serif;
    color: #333;
}

/* 不要なプロパティの削除 */
.optimized {
    /* 必要最小限のプロパティのみ */
    color: #333;
    font-size: 1rem;
}

/* transform や opacity を使用した高速アニメーション */
.fast-animation {
    /* GPU加速を活用 */
    transform: translateX(0);
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
}
```

### CSS Grid と Flexbox の使い分け

```css
/* 1次元レイアウト（Flexbox） */
.flex-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* 2次元レイアウト（Grid） */
.grid-layout {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
}

/* レスポンシブデザインでの使い分け */
.responsive-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .responsive-container {
        grid-template-columns: 1fr 2fr;
    }
}

@media (min-width: 1024px) {
    .responsive-container {
        grid-template-columns: 200px 1fr 200px;
    }
}
```

## デバッグとツール

### デバッグ用CSS

```css
/* アウトライン表示（デバッグ用） */
* {
    outline: 1px solid red !important;
}

/* 特定要素のデバッグ */
.debug {
    border: 2px solid red !important;
    background-color: rgba(255, 0, 0, 0.1) !important;
}

/* グリッドライン表示 */
.debug-grid {
    background-image: 
        linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* フレックスボックスのデバッグ */
.debug-flex > * {
    border: 1px solid blue;
}
```

### ブラウザの開発者ツール活用

1. **Elements パネル**: HTML/CSS構造の確認と編集
2. **Computed スタイル**: 実際に適用されているCSSの確認
3. **Box Model**: マージン、パディング、ボーダーの視覚化
4. **Performance**: レンダリングパフォーマンスの測定

### 便利なツールとライブラリ

```css
/* CSS Reset（normalize.css の例） */
/* https://necolas.github.io/normalize.css/ */

/* CSS フレームワーク */
/* Bootstrap: https://getbootstrap.com/ */
/* Tailwind CSS: https://tailwindcss.com/ */
/* Bulma: https://bulma.io/ */

/* CSS プリプロセッサ */
/* Sass/SCSS: https://sass-lang.com/ */
/* Less: http://lesscss.org/ */
/* Stylus: http://stylus-lang.com/ */

/* PostCSS プラグイン */
/* Autoprefixer: ベンダープレフィックス自動追加 */
/* CSS Nano: CSS圧縮 */
/* PurgeCSS: 未使用CSS削除 */
```

## 参考資料

### 公式ドキュメント

- [MDN Web Docs - CSS](https://developer.mozilla.org/ja/docs/Web/CSS): Mozilla開発者向けリソース
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/): CSS仕様書
- [CSS Working Group](https://github.com/w3c/csswg-drafts): 最新仕様の議論

### 学習リソース

- [CSS-Tricks](https://css-tricks.com/): CSSテクニックとチュートリアル
- [Flexbox Froggy](https://flexboxfroggy.com/): Flexboxを学ぶゲーム
- [Grid Garden](https://cssgridgarden.com/): CSS Gridを学ぶゲーム
- [Can I Use](https://caniuse.com/): ブラウザサポート状況確認

### ツールとリソース

- [Sass](https://sass-lang.com/): CSSプリプロセッサ
- [PostCSS](https://postcss.org/): CSS変換ツール
- [Autoprefixer](https://autoprefixer.github.io/): ベンダープレフィックス自動追加
- [CSS Validator](https://jigsaw.w3.org/css-validator/): CSS構文チェック