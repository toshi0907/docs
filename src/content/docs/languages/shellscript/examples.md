---
title: "シェルスクリプト: 実用的な例"
description: "シェルスクリプト リファレンスのうち、実用的な例についてまとめたページです。"
sidebar:
  label: "実用的な例"
  order: 4
---

## ログファイル分析スクリプト

```bash
#!/bin/bash

log_file="/var/log/access.log"

echo "=== ログファイル分析 ==="
echo "ファイル: $log_file"
echo "総行数: $(wc -l < "$log_file")"
echo ""

echo "=== 上位10のIPアドレス ==="
awk '{print $1}' "$log_file" | sort | uniq -c | sort -nr | head -10

echo ""
echo "=== ステータスコード別集計 ==="
awk '{print $9}' "$log_file" | sort | uniq -c | sort -nr

echo ""
echo "=== 時間帯別アクセス数 ==="
awk '{print $4}' "$log_file" | cut -d':' -f2 | sort | uniq -c

```

## ファイルバックアップスクリプト

```bash
#!/bin/bash

source_dir="/important/data"
backup_dir="/backup"
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_name="backup_$timestamp.tar.gz"

echo "バックアップを開始します..."
echo "ソース: $source_dir"
echo "バックアップ先: $backup_dir/$backup_name"

# バックアップディレクトリの作成

mkdir -p "$backup_dir"

# アーカイブ作成

if tar -czf "$backup_dir/$backup_name" -C "$(dirname "$source_dir")" "$(basename "$source_dir")"; then
    echo "バックアップが完了しました: $backup_name"

    # 7日より古いバックアップファイルを削除
    find "$backup_dir" -name "backup_*.tar.gz" -mtime +7 -delete
    echo "古いバックアップファイルを削除しました"
else
    echo "エラー: バックアップに失敗しました" >&2
    exit 1
fi

```

## システム監視スクリプト

```bash
#!/bin/bash

# CPU使用率チェック

cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
cpu_threshold=80

# メモリ使用率チェック

memory_usage=$(free | grep Mem | awk '{printf "%.1f", ($3/$2)*100}')
memory_threshold=85

# ディスク使用率チェック

disk_usage=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
disk_threshold=90

echo "=== システム監視結果 ==="
echo "CPU使用率: ${cpu_usage}%"
echo "メモリ使用率: ${memory_usage}%"
echo "ディスク使用率: ${disk_usage}%"

# アラートチェック

alerts=()

if (( $(echo "$cpu_usage > $cpu_threshold" | bc -l) )); then
    alerts+=("CPU使用率が高すぎます: ${cpu_usage}%")
fi

if (( $(echo "$memory_usage > $memory_threshold" | bc -l) )); then
    alerts+=("メモリ使用率が高すぎます: ${memory_usage}%")
fi

if [ "$disk_usage" -gt "$disk_threshold" ]; then
    alerts+=("ディスク使用率が高すぎます: ${disk_usage}%")
fi

if [ ${#alerts[@]} -gt 0 ]; then
    echo ""
    echo "=== アラート ==="
    for alert in "${alerts[@]}"; do
        echo "⚠️  $alert"
    done
else
    echo ""
    echo "✅ すべてのメトリクスが正常範囲内です"
fi

```

## ユーザー管理スクリプト

```bash
#!/bin/bash

show_menu() {
    echo "=== ユーザー管理メニュー ==="
    echo "1. ユーザー一覧表示"
    echo "2. 新規ユーザー作成"
    echo "3. ユーザー削除"
    echo "4. ユーザー情報表示"
    echo "5. 終了"
    echo -n "選択してください (1-5): "
}

list_users() {
    echo "=== 登録ユーザー一覧 ==="
    awk -F: '$3 >= 1000 {print $1, $5}' /etc/passwd
}

create_user() {
    read -p "新しいユーザー名を入力してください: " username

    if id "$username" &>/dev/null; then
        echo "エラー: ユーザー '$username' は既に存在します"
        return 1
    fi

    read -p "フルネームを入力してください: " fullname

    if sudo useradd -m -c "$fullname" "$username"; then
        echo "ユーザー '$username' を作成しました"
        echo "パスワードを設定してください:"
        sudo passwd "$username"
    else
        echo "エラー: ユーザー作成に失敗しました"
    fi
}

delete_user() {
    read -p "削除するユーザー名を入力してください: " username

    if ! id "$username" &>/dev/null; then
        echo "エラー: ユーザー '$username' は存在しません"
        return 1
    fi

    read -p "本当にユーザー '$username' を削除しますか? (y/N): " confirm

    if [[ "$confirm" =~ ^[Yy] ]]; then
        if sudo userdel -r "$username"; then
            echo "ユーザー '$username' を削除しました"
        else
            echo "エラー: ユーザー削除に失敗しました"
        fi
    else
        echo "削除をキャンセルしました"
    fi
}

show_user_info() {
    read -p "情報を表示するユーザー名を入力してください: " username

    if ! id "$username" &>/dev/null; then
        echo "エラー: ユーザー '$username' は存在しません"
        return 1
    fi

    echo "=== ユーザー情報: $username ==="
    id "$username"
    finger "$username" 2>/dev/null || echo "詳細情報は利用できません"
}

# メインループ

while true; do
    show_menu
    read choice

    case $choice in
        1)
            list_users
            ;;
        2)
            create_user
            ;;
        3)
            delete_user
            ;;
        4)
            show_user_info
            ;;
        5)
            echo "終了します"
            exit 0
            ;;
        *)
            echo "無効な選択です"
            ;;
    esac

    echo ""
    read -p "Enterキーを押して続行..."
    clear
done

```
