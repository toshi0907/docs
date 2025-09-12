---
layout: page
title: "シェルスクリプト リファレンス"
---

# シェルスクリプト リファレンス

シェルスクリプトの基本的な使い方とコマンドのリファレンスです。

* 目次
{:toc}

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

### パラメータ展開

```bash
# 基本的なパラメータ展開

name="太郎"
echo "${name}"              # 通常の変数展開

# デフォルト値の設定

echo "${undefined:-default}"    # 変数が未定義または空の場合にデフォルト値を使用
echo "${name:-default}"         # 変数が定義されている場合は変数の値を使用

echo "${undefined:=default}"    # 変数が未定義または空の場合にデフォルト値を設定して使用
echo "${name:+alternative}"     # 変数が定義され非空の場合に代替値を使用

# エラーメッセージ付きのチェック

echo "${undefined:?Error: variable not set}"  # 変数が未定義または空の場合にエラーメッセージを表示

# 文字列の長さ

text="Hello World"
echo "${#text}"             # 文字列の長さを取得（11）

# 部分文字列の抽出

echo "${text:6}"            # 6文字目以降を抽出（"World"）
echo "${text:0:5}"          # 0文字目から5文字を抽出（"Hello"）
echo "${text: -5}"          # 後ろから5文字を抽出（"World"）

# 前方一致での削除（接頭辞の削除）

filepath="/home/user/document.txt"
echo "${filepath#*/}"       # 最初の / までを削除（"home/user/document.txt"）
echo "${filepath##*/}"      # 最後の / までを削除（"document.txt"）

# 後方一致での削除（接尾辞の削除）

echo "${filepath%/*}"       # 最後の / 以降を削除（"/home/user"）
echo "${filepath%%/*}"      # 最初の / 以降を削除（""）

# 拡張子の操作

filename="document.pdf"
echo "${filename%.*}"       # 拡張子を削除（"document"）
echo "${filename##*.}"      # 拡張子のみ取得（"pdf"）

# 文字列の置換

text="apple apple orange"
echo "${text/apple/grape}"      # 最初のappleをgrapeに置換
echo "${text//apple/grape}"     # 全てのappleをgrapeに置換

# パターンによる置換

echo "${text/#apple/grape}"     # 行頭のappleを置換
echo "${text/%orange/grape}"    # 行末のorangeを置換

# 大文字小文字の変換（Bash 4.0以降）

text="Hello World"
echo "${text^}"             # 最初の文字を大文字に
echo "${text^^}"            # 全て大文字に
echo "${text,}"             # 最初の文字を小文字に
echo "${text,,}"            # 全て小文字に

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

### tput コマンド

`tput`は、端末の機能を制御するコマンドです。カーソルの移動、文字色の変更、画面のクリアなど、さまざまな端末操作を行うことができます。

#### 基本的な使用法

```bash
# 画面をクリア

tput clear

# カーソル位置の移動（行、列）

tput cup 5 10  # 5行目、10列目に移動

# カーソルを行の先頭に移動

tput cr

# カーソルを上下左右に移動

tput cuu 2  # カーソルを2行上に移動
tput cud 3  # カーソルを3行下に移動
tput cuf 5  # カーソルを5文字右に移動
tput cub 2  # カーソルを2文字左に移動

```

#### 画面・行の操作

```bash
# 画面全体をクリア

tput clear

# カーソル位置から行末まで削除

tput el

# カーソル位置から画面下部まで削除

tput ed

# 行を挿入

tput il 2  # 2行挿入

# 行を削除

tput dl 1  # 1行削除

# 文字を挿入

tput ich 3  # 3文字分の空白を挿入

# 文字を削除

tput dch 2  # 2文字削除

```

#### カーソルの制御

```bash
# カーソルを非表示にする

tput civis

# カーソルを表示する

tput cnorm

# カーソルを点滅させる

tput cvvis

# カーソル位置の保存と復元

