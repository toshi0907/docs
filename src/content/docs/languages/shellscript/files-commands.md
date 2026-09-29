---
title: "シェルスクリプト: ファイル操作とコマンド"
description: "シェルスクリプト リファレンスのうち、ファイル操作、よく使用されるコマンドについてまとめたページです。"
sidebar:
  label: "ファイル操作とコマンド"
  order: 3
---

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
