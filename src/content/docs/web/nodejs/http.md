---
title: "Node.js: HTTP とウェブ開発"
description: "Node.js リファレンスのうち、HTTP とウェブ開発についてまとめたページです。"
sidebar:
  label: "HTTP とウェブ開発"
  order: 4
---

## 基本的なHTTPサーバー

```javascript
const http = require('http');
const url = require('url');

// 基本的なサーバー作成
const server = http.createServer((request, response) => {
    // リクエスト情報の取得
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    const method = request.method;

    console.log(`${method} ${path}`);

    // レスポンスヘッダーの設定
    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    // ルーティング
    if (path === '/') {
        response.statusCode = 200;
        response.end(`
            <h1>Node.js サーバー</h1>
            <p>ようこそ！</p>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/api/users">API</a></li>
            </ul>
        `);
    } else if (path === '/about') {
        response.statusCode = 200;
        response.end(`
            <h1>About</h1>
            <p>このサーバーはNode.jsで作成されました。</p>
            <a href="/">ホームに戻る</a>
        `);
    } else if (path === '/api/users') {
        // JSON API
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;

        const users = [
            {id: 1, name: '田中太郎', email: 'tanaka@example.com'},
            {id: 2, name: '佐藤花子', email: 'sato@example.com'}
        ];

        response.end(JSON.stringify(users, null, 2));
    } else {
        // 404 Not Found
        response.statusCode = 404;
        response.end(`
            <h1>404 - ページが見つかりません</h1>
            <p>お探しのページは存在しません。</p>
            <a href="/">ホームに戻る</a>
        `);
    }
});

// サーバー起動
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});

// サーバー停止の処理
process.on('SIGINT', () => {
    console.log('\nサーバーを停止します...');
    server.close(() => {
        console.log('サーバーが停止しました');
        process.exit(0);
    });
});

```

## Express.js を使ったWebアプリケーション

まず Express をインストール:

```bash
npm install express

```

**app.js**

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// ミドルウェア設定
app.use(express.json()); // JSON解析
app.use(express.static('public')); // 静的ファイル配信

// ルート定義
app.get('/', (req, res) => {
    res.send(`
        <h1>Express サーバー</h1>
        <p>Express.js を使ったウェブアプリケーション</p>
        <ul>
            <li><a href="/users">ユーザー一覧</a></li>
            <li><a href="/api/users">JSON API</a></li>
        </ul>
    `);
});

// ユーザーデータ（本来はデータベースから取得）
let users = [
    {id: 1, name: '田中太郎', email: 'tanaka@example.com'},
    {id: 2, name: '佐藤花子', email: 'sato@example.com'},
    {id: 3, name: '鈴木一郎', email: 'suzuki@example.com'}
];

// ユーザー一覧ページ
app.get('/users', (req, res) => {
    const userList = users.map(user =>
        `<li>${user.name} (${user.email})</li>`
    ).join('');

    res.send(`
        <h1>ユーザー一覧</h1>
        <ul>${userList}</ul>
        <a href="/">ホームに戻る</a>
    `);
});

// API: ユーザー一覧取得
app.get('/api/users', (req, res) => {
    res.json(users);
});

// API: 特定ユーザー取得
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({error: 'ユーザーが見つかりません'});
    }
});

// API: ユーザー作成
app.post('/api/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: '名前とメールアドレスは必須です'});
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// API: ユーザー更新
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({error: 'ユーザーが見つかりません'});
    }

    const {name, email} = req.body;

    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    res.json(users[userIndex]);
});

// API: ユーザー削除
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({error: 'ユーザーが見つかりません'});
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({message: 'ユーザーが削除されました', user: deletedUser});
});

// 404ハンドラ
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - ページが見つかりません</h1>
        <p>お探しのページは存在しません。</p>
        <a href="/">ホームに戻る</a>
    `);
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Express サーバーが起動しました: http://localhost:${PORT}`);
});

```

## Express.js を使った静的サイトの配信

Express.js を使って静的なWebサイト（HTML、CSS、JavaScript、画像ファイルなど）を効率的に配信する方法を詳しく解説します。

### 基本的な静的ファイル配信の設定

**プロジェクト構造:**

```

my-static-site/
├── app.js              # Express サーバー
├── package.json        # 依存関係管理
├── public/             # 静的ファイル用ディレクトリ
│   ├── index.html     # メインページ
│   ├── about.html     # アバウトページ
│   ├── css/
│   │   └── style.css  # スタイルシート
│   ├── js/
│   │   └── main.js    # JavaScript
│   └── images/
│       └── logo.png   # 画像ファイル
└── views/             # テンプレート（必要に応じて）

```

**基本的なサーバー設定 (app.js):**

```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの配信設定
app.use(express.static('public'));

// または、より明示的にパスを指定
app.use(express.static(path.join(__dirname, 'public')));

// サーバー起動
app.listen(PORT, () => {
    console.log(`静的サイトサーバーが起動しました: http://localhost:${PORT}`);
    console.log(`公開ディレクトリ: ${path.join(__dirname, 'public')}`);
});

```

### サンプル静的ファイル

**public/index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express 静的サイト</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <h1>Express.js 静的サイト</h1>
    <p>静的ファイルが正常に配信されています。</p>
    <script src="/script.js"></script>
</body>
</html>

```

**public/style.css:**

```css
body {
    font-family: Arial, sans-serif;
    margin: 50px;
    background-color: #f4f4f4;
}

h1 {
    color: #333;
}

p {
    color: #666;
}

```

**public/script.js:**

```javascript
console.log('静的ファイルが読み込まれました');
document.addEventListener('DOMContentLoaded', function() {
    alert('Express.js サーバーが動作しています！');
});

```

