---
layout: page
title: "Node.js リファレンス"
---

# Node.js リファレンス

Node.jsの基本的な使い方とJavaScriptプログラミングのリファレンスです。初学者でも理解しやすいように段階的に説明します。

* 目次
{:toc}

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

## 変数とデータ型

### 変数の宣言

```javascript
// let - 変更可能な変数
let name = '太郎';
let age = 25;

// const - 変更不可能な定数
const PI = 3.14159;
const message = 'こんにちは';

// var - 古い書き方（推奨しない）
var oldStyle = '使わない方が良い';

console.log(name); // 太郎
console.log(age);  // 25
```

### データ型

```javascript
// 文字列（String）
let firstName = '山田';
let lastName = "太郎";
let fullName = `${lastName} ${firstName}`; // テンプレートリテラル

// 数値（Number）
let integer = 42;
let decimal = 3.14;
let negative = -10;

// 真偽値（Boolean）
let isActive = true;
let isComplete = false;

// 配列（Array）
let fruits = ['りんご', 'バナナ', 'オレンジ'];
let numbers = [1, 2, 3, 4, 5];

// オブジェクト（Object）
let person = {
    name: '田中',
    age: 30,
    city: '東京'
};

// null と undefined
let emptyValue = null;
let undefinedValue;

// データ型の確認
console.log(typeof firstName);  // string
console.log(typeof integer);    // number
console.log(typeof isActive);   // boolean
console.log(typeof fruits);     // object
console.log(typeof person);     // object
```

### 文字列操作

```javascript
let text = 'Hello World';

// 文字列の長さ
console.log(text.length); // 11

// 大文字・小文字変換
console.log(text.toUpperCase()); // HELLO WORLD
console.log(text.toLowerCase()); // hello world

// 文字列の検索
console.log(text.indexOf('World')); // 6
console.log(text.includes('Hello')); // true

// 文字列の置換
console.log(text.replace('World', 'Node.js')); // Hello Node.js

// 文字列の分割
let words = text.split(' ');
console.log(words); // ['Hello', 'World']

// 文字列の結合
let greeting = 'こんにちは';
let target = '世界';
let message = greeting + ', ' + target + '!';
console.log(message); // こんにちは, 世界!

// テンプレートリテラルを使った結合
let user = '田中さん';
let welcomeMessage = `ようこそ、${user}！`;
console.log(welcomeMessage); // ようこそ、田中さん！
```

## 関数

### 関数の定義と呼び出し

```javascript
// 基本的な関数定義
function greet(name) {
    return `こんにちは、${name}さん！`;
}

// 関数の呼び出し
let message = greet('山田');
console.log(message); // こんにちは、山田さん！

// 複数の引数を持つ関数
function add(a, b) {
    return a + b;
}

console.log(add(5, 3)); // 8

// デフォルト引数
function greetWithDefault(name = 'ゲスト') {
    return `こんにちは、${name}さん！`;
}

console.log(greetWithDefault());        // こんにちは、ゲストさん！
console.log(greetWithDefault('田中'));  // こんにちは、田中さん！
```

### アロー関数

```javascript
// 従来の関数
function multiply(a, b) {
    return a * b;
}

// アロー関数
const multiplyArrow = (a, b) => {
    return a * b;
};

// 短縮形（単一式の場合）
const multiplyShort = (a, b) => a * b;

// 引数が1つの場合、括弧を省略可能
const square = x => x * x;

console.log(multiply(4, 5));      // 20
console.log(multiplyArrow(4, 5)); // 20
console.log(multiplyShort(4, 5)); // 20
console.log(square(6));           // 36
```

### 高階関数

```javascript
// 関数を引数として受け取る関数
function calculate(operation, a, b) {
    return operation(a, b);
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;

console.log(calculate(add, 10, 5));      // 15
console.log(calculate(subtract, 10, 5)); // 5

// 関数を返す関数
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12
```

## 配列とオブジェクト

### 配列の操作

```javascript
// 配列の作成
let fruits = ['りんご', 'バナナ', 'オレンジ'];

// 要素の追加
fruits.push('ぶどう');        // 末尾に追加
fruits.unshift('いちご');     // 先頭に追加

console.log(fruits); // ['いちご', 'りんご', 'バナナ', 'オレンジ', 'ぶどう']

// 要素の削除
let lastFruit = fruits.pop();      // 末尾から削除
let firstFruit = fruits.shift();   // 先頭から削除

console.log(lastFruit);  // ぶどう
console.log(firstFruit); // いちご
console.log(fruits);     // ['りんご', 'バナナ', 'オレンジ']

// 配列の検索
console.log(fruits.indexOf('バナナ'));    // 1
console.log(fruits.includes('りんご'));   // true

// 配列の変換
let numbers = [1, 2, 3, 4, 5];

// map: 各要素を変換
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: 条件に合う要素を抽出
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// reduce: 配列を単一の値に変換
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// forEach: 各要素に対して処理を実行
numbers.forEach(num => {
    console.log(`数値: ${num}`);
});
```

### オブジェクトの操作

```javascript
// オブジェクトの作成
let person = {
    name: '田中太郎',
    age: 30,
    city: '東京',
    hobbies: ['読書', '映画鑑賞', 'プログラミング']
};

// プロパティへのアクセス
console.log(person.name);      // 田中太郎
console.log(person['age']);    // 30

// プロパティの追加・変更
person.email = 'tanaka@example.com';
person.age = 31;

// プロパティの削除
delete person.city;

console.log(person);

// オブジェクトのメソッド
let calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract(a, b) { // 短縮記法
        return a - b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6

// オブジェクトの分割代入
let {name, age, hobbies} = person;
console.log(name);    // 田中太郎
console.log(age);     // 31
console.log(hobbies); // ['読書', '映画鑑賞', 'プログラミング']
```

