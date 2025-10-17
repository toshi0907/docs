---
layout: page
title: "Google Apps Script リファレンス"
---

# Google Apps Script リファレンス

Google Apps Script（GAS）は、Googleのクラウドベースのスクリプト言語で、Google Workspace（Gmail、Google Drive、Googleスプレッドシート、Googleドキュメントなど）のアプリケーションを自動化・拡張するために使用されます。JavaScriptベースの言語で、サーバーレスで実行できます。

* 目次
{:toc}

## 基本概念

### Google Apps Script とは

**Google Apps Script** は、GoogleのクラウドサービスとJavaScriptを統合したスクリプト環境です。Googleのサービスを自動化したり、カスタム機能を追加したりすることができます。

**特徴:**
- JavaScriptベースの言語（ES6+一部対応）
- サーバーレス実行（Googleのインフラで実行）
- Google Workspaceサービスとの統合
- 無料で利用可能（実行時間制限あり）
- Webアプリケーションの構築も可能

### 主な用途

Google Apps Scriptは以下のような用途で使用されます：

1. **スプレッドシートの自動化**: データ処理、レポート生成
2. **Gmail自動化**: メール送信、フィルタリング、整理
3. **Googleフォーム連携**: 自動返信、データ処理
4. **Googleドライブ管理**: ファイル操作、整理
5. **カスタム関数**: スプレッドシートのカスタム関数
6. **Webアプリケーション**: 簡易的なWebアプリの構築

## 開発環境の準備

### スクリプトエディタの起動

#### Googleスプレッドシートから

1. Googleスプレッドシートを開く
2. メニューから「拡張機能」→「Apps Script」を選択
3. スクリプトエディタが新しいタブで開きます

#### スタンドアロンスクリプトとして

