---
layout: page
title: "Termux リファレンス"
---

# Termux リファレンス

Android アプリの Termux を使用したLinux環境の構築と運用方法についてのガイドです。

* 目次
{:toc}

## Termux とは

### 概要

Termux は Android デバイス上で動作するターミナルエミュレータアプリケーションです。root 権限なしで完全な Linux 環境を提供し、パッケージマネージャーを通じて多数のプログラムをインストールできます。

### 特徴

- **Root 権限不要**: Android デバイスを root 化することなく使用可能
- **豊富なパッケージ**: APT パッケージマネージャーによる豊富なソフトウェア
- **ネイティブ実行**: 仮想マシンではなくネイティブで実行
- **SSH サーバー**: 外部からの SSH 接続が可能
- **ストレージアクセス**: Android の内部・外部ストレージへのアクセス

## 基本的なセットアップ

### 初期設定

Termux のインストール後、まず基本的な設定を行います：

```bash
# パッケージリストの更新

pkg update

# パッケージの全体アップグレード

pkg upgrade

# 基本的なツールのインストール

pkg install vim curl wget git openssh

```

### ストレージアクセスの設定

```bash
# Android ストレージへのアクセス許可を取得

termux-setup-storage

# 確認（storage ディレクトリが作成される）

ls -la ~/storage/

# 主要なディレクトリ

ls ~/storage/shared/     # 内部ストレージ
ls ~/storage/external-1/ # SDカード（存在する場合）

```

## パッケージ管理

### pkg コマンド

Termux では `pkg` コマンドを使用してパッケージを管理します：

```bash
# パッケージ検索

pkg search パッケージ名
pkg search python

# パッケージ情報の表示

pkg show パッケージ名
pkg show python

# パッケージインストール

pkg install パッケージ名
pkg install python nodejs php

# パッケージ削除

pkg uninstall パッケージ名

# インストール済みパッケージ一覧

pkg list-installed

# アップグレード可能なパッケージ一覧

pkg list-upgradable

```

### よく使用されるパッケージ

```bash
# 開発ツール

pkg install git vim nano tmux

# プログラミング言語

pkg install python nodejs ruby php golang rust

# ネットワークツール

pkg install openssh curl wget rsync nmap

# システムツール

pkg install htop tree file which

# データベース

pkg install sqlite mariadb postgresql

# 圧縮・解凍ツール

pkg install zip unzip tar gzip

```

## ショートカットキー

### ターミナルショートカット

```bash
# 基本的なターミナルショートカット

Ctrl+C    # プロセス中断
Ctrl+Z    # プロセス一時停止（バックグラウンド実行）
Ctrl+D    # EOF（ファイル終端）、ログアウト
Ctrl+L    # 画面クリア
Ctrl+A    # 行の先頭に移動
Ctrl+E    # 行の末尾に移動
Ctrl+U    # カーソルから行頭まで削除
Ctrl+K    # カーソルから行末まで削除
Ctrl+W    # 前の単語を削除
Ctrl+Y    # 削除したテキストを貼り付け

# 履歴操作

Ctrl+R    # コマンド履歴を逆方向検索
Ctrl+P    # 前のコマンド（↑キーと同じ）
Ctrl+N    # 次のコマンド（↓キーと同じ）

```

### Termux 固有のショートカット

```bash
# 音量キーショートカット（Termux設定で有効化が必要）

音量上げ + Q    # Ctrl+キーの入力
音量上げ + W    # ↑キー
音量上げ + A    # ←キー  
音量上げ + S    # ↓キー
音量上げ + D    # →キー
音量上げ + T    # Tab キー
音量上げ + L    # | パイプ記号
音量上げ + H    # ~ ホームディレクトリ記号
音量上げ + U    # _ アンダースコア
音量上げ + P    # Page Up
音量上げ + N    # Page Down
音量上げ + .    # Ctrl+\ (SIGQUIT)

# 画面タッチジェスチャー

長押し          # テキスト選択・コピー・ペーストメニュー
ピンチイン/アウト  # フォントサイズ変更
2本指上下スワイプ  # ページスクロール

```

### セッション管理ショートカット

