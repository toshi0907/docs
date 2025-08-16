---
layout: page
title: "Linux CLI リファレンス"
---

# Linux CLI リファレンス

Linux コマンドラインインターフェース（CLI）の基本的な使い方とコマンドリファレンスです。

* 目次
{:toc}

## 基本概念

### Linux CLI とは
Linux CLI（Command Line Interface）は、テキストベースでLinuxシステムと対話するためのインターフェースです。グラフィカルユーザーインターフェース（GUI）よりも効率的で強力な操作が可能です。

### シェルの種類
- **bash**: 最も一般的なシェル（Bourne Again Shell）
- **zsh**: 高機能なシェル（Z Shell）
- **fish**: ユーザーフレンドリーなシェル（Fish Shell）
- **sh**: 基本的なシェル（Bourne Shell）

## ファイル・ディレクトリ操作

### 基本的なナビゲーション

```bash
# 現在のディレクトリを表示
pwd

# ディレクトリの内容を一覧表示
ls
ls -la  # 詳細表示（隠しファイル含む）
ls -lh  # 人間が読みやすい形式でサイズ表示

# ディレクトリ移動
cd /path/to/directory  # 絶対パス
cd ../                 # 一つ上のディレクトリ
cd ~                   # ホームディレクトリ
cd -                   # 前のディレクトリ
```

### ファイル・ディレクトリの作成と削除

```bash
# ディレクトリ作成
mkdir directory_name
mkdir -p path/to/nested/directory  # 親ディレクトリも同時作成

# ファイル作成
touch filename.txt
echo "内容" > filename.txt  # 内容付きで作成（上書き）
echo "追加内容" >> filename.txt  # 内容を追記

# ファイル・ディレクトリ削除
rm filename.txt           # ファイル削除
rm -r directory_name      # ディレクトリを再帰的に削除
rm -rf directory_name     # 強制的に削除（注意して使用）
rmdir empty_directory     # 空のディレクトリ削除
```

### ファイルのコピーと移動

```bash
# ファイルコピー
cp source.txt destination.txt
cp -r source_directory/ destination_directory/  # ディレクトリの再帰コピー

# ファイル移動・リネーム
mv old_name.txt new_name.txt  # リネーム
mv file.txt /path/to/new/location/  # 移動
```

## ファイル内容の表示と編集

### ファイル内容の表示

```bash
# ファイル全体を表示
cat filename.txt

# ファイルの先頭を表示
head filename.txt
head -n 20 filename.txt  # 先頭20行を表示

# ファイルの末尾を表示
tail filename.txt
tail -n 20 filename.txt  # 末尾20行を表示
tail -f filename.txt     # リアルタイムで追記内容を監視

# ページごとに表示
less filename.txt
more filename.txt
```

### テキストエディタ

```bash
# nano エディタ（初心者向け）
nano filename.txt

# vim エディタ（高機能）
vim filename.txt
# vim基本操作:
# i: 挿入モード
# Esc: ノーマルモード
# :w: 保存
# :q: 終了
# :wq: 保存して終了

# emacs エディタ
emacs filename.txt
```

## ファイル検索とテキスト処理

### ファイル検索

```bash
# ファイル名で検索
find /path/to/search -name "*.txt"
find . -name "filename*"  # 現在のディレクトリ以下で検索

# ファイル内容で検索
grep "検索文字列" filename.txt
grep -r "検索文字列" /path/to/directory/  # 再帰検索
grep -i "大小文字無視" filename.txt      # 大小文字を無視
grep -n "パターン" filename.txt          # 行番号付き
```

### テキスト処理

```bash
# ファイル行数・文字数・単語数の表示
wc filename.txt
wc -l filename.txt  # 行数のみ
wc -w filename.txt  # 単語数のみ

# ソート
sort filename.txt
sort -r filename.txt  # 逆順ソート
sort -n filename.txt  # 数値ソート

# 重複行の除去
uniq filename.txt
sort filename.txt | uniq  # ソート後に重複除去

# 特定の列を抽出
cut -d',' -f1,3 file.csv  # CSVの1列目と3列目を抽出
awk '{print $1, $3}' filename.txt  # 1列目と3列目を表示
```

## プロセス管理

### プロセスの確認

