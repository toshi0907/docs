# シェルスクリプト リファレンス

シェルスクリプトの基本的な使い方とコマンドのリファレンスです。

## 目次
1. [基本概念](#基本概念)
2. [変数](#変数)
3. [出力とユーザー入力](#出力とユーザー入力)
4. [条件分岐](#条件分岐)
5. [ループ](#ループ)
6. [関数](#関数)
7. [ファイル操作](#ファイル操作)
8. [よく使用されるコマンド](#よく使用されるコマンド)
9. [実用的な例](#実用的な例)

## 基本概念

### シェルスクリプトの作成と実行

```bash
#!/bin/bash
# 最初の行は shebang（シバン）と呼ばれ、使用するシェルを指定します

echo "Hello, World!"
```

**実行方法:**
```bash
# 実行権限を付与
chmod +x script.sh

# スクリプトを実行
./script.sh
```

### コメント

```bash
# これは単行コメントです

: '
これは
複数行コメントです
'
```

## 変数

### 変数の定義と使用

```bash
# 変数の定義（=の前後にスペースを入れない）
name="太郎"
age=25

# 変数の使用
echo "名前: $name"
echo "年齢: ${age}歳"
```

### 特殊変数

```bash
# スクリプト名
echo "スクリプト名: $0"

# 引数
echo "第1引数: $1"
echo "第2引数: $2"
echo "全引数: $@"
echo "引数の数: $#"

# 直前のコマンドの終了ステータス
echo "終了ステータス: $?"

# プロセスID
echo "PID: $$"
```

### 配列

```bash
# 配列の定義
fruits=("りんご" "みかん" "バナナ")

# 要素へのアクセス
echo "最初の果物: ${fruits[0]}"
echo "全ての果物: ${fruits[@]}"
echo "配列の長さ: ${#fruits[@]}"

# 要素の追加
fruits+=("ぶどう")
```

## 出力とユーザー入力

### echo コマンド

```bash
# 基本的な出力
echo "こんにちは"

# 改行なし
echo -n "改行なし"

# エスケープシーケンスを有効にする
echo -e "タブ:\t改行:\n"

# 変数を含む出力
name="山田"
echo "こんにちは、${name}さん"
```

### printf コマンド

```bash
# フォーマット指定した出力
printf "名前: %s, 年齢: %d\n" "田中" 30
printf "%.2f%%\n" 85.567  # 85.57%
```

### read コマンド

```bash
# ユーザー入力を受け取る
echo "あなたの名前を入力してください:"
read name
echo "こんにちは、${name}さん"

# プロンプト付きで入力
read -p "年齢を入力してください: " age

# パスワード入力（非表示）
read -s -p "パスワードを入力してください: " password
echo  # 改行

# 複数の値を同時に受け取る
read -p "名前と年齢を入力してください: " name age
```

## 条件分岐

### if文

```bash
age=20

if [ $age -ge 20 ]; then
    echo "成人です"
elif [ $age -ge 13 ]; then
    echo "中高生です"
else
    echo "子供です"
fi
```

### 比較演算子

```bash
# 数値比較
# -eq (等しい), -ne (等しくない), -lt (小さい), -le (以下)
# -gt (大きい), -ge (以上)

num1=10
num2=20

if [ $num1 -lt $num2 ]; then
    echo "$num1 は $num2 より小さい"
fi

# 文字列比較
str1="hello"
str2="world"

if [ "$str1" = "$str2" ]; then
    echo "文字列は同じです"
elif [ "$str1" != "$str2" ]; then
    echo "文字列は異なります"
fi

# 文字列の長さチェック
if [ -z "$str1" ]; then
    echo "文字列は空です"
elif [ -n "$str1" ]; then
    echo "文字列は空ではありません"
fi
```

### ファイル・ディレクトリの存在チェック

```bash
file="/path/to/file.txt"
dir="/path/to/directory"

# ファイルの存在チェック
if [ -f "$file" ]; then
    echo "ファイルが存在します"
fi

# ディレクトリの存在チェック
if [ -d "$dir" ]; then
    echo "ディレクトリが存在します"
fi

# 読み取り可能かチェック
if [ -r "$file" ]; then
    echo "ファイルは読み取り可能です"
fi

# 書き込み可能かチェック
if [ -w "$file" ]; then
    echo "ファイルは書き込み可能です"
fi

# 実行可能かチェック
if [ -x "$file" ]; then
    echo "ファイルは実行可能です"
fi
```

### case文

```bash
read -p "好きな季節を入力してください (春/夏/秋/冬): " season

case $season in
    "春")
        echo "桜の季節ですね"
        ;;
    "夏")
        echo "暑い季節ですね"
        ;;
    "秋")
        echo "紅葉の季節ですね"
        ;;
    "冬")
        echo "雪の季節ですね"
        ;;
    *)
        echo "無効な季節です"
        ;;
esac
```

## ループ

### for文

```bash
# 基本的なfor文
for i in 1 2 3 4 5; do
    echo "カウント: $i"
done

# 範囲指定
for i in {1..10}; do
    echo "数値: $i"
done

# 増分指定
for i in {0..20..2}; do
    echo "偶数: $i"
done

# 配列での繰り返し
colors=("赤" "青" "緑" "黄")
for color in "${colors[@]}"; do
    echo "色: $color"
done

# ファイル操作
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "ファイル: $file"
    fi
done

# C言語スタイル
for ((i=1; i<=10; i++)); do
    echo "回数: $i"
done
```

### while文

```bash
# カウンタを使ったwhile文
counter=1
while [ $counter -le 5 ]; do
    echo "カウンター: $counter"
    counter=$((counter + 1))
done

# 条件が真の間実行
read -p "数値を入力してください (0で終了): " num
while [ $num -ne 0 ]; do
    echo "入力された数値: $num"
    read -p "数値を入力してください (0で終了): " num
done

# ファイルの行を読み取り
while IFS= read -r line; do
    echo "行: $line"
done < "file.txt"
```

### until文

```bash
# 条件が偽の間実行
counter=1
until [ $counter -gt 5 ]; do
    echo "カウンター: $counter"
    counter=$((counter + 1))
done
```

## 関数

### 関数の定義と呼び出し

```bash
# 関数の定義
greet() {
    echo "こんにちは、$1さん！"
}

# 関数の呼び出し
greet "田中"

# 複数の引数を受け取る関数
calculate_sum() {
    local num1=$1
    local num2=$2
    local result=$((num1 + num2))
    echo $result
}

# 関数の戻り値を受け取る
result=$(calculate_sum 10 20)
echo "計算結果: $result"

# returnを使った関数
is_even() {
    local num=$1
    if [ $((num % 2)) -eq 0 ]; then
        return 0  # 真（偶数）
    else
        return 1  # 偽（奇数）
    fi
}

# 関数の戻り値をチェック
if is_even 4; then
    echo "4は偶数です"
fi
```

### ローカル変数

```bash
global_var="グローバル"

test_scope() {
    local local_var="ローカル"
    global_var="変更されたグローバル"
    
    echo "関数内 - ローカル変数: $local_var"
    echo "関数内 - グローバル変数: $global_var"
}

echo "関数呼び出し前 - グローバル変数: $global_var"
test_scope
echo "関数呼び出し後 - グローバル変数: $global_var"
# echo "関数外 - ローカル変数: $local_var"  # エラー
```

## ファイル操作

### ファイルの読み書き

```bash
# ファイルに書き込み（上書き）
echo "Hello, World!" > output.txt

# ファイルに追記
echo "追加のテキスト" >> output.txt

# ファイルから読み取り
while IFS= read -r line; do
    echo "読み取った行: $line"
done < input.txt

# ファイル全体を変数に読み込み
content=$(cat input.txt)
echo "ファイル内容: $content"
```

### ディレクトリ操作

```bash
# ディレクトリ作成
mkdir -p /path/to/new/directory

# ディレクトリ移動
cd /path/to/directory

# 現在のディレクトリを表示
pwd

# ディレクトリ内容表示
ls -la

# ディレクトリ削除
rmdir empty_directory
rm -rf directory_with_files
```

### ファイル検索

```bash
# findコマンド
find /path/to/search -name "*.txt" -type f

# grepコマンド
grep -r "検索文字列" /path/to/directory
grep -n "パターン" file.txt  # 行番号付き
grep -i "大小文字無視" file.txt  # 大小文字を無視
```

## よく使用されるコマンド

### テキスト処理

```bash
# cut - 列の抽出
echo "名前,年齢,職業" | cut -d',' -f2  # 年齢のみ抽出

# awk - パターンスキャンと処理
awk '{print $1, $3}' file.txt  # 1列目と3列目を表示
awk -F',' '{print $2}' data.csv  # CSVファイルの2列目

# sed - ストリームエディタ
sed 's/old/new/g' file.txt  # oldをnewに置換
sed -n '1,5p' file.txt  # 1-5行目を表示

# sort - ソート
sort file.txt
sort -n numbers.txt  # 数値ソート
sort -r file.txt  # 逆順ソート

# uniq - 重複行の削除
sort file.txt | uniq
uniq -c file.txt  # 重複回数も表示

# wc - 行数、単語数、文字数のカウント
wc -l file.txt  # 行数
wc -w file.txt  # 単語数
wc -c file.txt  # 文字数
```

### システム情報

```bash
# プロセス情報
ps aux  # 全プロセス表示
ps -ef | grep "プロセス名"

# システム情報
uname -a  # システム情報
df -h  # ディスク使用量
free -h  # メモリ使用量
top  # リアルタイムプロセス監視

# 日付と時刻
date
date +"%Y-%m-%d %H:%M:%S"
```

### ネットワーク

```bash
# ping
ping -c 4 google.com

# wget - ファイルダウンロード
wget https://example.com/file.txt

# curl - HTTPリクエスト
curl -X GET https://api.example.com/data
curl -X POST -d "data=value" https://api.example.com/submit
```

## 実用的な例

### ログファイル分析スクリプト

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

### ファイルバックアップスクリプト

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

### システム監視スクリプト

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

### ユーザー管理スクリプト

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

## 参考情報

### デバッグ技法

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

### エラーハンドリング

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

このリファレンスは、シェルスクリプトの基本的な機能から実用的な例まで幅広くカバーしています。必要に応じて詳細を調べながら、効率的なシェルスクリプトを作成してください。