---
title: "Git: 初期設定"
description: "Git リファレンスのうち、初期設定についてまとめたページです。"
sidebar:
  label: "初期設定"
  order: 1
---

## Gitの設定ファイル（gitconfig）

Gitの設定は階層構造になっており、より具体的な設定が優先されます。

### 設定ファイルの場所と優先順位

```bash
# 1. システム全体の設定（最も低い優先度）

/etc/gitconfig

# 2. ユーザー全体の設定（グローバル設定）

~/.gitconfig または ~/.config/git/config

# 3. 特定のリポジトリの設定（最も高い優先度）

<リポジトリ>/.git/config

```

### 設定の確認と編集

```bash
# 全ての設定を表示（どの設定ファイルから読み込まれているかも表示）

git config --list --show-origin

# 特定のスコープの設定を表示

git config --system --list    # システム設定
git config --global --list    # グローバル設定
git config --local --list     # ローカル設定

# 設定ファイルを直接編集

git config --global --edit    # グローバル設定ファイルを編集
git config --edit             # ローカル設定ファイルを編集

```

## ユーザー情報の設定

```bash
# グローバル設定（全てのリポジトリで使用）

git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# 特定のリポジトリのみの設定

git config user.name "あなたの名前"
git config user.email "your.email@example.com"

# GPG署名用のキーを設定

git config --global user.signingkey "YOUR_GPG_KEY_ID"
git config --global commit.gpgsign true

```

## エディタとツールの設定

```bash
# デフォルトエディタを設定

git config --global core.editor "vim"
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "subl -n -w"   # Sublime Text

# マージツールを設定

git config --global merge.tool vimdiff
git config --global merge.tool "code --wait"

# 差分表示ツールを設定

git config --global diff.tool vimdiff

# シーケンスエディタを設定（rebase -i で使用）

git config --global sequence.editor "vim"
git config --global sequence.editor "code --wait"  # VS Code

# 環境変数でも設定可能

export GIT_SEQUENCE_EDITOR="vim"
export GIT_SEQUENCE_EDITOR="code --wait"
# GIT_SEQUENCE_EDITOR: インタラクティブリベース時にコミット順序や

# 操作を編集するためのエディタを指定する環境変数
# 設定されていない場合は core.editor または EDITOR の値を使用

```

## 核となる設定

```bash
# 改行文字の自動変換設定（Windows）

git config --global core.autocrlf true

# 改行文字の自動変換設定（Mac/Linux）

git config --global core.autocrlf input

# ファイルモードの変更を無視

git config --global core.filemode false

# 大文字小文字を区別しない設定

git config --global core.ignorecase true

# デフォルトブランチ名を設定

git config --global init.defaultBranch main

# プッシュの際のデフォルト動作を設定

git config --global push.default simple

# push.defaultの設定値の詳細説明:

# - nothing: 明示的に指定しない限りプッシュしない（最も安全）
# - current: 現在のブランチと同名のリモートブランチにプッシュ

# - upstream: 設定された上流ブランチにプッシュ（追跡ブランチが必要）
# - simple: 現在のブランチと同名の上流ブランチにプッシュ（デフォルト、推奨）

# - matching: ローカルとリモートで同名の全ブランチをプッシュ（Git 2.0以前のデフォルト）

# プルの際のデフォルト動作を設定（rebaseを使用）

git config --global pull.rebase true

```

## ブランチとマージの詳細設定

```bash
# ブランチの自動追跡設定
git config --global branch.autosetupmerge always  # 新しいブランチで自動的に上流ブランチを設定
git config --global branch.autosetuprebase always # 新しいブランチでプル時に自動的にrebaseを使用

# ブランチの表示順序
git config --global branch.sort "-committerdate"  # コミット日時の降順でブランチを表示
# その他のオプション: "refname"（名前順）, "version:refname"（バージョン順）

# マージ時の競合表示スタイル
git config --global merge.conflictStyle diff3     # 競合時に3way diff形式で表示
# diff3: オリジナル、自分の変更、相手の変更を全て表示
# merge: 自分の変更と相手の変更のみ表示（デフォルト）
# zdiff3: diff3の改良版（Git 2.35+）

# マージ時のfast-forward設定
git config --global merge.ff only                 # fast-forwardのみ許可
# true: fast-forwardを優先（デフォルト）
# false: 必ずマージコミットを作成
# only: fast-forward可能な場合のみマージを許可

# マージ時のコミット署名検証
git config --global merge.verifySignatures true   # マージ時にGPG署名を検証

# マージツールの終了コード処理
git config --global mergetool.keepBackup false    # マージ後に.origファイルを保持しない
git config --global mergetool.prompt false        # マージツール起動時の確認を省略

```