```bash
# 実行中のプロセス一覧
ps aux
ps -ef

# リアルタイムプロセス監視
top
htop  # より見やすい表示（インストールが必要な場合あり）

# 特定のプロセスを検索
ps aux | grep "プロセス名"
pgrep "プロセス名"
```

### プロセスの制御

```bash
# プロセス終了
kill PID
kill -9 PID  # 強制終了

# プロセス名で終了
killall プロセス名
pkill プロセス名

# バックグラウンド実行
command &
nohup command &  # ログアウト後も継続

# ジョブ制御
jobs           # バックグラウンドジョブ一覧
fg %1          # ジョブ1をフォアグラウンドに
bg %1          # ジョブ1をバックグラウンドに
Ctrl+Z         # 現在のプロセスを一時停止
```

## タスクスケジューリング（cron）

### cron とは
cron は Unix/Linux システムにおけるタスクスケジューラーです。指定した時間に自動的にコマンドやスクリプトを実行することができます。定期的なバックアップ、ログの整理、システムメンテナンスなどに使用されます。

### crontab の基本操作

```bash
# crontab の編集
crontab -e

# 現在の crontab を表示
crontab -l

# crontab を削除
crontab -r

# 特定ユーザーの crontab を編集（root権限が必要）
sudo crontab -e -u username

# 特定ユーザーの crontab を表示
sudo crontab -l -u username
```

### crontab の書式

crontab のエントリは以下の形式で記述します：

```
分 時 日 月 曜日 コマンド
*  *  *  *  *    command
```

各フィールドの説明：
- **分**: 0-59
- **時**: 0-23
- **日**: 1-31
- **月**: 1-12 または jan-dec
- **曜日**: 0-7 または sun-sat（0と7は日曜日）

### 特殊文字

```bash
*    # すべての値にマッチ
,    # 複数の値を指定（例: 1,3,5）
-    # 範囲を指定（例: 1-5）
/    # 間隔を指定（例: */5 は5分おき）
```

### よく使用される cron 表現例

```bash
# 毎分実行
* * * * * /path/to/command

# 毎時0分に実行（毎時正時）
0 * * * * /path/to/command

# 毎日午前2時30分に実行
30 2 * * * /path/to/command

# 毎週月曜日の午前9時に実行
0 9 * * 1 /path/to/command

# 毎月1日の午前0時に実行
0 0 1 * * /path/to/command

# 平日（月〜金）の午前9時から午後5時まで1時間おきに実行
0 9-17 * * 1-5 /path/to/command

# 5分おきに実行
*/5 * * * * /path/to/command

# 営業時間（9-17時）の30分おきに平日のみ実行
*/30 9-17 * * 1-5 /path/to/command

# 毎年1月1日の午前0時（新年）
0 0 1 1 * /path/to/new_year_script.sh
```

### 実践的な cron ジョブの例

```bash
# システムバックアップ（毎日午前3時）
0 3 * * * /usr/local/bin/backup_script.sh

# ログファイルのローテーション（毎週日曜日）
0 0 * * 0 /usr/sbin/logrotate /etc/logrotate.conf

# 一時ファイルの削除（毎日午前4時）
0 4 * * * find /tmp -type f -atime +7 -delete

# データベースのバックアップ（毎日午前2時）
0 2 * * * mysqldump -u root -p database_name > /backup/db_$(date +\%Y\%m\%d).sql

# ディスク容量チェック（平日の午前9時）
0 9 * * 1-5 df -h | mail -s "Disk Usage Report" admin@example.com

# Webサイトの死活監視（5分おき）
*/5 * * * * curl -f http://example.com > /dev/null 2>&1 || echo "Site down" | mail admin@example.com
```

### 環境変数の設定

```bash
# crontab内で環境変数を設定
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=admin@example.com

# 特定の環境変数を使用
HOME=/home/user
0 2 * * * cd $HOME && ./backup.sh
```

### ログとデバッグ

```bash
# cron ジョブのログを確認
tail -f /var/log/cron
# または
journalctl -u cron

# 特定ユーザーのcronログを確認
grep "username" /var/log/cron

# cronジョブの出力をファイルに記録
0 2 * * * /path/to/script.sh >> /var/log/my_script.log 2>&1

# メール送信の設定（MAILTO変数）
MAILTO=admin@example.com
0 2 * * * /path/to/script.sh

# エラーのみメール送信
0 2 * * * /path/to/script.sh >/dev/null
```

