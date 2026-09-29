---
title: "Node.js: 非同期処理"
description: "Node.js リファレンスのうち、非同期処理についてまとめたページです。"
sidebar:
  label: "非同期処理"
  order: 3
---

## コールバック

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

## Promise

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

## async/await

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