1. [Google Apps Script](https://script.google.com/)にアクセス
2. 「新しいプロジェクト」をクリック
3. スクリプトエディタが開きます

### エディタの基本操作

```javascript
// Code.gs - メインスクリプトファイル

function myFunction() {
  Logger.log('Hello, Google Apps Script!');
}

// 実行: 関数を選択して「実行」ボタンをクリック
// ログ確認: 「表示」→「ログ」または Ctrl+Enter
```

### デバッグ方法

```javascript
function debugExample() {
  // ログ出力（旧式）
  Logger.log('デバッグメッセージ');
  
  // コンソールログ（推奨）
  console.log('コンソールメッセージ');
  console.error('エラーメッセージ');
  console.warn('警告メッセージ');
  
  // ブレークポイント: エディタの行番号をクリック
  // デバッグ実行: デバッグアイコンをクリック
}
```

## Googleスプレッドシートの操作

### スプレッドシートの取得

```javascript
function getSpreadsheet() {
  // アクティブなスプレッドシート
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  console.log('スプレッドシート名: ' + spreadsheet.getName());
  
  // IDでスプレッドシートを取得
  const ss = SpreadsheetApp.openById('スプレッドシートID');
  
  // URLでスプレッドシートを取得
  const ss2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/...');
}
```

### シートの操作

```javascript
function sheetOperations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // アクティブシートの取得
  const sheet = ss.getActiveSheet();
  
  // 名前でシートを取得
  const sheet2 = ss.getSheetByName('シート1');
  
  // 新しいシートの作成
  const newSheet = ss.insertSheet('新シート');
  
  // シートの削除
  ss.deleteSheet(newSheet);
  
  // すべてのシートを取得
  const allSheets = ss.getSheets();
  allSheets.forEach(function(sheet) {
    console.log(sheet.getName());
  });
}
```

### セルの読み書き

```javascript
function cellOperations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 単一セルの読み取り
  const value = sheet.getRange('A1').getValue();
  console.log('A1の値: ' + value);
  
  // 単一セルの書き込み
  sheet.getRange('A1').setValue('こんにちは');
  
  // 複数セルの読み取り
  const range = sheet.getRange('A1:B2');
  const values = range.getValues();
  // values = [['A1', 'B1'], ['A2', 'B2']]
  
  // 複数セルの書き込み
  const data = [
    ['名前', '年齢'],
    ['田中', 25],
    ['佐藤', 30]
  ];
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
```

### 範囲の操作

```javascript
function rangeOperations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 行番号と列番号で範囲を指定
  const range = sheet.getRange(1, 1, 10, 5); // A1:E10
  
  // データがある最後の行を取得
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  
  // データ範囲全体を取得
  const dataRange = sheet.getDataRange();
  const allValues = dataRange.getValues();
  
  // 範囲のクリア
  sheet.getRange('A1:B10').clear();
  
  // 範囲のコピー
  sheet.getRange('A1:B5').copyTo(sheet.getRange('D1'));
}
```

### データの検索とフィルタリング

```javascript
function searchData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // 特定の値を検索
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '検索値') {
        console.log(`見つかった位置: 行${i + 1}, 列${j + 1}`);
      }
    }
  }
  
  // フィルタリング（配列メソッド）
  const filteredData = data.filter(function(row) {
    return row[1] > 25; // 2列目が25より大きい行
  });
  
  console.log('フィルタ結果: ' + JSON.stringify(filteredData));
}
```

### 書式設定

```javascript
function formatCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:C1');
  
  // 背景色
  range.setBackground('#4285F4');
  
  // フォント色
  range.setFontColor('#FFFFFF');
  
  // フォントサイズ
  range.setFontSize(14);
  
  // 太字
  range.setFontWeight('bold');
  
  // 中央揃え
  range.setHorizontalAlignment('center');
  
  // 罫線
  range.setBorder(true, true, true, true, false, false);
  
  // 数値フォーマット
  sheet.getRange('B2:B10').setNumberFormat('¥#,##0');
  
  // 日付フォーマット
  sheet.getRange('C2:C10').setNumberFormat('yyyy/mm/dd');
}
```

## Gmail操作

### メールの送信

```javascript
function sendEmail() {
  // シンプルなメール送信
  GmailApp.sendEmail(
    'recipient@example.com',
    'メールの件名',
    'メール本文'
  );
  
  // オプション付きメール送信
  GmailApp.sendEmail(
    'recipient@example.com',
    '件名',
    '本文（プレーンテキスト）',
    {
      cc: 'cc@example.com',
      bcc: 'bcc@example.com',
      name: '送信者名',
      htmlBody: '<h1>HTML本文</h1><p>HTMLメール</p>',
      attachments: [DriveApp.getFileById('ファイルID')]
    }
  );
}
```

### メールの検索と取得

```javascript
function searchEmails() {
  // メールスレッドの検索
  const threads = GmailApp.search('from:someone@example.com is:unread', 0, 10);
  
  threads.forEach(function(thread) {
    console.log('件名: ' + thread.getFirstMessageSubject());
    console.log('メッセージ数: ' + thread.getMessageCount());
    
    // スレッド内のメッセージ
    const messages = thread.getMessages();
    messages.forEach(function(message) {
      console.log('送信者: ' + message.getFrom());
      console.log('本文: ' + message.getPlainBody());
      
      // 添付ファイル
      const attachments = message.getAttachments();
      attachments.forEach(function(attachment) {
        console.log('添付ファイル: ' + attachment.getName());
      });
    });
  });
}
```

### ラベルの操作

```javascript
function manageLabels() {
  // ラベルの作成
  const label = GmailApp.createLabel('新しいラベル');
  
  // ラベルの取得
  const myLabel = GmailApp.getUserLabelByName('マイラベル');
  
  // メールにラベルを追加
  const threads = GmailApp.search('is:unread');
  threads.forEach(function(thread) {
    thread.addLabel(myLabel);
    thread.markRead(); // 既読にする
  });
  
  // ラベルの削除
  GmailApp.deleteLabel(label);
}
```

## Google Driveの操作

### ファイルの操作

```javascript
function fileOperations() {
  // ファイルの取得
  const file = DriveApp.getFileById('ファイルID');
  console.log('ファイル名: ' + file.getName());
  console.log('MIMEタイプ: ' + file.getMimeType());
  console.log('サイズ: ' + file.getSize() + ' bytes');
  
  // ファイルの作成
  const newFile = DriveApp.createFile('test.txt', 'ファイル内容', MimeType.PLAIN_TEXT);
  
  // ファイルのコピー
  const copy = file.makeCopy('コピー - ' + file.getName());
  
  // ファイルの削除（ゴミ箱へ）
  file.setTrashed(true);
  
  // ファイル名の変更
  file.setName('新しい名前.txt');
}
```

### フォルダの操作

```javascript
function folderOperations() {
  // フォルダの取得
  const folder = DriveApp.getFolderById('フォルダID');
  
  // フォルダの作成
  const newFolder = DriveApp.createFolder('新しいフォルダ');
  
  // フォルダ内のファイルを取得
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    console.log('ファイル: ' + file.getName());
  }
  
  // フォルダ内のサブフォルダを取得
  const subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    const subfolder = subfolders.next();
    console.log('フォルダ: ' + subfolder.getName());
  }
  
  // ファイルをフォルダに移動
  const file = DriveApp.getFileById('ファイルID');
  file.moveTo(folder);
}
```

### ファイルの検索

```javascript
function searchFiles() {
  // 名前で検索
  const files = DriveApp.getFilesByName('レポート.xlsx');
  
  // タイプで検索
  const spreadsheets = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  
  // 検索クエリで検索
  const searchResults = DriveApp.searchFiles(
    'title contains "月次" and mimeType = "application/vnd.google-apps.spreadsheet"'
  );
  
  while (searchResults.hasNext()) {
    const file = searchResults.next();
    console.log('見つかったファイル: ' + file.getName());
  }
}
```

## カスタム関数（スプレッドシート用）

### 基本的なカスタム関数

```javascript
/**
 * 2つの数値を掛け算します
 * @param {number} a 1つ目の数値
 * @param {number} b 2つ目の数値
 * @return {number} 掛け算の結果
 * @customfunction
 */
function MULTIPLY(a, b) {
  return a * b;
}

// スプレッドシートで使用: =MULTIPLY(5, 3) → 15
```

### 範囲を扱うカスタム関数

```javascript
/**
 * 範囲内の数値の合計を計算します
 * @param {number[][]} range 数値の範囲
 * @return {number} 合計
 * @customfunction
 */
function CUSTOMSUM(range) {
  let sum = 0;
  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < range[i].length; j++) {
      if (typeof range[i][j] === 'number') {
        sum += range[i][j];
      }
    }
  }
  return sum;
}

// スプレッドシートで使用: =CUSTOMSUM(A1:B10)
```

### 外部APIを使用するカスタム関数

```javascript
/**
 * 為替レートを取得します（サンプル）
 * @param {string} from 元の通貨コード
 * @param {string} to 変換先の通貨コード
 * @return {number} 為替レート
 * @customfunction
 */
function EXCHANGERATE(from, to) {
  // 実際のAPIを使用する場合は、適切なAPIキーとエンドポイントを使用
  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
  
  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    return data.rates[to];
  } catch (error) {
    return 'エラー: ' + error.toString();
  }
}

// スプレッドシートで使用: =EXCHANGERATE("USD", "JPY")
```

## トリガーとイベント

### トリガーの種類

```javascript
// 時間主導型トリガー（定期実行）
function createTimeDrivenTrigger() {
  // 毎日午前9時に実行
  ScriptApp.newTrigger('myFunction')
    .timeBased()
    .atHour(9)
    .everyDays(1)
    .create();
  
  // 毎週月曜日に実行
  ScriptApp.newTrigger('weeklyTask')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(10)
    .create();
  
  // 5分ごとに実行
  ScriptApp.newTrigger('frequentTask')
    .timeBased()
    .everyMinutes(5)
    .create();
}
```

### スプレッドシートトリガー

```javascript
// 編集時に実行される関数（Simple Trigger）
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  console.log('編集されたセル: ' + range.getA1Notation());
  console.log('新しい値: ' + e.value);
  console.log('古い値: ' + e.oldValue);
  
  // 例: B列が編集されたら、C列に日時を記録
  if (range.getColumn() === 2) {
    sheet.getRange(range.getRow(), 3).setValue(new Date());
  }
}

// スプレッドシートを開いたときに実行される
function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('カスタムメニュー')
    .addItem('関数を実行', 'myFunction')
    .addSeparator()
    .addSubMenu(ui.createMenu('サブメニュー')
      .addItem('サブ項目1', 'subFunction1')
      .addItem('サブ項目2', 'subFunction2'))
    .addToUi();
}
```

### フォームトリガー

```javascript
// フォーム送信時に実行される（Simple Trigger）
function onFormSubmit(e) {
  const response = e.response;
  const itemResponses = response.getItemResponses();
  
  // 回答内容を処理
  let answers = {};
  itemResponses.forEach(function(itemResponse) {
    const title = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    answers[title] = answer;
  });
  
  // メール通知を送信
  GmailApp.sendEmail(
    'admin@example.com',
    'フォーム送信通知',
    'フォームが送信されました: ' + JSON.stringify(answers)
  );
}
```

### トリガーの管理

```javascript
function manageTriggers() {
  // すべてのトリガーを取得
  const triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(function(trigger) {
    console.log('トリガーID: ' + trigger.getUniqueId());
    console.log('ハンドラ関数: ' + trigger.getHandlerFunction());
    console.log('イベントタイプ: ' + trigger.getEventType());
  });
  
  // 特定のトリガーを削除
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'oldFunction') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // すべてのトリガーを削除
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
}
```

## 外部APIとの連携

### UrlFetchAppの基本

```javascript
function fetchAPI() {
  // GETリクエスト
  const url = 'https://api.example.com/data';
  const response = UrlFetchApp.fetch(url);
  const content = response.getContentText();
  const json = JSON.parse(content);
  
  console.log(json);
  
  // POSTリクエスト
  const postUrl = 'https://api.example.com/submit';
  const payload = {
    name: '田中',
    age: 30
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  const postResponse = UrlFetchApp.fetch(postUrl, options);
  console.log(postResponse.getContentText());
}
```

### 認証付きAPIリクエスト

```javascript
function authenticatedRequest() {
  const url = 'https://api.example.com/protected';
  const apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
  
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true // エラーでも例外をスローしない
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();
  
  if (statusCode === 200) {
    const data = JSON.parse(response.getContentText());
    console.log('成功: ', data);
  } else {
    console.error('エラー: ' + statusCode);
  }
}
```

### Slack連携の例

```javascript
function sendSlackMessage() {
  const webhookUrl = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK');
  
  const message = {
    text: 'Google Apps Scriptからのメッセージ',
    username: 'GAS Bot',
    icon_emoji: ':robot_face:',
    attachments: [{
      color: '#36a64f',
      title: 'タイトル',
      text: 'メッセージ本文',
      fields: [
        {
          title: 'フィールド1',
          value: '値1',
          short: true
        },
        {
          title: 'フィールド2',
          value: '値2',
          short: true
        }
      ]
    }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(message)
  };
  
  UrlFetchApp.fetch(webhookUrl, options);
}
```

## プロパティサービス

### スクリプトプロパティ

```javascript
function scriptProperties() {
  const props = PropertiesService.getScriptProperties();
  
  // プロパティの設定
  props.setProperty('API_KEY', 'your-api-key-here');
  props.setProperty('BASE_URL', 'https://api.example.com');
  
  // 複数のプロパティを一括設定
  props.setProperties({
    'SETTING1': 'value1',
    'SETTING2': 'value2'
  });
  
  // プロパティの取得
  const apiKey = props.getProperty('API_KEY');
  console.log('API Key: ' + apiKey);
  
  // すべてのプロパティを取得
  const allProps = props.getProperties();
  console.log(allProps);
  
  // プロパティの削除
  props.deleteProperty('OLD_KEY');
  
  // すべてのプロパティを削除
  props.deleteAllProperties();
}
```

### ユーザープロパティとドキュメントプロパティ

```javascript
function userAndDocumentProperties() {
  // ユーザープロパティ（ユーザーごとに保存）
  const userProps = PropertiesService.getUserProperties();
  userProps.setProperty('USER_PREFERENCE', 'dark_mode');
  
  // ドキュメントプロパティ（ドキュメントに紐付けて保存）
  const docProps = PropertiesService.getDocumentProperties();
  docProps.setProperty('LAST_UPDATE', new Date().toString());
}
```

## Webアプリケーションの作成

### doGetとdoPost

```javascript
// GETリクエストを処理
function doGet(e) {
  // パラメータの取得
  const name = e.parameter.name || 'ゲスト';
  
  // HTMLを返す
  const html = HtmlService.createHtmlOutput(`
    <h1>こんにちは、${name}さん！</h1>
    <p>現在時刻: ${new Date().toLocaleString('ja-JP')}</p>
  `);
  
  return html;
}

// POSTリクエストを処理
function doPost(e) {
  // POSTデータの取得
  const data = JSON.parse(e.postData.contents);
  
  // データを処理
  const result = {
    success: true,
    message: 'データを受信しました',
    receivedData: data
  };
  
  // JSON応答を返す
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### HTMLテンプレート

```javascript
// Code.gs
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('マイWebアプリ')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// サーバー側の関数をHTMLから呼び出し可能にする
function getData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getDataRange().getValues();
}