tput sc    # 現在のカーソル位置を保存
echo "一時的なメッセージ"
tput rc    # 保存したカーソル位置に復元

```

#### 文字色の設定

```bash
# 前景色（文字色）の設定

tput setaf 0  # 黒
tput setaf 1  # 赤
tput setaf 2  # 緑
tput setaf 3  # 黄色
tput setaf 4  # 青
tput setaf 5  # マゼンタ
tput setaf 6  # シアン
tput setaf 7  # 白

# 背景色の設定

tput setab 0  # 背景を黒に
tput setab 1  # 背景を赤に
tput setab 2  # 背景を緑に
tput setab 3  # 背景を黄色に
tput setab 4  # 背景を青に
tput setab 5  # 背景をマゼンタに
tput setab 6  # 背景をシアンに
tput setab 7  # 背景を白に

# 色をリセット（デフォルトに戻す）

tput sgr0

```

#### 文字属性の設定

```bash
# 太字（bold）

tput bold

# 下線（underline）

tput smul

# 下線を無効

tput rmul

# 反転表示

tput rev

# 点滅

tput blink

# 薄い文字（dim）

tput dim

# すべての属性をリセット

tput sgr0

```

#### 端末情報の取得

```bash
# 端末のサイズを取得

tput lines  # 行数を取得
tput cols   # 列数を取得

# 端末の種類を確認

echo $TERM

# 端末が特定の機能をサポートしているかチェック

tput colors  # サポートしている色数を取得

```

#### 実用的な例

```bash
# カラー出力の例

#!/bin/bash

# 色とリセットの定義
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
BLUE=$(tput setaf 4)
BOLD=$(tput bold)
RESET=$(tput sgr0)

echo "${RED}これは赤色のテキストです${RESET}"
echo "${GREEN}これは緑色のテキストです${RESET}"
echo "${YELLOW}これは黄色のテキストです${RESET}"
echo "${BLUE}これは青色のテキストです${RESET}"
echo "${BOLD}これは太字のテキストです${RESET}"

# 背景色付きの表示
echo "$(tput setab 1)$(tput setaf 7) 赤い背景に白い文字 $(tput sgr0)"

```

```bash
# プログレスバーの例

#!/bin/bash

show_progress() {
    local current=$1
    local total=$2
    local width=50
    local percentage=$((current * 100 / total))
    local completed=$((current * width / total))
    
    printf "\r$(tput el)プログレス: ["
    for ((i=0; i<completed; i++)); do
        printf "$(tput setaf 2)█$(tput sgr0)"
    done
    for ((i=completed; i<width; i++)); do
        printf "$(tput setaf 8)░$(tput sgr0)"
    done
    printf "] %d%%" $percentage
}

# プログレスバーのデモ
total=100
for ((i=0; i<=total; i++)); do
    show_progress $i $total
    sleep 0.05
done
echo ""

```

```bash
# メニュー表示の例

#!/bin/bash

display_menu() {
    tput clear
    tput cup 2 10
    echo "$(tput bold)$(tput setaf 4)=== メインメニュー ===$(tput sgr0)"
    tput cup 4 10
    echo "$(tput setaf 2)1.$(tput sgr0) ファイル操作"
    tput cup 5 10
    echo "$(tput setaf 2)2.$(tput sgr0) システム情報"
    tput cup 6 10
    echo "$(tput setaf 2)3.$(tput sgr0) ネットワーク"
    tput cup 7 10
    echo "$(tput setaf 1)4.$(tput sgr0) 終了"
    tput cup 9 10
    echo -n "$(tput bold)選択してください (1-4): $(tput sgr0)"
}

# メニューの表示
display_menu

```

```bash
# エラー・成功メッセージの例

#!/bin/bash

show_error() {
    echo "$(tput bold)$(tput setaf 1)[エラー]$(tput sgr0) $1"
}

