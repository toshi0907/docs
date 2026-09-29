---
title: "Node.js リファレンス"
description: "Node.jsの基本的な使い方とJavaScriptプログラミングのリファレンスです。"
sidebar:
  label: "概要"
  order: 0
---

Node.jsの基本的な使い方とJavaScriptプログラミングのリファレンスです。初学者でも理解しやすいように段階的に説明します。

## 基本概念

### Node.js とは

Node.jsは、JavaScriptをサーバーサイドで実行するためのランタイム環境です。従来はブラウザでしか動作しなかったJavaScriptを、コンピュータ上で直接実行できるようになります。

**特徴:**
- 高速なV8 JavaScriptエンジンを使用
- 非同期I/Oによる高いパフォーマンス
- 豊富なパッケージエコシステム（npm）
- クロスプラットフォーム対応

### 最初のプログラム

**hello.js**

```javascript
// コンソールに文字列を出力
console.log('Hello, Node.js!');

```

**実行方法:**

```bash
node hello.js

```

## インストールと環境設定

### Node.js のインストール

**公式サイトからダウンロード:**
1. https://nodejs.org/ にアクセス
2. LTS版（推奨）をダウンロード
3. インストーラーを実行

**バージョン確認:**

```bash
# Node.jsのバージョン確認

node --version

# npmのバージョン確認

npm --version

```

### 開発環境の設定

**推奨エディタ:**
- Visual Studio Code
- WebStorm
- Atom

**便利な拡張機能（VS Code）:**
- JavaScript (ES6) code snippets
- Node.js Extension Pack
- ESLint

## ページ構成

Node.js リファレンスは次のページで構成されています。

- [言語の基本](/docs/web/nodejs/basics/) — 変数とデータ型、関数、配列とオブジェクト、条件分岐とループ
- [モジュールとファイル操作](/docs/web/nodejs/modules-fs/) — モジュール、ファイル操作
- [非同期処理](/docs/web/nodejs/async/)
- [HTTP とウェブ開発](/docs/web/nodejs/http/)
- [npm パッケージ管理](/docs/web/nodejs/npm/)
- [タスクスケジューリング](/docs/web/nodejs/scheduling/)
- [実用的な例](/docs/web/nodejs/examples/)
- [デバッグと本番運用](/docs/web/nodejs/operations/) — デバッグと監視、本番環境でのデプロイ
