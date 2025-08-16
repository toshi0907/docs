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

## 本番環境でのデプロイ

Node.jsアプリケーションを本番環境にデプロイする際の重要な考慮事項とベストプラクティスについて詳しく解説します。

### 本番環境のセットアップ

#### 環境変数の管理

**本番用の環境変数設定:**
```bash
# 本番環境用の .env.production ファイル
NODE_ENV=production
PORT=80
DATABASE_URL=postgresql://user:password@db-server:5432/myapp
REDIS_URL=redis://redis-server:6379
JWT_SECRET=your-super-secure-jwt-secret-key
API_KEY=your-production-api-key
LOG_LEVEL=info
```

**セキュアな環境変数管理:**
```javascript
// config/environment.js
const dotenv = require('dotenv');

// 環境に応じた設定ファイルの読み込み
const envFile = process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env.development';

dotenv.config({ path: envFile });

const config = {
    // 必須の環境変数をチェック
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // データベース設定
    database: {
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
    },
    
    // セキュリティ設定
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES || '24h'
    },
    
    // ログ設定
    logging: {
        level: process.env.LOG_LEVEL || 'debug'
    }
};

// 必須環境変数の検証
function validateConfig() {
    const required = ['DATABASE_URL', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

if (process.env.NODE_ENV === 'production') {
    validateConfig();
}

module.exports = config;
```

#### プロセス管理（PM2）

**PM2のインストールと設定:**
```bash
# PM2のグローバルインストール
npm install -g pm2

# アプリケーションの起動
pm2 start app.js --name "my-app"

# クラスターモードで起動（CPUコア数分のプロセス）
pm2 start app.js --name "my-app" -i max

# PM2の状態確認
pm2 status
pm2 logs
pm2 monit
```

**ecosystem.config.js - PM2設定ファイル:**
```javascript
module.exports = {
    apps: [{
        name: 'my-node-app',
        script: 'app.js',
        
        // 実行環境
        cwd: '/path/to/your/app',
        node_args: '--max-old-space-size=1024',
        
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
        
        // 再起動設定
        max_restarts: 5,
        min_uptime: '10s',
        max_memory_restart: '500M',
        
        // ウォッチ設定（開発時のみ）
        watch: false,
        ignore_watch: ['node_modules', 'logs'],
        
        // 自動再起動設定
        autorestart: true,
        
        // ヘルスチェック
        health_check_grace_period: 3000,
        
        // その他の設定
        merge_logs: true,
        time: true
    }],
    
    // デプロイ設定
    deploy: {
        production: {
            user: 'deploy',
            host: 'your-server.com',
            ref: 'origin/main',
            repo: 'git@github.com:username/your-app.git',
            path: '/var/www/production',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
```

**PM2運用コマンド:**
```bash
# 本番環境でのアプリケーション起動
pm2 start ecosystem.config.js --env production

# アプリケーションの管理
pm2 restart my-node-app      # 再起動
pm2 reload my-node-app       # ゼロダウンタイム再起動
pm2 stop my-node-app         # 停止
pm2 delete my-node-app       # 削除

# ログの確認
pm2 logs my-node-app         # リアルタイムログ
pm2 logs --lines 100         # 過去100行のログ

# プロセス情報の確認
pm2 describe my-node-app     # 詳細情報
pm2 monit                    # リアルタイム監視

# PM2の自動起動設定
pm2 startup                  # システム起動時の自動開始
pm2 save                     # 現在の設定を保存
```

### セキュリティ対策

#### セキュリティヘッダーとミドルウェア

```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');

const app = express();

// セキュリティミドルウェア
app.use(helmet({
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    },
    
    // HSTS (Strict Transport Security)
    hsts: {
        maxAge: 31536000,          // 1年
        includeSubDomains: true,
        preload: true
    },
    
    // その他のセキュリティヘッダー
    noSniff: true,                 // X-Content-Type-Options
    frameguard: { action: 'deny' }, // X-Frame-Options
    xssFilter: true,               // X-XSS-Protection
    referrerPolicy: { policy: 'same-origin' }
}));

// レート制限
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,     // 15分
    max: 100,                      // 最大100リクエスト
    message: {
        error: 'Too many requests',
        retryAfter: 15 * 60
    },
    standardHeaders: true,         // Rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,          // Disable the `X-RateLimit-*` headers
    
    // スキップ条件
    skip: (req) => {
        // 特定のIPアドレスをスキップ
        const trustedIPs = ['127.0.0.1', '::1'];
        return trustedIPs.includes(req.ip);
    }
});

app.use('/api/', limiter);

// CORS設定
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://yourdomain.com',
            'https://www.yourdomain.com'
        ];
        
        // 本番環境では厳格にチェック
        if (process.env.NODE_ENV === 'production') {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            callback(null, true); // 開発環境では全て許可
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// 圧縮
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024
}));
```

