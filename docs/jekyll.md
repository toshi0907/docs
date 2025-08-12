# Jekyll リファレンス

Jekyll の基本的な使い方と GitHub Pages での運用におけるベストプラクティスとTipsです。

## 目次
1. [基本概念](#基本概念)
2. [インストールと環境設定](#インストールと環境設定)
3. [プロジェクト構造](#プロジェクト構造)
4. [設定ファイル（_config.yml）](#設定ファイル_configyml)
5. [GitHub Pages との連携](#github-pages-との連携)
6. [テーマとレイアウト](#テーマとレイアウト)
7. [コンテンツ作成](#コンテンツ作成)
8. [プラグインの活用](#プラグインの活用)
9. [パフォーマンス最適化](#パフォーマンス最適化)
10. [トラブルシューティング](#トラブルシューティング)
11. [ベストプラクティス](#ベストプラクティス)
12. [実用的な例](#実用的な例)

## 基本概念

### Jekyll とは

Jekyll は静的サイトジェネレーターで、Markdown や HTML ファイルから静的な Web サイトを生成するツールです。GitHub Pages の標準エンジンとしても採用されています。

**特徴:**
- Markdown からHTMLへの自動変換
- テンプレートエンジンによる統一されたデザイン
- ブログ機能の標準サポート
- GitHub Pages との完全統合
- プラグインによる機能拡張

### 重要な概念

- **サイト（Site）**: Jekyll で管理される Web サイト全体
- **ポスト（Posts）**: ブログ記事やニュース記事
- **ページ（Pages）**: 固定的なコンテンツページ
- **レイアウト（Layouts）**: ページの基本構造を定義するテンプレート
- **インクルード（Includes）**: 再利用可能なコードスニペット
- **フロントマター（Front Matter）**: ファイルの先頭にあるYAML設定

## インストールと環境設定

### ローカル開発環境のセットアップ

#### 1. Ruby のインストール

```bash
# macOS (Homebrew使用)
brew install ruby

# Ubuntu/Debian
sudo apt-get install ruby-full build-essential zlib1g-dev

# Windows (RubyInstaller)
# https://rubyinstaller.org/ からダウンロード
```

#### 2. Jekyll のインストール

```bash
# Gem として Jekyll をインストール
gem install jekyll bundler

# バージョン確認
jekyll --version
```

#### 3. 新しい Jekyll サイトの作成

```bash
# 新しいサイトの作成
jekyll new my-awesome-site
cd my-awesome-site

# ローカルサーバーの起動
bundle exec jekyll serve

# ブラウザで http://localhost:4000 にアクセス
```

### GitHub Pages 用の設定

#### Gemfile の設定

```ruby
# GitHub Pages 用の Gemfile
source "https://rubygems.org"

# GitHub Pages gem（Jekyll のバージョンを自動調整）
gem "github-pages", group: :jekyll_plugins

# テーマ
gem "minima", "~> 2.5"

# プラグイン
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows 用
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
```

## プロジェクト構造

### 標準的なディレクトリ構造

```
my-site/
├── _config.yml          # サイトの設定ファイル
├── _data/               # データファイル（YAML, JSON, CSV）
│   └── navigation.yml
├── _drafts/             # 下書きの投稿
│   └── draft-post.md
├── _includes/           # 再利用可能なコードスニペット
│   ├── head.html
│   ├── header.html
│   └── footer.html
├── _layouts/            # ページテンプレート
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _posts/              # ブログ記事
│   └── 2023-01-01-welcome.md
├── _sass/               # Sass ファイル
│   └── _variables.scss
├── _site/               # 生成されるサイト（gitignore対象）
├── assets/              # CSS, JS, 画像ファイル
│   ├── css/
│   ├── js/
│   └── images/
├── Gemfile              # Ruby gem の依存関係
├── Gemfile.lock         # gem のバージョンロック
└── index.md             # トップページ
```

### ファイル命名規則

#### ポストファイル
```
_posts/YYYY-MM-DD-title.MARKUP
例: _posts/2023-12-01-jekyll-tutorial.md
```

#### ページファイル
```
# ルートディレクトリまたはサブディレクトリ
about.md
contact/index.md
```

## 設定ファイル（_config.yml）

### 基本設定

```yaml
# サイト基本情報
title: "My Awesome Site"
description: "A fantastic Jekyll site"
baseurl: "" # サブディレクトリがある場合（例: "/blog"）
url: "https://username.github.io" # サイトのURL

# ビルド設定
markdown: kramdown
highlighter: rouge
theme: minima

# プラグイン
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# パーマリンク設定
permalink: /:categories/:year/:month/:day/:title:output_ext

# タイムゾーン
timezone: Asia/Tokyo

# デフォルト設定
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Your Name"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "page"

# 除外ファイル
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
  - README.md
```

### GitHub Pages 固有の設定

```yaml
# GitHub Pages 用設定
repository: username/repository-name
github_username: username

# GitHub Pages でサポートされているプラグインのみ使用
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-paginate
  - jekyll-mentions
  - jekyll-redirect-from
  - jekyll-avatar
  - jekyll-gist

# セキュリティ設定
safe: true
incremental: false
```

## GitHub Pages との連携

### 1. リポジトリの設定

#### 新しいリポジトリの場合
```bash
# GitHub Pages 用リポジトリの作成
git init
git add .
git commit -m "Initial Jekyll site"
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

#### 既存リポジトリの場合
```bash
# docs ディレクトリを使用する場合
mkdir docs
# Jekyll サイトを docs ディレクトリに作成
```

### 2. GitHub Pages の有効化

1. リポジトリの Settings タブに移動
2. Pages セクションを開く
3. Source を選択:
   - **Deploy from a branch**: `main` ブランチの `/` または `/docs`
   - **GitHub Actions**: カスタムワークフローを使用

### 3. カスタムドメインの設定

```yaml
# _config.yml にカスタムドメインを設定
url: "https://mydomain.com"
enforce_ssl: true
```

```
# CNAME ファイルをルートディレクトリに作成
mydomain.com
```

### 4. GitHub Actions を使った高度なデプロイ

```yaml
# .github/workflows/jekyll.yml
name: Build and deploy Jekyll site to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
```

## テーマとレイアウト

### 人気の Jekyll テーマ

#### GitHub Pages でサポートされているテーマ
```yaml
# _config.yml でテーマを指定
theme: minima
# または
theme: jekyll-theme-cayman
theme: jekyll-theme-minimal
theme: jekyll-theme-architect
```

#### Gem ベースのテーマ
```ruby
# Gemfile
gem "beautiful-jekyll-theme"
gem "tale"
gem "hydeout"
```

### カスタムレイアウトの作成

#### デフォルトレイアウト（_layouts/default.html）
```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "ja" }}">
  {%- include head.html -%}
  <body>
    {%- include header.html -%}
    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        {{ content }}
      </div>
    </main>
    {%- include footer.html -%}
  </body>
</html>
```

#### ページレイアウト（_layouts/page.html）
```html
---
layout: default
---
<article class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title | escape }}</h1>
  </header>

  <div class="post-content">
    {{ content }}
  </div>
</article>
```

#### ポストレイアウト（_layouts/post.html）
```html
---
layout: default
---
<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <h1 class="post-title p-name" itemprop="name headline">{{ page.title | escape }}</h1>
    <p class="post-meta">
      <time class="dt-published" datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
        {%- assign date_format = site.minima.date_format | default: "%Y年%m月%d日" -%}
        {{ page.date | date: date_format }}
      </time>
      {%- if page.author -%}
        • <span itemprop="author" itemscope itemtype="http://schema.org/Person">
            <span class="p-author h-card" itemprop="name">{{ page.author }}</span>
          </span>
      {%- endif -%}
    </p>
  </header>

  <div class="post-content e-content" itemprop="articleBody">
    {{ content }}
  </div>
</article>
```

## コンテンツ作成

### フロントマターの活用

#### ポストのフロントマター
```yaml
---
layout: post
title: "Jekyll 入門ガイド"
date: 2023-12-01 10:00:00 +0900
categories: tutorial web
tags: [jekyll, github-pages, static-site]
author: "Taro Yamada"
excerpt: "Jekyll の基本的な使い方を学びましょう"
image: /assets/images/jekyll-logo.png
published: true
---
```

#### ページのフロントマター
```yaml
---
layout: page
title: "About"
permalink: /about/
order: 1
nav: true
---
```

### Liquid テンプレート言語

#### 基本的な変数出力
```liquid
{{ site.title }}
{{ page.title }}
{{ content }}
```

#### 条件分岐
```liquid
{% if page.image %}
  <img src="{{ page.image }}" alt="{{ page.title }}">
{% endif %}

{% unless page.published == false %}
  <p>{{ page.excerpt }}</p>
{% endunless %}
```

#### ループ処理
```liquid
{% for post in site.posts limit:5 %}
  <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  <p>{{ post.excerpt }}</p>
{% endfor %}
```

#### フィルター
```liquid
{{ page.date | date: "%Y年%m月%d日" }}
{{ page.title | upcase }}
{{ content | strip_html | truncatewords: 30 }}
```

### コレクションの活用

#### _config.yml でコレクションを定義
```yaml
collections:
  tutorials:
    output: true
    permalink: /:collection/:name/
  team:
    output: false
```

#### コレクションファイルの作成
```
_tutorials/
├── basic-setup.md
├── advanced-config.md
└── deployment.md
```

#### コレクションの表示
```liquid
{% for tutorial in site.tutorials %}
  <h3><a href="{{ tutorial.url }}">{{ tutorial.title }}</a></h3>
{% endfor %}
```

## プラグインの活用

### GitHub Pages でサポートされているプラグイン

#### SEO プラグイン
```yaml
# _config.yml
plugins:
  - jekyll-seo-tag

# レイアウトファイルの head セクションに追加
{% seo %}
```

#### サイトマップ生成
```yaml
plugins:
  - jekyll-sitemap

# 自動的に /sitemap.xml が生成される
```

#### RSS フィード
```yaml
plugins:
  - jekyll-feed

# 自動的に /feed.xml が生成される
```

#### ページネーション
```yaml
plugins:
  - jekyll-paginate

paginate: 5
paginate_path: "/blog/page:num/"
```

### カスタムプラグインの作成

#### _plugins/custom_filter.rb
```ruby
module Jekyll
  module CustomFilter
    def reading_time(input)
      words_per_minute = 200
      words = input.split.size
      minutes = (words / words_per_minute).ceil
      "約#{minutes}分で読めます"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
```

#### 使用例
```liquid
{{ content | reading_time }}
```

## パフォーマンス最適化

### 1. 画像最適化

#### レスポンシブ画像
```liquid
{% assign image_path = "/assets/images/" | append: page.image %}
<picture>
  <source media="(max-width: 600px)" srcset="{{ image_path | append: "-small.webp" }}">
  <source media="(max-width: 1200px)" srcset="{{ image_path | append: "-medium.webp" }}">
  <img src="{{ image_path }}" alt="{{ page.title }}" loading="lazy">
</picture>
```

#### 画像の遅延読み込み
```html
<img src="{{ image_path }}" alt="{{ page.title }}" loading="lazy">
```

### 2. CSS・JavaScript の最適化

#### アセットの圧縮
```yaml
# _config.yml
sass:
  style: compressed

# 本番環境でのminify
{% if jekyll.environment == "production" %}
  {% assign css_href = "/assets/css/style.css" %}
{% else %}
  {% assign css_href = "/assets/css/style.css" %}
{% endif %}
```

#### 重要でないリソースの遅延読み込み
```html
<link rel="preload" href="/assets/css/critical.css" as="style">
<link rel="stylesheet" href="/assets/css/non-critical.css" media="print" onload="this.media='all'">
```

### 3. ビルド時間の最適化

#### インクリメンタルビルド
```bash
# 開発時のみ使用
bundle exec jekyll serve --incremental
```

#### 不要ファイルの除外
```yaml
# _config.yml
exclude:
  - node_modules/
  - .sass-cache/
  - .jekyll-cache/
  - gemfiles/
  - Gemfile
  - Gemfile.lock
  - vendor/
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー

**問題**: Gem の依存関係エラー
```bash
# 解決方法
bundle update
bundle install
```

**問題**: 文字エンコーディングエラー
```yaml
# _config.yml に追加
encoding: utf-8
```

#### 2. GitHub Pages でのビルド失敗

**問題**: サポートされていないプラグイン
```yaml
# GitHub Pages でサポートされているプラグインのみ使用
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

**問題**: 相対パスの問題
```yaml
# _config.yml でベースURLを正しく設定
baseurl: "/repository-name"
url: "https://username.github.io"
```

#### 3. パフォーマンス問題

**問題**: ビルド時間が長い
```bash
# --profile オプションでボトルネックを特定
bundle exec jekyll build --profile
```

**問題**: 大量のファイル
```yaml
# limit プラグインを使用
{% for post in site.posts limit:10 %}
```

### デバッグ方法

#### 開発サーバーでのライブリロード
```bash
bundle exec jekyll serve --livereload --drafts
```

#### ログレベルの設定
```bash
bundle exec jekyll build --verbose
```

#### 設定の確認
```bash
bundle exec jekyll doctor
```

## ベストプラクティス

### 1. コンテンツ管理

#### ディレクトリ構造のベストプラクティス
```
content/
├── _posts/           # ブログ記事
├── _pages/           # 固定ページ
├── _drafts/          # 下書き
└── assets/
    ├── images/       # 画像
    ├── documents/    # PDF等
    └── downloads/    # ダウンロードファイル
```

#### ファイル命名規則
```
# 投稿ファイル
2023-12-01-clear-descriptive-title.md

# ページファイル
about.md
contact.md
privacy-policy.md

# 画像ファイル
2023-12-01-post-thumbnail.jpg
about-hero-image.png
```

### 2. SEO最適化

#### メタタグの設定
```html
<!-- _includes/head.html -->
<meta name="description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}">
<meta property="og:title" content="{{ page.title | default: site.title | escape }}">
<meta property="og:description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}">
<meta property="og:image" content="{{ page.image | default: site.image | absolute_url }}">
```

#### 構造化データの追加
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ page.title }}",
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "author": {
    "@type": "Person",
    "name": "{{ page.author | default: site.author }}"
  }
}
</script>
```

### 3. アクセシビリティ

#### セマンティックHTML
```html
<article class="post">
  <header>
    <h1>{{ page.title }}</h1>
    <time datetime="{{ page.date | date_to_xmlschema }}">{{ page.date | date: "%Y年%m月%d日" }}</time>
  </header>
  <main>
    {{ content }}
  </main>
</article>
```

#### ALTテキストの設定
```liquid
{% if page.image %}
  <img src="{{ page.image }}" alt="{{ page.image_alt | default: page.title }}">
{% endif %}
```

### 4. セキュリティ

#### セキュアなリンク
```html
<a href="{{ external_url }}" target="_blank" rel="noopener noreferrer">
```

#### フォームのセキュリティ
```html
<form method="post" action="https://formspree.io/your-email">
  <input type="hidden" name="_subject" value="Contact from Jekyll site">
  <input type="hidden" name="_next" value="{{ site.url }}/thank-you">
</form>
```

## 実用的な例

### 1. ブログサイトの作成

#### _config.yml
```yaml
title: "Tech Blog"
description: "技術ブログ"
baseurl: ""
url: "https://username.github.io"

markdown: kramdown
highlighter: rouge
theme: minima

paginate: 5
paginate_path: "/page:num/"

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-paginate

defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      comments: true
```

#### index.html
```html
---
layout: default
---

<div class="home">
  <h1 class="page-heading">最新の記事</h1>

  <ul class="post-list">
    {% for post in paginator.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%Y年%m月%d日" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </h2>
        <p>{{ post.excerpt }}</p>
      </li>
    {% endfor %}
  </ul>

  <!-- ページネーション -->
  {% if paginator.total_pages > 1 %}
    <div class="pagination">
      {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}">&laquo; 前へ</a>
      {% endif %}
      
      {% for page in (1..paginator.total_pages) %}
        {% if page == paginator.page %}
          <span class="current">{{ page }}</span>
        {% elsif page == 1 %}
          <a href="{{ '/' | relative_url }}">{{ page }}</a>
        {% else %}
          <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}">{{ page }}</a>
        {% endif %}
      {% endfor %}
      
      {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}">次へ &raquo;</a>
      {% endif %}
    </div>
  {% endif %}
</div>
```

### 2. ポートフォリオサイトの作成

#### _data/projects.yml
```yaml
- name: "プロジェクト1"
  description: "Web アプリケーション開発"
  image: "/assets/images/project1.jpg"
  url: "https://github.com/username/project1"
  tech: ["Jekyll", "HTML", "CSS", "JavaScript"]

- name: "プロジェクト2"
  description: "モバイルアプリ開発"
  image: "/assets/images/project2.jpg"
  url: "https://github.com/username/project2"
  tech: ["React Native", "TypeScript"]
```

#### portfolio.html
```html
---
layout: page
title: "ポートフォリオ"
permalink: /portfolio/
---

<div class="portfolio">
  <h1>作品集</h1>
  
  <div class="projects-grid">
    {% for project in site.data.projects %}
      <div class="project-card">
        <img src="{{ project.image }}" alt="{{ project.name }}">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="tech-tags">
          {% for tech in project.tech %}
            <span class="tech-tag">{{ tech }}</span>
          {% endfor %}
        </div>
        <a href="{{ project.url }}" target="_blank" rel="noopener">詳細を見る</a>
      </div>
    {% endfor %}
  </div>
</div>
```

### 3. ドキュメントサイトの作成

#### _data/navigation.yml
```yaml
- title: "ホーム"
  url: "/"
- title: "ガイド"
  url: "/guides/"
  children:
    - title: "入門編"
      url: "/guides/getting-started/"
    - title: "上級編"
      url: "/guides/advanced/"
- title: "API リファレンス"
  url: "/api/"
- title: "FAQ"
  url: "/faq/"
```

#### _includes/navigation.html
```html
<nav class="main-nav">
  <ul>
    {% for item in site.data.navigation %}
      <li class="nav-item{% if page.url contains item.url %} active{% endif %}">
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        {% if item.children %}
          <ul class="sub-nav">
            {% for child in item.children %}
              <li><a href="{{ child.url | relative_url }}">{{ child.title }}</a></li>
            {% endfor %}
          </ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</nav>
```

これで Jekyll の包括的なリファレンスと GitHub Pages での運用におけるベストプラクティスが完成しました。このドキュメントは初心者から上級者まで幅広く活用できる内容となっています。