```bash
# tmux セッションショートカット（tmux インストール後）

Ctrl+B, C       # 新しいウィンドウ作成
Ctrl+B, N       # 次のウィンドウ
Ctrl+B, P       # 前のウィンドウ
Ctrl+B, D       # セッションからデタッチ
Ctrl+B, %       # 縦分割
Ctrl+B, "       # 横分割

# screen セッションショートカット（screen インストール後）

Ctrl+A, C       # 新しいウィンドウ作成
Ctrl+A, N       # 次のウィンドウ
Ctrl+A, P       # 前のウィンドウ
Ctrl+A, D       # セッションからデタッチ

```

### Android 統合ショートカット

```bash
# Termux:API が必要な機能

termux-open     # ファイルを既定のアプリで開く
termux-share    # ファイルを他のアプリに共有

# 例：ファイルを共有
echo "Hello" | termux-share

# 例：URLをブラウザで開く
termux-open-url "https://example.com"

# 例：ファイルを既定のアプリで開く
termux-open example.pdf

```

## Android ホームスクリーンショートカット

### .shortcut フォルダーによるショートカット作成

Termux では、ホームディレクトリに `.shortcut` フォルダーを作成し、その中にスクリプトファイルを配置することで、Android のホーム画面からTermux コマンドを直接実行できるショートカットを作成できます。

```bash
# .shortcut フォルダーの作成
mkdir -p ~/.shortcut

# フォルダーの確認
ls -la ~/.shortcut

```

### ショートカットファイルの作成

```bash
# 基本的なショートカットファイルの例

# 1. SSH サーバー起動ショートカット
cat > ~/.shortcut/start-ssh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
sshd
echo "SSH サーバーが起動しました"
sleep 2
EOF

# 2. システム情報表示ショートカット
cat > ~/.shortcut/system-info << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
clear
echo "=== Termux システム情報 ==="
echo "日時: $(date)"
echo "ユーザー: $(whoami)"
echo "ホスト: $(hostname)"
echo "CPU情報: $(cat /proc/cpuinfo | grep "model name" | head -1 | cut -d: -f2)"
echo "メモリ情報:"
free -h
echo "ディスク使用量:"
df -h $HOME
echo "IP アドレス:"
ifconfig wlan0 2>/dev/null | grep inet | head -1
read -p "エンターキーで終了..."
EOF

# 3. パッケージアップデート ショートカット
cat > ~/.shortcut/update-packages << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
echo "パッケージリストを更新中..."
pkg update
echo "パッケージをアップグレード中..."
pkg upgrade
echo "アップデート完了"
sleep 3
EOF

# 4. Gemini CLI ショートカット（設定済みの場合）
cat > ~/.shortcut/gemini-chat << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
source ~/gemini-env/bin/activate 2>/dev/null
echo "Gemini AI との対話を開始します"
echo "質問を入力してください（'exit' で終了）:"
while true; do
    read -p "> " question
    if [ "$question" = "exit" ]; then
        break
    fi
    if [ -n "$question" ]; then
        gemini "$question"
    fi
done
EOF

# すべてのショートカットファイルに実行権限を付与
chmod +x ~/.shortcut/*

```

### 高度なショートカット例