### cron の実行時刻を確認

```bash
# 次回の実行予定時刻を確認するスクリプト例
#!/bin/bash
# cron_next.sh
echo "=== 次回のcron実行予定 ==="
for user in $(cut -f1 -d: /etc/passwd); do
    if crontab -u $user -l >/dev/null 2>&1; then
        echo "User: $user"
        crontab -u $user -l
        echo "---"
    fi
done
```

### トラブルシューティング

```bash
# cronデーモンのステータス確認
systemctl status cron        # Debian/Ubuntu
systemctl status crond       # Red Hat/CentOS

# cronデーモンの再起動
sudo systemctl restart cron  # Debian/Ubuntu
sudo systemctl restart crond # Red Hat/CentOS

# crontabの構文チェック
# 一時ファイルに保存してテスト
crontab -l > /tmp/mycron
nano /tmp/mycron
crontab /tmp/mycron

# 手動でコマンドをテスト
/bin/bash -c "cd /home/user && ./script.sh"
```

### セキュリティとベストプラクティス

```bash
# スクリプトの権限設定
chmod 755 /path/to/script.sh
chmod +x /path/to/script.sh

# 絶対パスを使用
0 2 * * * /usr/bin/python3 /home/user/script.py

# ログ出力の設定
0 2 * * * /path/to/script.sh 2>&1 | logger -t my_script

# リダイレクトでログ管理
0 2 * * * /path/to/script.sh >> /var/log/script.log 2>&1

# ロックファイルを使用して重複実行を防止
0 */6 * * * /usr/bin/flock -n /tmp/script.lock /path/to/script.sh
```

### anacron との違い

```bash
# anacron の確認（システムが常時稼働していない場合に有用）
cat /etc/anacrontab

# anacron の実行
sudo anacron -f  # 強制実行
sudo anacron -T  # 設定テスト
```

anacron は、指定した期間内にシステムが稼働していれば、停止していた間に実行されなかったジョブを実行します。ノートPCなど、常時稼働していないシステムに適しています。

## ネットワーク関連

### ネットワーク接続確認

```bash
# ping テスト
ping google.com
ping -c 4 google.com  # 4回だけ実行

# ポート接続テスト
telnet hostname port
nc -zv hostname port  # netcat でポート確認

# ネットワーク設定確認
ip addr show
ifconfig  # 古い形式（一部システムでは利用不可）
```

### ファイル転送

```bash
# scp（SSH経由でファイル転送）
scp file.txt user@remote:/path/to/destination/
scp -r directory/ user@remote:/path/to/destination/

# rsync（効率的な同期）
rsync -avz source/ user@remote:/path/to/destination/
rsync -avz --delete source/ destination/  # 削除も同期
```

## システム情報とリソース監視

### システム情報

```bash
# システム情報
uname -a       # システム全般情報
lsb_release -a # ディストリビューション情報（Ubuntu/Debianなど）
cat /etc/os-release  # OS情報

# CPU情報
lscpu
cat /proc/cpuinfo

# メモリ情報
free -h
cat /proc/meminfo

# ディスク使用量
df -h          # ファイルシステム使用量
du -sh /path/  # 特定ディレクトリのサイズ
```

### ログ確認

#### journalctl コマンド

`journalctl` は systemd ジャーナル（systemd-journald）からログを閲覧するためのコマンドです。従来のテキストファイルベースのログとは異なり、バイナリ形式で保存されたログを効率的に検索・フィルタリングできます。

```bash
# 基本的な使用方法
journalctl              # 全てのログを表示
journalctl -f           # リアルタイム監視（follow）
journalctl -r           # 逆順（新しいものから）表示

# 行数制限
journalctl -n 20        # 最新20行を表示
journalctl --lines=50   # 最新50行を表示

# 特定サービスのログ
journalctl -u nginx              # nginxサービスのログ
journalctl -u ssh.service       # SSHサービスのログ
journalctl -u systemd-logind    # ログインサービスのログ
```

#### 時間によるフィルタリング