#### 入力値の検証とサニタイゼーション

```javascript
const joi = require('joi');
const validator = require('validator');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

// MongoDB インジェクション対策
app.use(mongoSanitize());

// XSS対策のミドルウェア
const xssProtection = (req, res, next) => {
    // リクエストボディのサニタイゼーション
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next();
};

app.use(xssProtection);

// バリデーションスキーマの例
const userSchema = joi.object({
    name: joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/)
        .required(),
    
    email: joi.string()
        .email()
        .max(255)
        .required(),
    
    password: joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required(),
    
    age: joi.number()
        .integer()
        .min(0)
        .max(150)
        .optional()
});

// バリデーションミドルウェア
const validateUser = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }
    
    req.validatedData = value;
    next();
};

// ユーザー作成エンドポイント
app.post('/api/users', validateUser, async (req, res) => {
    try {
        const userData = req.validatedData;
        
        // パスワードのハッシュ化
        const bcrypt = require('bcrypt');
        const saltRounds = 12;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        
        // ユーザー作成処理
        const user = await createUser(userData);
        
        // パスワードを除いてレスポンス
        const { password, ...userResponse } = user;
        
        res.status(201).json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'User creation failed'
        });
    }
});
```

### パフォーマンス最適化

#### キャッシュ戦略

```javascript
const Redis = require('redis');
const redis = Redis.createClient({
    url: process.env.REDIS_URL,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('Redis server connection refused');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

// キャッシュミドルウェア
const cacheMiddleware = (duration = 300) => {
    return async (req, res, next) => {
        const key = `cache:${req.originalUrl}`;
        
        try {
            const cached = await redis.get(key);
            
            if (cached) {
                console.log('Cache hit:', key);
                return res.json(JSON.parse(cached));
            }
            
            // レスポンスを拦截してキャッシュに保存
            const originalJson = res.json;
            res.json = function(data) {
                redis.setex(key, duration, JSON.stringify(data));
                console.log('Cached:', key);
                return originalJson.call(this, data);
            };
            
            next();
        } catch (error) {
            console.error('Cache error:', error);
            next();
        }
    };
};

// 使用例
app.get('/api/users', cacheMiddleware(600), async (req, res) => {
    // 10分間キャッシュされるAPIエンドポイント
    const users = await getUsers();
    res.json({ success: true, data: users });
});

// セッションベースのキャッシュ
const userSpecificCache = (duration = 300) => {
    return async (req, res, next) => {
        const userId = req.user?.id;
        if (!userId) return next();
        
        const key = `user_cache:${userId}:${req.originalUrl}`;
        
        try {
            const cached = await redis.get(key);
            if (cached) {
                return res.json(JSON.parse(cached));
            }
            
            const originalJson = res.json;
            res.json = function(data) {
                redis.setex(key, duration, JSON.stringify(data));
                return originalJson.call(this, data);
            };
            
            next();
        } catch (error) {
            next();
        }
    };
};
```

#### データベース最適化

```javascript
// 接続プールの設定
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    
    // 接続プール設定
    min: 2,                    // 最小接続数
    max: 20,                   // 最大接続数
    idleTimeoutMillis: 30000,  // アイドルタイムアウト
    connectionTimeoutMillis: 2000, // 接続タイムアウト
    
    // SSL設定（本番環境）
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});

// クエリ実行ヘルパー
const query = async (text, params) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        
        // スロークエリのログ出力
        if (duration > 1000) {
            console.warn(`Slow query detected: ${duration}ms`, { text, params });
        }
        
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// ページネーション付きクエリ
const getPaginatedUsers = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    
    // 総数とデータを並行取得
    const [countResult, usersResult] = await Promise.all([
        query('SELECT COUNT(*) FROM users'),
        query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset])
    ]);
    
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);
    
    return {
        users: usersResult.rows,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
};
```

### ログとモニタリング

#### 構造化ログ

