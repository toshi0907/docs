---
title: "シェルスクリプト リファレンス"
description: "シェルスクリプトの基本的な使い方とコマンドのリファレンスです。"
sidebar:
  label: "概要"
  order: 0
---

シェルスクリプトの基本的な使い方とコマンドのリファレンスです。

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

### 変数のクォート

シェルはクォートしていない変数を展開する際に、空白で単語分割したり、`*`のようなワイルドカードをファイル名展開（グロブ）してしまいます。特にファイルパスや外部入力を扱う変数は必ず`"$var"`のようにダブルクォートで囲むのが鉄則です。

```bash
filename="My Documents/report final.txt"

# クォートなし: 空白で分割されて意図しない引数になり、エラーになる
cat $filename

# クォートあり: 1つの引数として正しく渡る
cat "$filename"

# 配列展開でも同様。"${array[@]}" は各要素を個別の引数として保持する
files=("report 1.txt" "report 2.txt")
for f in "${files[@]}"; do
    echo "処理中: $f"
done
```

「変数展開は基本的に全部ダブルクォート」をルール化しておくと、思わぬバグを大きく減らせます。

### `$@` と `$*` の違い、`shift` による引数処理

スクリプトやシェル関数に渡された引数を扱う際、`$@`と`$*`は見た目が似ていますが、ダブルクォート付きで使うと挙動が異なります。

```bash
show_args() {
    echo "--- \"\$@\" (各引数を個別に展開) ---"
    for a in "$@"; do echo "[$a]"; done

    echo "--- \"\$*\" (全体を1つの文字列に連結) ---"
    for a in "$*"; do echo "[$a]"; done
}

show_args "foo bar" "baz"
# "$@" は ["foo bar"] ["baz"] の2要素として扱われる
# "$*" は ["foo bar baz"] という1つの文字列にまとまる
```

`shift`で先頭の引数を1つずつ消費しながら処理することもできます。

```bash
while [[ $# -gt 0 ]]; do
    echo "処理中: $1"
    shift
done
```

複数の引数をそのまま別のコマンドに渡したい場合は原則`"$@"`を使うのが安全です（`$*`は空白を含む引数が壊れる原因になります）。

### `getopts` によるオプション解析

自作のシェルスクリプトに`-f file`や`-v`のようなオプションを持たせたい場合、`getopts`を使うと標準的な作法で解析できます。

```bash
#!/usr/bin/env bash
set -euo pipefail

verbose=false
output=""

while getopts "vo:h" opt; do
    case "$opt" in
        v) verbose=true ;;
        o) output="$OPTARG" ;;   # コロン付きオプションは引数を取る
        h) echo "使い方: $0 [-v] [-o output] [-h]"; exit 0 ;;
        *) echo "不明なオプションです" >&2; exit 1 ;;
    esac
done
shift $((OPTIND - 1))  # 解析済みオプションを引数リストから取り除く

echo "verbose=$verbose output=$output 残りの引数=$*"
```

```bash
./script.sh -v -o result.txt input1.txt input2.txt
```

longオプションが必要な場合は`getopts`では対応できないため、その際は`getopt`（GNU拡張）や手動のcase文パースを検討してください。

## ページ構成

シェルスクリプト リファレンスは次のページで構成されています。

- [出力とユーザー入力](/docs/languages/shellscript/io/)
- [条件分岐・ループ・関数](/docs/languages/shellscript/control-flow/) — 条件分岐、ループ、関数
- [ファイル操作とコマンド](/docs/languages/shellscript/files-commands/) — ファイル操作、よく使用されるコマンド
- [実用的な例](/docs/languages/shellscript/examples/)
- [デバッグとエラーハンドリング](/docs/languages/shellscript/debugging/)