## 条件分岐とループ

### if文

```javascript
let score = 85;

if (score >= 90) {
    console.log('優秀です！');
} else if (score >= 70) {
    console.log('良い成績です');
} else if (score >= 60) {
    console.log('合格です');
} else {
    console.log('頑張りましょう');
}

// 三項演算子
let result = score >= 60 ? '合格' : '不合格';
console.log(result); // 合格

// 論理演算子
let age = 20;
let hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log('運転できます');
}

// switch文
let day = '月曜日';

switch (day) {
    case '月曜日':
        console.log('週の始まりです');
        break;
    case '金曜日':
        console.log('週末が近いです');
        break;
    case '土曜日':
    case '日曜日':
        console.log('休日です');
        break;
    default:
        console.log('平日です');
        break;
}
```

### ループ

```javascript
// for文
console.log('=== for文 ===');
for (let i = 1; i <= 5; i++) {
    console.log(`カウント: ${i}`);
}

// 配列の要素を処理
let colors = ['赤', '青', '緑'];

console.log('=== 配列の処理 ===');
for (let i = 0; i < colors.length; i++) {
    console.log(`色 ${i + 1}: ${colors[i]}`);
}

// for...of文（配列の要素に対して）
console.log('=== for...of文 ===');
for (let color of colors) {
    console.log(`色: ${color}`);
}

// for...in文（オブジェクトのプロパティに対して）
let person = {name: '田中', age: 30, city: '東京'};

console.log('=== for...in文 ===');
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// while文
console.log('=== while文 ===');
let count = 1;
while (count <= 3) {
    console.log(`カウント: ${count}`);
    count++;
}

// do...while文
console.log('=== do...while文 ===');
let num = 1;
do {
    console.log(`数値: ${num}`);
    num++;
} while (num <= 3);
```

## モジュール

### モジュールの作成と使用

**math.js**（数学関数のモジュール）
```javascript
// 関数のエクスポート
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

const PI = 3.14159;

// 複数の要素をエクスポート
module.exports = {
    add,
    subtract,
    multiply,
    PI
};

// または個別にエクスポート
// exports.add = add;
// exports.subtract = subtract;
```

**main.js**（メインファイル）
```javascript
// モジュールのインポート
const math = require('./math');

// 使用例
console.log(math.add(5, 3));        // 8
console.log(math.subtract(10, 4));  // 6
console.log(math.multiply(6, 7));   // 42
console.log(math.PI);               // 3.14159

// 分割代入でインポート
const {add, multiply} = require('./math');

console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20
```

### ES6モジュール

**modern-math.js**
```javascript
// ES6エクスポート記法
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

// デフォルトエクスポート
export default function multiply(a, b) {
    return a * b;
}
```

**modern-main.js**
```javascript
// ES6インポート記法
import multiply, {add, subtract, PI} from './modern-math.js';

console.log(add(5, 3));       // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(6, 7));  // 42
console.log(PI);              // 3.14159
```

### 組み込みモジュール

```javascript
// ファイルシステムモジュール
const fs = require('fs');

// パスモジュール
const path = require('path');

// HTTPモジュール
const http = require('http');

// OSモジュール
const os = require('os');

// システム情報の表示
console.log('OS:', os.type());
console.log('プラットフォーム:', os.platform());
console.log('CPUアーキテクチャ:', os.arch());
console.log('総メモリ:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + 'GB');
```

## ファイル操作

### ファイルの読み書き

```javascript
const fs = require('fs');
const path = require('path');

// 同期的ファイル読み取り
try {
    const data = fs.readFileSync('sample.txt', 'utf8');
    console.log('ファイル内容:', data);
} catch (error) {
    console.error('ファイル読み取りエラー:', error.message);
}

// 非同期ファイル読み取り
fs.readFile('sample.txt', 'utf8', (error, data) => {
    if (error) {
        console.error('エラー:', error.message);
        return;
    }
    console.log('ファイル内容:', data);
});

// ファイル書き込み
const content = 'こんにちは、Node.js！\n新しい行です。';

fs.writeFile('output.txt', content, 'utf8', (error) => {
    if (error) {
        console.error('書き込みエラー:', error.message);
        return;
    }
    console.log('ファイルが正常に書き込まれました');
});

// ファイル追記
fs.appendFile('output.txt', '\n追加されたテキスト', 'utf8', (error) => {
    if (error) {
        console.error('追記エラー:', error.message);
        return;
    }
    console.log('テキストが追加されました');
});
```

### ディレクトリ操作

```javascript
const fs = require('fs');
const path = require('path');

// ディレクトリの作成
fs.mkdir('new-directory', {recursive: true}, (error) => {
    if (error) {
        console.error('ディレクトリ作成エラー:', error.message);
        return;
    }
    console.log('ディレクトリが作成されました');
});

// ディレクトリ内容の読み取り
fs.readdir('.', (error, files) => {
    if (error) {
        console.error('ディレクトリ読み取りエラー:', error.message);
        return;
    }
    
    console.log('ディレクトリ内容:');
    files.forEach(file => {
        const filePath = path.join('.', file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            console.log(`📁 ${file}`);
        } else {
            console.log(`📄 ${file}`);
        }
    });
});

// ファイル情報の取得
fs.stat('package.json', (error, stats) => {
    if (error) {
        console.error('ファイル情報取得エラー:', error.message);
        return;
    }
    
    console.log('ファイル情報:');
    console.log('サイズ:', stats.size, 'バイト');
    console.log('作成日:', stats.birthtime);
    console.log('更新日:', stats.mtime);
    console.log('ディレクトリ:', stats.isDirectory());
    console.log('ファイル:', stats.isFile());
});
```