```javascript
const winston = require('winston');
const { combine, timestamp, errors, json, printf } = winston.format;

// カスタムフォーマット
const customFormat = printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
        timestamp,
        level,
        message,
        ...meta
    });
});

// ログレベル設定
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// ロガーの設定
const logger = winston.createLogger({
    levels: logLevels,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json(),
        customFormat
    ),
    
    transports: [
        // ファイル出力
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: json()
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
            format: json()
        }),
        
        // コンソール出力
        new winston.transports.Console({
            format: combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    
    // 未処理例外のキャッチ
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    
    // 未処理のPromise拒否のキャッチ
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
    ]
});

// HTTPリクエストログミドルウェア
const httpLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        logger.http('HTTP Request', {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            userId: req.user?.id
        });
    });
    
    next();
};

app.use(httpLogger);

// 使用例
logger.info('Application started', {
    port: PORT,
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
});

logger.error('Database connection failed', {
    error: error.message,
    stack: error.stack,
    database: process.env.DATABASE_URL?.split('@')[1] // 機密情報を除く
});
```

#### ヘルスチェックとメトリクス

```javascript
const os = require('os');
const process = require('process');

// ヘルスチェックエンドポイント
app.get('/health', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date().toISOString(),
        
        // システム情報
        system: {
            platform: os.platform(),
            arch: os.arch(),
            nodeVersion: process.version,
            memory: {
                total: Math.round(os.totalmem() / 1024 / 1024),
                free: Math.round(os.freemem() / 1024 / 1024),
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
            },
            cpu: {
                cores: os.cpus().length,
                loadAverage: os.loadavg()
            }
        },
        
        // アプリケーション固有の情報
        application: {
            environment: process.env.NODE_ENV,
            version: process.env.npm_package_version || '1.0.0'
        }
    };
    
    try {
        // データベース接続チェック
        await pool.query('SELECT 1');
        healthcheck.database = 'OK';
        
        // Redis接続チェック
        await redis.ping();
        healthcheck.redis = 'OK';
        
        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.database = 'ERROR';
        healthcheck.redis = 'ERROR';
        healthcheck.message = 'Service Degraded';
        
        logger.error('Health check failed', {
            error: error.message,
            healthcheck
        });
        
        res.status(503).json(healthcheck);
    }
});

// メトリクスエンドポイント（Prometheus形式）
app.get('/metrics', (req, res) => {
    const metrics = `
# HELP nodejs_heap_size_used_bytes Process heap space used in bytes
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes ${process.memoryUsage().heapUsed}

# HELP nodejs_heap_size_total_bytes Process heap space size in bytes  
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes ${process.memoryUsage().heapTotal}

# HELP process_uptime_seconds Process uptime in seconds
# TYPE process_uptime_seconds counter
process_uptime_seconds ${process.uptime()}

# HELP system_memory_total_bytes System total memory in bytes
# TYPE system_memory_total_bytes gauge
system_memory_total_bytes ${os.totalmem()}

# HELP system_memory_free_bytes System free memory in bytes
# TYPE system_memory_free_bytes gauge
system_memory_free_bytes ${os.freemem()}
    `.trim();
    
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
});
```

### デプロイ戦略

#### Docker化

**Dockerfile:**
```dockerfile
# マルチステージビルド
FROM node:18-alpine AS builder

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# 依存関係のインストール
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# アプリケーションファイルのコピー
COPY . .

# 本番用イメージ
FROM node:18-alpine AS production

# セキュリティ: 非rootユーザーの作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# 依存関係とアプリケーションのコピー
COPY --from=builder --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# ユーザー切り替え
USER nodejs

# ポートの公開
EXPOSE 3000

# アプリケーションの起動
CMD ["node", "app.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/usr/src/app/logs
    restart: unless-stopped
    
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

#### クラウドデプロイ（Heroku）

**package.json のスクリプト設定:**
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "build": "npm run clean && npm run compile",
    "clean": "rm -rf dist",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

**Procfile（Heroku用）:**
```
web: node app.js
worker: node worker.js
```

**Herokuデプロイコマンド:**
```bash
# Heroku CLIのインストール
npm install -g heroku

# Herokuにログイン
heroku login

# アプリケーションの作成
heroku create your-app-name

# 環境変数の設定
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set DATABASE_URL=postgres://...

# PostgreSQLアドオンの追加
heroku addons:create heroku-postgresql:hobby-dev

# Redisアドオンの追加
heroku addons:create heroku-redis:hobby-dev

# デプロイ
git push heroku main

# ログの確認
heroku logs --tail

# スケーリング
heroku ps:scale web=2
```

#### AWS ECS デプロイ

**task-definition.json:**
```json
{
  "family": "my-node-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "my-node-app",
      "image": "your-account.dkr.ecr.region.amazonaws.com/my-node-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:database-url"
        },
        {
          "name": "JWT_SECRET", 
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-node-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

#### モダンなPaaS（Platform as a Service）

**Vercel での Node.js デプロイ:**
```bash
# Vercel CLIのインストール
npm install -g vercel

# プロジェクトのデプロイ
vercel

# 本番環境の設定
vercel --prod

# 環境変数の設定
vercel env add NODE_ENV production
vercel env add DATABASE_URL [your-database-url]
```

**vercel.json 設定例:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "app.js": {
      "maxDuration": 30
    }
  }
}
```

**Railway での Node.js デプロイ:**
```bash
# Railway CLIのインストール
npm install -g @railway/cli

