---
title: "シェルスクリプト: 条件分岐・ループ・関数"
description: "シェルスクリプト リファレンスのうち、条件分岐、ループ、関数についてまとめたページです。"
sidebar:
  label: "条件分岐・ループ・関数"
  order: 2
---

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

### `[[ ]]` と `[ ]` の違い

`[ ]`はPOSIX互換の古典的なtestコマンドですが、`[[ ]]`はbash/zshの拡張構文で、より安全で高機能です。変数展開時の単語分割やグロブが起きず、ワイルドカードパターンマッチングや正規表現マッチも使えます。

```bash
name="Taro Yamada"

# [ ] だと変数をクォートし忘れるとエラーになりやすい
if [ "$name" = "Taro Yamada" ]; then
    echo "match (POSIX test)"
fi

# [[ ]] なら未クォートでも単語分割されない(それでもクォートは推奨)
if [[ $name == "Taro Yamada" ]]; then
    echo "match (bash test)"
fi

# [[ ]] はワイルドカードパターンマッチができる
if [[ $name == Taro* ]]; then
    echo "Taroで始まる名前です"
fi

# 正規表現マッチ (=~) も[[ ]]だけの機能
if [[ $name =~ ^Taro\ [A-Z][a-z]+$ ]]; then
    echo "正規表現にもマッチしました"
fi
```

bash専用スクリプトなら基本的に`[[ ]]`を使い、`/bin/sh`との互換性が必要な場合のみ`[ ]`を使う、と使い分けるのがおすすめです。

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