```bash
# 時間範囲指定
journalctl --since "2024-01-01"                    # 2024年1月1日以降
journalctl --since "2024-01-01 10:00:00"          # 具体的な時刻以降
journalctl --since "1 hour ago"                    # 1時間前以降
journalctl --since "yesterday"                     # 昨日以降
journalctl --since "2 days ago" --until "1 day ago"  # 2日前から1日前まで

# 相対時間指定
journalctl --since "10 minutes ago"  # 10分前以降
journalctl --since "30 seconds ago"  # 30秒前以降
```

#### 優先度・重要度によるフィルタリング

```bash
# 優先度別フィルタリング（数値が小さいほど重要）
journalctl -p 0         # emergency（システム使用不可）
journalctl -p 1         # alert（即座の対応が必要）
journalctl -p 2         # critical（重大な状況）
journalctl -p 3         # error（エラー条件）
journalctl -p 4         # warning（警告条件）
journalctl -p 5         # notice（正常だが重要な状況）
journalctl -p 6         # info（情報メッセージ）
journalctl -p 7         # debug（デバッグメッセージ）

# 名前での指定も可能
journalctl --priority=err       # エラー以上
journalctl --priority=warning   # 警告以上
```

#### 出力フォーマット

```bash
# 出力形式の変更
journalctl --output=json        # JSON形式
journalctl --output=json-pretty # 見やすいJSON形式
journalctl --output=verbose     # 詳細な情報を含む
journalctl --output=short       # 短縮形式（デフォルト）
journalctl --output=cat         # メッセージ部分のみ

# ファイルへの出力
journalctl --output=json > system_logs.json
```

#### 実用的な使用例

```bash
# システム起動時のエラーチェック
journalctl -b --priority=err

# 特定サービスの最近のエラー
journalctl -u apache2 --since "today" --priority=warning

# SSH接続試行の監視
journalctl -u ssh -f --grep="Failed password"

# システム全体の最近1時間のエラーと警告
journalctl --since "1 hour ago" --priority=warning

# カーネルメッセージのみ表示
journalctl -k

# 特定ユーザーのセッション情報
journalctl _UID=1000
```

#### その他の便利なオプション

```bash
# ディスク使用量確認
journalctl --disk-usage

# ログローテーション管理
journalctl --vacuum-time=2weeks    # 2週間以前のログを削除
journalctl --vacuum-size=100M      # 100MBを超える分を削除

# ログの整合性確認
journalctl --verify

# 追跡可能な fields の一覧
journalctl --fields
```

#### 従来のログファイル

```bash
# 従来のテキストベースログファイル
tail -f /var/log/syslog      # システム全般のログ
tail -f /var/log/messages    # システムメッセージ（Red Hat系）
tail -f /var/log/auth.log    # 認証関連ログ（Debian系）
tail -f /var/log/secure      # 認証関連ログ（Red Hat系）
```

## 権限管理

### ファイル権限

```bash
# 権限変更
chmod 755 filename     # rwxr-xr-x
chmod +x script.sh     # 実行権限追加
chmod -w filename      # 書き込み権限削除

# 所有者変更
chown user:group filename
chown -R user:group directory/  # 再帰的に変更

# 権限確認
ls -la filename
stat filename
```

### sudo の使用

```bash
# 管理者権限で実行
sudo command

# root ユーザーに切り替え
sudo su -
sudo -i

# 特定ユーザーとして実行
sudo -u username command
```

## パッケージ管理

### Debian/Ubuntu系（apt）

```bash
# パッケージリスト更新
sudo apt update

# パッケージアップグレード
sudo apt upgrade
sudo apt full-upgrade

# パッケージインストール
sudo apt install package_name

# パッケージ削除
sudo apt remove package_name
sudo apt purge package_name  # 設定ファイルも削除

# パッケージ検索
apt search keyword
apt list --installed  # インストール済みパッケージ
```

### Red Hat系（yum/dnf）

```bash
# パッケージインストール
sudo yum install package_name  # CentOS 7以前
sudo dnf install package_name  # CentOS 8以降、Fedora

# パッケージ更新
sudo yum update
sudo dnf update

# パッケージ削除
sudo yum remove package_name
sudo dnf remove package_name
```

## 環境変数とシェル設定

### 環境変数