### パス操作

```javascript
const path = require('path');

// パスの結合
const fullPath = path.join('users', 'documents', 'file.txt');
console.log('結合パス:', fullPath);

// パス情報の取得
const filePath = '/users/john/documents/report.pdf';

console.log('ディレクトリ:', path.dirname(filePath));   // /users/john/documents
console.log('ファイル名:', path.basename(filePath));    // report.pdf
console.log('拡張子:', path.extname(filePath));         // .pdf
console.log('ファイル名（拡張子なし）:', path.basename(filePath, '.pdf')); // report

// 絶対パスと相対パス
console.log('現在のディレクトリ:', process.cwd());
console.log('絶対パス:', path.resolve('relative/path'));

// パスの正規化
const messyPath = '/users//john/../documents/./file.txt';
console.log('正規化パス:', path.normalize(messyPath)); // /users/documents/file.txt
```

## 非同期処理

### コールバック

```javascript
// コールバック関数を使った非同期処理
function fetchData(callback) {
    console.log('データを取得中...');
    
    // 非同期処理をシミュレート
    setTimeout(() => {
        const data = {id: 1, name: '田中太郎'};
        callback(null, data); // エラーなし、データあり
    }, 2000);
}

// 使用例
fetchData((error, data) => {
    if (error) {
        console.error('エラー:', error);
        return;
    }
    console.log('取得したデータ:', data);
});

// コールバック地獄の例
function step1(callback) {
    setTimeout(() => callback(null, 'ステップ1完了'), 1000);
}

function step2(callback) {
    setTimeout(() => callback(null, 'ステップ2完了'), 1000);
}

function step3(callback) {
    setTimeout(() => callback(null, 'ステップ3完了'), 1000);
}

// ネストが深くなる問題
step1((error, result1) => {
    if (error) return console.error(error);
    console.log(result1);
    
    step2((error, result2) => {
        if (error) return console.error(error);
        console.log(result2);
        
        step3((error, result3) => {
            if (error) return console.error(error);
            console.log(result3);
            console.log('すべて完了');
        });
    });
});
```

### Promise

```javascript
// Promiseを使った非同期処理
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        console.log('データを取得中...');
        
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80%の確率で成功
            
            if (success) {
                const data = {id: 1, name: '田中太郎'};
                resolve(data); // 成功
            } else {
                reject(new Error('データ取得に失敗しました')); // 失敗
            }
        }, 2000);
    });
}

// Promise の使用
fetchDataPromise()
    .then(data => {
        console.log('成功:', data);
        return data.name; // 次のthenに値を渡す
    })
    .then(name => {
        console.log('名前:', name);
    })
    .catch(error => {
        console.error('エラー:', error.message);
    })
    .finally(() => {
        console.log('処理完了');
    });

// Promise.all - 複数の非同期処理を並行実行
function delay(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

Promise.all([
    delay(1000, '結果1'),
    delay(2000, '結果2'),
    delay(1500, '結果3')
])
.then(results => {
    console.log('すべて完了:', results); // ['結果1', '結果2', '結果3']
})
.catch(error => {
    console.error('いずれかが失敗:', error);
});
```

### async/await

```javascript
// async/await を使った非同期処理
async function fetchUserData() {
    try {
        console.log('ユーザーデータを取得中...');
        const userData = await fetchDataPromise();
        console.log('ユーザー:', userData);
        
        // 追加のデータ取得
        console.log('追加情報を取得中...');
        const additionalInfo = await delay(1000, '追加情報');
        console.log('追加情報:', additionalInfo);
        
        return {
            user: userData,
            additional: additionalInfo
        };
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
        throw error; // エラーを再スロー
    }
}

// async関数の呼び出し
async function main() {
    try {
        const result = await fetchUserData();
        console.log('最終結果:', result);
    } catch (error) {
        console.error('メイン処理でエラー:', error.message);
    }
}

main();

// ファイル操作での async/await 使用例
const fs = require('fs').promises; // Promiseベースのfs

async function processFile() {
    try {
        // ファイル読み取り
        const data = await fs.readFile('input.txt', 'utf8');
        console.log('ファイル内容:', data);
        
        // データを加工
        const processedData = data.toUpperCase();
        
        // ファイル書き込み
        await fs.writeFile('output.txt', processedData, 'utf8');
        console.log('処理完了');
        
    } catch (error) {
        console.error('ファイル処理エラー:', error.message);
    }
}

processFile();
```

## HTTP とウェブ開発

### 基本的なHTTPサーバー

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

### Express.js を使ったWebアプリケーション

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

### Express.js を使った静的サイトの配信

Express.js を使って静的なWebサイト（HTML、CSS、JavaScript、画像ファイルなど）を効率的に配信する方法を詳しく解説します。

#### 基本的な静的ファイル配信の設定

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

#### サンプル静的ファイル

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


#### 高度な静的ファイル配信設定

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

#### SPA（Single Page Application）対応

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

#### セキュリティ強化

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

#### 開発環境とプロダクション環境の設定

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

#### package.json の設定例

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

### HTTPクライアント

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

## npm パッケージ管理

### package.json の作成

