---
layout: page
title: "JavaScript リファレンス"
---

# JavaScript リファレンス

JavaScriptの基本的な使い方から応用まで、Webページに動的な機能を追加するために必要な知識を体系的に説明します。モダンなJavaScript（ES6+）の機能も含めて解説します。

* 目次
{:toc}

## 基本概念

### JavaScript とは

**JavaScript** は、Webページに動的な機能を追加するためのプログラミング言語です。1995年にBrendan Eichによって開発され、現在はブラウザだけでなくサーバーサイド（Node.js）でも広く使用されています。

**特徴:**
- インタープリター言語（コンパイル不要）
- 動的型付け言語
- プロトタイプベースのオブジェクト指向
- 関数型プログラミングもサポート
- イベント駆動プログラミング

### JavaScript の役割

JavaScriptは以下の主要な役割を担います：

1. **ユーザーインタラクション**: クリック、入力などのイベント処理
2. **DOM操作**: HTMLの動的な変更
3. **非同期処理**: サーバーとの通信（Ajax、Fetch API）
4. **フォーム検証**: 入力データの検証
5. **アニメーション**: 視覚的な効果の実装

## 基本構文

### 変数とデータ型

```javascript
// 変数の宣言
let name = "田中太郎";        // 文字列（String）
const age = 30;              // 数値（Number）- 定数
var isStudent = false;       // 真偽値（Boolean）- 非推奨

// 現代的な変数宣言（ES6+）
let message;                 // 宣言のみ（undefined）
let score = 85;              // 宣言と初期化
const PI = 3.14159;          // 定数（再代入不可）

// データ型の確認
console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof isStudent); // "boolean"

// プリミティブ型
let str = "文字列";          // String
let num = 42;                // Number
let bool = true;             // Boolean
let nothing = null;          // Null
let undef = undefined;       // Undefined
let sym = Symbol("id");      // Symbol（ES6+）
let big = 123n;              // BigInt（ES2020+）

// 参照型
let arr = [1, 2, 3];         // Array
let obj = { name: "太郎" };  // Object
let func = function() {};    // Function

```

### 文字列操作

```javascript
// 文字列の基本操作
let firstName = "太郎";
let lastName = "田中";

// 文字列結合
let fullName1 = firstName + lastName;        // "太郎田中"
let fullName2 = `${lastName} ${firstName}`;  // "田中 太郎" (テンプレートリテラル)

// 文字列メソッド
let text = "  Hello, World!  ";
console.log(text.length);           // 16 (文字数)
console.log(text.toLowerCase());    // "  hello, world!  "
console.log(text.toUpperCase());    // "  HELLO, WORLD!  "
console.log(text.trim());           // "Hello, World!" (前後の空白削除)
console.log(text.indexOf("World")); // 9 (文字列の位置)
console.log(text.includes("Hello")); // true (文字列が含まれるか)
console.log(text.slice(2, 7));     // "Hello" (部分文字列)
console.log(text.replace("World", "JavaScript")); // "  Hello, JavaScript!  "

// 文字列分割と結合
let csv = "apple,banana,orange";
let fruits = csv.split(",");        // ["apple", "banana", "orange"]
let joined = fruits.join(" | ");    // "apple | banana | orange"

// マルチライン文字列（テンプレートリテラル）
let multiLine = `
    これは
    複数行の
    文字列です
`;

```

### 配列

```javascript
// 配列の作成
let arr1 = [];                      // 空の配列
let arr2 = [1, 2, 3, 4, 5];        // 数値配列
let arr3 = ["apple", "banana", "orange"]; // 文字列配列
let arr4 = [1, "text", true, null]; // 混合配列

// 配列の基本操作
console.log(arr2.length);           // 5 (要素数)
console.log(arr2[0]);               // 1 (最初の要素)
console.log(arr2[arr2.length - 1]); // 5 (最後の要素)

// 要素の追加・削除
arr2.push(6);                       // 末尾に追加: [1,2,3,4,5,6]
arr2.pop();                         // 末尾を削除: [1,2,3,4,5]
arr2.unshift(0);                    // 先頭に追加: [0,1,2,3,4,5]
arr2.shift();                       // 先頭を削除: [1,2,3,4,5]

// 配列メソッド（ES5+）
let numbers = [1, 2, 3, 4, 5];

// map: 各要素を変換
let doubled = numbers.map(x => x * 2); // [2,4,6,8,10]

// filter: 条件に合う要素を抽出
let evens = numbers.filter(x => x % 2 === 0); // [2,4]

// reduce: 配列を単一の値に集約
let sum = numbers.reduce((acc, x) => acc + x, 0); // 15

// find: 条件に合う最初の要素
let found = numbers.find(x => x > 3); // 4

// forEach: 各要素に対して処理実行
numbers.forEach(x => console.log(x));

// includes: 要素が含まれているか
console.log(numbers.includes(3)); // true

// sort: ソート
let fruits = ["banana", "apple", "orange"];
fruits.sort(); // ["apple", "banana", "orange"]

let nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b); // [1,1,3,4,5] (数値ソート)

```