## リベースの詳細設定

```bash
# インタラクティブリベース時の自動squash
git config --global rebase.autoSquash true        # fixup!/squash!コミットを自動的に整理

# リベース時の自動stash
git config --global rebase.autoStash true         # リベース前に自動的にstash、後で復元

# リベース時の指示フォーマット
git config --global rebase.instructionFormat "%s [%an]"  # 作業者名を含める

# リベース時の短縮SHA表示桁数
git config --global rebase.abbreviateCommands true # pick → p のように短縮形を使用

# リベース後のフック実行
git config --global rebase.updateRefs true        # リベース後に参照を更新

```

## フェッチとプルの詳細設定

```bash
# フェッチ時の枝刈り設定
git config --global fetch.prune true              # フェッチ時に削除されたリモートブランチをローカルからも削除
git config --global fetch.pruneTags true          # フェッチ時に削除されたリモートタグもローカルから削除

# サブモジュールの再帰的フェッチ
git config --global fetch.recurseSubmodules true  # フェッチ時にサブモジュールも同時に更新

# プル時のfast-forward設定
git config --global pull.ff only                  # fast-forwardのみ許可
# true: fast-forwardを優先
# false: 必ずマージコミットを作成
# only: fast-forward可能な場合のみプルを許可

# プル時のタグの取得
git config --global pull.twohead ort              # プル時のマージ戦略

```

## リモートとプッシュの詳細設定

```bash
# デフォルトのリモート設定
git config --global remote.pushDefault origin     # プッシュ先のデフォルトリモート

# プッシュ時のリモート追跡
git config --global push.autoSetupRemote true     # 初回プッシュ時に自動的にリモート追跡を設定

# プッシュ時のGPG署名
git config --global push.gpgSign if-asked         # 要求された場合のみGPG署名
# true: 常にGPG署名
# false: GPG署名しない
# if-asked: サーバーが要求した場合のみ署名

# プッシュ時のフック実行
git config --global push.recurseSubmodules check  # サブモジュールの変更をチェック
# check: サブモジュールの未プッシュ変更をチェック
# on-demand: 必要に応じてサブモジュールもプッシュ
# no: サブモジュールを無視（デフォルト）

```

## 差分表示の詳細設定

```bash
# 差分アルゴリズム
git config --global diff.algorithm patience       # より読みやすい差分を生成
# myers: デフォルトアルゴリズム
# minimal: 最小限の差分
# patience: 大きな変更に対してより読みやすい差分
# histogram: patienceの改良版

# 移動された行の検出
git config --global diff.colorMoved zebra         # 移動された行を色分け表示
# no: 移動検出なし（デフォルト）
# default: 基本的な移動検出
# plain: シンプルな移動検出
# blocks: ブロック単位の移動検出
# zebra: ブロック単位でストライプ表示
# dimmed-zebra: 薄いストライプ表示

# 差分の圧縮ヒューリスティック
git config --global diff.compactionHeuristic true # より読みやすい差分境界を選択

# 空白の変更を無視
git config --global diff.ignoreSpaceChange true   # 空白の変更を無視
git config --global diff.ignoreSpaceAtEol true    # 行末の空白変更を無視

# バイナリファイルの差分
git config --global diff.tool vimdiff             # バイナリファイル用の差分ツール

# 差分のコンテキスト行数
git config --global diff.context 5                # 差分表示時のコンテキスト行数（デフォルト: 3）

```

## ログ表示の詳細設定

