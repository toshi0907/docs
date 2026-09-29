---
title: "Node.js: タスクスケジューリング"
description: "Node.js リファレンスのうち、タスクスケジューリングについてまとめたページです。"
sidebar:
  label: "タスクスケジューリング"
  order: 6
---

Node.jsでタスクを定期実行するための主要なライブラリとして、**node-schedule** と **node-cron** があります。それぞれ異なる特徴を持ち、用途に応じて使い分けることが重要です。

## node-schedule による柔軟なスケジューリング

**node-schedule** は、cron形式だけでなく、日付指定や柔軟なルール設定が可能な高機能スケジューラーです。

### インストール

```bash
npm install node-schedule

```

### 基本的な使用例

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

### 高度な使用例

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

## node-cron による cron 形式スケジューリング

**node-cron** は、GNU crontab互換の軽量なタスクスケジューラーです。シンプルで高速な処理が特徴です。

### インストール

```bash
npm install node-cron

```

### 基本的な使用例

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

### 高度な使用例

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

## node-schedule と node-cron の比較

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

## 選択指針

### node-schedule を選ぶべき場合

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

### node-cron を選ぶべき場合

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

## 実践的な組み合わせ例

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