### オブジェクト

```javascript
// オブジェクトの作成
let person = {
    name: "田中太郎",
    age: 30,
    city: "東京",
    isStudent: false
};

// プロパティへのアクセス
console.log(person.name);        // "田中太郎" (ドット記法)
console.log(person["age"]);      // 30 (ブラケット記法)

// プロパティの追加・変更
person.email = "tanaka@example.com"; // 追加
person.age = 31;                     // 変更

// プロパティの削除
delete person.isStudent;

// メソッドを含むオブジェクト
let calculator = {
    value: 0,
    add: function(x) {
        this.value += x;
        return this; // チェーンメソッド用
    },
    multiply: function(x) {
        this.value *= x;
        return this;
    },
    getValue: function() {
        return this.value;
    }
};

// 使用例
calculator.add(5).multiply(2).getValue(); // 10

// オブジェクトの反復処理
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// ES6+ のオブジェクト機能
let name = "太郎";
let age = 25;

// プロパティ名の短縮記法
let user = { name, age }; // { name: "太郎", age: 25 }

// 計算されたプロパティ名
let prop = "color";
let car = {
    [prop]: "red"  // { color: "red" }
};

// デストラクチャリング代入
let { name: userName, age: userAge } = user;
console.log(userName, userAge); // "太郎" 25

```

## 関数

### 関数の定義

```javascript
// 関数宣言
function greet(name) {
    return `こんにちは、${name}さん！`;
}

// 関数式
const greet2 = function(name) {
    return `こんにちは、${name}さん！`;
};

// アロー関数（ES6+）
const greet3 = (name) => {
    return `こんにちは、${name}さん！`;
};

// アロー関数（短縮形）
const greet4 = name => `こんにちは、${name}さん！`;

// 複数パラメータのアロー関数
const add = (a, b) => a + b;

// 関数の呼び出し
console.log(greet("太郎")); // "こんにちは、太郎さん！"

// デフォルトパラメータ（ES6+）
function createUser(name, age = 0, city = "未設定") {
    return { name, age, city };
}

console.log(createUser("太郎"));        // { name: "太郎", age: 0, city: "未設定" }
console.log(createUser("花子", 25));    // { name: "花子", age: 25, city: "未設定" }

// 可変長引数（Rest Parameters）
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// スプレッド演算子
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

console.log(Math.max(...arr1)); // 3

```

### スコープとクロージャ

```javascript
// グローバルスコープ
let globalVar = "グローバル";

function outerFunction() {
    // 関数スコープ
    let outerVar = "外側";

    function innerFunction() {
        // クロージャ
        let innerVar = "内側";
        console.log(globalVar); // アクセス可能
        console.log(outerVar);  // アクセス可能
        console.log(innerVar);  // アクセス可能
    }

    return innerFunction;
}

const closure = outerFunction();
closure(); // クロージャが実行される

// 実用的なクロージャの例
function createCounter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// ブロックスコープ（let, const）
{
    let blockVar = "ブロック内";
    const blockConst = "定数";
    // これらはブロック外からアクセス不可
}

// var は関数スコープ
function varExample() {
    if (true) {
        var varVariable = "var変数";
    }
    console.log(varVariable); // アクセス可能（ホイスティング）
}

```

## DOM操作

### 要素の取得

```javascript
// ID で取得
const element = document.getElementById("myId");

// クラス名で取得
const elements = document.getElementsByClassName("myClass");
const firstElement = elements[0];

// タグ名で取得
const paragraphs = document.getElementsByTagName("p");

// CSSセレクタで取得（推奨）
const element2 = document.querySelector("#myId");        // 最初の要素
const elements2 = document.querySelectorAll(".myClass"); // 全ての要素

// 複雑なセレクタの例
const navLinks = document.querySelectorAll("nav ul li a");
const firstParagraph = document.querySelector("article p:first-child");

```