```bash
# ログの日付フォーマット
git config --global log.date iso                  # ISO 8601形式で日付表示
# relative: 相対時間（2 days ago）
# local: ローカル時間
# iso: ISO 8601形式
# iso-strict: 厳密なISO 8601形式
# rfc: RFC 2822形式
# short: YYYY-MM-DD形式
# raw: Unix時間

# ログの装飾
git config --global log.decorate short            # ブランチ/タグ名を短縮形で表示
# full: フルパス表示
# short: 短縮形表示
# no: 装飾なし

# ファイル名変更の追跡
git config --global log.follow true               # ファイル名変更を追跡してログ表示

# グラフ表示の設定
git config --global log.graphColors "red,green,yellow,blue,magenta,cyan"  # グラフの色設定

```

## ステータス表示の詳細設定

```bash
# ステータス表示形式
git config --global status.branch true            # ブランチ情報を表示
git config --global status.short false            # 短縮形式を使用しない

# 未追跡ファイルの表示
git config --global status.showUntrackedFiles normal  # 未追跡ファイルの表示レベル
# no: 未追跡ファイルを表示しない
# normal: 未追跡ファイルとディレクトリを表示
# all: 未追跡ディレクトリ内の個別ファイルも表示

# サブモジュールの概要表示
git config --global status.submoduleSummary true  # サブモジュールの変更概要を表示

# 相対パス表示
git config --global status.relativePaths true     # 相対パスでファイルを表示

```

## タグの詳細設定

```bash
# タグの並び順
git config --global tag.sort "-version:refname"   # バージョン番号の降順でタグを表示
# refname: タグ名順
# version:refname: バージョン番号順
# creatordate: 作成日時順
# taggerdate: タガー日時順

# 注釈付きタグの強制署名
git config --global tag.forceSignAnnotated true   # 注釈付きタグを常にGPG署名

# タグのGPG署名
git config --global tag.gpgSign true              # タグ作成時に自動的にGPG署名

```

## エイリアス（ショートカット）の設定

```bash
# よく使うコマンドのエイリアスを設定

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# より高度なエイリアス

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.adog "log --all --decorate --oneline --graph"
git config --global alias.plog "log --graph --pretty='format:%C(red)%d%C(reset) %C(yellow)%h%C(reset) %ar %C(green)%aN%C(reset) %s'"

# エイリアスの確認

git config --get-regexp alias

```

## セキュリティとパフォーマンスの詳細設定

```bash
# HTTP/HTTPSの設定
git config --global http.sslVerify true           # SSL証明書の検証を有効
git config --global http.sslBackend openssl       # SSL/TLSライブラリを指定
git config --global http.timeout 30               # HTTP接続のタイムアウト（秒）
git config --global http.lowSpeedLimit 1000       # 低速度接続の判定値（バイト/秒）
git config --global http.lowSpeedTime 10          # 低速度接続のタイムアウト（秒）

# プロキシ設定
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080
# プロキシ認証が必要な場合
# git config --global http.proxy http://username:password@proxy.example.com:8080

# 転送時のオブジェクト検証
git config --global transfer.fsckObjects true     # 転送時にオブジェクトの整合性をチェック
git config --global receive.fsckObjects true      # 受信時にオブジェクトの整合性をチェック
git config --global fetch.fsckObjects true        # フェッチ時にオブジェクトの整合性をチェック

# パック関連の設定
git config --global pack.threads 4                # パック処理で使用するスレッド数
git config --global pack.windowMemory 512m        # パック時のメモリウィンドウサイズ
git config --global pack.packSizeLimit 2g         # パックファイルの最大サイズ

# インデックス関連の設定
git config --global core.preloadindex true        # インデックスの並列読み込み
git config --global index.threads 4               # インデックス処理のスレッド数

# ファイルシステム関連
git config --global core.protectNTFS true         # NTFSファイルシステムの保護（Windows）
git config --global core.protectHFS true          # HFSファイルシステムの保護（macOS）

```

## 空白文字とテキスト処理の設定