```bash
# 新しいプロジェクトの初期化
npm init

# デフォルト設定で初期化
npm init -y
```

### パッケージのインストール

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

### package.json の例

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

### npm scripts の活用

```bash
# スクリプトの実行
npm start
npm run dev
npm test

# カスタムスクリプトの実行
npm run build
npm run clean
```

### パッケージ管理コマンド

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

## タスクスケジューリング

Node.jsでタスクを定期実行するための主要なライブラリとして、**node-schedule** と **node-cron** があります。それぞれ異なる特徴を持ち、用途に応じて使い分けることが重要です。

### node-schedule による柔軟なスケジューリング

**node-schedule** は、cron形式だけでなく、日付指定や柔軟なルール設定が可能な高機能スケジューラーです。

#### インストール

```bash
npm install node-schedule
```

#### 基本的な使用例

```javascript
const schedule = require('node-schedule');

// 毎分実行（cron形式）
const job1 = schedule.scheduleJob('* * * * *', () => {
    console.log('毎分実行されるタスク:', new Date().toLocaleString());
});

// 特定の日時に実行
const date = new Date(2024, 11, 25, 10, 30, 0); // 2024年12月25日 10:30:00
const job2 = schedule.scheduleJob(date, () => {
    console.log('指定された日時に実行されました!');
});

// ルールオブジェクトを使用した柔軟な設定
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 6]; // 日曜日(0)と土曜日(6)
rule.hour = 9;
rule.minute = 0;

const job3 = schedule.scheduleJob(rule, () => {
    console.log('週末の朝9時に実行されるタスク');
});

// ジョブの管理
console.log('スケジュールされたジョブ数:', Object.keys(schedule.scheduledJobs).length);

// ジョブの停止
setTimeout(() => {
    job1.cancel();
    console.log('job1を停止しました');
}, 5000);
```

#### 高度な使用例

```javascript
const schedule = require('node-schedule');
const fs = require('fs').promises;
const path = require('path');

// データベースバックアップの例
async function createDatabaseBackup() {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = `backup-${timestamp}.json`;
        
        console.log(`📦 データベースバックアップを開始: ${backupFile}`);
        
        // 実際のバックアップ処理（例）
        const mockData = {
            timestamp: new Date().toISOString(),
            users: ['user1', 'user2', 'user3'],
            posts: ['post1', 'post2']
        };
        
        await fs.writeFile(
            path.join(__dirname, 'backups', backupFile), 
            JSON.stringify(mockData, null, 2)
        );
        
        console.log(`✅ バックアップ完了: ${backupFile}`);
        
    } catch (error) {
        console.error('❌ バックアップエラー:', error.message);
    }
}

// 平日の午前2時にバックアップ実行
const backupRule = new schedule.RecurrenceRule();
backupRule.dayOfWeek = [1, 2, 3, 4, 5]; // 月曜日から金曜日
backupRule.hour = 2;
backupRule.minute = 0;

const backupJob = schedule.scheduleJob('database-backup', backupRule, createDatabaseBackup);

// レポート生成の例
function generateDailyReport() {
    const now = new Date();
    const report = {
        date: now.toDateString(),
        time: now.toTimeString(),
        status: 'システム正常',
        activeUsers: Math.floor(Math.random() * 100) + 50,
        systemLoad: (Math.random() * 2).toFixed(2)
    };
    
    console.log('📊 日次レポート:', report);
    
    // メール送信やファイル保存などの処理をここに追加
}

// 毎日午後11時にレポート生成
schedule.scheduleJob('daily-report', '0 23 * * *', generateDailyReport);

// タイムゾーンを指定した実行
schedule.scheduleJob('timezone-job', '0 12 * * *', generateDailyReport, {
    timezone: 'Asia/Tokyo'
});

// ジョブの一覧表示とステータス確認
function showJobStatus() {
    console.log('\n📋 スケジュールされたジョブ一覧:');
    
    for (const name in schedule.scheduledJobs) {
        const job = schedule.scheduledJobs[name];
        console.log(`- ${name}: 次回実行 ${job.nextInvocation()}`);
    }
}

// 30秒後にジョブステータスを表示
setTimeout(showJobStatus, 30000);

// アプリケーション終了時のクリーンアップ
process.on('SIGINT', () => {
    console.log('\n🛑 アプリケーションを終了中...');
    
    // すべてのジョブを停止
    schedule.gracefulShutdown()
        .then(() => {
            console.log('✅ すべてのジョブが正常に停止されました');
            process.exit(0);
        });
});
```

### node-cron による cron 形式スケジューリング

**node-cron** は、GNU crontab互換の軽量なタスクスケジューラーです。シンプルで高速な処理が特徴です。

#### インストール

```bash
npm install node-cron
```

#### 基本的な使用例

```javascript
const cron = require('node-cron');

// 毎分実行
const task1 = cron.schedule('* * * * *', () => {
    console.log('毎分実行中:', new Date().toLocaleString());
});

// 毎日午前9時に実行
cron.schedule('0 9 * * *', () => {
    console.log('おはようございます！毎日午前9時のタスクです');
});

// 平日の午後6時に実行
cron.schedule('0 18 * * 1-5', () => {
    console.log('平日の業務終了時刻です');
});

// 毎週月曜日の午前10時に実行
cron.schedule('0 10 * * 1', () => {
    console.log('週の始まりです！週次レポートを生成します');
});

// 毎月1日の午前0時に実行
cron.schedule('0 0 1 * *', () => {
    console.log('月初めの処理を実行します');
});

// タスクの停止と再開
console.log('task1 実行中:', task1.running); // true

// 5秒後にタスクを停止
setTimeout(() => {
    task1.stop();
    console.log('task1を停止しました');
}, 5000);

// 10秒後にタスクを再開
setTimeout(() => {
    task1.start();
    console.log('task1を再開しました');
}, 10000);
```