```bash
# 5. 開発環境セットアップショートカット
cat > ~/.shortcut/dev-setup << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
echo "開発環境をセットアップ中..."

# 必要なパッケージのインストール
pkg install -y git vim tmux nodejs python

# Git 設定（初回のみ）
if [ ! -f ~/.gitconfig ]; then
    echo "Git 設定を行います"
    read -p "Git ユーザー名: " git_name
    read -p "Git メールアドレス: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
fi

# SSH キーの生成（初回のみ）
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "SSH キーを生成します"
    ssh-keygen -t rsa -b 4096 -C "$git_email" -f ~/.ssh/id_rsa -N ""
    echo "公開鍵:"
    cat ~/.ssh/id_rsa.pub
fi

echo "開発環境のセットアップが完了しました"
read -p "エンターキーで終了..."
EOF

# 6. ファイルバックアップショートカット
cat > ~/.shortcut/backup-files << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
backup_dir="~/storage/shared/termux-backup-$(date +%Y%m%d)"
mkdir -p "$backup_dir"

echo "ファイルバックアップを開始します..."
echo "バックアップ先: $backup_dir"

# 重要なファイルのバックアップ
cp -r ~/.ssh "$backup_dir/" 2>/dev/null
cp -r ~/.shortcut "$backup_dir/" 2>/dev/null
cp ~/.bashrc "$backup_dir/" 2>/dev/null
cp ~/.gitconfig "$backup_dir/" 2>/dev/null

echo "バックアップが完了しました"
ls -la "$backup_dir"
read -p "エンターキーで終了..."
EOF

# 7. ネットワーク診断ショートカット
cat > ~/.shortcut/network-check << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
echo "=== ネットワーク診断 ==="

echo "1. ネットワーク接続状態:"
ping -c 3 8.8.8.8

echo -e "\n2. WiFi 情報:"
termux-wifi-connectioninfo 2>/dev/null || echo "termux-api が必要です"

echo -e "\n3. IP アドレス情報:"
ifconfig

echo -e "\n4. DNS 解決テスト:"
nslookup google.com

echo -e "\n5. HTTP 接続テスト:"
curl -I https://www.google.com

read -p "エンターキーで終了..."
EOF

# すべてのショートカットファイルに実行権限を付与
chmod +x ~/.shortcut/*

```

### ショートカットの確認と管理

```bash
# 作成済みショートカットの一覧表示
ls -la ~/.shortcut/

# ショートカット内容の確認
cat ~/.shortcut/ショートカット名

# ショートカットのテスト実行
~/.shortcut/ショートカット名

# ショートカットの編集
vim ~/.shortcut/ショートカット名

# ショートカットの削除
rm ~/.shortcut/ショートカット名

```

### Android ホーム画面での表示

```bash
# ショートカットが Android ホーム画面に表示される流れ：

# 1. ~/.shortcut フォルダーにスクリプトファイルを配置
# 2. ファイルに実行権限を付与（chmod +x）
# 3. Termux アプリを一度再起動またはリフレッシュ
# 4. Android のホーム画面で長押し → ウィジェット → Termux
# 5. 作成したショートカットが選択肢に表示される
# 6. ホーム画面に配置してタップで実行

# Termux の設定確認
echo "Termux バージョン: $(termux-info | grep "Termux version" || echo "不明")"

```

### ショートカットのカスタマイズ

```bash
# アイコン付きショートカット例（Android 8.0以降）
cat > ~/.shortcut/custom-shortcut << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash

# カスタムタイトル設定
echo -e "\033]0;マイカスタムショートカット\007"

# カラー出力
echo -e "\033[1;32m=== カスタムショートカットが実行されました ===\033[0m"
echo -e "\033[1;34m現在時刻: $(date)\033[0m"

# 実行したい処理をここに記述
echo "カスタム処理を実行中..."

# 処理完了の通知
termux-notification --title "ショートカット実行完了" --content "カスタムショートカットが正常に完了しました" 2>/dev/null

read -p "エンターキーで終了..."
EOF

chmod +x ~/.shortcut/custom-shortcut

```

### トラブルシューティング

```bash
# ショートカットが表示されない場合

# 1. 権限確認
ls -la ~/.shortcut/

# 2. ファイル形式確認（実行可能ファイルである必要がある）
file ~/.shortcut/*

# 3. Termux の再起動
# Android のアプリ履歴からTermux を完全に終了し、再起動

# 4. shebang の確認（ファイルの最初の行）
head -1 ~/.shortcut/*

# 5. ファイル名の確認（特殊文字や空白は避ける）
# 正しい例: start-ssh, system-info, backup-files
# 避ける例: "start ssh", "システム情報"

# 6. Termux のストレージ権限確認
termux-setup-storage

```

## SSH 接続の設定

### SSH サーバーの設定

```bash
# OpenSSH のインストール（未インストールの場合）

pkg install openssh

# SSH サーバーの起動

sshd

# SSH サーバーの状態確認

pgrep sshd

# パスワードの設定（重要）

passwd

```

### SSH 接続の確認

