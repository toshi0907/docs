---
title: "シェルスクリプト: 出力とユーザー入力"
description: "シェルスクリプト リファレンスのうち、出力とユーザー入力についてまとめたページです。"
sidebar:
  label: "出力とユーザー入力"
  order: 1
---

## echo コマンド

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

## printf コマンド

```bash
# フォーマット指定した出力

printf "名前: %s, 年齢: %d\n" "田中" 30
printf "%.2f%%\n" 85.567  # 85.57%

```

## tput コマンド

`tput`は、端末の機能を制御するコマンドです。カーソルの移動、文字色の変更、画面のクリアなど、さまざまな端末操作を行うことができます。

### 基本的な使用法

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

### 画面・行の操作

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

### カーソルの制御

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

### 文字色の設定

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

### 文字属性の設定

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

### 端末情報の取得

```bash
# 端末のサイズを取得

tput lines  # 行数を取得
tput cols   # 列数を取得

# 端末の種類を確認

echo $TERM

# 端末が特定の機能をサポートしているかチェック

tput colors  # サポートしている色数を取得

```

### 実用的な例

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

### 端末機能のチェック

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

### tputの制限事項と注意点

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

## read コマンド

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

## ヒアドキュメント（Here Document）

複数行の文字列をコマンドに渡したり、ファイルに書き出したりする際、`echo`を何度も呼ぶ代わりにヒアドキュメント（`<<`）を使うと読みやすく書けます。変数展開を防ぎたい場合は開始タグをクォートします。

```bash
name="太郎"

# 変数展開が有効なヒアドキュメント
cat <<EOF
こんにちは、${name}さん。
本日の処理を開始します。
EOF

# 開始タグをクォートすると変数展開されない(テンプレートをそのまま出力したい時に便利)
cat <<'EOF'
このブロックの $name はそのまま出力されます。
EOF

# ファイルへの書き出し例(設定ファイルを生成する場合など)
cat <<EOF > /tmp/config.yml
app_name: myapp
environment: production
owner: ${name}
EOF
```

設定ファイルの雛形生成やSQL文の埋め込みなど、複数行テキストを扱う場面で積極的に使うとスクリプトがぐっと読みやすくなります。