### 高度な静的ファイル配信設定

**複数の静的ディレクトリの設定:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// 複数の静的ディレクトリを設定
app.use('/static', express.static('public'));           // /static/css/style.css
app.use('/assets', express.static('assets'));           // /assets/images/logo.png
app.use('/uploads', express.static('uploads'));         // /uploads/file.pdf
app.use(express.static('public'));                      // /css/style.css (デフォルト)

// ファイルタイプ別の設定
app.use('/css', express.static('public/css', {
    maxAge: '1d',  // CSS ファイルは1日キャッシュ
    setHeaders: (res, path) => {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
}));

app.use('/js', express.static('public/js', {
    maxAge: '1h',  // JavaScript ファイルは1時間キャッシュ
}));

app.use('/images', express.static('public/images', {
    maxAge: '7d',  // 画像ファイルは7日キャッシュ
}));

```

**キャッシュとパフォーマンス最適化:**

```javascript
const express = require('express');
const compression = require('compression'); // npm install compression
const app = express();

// Gzip圧縮を有効化
app.use(compression());

// 静的ファイルの詳細設定
app.use(express.static('public', {
    // キャッシュ設定
    maxAge: '1d',                    // デフォルト1日キャッシュ

    // ETag を有効化（ファイル変更検出）
    etag: true,

    // Last-Modified ヘッダーを設定
    lastModified: true,

    // 隠しファイルへのアクセスを拒否
    dotfiles: 'deny',

    // インデックスファイルの設定
    index: ['index.html', 'index.htm'],

    // ファイルが見つからない場合の処理
    fallthrough: true,

    // 詳細なヘッダー設定
    setHeaders: (res, path, stat) => {
        // セキュリティヘッダー
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

        // ファイルタイプ別の設定
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        } else if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1年
        } else if (path.match(/\.(jpg|jpeg|png|gif|ico|svg)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30日
        }
    }
}));

```

### SPA（Single Page Application）対応

**React/Vue.js などのSPA用設定:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// 静的ファイル配信
app.use(express.static(path.join(__dirname, 'build')));

// API ルート（必要に応じて）
app.get('/api/*', (req, res) => {
    res.json({ message: 'API endpoint' });
});

// SPA用のフォールバック - すべてのルートを index.html に向ける
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SPA サーバーが起動しました: http://localhost:${PORT}`);
});

```

### セキュリティ強化

**セキュリティ対策を含む設定:**

```javascript
const express = require('express');
const helmet = require('helmet');     // npm install helmet
const rateLimit = require('express-rate-limit'); // npm install express-rate-limit
const path = require('path');

const app = express();

// セキュリティミドルウェア
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// レート制限
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分
    max: 100, // 最大100リクエスト
    message: 'リクエストが多すぎます。しばらく待ってから再試行してください。'
});
app.use(limiter);

// 静的ファイル配信（セキュリティ強化）
app.use(express.static('public', {
    dotfiles: 'deny',           // 隠しファイルアクセス拒否
    index: false,               // ディレクトリ一覧表示を無効化
    setHeaders: (res, path) => {
        // セキュリティヘッダー強化
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');

        // 実行可能ファイルのダウンロード防止
        if (path.match(/\.(exe|bat|cmd|com|pif|scr|vbs|js)$/i)) {
            res.setHeader('Content-Disposition', 'attachment');
        }
    }
}));

// 404エラーのカスタムページ
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

```

### 開発環境とプロダクション環境の設定

**環境別設定ファイル:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// 環境変数の設定
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

// 開発環境での設定
if (NODE_ENV === 'development') {
    // 詳細なログ出力
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });

    // 開発用ミドルウェア
    app.use(express.static('public', {
        maxAge: 0,          // キャッシュ無効
        etag: false,        // ETag 無効
        lastModified: false // Last-Modified 無効
    }));

    // ホットリロード対応（webpack-dev-server等と組み合わせ）
    app.get('/dev-reload', (req, res) => {
        res.json({ reload: true });
    });

} else {
    // プロダクション環境での設定
    const compression = require('compression');
    const helmet = require('helmet');

    app.use(compression());
    app.use(helmet());

    // 強力なキャッシュ設定
    app.use(express.static('public', {
        maxAge: '1y',       // 1年間のキャッシュ
        etag: true,
        lastModified: true,
        immutable: true
    }));
}

// 共通設定
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`サーバーが起動しました (${NODE_ENV}): http://localhost:${PORT}`);
});

```

### package.json の設定例

**依存関係とスクリプト:**

```json
{
  "name": "express-static-site",
  "version": "1.0.0",
  "description": "Express.js を使った静的サイト配信",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "NODE_ENV=development nodemon app.js",
    "build": "npm run clean && npm run copy-assets",
    "clean": "rm -rf dist",
    "copy-assets": "cp -r public dist",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "keywords": ["express", "static", "web", "server"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4",
    "helmet": "^6.1.5",
    "express-rate-limit": "^6.7.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}

```

## HTTPクライアント

```javascript
const http = require('http');
const https = require('https');

// 基本的なGETリクエスト
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;

        const request = client.get(url, (response) => {
            let data = '';

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                resolve({
                    statusCode: response.statusCode,
                    headers: response.headers,
                    body: data
                });
            });
        });

        request.on('error', reject);
    });
}

// 使用例
async function fetchData() {
    try {
        const response = await makeRequest('https://jsonplaceholder.typicode.com/posts/1');
        console.log('ステータス:', response.statusCode);
        console.log('データ:', JSON.parse(response.body));
    } catch (error) {
        console.error('リクエストエラー:', error.message);
    }
}

fetchData();

```