```bash
# Termux デバイスの IP アドレス確認

ifconfig
# または

ip addr show

# SSH 接続ポートの確認（デフォルト: 8022）

cat $PREFIX/etc/ssh/sshd_config | grep Port

# ユーザ名の確認

whoami
# または

echo $USER
# または詳細情報

id

# 外部からの接続テスト（同一ネットワーク内から）

# ssh -p 8022 username@device_ip_address

```

### SSH キー認証の設定

```bash
# SSH キーペアの生成

ssh-keygen -t rsa -b 4096 -C "termux@device"

# 公開鍵の確認

cat ~/.ssh/id_rsa.pub

# 公開鍵を authorized_keys に追加（リモートアクセス用）

cp ~/.ssh/id_rsa.pub ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

```

### SSH 設定ファイルのカスタマイズ

```bash
# SSH サーバー設定の編集

vim $PREFIX/etc/ssh/sshd_config

# 主要な設定項目：

# Port 8022                    # ポート番号
# PasswordAuthentication yes   # パスワード認証の可否

# PubkeyAuthentication yes     # 公開鍵認証の可否
# PermitRootLogin no          # root ログインの可否

# 設定変更後の SSH サーバー再起動

pkill sshd
sshd

```

## 外部からの SSH 接続

### 基本的な接続方法

```bash
# PC から Termux への SSH 接続

ssh -p 8022 username@192.168.1.100

# SSH キーを使用した接続

ssh -p 8022 -i ~/.ssh/termux_key username@192.168.1.100

# SSH 設定ファイルを使用（推奨）

# ~/.ssh/config に以下を追記：
# Host termux

#     HostName 192.168.1.100
#     Port 8022

#     User username
#     IdentityFile ~/.ssh/termux_key

# 設定後の接続

ssh termux

```

### ファイル転送

```bash
# SCP を使用したファイル転送

scp -P 8022 file.txt username@192.168.1.100:~/
scp -P 8022 -r directory/ username@192.168.1.100:~/

# rsync を使用した同期

rsync -avz -e "ssh -p 8022" directory/ username@192.168.1.100:~/backup/

```

### ポートフォワーディング

```bash
# ローカルポートフォワーディング

# Termux上のサービス（例：Webサーバー）をPCからアクセス
ssh -p 8022 -L 8080:localhost:8080 username@192.168.1.100

# リモートポートフォワーディング

# PCのサービスをTermuxからアクセス
ssh -p 8022 -R 9000:localhost:3000 username@192.168.1.100

```

## Gemini CLI の環境構築

### Python 環境のセットアップ

```bash
# Python と pip のインストール

pkg install python python-pip

# 仮想環境の作成（推奨）

pip install virtualenv
python -m venv ~/gemini-env

# 仮想環境の有効化

source ~/gemini-env/bin/activate

# 仮想環境の確認

which python
python --version

```

### Gemini CLI のインストール

```bash
# Google AI Python SDK のインストール

pip install google-generativeai

# または Gemini CLI 専用ツール（例）

pip install gemini-cli

# 依存関係の確認

pip list | grep -i gemini

```

### API キーの設定

```bash
# 環境変数での設定

export GEMINI_API_KEY="your_api_key_here"

# 永続化（.bashrc に追記）

echo 'export GEMINI_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc

# 設定ファイルでの管理

mkdir -p ~/.config/gemini
echo "your_api_key_here" > ~/.config/gemini/api_key
chmod 600 ~/.config/gemini/api_key

```

### Gemini CLI の基本的な使用方法

```bash
# インストール確認

python -c "import google.generativeai as genai; print('Gemini AI installed successfully')"

# 基本的な API テスト

python << 'EOF'
import google.generativeai as genai
import os

# API キーの設定

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# モデルの作成

model = genai.GenerativeModel('gemini-pro')

# 簡単なテスト

response = model.generate_content("Hello, Termux!")
print(response.text)
EOF

```

### Gemini CLI スクリプトの作成