```bash
# 空白文字の検出設定
git config --global core.whitespace "blank-at-eol,blank-at-eof,space-before-tab,tab-in-indent"
# blank-at-eol: 行末の空白を検出
# blank-at-eof: ファイル末尾の空行を検出
# space-before-tab: タブの前の空白を検出
# tab-in-indent: インデントでのタブ使用を検出
# trailing-space: 末尾の空白（blank-at-eol + blank-at-eof）
# cr-at-eol: 行末のCRを検出

# 空白エラーの修正設定
git config --global apply.whitespace fix          # パッチ適用時に空白エラーを修正
# nowarn: 警告を表示しない
# warn: 警告を表示（デフォルト）
# fix: 自動修正
# error: エラーとして扱う
# error-all: 全ての空白エラーをエラーとして扱う

# テキストファイルの検出
git config --global core.autocrlf input           # 改行コードの自動変換
git config --global core.eol lf                   # 標準的な改行コード（LF）
git config --global core.safecrlf warn            # 不可逆的な改行変換時に警告

# ファイルエンコーディング
git config --global gui.encoding utf-8            # GUI使用時のエンコーディング

```

## エンコーディング設定

```bash
# 国際化とエンコーディングの設定
git config --global i18n.commitEncoding utf-8     # コミットメッセージのエンコーディング
git config --global i18n.logOutputEncoding utf-8  # ログ出力時のエンコーディング

# ファイルパスの表示設定
git config --global core.quotePath false          # 日本語ファイル名を正しく表示
# true: 日本語文字をエスケープして表示（デフォルト）
# false: 日本語文字をそのまま表示

# Unicode正規化設定（macOS）
git config --global core.precomposeUnicode true   # macOSでのUnicode正規化を有効
# macOSのファイルシステム（HFS+/APFS）でのUnicode合成文字の問題を解決

# エンコーディング検出と変換
git config --global gui.encoding utf-8            # GUI使用時のエンコーディング
git config --global svn.pathnameencoding utf-8    # Git-SVN使用時のパス名エンコーディング

# gitk（Git GUI）の設定
git config --global guitool.gitk.encoding utf-8   # gitkのエンコーディング設定

# エディタのエンコーディング設定
git config --global core.editor "vim -c 'set encoding=utf-8'"  # Vimの場合
git config --global core.editor "code --wait"     # VS Codeの場合（UTF-8がデフォルト）
git config --global core.editor "subl -n -w"      # Sublime Textの場合

# ページャーのエンコーディング設定
git config --global core.pager "less -R"          # lessでのカラー表示を有効
# LESSCHARSET環境変数も設定可能: export LESSCHARSET=utf-8

# Git attributes でのエンコーディング指定
echo "*.txt text eol=lf encoding=utf-8" >> .gitattributes
echo "*.md text eol=lf encoding=utf-8" >> .gitattributes
echo "*.py text eol=lf encoding=utf-8" >> .gitattributes

# ログメッセージのエンコーディング変換
git config --global log.mailmap true              # mailmapを使用してエンコーディング変換

# 日本語の表示確認
git config --global alias.log-ja "log --pretty=format:'%h - %s (%an, %ar)'"
# 日本語文字が正しく表示されるかテスト

# ファイル内容のエンコーディング設定
git config --global diff.textconv "iconv -f shift_jis -t utf-8"  # Shift_JISファイルをUTF-8で表示

# 特定のファイルタイプのエンコーディング設定
git config --global diff.sjis.textconv "iconv -f shift_jis -t utf-8"
# 使用例: .gitattributes で "*.txt diff=sjis"

# エンコーディング関連の環境変数
# ~/.bashrc または ~/.zshrc に追加
# export LANG=ja_JP.UTF-8
# export LC_ALL=ja_JP.UTF-8
# export LESSCHARSET=utf-8

# Windows環境でのエンコーディング設定
git config --global core.autocrlf true            # WindowsでCRLF変換を有効
git config --global gui.encoding utf-8            # Windows GUI でのエンコーディング
# Windows の場合、システムロケールも確認: chcp 65001 (UTF-8)

# エンコーディングの確認コマンド
# ファイルのエンコーディングを確認
# file -bi filename.txt
# nkf -g filename.txt (日本語環境の場合)

# Git設定の確認
git config --get i18n.commitEncoding              # コミットエンコーディングの確認
git config --get i18n.logOutputEncoding           # ログ出力エンコーディングの確認
git config --get core.quotePath                   # パス表示設定の確認

```