### 要素の操作

```javascript
// テキストコンテンツの操作
const title = document.querySelector("h1");
title.textContent = "新しいタイトル";        // HTMLタグは文字列として表示
title.innerHTML = "<strong>太字タイトル</strong>"; // HTMLタグも解釈

// 属性の操作
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.getAttribute("href"); // "https://example.com"
link.removeAttribute("target");

// より簡単な属性アクセス
link.href = "https://google.com";
link.target = "_blank";

// クラスの操作
const button = document.querySelector("button");
button.classList.add("active");           // クラス追加
button.classList.remove("disabled");     // クラス削除
button.classList.toggle("highlighted");  // クラスの切り替え
button.classList.contains("active");     // クラスの存在確認

// スタイルの操作
const box = document.querySelector(".box");
box.style.backgroundColor = "red";
box.style.fontSize = "20px";
box.style.display = "none";

// 複数スタイルの設定
Object.assign(box.style, {
    width: "200px",
    height: "200px",
    border: "2px solid black"
});

```

### 要素の作成と追加

```javascript
// 新しい要素の作成
const newParagraph = document.createElement("p");
newParagraph.textContent = "新しい段落です";
newParagraph.className = "new-content";

// 要素の追加
const container = document.querySelector("#container");
container.appendChild(newParagraph);        // 末尾に追加

// より柔軟な挿入
const referenceElement = document.querySelector(".reference");
container.insertBefore(newParagraph, referenceElement); // 指定要素の前に挿入

// 新しいAPI（より便利）
container.insertAdjacentElement("beforeend", newParagraph);   // 末尾に追加
container.insertAdjacentElement("afterbegin", newParagraph);  // 先頭に追加

// HTMLを直接挿入
container.insertAdjacentHTML("beforeend", "<p>HTMLで追加</p>");

// 要素の削除
const elementToRemove = document.querySelector(".remove-me");
elementToRemove.remove(); // 新しい方法
// elementToRemove.parentNode.removeChild(elementToRemove); // 古い方法

// 要素の置換
const oldElement = document.querySelector(".old");
const newElement = document.createElement("div");
newElement.textContent = "新しい要素";
oldElement.replaceWith(newElement);

```

## イベント処理

### イベントリスナーの追加

```javascript
// 基本的なイベントリスナー
const button = document.querySelector("#myButton");

button.addEventListener("click", function() {
    console.log("ボタンがクリックされました");
});

// アロー関数を使用
button.addEventListener("click", () => {
    console.log("ボタンがクリックされました");
});

// 名前付き関数を使用
function handleClick() {
    console.log("ボタンがクリックされました");
}
button.addEventListener("click", handleClick);

// イベントオブジェクトの使用
button.addEventListener("click", function(event) {
    console.log("イベントタイプ:", event.type);
    console.log("ターゲット要素:", event.target);
    event.preventDefault(); // デフォルト動作を阻止
});

// 一度だけ実行するイベント
button.addEventListener("click", handleClick, { once: true });

// イベントリスナーの削除
button.removeEventListener("click", handleClick);

```

### よく使用するイベント

```javascript
// マウスイベント
element.addEventListener("click", e => console.log("クリック"));
element.addEventListener("dblclick", e => console.log("ダブルクリック"));
element.addEventListener("mousedown", e => console.log("マウスボタン押下"));
element.addEventListener("mouseup", e => console.log("マウスボタン離上"));
element.addEventListener("mouseover", e => console.log("マウスオーバー"));
element.addEventListener("mouseout", e => console.log("マウスアウト"));
element.addEventListener("mousemove", e => {
    console.log(`マウス位置: (${e.clientX}, ${e.clientY})`);
});

// キーボードイベント
document.addEventListener("keydown", e => {
    console.log(`キー押下: ${e.key}`);
    if (e.key === "Enter") {
        console.log("Enterキーが押されました");
    }
});

document.addEventListener("keyup", e => console.log(`キー離上: ${e.key}`));

// フォームイベント
const form = document.querySelector("#myForm");
const input = document.querySelector("#myInput");

form.addEventListener("submit", e => {
    e.preventDefault(); // フォーム送信を阻止
    console.log("フォーム送信");
});

input.addEventListener("input", e => {
    console.log(`入力値: ${e.target.value}`);
});

input.addEventListener("focus", e => console.log("フォーカス"));
input.addEventListener("blur", e => console.log("フォーカス失う"));

// ウィンドウイベント
window.addEventListener("load", e => console.log("ページ読み込み完了"));
window.addEventListener("resize", e => {
    console.log(`ウィンドウサイズ: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener("scroll", e => {
    console.log(`スクロール位置: ${window.scrollY}`);
});