```bash
# Gemini CLI スクリプトの作成

cat > ~/bin/gemini << 'EOF'
#!/data/data/com.termux/files/usr/bin/python

import google.generativeai as genai
import os
import sys

# API キーの設定

api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    with open(os.path.expanduser('~/.config/gemini/api_key'), 'r') as f:
        api_key = f.read().strip()

genai.configure(api_key=api_key)

# モデルの作成

model = genai.GenerativeModel('gemini-pro')

# コマンドライン引数の処理

if len(sys.argv) < 2:
    print("使用方法: gemini <質問>")
    sys.exit(1)

question = ' '.join(sys.argv[1:])

# 質問の送信と回答の表示

try:
    response = model.generate_content(question)
    print(response.text)
except Exception as e:
    print(f"エラー: {e}")
EOF

# スクリプトに実行権限を付与

chmod +x ~/bin/gemini

# PATH に bin ディレクトリを追加

mkdir -p ~/bin
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

```

### 使用例

```bash
# Gemini CLI の実行

gemini "Termux の便利な使い方を教えて"

# 長いテキストの処理

echo "解析したいテキスト" | xargs gemini "以下のテキストを要約して:"

# ファイル内容の分析

gemini "このログファイルに問題はありますか？ $(cat /var/log/syslog | tail -20)"

```

## 高度な設定とカスタマイズ

### Termux API のセットアップ

```bash
# Termux:API アプリのインストールが必要

# Google Play Store から Termux:API をインストール

# termux-api パッケージのインストール

pkg install termux-api

# API 機能の例

termux-battery-status    # バッテリー情報
termux-location         # 位置情報
termux-notification     # 通知送信
termux-sms-list        # SMS一覧
termux-wifi-scaninfo   # WiFi情報

```

### 自動起動設定

```bash
# SSH サーバーの自動起動スクリプト

cat > ~/.bashrc << 'EOF'
# SSH サーバーの自動起動

if ! pgrep sshd > /dev/null; then
    echo "SSH サーバーを起動中..."
    sshd
fi

# Gemini 仮想環境の自動有効化（オプション）

if [ -f ~/gemini-env/bin/activate ]; then
    source ~/gemini-env/bin/activate
fi
EOF

# 設定の反映

source ~/.bashrc

```

### セキュリティ設定

```bash
# ファイアウォール的なネットワーク制限（例）

# Note: Termux は root 権限がないため、システムレベルの設定は制限される

# SSH アクセスログの確認

tail -f $PREFIX/var/log/auth.log

# 不要なサービスの停止

pkill -f "不要なプロセス名"

# セキュアな権限設定

chmod 700 ~
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.bashrc

```

## トラブルシューティング

### よくある問題と解決方法

```bash
# パッケージインストールエラー

pkg clean                    # キャッシュクリア
pkg update && pkg upgrade    # パッケージリスト更新

# SSH 接続できない場合

pgrep sshd                   # SSH サーバー確認
sshd                         # SSH サーバー起動
netstat -tlnp | grep 8022    # ポート確認

# 権限エラー

ls -la ~/.ssh/               # 権限確認
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*

# Gemini API エラー

echo $GEMINI_API_KEY         # API キー確認
pip list | grep google       # パッケージ確認
python -c "import google.generativeai"  # インポート確認

```

### ログ確認

```bash
# Termux のログディレクトリ

ls $PREFIX/var/log/

# SSH ログ

tail -f $PREFIX/var/log/auth.log

# システムログ（Android）

logcat | grep -i termux

```

### パフォーマンス最適化

```bash
# メモリ使用量確認

free -h
ps aux --sort=-%mem

# 不要なプロセス終了

pkill -f "不要なプロセス"

# ディスク容量確認

df -h
du -sh ~/* | sort -hr

```

## Linux CLI の基本コマンド

Termux では標準的な Linux コマンドが使用できます。詳細な Linux CLI の使用方法については、[Linux CLI リファレンス](linux.html)を参照してください。

### Termux 固有の違い

```bash
# PREFIX 変数（Termux 固有）

echo $PREFIX  # /data/data/com.termux/files/usr

# Android 固有のパス

ls /android_asset/
ls /system/

# Termux 固有のコマンド

am start                     # Android Activity Manager
pm list packages            # パッケージ管理
getprop                      # Android Properties

```

このガイドを参考に、Termux を効果的に活用してモバイル Linux 環境を構築してください。