# Railwayにログイン
railway login

# プロジェクトの初期化
railway init

# デプロイ
railway up

# 環境変数の設定
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

**railway.json 設定例:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ALWAYS"
  }
}
```

**Render での Node.js デプロイ:**

Render.com でのWeb Serviceの設定:
```yaml
# render.yaml
services:
  - type: web
    name: my-node-app
    env: node
    plan: starter
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: myapp-db
          property: connectionString
    healthCheckPath: /health
```

#### サーバーレス デプロイ

**AWS Lambda での Node.js デプロイ:**
```javascript
// lambda/handler.js - Express アプリのラッパー
const serverless = require('serverless-http');
const app = require('../app'); // Express アプリ

module.exports.handler = serverless(app);
```

**serverless.yml 設定:**
```yaml
service: my-node-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    DATABASE_URL: ${env:DATABASE_URL}

functions:
  app:
    handler: lambda/handler.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
      - http:
          path: /
          method: ANY
          cors: true

plugins:
  - serverless-offline
```

**Vercel Functions での API デプロイ:**
```javascript
// api/users.js - Vercel Function
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // ユーザー一覧取得
    const users = await getUsers();
    res.status(200).json({ success: true, data: users });
  } else if (req.method === 'POST') {
    // ユーザー作成
    const newUser = await createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

#### Kubernetes デプロイ

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
  labels:
    app: node-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: your-registry/node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
spec:
  selector:
    app: node-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

**Helm Chart での管理:**
```yaml
# values.yaml
replicaCount: 3

image:
  repository: your-registry/node-app
  tag: latest
  pullPolicy: Always

service:
  type: LoadBalancer
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: your-app.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: your-app-tls
      hosts:
        - your-app.example.com

resources:
  requests:
    memory: 128Mi
    cpu: 100m
  limits:
    memory: 256Mi
    cpu: 200m

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

#### 継続的デプロイ（CI/CD）

**GitHub Actions ワークフロー (.github/workflows/deploy.yml):**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run security audit
      run: npm audit --audit-level moderate

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1
    
    - name: Build and push Docker image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: my-node-app
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
        docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
    
    - name: Deploy to ECS
      run: |
        aws ecs update-service \
          --cluster my-cluster \
          --service my-service \
          --force-new-deployment
```

### 監視とアラート

#### 基本的な監視設定

```javascript
// アプリケーション内監視
class ApplicationMonitor {
    constructor() {
        this.metrics = {
            requests: {
                total: 0,
                errors: 0,
                responseTime: []
            },
            memory: {
                heapUsed: 0,
                heapTotal: 0
            },
            activeConnections: 0
        };
        
        this.startMonitoring();
    }
    
    startMonitoring() {
        // メモリ使用量の監視（5秒間隔）
        setInterval(() => {
            const memUsage = process.memoryUsage();
            this.metrics.memory.heapUsed = memUsage.heapUsed;
            this.metrics.memory.heapTotal = memUsage.heapTotal;
            
            // メモリ使用量が閾値を超えた場合のアラート
            if (memUsage.heapUsed > 500 * 1024 * 1024) { // 500MB
                logger.warn('High memory usage detected', {
                    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
                    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB'
                });
            }
        }, 5000);
        
        // レスポンス時間の統計（1分間隔）
        setInterval(() => {
            if (this.metrics.requests.responseTime.length > 0) {
                const times = this.metrics.requests.responseTime;
                const avg = times.reduce((a, b) => a + b, 0) / times.length;
                const max = Math.max(...times);
                const min = Math.min(...times);
                
                logger.info('Response time statistics', {
                    average: Math.round(avg),
                    max,
                    min,
                    samples: times.length
                });
                
                // レスポンス時間をリセット
                this.metrics.requests.responseTime = [];
            }
        }, 60000);
    }
    
    recordRequest(duration, isError = false) {
        this.metrics.requests.total++;
        this.metrics.requests.responseTime.push(duration);
        
        if (isError) {
            this.metrics.requests.errors++;
        }
    }
    
    getMetrics() {
        return {
            ...this.metrics,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        };
    }
}

const monitor = new ApplicationMonitor();

// リクエスト監視ミドルウェア
const monitoringMiddleware = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const isError = res.statusCode >= 400;
        
        monitor.recordRequest(duration, isError);
        
        // 遅いリクエストのログ出力
        if (duration > 1000) {
            logger.warn('Slow request detected', {
                method: req.method,
                url: req.originalUrl,
                duration: `${duration}ms`,
                statusCode: res.statusCode
            });
        }
    });
    
    next();
};

app.use(monitoringMiddleware);

// 監視データエンドポイント
app.get('/monitoring/metrics', (req, res) => {
    res.json(monitor.getMetrics());
});
```

#### モダンな監視とObservability

**Application Performance Monitoring (APM)**

**New Relic での監視:**
```javascript
// アプリケーションの先頭で New Relic を初期化
require('newrelic');

const express = require('express');
const app = express();

// カスタムメトリクスの記録
const newrelic = require('newrelic');

app.get('/api/users', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const users = await getUsers();
        
        // カスタムメトリクスを記録
        newrelic.recordMetric('Custom/Users/Count', users.length);
        newrelic.recordMetric('Custom/API/ResponseTime', Date.now() - startTime);
        
        res.json({ success: true, data: users });
    } catch (error) {
        // エラーの記録
        newrelic.noticeError(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

**DataDog での監視:**
```javascript
const tracer = require('dd-trace').init({
    service: 'my-node-app',
    env: 'production',
    version: '1.0.0'
});

const StatsD = require('node-statsd');
const client = new StatsD();

// カスタムメトリクスの送信
app.get('/api/orders', async (req, res) => {
    const span = tracer.startSpan('api.orders.get');
    
    try {
        const orders = await getOrders();
        
        // メトリクスの送信
        client.increment('api.orders.success');
        client.histogram('api.orders.count', orders.length);
        
        span.setTag('orders.count', orders.length);
        span.finish();
        
        res.json({ success: true, data: orders });
    } catch (error) {
        span.setTag('error', true);
        span.setTag('error.message', error.message);
        span.finish();
        
        client.increment('api.orders.error');
        throw error;
    }
});
```

**Prometheus + Grafana での監視:**
```javascript
const prometheus = require('prom-client');

// メトリクスレジストリの作成
const register = new prometheus.Registry();

// カスタムメトリクスの定義
const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestCounter = new prometheus.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

// メトリクスの登録
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestCounter);