## URL書き換えとリダイレクト設定

```bash
# HTTPSからSSHへの自動変換
git config --global url."git@github.com:".insteadOf "https://github.com/"
git config --global url."git@gitlab.com:".insteadOf "https://gitlab.com/"

# 特定の組織用のURL書き換え
git config --global url."git@github-work:company/".insteadOf "https://github.com/company/"

# プッシュ時のURL書き換え（フェッチとプッシュで異なるURLを使用）
git config --global url."git@github.com:".pushInsteadOf "https://github.com/"

# 内部リポジトリへのリダイレクト
git config --global url."https://internal-git.company.com/".insteadOf "https://github.com/company/"

```

## メンテナンスとガベージコレクション設定

```bash
# 自動ガベージコレクション
git config --global gc.auto 6700                  # オブジェクト数がこの値を超えると自動GC
git config --global gc.autopacklimit 50           # パックファイル数がこの値を超えると自動GC
git config --global gc.autoDetach true            # GCをバックグラウンドで実行

# ガベージコレクションの動作
git config --global gc.pruneExpire "2.weeks.ago"  # この期間より古い未参照オブジェクトを削除
git config --global gc.worktreePruneExpire "3.months.ago"  # 作業ツリーの削除期間
git config --global gc.reflogExpire "90.days"     # reflogの保持期間
git config --global gc.reflogExpireUnreachable "30.days"  # 到達不可能reflogの保持期間

# リパック設定
git config --global repack.useDeltaBaseOffset true  # デルタベースオフセットを使用
git config --global pack.useSparse true           # スパースパッキングを使用

```

## フックとテンプレート設定

```bash
# フックの設定
git config --global init.templateDir ~/.git-templates  # 新規リポジトリのテンプレートディレクトリ
git config --global core.hooksPath ~/.git-hooks   # カスタムフックディレクトリ

# コミットテンプレート
git config --global commit.template ~/.gitmessage  # コミットメッセージのテンプレートファイル

# 除外ファイル
git config --global core.excludesFile ~/.gitignore_global  # グローバル.gitignoreファイル

```

## サブモジュール設定

```bash
# サブモジュールの再帰的操作
git config --global submodule.recurse true        # サブモジュールを再帰的に処理

# サブモジュールの更新戦略
git config --global submodule.fetchJobs 4         # サブモジュールフェッチの並列数

# サブモジュールの自動更新
git config --global status.submoduleSummary true  # statusでサブモジュール概要を表示
git config --global diff.submodule log            # サブモジュールの差分をログ形式で表示

```

## その他の有用な設定

```bash
# 大きなファイル処理
git config --global core.bigFileThreshold 512m    # 大きなファイルの閾値

# ファイルモード
git config --global core.filemode true            # ファイルの実行権限を追跡

# シンボリックリンク
git config --global core.symlinks true            # シンボリックリンクを有効

# 大文字小文字の区別
git config --global core.ignoreCase false         # ファイル名の大文字小文字を区別

# ロック機能
git config --global core.filesRefLockTimeout 10000  # ファイル参照ロックのタイムアウト（ミリ秒）

# 進捗表示
git config --global progress.enabled true         # 進捗バーを表示

# 実験的機能
git config --global feature.experimental true     # 実験的機能を有効（Git 2.28+）
git config --global feature.manyFiles true        # 大量ファイル処理の最適化

```

## 設定の表示と管理

