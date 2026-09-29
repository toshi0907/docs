---
title: "Node.js: 言語の基本"
description: "Node.js リファレンスのうち、変数とデータ型、関数、配列とオブジェクト、条件分岐とループについてまとめたページです。"
sidebar:
  label: "言語の基本"
  order: 1
---

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