// DOMコンテンツ読み込み完了（推奨）
document.addEventListener("DOMContentLoaded", e => {
    console.log("DOM読み込み完了");
    // ここに初期化コードを記述
});

```

### イベント委譲

```javascript
// 動的に追加される要素に対するイベント処理
const container = document.querySelector("#container");

// 子要素（ボタン）に対するクリックイベントを親要素で処理
container.addEventListener("click", function(e) {
    if (e.target.matches("button")) {
        console.log("ボタンがクリックされました:", e.target.textContent);
    }
});

// 新しいボタンを動的に追加
function addButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    container.appendChild(button);
}

addButton("新しいボタン1");
addButton("新しいボタン2");
// これらのボタンも自動的にイベントが適用される

```

## 非同期処理

### Promise

```javascript
// Promiseの基本
const myPromise = new Promise((resolve, reject) => {
    // 非同期処理のシミュレーション
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve("成功しました！");
        } else {
            reject("エラーが発生しました");
        }
    }, 1000);
});

// Promiseの使用
myPromise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("エラー:", error);
    })
    .finally(() => {
        console.log("処理完了");
    });

// Promiseチェーン
function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: `ユーザー${id}` });
        }, 500);
    });
}

function fetchUserPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "投稿1", userId },
                { id: 2, title: "投稿2", userId }
            ]);
        }, 500);
    });
}

// チェーンの実行
fetchUser(1)
    .then(user => {
        console.log("ユーザー取得:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("投稿取得:", posts);
    })
    .catch(error => {
        console.log("エラー:", error);
    });

```

### async/await

```javascript
// async/awaitを使用した非同期処理
async function getUserData(id) {
    try {
        const user = await fetchUser(id);
        console.log("ユーザー取得:", user);

        const posts = await fetchUserPosts(user.id);
        console.log("投稿取得:", posts);

        return { user, posts };
    } catch (error) {
        console.log("エラー:", error);
        throw error;
    }
}

// async関数の呼び出し
getUserData(1)
    .then(data => console.log("完了:", data))
    .catch(error => console.log("処理失敗:", error));

// 複数の非同期処理を並行実行
async function fetchMultipleUsers() {
    try {
        // 並行実行（高速）
        const [user1, user2, user3] = await Promise.all([
            fetchUser(1),
            fetchUser(2),
            fetchUser(3)
        ]);

        console.log("全ユーザー取得完了:", { user1, user2, user3 });
    } catch (error) {
        console.log("いずれかでエラー:", error);
    }
}

// Promise.allSettled（エラーがあっても全て実行）
async function fetchWithErrors() {
    const results = await Promise.allSettled([
        fetchUser(1),
        Promise.reject("エラーのテスト"),
        fetchUser(3)
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`結果${index}:`, result.value);
        } else {
            console.log(`エラー${index}:`, result.reason);
        }
    });
}

```

### Fetch API

```javascript
// 基本的なGET リクエスト
async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("取得データ:", data);
        return data;
    } catch (error) {
        console.log("取得エラー:", error);
    }
}

// POST リクエスト
async function createPost(postData) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        });

        const result = await response.json();
        console.log("作成結果:", result);
        return result;
    } catch (error) {
        console.log("作成エラー:", error);
    }
}

// 使用例
createPost({
    title: "新しい投稿",
    body: "投稿内容",
    userId: 1
});

// ファイルアップロード
async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("アップロード完了:", result);
    } catch (error) {
        console.log("アップロードエラー:", error);
    }
}

// AbortController でリクエストをキャンセル
async function cancellableRequest() {
    const controller = new AbortController();

    // 5秒後にキャンセル
    setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch("https://httpbin.org/delay/10", {
            signal: controller.signal
        });
        const data = await response.json();
        console.log("データ:", data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("リクエストがキャンセルされました");
        } else {
            console.log("エラー:", error);
        }
    }
}

```

## モダンJavaScript（ES6+）

### 分割代入

```javascript
// 配列の分割代入
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// デフォルト値
const [a, b, c = "yellow"] = ["red", "green"];
console.log(c); // "yellow"

// 値の交換
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// オブジェクトの分割代入
const person = {
    name: "田中太郎",
    age: 30,
    city: "東京"
};