```bash
# 現在の設定を包括的に確認
git config --list --show-origin --show-scope      # 設定値、出力元、スコープを表示

# 特定のセクションの設定を確認
git config --get-regexp "core\."                  # coreセクションの設定を確認
git config --get-regexp "branch\."                # branchセクションの設定を確認
git config --get-regexp "merge\."                 # mergeセクションの設定を確認

# 設定の優先度を確認
git config --list --show-origin user.email        # 特定の設定の出力元を確認

# 設定のリセット
git config --global --unset-all user.name         # 特定の設定を全て削除
git config --global --remove-section "alias"      # セクション全体を削除

# システム全体の設定（管理者権限が必要）
sudo git config --system core.autocrlf input      # システム全体の設定

```

## 認証とセキュリティの設定

```bash
# 認証情報の保存方法を設定

git config --global credential.helper store    # 平文で保存（注意）
git config --global credential.helper cache    # 一時的にメモリに保存
git config --global credential.helper osxkeychain  # macOSキーチェーン
git config --global credential.helper manager-core # Windows

# HTTPS認証の設定

git config --global credential.https://github.com.username "your-username"

# SSH接続の設定確認

git config --global url."git@github.com:".insteadOf "https://github.com/"

```

## SSH鍵の設定

GitHubにSSH鍵方式で接続するための手順です。SSH鍵を使用することで、パスワードを毎回入力する必要がなくなり、より安全な認証が可能になります。

### SSH鍵の生成

```bash
# SSH鍵ペアの生成（RSA 4096bit）

ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# または Ed25519鍵の生成（推奨）

ssh-keygen -t ed25519 -C "your.email@example.com"

# 鍵の保存場所を指定（デフォルト: ~/.ssh/id_rsa または ~/.ssh/id_ed25519）

# Enter file in which to save the key (/home/user/.ssh/id_rsa): [Enter]

# パスフレーズの設定（推奨）

# Enter passphrase (empty for no passphrase): [パスフレーズを入力]
# Enter same passphrase again: [パスフレーズを再入力]

```

### SSH鍵の確認

```bash
# 公開鍵の内容を表示

cat ~/.ssh/id_rsa.pub
# または Ed25519の場合

cat ~/.ssh/id_ed25519.pub

# SSH鍵の一覧を確認

ls -la ~/.ssh/

# SSH鍵の権限を確認・設定

chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

```

### GitHubへのSSH鍵の登録

1. **公開鍵をクリップボードにコピー**

```bash
# Linux/WSL

cat ~/.ssh/id_rsa.pub | xclip -selection clipboard
# または

cat ~/.ssh/id_rsa.pub

# macOS

cat ~/.ssh/id_rsa.pub | pbcopy

# Windows (Git Bash)

cat ~/.ssh/id_rsa.pub | clip

```

2. **GitHubでの設定**
- GitHubにログインして Settings → SSH and GPG keys にアクセス
- "New SSH key" をクリック
- Title に識別しやすい名前を入力（例: "MyComputer-2024"）
- Key の欄にコピーした公開鍵を貼り付け
- "Add SSH key" をクリック

### SSH接続のテスト

```bash
# GitHubへのSSH接続をテスト

ssh -T git@github.com

# 成功した場合の出力例:

# Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.

# 詳細なデバッグ情報付きでテスト

ssh -vT git@github.com

```

### SSH設定ファイルの作成

```bash
# SSH設定ファイルを作成・編集

nano ~/.ssh/config

# 基本的な設定例

cat >> ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes
EOF

# 設定ファイルの権限を設定

chmod 600 ~/.ssh/config

```

### 複数アカウント用のSSH設定

```bash
# 複数のGitHubアカウントを使い分ける場合の設定

cat >> ~/.ssh/config << 'EOF'
# 個人用アカウント

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_personal
    IdentitiesOnly yes

# 仕事用アカウント

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_work
    IdentitiesOnly yes
EOF

# 使用例

# 個人用: git clone git@github.com:username/repo.git
# 仕事用: git clone git@github-work:company/repo.git

```

### SSH Agentの使用

```bash
# SSH Agentを開始

eval "$(ssh-agent -s)"

# SSH鍵をAgentに追加

ssh-add ~/.ssh/id_rsa

# 追加された鍵を確認

ssh-add -l

# SSH Agentから鍵を削除

ssh-add -d ~/.ssh/id_rsa

# 全ての鍵を削除

ssh-add -D

```

