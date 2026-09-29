---
title: "Node.js: モジュールとファイル操作"
description: "Node.js リファレンスのうち、モジュール、ファイル操作についてまとめたページです。"
sidebar:
  label: "モジュールとファイル操作"
  order: 2
---

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
