---
title: "シェルスクリプト: デバッグとエラーハンドリング"
description: "シェルスクリプト リファレンスのうち、デバッグとエラーハンドリングについてまとめたページです。"
sidebar:
  label: "デバッグとエラーハンドリング"
  order: 5
---

## デバッグ技法

```bash
# スクリプトをデバッグモードで実行

bash -x script.sh

# スクリプト内でデバッグモードを有効/無効

set -x  # デバッグモード有効
set +x  # デバッグモード無効

# エラー発生時にスクリプトを停止

set -e

# 未定義変数使用時にエラー

set -u

```

## エラーハンドリング

```bash
# コマンドの成功/失敗をチェック

if command; then
    echo "コマンドが成功しました"
else
    echo "コマンドが失敗しました"
    exit 1
fi

# または

command || { echo "エラーが発生しました"; exit 1; }

# 複数のコマンドを連鎖

command1 && command2 && command3

```

## `set -euo pipefail` による安全なスクリプトの基本設定

Bashスクリプトはデフォルトだとエラーが起きても処理を続行してしまい、意図しない被害が広がることがあります。前述の`set -e`（エラー時に終了）・`set -u`（未定義変数をエラーに）に加えて`set -o pipefail`を組み合わせ、スクリプトの先頭に`set -euo pipefail`とまとめて書くのが定番の安全設定です。

- `set -e`: コマンドが失敗(非ゼロ終了)したら即座にスクリプトを終了
- `set -u`: 未定義変数を参照したらエラーにする
- `set -o pipefail`: パイプの途中のコマンドが失敗した場合もパイプ全体を失敗扱いにする

```bash
#!/usr/bin/env bash
set -euo pipefail

# 存在しないファイルへのcpは失敗するので、ここでスクリプトが即終了する
cp not_exist.txt /tmp/
echo "ここには到達しない"
```

```bash
#!/usr/bin/env bash
set -euo pipefail

# pipefailなしだと、catが失敗してもgrepが成功すれば全体は成功扱いになってしまう
cat not_exist.txt | grep "hello"
echo "pipefailにより、この行の前でスクリプトが停止する"
```

特に本番運用するスクリプトでは、事故防止のため冒頭に必ず入れておく習慣をつけましょう。

## シグナルハンドリング

### TRAPコマンド

`trap`コマンドは、シェルスクリプトでシグナルを受信した際に実行するコマンドを指定します。スクリプトの異常終了時のクリーンアップ処理や、優雅な終了処理に使用されます。

```bash
# 基本的な構文

trap 'コマンド' シグナル

# 複数のシグナルに対して同じ処理を設定

trap 'コマンド' シグナル1 シグナル2 シグナル3

# trapの設定を解除

trap - シグナル

# 現在のtrap設定を表示

trap

```

### 主要なシグナル

```bash
# よく使用されるシグナル

# EXIT    - スクリプト終了時（正常・異常問わず）
# INT     - Ctrl+C (SIGINT)
# TERM    - プロセス終了要求 (SIGTERM)
# HUP     - ハングアップシグナル (SIGHUP)
# USR1/2  - ユーザー定義シグナル
# QUIT    - Ctrl+\ (SIGQUIT)

# シグナル番号での指定も可能
# 2 = INT, 15 = TERM, 9 = KILL（trapできない）

```

### 基本的な使用例

```bash
# スクリプト終了時のクリーンアップ

#!/bin/bash

cleanup() {
    echo "クリーンアップを実行中..."
    rm -f /tmp/temp_file_$$
    echo "一時ファイルを削除しました"
}

trap cleanup EXIT

# メイン処理

echo "処理を開始します"
touch /tmp/temp_file_$$
echo "一時ファイルを作成しました"

# 何らかの処理...
sleep 3

echo "処理が完了しました"
# スクリプト終了時に自動的にcleanup関数が実行される

```

### Ctrl+Cでの割り込みハンドリング

```bash
#!/bin/bash

interrupt_handler() {
    echo ""
    echo "割り込みシグナルを受信しました"
    echo "処理を安全に終了します..."
    
    # 必要なクリーンアップ処理
    pkill -f "background_process"
    rm -f /tmp/lock_file
    
    exit 130  # Ctrl+C の標準的な終了コード
}

trap interrupt_handler INT

echo "長時間の処理を開始します (Ctrl+Cで中断可能)"

# バックグラウンドプロセスを起動
background_process &

# メイン処理ループ
for i in {1..60}; do
    echo "処理中... ($i/60)"
    sleep 1
done

echo "すべての処理が完了しました"

```

### 複数シグナルの同時ハンドリング

```bash
#!/bin/bash

graceful_shutdown() {
    echo "終了シグナルを受信しました"
    
    # 実行中のプロセスを確認
    if [ -f /tmp/process.pid ]; then
        local pid=$(cat /tmp/process.pid)
        if kill -0 "$pid" 2>/dev/null; then
            echo "子プロセス (PID: $pid) を終了しています..."
            kill "$pid"
            wait "$pid" 2>/dev/null
        fi
        rm -f /tmp/process.pid
    fi
    
    # 一時ファイルのクリーンアップ
    rm -f /tmp/app_lock /tmp/temp_*
    
    echo "クリーンアップが完了しました"
    exit 0
}

# 複数のシグナルに対して同じハンドラーを設定
trap graceful_shutdown INT TERM HUP

echo "サービスを開始しています..."
echo $$ > /tmp/process.pid

# メインサービスループ
while true; do
    echo "サービスが実行中です... ($(date))"
    sleep 5
done

```