#### 高度な使用例

```javascript
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

// ログファイルの定期クリーンアップ
const cleanupLogs = cron.schedule('0 2 * * 0', async () => {
    try {
        console.log('🧹 ログファイルのクリーンアップを開始...');
        
        const logsDir = path.join(__dirname, 'logs');
        const files = await fs.readdir(logsDir);
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        let deletedCount = 0;
        
        for (const file of files) {
            const filePath = path.join(logsDir, file);
            const stats = await fs.stat(filePath);
            
            if (stats.mtime.getTime() < oneWeekAgo) {
                await fs.unlink(filePath);
                deletedCount++;
                console.log(`🗑️ 削除: ${file}`);
            }
        }
        
        console.log(`✅ ログクリーンアップ完了: ${deletedCount}ファイルを削除`);
        
    } catch (error) {
        console.error('❌ ログクリーンアップエラー:', error.message);
    }
}, {
    scheduled: false, // 初期状態では停止
    timezone: "Asia/Tokyo"
});

// システム監視タスク
const systemMonitor = cron.schedule('*/5 * * * *', () => {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    const status = {
        timestamp: new Date().toISOString(),
        memory: {
            rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB'
        },
        uptime: Math.round(uptime) + '秒',
        pid: process.pid
    };
    
    console.log('📊 システム状態:', status);
    
    // メモリ使用量が閾値を超えた場合の警告
    if (memUsage.heapUsed > 100 * 1024 * 1024) { // 100MB
        console.warn('⚠️ メモリ使用量が多くなっています!');
    }
});

// API ヘルスチェック
const healthCheck = cron.schedule('*/10 * * * *', async () => {
    try {
        const https = require('https');
        const url = 'https://api.example.com/health';
        
        console.log('🔍 APIヘルスチェック実行中...');
        
        // 簡単なHTTPリクエストの例
        const response = await new Promise((resolve, reject) => {
            const req = https.get(url, (res) => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers
                });
            });
            
            req.on('error', reject);
            req.setTimeout(5000, () => {
                req.destroy();
                reject(new Error('タイムアウト'));
            });
        });
        
        if (response.statusCode === 200) {
            console.log('✅ API正常');
        } else {
            console.warn(`⚠️ API応答異常: ${response.statusCode}`);
        }
        
    } catch (error) {
        console.error('❌ APIヘルスチェックエラー:', error.message);
    }
});

// タスクの状態を確認する関数
function getTaskStatus() {
    return {
        cleanupLogs: {
            running: cleanupLogs.running,
            description: '週次ログクリーンアップ'
        },
        systemMonitor: {
            running: systemMonitor.running,
            description: '5分間隔システム監視'
        },
        healthCheck: {
            running: healthCheck.running,
            description: '10分間隔APIヘルスチェック'
        }
    };
}

// 管理用のコマンドライン処理
process.stdin.setEncoding('utf8');
console.log('\n📝 管理コマンド:');
console.log('- status: タスクの状態確認');
console.log('- start-cleanup: ログクリーンアップ開始');
console.log('- stop-cleanup: ログクリーンアップ停止');
console.log('- exit: 終了');

process.stdin.on('data', (input) => {
    const command = input.trim().toLowerCase();
    
    switch (command) {
        case 'status':
            console.log('📋 タスク状態:', getTaskStatus());
            break;
            
        case 'start-cleanup':
            cleanupLogs.start();
            console.log('▶️ ログクリーンアップを開始しました');
            break;
            
        case 'stop-cleanup':
            cleanupLogs.stop();
            console.log('⏹️ ログクリーンアップを停止しました');
            break;
            
        case 'exit':
            console.log('👋 アプリケーションを終了します...');
            systemMonitor.stop();
            healthCheck.stop();
            cleanupLogs.stop();
            process.exit(0);
            break;
            
        default:
            console.log('❓ 不明なコマンド:', command);
    }
});

// 初期状態の表示
console.log('\n🚀 タスクスケジューラーが開始されました');
console.log('現在のタスク状態:', getTaskStatus());
```

### node-schedule と node-cron の比較

| 項目 | node-schedule | node-cron |
|------|---------------|-----------|
| **サイズ** | 大きめ（多機能） | 軽量（シンプル） |
| **cron形式** | ✅ 対応 | ✅ 対応（GNU crontab互換） |
| **日付指定** | ✅ 対応 | ❌ 非対応 |
| **ルールオブジェクト** | ✅ 対応 | ❌ 非対応 |
| **タイムゾーン** | ✅ 対応 | ✅ 限定的対応 |
| **ジョブ管理** | ✅ 詳細管理可能 | ✅ 基本的な開始/停止 |
| **パフォーマンス** | 普通 | 高速 |
| **学習コスト** | 高い | 低い |
| **メモリ使用量** | 多め | 少ない |

### 選択指針

#### node-schedule を選ぶべき場合

```javascript
// ✅ これらの機能が必要な場合は node-schedule
const schedule = require('node-schedule');

// 1. 特定の日時実行
const specificDate = new Date(2024, 11, 25, 10, 30, 0);
schedule.scheduleJob(specificDate, () => {
    console.log('クリスマスの特別タスク');
});

// 2. 複雑なルール設定
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 3, 5]; // 月・水・金
rule.hour = [9, 14, 18];    // 9時、14時、18時
schedule.scheduleJob(rule, () => {
    console.log('複雑なスケジュール実行');
});

// 3. 詳細なジョブ管理
const job = schedule.scheduleJob('named-job', '0 */6 * * *', () => {
    console.log('6時間ごとの処理');
});

// ジョブの詳細情報取得
console.log('次回実行予定:', job.nextInvocation());
console.log('ジョブ名:', job.name);
```

