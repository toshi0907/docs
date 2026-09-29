---
title: "Node.js: 実用的な例"
description: "Node.js リファレンスのうち、実用的な例についてまとめたページです。"
sidebar:
  label: "実用的な例"
  order: 7
---

## CLI（コマンドライン）ツール

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

## ファイル監視とホットリロード

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

## RESTful API サーバー

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

## デバッグとエラーハンドリング

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