// デフォルトメトリクスの収集
prometheus.collectDefaultMetrics({ register });

// メトリクス収集ミドルウェア
const metricsMiddleware = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.route ? req.route.path : req.path;
        
        httpRequestDuration
            .labels(req.method, route, res.statusCode)
            .observe(duration);
            
        httpRequestCounter
            .labels(req.method, route, res.statusCode)
            .inc();
    });
    
    next();
};

app.use(metricsMiddleware);

// メトリクスエンドポイント
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});
```

**構造化ログとトレーシング:**
```javascript
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');

// トレースIDミドルウェア
const traceMiddleware = (req, res, next) => {
    req.traceId = req.headers['x-trace-id'] || uuidv4();
    res.setHeader('x-trace-id', req.traceId);
    next();
};

// 構造化ロガーの設定
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: {
        service: 'my-node-app',
        environment: process.env.NODE_ENV
    },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

app.use(traceMiddleware);

// 各リクエストでトレースIDを含むログ出力
app.use((req, res, next) => {
    logger.info('Request received', {
        traceId: req.traceId,
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        ip: req.ip
    });
    next();
});
```

**エラートラッキング（Sentry）:**
```javascript
const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
        new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});

// Express エラーハンドラー
app.use(Sentry.Handlers.errorHandler());

// カスタムエラー追跡
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            throw new Error(`User not found: ${req.params.id}`);
        }
        res.json({ success: true, data: user });
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                section: 'user_api'
            },
            user: {
                id: req.user?.id,
                email: req.user?.email
            },
            extra: {
                userId: req.params.id,
                traceId: req.traceId
            }
        });
        
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

このような本番環境でのデプロイと運用に関する包括的な知識を身につけることで、Node.jsアプリケーションを安全で効率的に運用することができます。モダンな開発環境では、従来のVMベースのデプロイに加えて、コンテナ化、サーバーレス、マネージドサービスなど多様な選択肢があります。プロジェクトの要件と制約を考慮して最適なデプロイ戦略を選択しましょう。

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

このNode.jsリファレンスは、初学者が段階的に学習できるよう構成されています。基本概念から始まり、実用的なプロジェクト例まで幅広くカバーしており、実際の開発で使用できるコード例を豊富に含んでいます。