#### node-cron を選ぶべき場合

```javascript
// ✅ これらの条件に当てはまる場合は node-cron
const cron = require('node-cron');

// 1. シンプルなcron形式のみで十分
cron.schedule('0 2 * * *', () => {
    console.log('毎日午前2時の定期処理');
});

// 2. 軽量性を重視
cron.schedule('*/30 * * * * *', () => {
    console.log('30秒ごとの軽い処理');
});

// 3. 高頻度実行でパフォーマンス重視
cron.schedule('* * * * * *', () => {
    // 毎秒実行される重要な監視処理
    const memUsage = process.memoryUsage().heapUsed;
    if (memUsage > threshold) {
        console.warn('メモリ使用量警告');
    }
});
```

### 実践的な組み合わせ例

```javascript
// 用途に応じて両方のライブラリを使い分け
const schedule = require('node-schedule');
const cron = require('node-cron');

// node-cron: 高頻度の軽量監視タスク
cron.schedule('*/10 * * * * *', () => {
    // 10秒ごとの簡単なヘルスチェック
    if (process.memoryUsage().heapUsed > 100 * 1024 * 1024) {
        console.warn('⚠️ メモリ使用量が高くなっています');
    }
});

// node-schedule: 複雑なスケジュールの重要なタスク
const maintenanceRule = new schedule.RecurrenceRule();
maintenanceRule.dayOfWeek = 0; // 日曜日
maintenanceRule.hour = 3;      // 午前3時

schedule.scheduleJob('weekly-maintenance', maintenanceRule, async () => {
    console.log('🔧 週次メンテナンス開始');
    
    try {
        // データベースの最適化
        await optimizeDatabase();
        
        // キャッシュのクリア
        await clearCaches();
        
        // バックアップの作成
        await createWeeklyBackup();
        
        console.log('✅ 週次メンテナンス完了');
        
    } catch (error) {
        console.error('❌ メンテナンスエラー:', error.message);
        // エラー通知の送信など
    }
});

// 特定イベント用のワンタイムスケジュール
const newYearDate = new Date(2025, 0, 1, 0, 0, 0);
schedule.scheduleJob('new-year-greeting', newYearDate, () => {
    console.log('🎉 あけましておめでとうございます！');
    // 新年の特別処理
});

async function optimizeDatabase() {
    // データベース最適化の実装
    console.log('📊 データベース最適化中...');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function clearCaches() {
    // キャッシュクリアの実装
    console.log('🧹 キャッシュクリア中...');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function createWeeklyBackup() {
    // バックアップ作成の実装
    console.log('💾 週次バックアップ作成中...');
    await new Promise(resolve => setTimeout(resolve, 3000));
}
```

このセクションでは、Node.jsにおけるタスクスケジューリングの2つの主要なライブラリについて詳しく説明しました。プロジェクトの要件に応じて適切なライブラリを選択し、効率的なタスク自動化を実現してください。

## 実用的な例

### CLI（コマンドライン）ツール

**todo.js** - シンプルなTODOアプリ
```javascript
#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const TODO_FILE = path.join(__dirname, 'todos.json');

// TODOデータの読み込み
async function loadTodos() {
    try {
        const data = await fs.readFile(TODO_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; // ファイルが存在しない場合は空配列
    }
}

// TODOデータの保存
async function saveTodos(todos) {
    await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

// TODO項目を追加
async function addTodo(task) {
    const todos = await loadTodos();
    const newTodo = {
        id: Date.now(),
        task,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    await saveTodos(todos);
    console.log(`✅ TODO追加: "${task}"`);
}

// TODO一覧を表示
async function listTodos() {
    const todos = await loadTodos();
    
    if (todos.length === 0) {
        console.log('📝 TODOはありません');
        return;
    }
    
    console.log('📋 TODO一覧:');
    todos.forEach((todo, index) => {
        const status = todo.completed ? '✅' : '⬜';
        const date = new Date(todo.createdAt).toLocaleDateString();
        console.log(`${index + 1}. ${status} ${todo.task} (作成日: ${date})`);
    });
}

// TODOを完了にする
async function completeTodo(index) {
    const todos = await loadTodos();
    
    if (index < 1 || index > todos.length) {
        console.log('❌ 無効な番号です');
        return;
    }
    
    todos[index - 1].completed = true;
    await saveTodos(todos);
    console.log(`✅ TODO完了: "${todos[index - 1].task}"`);
}

// TODOを削除
async function deleteTodo(index) {
    const todos = await loadTodos();
    
    if (index < 1 || index > todos.length) {
        console.log('❌ 無効な番号です');
        return;
    }
    
    const deletedTodo = todos.splice(index - 1, 1)[0];
    await saveTodos(todos);
    console.log(`🗑️ TODO削除: "${deletedTodo.task}"`);
}

// ヘルプを表示
function showHelp() {
    console.log(`
📝 TODO CLI アプリケーション

使用方法:
  node todo.js add "買い物に行く"     # TODO追加
  node todo.js list                   # TODO一覧表示
  node todo.js complete 1             # TODO完了（番号指定）
  node todo.js delete 1               # TODO削除（番号指定）
  node todo.js help                   # ヘルプ表示