```bash
# 環境変数表示
env
printenv
echo $PATH

# 環境変数設定
export VARIABLE_NAME="value"
export PATH="$PATH:/new/path"

# 環境変数を永続化（.bashrc or .zshrc に追記）
echo 'export VARIABLE_NAME="value"' >> ~/.bashrc
source ~/.bashrc  # 設定を反映
```

### シェル設定ファイル

```bash
# 設定ファイル編集
nano ~/.bashrc     # bash設定
nano ~/.zshrc      # zsh設定
nano ~/.profile    # 全シェル共通

# 設定反映
source ~/.bashrc
# または
. ~/.bashrc
```

### デフォルトエディタの設定

システム全体のデフォルトエディタを設定する方法です。

```bash
# update-alternativesでデフォルトエディタを設定（Debian/Ubuntu）
sudo update-alternatives --config editor

# 利用可能なエディタを表示
sudo update-alternatives --display editor

# 新しいエディタを代替候補に追加
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/nano 40
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/vim 30

# 環境変数EDITORでユーザー固有の設定
export EDITOR=nano
export VISUAL=nano

# 永続化（.bashrc または .zshrc に追記）
echo 'export EDITOR=nano' >> ~/.bashrc
echo 'export VISUAL=nano' >> ~/.bashrc
source ~/.bashrc
```

**使用場面:**
- `git commit`、`crontab -e`、`sudo visudo` などでエディタが自動起動される際のデフォルト設定
- システム管理タスクで一貫したエディタ体験を提供

## アーカイブと圧縮

### tar アーカイブ

```bash
# アーカイブ作成
tar -cvf archive.tar directory/
tar -czvf archive.tar.gz directory/  # gzip圧縮付き
tar -cjvf archive.tar.bz2 directory/ # bzip2圧縮付き

# アーカイブ展開
tar -xvf archive.tar
tar -xzvf archive.tar.gz
tar -xjvf archive.tar.bz2

# アーカイブ内容確認
tar -tvf archive.tar
```

### その他の圧縮形式

```bash
# zip
zip -r archive.zip directory/
unzip archive.zip

# gzip
gzip filename.txt    # filename.txt.gz を作成
gunzip filename.gz   # 展開
```

## 便利なコマンド

### 履歴とエイリアス

```bash
# コマンド履歴
history
!!              # 直前のコマンドを再実行
!n              # 履歴のn番目のコマンドを実行
!string         # stringで始まる最新のコマンドを実行

# エイリアス設定
alias ll='ls -la'
alias grep='grep --color=auto'

# エイリアス確認
alias
```

### ショートカットキー

```bash
# 基本的なショートカット
Ctrl+C    # プロセス中断
Ctrl+Z    # プロセス一時停止
Ctrl+D    # EOF（ファイル終端）、ログアウト
Ctrl+L    # 画面クリア
Ctrl+A    # 行の先頭に移動
Ctrl+E    # 行の末尾に移動
Ctrl+U    # カーソルから行頭まで削除
Ctrl+K    # カーソルから行末まで削除
```

## トラブルシューティング

### よくある問題

```bash
# ディスク容量不足の確認
df -h
du -sh /* | sort -hr  # サイズ順でディレクトリ表示

# メモリ使用量確認
free -h
ps aux --sort=-%mem | head  # メモリ使用量順

# プロセスが応答しない場合
ps aux | grep プロセス名
kill -9 PID

# ファイルが見つからない場合
find / -name "filename" 2>/dev/null
locate filename  # updatedbが実行されている場合

# 権限エラーの場合
ls -la filename
chmod 644 filename  # ファイル用
chmod 755 directory # ディレクトリ用
```

## セキュリティ

### 基本的なセキュリティ対策

```bash
# ファイルの隠蔽
chmod 600 sensitive_file    # 所有者のみ読み書き可能
chmod 700 private_directory # 所有者のみアクセス可能

# パスワード管理
passwd              # パスワード変更
sudo passwd username # 他ユーザーのパスワード変更

# ログイン履歴確認
last
lastlog
who
w
```

### セットアップ段階のセキュリティ対策

サーバーのセットアップ時に実施すべき基本的なセキュリティ設定です。

#### SSH設定の強化

