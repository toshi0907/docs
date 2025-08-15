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

```bash
# システムログ
journalctl              # systemd ジャーナル
journalctl -f           # リアルタイム監視
journalctl -u service   # 特定サービスのログ

# 従来のログファイル
tail -f /var/log/syslog
tail -f /var/log/messages
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

このリファレンスは、Linuxコマンドラインの基本的な操作から応用まで幅広くカバーしています。各コマンドの詳細なオプションについては、`man コマンド名` でマニュアルページを参照してください。