例:
  node todo.js add "Node.jsを学習する"
  node todo.js list
  node todo.js complete 1
    `);
}

// メイン処理
async function main() {
    const [,, command, ...args] = process.argv;
    
    try {
        switch (command) {
            case 'add':
                if (args.length === 0) {
                    console.log('❌ タスクを指定してください');
                    showHelp();
                    return;
                }
                await addTodo(args.join(' '));
                break;
                
            case 'list':
                await listTodos();
                break;
                
            case 'complete':
                const completeIndex = parseInt(args[0]);
                if (isNaN(completeIndex)) {
                    console.log('❌ 有効な番号を指定してください');
                    return;
                }
                await completeTodo(completeIndex);
                break;
                
            case 'delete':
                const deleteIndex = parseInt(args[0]);
                if (isNaN(deleteIndex)) {
                    console.log('❌ 有効な番号を指定してください');
                    return;
                }
                await deleteTodo(deleteIndex);
                break;
                
            case 'help':
            default:
                showHelp();
                break;
        }
    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);
    }
}

// プログラム実行（スクリプトとして直接実行された場合のみ）
if (require.main === module) {
    main();
}
```

**使用例:**
```bash
# 実行権限を付与（Unix系OS）
chmod +x todo.js

# TODO追加
node todo.js add "Node.jsドキュメントを読む"
node todo.js add "Expressアプリを作成する"

# TODO一覧表示
node todo.js list

# TODO完了
node todo.js complete 1

# TODO削除
node todo.js delete 2
```

### ファイル監視とホットリロード

**file-watcher.js**
```javascript
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class FileWatcher {
    constructor(directory = '.', extensions = ['.js', '.json']) {
        this.directory = directory;
        this.extensions = extensions;
        this.childProcess = null;
        this.isRestarting = false;
    }
    
    // ファイルが監視対象かチェック
    shouldWatch(filename) {
        return this.extensions.some(ext => filename.endsWith(ext));
    }
    
    // アプリケーションを開始
    startApp(scriptPath) {
        if (this.childProcess) {
            this.stopApp();
        }
        
        console.log(`🚀 アプリケーションを開始: ${scriptPath}`);
        this.childProcess = spawn('node', [scriptPath], {
            stdio: 'inherit'
        });
        
        this.childProcess.on('exit', (code) => {
            if (!this.isRestarting) {
                console.log(`📱 アプリケーションが終了しました (コード: ${code})`);
            }
        });
    }
    
    // アプリケーションを停止
    stopApp() {
        if (this.childProcess) {
            this.isRestarting = true;
            this.childProcess.kill();
            this.childProcess = null;
            this.isRestarting = false;
        }
    }
    
    // アプリケーションを再起動
    restartApp(scriptPath) {
        console.log('🔄 ファイル変更を検出、再起動中...');
        this.stopApp();
        
        // 少し待ってから再起動
        setTimeout(() => {
            this.startApp(scriptPath);
        }, 1000);
    }
    
    // ファイル監視を開始
    watch(scriptPath) {
        console.log(`👀 ファイル監視を開始: ${this.directory}`);
        console.log(`📄 監視対象拡張子: ${this.extensions.join(', ')}`);
        
        // 初回アプリケーション開始
        this.startApp(scriptPath);
        
        // ディレクトリの監視
        fs.watch(this.directory, { recursive: true }, (eventType, filename) => {
            if (!filename || !this.shouldWatch(filename)) {
                return;
            }
            
            console.log(`📝 ファイル変更: ${filename} (${eventType})`);
            this.restartApp(scriptPath);
        });
        
        // プロセス終了時のクリーンアップ
        process.on('SIGINT', () => {
            console.log('\n🛑 ファイル監視を停止します...');
            this.stopApp();
            process.exit(0);
        });
    }
}

// 使用例
if (require.main === module) {
    const [,, scriptPath] = process.argv;
    
    if (!scriptPath) {
        console.log('使用方法: node file-watcher.js <script-path>');
        console.log('例: node file-watcher.js app.js');
        process.exit(1);
    }
    
    const watcher = new FileWatcher('.', ['.js', '.json']);
    watcher.watch(scriptPath);
}

module.exports = FileWatcher;
```

### RESTful API サーバー