show_success() {
    echo "$(tput bold)$(tput setaf 2)[成功]$(tput sgr0) $1"
}

show_warning() {
    echo "$(tput bold)$(tput setaf 3)[警告]$(tput sgr0) $1"
}

show_info() {
    echo "$(tput bold)$(tput setaf 4)[情報]$(tput sgr0) $1"
}

# メッセージ表示の例
show_error "ファイルが見つかりません"
show_success "ファイルのコピーが完了しました"
show_warning "ディスク容量が不足しています"
show_info "処理を開始します"

```

```bash
# 位置指定出力の例

#!/bin/bash

# ダッシュボード風の表示
dashboard() {
    tput clear
    
    # タイトル
    tput cup 1 20
    echo "$(tput bold)$(tput setaf 4)システム監視ダッシュボード$(tput sgr0)"
    
    # CPU使用率
    tput cup 3 5
    echo "$(tput bold)CPU使用率:$(tput sgr0)"
    tput cup 3 20
    echo "$(tput setaf 2)15%$(tput sgr0)"
    
    # メモリ使用率
    tput cup 4 5
    echo "$(tput bold)メモリ使用率:$(tput sgr0)"
    tput cup 4 20
    echo "$(tput setaf 3)65%$(tput sgr0)"
    
    # ディスク使用率
    tput cup 5 5
    echo "$(tput bold)ディスク使用率:$(tput sgr0)"
    tput cup 5 20
    echo "$(tput setaf 1)85%$(tput sgr0)"
    
    # 現在時刻
    tput cup 7 5
    echo "$(tput bold)現在時刻:$(tput sgr0) $(date '+%Y-%m-%d %H:%M:%S')"
    
    # カーソルを最下部に移動
    tput cup $(($(tput lines) - 1)) 0
}

dashboard

```

```bash
# インタラクティブな表示の例

#!/bin/bash

interactive_display() {
    local message="$1"
    local delay=0.1
    
    # カーソルを非表示に
    tput civis
    
    # 文字を一文字ずつ表示
    for ((i=0; i<${#message}; i++)); do
        printf "%c" "${message:i:1}"
        sleep $delay
    done
    
    echo ""
    
    # カーソルを表示に戻す
    tput cnorm
}

# デモンストレーション
interactive_display "これは一文字ずつ表示されるメッセージです。"

```

#### 端末機能のチェック

```bash
# 端末が色をサポートしているかチェック

check_color_support() {
    if [ $(tput colors) -ge 8 ]; then
        echo "$(tput setaf 2)この端末は8色以上をサポートしています$(tput sgr0)"
        echo "サポート色数: $(tput colors)色"
    else
        echo "この端末は色をサポートしていません"
    fi
}

check_color_support

```

```bash
# 端末のサイズに応じた表示調整

adjust_display() {
    local lines=$(tput lines)
    local cols=$(tput cols)
    
    if [ $cols -lt 80 ]; then
        echo "$(tput setaf 3)注意: 端末幅が狭すぎます（$cols文字）$(tput sgr0)"
        echo "最適な表示には80文字以上が推奨されます"
    fi
    
    if [ $lines -lt 24 ]; then
        echo "$(tput setaf 3)注意: 端末高が低すぎます（$lines行）$(tput sgr0)"
        echo "最適な表示には24行以上が推奨されます"
    fi
    
    # 中央に文字を表示
    local center_row=$((lines / 2))
    local center_col=$(((cols - 20) / 2))
    
    tput cup $center_row $center_col
    echo "$(tput bold)画面の中央です$(tput sgr0)"
}

adjust_display

```

#### tputの制限事項と注意点

```bash
# TERM環境変数が設定されていない場合のエラーハンドリング

safe_tput() {
    if [ -n "$TERM" ] && [ "$TERM" != "dumb" ]; then
        tput "$@"
    else
        # tputが使用できない環境では何もしない
        return 0
    fi
}

# 使用例
RED=$(safe_tput setaf 1)
RESET=$(safe_tput sgr0)
echo "${RED}安全にカラー表示${RESET}"

```

`tput`コマンドは、シェルスクリプトでターミナルの見た目を改善し、ユーザーフレンドリーなインターフェースを作成する際に非常に有用です。ただし、すべての端末で同じ機能が利用できるわけではないため、適切なエラーハンドリングを行うことが重要です。

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

### case文（複数条件の指定）

パイプ文字（`|`）を使用することで、複数の条件を同じ処理にまとめることができます。

```bash
#!/bin/bash
fruit="grape"

case "$fruit" in
    "apple" | "orange" | "grape")
        echo "丸い果物です"
        ;;
    "banana" | "cucumber")
        echo "細長い果物です"
        ;;
    *)
        echo "その他の形です"
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