### エラー時の詳細情報記録

```bash
#!/bin/bash

error_handler() {
    local line_number=$1
    local error_code=$2
    local command="$3"
    
    echo "エラーが発生しました:" >&2
    echo "  ファイル: $0" >&2
    echo "  行番号: $line_number" >&2
    echo "  終了コード: $error_code" >&2
    echo "  コマンド: $command" >&2
    echo "  時刻: $(date)" >&2
    
    # エラーログに記録
    {
        echo "=== エラーレポート ==="
        echo "日時: $(date)"
        echo "スクリプト: $0"
        echo "行番号: $line_number"
        echo "終了コード: $error_code"
        echo "失敗コマンド: $command"
        echo "現在のディレクトリ: $(pwd)"
        echo "ユーザー: $(whoami)"
        echo ""
    } >> /var/log/script_errors.log
    
    exit "$error_code"
}

# ERRシグナルでエラーハンドリング
trap 'error_handler $LINENO $? "$BASH_COMMAND"' ERR

# エラー発生時にスクリプトを停止
set -e

echo "エラーハンドリング付きスクリプトを開始"

# 意図的にエラーを発生させる例
# false  # これがエラーを引き起こす

echo "正常に完了しました"

```

### 一時ファイル管理の実用例

```bash
#!/bin/bash

# 一時ディレクトリとファイルの管理

create_temp_env() {
    # 一意な一時ディレクトリを作成
    TEMP_DIR=$(mktemp -d)
    TEMP_FILE="${TEMP_DIR}/processing.tmp"
    LOCK_FILE="${TEMP_DIR}/script.lock"
    
    echo "一時環境を作成しました: $TEMP_DIR"
}

cleanup_temp_env() {
    if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
        echo "一時環境をクリーンアップしています..."
        rm -rf "$TEMP_DIR"
        echo "一時ディレクトリを削除しました: $TEMP_DIR"
    fi
}

# すべての終了パターンでクリーンアップを実行
trap cleanup_temp_env EXIT

create_temp_env

# ロックファイルでの排他制御
if [ -f "$LOCK_FILE" ]; then
    echo "別のインスタンスが実行中です"
    exit 1
fi

echo $$ > "$LOCK_FILE"

# メイン処理
echo "ファイル処理を開始します"
echo "処理データ" > "$TEMP_FILE"

# 何らかの処理...
sleep 2

echo "処理が完了しました"
# EXIT trapで自動的にクリーンアップされる

```

### デバッグ情報付きのtrap

```bash
#!/bin/bash

debug_trap() {
    echo "DEBUG: 関数 '${FUNCNAME[1]}' の行 ${BASH_LINENO[0]} でエラーが発生"
    echo "DEBUG: 現在のスタックトレース:"
    for ((i=1; i<${#FUNCNAME[@]}; i++)); do
        echo "  [$i] ${BASH_SOURCE[i]}: ${FUNCNAME[i]}() (line ${BASH_LINENO[i-1]})"
    done
}

trap debug_trap ERR
set -e  # エラー発生時にスクリプトを停止

sample_function() {
    echo "サンプル関数を実行中"
    # 意図的なエラー
    # ls /nonexistent/directory
}

main() {
    echo "メイン処理を開始"
    sample_function
    echo "メイン処理が完了"
}

main

```

### サービススクリプトでの使用例

```bash
#!/bin/bash

# サービス制御用のtrap設定

SERVICE_NAME="myservice"
PID_FILE="/var/run/${SERVICE_NAME}.pid"
LOG_FILE="/var/log/${SERVICE_NAME}.log"

start_service() {
    echo "Starting $SERVICE_NAME..."
    echo $$ > "$PID_FILE"
}

stop_service() {
    echo "Stopping $SERVICE_NAME..."
    
    if [ -f "$PID_FILE" ]; then
        rm -f "$PID_FILE"
    fi
    
    # 関連プロセスの終了
    pkill -f "$SERVICE_NAME" 2>/dev/null || true
    
    echo "$SERVICE_NAME stopped"
}

reload_service() {
    echo "Reloading $SERVICE_NAME configuration..."
    # 設定ファイルの再読み込み処理
    source /etc/${SERVICE_NAME}.conf
}

# シグナルハンドリングの設定
trap stop_service EXIT TERM INT
trap reload_service HUP

start_service

# メインサービスループ
while true; do
    echo "$(date): $SERVICE_NAME is running..." >> "$LOG_FILE"
    sleep 10
done

```

これらの例を参考に、適切なエラーハンドリングとクリーンアップ処理を含むシェルスクリプトを作成してください。

このリファレンスは、シェルスクリプトの基本的な機能から実用的な例まで幅広くカバーしています。必要に応じて詳細を調べながら、効率的なシェルスクリプトを作成してください。