const { name, age, city } = person;
console.log(name); // "田中太郎"

// プロパティ名を変更
const { name: fullName, age: years } = person;
console.log(fullName); // "田中太郎"

// ネストした分割代入
const user = {
    id: 1,
    info: {
        name: "太郎",
        contact: {
            email: "taro@example.com"
        }
    }
};

const { info: { name: userName, contact: { email } } } = user;
console.log(userName); // "太郎"
console.log(email);    // "taro@example.com"

// 関数の引数での分割代入
function greetUser({ name, age = 0 }) {
    return `こんにちは、${name}さん（${age}歳）`;
}

console.log(greetUser({ name: "花子", age: 25 })); // "こんにちは、花子さん（25歳）"

```

### モジュール

```javascript
// math.js（エクスポート）
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// デフォルトエクスポート
export default function subtract(a, b) {
    return a - b;
}

// main.js（インポート）
import subtract, { PI, add, multiply } from './math.js';

console.log(PI);                    // 3.14159
console.log(add(2, 3));            // 5
console.log(multiply(4, 5));       // 20
console.log(subtract(10, 3));      // 7

// 名前を変更してインポート
import { add as sum } from './math.js';
console.log(sum(1, 2)); // 3

// 全てインポート
import * as MathUtils from './math.js';
console.log(MathUtils.add(1, 2));  // 3
console.log(MathUtils.PI);         // 3.14159

// 動的インポート（非同期）
async function loadMathModule() {
    const mathModule = await import('./math.js');
    console.log(mathModule.add(1, 2)); // 3
}

```

### クラス

```javascript
// ES6 クラス
class Person {
    // コンストラクタ
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // メソッド
    greet() {
        return `こんにちは、私は${this.name}です`;
    }

    // ゲッター
    get info() {
        return `${this.name}（${this.age}歳）`;
    }

    // セッター
    set age(value) {
        if (value < 0) {
            throw new Error("年齢は0以上である必要があります");
        }
        this._age = value;
    }

    get age() {
        return this._age;
    }

    // 静的メソッド
    static createAdult(name) {
        return new Person(name, 20);
    }
}

// クラスの使用
const person = new Person("太郎", 25);
console.log(person.greet());    // "こんにちは、私は太郎です"
console.log(person.info);       // "太郎（25歳）"

// 静的メソッドの使用
const adult = Person.createAdult("花子");

// 継承
class Student extends Person {
    constructor(name, age, school) {
        super(name, age); // 親クラスのコンストラクタを呼び出し
        this.school = school;
    }

    greet() {
        return `${super.greet()}、${this.school}の学生です`;
    }

    study() {
        return `${this.name}は勉強しています`;
    }
}

const student = new Student("次郎", 18, "東京大学");
console.log(student.greet());   // "こんにちは、私は次郎です、東京大学の学生です"
console.log(student.study());   // "次郎は勉強しています"

// プライベートフィールド（ES2022+）
class BankAccount {
    #balance = 0; // プライベートフィールド

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }

    // プライベートメソッド
    #calculateInterest() {
        return this.#balance * 0.01;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // エラー: プライベートフィールドにはアクセス不可

```

## エラーハンドリング

### try-catch文

```javascript
// 基本的なエラーハンドリング
try {
    // エラーが発生する可能性のあるコード
    let result = riskyOperation();
    console.log("成功:", result);
} catch (error) {
    // エラーが発生した場合の処理
    console.log("エラーが発生しました:", error.message);
} finally {
    // 必ず実行される処理
    console.log("処理完了");
}

// 異なるタイプのエラーの処理
function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log("JSON形式が正しくありません:", error.message);
        } else {
            console.log("予期しないエラー:", error.message);
        }
        return null;
    }
}

// カスタムエラー
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

function validateEmail(email) {
    if (!email.includes("@")) {
        throw new ValidationError("有効なメールアドレスではありません", "email");
    }
    return true;
}

// カスタムエラーの使用
try {
    validateEmail("invalid-email");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`検証エラー（${error.field}）: ${error.message}`);
    } else {
        console.log("予期しないエラー:", error);
    }
}