### sed（ストリームエディタ）

`sed`は、ストリームエディタとして、テキストの置換、削除、挿入などを行うコマンドです。

```bash
# 基本的な置換

sed 's/old/new/' file.txt          # 各行の最初のoldをnewに置換
sed 's/old/new/g' file.txt         # 各行のすべてのoldをnewに置換
sed 's/old/new/2' file.txt         # 各行の2番目のoldのみ置換

# 大小文字を区別しない置換

sed 's/old/new/gi' file.txt        # 大小文字を区別せずすべて置換

# 特定の行のみ処理

sed '3s/old/new/' file.txt         # 3行目のみ置換
sed '1,5s/old/new/g' file.txt      # 1-5行目のみ置換
sed '/pattern/s/old/new/g' file.txt # パターンにマッチする行のみ置換

# 行の表示

sed -n '1,5p' file.txt             # 1-5行目のみ表示
sed -n '/pattern/p' file.txt       # パターンにマッチする行のみ表示

# 行の削除

sed '3d' file.txt                  # 3行目を削除
sed '1,5d' file.txt                # 1-5行目を削除
sed '/pattern/d' file.txt          # パターンにマッチする行を削除

# 行の挿入と追加

sed '3i\新しい行' file.txt          # 3行目の前に挿入
sed '3a\新しい行' file.txt          # 3行目の後に追加

# インプレース編集（元ファイルを変更）

sed -i 's/old/new/g' file.txt      # 元ファイルを直接変更
sed -i.bak 's/old/new/g' file.txt  # バックアップを作成して変更

# 複数のコマンドを実行

sed -e 's/old/new/g' -e 's/foo/bar/g' file.txt
sed 's/old/new/g; s/foo/bar/g' file.txt

# 実用例

# 設定ファイルのコメントアウト
sed 's/^/#/' config.txt            # 各行の先頭に#を追加
sed 's/^#//' config.txt            # 各行の先頭の#を削除

# 空行の削除

sed '/^$/d' file.txt

# HTMLタグの削除

sed 's/<[^>]*>//g' html_file.txt

```

### awk（パターンスキャンと処理）

`awk`は、パターンスキャンと処理を行う強力なテキスト処理言語です。