function saveData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(data);
  return { success: true };
}
```

```html
<!-- Index.html -->
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    button { padding: 10px 20px; margin: 5px; }
    #data { margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Google Apps Script Webアプリ</h1>
  <button onclick="loadData()">データ読み込み</button>
  <button onclick="saveNewData()">データ保存</button>
  <div id="data"></div>
  
  <script>
    // サーバー側の関数を呼び出し
    function loadData() {
      google.script.run
        .withSuccessHandler(displayData)
        .withFailureHandler(showError)
        .getData();
    }
    
    function displayData(data) {
      const html = data.map(row => 
        `<div>${row.join(', ')}</div>`
      ).join('');
      document.getElementById('data').innerHTML = html;
    }
    
    function saveNewData() {
      const data = ['新しいデータ', new Date().toLocaleDateString(), Math.random()];
      google.script.run
        .withSuccessHandler(() => alert('保存しました'))
        .withFailureHandler(showError)
        .saveData(data);
    }
    
    function showError(error) {
      alert('エラー: ' + error.message);
    }
  </script>
</body>
</html>
```

## ユーティリティとベストプラクティス

### 日付と時刻の処理

```javascript
function dateTimeUtilities() {
  // 現在の日時
  const now = new Date();
  console.log('現在: ' + now);
  
  // フォーマット
  const formatted = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
  console.log('フォーマット済み: ' + formatted);
  
  // 日付の計算
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  // 文字列から日付に変換
  const dateString = '2024-12-31';
  const date = new Date(dateString);
}
```

### エラーハンドリング

```javascript
function errorHandlingExample() {
  try {
    // エラーが発生する可能性のある処理
    const sheet = SpreadsheetApp.getActiveSheet();
    const value = sheet.getRange('A1').getValue();
    
    if (value === '') {
      throw new Error('A1セルが空です');
    }
    
    // 処理を続行
    console.log('値: ' + value);
    
  } catch (error) {
    // エラーをログに記録
    console.error('エラーが発生しました: ' + error.message);
    console.error('スタックトレース: ' + error.stack);
    
    // ユーザーに通知（オプション）
    SpreadsheetApp.getUi().alert('エラー: ' + error.message);
    
    // メール通知（重要なエラーの場合）
    GmailApp.sendEmail(
      'admin@example.com',
      'スクリプトエラー通知',
      'エラー詳細:\n' + error.stack
    );
  } finally {
    // クリーンアップ処理
    console.log('処理完了');
  }
}
```

### パフォーマンス最適化

```javascript
function performanceOptimization() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 悪い例: セルごとにアクセス（遅い）
  function badExample() {
    for (let i = 1; i <= 1000; i++) {
      const value = sheet.getRange(i, 1).getValue(); // 1000回のAPI呼び出し
      sheet.getRange(i, 2).setValue(value * 2);
    }
  }
  
  // 良い例: まとめて読み書き（速い）
  function goodExample() {
    const values = sheet.getRange(1, 1, 1000, 1).getValues(); // 1回の読み取り
    const newValues = values.map(row => [row[0] * 2]);
    sheet.getRange(1, 2, 1000, 1).setValues(newValues); // 1回の書き込み
  }
  
  // バッチ処理
  function batchProcessing() {
    const data = sheet.getDataRange().getValues();
    const processedData = data.map(function(row) {
      // 各行を処理
      return row.map(cell => {
        if (typeof cell === 'string') {
          return cell.toUpperCase();
        }
        return cell;
      });
    });
    sheet.getRange(1, 1, processedData.length, processedData[0].length).setValues(processedData);
  }
}
```

### キャッシュの利用

```javascript
function cacheExample() {
  const cache = CacheService.getScriptCache();
  
  function getExpensiveData() {
    // キャッシュをチェック
    const cached = cache.get('expensiveData');
    if (cached !== null) {
      console.log('キャッシュから取得');
      return JSON.parse(cached);
    }
    
    // データを取得（重い処理）
    console.log('新しくデータを取得');
    const data = fetchDataFromAPI(); // 仮の関数
    
    // キャッシュに保存（6時間）
    cache.put('expensiveData', JSON.stringify(data), 21600);
    
    return data;
  }
  
  function fetchDataFromAPI() {
    // 実際のデータ取得処理
    return { key: 'value', timestamp: new Date() };
  }
}
```

### ロックサービス（並行処理制御）

```javascript
function lockServiceExample() {
  const lock = LockService.getScriptLock();
  
  try {
    // 30秒間ロックを待つ
    lock.waitLock(30000);
    
    // クリティカルセクション
    const sheet = SpreadsheetApp.getActiveSheet();
    const counter = sheet.getRange('A1').getValue() || 0;
    sheet.getRange('A1').setValue(counter + 1);
    
    // 処理の待機（シミュレーション）
    Utilities.sleep(2000);
    
  } catch (e) {
    console.error('ロックを取得できませんでした: ' + e);
  } finally {
    // ロックを解放
    lock.releaseLock();
  }
}
```

## 制限事項と注意点

### 実行時間制限

- **無料アカウント**: 6分/実行
- **Google Workspaceアカウント**: 6分/実行
- 長時間の処理は複数の関数に分割し、トリガーで連携

### クォータ制限

```javascript
function checkQuotas() {
  // メール送信: 1日あたり
  // - 無料: 100通
  // - Workspace: 1,500通
  
  // UrlFetchApp: 1日あたり
  // - 無料: 20,000回
  // - Workspace: 20,000回
  
  // スクリプト実行時間: 1日あたり
  // - 無料: 90分
  // - Workspace: 360分
}
```

### セキュリティのベストプラクティス

```javascript
function securityBestPractices() {
  // 1. 機密情報はプロパティサービスに保存
  const props = PropertiesService.getScriptProperties();
  props.setProperty('API_KEY', 'secret-key'); // コードに直接書かない
  
  // 2. 入力値の検証
  function validateInput(input) {
    if (typeof input !== 'string' || input.length > 100) {
      throw new Error('不正な入力');
    }
    return input.trim();
  }
  
  // 3. HTMLエスケープ
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // 4. 権限の最小化
  // 必要な権限のみを使用するようにコードを設計
}
```

## デバッグとトラブルシューティング

### ログの活用

```javascript
function loggingBestPractices() {
  // 基本的なログ
  console.log('情報メッセージ');
  console.warn('警告メッセージ');
  console.error('エラーメッセージ');
  
  // 構造化ログ
  console.log({
    action: 'データ処理',
    status: 'success',
    recordsProcessed: 100,
    timestamp: new Date()
  });
  
  // 実行時間の測定
  const startTime = new Date().getTime();
  
  // 処理
  for (let i = 0; i < 1000; i++) {
    // 何か処理
  }
  
  const endTime = new Date().getTime();
  console.log('実行時間: ' + (endTime - startTime) + 'ms');
}
```

### よくあるエラーと対処法

```javascript
function commonErrors() {
  // 1. "Exception: Service invoked too many times"
  // → 実行回数制限を超過。処理を分割するかキャッシュを使用
  
  // 2. "Exception: Authorization is required"
  // → スクリプトに必要な権限が付与されていない。再認証が必要
  
  // 3. "TypeError: Cannot read property 'xxx' of undefined"
  // → オブジェクトがundefined。存在チェックを追加
  function safeAccess(obj) {
    if (obj && obj.property) {
      return obj.property.value;
    }
    return null;
  }
  
  // 4. "Exception: Exceeded maximum execution time"
  // → 6分の実行時間制限を超過。処理を複数の関数に分割
}
```

## 実用的なサンプルプロジェクト

### 自動レポート生成

```javascript
function generateMonthlyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName('データ');
  const reportSheet = ss.getSheetByName('レポート') || ss.insertSheet('レポート');
  
  // データ取得
  const data = dataSheet.getDataRange().getValues();
  const headers = data.shift(); // ヘッダー行を削除
  
  // 今月のデータをフィルタ
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  
  const thisMonthData = data.filter(function(row) {
    const date = new Date(row[0]); // 1列目が日付と仮定
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  });
  
  // 集計
  const totalSales = thisMonthData.reduce((sum, row) => sum + row[2], 0); // 3列目が売上と仮定
  
  // レポートシートに書き込み
  reportSheet.clear();
  reportSheet.getRange('A1').setValue('月次レポート');
  reportSheet.getRange('A2').setValue('期間: ' + Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy年MM月'));
  reportSheet.getRange('A3').setValue('合計売上: ¥' + totalSales.toLocaleString());
  reportSheet.getRange('A5').setValue('詳細データ:');
  
  if (thisMonthData.length > 0) {
    reportSheet.getRange(6, 1, thisMonthData.length, thisMonthData[0].length).setValues(thisMonthData);
  }
  
  // メールで送信
  const pdfBlob = ss.getAs('application/pdf');
  GmailApp.sendEmail(
    'manager@example.com',
    '月次レポート - ' + Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy年MM月'),
    'レポートを添付しました。',
    { attachments: [pdfBlob] }
  );
}
```

### フォーム回答の自動処理

```javascript
function processFormResponse(e) {
  // フォーム回答を取得
  const itemResponses = e.response.getItemResponses();
  const timestamp = e.response.getTimestamp();
  
  // 回答内容を抽出
  let name, email, message;
  itemResponses.forEach(function(item) {
    const title = item.getItem().getTitle();
    const answer = item.getResponse();
    
    if (title.includes('名前')) name = answer;
    if (title.includes('メール')) email = answer;
    if (title.includes('メッセージ')) message = answer;
  });
  
  // スプレッドシートに記録
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('処理済み回答') || ss.insertSheet('処理済み回答');
  sheet.appendRow([timestamp, name, email, message, '処理済み']);
  
  // 自動返信メール
  GmailApp.sendEmail(
    email,
    'お問い合わせを受け付けました',
    `${name}様\n\nお問い合わせありがとうございます。\n以下の内容で受け付けました。\n\n${message}\n\n担当者より追って連絡いたします。`
  );
  
  // Slackに通知
  sendSlackNotification(`新しいお問い合わせ: ${name}様から`);
}

function sendSlackNotification(message) {
  const webhookUrl = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK');
  if (webhookUrl) {
    UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ text: message })
    });
  }
}
```

## リソースとドキュメント

### 公式リソース

- [Google Apps Script 公式ドキュメント](https://developers.google.com/apps-script)
- [Apps Script リファレンス](https://developers.google.com/apps-script/reference)
- [Apps Script サンプル集](https://developers.google.com/apps-script/samples)

### コミュニティ

- [Stack Overflow - google-apps-script タグ](https://stackoverflow.com/questions/tagged/google-apps-script)
- [Google Apps Script コミュニティ](https://www.googlecloudcommunity.com/gc/Apps-Script/bd-p/apps-script)

### 学習リソース

- Google Apps Script の基本から応用まで、段階的に学習
- 実際のユースケースに基づいたサンプルコード
- 定期的にアップデートされるベストプラクティス

---

このリファレンスは、Google Apps Scriptの主要な機能と実用的な使い方をカバーしています。実際のプロジェクトで活用し、必要に応じてカスタマイズしてください。