// async/await でのエラーハンドリング
async function fetchUserData(id) {
    try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
            throw new Error(`ユーザー取得失敗: ${response.status}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log("ユーザーデータ取得エラー:", error.message);
        throw error; // エラーを再度投げる
    }
}

// エラーのロギング
function logError(error) {
    console.error("Error:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
}

```

## ブラウザAPI

### Local Storage

```javascript
// データの保存
localStorage.setItem("username", "田中太郎");
localStorage.setItem("settings", JSON.stringify({
    theme: "dark",
    language: "ja"
}));

// データの取得
const username = localStorage.getItem("username");
console.log(username); // "田中太郎"

const settings = JSON.parse(localStorage.getItem("settings"));
console.log(settings); // { theme: "dark", language: "ja" }

// データの削除
localStorage.removeItem("username");

// 全データの削除
localStorage.clear();

// ストレージの変更を監視
window.addEventListener("storage", function(e) {
    console.log("ストレージが変更されました:", {
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue
    });
});

// セッションストレージ（タブを閉じると削除される）
sessionStorage.setItem("temporary", "一時的なデータ");

```

### Geolocation API

```javascript
// 現在位置の取得
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`現在位置: ${latitude}, ${longitude}`);
        },
        function(error) {
            console.log("位置取得エラー:", error.message);
        },
        {
            enableHighAccuracy: true,  // 高精度
            timeout: 10000,           // タイムアウト（10秒）
            maximumAge: 60000         // キャッシュ有効期間（1分）
        }
    );
} else {
    console.log("Geolocation APIはサポートされていません");
}

// 位置の監視
const watchId = navigator.geolocation.watchPosition(
    function(position) {
        console.log("位置が変更されました:", position.coords);
    },
    function(error) {
        console.log("監視エラー:", error.message);
    }
);

// 監視の停止
// navigator.geolocation.clearWatch(watchId);

```

### Notification API

```javascript
// 通知の許可を要求
async function requestNotificationPermission() {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        console.log("通知許可:", permission);
        return permission === "granted";
    }
    return false;
}

// 通知の表示
async function showNotification(title, options = {}) {
    const hasPermission = await requestNotificationPermission();

    if (hasPermission) {
        const notification = new Notification(title, {
            body: options.body || "",
            icon: options.icon || "/default-icon.png",
            tag: options.tag || "default",
            ...options
        });

        notification.onclick = function() {
            console.log("通知がクリックされました");
            window.focus();
            this.close();
        };

        // 自動で閉じる
        setTimeout(() => notification.close(), 5000);
    }
}

// 使用例
showNotification("新しいメッセージ", {
    body: "太郎さんからメッセージが届きました",
    icon: "/message-icon.png",
    tag: "message"
});

```

## 実践的なコード例

### フォームバリデーション

```javascript
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.rules = {};

        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validate();
        });

        // リアルタイムバリデーション
        this.form.addEventListener("input", (e) => {
            this.validateField(e.target);
        });
    }

    addRule(fieldName, rule) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push(rule);
        return this;
    }

    validateField(field) {
        const rules = this.rules[field.name];
        if (!rules) return true;

        this.clearError(field.name);

        for (const rule of rules) {
            const result = rule.test(field.value);
            if (!result.valid) {
                this.addError(field.name, result.message);
                this.showError(field.name);
                return false;
            }
        }

        this.showSuccess(field.name);
        return true;
    }

    validate() {
        this.errors = {};
        let isValid = true;

        const fields = this.form.querySelectorAll("[name]");

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.onSuccess();
        } else {
            this.onError();
        }

        return isValid;
    }

    addError(fieldName, message) {
        if (!this.errors[fieldName]) {
            this.errors[fieldName] = [];
        }
        this.errors[fieldName].push(message);
    }

    clearError(fieldName) {
        delete this.errors[fieldName];
        this.hideError(fieldName);
    }

    showError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorContainer = field.parentNode.querySelector(".error-message");

        if (errorContainer) {
            errorContainer.textContent = this.errors[fieldName][0];
            errorContainer.style.display = "block";
        }

        field.classList.add("error");
        field.classList.remove("success");
    }

    hideError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorContainer = field.parentNode.querySelector(".error-message");

        if (errorContainer) {
            errorContainer.style.display = "none";
        }

        field.classList.remove("error");
    }

    showSuccess(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        field.classList.add("success");
        field.classList.remove("error");
    }

    onSuccess() {
        console.log("フォームバリデーション成功");
        // フォーム送信処理
    }

    onError() {
        console.log("フォームバリデーションエラー:", this.errors);
    }
}

// バリデーションルール
const rules = {
    required: (message = "この項目は必須です") => ({
        test: (value) => ({
            valid: value.trim().length > 0,
            message
        })
    }),

    email: (message = "有効なメールアドレスを入力してください") => ({
        test: (value) => ({
            valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message
        })
    }),

    minLength: (min, message) => ({
        test: (value) => ({
            valid: value.length >= min,
            message: message || `${min}文字以上で入力してください`
        })
    }),

    phone: (message = "有効な電話番号を入力してください") => ({
        test: (value) => ({
            valid: /^[\d-]+$/.test(value),
            message
        })
    })
};

// 使用例
const form = document.querySelector("#contactForm");
const validator = new FormValidator(form);

validator
    .addRule("name", rules.required())
    .addRule("email", rules.required())
    .addRule("email", rules.email())
    .addRule("phone", rules.phone())
    .addRule("message", rules.required())
    .addRule("message", rules.minLength(10));

```

### シンプルなSPA（Single Page Application）

```javascript
class SimpleRouter {
    constructor() {
        this.routes = {};
        this.currentRoute = "";

        // ブラウザの戻る/進むボタン対応
        window.addEventListener("popstate", (e) => {
            this.handleRoute();
        });

        // リンククリック時の処理
        document.addEventListener("click", (e) => {
            if (e.target.matches("[data-route]")) {
                e.preventDefault();
                const route = e.target.getAttribute("data-route");
                this.navigate(route);
            }
        });

        // 初期ルート処理
        this.handleRoute();
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
        return this;
    }

    navigate(path) {
        window.history.pushState({}, "", path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        this.currentRoute = path;

        const handler = this.routes[path] || this.routes["*"];

        if (handler) {
            handler();
        } else {
            this.show404();
        }
    }

    show404() {
        document.querySelector("#app").innerHTML = `
            <h1>404 - ページが見つかりません</h1>
            <p><a href="/" data-route="/">ホームに戻る</a></p>
        `;
    }
}

// ページコンポーネント
const pages = {
    home: () => `
        <h1>ホームページ</h1>
        <nav>
            <a href="/about" data-route="/about">会社概要</a> |
            <a href="/contact" data-route="/contact">お問い合わせ</a>
        </nav>
        <p>ようこそ、私たちのサイトへ！</p>
    `,

    about: () => `
        <h1>会社概要</h1>
        <nav>
            <a href="/" data-route="/">ホーム</a> |
            <a href="/contact" data-route="/contact">お問い合わせ</a>
        </nav>
        <p>私たちは革新的なソリューションを提供する会社です。</p>
    `,

    contact: () => `
        <h1>お問い合わせ</h1>
        <nav>
            <a href="/" data-route="/">ホーム</a> |
            <a href="/about" data-route="/about">会社概要</a>
        </nav>
        <form id="contactForm">
            <div>
                <label>お名前: <input type="text" name="name" required></label>
            </div>
            <div>
                <label>メール: <input type="email" name="email" required></label>
            </div>
            <div>
                <label>メッセージ: <textarea name="message" required></textarea></label>
            </div>
            <button type="submit">送信</button>
        </form>
    `
};

// ルーター初期化
const router = new SimpleRouter();

router
    .addRoute("/", () => {
        document.querySelector("#app").innerHTML = pages.home();
    })
    .addRoute("/about", () => {
        document.querySelector("#app").innerHTML = pages.about();
    })
    .addRoute("/contact", () => {
        document.querySelector("#app").innerHTML = pages.contact();

        // お問い合わせフォームのイベント設定
        document.querySelector("#contactForm").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("お問い合わせありがとうございます！");
        });
    });

```

## デバッグとテスト

### デバッグ技法

```javascript
// コンソール出力
console.log("基本的なログ");
console.info("情報メッセージ");
console.warn("警告メッセージ");
console.error("エラーメッセージ");

// オブジェクトの詳細表示
const user = { name: "太郎", age: 30 };
console.table(user);  // テーブル形式で表示

// 実行時間の測定
console.time("処理時間");
// 時間のかかる処理
for (let i = 0; i < 1000000; i++) {
    // 何らかの処理
}
console.timeEnd("処理時間");

// グループ化
console.group("ユーザー情報");
console.log("名前:", user.name);
console.log("年齢:", user.age);
console.groupEnd();

// 条件付きログ
console.assert(user.age >= 18, "ユーザーは18歳以上である必要があります");

// スタックトレース
console.trace("スタックトレースを表示");

// ブレークポイント
function debugFunction() {
    let x = 10;
    debugger; // ブラウザの開発者ツールでここで停止
    x *= 2;
    return x;
}

// エラーの詳細表示
try {
    throw new Error("テストエラー");
} catch (error) {
    console.log("エラー名:", error.name);
    console.log("エラーメッセージ:", error.message);
    console.log("スタックトレース:", error.stack);
}

```

### 簡単なテストフレームワーク

```javascript
// 簡単なテストフレームワーク
class SimpleTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFunction) {
        this.tests.push({ description, testFunction });
        return this;
    }

    assertEqual(actual, expected, message) {
        if (actual === expected) {
            console.log(`✅ ${message || 'Test passed'}`);
            this.passed++;
        } else {
            console.log(`❌ ${message || 'Test failed'}: expected ${expected}, got ${actual}`);
            this.failed++;
        }
    }

    assertTrue(value, message) {
        this.assertEqual(value, true, message);
    }

    assertFalse(value, message) {
        this.assertEqual(value, false, message);
    }

    run() {
        console.log("🚀 テスト開始");

        this.tests.forEach(({ description, testFunction }) => {
            console.log(`\n📝 ${description}`);
            try {
                testFunction.call(this);
            } catch (error) {
                console.log(`❌ エラー: ${error.message}`);
                this.failed++;
            }
        });

        console.log(`\n📊 結果: ${this.passed} passed, ${this.failed} failed`);
    }
}

// テスト例
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// テストの実行
const test = new SimpleTest();

test
    .test("add関数のテスト", function() {
        this.assertEqual(add(2, 3), 5, "2 + 3 = 5");
        this.assertEqual(add(-1, 1), 0, "-1 + 1 = 0");
        this.assertEqual(add(0, 0), 0, "0 + 0 = 0");
    })
    .test("multiply関数のテスト", function() {
        this.assertEqual(multiply(2, 3), 6, "2 * 3 = 6");
        this.assertEqual(multiply(-2, 3), -6, "-2 * 3 = -6");
        this.assertEqual(multiply(0, 5), 0, "0 * 5 = 0");
    })
    .run();

```

## パフォーマンス最適化

### パフォーマンス測定と最適化

```javascript
// パフォーマンス測定
function measurePerformance(fn, label) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
}

// 配列処理の最適化例
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// 非効率な方法
measurePerformance(() => {
    let result = [];
    for (let i = 0; i < largeArray.length; i++) {
        if (largeArray[i] % 2 === 0) {
            result.push(largeArray[i] * 2);
        }
    }
}, "forループ");

// 効率的な方法
measurePerformance(() => {
    const result = largeArray
        .filter(x => x % 2 === 0)
        .map(x => x * 2);
}, "filter + map");

// より効率的な方法（1回のループ）
measurePerformance(() => {
    const result = largeArray.reduce((acc, x) => {
        if (x % 2 === 0) {
            acc.push(x * 2);
        }
        return acc;
    }, []);
}, "reduce");

// イベントリスナーの最適化（デバウンス）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントの最適化
const handleScroll = debounce(() => {
    console.log("スクロール処理");
}, 100);

window.addEventListener("scroll", handleScroll);

// スロットル（一定間隔で実行）
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// メモ化（結果をキャッシュ）
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// フィボナッチ数列の最適化例
const fibonacci = memoize(function(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // 大幅に高速化される

```

## 参考資料

### 公式ドキュメント

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript): Mozilla開発者向けリソース
- [ECMAScript Language Specification](https://tc39.es/ecma262/): JavaScript仕様書
- [Node.js Documentation](https://nodejs.org/docs/): サーバーサイドJavaScript

### 学習リソース

- [JavaScript.info](https://javascript.info/): 現代的なJavaScript学習サイト
- [Eloquent JavaScript](https://eloquentjavascript.net/): 無料のJavaScript書籍
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS): 深いJavaScript理解

### ツールとライブラリ

- [ESLint](https://eslint.org/): JavaScriptリンター
- [Prettier](https://prettier.io/): コードフォーマッター
- [Babel](https://babeljs.io/): JavaScript変換ツール
- [Webpack](https://webpack.js.org/): モジュールバンドラー

### フレームワーク・ライブラリ

- [React](https://reactjs.org/): ユーザーインターフェースライブラリ
- [Vue.js](https://vuejs.org/): プログレッシブフレームワーク
- [Angular](https://angular.io/): フルフィーチャーフレームワーク
- [Express.js](https://expressjs.com/): Node.jsウェブフレームワーク