```bash
# 基本的な使用法

awk '{print}' file.txt             # 全行を表示（catと同じ）
awk '{print $1}' file.txt          # 1列目のみ表示
awk '{print $1, $3}' file.txt      # 1列目と3列目を表示
awk '{print NF}' file.txt          # 各行のフィールド数を表示
awk '{print NR, $0}' file.txt      # 行番号と行内容を表示

# フィールド区切り文字の指定

awk -F',' '{print $2}' data.csv    # CSVファイルの2列目
awk -F':' '{print $1}' /etc/passwd # /etc/passwdのユーザー名のみ

# パターンマッチング

awk '/pattern/ {print}' file.txt   # パターンにマッチする行のみ表示
awk '$1 == "値" {print}' file.txt   # 1列目が"値"と等しい行のみ
awk '$3 > 100 {print}' file.txt    # 3列目が100より大きい行のみ

# 条件演算子

awk '$1 > 50 {print "大きい"} $1 <= 50 {print "小さい"}' file.txt

# BEGIN と END

awk 'BEGIN {print "開始"} {print $1} END {print "終了"}' file.txt

# 変数と演算

awk '{sum += $1} END {print "合計:", sum}' numbers.txt
awk '{count++} END {print "行数:", count}' file.txt
awk '{if ($1 > max) max = $1} END {print "最大値:", max}' numbers.txt

# 複数フィールドの操作

awk '{print $1 * $2}' file.txt     # 1列目と2列目の積
awk '{print $1, $1 * 1.08}' prices.txt # 価格と税込み価格

# 文字列操作

awk '{print length($1)}' file.txt   # 1列目の文字数
awk '{print toupper($1)}' file.txt  # 1列目を大文字に変換
awk '{print tolower($1)}' file.txt  # 1列目を小文字に変換
awk '{print substr($1, 1, 3)}' file.txt # 1列目の最初の3文字

# 実用例

# CSVファイルの処理
awk -F',' '{print $1 ": " $2}' data.csv

# ログファイルの分析

awk '{print $1}' access.log | sort | uniq -c | sort -nr # IPアドレス別アクセス数

# システム情報の抽出

ps aux | awk '{sum += $3} END {print "CPU使用率合計:", sum "%"}'

# 複雑な条件処理

awk -F':' '$3 >= 1000 {print $1, $5}' /etc/passwd # UID 1000以上のユーザー

# 複数ファイルの処理

awk '{print FILENAME, $1}' file1.txt file2.txt

```

### shfmt（シェルスクリプトフォーマッター）

`shfmt`は、シェルスクリプトの自動フォーマット（整形）を行うコマンドです。コードの可読性向上や一貫した書式設定に使用されます。

```bash
# 基本的な使用法

shfmt script.sh                     # ファイルをフォーマットして表示
shfmt -w script.sh                  # ファイルを直接変更（上書き）
shfmt -d script.sh                  # 変更差分のみを表示

# インデントの設定

shfmt -i 2 script.sh                # 2文字のインデント（デフォルト）
shfmt -i 4 script.sh                # 4文字のインデント
shfmt -i 0 script.sh                # タブでインデント

# 言語バリアントの指定

shfmt -ln bash script.sh            # Bash形式
shfmt -ln posix script.sh           # POSIX形式
shfmt -ln mksh script.sh            # mksh形式

# 関数の開始ブレースの位置

shfmt -fn script.sh                 # 関数名と同じ行に開始ブレース
shfmt -ci script.sh                 # ケース文の中身をインデント

# 複数ファイルの処理

shfmt -w *.sh                       # 全ての.shファイルをフォーマット
find . -name "*.sh" -exec shfmt -w {} \;  # 再帰的に全ての.shファイルをフォーマット

# 標準入力からの処理

cat script.sh | shfmt               # パイプでフォーマット
echo 'if [ $? -eq 0 ];then echo ok;fi' | shfmt  # 一行のスクリプトをフォーマット

# フォーマットチェック（CI/CDで使用）

shfmt -d *.sh                       # フォーマットが必要なファイルを確認
if ! shfmt -d script.sh | grep -q .; then
    echo "フォーマット済み"
else
    echo "フォーマットが必要"
    exit 1
fi

# 実用例

# 開発前のフォーマット
shfmt -w -i 2 -ci -fn *.sh          # 全ファイルを統一フォーマット

# Git pre-commitフックでの使用

shfmt -d $(git diff --cached --name-only --diff-filter=ACM | grep '\.sh$')

# プロジェクト全体の一括フォーマット

find . -name "*.sh" -not -path "./vendor/*" -exec shfmt -w -i 2 {} \;

# フォーマット前後の比較

cp script.sh script.sh.backup
shfmt -w script.sh
diff script.sh.backup script.sh

```

