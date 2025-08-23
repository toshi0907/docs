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