### トラブルシューティング

```bash
# 1. Permission denied (publickey) エラーの場合

# SSH鍵の権限を確認
ls -la ~/.ssh/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# 2. SSH鍵が認識されない場合

# SSH Agentに鍵を追加
ssh-add ~/.ssh/id_rsa

# 3. 複数の鍵がある場合の問題

# 明示的に鍵を指定
ssh -i ~/.ssh/id_rsa -T git@github.com

# 4. 接続の詳細情報を確認

ssh -vvv git@github.com

# 5. GitHubの既知のホストを追加

ssh-keyscan -H github.com >> ~/.ssh/known_hosts

```

### 既存リポジトリをSSHに変更

```bash
# 現在のリモートURL確認

git remote -v

# HTTPSからSSHに変更

git remote set-url origin git@github.com:username/repository.git

# 変更を確認

git remote -v

# SSH接続でプッシュテスト

git push origin main

```

## 色の設定

```bash
# 色表示を有効化

git config --global color.ui auto

# 個別の色設定

git config --global color.branch auto
git config --global color.diff auto
git config --global color.status auto

# カスタム色設定

git config --global color.status.changed "yellow normal"
git config --global color.status.untracked "red normal"
git config --global color.diff.meta "blue black bold"

```

## 設定例：包括的な初期設定

```bash
#!/bin/bash

# Git初期設定スクリプトの例

# ユーザー情報

git config --global user.name "Taro Yamada"
git config --global user.email "taro.yamada@example.com"

# エディタとツール

git config --global core.editor "vim"
git config --global merge.tool vimdiff

# 基本設定

git config --global init.defaultBranch main
git config --global push.default simple
git config --global pull.rebase true
git config --global core.autocrlf input

# エイリアス

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --decorate --all"

# 色設定

git config --global color.ui auto

# 認証

git config --global credential.helper cache

echo "Git設定が完了しました"

```

## 設定ファイルの分割と条件付き読み込み

Gitでは`include`と`includeif`を使用して、設定ファイルを分割し、条件に応じて異なる設定を読み込むことができます。

### 基本的なinclude

```bash
# メイン設定ファイル（~/.gitconfig）に他の設定ファイルを含める

git config --global include.path "~/.gitconfig-aliases"
git config --global include.path "~/.gitconfig-work"

# 相対パスも使用可能

git config --global include.path "./config/git-aliases"

```

### 条件付きinclude（includeif）

```bash
# 特定のディレクトリ以下でのみ適用される設定

git config --global includeif."gitdir:~/work/".path "~/.gitconfig-work"
git config --global includeif."gitdir:~/personal/".path "~/.gitconfig-personal"

# 特定のブランチでのみ適用される設定

git config --global includeif."onbranch:main".path "~/.gitconfig-main"
git config --global includeif."onbranch:develop".path "~/.gitconfig-develop"

# リモートURLに基づく条件

git config --global includeif."hasconfig:remote.*.url:https://github.com/company/*".path "~/.gitconfig-company"

```

### 実用的な設定例

**メイン設定ファイル（~/.gitconfig）**

```ini
[user]
    name = "共通の名前"
    email = "default@example.com"

[core]
    editor = vim
    autocrlf = input

# エイリアス設定を分離

[include]
    path = ~/.gitconfig-aliases

# 仕事用設定（~/work/以下のリポジトリで適用）

[includeif "gitdir:~/work/"]
    path = ~/.gitconfig-work

# 個人用設定（~/personal/以下のリポジトリで適用）

[includeif "gitdir:~/personal/"]
    path = ~/.gitconfig-personal

# 特定の組織のリポジトリ用設定

[includeif "hasconfig:remote.*.url:git@github.com:company/*"]
    path = ~/.gitconfig-company

```

**エイリアス専用ファイル（~/.gitconfig-aliases）**

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate --all
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    adog = log --all --decorate --oneline --graph
    plog = log --graph --pretty='format:%C(red)%d%C(reset) %C(yellow)%h%C(reset) %ar %C(green)%aN%C(reset) %s'

