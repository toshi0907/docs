---
title: "Node.js: デバッグと本番運用"
description: "Node.js リファレンスのうち、デバッグと監視、本番環境でのデプロイについてまとめたページです。"
sidebar:
  label: "デバッグと本番運用"
  order: 8
---

## デバッグと監視

### デバッグ技法

```javascript
// Node.js デバッガーの使用
// ブレークポイントを設定
debugger;

// コマンドラインでデバッガーを起動
// node inspect app.js

// VS Code でのデバッグ設定例（.vscode/launch.json）
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Node.js デバッグ",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/app.js",
            "console": "integratedTerminal",
            "skipFiles": ["<node_internals>/**"]
        }
    ]
}

```

### 環境変数の使用

```javascript
// .env ファイルの使用（dotenvパッケージ）
// npm install dotenv

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'localhost';

console.log('ポート:', PORT);
console.log('データベースURL:', DATABASE_URL);

// 環境変数の設定例（.env ファイル）
// PORT=3000
// NODE_ENV=development
// DATABASE_URL=mongodb://localhost:27017/myapp

```

### パフォーマンス監視

```javascript
// 実行時間の測定
console.time('処理時間');

// 何らかの処理
for (let i = 0; i < 1000000; i++) {
    // 重い処理
}

console.timeEnd('処理時間'); // 処理時間: 123.456ms

// メモリ使用量の確認
const memoryUsage = process.memoryUsage();
console.log('メモリ使用量:');
console.log('RSS:', Math.round(memoryUsage.rss / 1024 / 1024) + 'MB');
console.log('Heap合計:', Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB');
console.log('Heap使用:', Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB');

```

## 本番環境でのデプロイ

Node.jsアプリケーションを本番環境で安定運用するための基本的な手法について説明します。

### 環境変数の管理

**本番用の環境変数設定:**

```bash
# .env.production

NODE_ENV=production
PORT=80
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
LOG_LEVEL=info

```

### PM2によるプロセス管理

PM2は本番環境でのNode.jsアプリケーション管理に最適なツールです。

#### PM2のインストールと基本設定

```bash
# PM2のグローバルインストール

npm install -g pm2

# アプリケーションの起動

pm2 start app.js --name "my-app"

# クラスターモードで起動（CPUコア数分のプロセス）

pm2 start app.js --name "my-app" -i max

# 状態確認

pm2 status
pm2 logs
pm2 monit

```

#### ecosystem.config.js - 本番用設定ファイル

```javascript
module.exports = {
    apps: [{
        name: 'my-node-app',
        script: 'app.js',

        // インスタンス設定
        instances: 'max',        // CPUコア数分のプロセス
        exec_mode: 'cluster',    // クラスターモード

        // 環境変数
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 80
        },

        // ログ設定
        log_file: './logs/app.log',
        error_file: './logs/error.log',
        out_file: './logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

        // 自動再起動設定
        max_restarts: 10,
        min_uptime: '10s',
        max_memory_restart: '500M',
        autorestart: true,

        // ヘルスチェック
        health_check_grace_period: 3000,

        // その他の本番設定
        merge_logs: true,
        time: true,

        // Node.jsオプション
        node_args: '--max-old-space-size=1024'
    }],

    // デプロイ設定
    deploy: {
        production: {
            user: 'deploy',
            host: 'your-server.com',
            ref: 'origin/main',
            repo: 'git@github.com:username/your-app.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};

```

#### PM2運用コマンド

```bash
# 本番環境でのアプリケーション起動

pm2 start ecosystem.config.js --env production

# アプリケーションの管理

pm2 restart my-node-app      # 再起動
pm2 reload my-node-app       # ゼロダウンタイム再起動
pm2 stop my-node-app         # 停止
pm2 delete my-node-app       # 削除

# ログの確認と管理

pm2 logs my-node-app         # リアルタイムログ
pm2 logs --lines 100         # 過去100行のログ
pm2 flush                    # ログファイルのクリア

# プロセス情報の確認

pm2 describe my-node-app     # 詳細情報
pm2 monit                    # リアルタイム監視
pm2 list                     # プロセス一覧

# PM2の自動起動設定

pm2 startup                  # システム起動時の自動開始設定
pm2 save                     # 現在のプロセス設定を保存
pm2 resurrect               # 保存済み設定からプロセス復元

# リソース監視とスケーリング

pm2 scale my-node-app 4      # プロセス数を4に変更
pm2 reset my-node-app        # メトリクスをリセット

```

#### PM2でのログローテーション

```bash
# PM2ログローテーションモジュールのインストール

pm2 install pm2-logrotate

# ログローテーション設定

pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true

```

#### PM2クラスター間通信

```javascript
// app.js - クラスター間でのデータ共有
process.on('message', (data) => {
    if (data.type === 'broadcast') {
        console.log('受信データ:', data.payload);
    }
});

// 全クラスターにメッセージ送信
function broadcastToAll(message) {
    process.send({
        type: 'process:msg',
        data: {
            type: 'broadcast',
            payload: message
        }
    });
}

```

### 基本的なセキュリティ対策

```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// セキュリティヘッダー設定
app.use(helmet());

// レート制限
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分
    max: 100 // リクエスト数制限
});
app.use(limiter);

// 本番環境設定
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

```

### Docker化（オプション）

```dockerfile
# Dockerfile

FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
USER node

CMD ["node", "app.js"]

```

```bash
# Dockerビルドとデプロイ

docker build -t my-node-app .
docker run -d --name my-app -p 80:3000 my-node-app

```

このNode.jsリファレンスは、初学者が段階的に学習できるよう構成されています。基本概念から始まり、実用的なプロジェクト例まで幅広くカバーしており、実際の開発で使用できるコード例を豊富に含んでいます。