**api-server.js**
```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// ミドルウェア
app.use(express.json());

// CORS設定
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// リクエストログ
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// データファイルの読み込み
async function loadData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [], posts: [] };
    }
}

// データファイルの保存
async function saveData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// バリデーション関数
function validateUser(user) {
    const errors = [];
    
    if (!user.name || user.name.trim().length === 0) {
        errors.push('名前は必須です');
    }
    
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
        errors.push('有効なメールアドレスを入力してください');
    }
    
    return errors;
}

// API ルート
// ユーザー一覧取得
app.get('/api/users', async (req, res) => {
    try {
        const data = await loadData();
        res.json({
            success: true,
            data: data.users,
            count: data.users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'データの読み込みに失敗しました'
        });
    }
});

// 特定ユーザー取得
app.get('/api/users/:id', async (req, res) => {
    try {
        const data = await loadData();
        const userId = parseInt(req.params.id);
        const user = data.users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'ユーザーが見つかりません'
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'データの読み込みに失敗しました'
        });
    }
});

// ユーザー作成
app.post('/api/users', async (req, res) => {
    try {
        const errors = validateUser(req.body);
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors
            });
        }
        
        const data = await loadData();
        const newUser = {
            id: Math.max(0, ...data.users.map(u => u.id)) + 1,
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        data.users.push(newUser);
        await saveData(data);
        
        res.status(201).json({
            success: true,
            data: newUser,
            message: 'ユーザーが作成されました'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'ユーザーの作成に失敗しました'
        });
    }
});

// ユーザー更新
app.put('/api/users/:id', async (req, res) => {
    try {
        const data = await loadData();
        const userId = parseInt(req.params.id);
        const userIndex = data.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'ユーザーが見つかりません'
            });
        }
        
        const errors = validateUser(req.body);
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors
            });
        }
        
        data.users[userIndex] = {
            ...data.users[userIndex],
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            updatedAt: new Date().toISOString()
        };
        
        await saveData(data);
        
        res.json({
            success: true,
            data: data.users[userIndex],
            message: 'ユーザーが更新されました'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'ユーザーの更新に失敗しました'
        });
    }
});

// ユーザー削除
app.delete('/api/users/:id', async (req, res) => {
    try {
        const data = await loadData();
        const userId = parseInt(req.params.id);
        const userIndex = data.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'ユーザーが見つかりません'
            });
        }
        
        const deletedUser = data.users.splice(userIndex, 1)[0];
        await saveData(data);
        
        res.json({
            success: true,
            data: deletedUser,
            message: 'ユーザーが削除されました'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'ユーザーの削除に失敗しました'
        });
    }
});

// ヘルスチェック
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API情報
app.get('/api', (req, res) => {
    res.json({
        name: 'Simple REST API',
        version: '1.0.0',
        endpoints: {
            users: {
                'GET /api/users': 'ユーザー一覧取得',
                'GET /api/users/:id': '特定ユーザー取得',
                'POST /api/users': 'ユーザー作成',
                'PUT /api/users/:id': 'ユーザー更新',
                'DELETE /api/users/:id': 'ユーザー削除'
            },
            system: {
                'GET /health': 'ヘルスチェック',
                'GET /api': 'API情報'
            }
        }
    });
});

// 404ハンドラ
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'エンドポイントが見つかりません',
        availableEndpoints: '/api'
    });
});

// エラーハンドラ
app.use((error, req, res, next) => {
    console.error('サーバーエラー:', error);
    res.status(500).json({
        success: false,
        error: 'サーバー内部エラーが発生しました'
    });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`🚀 RESTful API サーバーが起動しました: http://localhost:${PORT}`);
    console.log(`📖 API情報: http://localhost:${PORT}/api`);
    console.log(`❤️ ヘルスチェック: http://localhost:${PORT}/health`);
});

// 優雅な終了処理
process.on('SIGINT', () => {
    console.log('\n🛑 サーバーを停止します...');
    process.exit(0);
});
```

### デバッグとエラーハンドリング

```javascript
// デバッグ情報の表示
function debugLog(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
        const timestamp = new Date().toISOString();
        console.log(`[DEBUG ${timestamp}] ${message}`);
        if (data) {
            console.log(JSON.stringify(data, null, 2));
        }
    }
}

// エラーのタイプ別処理
class CustomError extends Error {
    constructor(message, type = 'GENERAL', statusCode = 500) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
    }
}

// バリデーションエラー
class ValidationError extends CustomError {
    constructor(message, field = null) {
        super(message, 'VALIDATION', 400);
        this.field = field;
    }
}

// 認証エラー
class AuthenticationError extends CustomError {
    constructor(message = '認証が必要です') {
        super(message, 'AUTHENTICATION', 401);
    }
}

// リソースが見つからないエラー
class NotFoundError extends CustomError {
    constructor(resource = 'リソース') {
        super(`${resource}が見つかりません`, 'NOT_FOUND', 404);
    }
}

// エラーハンドラー関数
function handleError(error) {
    if (error instanceof CustomError) {
        console.error(`[${error.type}] ${error.message}`);
        console.error(`時刻: ${error.timestamp}`);
        if (error.field) {
            console.error(`フィールド: ${error.field}`);
        }
    } else {
        console.error('予期しないエラー:', error.message);
        console.error(error.stack);
    }
}

// try-catch の実践例
async function safeFileOperation(filename, content) {
    try {
        debugLog('ファイル操作開始', { filename, contentLength: content.length });
        
        // ファイル名のバリデーション
        if (!filename || filename.trim().length === 0) {
            throw new ValidationError('ファイル名は必須です', 'filename');
        }
        
        // ファイルの存在チェック
        try {
            await fs.access(filename);
            debugLog('ファイルが既に存在します', { filename });
        } catch {
            debugLog('新しいファイルを作成します', { filename });
        }
        
        // ファイル書き込み
        await fs.writeFile(filename, content, 'utf8');
        debugLog('ファイル書き込み完了', { filename });
        
        return { success: true, filename };
        
    } catch (error) {
        handleError(error);
        
        if (error instanceof ValidationError) {
            return { success: false, error: error.message, field: error.field };
        }
        
        return { success: false, error: 'ファイル操作に失敗しました' };
    }
}

// 使用例
async function example() {
    // 正常なケース
    const result1 = await safeFileOperation('test.txt', 'テストコンテンツ');
    console.log('結果1:', result1);
    
    // エラーケース
    const result2 = await safeFileOperation('', 'コンテンツ');
    console.log('結果2:', result2);
}

// プロセス全体のエラーハンドリング
process.on('uncaughtException', (error) => {
    console.error('キャッチされていないエラー:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('処理されていないPromise拒否:', reason);
    console.error('Promise:', promise);
});

// 使用例実行
if (require.main === module) {
    example();
}
```

## 参考情報

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