```bash
# SSH設定ファイルの編集
sudo nano /etc/ssh/sshd_config

# 推奨設定項目:
# Port 22022                        # デフォルトポート変更
# PermitRootLogin no                # rootログイン禁止
# PasswordAuthentication no         # パスワード認証無効化
# PubkeyAuthentication yes          # 公開鍵認証有効化
# MaxAuthTries 3                    # 認証試行回数制限
# ClientAliveInterval 300           # 接続維持間隔
# ClientAliveCountMax 2             # 無応答時の最大回数

# SSH設定反映
sudo systemctl restart sshd
sudo systemctl reload sshd
```

#### ファイアウォール設定

```bash
# ufw（Ubuntu/Debian）の設定
sudo ufw enable
sudo ufw default deny incoming     # 入力拒否がデフォルト
sudo ufw default allow outgoing    # 出力許可がデフォルト
sudo ufw allow 22022/tcp          # SSH（カスタムポート）
sudo ufw allow 80/tcp             # HTTP
sudo ufw allow 443/tcp            # HTTPS

# iptables（基本的な設定）
sudo iptables -P INPUT DROP       # デフォルト拒否
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT              # ローカルループバック許可
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22022 -j ACCEPT  # SSH

# 設定の保存
sudo iptables-save > /etc/iptables/rules.v4
```

#### ユーザー管理とアクセス制御

```bash
# 管理用ユーザーの作成
sudo adduser admin_user
sudo usermod -aG sudo admin_user   # sudo権限付与

# ユーザーのパスワードポリシー設定
sudo nano /etc/login.defs
# PASS_MAX_DAYS 90     # パスワード有効期限
# PASS_MIN_DAYS 1      # パスワード変更間隔
# PASS_WARN_AGE 7      # 期限切れ警告日数

# SSH公開鍵の設定
mkdir ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys  # 公開鍵を追加
chmod 600 ~/.ssh/authorized_keys

# 不要なユーザーアカウントの無効化
sudo usermod -L username     # アカウントロック
sudo usermod -s /bin/false username  # シェル無効化
```

#### システム更新とパッケージ管理

```bash
# システム全体の更新
sudo apt update && sudo apt upgrade -y    # Debian/Ubuntu
sudo yum update -y                        # CentOS/RHEL

# 自動セキュリティ更新の設定（Ubuntu/Debian）
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# 不要なサービスの停止
systemctl list-unit-files --type=service  # サービス一覧確認
sudo systemctl disable service_name       # 不要サービス無効化
sudo systemctl stop service_name          # サービス停止
```

#### ログ設定とファイルシステム保護

```bash
# ログ保存期間の設定
sudo nano /etc/logrotate.conf
# 以下の設定を追加/変更:
# weekly                    # 週単位でローテーション
# rotate 52                 # 52週間（1年）保持
# compress                  # 古いログを圧縮
# delaycompress            # 1回遅らせて圧縮
# missingok                # ファイルがなくてもエラーにしない
# notifempty               # 空ファイルはローテーションしない

sudo nano /etc/rsyslog.conf
# 以下の設定を追加:
# *.info;mail.none;authpriv.none;cron.none                /var/log/messages
# authpriv.*                                              /var/log/secure
# mail.*                                                  -/var/log/maillog
# cron.*                                                  /var/log/cron
# *.emerg                                                 :omusrmsg:*

# 重要ディレクトリの権限設定
sudo chmod 700 /root
sudo chmod 755 /home
sudo chmod 1777 /tmp               # スティッキービット設定

# ファイルシステムの整合性チェック設定
sudo nano /etc/aide/aide.conf      # AIDE設定
# 以下の設定を追加/変更:
# database=file:/var/lib/aide/aide.db
# database_out=file:/var/lib/aide/aide.db.new
# gzip_dbout=yes
# verbose=5
# report_url=file:/var/log/aide/aide.log
# 
# # 監視するディレクトリとルール
# /bin f+p+u+g+s+m+c+md5+sha1
# /sbin f+p+u+g+s+m+c+md5+sha1
# /usr/bin f+p+u+g+s+m+c+md5+sha1
# /usr/sbin f+p+u+g+s+m+c+md5+sha1
# /etc f+p+u+g+s+m+c+md5+sha1
# /root f+p+u+g+s+m+c+md5+sha1
sudo aide --init                   # 初期データベース作成
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
```

### 運用中の定期チェック