### nkf（文字コード変換）

`nkf`（Network Kanji Filter）は、日本語の文字コード変換を行うコマンドです。

```bash
# 文字コードの確認

nkf --guess file.txt               # ファイルの文字コードを推定表示

# 基本的な変換

nkf -w file.txt                    # UTF-8に変換して表示
nkf -s file.txt                    # Shift_JISに変換して表示
nkf -e file.txt                    # EUC-JPに変換して表示

# ファイルの変換（上書き）

nkf -w --overwrite file.txt        # UTF-8に変換して上書き
nkf -s --overwrite file.txt        # Shift_JISに変換して上書き
nkf -e --overwrite file.txt        # EUC-JPに変換して上書き

# 改行コードの変換

nkf -Lu file.txt                   # LF（Unix）改行に変換
nkf -Lw file.txt                   # CRLF（Windows）改行に変換
nkf -Lm file.txt                   # CR（Mac Classic）改行に変換

# 文字コードと改行コードの同時変換

nkf -w -Lu file.txt                # UTF-8 + LF改行に変換
nkf -s -Lw file.txt                # Shift_JIS + CRLF改行に変換

# 入力元文字コードの指定

nkf -W -w file.txt                 # UTF-8から変換
nkf -S -w file.txt                 # Shift_JISから変換
nkf -E -w file.txt                 # EUC-JPから変換

# ファイル出力

nkf -w input.txt > output.txt      # 変換結果を別ファイルに保存

# 実用例

# CSVファイルの文字コード変換（Excel対応）
nkf -s --overwrite data.csv        # Excel用にShift_JISに変換

# Webアプリケーション用にUTF-8に統一

find . -name "*.txt" -exec nkf -w --overwrite {} \;

# 文字コード確認とバッチ変換

for file in *.txt; do
    echo "$file: $(nkf --guess "$file")"
    nkf -w --overwrite "$file"
done

# パイプでの使用

cat sjis_file.txt | nkf -w | grep "検索文字列"

# 複数ファイルの一括変換

nkf -w --overwrite *.txt

# エラーハンドリング付きの変換

if nkf -w input.txt > output.txt; then
    echo "変換成功"
else
    echo "変換失敗"
fi

```

### システム情報

```bash
# システム情報

uname -a  # システム情報
df -h  # ディスク使用量
free -h  # メモリ使用量
top  # リアルタイムプロセス監視

# 日付と時刻

date
date +"%Y-%m-%d %H:%M:%S"

```

### プロセス関係

#### waitコマンド

`wait`コマンドは、バックグラウンドで実行されているプロセスの完了を待機するために使用します。

```bash
# 基本的な使用法

wait  # 全てのバックグラウンドプロセスの完了を待機
wait PID  # 指定したプロセスIDの完了を待機
wait %1  # ジョブ番号1の完了を待機

# waitコマンドの実用例

# バックグラウンドプロセスを複数起動して全て完了を待機
long_task1 &
long_task2 &
long_task3 &
wait  # 全てのバックグラウンドプロセスの完了を待機
echo "全ての処理が完了しました"

# 特定のプロセスの完了を待機

long_task &
pid=$!  # 直前のバックグラウンドプロセスのPIDを取得
echo "処理中... (PID: $pid)"
wait $pid
echo "処理が完了しました"

```

#### psコマンド

```bash
# プロセス情報

ps aux  # 全プロセス表示
ps -ef | grep "プロセス名"

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

### シグナルハンドリング

#### TRAPコマンド

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

#### 主要なシグナル

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

#### 基本的な使用例

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

#### Ctrl+Cでの割り込みハンドリング

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

#### 複数シグナルの同時ハンドリング

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

#### エラー時の詳細情報記録

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

#### 一時ファイル管理の実用例

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

#### デバッグ情報付きのtrap

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

#### サービススクリプトでの使用例

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
