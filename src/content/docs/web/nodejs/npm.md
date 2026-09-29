---
title: "Node.js: npm パッケージ管理"
description: "Node.js リファレンスのうち、npm パッケージ管理についてまとめたページです。"
sidebar:
  label: "npm パッケージ管理"
  order: 5
---

## package.json の作成

```bash
# 新しいプロジェクトの初期化

npm init

# デフォルト設定で初期化

npm init -y

```

## パッケージのインストール

```bash
# ローカルインストール（プロジェクト専用）

npm install express

# 開発時のみ使用するパッケージ

npm install --save-dev nodemon

# グローバルインストール（システム全体）

npm install -g npm@latest

# 特定のバージョンをインストール

npm install express@4.18.0

# 複数のパッケージを同時にインストール

npm install express cors helmet

```

## package.json の例

```json
{
  "name": "my-nodejs-app",
  "version": "1.0.0",
  "description": "Node.js学習用アプリケーション",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "build": "npm run clean && npm run compile",
    "clean": "rm -rf dist",
    "compile": "babel src -d dist"
  },
  "keywords": ["nodejs", "express", "tutorial"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^6.1.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}

```

## npm scripts の活用

```bash
# スクリプトの実行

npm start
npm run dev
npm test

# カスタムスクリプトの実行

npm run build
npm run clean

```

## パッケージ管理コマンド

```bash
# インストール済みパッケージの確認

npm list
npm list --depth=0  # トップレベルのみ

# パッケージの更新

npm update
npm update express  # 特定のパッケージのみ

# パッケージの削除

npm uninstall express
npm uninstall --save-dev nodemon

# パッケージ情報の確認

npm info express
npm view express versions --json

# セキュリティ監査

npm audit
npm audit fix

# キャッシュのクリア

npm cache clean --force

```