サーバー運用中に定期的に実施すべきセキュリティチェック項目です。

#### 日次チェック項目

```bash
# ログイン履歴の確認
last -n 20                        # 最近のログイン
lastlog                           # 全ユーザーの最終ログイン
who -u                            # 現在のログインユーザー

# 異常なプロセスの確認
ps aux --sort=-%cpu | head -10    # CPU使用率上位
ps aux --sort=-%mem | head -10    # メモリ使用率上位
netstat -tulpn | grep LISTEN      # リスニングポート確認

# システムリソースの監視
df -h                             # ディスク使用量
free -h                           # メモリ使用量
uptime                            # システム負荷
```

#### 週次チェック項目

```bash
# システムログの確認
sudo journalctl --since "7 days ago" --priority=err  # エラーログ
sudo grep -i "failed\|error\|warning" /var/log/syslog | tail -50

# セキュリティ更新の確認
sudo apt list --upgradable | grep -i security  # Debian/Ubuntu
sudo yum check-update --security                # CentOS/RHEL

# ユーザーアカウントの監査
sudo awk -F: '($3 >= 1000) {print $1}' /etc/passwd  # 一般ユーザー一覧
sudo passwd -S --all              # パスワード状態確認
sudo find /home -name ".ssh" -type d             # SSH設定確認

# ファイル権限の確認
sudo find / -perm -4000 2>/dev/null              # SUID設定ファイル
sudo find / -perm -2000 2>/dev/null              # SGID設定ファイル
sudo find / -type f -perm -002 2>/dev/null       # 書き込み可能ファイル
```

#### 月次チェック項目

```bash
# システム全体のセキュリティ監査
sudo lynis audit system           # Lynis使用（要インストール）
sudo chkrootkit                   # ルートキット検査（要インストール）

# ログローテーションの確認
sudo logrotate -d /etc/logrotate.conf  # 設定テスト
sudo ls -la /var/log/*.gz              # 圧縮済みログ確認

# バックアップの整合性確認
sudo aide --check                 # ファイル整合性チェック
# バックアップデータの復元テスト

# ネットワークセキュリティチェック
sudo ss -tulpn                    # ネットワーク接続確認
sudo netstat -i                   # ネットワークインターフェース統計
nmap -sS localhost                # ローカルポートスキャン（要インストール）
```

#### セキュリティインシデント対応

```bash
# 緊急時のアクセス遮断
sudo ufw deny from IP_ADDRESS     # 特定IPアドレスのブロック
sudo iptables -A INPUT -s IP_ADDRESS -j DROP

# 侵害の疑いがある場合の初期対応
sudo netstat -an | grep ESTABLISHED  # 外部接続確認
sudo lsof -i                         # ネットワーク接続プロセス
sudo ps auxf                         # プロセスツリー表示
sudo find /tmp -type f -mtime -1     # 最近作成されたファイル

# ログの保全
sudo cp -r /var/log /backup/incident_logs_$(date +%Y%m%d_%H%M%S)
sudo journalctl --output=json > /backup/journal_$(date +%Y%m%d_%H%M%S).json
```

#### 自動化スクリプト例

```bash
# セキュリティチェック自動化スクリプト
#!/bin/bash
# /usr/local/bin/security_check.sh

echo "=== 日次セキュリティチェック $(date) ==="

# 失敗ログイン試行の確認
echo "--- 失敗ログイン試行 ---"
sudo grep "Failed password" /var/log/auth.log | tail -10

# ディスク使用量警告
echo "--- ディスク使用量 ---"
df -h | awk '$5 > 80 {print "WARNING: " $0}'

# メモリ使用量確認
echo "--- メモリ使用量 ---"
free -h

# 異常なプロセス確認
echo "--- CPU使用率上位プロセス ---"
ps aux --sort=-%cpu | head -5

# 結果をメール送信（設定済みの場合）
# echo "セキュリティチェック完了" | mail -s "Security Check $(date)" admin@example.com

# crontabに追加して自動実行
# 0 9 * * * /usr/local/bin/security_check.sh >> /var/log/security_check.log 2>&1
```

このリファレンスは、Linuxコマンドラインの基本的な操作から応用まで幅広くカバーしています。各コマンドの詳細なオプションについては、`man コマンド名` でマニュアルページを参照してください。