```

**仕事用設定ファイル（~/.gitconfig-work）**

```ini
[user]
    name = "山田太郎"
    email = "taro.yamada@company.com"
    signingkey = "WORK_GPG_KEY_ID"

[commit]
    gpgsign = true

[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_work"

[credential "https://github.com"]
    username = "work-username"

[url "git@github-work:company/"]
    insteadOf = "https://github.com/company/"

```

**個人用設定ファイル（~/.gitconfig-personal）**

```ini
[user]
    name = "Taro Yamada"
    email = "taro@personal.com"
    signingkey = "PERSONAL_GPG_KEY_ID"

[commit]
    gpgsign = false

[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_personal"

[credential "https://github.com"]
    username = "personal-username"

```

**会社用設定ファイル（~/.gitconfig-company）**

```ini
[user]
    email = "taro.yamada@company.com"

[commit]
    gpgsign = true

[push]
    default = simple

[pull]
    rebase = true

[branch]
    autosetupmerge = always
    autosetuprebase = always

```

### includeifの条件パターン

```bash
# ディレクトリベースの条件

# 指定したディレクトリ以下のリポジトリで適用
includeif."gitdir:~/work/".path

# パターンマッチング（*を使用可能）

includeif."gitdir:~/projects/*/".path

# 絶対パスを使用

includeif."gitdir:/home/user/work/".path

# ブランチベースの条件

# 特定のブランチで作業中に適用
includeif."onbranch:main".path
includeif."onbranch:feature/*".path

# リモートURLベースの条件

# 特定のリモートURLを持つリポジトリで適用
includeif."hasconfig:remote.*.url:https://github.com/company/*".path
includeif."hasconfig:remote.*.url:git@github.com:personal/*".path

```

### 設定の確認方法

```bash
# 現在適用されている全ての設定を表示（出力元も表示）

git config --list --show-origin

# 特定の設定値がどのファイルから読み込まれているかを確認

git config --show-origin user.email
git config --show-origin user.name

# 条件付き設定が正しく適用されているかテスト

cd ~/work/some-project
git config user.email  # 仕事用のメールアドレスが表示されるはず

cd ~/personal/my-project
git config user.email  # 個人用のメールアドレスが表示されるはず

```

### 設定ファイル管理のベストプラクティス

```bash
# 設定ファイルをGitで管理（dotfiles）

mkdir ~/dotfiles
mv ~/.gitconfig ~/dotfiles/gitconfig
mv ~/.gitconfig-aliases ~/dotfiles/gitconfig-aliases
mv ~/.gitconfig-work ~/dotfiles/gitconfig-work
mv ~/.gitconfig-personal ~/dotfiles/gitconfig-personal

# シンボリックリンクを作成

ln -s ~/dotfiles/gitconfig ~/.gitconfig
ln -s ~/dotfiles/gitconfig-aliases ~/.gitconfig-aliases
ln -s ~/dotfiles/gitconfig-work ~/.gitconfig-work
ln -s ~/dotfiles/gitconfig-personal ~/.gitconfig-personal

# dotfilesリポジトリで管理

cd ~/dotfiles
git init
git add .
git commit -m "Add git configuration files"

```

### トラブルシューティング

```bash
# includeifの条件が正しく動作しているかデバッグ

# 詳細なトレース情報を出力
GIT_TRACE2_CONFIG_PARAMS=1 git config --list

# 設定の読み込み順序を確認

git config --list --show-origin | grep -E "(user\.name|user\.email)"

# 条件付き設定が適用されない場合の確認事項

# 1. パスが正しいかチェック
ls -la ~/.gitconfig-work

# 2. gitdirの条件でディレクトリパスが正しいかチェック

pwd
git rev-parse --git-dir

# 3. includeifの構文が正しいかチェック

git config --global --get-regexp includeif

```

## 設定の確認と管理

```bash
# 特定の設定値を確認

git config user.name
git config user.email

# 設定の削除

git config --global --unset user.name
git config --unset user.email

# セクション全体を削除

git config --global --remove-section alias

# 設定ファイルの場所を確認

git config --list --show-origin | grep user.name

```
