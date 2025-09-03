---
layout: page
title: "Git リファレンス"
---

# Git リファレンス

Gitの基本的な使い方とコマンドのリファレンスです。

* 目次
{:toc}

## 基本概念

### Gitとは

Gitは分散型バージョン管理システムで、ファイルの変更履歴を追跡し、複数の開発者が協力してプロジェクトを管理できるツールです。

### 重要な概念

- **リポジトリ**: プロジェクトのファイルとその履歴を保存する場所
- **コミット**: ファイルの変更を記録するスナップショット
- **ブランチ**: 開発の流れを分岐させる仕組み
- **マージ**: 異なるブランチの変更を統合する操作

## 初期設定

### Gitの設定ファイル（gitconfig）

Gitの設定は階層構造になっており、より具体的な設定が優先されます。

#### 設定ファイルの場所と優先順位

```bash
# 1. システム全体の設定（最も低い優先度）

/etc/gitconfig

# 2. ユーザー全体の設定（グローバル設定）

~/.gitconfig または ~/.config/git/config

# 3. 特定のリポジトリの設定（最も高い優先度）

<リポジトリ>/.git/config

```

#### 設定の確認と編集

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

### ユーザー情報の設定

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

### エディタとツールの設定

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

### 核となる設定

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

### ブランチとマージの詳細設定

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

### リベースの詳細設定

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

### フェッチとプルの詳細設定

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

### リモートとプッシュの詳細設定

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

### 差分表示の詳細設定

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

### ログ表示の詳細設定

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

### ステータス表示の詳細設定

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

### タグの詳細設定

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

### エイリアス（ショートカット）の設定

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

### セキュリティとパフォーマンスの詳細設定

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

### 空白文字とテキスト処理の設定

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

### URL書き換えとリダイレクト設定

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

### メンテナンスとガベージコレクション設定

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

### フックとテンプレート設定

```bash
# フックの設定
git config --global init.templateDir ~/.git-templates  # 新規リポジトリのテンプレートディレクトリ
git config --global core.hooksPath ~/.git-hooks   # カスタムフックディレクトリ

# コミットテンプレート
git config --global commit.template ~/.gitmessage  # コミットメッセージのテンプレートファイル

# 除外ファイル
git config --global core.excludesFile ~/.gitignore_global  # グローバル.gitignoreファイル

```

### サブモジュール設定

```bash
# サブモジュールの再帰的操作
git config --global submodule.recurse true        # サブモジュールを再帰的に処理

# サブモジュールの更新戦略
git config --global submodule.fetchJobs 4         # サブモジュールフェッチの並列数

# サブモジュールの自動更新
git config --global status.submoduleSummary true  # statusでサブモジュール概要を表示
git config --global diff.submodule log            # サブモジュールの差分をログ形式で表示

```

### その他の有用な設定

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

### 設定の表示と管理

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

### 認証とセキュリティの設定

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

### SSH鍵の設定

GitHubにSSH鍵方式で接続するための手順です。SSH鍵を使用することで、パスワードを毎回入力する必要がなくなり、より安全な認証が可能になります。

#### SSH鍵の生成

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

#### SSH鍵の確認

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

#### GitHubへのSSH鍵の登録

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

#### SSH接続のテスト

```bash
# GitHubへのSSH接続をテスト

ssh -T git@github.com

# 成功した場合の出力例:

# Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.

# 詳細なデバッグ情報付きでテスト

ssh -vT git@github.com

```

#### SSH設定ファイルの作成

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

#### 複数アカウント用のSSH設定

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

#### SSH Agentの使用

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

#### トラブルシューティング

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

#### 既存リポジトリをSSHに変更

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

### 色の設定

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

### 設定例：包括的な初期設定

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

### 設定ファイルの分割と条件付き読み込み

Gitでは`include`と`includeif`を使用して、設定ファイルを分割し、条件に応じて異なる設定を読み込むことができます。

#### 基本的なinclude

```bash
# メイン設定ファイル（~/.gitconfig）に他の設定ファイルを含める

git config --global include.path "~/.gitconfig-aliases"
git config --global include.path "~/.gitconfig-work"

# 相対パスも使用可能

git config --global include.path "./config/git-aliases"

```

#### 条件付きinclude（includeif）

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

#### 実用的な設定例

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

#### includeifの条件パターン

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

#### 設定の確認方法

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

#### 設定ファイル管理のベストプラクティス

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

#### トラブルシューティング

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

### 設定の確認と管理

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

## リポジトリの初期化

### 新しいリポジトリの作成

```bash
# 新しいディレクトリを作成してリポジトリを初期化

mkdir my-project
cd my-project
git init

# 既存のディレクトリをリポジトリ化

cd existing-project
git init

```

### 既存のリポジトリのクローン

```bash
# HTTPSでクローン

git clone https://github.com/username/repository.git

# SSHでクローン

git clone git@github.com:username/repository.git

# 別の名前でクローン

git clone https://github.com/username/repository.git my-project

```

## ベアリポジトリ（Bare Repository）

### ベアリポジトリとは

ベアリポジトリは作業ディレクトリを持たないGitリポジトリです。通常のリポジトリとは異なり、チェックアウトされたファイルが存在せず、`.git`ディレクトリの内容のみが保存されています。

### ベアリポジトリの特徴と用途

- **作業ディレクトリがない**: ファイルの編集や直接的な作業ができない
- **中央リポジトリとして最適**: 複数の開発者が共有する中央リポジトリとして使用
- **プッシュを受け入れ可能**: 通常のリポジトリとは異なり、プッシュを安全に受け入れることができる
- **サーバー用途**: Git サーバーやローカルネットワークでの共有リポジトリとして使用

### ローカル環境でのベアリポジトリ作成

#### 新しいベアリポジトリの作成

```bash
# ベアリポジトリを作成

git init --bare my-project.git

# 通常は .git 拡張子を付けて識別しやすくする

git init --bare /path/to/shared/my-project.git

# 共有用ディレクトリでベアリポジトリを作成

mkdir /home/shared/repos
git init --bare /home/shared/repos/my-project.git

```

#### 既存リポジトリからベアリポジトリを作成

```bash
# 既存のリポジトリをベアリポジトリとしてクローン

git clone --bare /path/to/existing/repo my-project.git

# または既存のリポジトリからミラーとしてクローン

git clone --mirror https://github.com/username/repository.git my-project.git

```

### ベアリポジトリを使用した開発フロー

#### 基本的なワークフロー

```bash
# 1. ベアリポジトリを作成（共有場所）

git init --bare /shared/project.git

# 2. 開発者A: 最初のプロジェクトをセットアップ

mkdir project
cd project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "初期コミット"

# 3. ベアリポジトリをリモートとして追加

git remote add origin /shared/project.git

# 4. ベアリポジトリにプッシュ

git push -u origin main

# 5. 開発者B: ベアリポジトリからクローン

git clone /shared/project.git my-project
cd my-project

# 6. 開発者B: 変更を加えてプッシュ

echo "新しい機能" > feature.txt
git add feature.txt
git commit -m "新機能を追加"
git push origin main

# 7. 開発者A: 変更を取得

git pull origin main

```

#### チーム開発での運用例

```bash
# 共有ディレクトリにベアリポジトリを作成

sudo mkdir -p /opt/git/repositories
sudo git init --bare /opt/git/repositories/myproject.git

# 権限設定（チームでアクセス可能にする）

sudo chown -R git:developers /opt/git/repositories/myproject.git
sudo chmod -R g+rws /opt/git/repositories/myproject.git

# 開発者は以下のようにクローン

git clone /opt/git/repositories/myproject.git
# または

git clone file:///opt/git/repositories/myproject.git

```

### ネットワーク越しでのベアリポジトリ運用

#### SSH経由でのアクセス

```bash
# リモートサーバーにベアリポジトリを作成

ssh user@server 'git init --bare /home/git/myproject.git'

# SSH経由でクローン

git clone user@server:/home/git/myproject.git

# SSH設定ファイル（~/.ssh/config）を使用した場合

# Host gitserver
#     HostName server.example.com

#     User git
#     IdentityFile ~/.ssh/id_rsa_git

git clone gitserver:/home/git/myproject.git

```

#### HTTP/HTTPSでのアクセス（サーバー設定が必要）

```bash
# Webサーバー（Apache/Nginx）と組み合わせて使用

git clone https://git.example.com/myproject.git

```

### ベアリポジトリの管理

#### ベアリポジトリの情報確認

```bash
# ベアリポジトリの場所で実行

cd /path/to/bare/repo.git

# ブランチ一覧

git branch

# リモート設定（通常は存在しない）

git remote -v

# ログの確認

git log --oneline --graph --all

# リポジトリの統計情報

git count-objects -v

```

#### ベアリポジトリのメンテナンス

```bash
# ガベージコレクション（不要なオブジェクトを削除）

git gc --aggressive

# リポジトリの整合性チェック

git fsck

# リポジトリサイズの最適化

git repack -ad

# リファクタリング履歴の削除

git reflog expire --expire=now --all
git gc --prune=now --aggressive

```

### ベアリポジトリのフックス活用

ベアリポジトリでは、プッシュ時に自動処理を実行するフックが特に有用です。

#### post-receiveフックの例（自動デプロイ）

```bash
# ベアリポジトリの hooks/post-receive ファイルを作成

cat > /path/to/bare/repo.git/hooks/post-receive << 'EOF'
#!/bin/sh

# プッシュ後に作業ディレクトリを更新

WORK_TREE="/var/www/myapp"
GIT_DIR="/opt/git/myapp.git"

# 作業ディレクトリに最新のファイルを展開

git --git-dir="$GIT_DIR" --work-tree="$WORK_TREE" checkout -f main

echo "デプロイが完了しました: $(date)"
EOF

# 実行権限を付与

chmod +x /path/to/bare/repo.git/hooks/post-receive

```

#### update フックの例（プッシュ制限）

```bash
# ベアリポジトリの hooks/update ファイルを作成

cat > /path/to/bare/repo.git/hooks/update << 'EOF'
#!/bin/sh

# 特定のブランチへの直接プッシュを制限

refname="$1"
oldrev="$2"
newrev="$3"

# mainブランチへの直接プッシュを禁止

if [ "$refname" = "refs/heads/main" ]; then
    echo "エラー: mainブランチへの直接プッシュは禁止されています"
    echo "プルリクエストを使用してください"
    exit 1
fi

exit 0
EOF

chmod +x /path/to/bare/repo.git/hooks/update

```

### 実践的な運用例

#### 個人プロジェクトでの使用

```bash
# ホームディレクトリにベアリポジトリを作成

mkdir ~/git-repos
git init --bare ~/git-repos/myproject.git

# 複数の場所で作業する場合

# 作業場所1
git clone ~/git-repos/myproject.git ~/workspace/myproject-work1
cd ~/workspace/myproject-work1
# 作業...

git push origin main

# 作業場所2

git clone ~/git-repos/myproject.git ~/workspace/myproject-work2
cd ~/workspace/myproject-work2
git pull origin main
# 作業...

git push origin main

```

#### 組織での集中管理

```bash
# 1. 管理者がベアリポジトリを作成

sudo mkdir -p /srv/git
sudo git init --bare /srv/git/company-project.git
sudo chown -R git:git /srv/git/company-project.git

# 2. 開発者のアクセス設定

# /etc/group に developers グループを追加
# git ユーザーを developers グループに追加

sudo usermod -a -G developers git

# 3. 開発者がクローンして使用

git clone git@server:/srv/git/company-project.git
cd company-project
# 開発作業...

git push origin feature-branch

```

### トラブルシューティング

#### よくある問題と解決方法

```bash
# 問題1: ベアリポジトリへのプッシュが拒否される

# 解決: ベアリポジトリかどうか確認
git config --get core.bare
# true が返されればベアリポジトリ

# 問題2: 権限エラー

# 解決: 適切な権限を設定
sudo chown -R git:developers /path/to/bare/repo.git
sudo chmod -R g+rw /path/to/bare/repo.git

# 問題3: ベアリポジトリで作業ディレクトリの操作を実行してしまう

# 解決: ベアリポジトリでは以下は実行できない
# git add, git checkout, git status など

# 問題4: ベアリポジトリの場所がわからない

# 解決: 設定から確認
git remote get-url origin
git config --get remote.origin.url

```

#### ベアリポジトリの変換

```bash
# 通常のリポジトリをベアリポジトリに変換

git config --bool core.bare true
rm -rf .git/hooks
mv .git/* .
rm -rf .git

# ベアリポジトリを通常のリポジトリに変換

git config --bool core.bare false
mkdir .git
mv * .git/
git checkout HEAD -- .

```

## 基本操作

### ファイルの追加とコミット

```bash
# ファイルをステージングエリアに追加

git add filename.txt

# 全てのファイルを追加

git add .

# 変更されたファイルのみ追加

git add -u

# インタラクティブモードでファイルを追加

git add -i

# ステージングエリアの状態を確認

git status

# コミットを作成

git commit -m "コミットメッセージ"

# ステージング と コミットを同時に実行（追跡されているファイルのみ）

git commit -am "コミットメッセージ"

```

### インタラクティブステージング

`git add -i` を使用すると、対話的にファイルをステージングできます。これにより、ファイルの一部分のみをコミットに含めることが可能になります。

```bash
# インタラクティブモードを開始

git add -i

```

#### インタラクティブメニューの項目

`git add -i` を実行すると、以下のメニューが表示されます：

**メニュー項目の説明：**

- **1: status** - 現在のファイル状態を表示（変更済み、ステージ済み、未追跡ファイル）
- **2: update** - 変更されたファイルをステージングエリアに追加
- **3: revert** - ステージングエリアからファイルを除外（unstage）
- **4: add untracked** - 未追跡ファイルをステージングエリアに追加
- **5: patch** - ファイルの一部分のみをステージング（行単位での選択）
- **6: diff** - ステージングエリアの差分を表示
- **7: quit** - インタラクティブモードを終了
- **8: help** - ヘルプを表示

#### パッチモード（部分的なステージング）

特に便利なのがパッチモード（5: patch）です：

```bash
# 直接パッチモードを開始

git add -p

# または git add -i でメニューから 5: patch を選択

```

**パッチモードでの操作：**

- **y** - この変更をステージングに含める
- **n** - この変更をスキップ
- **s** - 変更をより小さな部分に分割
- **e** - 手動で変更を編集
- **q** - パッチモードを終了
- **a** - このファイルの残り全ての変更を含める
- **d** - このファイルの残り全ての変更をスキップ
- **?** - ヘルプを表示

#### 実用的な使用例

```bash
# 例1: 複数のファイルから特定のファイルのみをステージング

git add -i
# メニューで "2: update" を選択

# ファイル番号を入力（例: 1,3,5 または 1-3）

# 例2: ファイルの一部分のみをコミットに含める

git add -p filename.js
# 各変更ブロックに対して y/n で選択

# 例3: 大きな変更を論理的な単位に分けてコミット

# ファイルに複数の機能を追加した場合
git add -p
# 機能Aに関する変更のみを y で選択

git commit -m "機能Aを追加"
# 残りの変更をステージング

git add -p
# 機能Bに関する変更を選択

git commit -m "機能Bを追加"

```

#### インタラクティブステージングのメリット

- **精密なコミット管理**: 関連する変更のみをグループ化
- **レビュー向け**: 論理的な単位でコミット履歴を整理
- **実験的変更の分離**: テスト用コードと実装を分けてコミット
- **段階的な作業**: 大きな変更を小さなコミットに分割

### 履歴の確認

```bash
# コミット履歴を表示

git log

# 簡潔な履歴を表示

git log --oneline

# グラフ表示

git log --graph --oneline --all

# 特定のファイルの履歴

git log filename.txt

```

### 変更の確認

```bash
# 作業ディレクトリの変更を表示

git diff

# ステージングエリアの変更を表示

git diff --cached

# 特定のコミット間の差分

git diff commit1 commit2

```

## ブランチ

### ブランチの作成と切り替え

```bash
# 新しいブランチを作成

git branch feature-branch

# ブランチを作成して切り替え

git checkout -b feature-branch

# または (Git 2.23以降)

git switch -c feature-branch

# 既存のブランチに切り替え

git checkout feature-branch

# または (Git 2.23以降)

git switch feature-branch

```

### ブランチの管理

```bash
# ローカルブランチの一覧（現在のブランチは*で表示）

git branch
# 出力例:

#   feature-branch
# * main

#   develop

# 現在のブランチ名のみを表示

git branch --show-current
# 出力例: main

# または

git rev-parse --abbrev-ref HEAD
# 出力例: main

# リモートブランチも含めて表示

git branch -a
# 出力例:

#   feature-branch
# * main

#   develop
#   remotes/origin/main

#   remotes/origin/develop

# ブランチの削除

git branch -d feature-branch

# 強制削除

git branch -D feature-branch

# ブランチ名の変更

git branch -m old-name new-name

```

## リモートリポジトリ

### リモートの管理

```bash
# リモートリポジトリを追加

git remote add origin https://github.com/username/repository.git

# リモートの一覧を表示

git remote -v

# リモートの詳細情報

git remote show origin

# リモートを削除

git remote remove origin

# リモートブランチの追跡設定を変更

git remote set-branches origin main develop
# 指定したブランチのみを追跡するように設定

# 全てのブランチを追跡するように戻す

git remote set-branches --add origin '*'

```

### プッシュとプル

```bash
# リモートにプッシュ

git push origin main

# 初回プッシュ時（上流ブランチを設定）

git push -u origin main

# 安全な強制プッシュ（リモートが期待される状態の場合のみ実行）

git push --force-with-lease origin main
# リモートブランチが最後にフェッチした時点と同じ状態の場合のみプッシュ

# 他の人が変更をプッシュしていた場合は失敗するため安全

# 特定のコミットと比較して安全プッシュ

git push --force-with-lease=main:abc1234 origin main

# リモートから最新の変更を取得

git pull origin main

# フェッチのみ（マージしない）

git fetch origin

# 全てのリモートブランチをフェッチ

git fetch --all

```

## マージと競合

### ブランチのマージ

```bash
# mainブランチに切り替え

git checkout main

# feature-branchをマージ

git merge feature-branch

# マージコミットを作成しない（Fast-forward）

git merge --ff-only feature-branch

# 必ずマージコミットを作成

git merge --no-ff feature-branch

```

### 競合の解決

```bash
# 競合が発生した場合、ファイルを編集して解決後

git add conflicted-file.txt
git commit -m "競合を解決"

# マージを中止

git merge --abort

# 競合解決のためのツールを使用

git mergetool

```

### リベース

```bash
# 現在のブランチをmainブランチの最新状態にリベース

git rebase main

# インタラクティブリベース（コミットの編集）

git rebase -i HEAD~3

# 空のコミットも保持してリベース

git rebase --keep-empty main
# 通常リベースでは空のコミット（変更のないコミット）は削除されるが、

# このオプションで空のコミットも保持する

# リベースを中止

git rebase --abort

# リベースを続行

git rebase --continue

```

## 便利なコマンド

### 作業の一時保存

```bash
# 現在の作業を一時保存

git stash

# メッセージ付きで保存

git stash save "作業中の機能"

# 保存した作業の一覧

git stash list

# 最新の作業を復元

git stash pop

# 特定の作業を復元

git stash apply stash@{1}

# 保存した作業を削除

git stash drop stash@{1}

```

### ファイルの操作

```bash
# ファイルを削除してステージング

git rm filename.txt

# ファイルを移動/リネーム

git mv oldname.txt newname.txt

# ファイルの変更を取り消し

git checkout -- filename.txt

# または (Git 2.23以降)

git restore filename.txt

# ステージングを取り消し

git reset HEAD filename.txt

# または (Git 2.23以降)

git restore --staged filename.txt

```

### ブランチとコミットの分析

```bash
# 二つのブランチの共通の祖先コミットを見つける

git merge-base main feature-branch
# 出力例: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0

# 複数ブランチの共通祖先を見つける

git merge-base --octopus main feature1 feature2

# 二つのブランチの関係を確認

git merge-base --is-ancestor main feature-branch && echo "mainはfeature-branchの祖先" || echo "mainはfeature-branchの祖先ではない"

# コミットの一覧を表示（リビジョン履歴）

git rev-list HEAD
# 最新から古い順にコミットハッシュを表示

# 特定の範囲のコミット一覧

git rev-list main..feature-branch
# feature-branchにあってmainにないコミット一覧

# コミット数を取得

git rev-list --count HEAD
# 現在のブランチのコミット総数

git rev-list --count main..feature-branch
# feature-branchにあってmainにないコミット数

# 最新のN個のコミット

git rev-list -n 5 HEAD
# 最新5個のコミットハッシュ

# 日付範囲でコミットを取得

git rev-list --since="2023-01-01" --until="2023-12-31" HEAD

# ファイルに関連するコミットのみ取得

git rev-list HEAD -- filename.txt

# マージコミットを除外

git rev-list --no-merges HEAD

```

### タグ

```bash
# 軽量タグを作成

git tag v1.0.0

# 注釈付きタグを作成

git tag -a v1.0.0 -m "バージョン1.0.0リリース"

# タグの一覧

git tag

# タグをリモートにプッシュ

git push origin v1.0.0

# 全てのタグをプッシュ

git push origin --tags

# タグを削除

git tag -d v1.0.0

```

### git-new-workdir

`git-new-workdir`は、同一リポジトリの複数の作業ディレクトリを作成するGitのユーティリティスクリプトです。同じリポジトリで複数のブランチを同時に作業したい場合に非常に便利です。

#### git-new-workdirとは

通常、一つのリポジトリでは一度に一つのブランチしかチェックアウトできませんが、`git-new-workdir`を使用することで、同じリポジトリのデータを共有しながら複数の作業ディレクトリを持つことができます。

#### インストールと設定

```bash
# Git本体のcontribスクリプトから取得（Ubuntu/Debian）
sudo apt-get install git-core

# 手動でスクリプトを取得
curl -o /usr/local/bin/git-new-workdir \
  https://raw.githubusercontent.com/git/git/master/contrib/workdir/git-new-workdir
chmod +x /usr/local/bin/git-new-workdir

# macOSの場合（Homebrewでのインストール後）
# /usr/local/share/git-core/contrib/workdir/git-new-workdir が利用可能
```

#### 基本的な使用方法

```bash
# 基本構文
git-new-workdir <リポジトリパス> <新しい作業ディレクトリ> [ブランチ名]

# 例：現在のリポジトリから新しい作業ディレクトリを作成
git-new-workdir . ../my-project-feature feature-branch

# 異なるリポジトリから作業ディレクトリを作成
git-new-workdir /path/to/main/repo /path/to/new/workdir develop

# ブランチを指定せずに作成（HEADブランチを使用）
git-new-workdir . ../my-project-hotfix
```

#### 実用的な使用例

```bash
# メインプロジェクトディレクトリ
cd ~/projects/my-app

# 機能開発用の作業ディレクトリを作成
git-new-workdir . ../my-app-feature feature/new-ui

# バグ修正用の作業ディレクトリを作成
git-new-workdir . ../my-app-hotfix hotfix/critical-bug

# レビュー用の作業ディレクトリを作成
git-new-workdir . ../my-app-review review-branch

# 作業ディレクトリを切り替えて同時作業
cd ../my-app-feature
# 機能開発作業...

cd ../my-app-hotfix
# バグ修正作業...

cd ../my-app
# メインブランチでの作業...
```

#### Windows環境での考慮事項

Windows環境では、シンボリックリンクの制限により、`git-new-workdir`の動作に注意が必要です。

**シンボリックリンクが使用できない場合の問題：**

```bash
# Windows（管理者権限なし）では、以下のようなエラーが発生する可能性があります
git-new-workdir . ../new-workdir
# エラー: シンボリックリンクの作成に失敗しました
```

**Windows環境での対処法：**

1. **管理者権限でコマンドプロンプトを実行**
```cmd
# 管理者として実行し、開発者モードを有効にする
# Windows 10/11では設定 > 更新とセキュリティ > 開発者向け > 開発者モード
```

2. **Git for Windowsの設定を確認**
```bash
# シンボリックリンクサポートを有効化
git config --global core.symlinks true
```

3. **代替手段：git worktree（推奨）**
```bash
# Git 2.5以降で利用可能な公式機能
git worktree add ../my-project-feature feature-branch

# 作業ディレクトリの一覧表示
git worktree list

# 作業ディレクトリの削除
git worktree remove ../my-project-feature
```

#### git worktreeとの比較

現在は、`git-new-workdir`よりも公式の`git worktree`コマンドの使用が推奨されています：

```bash
# git-new-workdir（従来の方法）
git-new-workdir . ../new-workdir feature-branch

# git worktree（推奨される方法）
git worktree add ../new-workdir feature-branch

# 利点：
# - 公式サポート
# - Windows環境での安定性
# - より安全な実装
# - 統合された管理機能
```

#### 注意事項

- リポジトリサイズに応じて共有される`.git`ディレクトリが複数の作業ディレクトリから参照される
- 同じブランチを複数の作業ディレクトリでチェックアウトすることは避ける
- 作業ディレクトリを削除する際は、適切にクリーンアップを行う
- Windows環境では`git worktree`の使用を推奨

### git worktree

`git worktree`は、Git 2.5以降で導入された公式機能で、一つのリポジトリから複数の作業ディレクトリを管理することができます。同じリポジトリで複数のブランチを同時に作業する際に非常に便利です。

#### git worktreeとは

`git worktree`を使用することで、同一リポジトリの異なるブランチを別々のディレクトリで同時に作業できます。従来の`git-new-workdir`とは異なり、Git本体に組み込まれた公式機能のため、より安全で安定した動作が期待できます。

#### 基本的な概念

- **メインワークツリー**: 通常の`.git`ディレクトリを含むリポジトリ
- **リンクワークツリー**: メインワークツリーから作成される追加の作業ディレクトリ
- **共有**: `.git`ディレクトリの大部分がメインワークツリーと共有される
- **独立性**: 各ワークツリーで異なるブランチを独立してチェックアウト可能

#### 基本的な使用方法

```bash
# 基本構文
git worktree add <パス> [<ブランチ名>]

# 既存のブランチから新しいワークツリーを作成
git worktree add ../feature-work feature-branch

# 新しいブランチを作成して同時にワークツリーを作成
git worktree add -b new-feature ../new-feature-work

# 特定のコミットからワークツリーを作成
git worktree add ../hotfix-work abc1234

# HEADから新しいワークツリーを作成
git worktree add ../review-work
```

#### 実用的な使用例

```bash
# 現在のプロジェクトディレクトリ
cd ~/projects/my-app

# 機能開発用のワークツリーを作成
git worktree add ../my-app-feature feature/user-authentication

# バグ修正用のワークツリーを作成  
git worktree add ../my-app-bugfix -b hotfix/login-issue

# レビュー用のワークツリーを作成（特定のPRをチェックアウト）
git worktree add ../my-app-review origin/pull/123/head

# 実験用のワークツリーを作成
git worktree add ../my-app-experiment -b experiment/new-architecture

# 並行作業の例
cd ../my-app-feature
# 新機能の開発作業...
git add .
git commit -m "認証機能を追加"

cd ../my-app-bugfix  
# バグ修正作業...
git add .
git commit -m "ログイン問題を修正"

cd ../my-app
# メインブランチでの他の作業...
```

#### ワークツリーの管理

```bash
# 現在のワークツリー一覧を表示
git worktree list
# 出力例:
# /home/user/projects/my-app         abc1234 [main]
# /home/user/projects/my-app-feature def5678 [feature/user-authentication]
# /home/user/projects/my-app-bugfix  ghi9012 [hotfix/login-issue]

# 詳細情報付きでワークツリー一覧を表示
git worktree list --verbose
# 出力例:
# /home/user/projects/my-app         abc1234 [main]
# /home/user/projects/my-app-feature def5678 [feature/user-authentication]
# /home/user/projects/my-app-bugfix  ghi9012 [hotfix/login-issue] prunable

# ワークツリーの削除
git worktree remove ../my-app-feature

# 強制削除（未保存の変更がある場合）
git worktree remove --force ../my-app-feature

# 古いワークツリーのクリーンアップ（削除されたディレクトリの参照を除去）
git worktree prune

# 詳細なpruning情報を表示
git worktree prune --verbose

# dry-run（実際には削除せずに何が削除されるかを確認）
git worktree prune --dry-run
```

#### 高度な使用方法

```bash
# リモートブランチから直接ワークツリーを作成
git worktree add ../feature-review origin/feature/new-api

# 特定のコミットからワークツリーを作成してブランチ名を指定
git worktree add -b review-v1.0 ../review-v1.0 v1.0.0

# detached HEADでワークツリーを作成
git worktree add --detach ../investigation abc1234

# ワークツリー作成時にブランチのトラッキング設定
git worktree add --track -b local-feature ../feature-work origin/feature

# 異なるコミットからの複数ワークツリー管理
git worktree add ../release-1.0 v1.0.0
git worktree add ../release-1.1 v1.1.0  
git worktree add ../main-branch main
```

#### ワークフロー例：並行開発

```bash
# プロジェクトのセットアップ
cd ~/projects/web-app

# 1. 機能A開発用のワークツリー
git worktree add ../web-app-feature-a -b feature/shopping-cart

# 2. 機能B開発用のワークツリー
git worktree add ../web-app-feature-b -b feature/user-profile

# 3. バグ修正用のワークツリー
git worktree add ../web-app-hotfix -b hotfix/payment-issue

# 4. 各ワークツリーで並行作業
cd ../web-app-feature-a
# ショッピングカート機能の開発...
echo "shopping cart feature" > cart.js
git add cart.js
git commit -m "ショッピングカート機能を追加"

cd ../web-app-feature-b
# ユーザープロフィール機能の開発...
echo "user profile feature" > profile.js
git add profile.js
git commit -m "ユーザープロフィール機能を追加"

cd ../web-app-hotfix
# 緊急バグ修正...
echo "payment fix" > payment.js
git add payment.js
git commit -m "決済バグを緊急修正"

# 5. メインブランチに変更をマージ
cd ../web-app
git checkout main

# ホットフィックスを最初にマージ（緊急性が高いため）
git merge hotfix/payment-issue

# 機能AとBを順次マージ
git merge feature/shopping-cart
git merge feature/user-profile

# 6. 完了したワークツリーを削除
git worktree remove ../web-app-hotfix
git worktree remove ../web-app-feature-a
git worktree remove ../web-app-feature-b

# ブランチも削除（必要に応じて）
git branch -d hotfix/payment-issue
git branch -d feature/shopping-cart
git branch -d feature/user-profile
```

#### 注意事項とベストプラクティス

**注意事項：**

```bash
# 同じブランチを複数のワークツリーでチェックアウトすることはできない
git worktree add ../duplicate main
# エラー: fatal: 'main' is already checked out at '/home/user/projects/my-app'

# ワークツリーが存在しない場合のエラー
git worktree remove ../non-existent
# エラー: fatal: '../non-existent' is not a working tree

# 未保存の変更があるワークツリーの削除
git worktree remove ../modified-work
# エラー: fatal: '../modified-work' contains modified or untracked files, use --force to delete it
```

**ベストプラクティス：**

```bash
# 1. 定期的なクリーンアップ
git worktree prune --dry-run  # 削除対象を確認
git worktree prune           # 実際に削除

# 2. 意味のあるディレクトリ名を使用
git worktree add ../myapp-feature-auth feature/authentication
git worktree add ../myapp-bugfix-123 hotfix/issue-123
git worktree add ../myapp-review-pr456 origin/pull/456/head

# 3. ワークツリーの状態を定期的に確認
git worktree list

# 4. 不要になったワークツリーは速やかに削除
git worktree remove ../completed-feature

# 5. ワークツリー間での作業状況の把握
cd ~/projects
find . -name ".git" -type f -exec dirname {} \; | sort
# 各ワークツリーのディレクトリを一覧表示
```

#### パフォーマンスと容量の考慮事項

```bash
# ワークツリーが使用する容量を確認
du -sh ../my-app*
# 出力例:
# 45M    ../my-app
# 12M    ../my-app-feature  (ワークファイルのみ、.gitは共有)
# 8M     ../my-app-bugfix

# 全体のリポジトリサイズを確認
git count-objects -v -H
# 詳細なオブジェクトサイズ情報

# ワークツリー固有のファイルサイズ
git worktree list | while read path commit branch; do
    echo "ワークツリー: $path"
    du -sh "$path" 2>/dev/null || echo "  (アクセス不可)"
done
```

#### git-new-workdirとの比較

```bash
# git-new-workdir（非推奨の方法）
git-new-workdir . ../old-way feature-branch

# git worktree（推奨される方法）
git worktree add ../new-way feature-branch

# 主な違い:
# 1. 公式サポート vs サードパーティスクリプト
# 2. より安全な実装 vs シンボリンクベース
# 3. 統合された管理コマンド vs 手動管理
# 4. Windows環境での安定性 vs 制限あり
# 5. Git本体と同期した機能更新 vs 独立したメンテナンス
```

#### トラブルシューティング

```bash
# 1. ワークツリーの参照が破損している場合
git worktree list  # エラーが表示される場合
git worktree prune --verbose  # 壊れた参照を削除

# 2. ワークツリーのディレクトリが存在しない場合
git worktree list
# /path/to/missing-worktree abc1234 [feature-branch] prunable

git worktree prune  # 存在しないワークツリーの参照を削除

# 3. 手動でディレクトリを削除してしまった場合
rm -rf ../my-feature-work  # ワークツリーを手動削除（非推奨）
git worktree prune  # Gitの管理情報をクリーンアップ

# 4. ワークツリーの場所を移動したい場合
git worktree move ../old-location ../new-location

# 5. ワークツリーの情報を修復
git worktree repair        # 全てのワークツリーを修復
git worktree repair ../specific-worktree  # 特定のワークツリーを修復

# 6. デバッグ情報の取得
GIT_TRACE=1 git worktree list  # 詳細なトレース情報

# 7. ワークツリーのロック状態確認と解除

# ワークツリーのロック機能とは：
# - ワークツリーを誤って削除されることから保護する機能
# - ロックされたワークツリーは`git worktree remove`で削除できない
# - 自動的な`git worktree prune`処理からも除外される
# - 一時的に使用しないが保持したいワークツリーの保護に有効

git worktree list  # locked状態のワークツリーを確認（locked列に表示）

# ワークツリーをロックする（保護する）
git worktree lock ../worktree-to-lock
# ロック理由を指定する場合
git worktree lock --reason "作業中断中のため削除禁止" ../important-work

# ワークツリーのロックを解除する
git worktree unlock ../locked-worktree

# ロック状態の詳細確認
git worktree list --verbose  # ロック理由も表示される
```

### diff-highlight

`diff-highlight`は、Gitの差分表示をより読みやすくするためのツールです。変更された行内で、実際に変更された部分のみをハイライト表示します。

#### diff-highlightとは

通常のGitの差分表示では、行全体が変更されたように表示されますが、`diff-highlight`を使用することで、行内の実際に変更された部分のみが強調表示され、コードレビューや変更内容の確認が格段に効率的になります。

#### インストール方法

```bash
# Git本体に含まれているスクリプトを使用（Ubuntu/Debian）
sudo apt-get install git

# diff-highlightスクリプトの場所を確認
find /usr -name "diff-highlight" 2>/dev/null

# 一般的な場所
# /usr/share/git-core/contrib/diff-highlight/diff-highlight
# /usr/local/share/git-core/contrib/diff-highlight/diff-highlight

# 実行可能にして、PATHに追加
sudo chmod +x /usr/share/git-core/contrib/diff-highlight/diff-highlight
sudo ln -s /usr/share/git-core/contrib/diff-highlight/diff-highlight /usr/local/bin/

# macOSの場合（Homebrewでのインストール後）
ls /usr/local/share/git-core/contrib/diff-highlight/
chmod +x /usr/local/share/git-core/contrib/diff-highlight/diff-highlight
```

#### 手動インストール

```bash
# Gitリポジトリから直接取得
curl -o ~/bin/diff-highlight \
  https://raw.githubusercontent.com/git/git/master/contrib/diff-highlight/diff-highlight
chmod +x ~/bin/diff-highlight

# PATHに~/binが含まれていることを確認
echo $PATH
```

#### Gitとの統合設定

```bash
# diff-highlightをGitのページャーとして設定
git config --global core.pager 'diff-highlight | less'

# または、より詳細な設定
git config --global pager.log 'diff-highlight | less'
git config --global pager.show 'diff-highlight | less'
git config --global pager.diff 'diff-highlight | less'

# インタラクティブな差分でも使用
git config --global interactive.diffFilter 'diff-highlight'
```

#### 使用例

```bash
# 通常のdiffコマンドで自動的にハイライトが適用される
git diff

# ログ表示時にもハイライトが適用される
git log -p

# 特定のコミットの変更をハイライト表示
git show commit-hash

# ブランチ間の差分をハイライト表示
git diff main..feature-branch

# ファイル指定での差分ハイライト
git diff HEAD~1 -- filename.txt
```

#### 色の設定カスタマイズ

```bash
# ハイライト色をカスタマイズ
git config --global color.diff-highlight.oldNormal 'red bold'
git config --global color.diff-highlight.oldHighlight 'red bold 52'
git config --global color.diff-highlight.newNormal 'green bold'
git config --global color.diff-highlight.newHighlight 'green bold 22'

# デフォルト色の確認
git config --get-regexp color.diff-highlight
```

#### 高度な設定例

```bash
# lessのオプションと組み合わせた設定
git config --global core.pager 'diff-highlight | less -R'

# 複数のツールとの組み合わせ
git config --global core.pager 'diff-highlight | diff-so-fancy | less --tabs=4 -RFX'

# エイリアスとして設定
git config --global alias.dh '!git diff --color=always "$@" | diff-highlight'

# 使用例：エイリアスを使った差分表示
git dh HEAD~1
```

#### 動作確認とテスト

```bash
# diff-highlightが正しく動作するかテスト
echo "before text here" > test.txt
git add test.txt
git commit -m "初期テキスト"

echo "after text modified here" > test.txt
git diff

# 期待される結果：
# - 行内の変更部分のみがハイライト表示される
# - "before"が赤でハイライト、"after"と"modified"が緑でハイライト
```

#### トラブルシューティング

```bash
# diff-highlightが見つからない場合
which diff-highlight

# スクリプトの権限を確認
ls -la $(which diff-highlight)

# 設定を確認
git config --get core.pager

# 設定をリセット（必要に応じて）
git config --global --unset core.pager
git config --global --unset pager.diff

# シンプルな設定で動作確認
git config --global core.pager 'diff-highlight | less'
```

#### 他のツールとの組み合わせ

```bash
# delta（より高機能な差分表示ツール）と組み合わせ
git config --global core.pager 'delta'
git config --global interactive.diffFilter 'delta --color-only'

# diff-so-fancyとの組み合わせ
git config --global core.pager 'diff-so-fancy | less --tabs=4 -RFX'
```

### カスタムGitコマンドの作成

#### カスタムGitコマンドとは

Gitでは、`git-` で始まる実行可能ファイルを作成することで、独自のGitサブコマンドを作成できます。これにより、頻繁に使用するコマンドの組み合わせを簡単に呼び出したり、プロジェクト固有の操作を自動化したりできます。

#### 基本的な作成方法

```bash
# 1. スクリプトファイルを作成（例：git-origcmd）
sudo nano /usr/local/bin/git-origcmd

# 2. 実行権限を付与
sudo chmod +x /usr/local/bin/git-origcmd

# 3. 使用方法
git origcmd  # git-origcmd スクリプトが実行される
```

#### 実用的な例

##### git-origcmd（オリジナルコマンドの例）

```bash
#!/bin/bash
# /usr/local/bin/git-origcmd

# 使用方法を表示
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "使用方法: git origcmd [オプション]"
    echo "オプション:"
    echo "  status     - 詳細なステータス表示"
    echo "  clean      - 作業ディレクトリをクリーンアップ"
    echo "  backup     - 現在の状態をバックアップ"
    echo "  --help     - このヘルプを表示"
    exit 0
fi

case "$1" in
    "status")
        echo "=== Git Status ==="
        git status --porcelain
        echo ""
        echo "=== Branch Info ==="
        git branch -vv
        echo ""
        echo "=== Recent Commits ==="
        git log --oneline -5
        ;;
    "clean")
        echo "作業ディレクトリをクリーンアップしています..."
        git clean -fd
        git checkout -- .
        echo "クリーンアップ完了"
        ;;
    "backup")
        timestamp=$(date +"%Y%m%d_%H%M%S")
        branch_name=$(git rev-parse --abbrev-ref HEAD)
        stash_message="backup_${branch_name}_${timestamp}"
        git stash save "$stash_message"
        echo "バックアップ完了: $stash_message"
        ;;
    *)
        echo "エラー: 不明なオプション '$1'"
        echo "使用方法: git origcmd --help"
        exit 1
        ;;
esac
```

##### その他の便利なカスタムコマンド例

```bash
# git-sync（リモートとの同期コマンド）
#!/bin/bash
# /usr/local/bin/git-sync

current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "現在のブランチ: $current_branch"

# リモートから最新を取得
git fetch origin

# メインブランチ（main または master）に切り替えて更新
if git show-ref --verify --quiet refs/heads/main; then
    main_branch="main"
elif git show-ref --verify --quiet refs/heads/master; then
    main_branch="master"
else
    echo "エラー: メインブランチが見つかりません"
    exit 1
fi

git checkout "$main_branch"
git pull origin "$main_branch"

# 元のブランチに戻る
if [[ "$current_branch" != "$main_branch" ]]; then
    git checkout "$current_branch"
    echo "$main_branch ブランチを更新しました"
    echo "現在のブランチを $main_branch にリベースしますか？ (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git rebase "$main_branch"
    fi
fi
```

```bash
# git-weekly（週次レポートコマンド）
#!/bin/bash
# /usr/local/bin/git-weekly

author_name=$(git config user.name)
start_date=$(date -d "last monday" +"%Y-%m-%d")
end_date=$(date +"%Y-%m-%d")

echo "=== 今週のコミット履歴 ($start_date から $end_date) ==="
echo "作成者: $author_name"
echo ""

git log --author="$author_name" \
        --since="$start_date" \
        --until="$end_date" \
        --pretty=format:"%h - %s (%cd)" \
        --date=short

echo ""
echo ""
echo "=== 今週の統計 ==="
commits=$(git log --author="$author_name" --since="$start_date" --until="$end_date" --oneline | wc -l)
echo "コミット数: $commits"

if [[ $commits -gt 0 ]]; then
    echo "変更されたファイル:"
    git log --author="$author_name" --since="$start_date" --until="$end_date" --name-only --pretty=format: | sort | uniq -c | sort -nr
fi
```

#### インストールと管理

```bash
# 個人用ディレクトリにインストール（推奨）
mkdir -p ~/bin
# ~/bin/git-origcmd を作成
chmod +x ~/bin/git-origcmd

# PATHに追加（~/.bashrc または ~/.zshrc に追加）
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# システム全体にインストール
sudo cp git-origcmd /usr/local/bin/
sudo chmod +x /usr/local/bin/git-origcmd
```

#### 注意事項とベストプラクティス

```bash
# カスタムコマンドの一覧表示
ls -la ~/bin/git-* 2>/dev/null || ls -la /usr/local/bin/git-*

# コマンドが正しく認識されているか確認
git --exec-path
which git-origcmd

# シェルスクリプト以外の言語でも作成可能
# Python例：#!/usr/bin/env python3
# Ruby例：#!/usr/bin/env ruby
```

**ベストプラクティス：**

- 必ず `--help` オプションを実装する
- エラーハンドリングを適切に行う
- 実行前に確認を求める（破壊的操作の場合）
- ログや進捗表示を適切に行う
- 既存のGitコマンドと名前が重複しないようにする

## フック

### フックとは

Gitフック（Git Hooks）は、Gitの特定のアクションが実行される前後に自動的に実行されるスクリプトです。コミット、プッシュ、マージなどの操作時に、カスタムの処理を実行できます。

### フックの種類

#### クライアントサイドフック

開発者のローカル環境で実行されるフック：

- **pre-commit**: コミット前に実行（コードチェック、テスト実行）
- **prepare-commit-msg**: コミットメッセージ編集前に実行
- **commit-msg**: コミットメッセージの検証
- **post-commit**: コミット後に実行（通知など）
- **pre-push**: プッシュ前に実行（プッシュの検証）

#### サーバーサイドフック

リモートリポジトリで実行されるフック：

- **pre-receive**: プッシュされたデータの受信前に実行
- **update**: ブランチ更新前に実行
- **post-receive**: プッシュ完了後に実行（デプロイ、通知）

### フックの場所

```bash
# フックファイルの場所

.git/hooks/

# 利用可能なサンプルフックを確認

ls -la .git/hooks/
# 出力例:

# -rwxr-xr-x 1 user user  478 Jan 1 12:00 applypatch-msg.sample
# -rwxr-xr-x 1 user user  896 Jan 1 12:00 commit-msg.sample

# -rwxr-xr-x 1 user user 3327 Jan 1 12:00 pre-commit.sample

```

### 基本的なフックの作成

#### pre-commitフックの例（コードの構文チェック）

```bash
# .git/hooks/pre-commit ファイルを作成

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# コミット前にJavaScriptファイルの構文チェックを実行

# JavaScriptファイルがある場合のみチェック

if git diff --cached --name-only | grep -q '\.js$'; then
    echo "JavaScriptファイルの構文チェックを実行中..."

    # 各JSファイルをチェック
    for file in $(git diff --cached --name-only | grep '\.js$'); do
        node -c "$file"
        if [ $? -ne 0 ]; then
            echo "エラー: $file に構文エラーがあります"
            exit 1
        fi
    done
    echo "構文チェック完了"
fi

exit 0
EOF

# 実行権限を付与

chmod +x .git/hooks/pre-commit

```

#### commit-msgフックの例（コミットメッセージの形式チェック）

```bash
# .git/hooks/commit-msg ファイルを作成

cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh

# コミットメッセージの形式をチェック

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "エラー: コミットメッセージが規約に違反しています"
    echo "正しい形式: <type>(<scope>): <description>"
    echo "例: feat(auth): ユーザー認証機能を追加"
    echo "利用可能なtype: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi
EOF

# 実行権限を付与

chmod +x .git/hooks/commit-msg

```

#### pre-pushフックの例（テスト実行）

```bash
# .git/hooks/pre-push ファイルを作成

cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

# プッシュ前にテストを実行

echo "プッシュ前にテストを実行中..."

# プロジェクトにpackage.jsonがある場合

if [ -f "package.json" ]; then
    npm test
    if [ $? -ne 0 ]; then
        echo "エラー: テストが失敗しました"
        exit 1
    fi
fi

# Pythonプロジェクトの場合

if [ -f "requirements.txt" ] || [ -f "setup.py" ]; then
    python -m pytest
    if [ $? -ne 0 ]; then
        echo "エラー: テストが失敗しました"
        exit 1
    fi
fi

echo "テスト完了"
exit 0
EOF

# 実行権限を付与

chmod +x .git/hooks/pre-push

```

### フックの管理

#### フックの有効化と無効化

```bash
# フックを無効化（ファイル名に.disabledを追加）

mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled

# フックを再有効化

mv .git/hooks/pre-commit.disabled .git/hooks/pre-commit

# フックをスキップしてコミット（一時的）

git commit --no-verify -m "コミットメッセージ"

```

#### チーム全体でフックを共有

```bash
# プロジェクトルートにhooksディレクトリを作成

mkdir hooks

# 共有したいフックをhooksディレクトリに配置

cp .git/hooks/pre-commit hooks/pre-commit

# チームメンバーがフックをインストールするスクリプト

cat > hooks/install.sh << 'EOF'
#!/bin/bash

# フックをインストールするスクリプト

HOOKS_DIR="$(dirname "$0")"
GIT_HOOKS_DIR=".git/hooks"

# 各フックファイルをコピー

for hook in "$HOOKS_DIR"/*; do
    hook_name=$(basename "$hook")

    # install.shとREADMEはスキップ
    if [ "$hook_name" != "install.sh" ] && [ "$hook_name" != "README.md" ]; then
        cp "$hook" "$GIT_HOOKS_DIR/$hook_name"
        chmod +x "$GIT_HOOKS_DIR/$hook_name"
        echo "インストール済み: $hook_name"
    fi
done

echo "フックのインストールが完了しました"
EOF

chmod +x hooks/install.sh

# チームメンバーは以下を実行

# ./hooks/install.sh

```

#### フックのテスト

```bash
# pre-commitフックをテスト（実際にコミットせずに実行）

.git/hooks/pre-commit

# commit-msgフックをテスト

echo "test message" | .git/hooks/commit-msg /dev/stdin

# 特定のフックが存在するかチェック

if [ -x .git/hooks/pre-commit ]; then
    echo "pre-commitフックが有効です"
else
    echo "pre-commitフックが無効または存在しません"
fi

```

### 高度なフック例

#### post-receiveフック（自動デプロイ）

```bash
# サーバー側の.git/hooks/post-receive

cat > .git/hooks/post-receive << 'EOF'
#!/bin/sh

# プッシュ後に自動デプロイを実行

echo "デプロイを開始しています..."

# 作業ディレクトリに移動

cd /var/www/myapp || exit

# 最新のコードを取得

git --git-dir=/var/repo/myapp.git --work-tree=/var/www/myapp checkout -f

# 依存関係をインストール

npm install --production

# アプリケーションを再起動

systemctl restart myapp

echo "デプロイが完了しました"
EOF

chmod +x .git/hooks/post-receive

```

#### pre-commitフック（複数の検証を実行）

```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# 包括的なpre-commitチェック

echo "コミット前チェックを実行中..."

# 1. 大きなファイルのチェック

large_files=$(git diff --cached --name-only | xargs -I {} find {} -size +10M 2>/dev/null)
if [ -n "$large_files" ]; then
    echo "エラー: 10MB以上のファイルが含まれています:"
    echo "$large_files"
    exit 1
fi

# 2. 機密情報のチェック

secrets_pattern="(password|secret|key|token|api_key).*=.*['\"][^'\"]{8,}"
if git diff --cached | grep -iE "$secrets_pattern"; then
    echo "エラー: 機密情報の可能性があるデータが含まれています"
    exit 1
fi

# 3. コード品質チェック（ESLintがある場合）

if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
    npx eslint $(git diff --cached --name-only | grep '\.js$')
    if [ $? -ne 0 ]; then
        echo "エラー: ESLintエラーがあります"
        exit 1
    fi
fi

# 4. 日本語文字化けチェック

if git diff --cached | grep -P '[\x80-\xFF]' | grep -v '^[+-].*#.*日本語'; then
    echo "警告: 日本語文字が含まれています。エンコーディングを確認してください"
fi

echo "全てのチェックが完了しました"
exit 0
EOF

chmod +x .git/hooks/pre-commit

```

### リポジトリ情報の取得（rev-parse）

```bash
# 現在のブランチ名を取得

git rev-parse --abbrev-ref HEAD
# 出力例: main

# 現在のコミットハッシュを取得

git rev-parse HEAD
# 出力例: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0

# 短縮コミットハッシュを取得

git rev-parse --short HEAD
# 出力例: a1b2c3d

# リポジトリのルートディレクトリを取得

git rev-parse --show-toplevel
# 出力例: /home/user/my-project

# .gitディレクトリの場所を取得

git rev-parse --git-dir
# 出力例: .git

# 特定のブランチやタグのコミットハッシュを取得

git rev-parse main
# 出力例: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0

git rev-parse v1.0.0
# 出力例: b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1

# フックスディレクトリのパスを取得

git rev-parse --git-path hooks
# 出力例: .git/hooks

# ワーキングツリー内にいるかを確認

git rev-parse --is-inside-work-tree
# 出力例: true

# ベアリポジトリかどうかを確認

git rev-parse --is-bare-repository
# 出力例: false

# 現在のディレクトリのリポジトリルートからの相対パスを取得

git rev-parse --show-prefix
# 出力例: src/components/
# リポジトリルートにいる場合は空文字

# リポジトリルートへの相対パスを取得

git rev-parse --show-cdup
# 出力例: ../../
# リポジトリルートにいる場合は空文字

# .gitディレクトリの絶対パスを取得

git rev-parse --absolute-git-dir
# 出力例: /home/user/my-project/.git

# gitディレクトリ内にいるかを確認

git rev-parse --is-inside-git-dir
# 出力例: false

# 浅いクローン（shallow repository）かどうかを確認

git rev-parse --is-shallow-repository
# 出力例: false

# 参照の完全なシンボリック名を取得

git rev-parse --symbolic-full-name HEAD
# 出力例: refs/heads/main

# 上流ブランチの完全名を取得

git rev-parse --symbolic-full-name @{u}
# 出力例: refs/remotes/origin/main

# 上流ブランチのコミットハッシュを取得

git rev-parse @{u}
# 出力例: b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1

# 参照が存在するかを検証

git rev-parse --verify HEAD
# 出力例: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
# 存在しない場合はエラーを出力

git rev-parse --verify refs/heads/nonexistent 2>/dev/null || echo "ブランチが存在しません"

# 相対的なコミット参照を解決

git rev-parse HEAD~1
# 出力例: c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1b2
# 1つ前のコミット

git rev-parse HEAD^
# 出力例: c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1b2
# 親コミット（HEAD~1と同じ）

git rev-parse HEAD~3
# 出力例: e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1b2c3d4
# 3つ前のコミット

# 特定のGitディレクトリ内のパスを取得

git rev-parse --git-path config
# 出力例: .git/config

git rev-parse --git-path objects
# 出力例: .git/objects

git rev-parse --git-path refs
# 出力例: .git/refs

git rev-parse --git-path logs/HEAD
# 出力例: .git/logs/HEAD

# 全てのブランチ参照を一覧表示

git rev-parse --branches
# 出力例: 各ブランチのコミットハッシュ

# 全てのタグ参照を一覧表示

git rev-parse --tags
# 出力例: 各タグのコミットハッシュ

# 全てのリモート参照を一覧表示

git rev-parse --remotes
# 出力例: 各リモートブランチのコミットハッシュ

# 全ての参照を一覧表示

git rev-parse --all
# 出力例: 全ての参照（ブランチ、タグ、リモート）のコミットハッシュ

# 引数をシェル用にクォート

git rev-parse --sq-quote "file with spaces.txt" "another file.txt"
# 出力例: 'file with spaces.txt' 'another file.txt'

# 日付文字列を解析

git rev-parse --since="2023-01-01"
# 日付文字列をGitが理解できる形式に変換

git rev-parse --until="last week"
# 相対的な日付表現を解析

```

## Git コマンド一覧

以下は Git に組み込まれている主なコマンドをカテゴリ別に列挙したものです。最新版の全コマンドは `git help -a` でご確認いただけます。

---

### 1. 基本的な Porcelain コマンド

- **add** - ファイルをステージングエリアに追加  
  ```bash
  git add file.txt
  git add .
  ```

- **am** - メールボックスからパッチを適用  
  ```bash
  git am 0001-feature.patch
  ```

- **annotate** (alias: blame) - ファイルの各行の最後の変更を表示  
  ```bash
  git annotate file.txt
  git blame file.txt
  ```

- **apply** - パッチファイルを適用  
  ```bash
  git apply patch.diff
  ```

- **archive** - リポジトリのアーカイブを作成  
  ```bash
  git archive --format=zip HEAD > project.zip
  ```

- **bisect** - バイナリサーチでバグを特定  
  ```bash
  git bisect start
  git bisect bad
  git bisect good v1.0
  ```

- **branch** - ブランチの作成・削除・一覧表示  
  ```bash
  git branch feature
  git branch -d feature
  git branch -a
  ```

- **bundle** - リポジトリをバンドルファイルに作成  
  ```bash
  git bundle create repo.bundle HEAD main
  ```

- **checkout** - ブランチやコミットに切り替え  
  ```bash
  git checkout main
  git checkout -b feature
  ```

- **cherry-pick** - 特定のコミットを現在のブランチに適用  
  ```bash
  git cherry-pick abc123
  ```

- **citool** - グラフィカルなコミットツール  
  ```bash
  git citool
  ```

- **clean** - 追跡されていないファイルを削除  
  ```bash
  git clean -f
  git clean -fd
  ```

- **clone** - リモートリポジトリを複製  
  ```bash
  git clone https://github.com/user/repo.git
  ```

- **commit** - ステージされた変更をコミット  
  ```bash
  git commit -m "Add feature"
  git commit -am "Fix bug"
  ```

- **describe** - 最新のタグからの説明を生成  
  ```bash
  git describe
  git describe --tags
  ```

- **diff** - 変更の差分を表示  
  ```bash
  git diff
  git diff HEAD~1
  ```

- **fetch** - リモートリポジトリから変更を取得  
  ```bash
  git fetch origin
  git fetch --all
  ```

- **format-patch** - コミットをパッチファイルとして出力  
  ```bash
  git format-patch HEAD~3
  ```

- **fsck** - オブジェクトの整合性をチェック  
  ```bash
  git fsck
  git fsck --full
  ```

- **gc** - ガベージコレクションを実行  
  ```bash
  git gc
  git gc --aggressive
  ```

- **grep** - リポジトリ内でパターン検索  
  ```bash
  git grep "function"
  git grep -n "TODO"
  ```

- **gui** - グラフィカルなGitインターフェース  
  ```bash
  git gui
  ```

- **init** - 新しいGitリポジトリを初期化  
  ```bash
  git init
  git init --bare
  ```

- **log** - コミット履歴を表示  
  ```bash
  git log
  git log --oneline
  git log --graph
  ```

- **merge** - ブランチをマージ  
  ```bash
  git merge feature
  git merge --no-ff feature
  ```

- **mv** - ファイルを移動・リネーム  
  ```bash
  git mv old.txt new.txt
  ```

- **pull** - リモートリポジトリから変更を取得してマージ  
  ```bash
  git pull origin main
  git pull --rebase
  ```

- **push** - ローカルの変更をリモートリポジトリに送信  
  ```bash
  git push origin main
  git push -u origin feature
  ```

- **rebase** - コミットを別のベースに移動  
  ```bash
  git rebase main
  git rebase -i HEAD~3
  ```

- **reflog** - 参照ログを表示  
  ```bash
  git reflog
  git reflog show main
  ```

- **remote** - リモートリポジトリを管理  
  ```bash
  git remote add origin https://github.com/user/repo.git
  git remote -v
  ```

- **reset** - HEAD、インデックス、作業ディレクトリをリセット  
  ```bash
  git reset HEAD~1
  git reset --hard HEAD~1
  ```

- **revert** - コミットを打ち消すコミットを作成  
  ```bash
  git revert abc123
  ```

- **rm** - ファイルを削除  
  ```bash
  git rm file.txt
  git rm --cached file.txt
  ```

- **show** - オブジェクトの詳細を表示  
  ```bash
  git show abc123
  git show HEAD:file.txt
  ```

- **shortlog** - 簡潔なコミット履歴を表示  
  ```bash
  git shortlog
  git shortlog -s -n
  ```

- **status** - 作業ディレクトリの状態を表示  
  ```bash
  git status
  git status -s
  ```

- **stash** - 変更を一時的に保存  
  ```bash
  git stash
  git stash pop
  git stash list
  ```

- **submodule** - サブモジュールを管理  
  ```bash
  git submodule add https://github.com/user/lib.git lib
  git submodule update --init
  ```

- **switch** - ブランチを切り替え（Git 2.23+）  
  ```bash
  git switch main
  git switch -c feature
  ```

- **tag** - タグを作成・一覧表示・削除  
  ```bash
  git tag v1.0
  git tag -a v1.0 -m "Version 1.0"
  git tag -l
  ```

- **worktree** - 複数の作業ディレクトリを管理  
  ```bash
  git worktree add ../feature feature
  git worktree list
  ```

- **restore** - ファイルを復元（Git 2.23+）  
  ```bash
  git restore file.txt
  git restore --staged file.txt
  ```  

---

### 2. 低レベル（Plumbing）コマンド

- **cat-file** - オブジェクトの内容やメタデータを表示  
  ```bash
  git cat-file -p abc123
  git cat-file -t abc123
  ```

- **check-attr** - ファイルの属性をチェック  
  ```bash
  git check-attr binary file.txt
  ```

- **check-ignore** - ファイルが無視されるかチェック  
  ```bash
  git check-ignore file.txt
  ```

- **check-ref-format** - 参照名の形式をチェック  
  ```bash
  git check-ref-format refs/heads/feature
  ```

- **commit-tree** - コミットオブジェクトを作成  
  ```bash
  git commit-tree abc123 -m "Initial commit"
  ```

- **count-objects** - オブジェクト数とディスク使用量を表示  
  ```bash
  git count-objects
  git count-objects -v
  ```

- **credential** - 認証情報を管理  
  ```bash
  git credential fill
  git credential approve
  ```

- **daemon** - Gitデーモンサーバーを起動  
  ```bash
  git daemon --reuseaddr --base-path=/var/git/
  ```

- **describe-ref** - 参照を説明  
  ```bash
  git describe-ref HEAD
  ```

- **fetch-pack** - パックファイルを取得  
  ```bash
  git fetch-pack origin
  ```

- **fmt-merge-msg** - マージメッセージをフォーマット  
  ```bash
  git fmt-merge-msg < .git/FETCH_HEAD
  ```

- **hash-object** - オブジェクトのハッシュを計算  
  ```bash
  git hash-object file.txt
  git hash-object -w file.txt
  ```

- **index-pack** - パックファイルのインデックスを作成  
  ```bash
  git index-pack pack-*.pack
  ```

- **init-db** - データベースを初期化（legacy）  
  ```bash
  git init-db
  ```

- **ls-files** - インデックスと作業ツリーのファイルを一覧表示  
  ```bash
  git ls-files
  git ls-files --stage
  ```

- **ls-remote** - リモート参照を一覧表示  
  ```bash
  git ls-remote origin
  git ls-remote --heads origin
  ```

- **ls-tree** - ツリーオブジェクトの内容を一覧表示  
  ```bash
  git ls-tree HEAD
  git ls-tree -r HEAD
  ```

- **mailinfo** - メールからパッチとメタデータを抽出  
  ```bash
  git mailinfo msg patch < mail.txt
  ```

- **mktag** - タグオブジェクトを作成  
  ```bash
  git mktag < tag-content.txt
  ```

- **mktree** - ツリーオブジェクトを作成  
  ```bash
  git mktree < tree-content.txt
  ```

- **pack-objects** - パックファイルを作成  
  ```bash
  git pack-objects --stdout < object-list
  ```

- **pack-refs** - 参照をパック  
  ```bash
  git pack-refs --all
  ```

- **pack-redundant** - 冗長なパックファイルを検出  
  ```bash
  git pack-redundant --all
  ```

- **prune** - 到達不能なオブジェクトを削除  
  ```bash
  git prune
  git prune --expire=now
  ```

- **prune-packed** - パックされたオブジェクトを削除  
  ```bash
  git prune-packed
  ```

- **read-tree** - ツリー情報をインデックスに読み込み  
  ```bash
  git read-tree HEAD
  git read-tree -u HEAD
  ```

- **receive-pack** - プッシュを受信  
  ```bash
  git receive-pack /path/to/repo
  ```

- **replace** - オブジェクトを置換  
  ```bash
  git replace abc123 def456
  git replace --list
  ```

- **send-pack** - オブジェクトを送信  
  ```bash
  git send-pack origin main
  ```

- **show-index** - パックインデックスを表示  
  ```bash
  git show-index < .git/objects/pack/pack-*.idx
  ```

- **symbolic-ref** - シンボリック参照を操作  
  ```bash
  git symbolic-ref HEAD
  git symbolic-ref HEAD refs/heads/main
  ```

- **unpack-objects** - パックファイルを展開  
  ```bash
  git unpack-objects < pack-file
  ```

- **update-index** - インデックスを更新  
  ```bash
  git update-index --add file.txt
  git update-index --assume-unchanged file.txt
  ```

- **update-ref** - 参照を更新  
  ```bash
  git update-ref refs/heads/main abc123
  ```

- **var** - Git変数を表示  
  ```bash
  git var GIT_AUTHOR_IDENT
  git var GIT_EDITOR
  ```

- **verify-pack** - パックファイルを検証  
  ```bash
  git verify-pack .git/objects/pack/pack-*.idx
  ```

- **verify-tag** - タグの署名を検証  
  ```bash
  git verify-tag v1.0
  ```

- **write-tree** - 現在のインデックスからツリーオブジェクトを作成  
  ```bash
  git write-tree
  ```  

---

### 3. ネットワーク／サーバ向けコマンド

- **daemon** - Gitデーモンサーバーを起動  
  ```bash
  git daemon --reuseaddr --base-path=/var/git/
  git daemon --export-all /var/git/
  ```

- **http-fetch** - HTTP経由でオブジェクトを取得  
  ```bash
  git http-fetch commit-sha1 url
  ```

- **http-push** - HTTP経由でオブジェクトを送信  
  ```bash
  git http-push url refs/heads/main
  ```

- **upload-archive** - アーカイブのアップロード処理  
  ```bash
  git upload-archive --remote=origin HEAD
  ```

- **upload-pack** - パックファイルのアップロード処理  
  ```bash
  git upload-pack /path/to/repo
  ```

- **receive-pack** - パックファイルの受信処理  
  ```bash
  git receive-pack /path/to/repo
  ```

- **send-pack** - パックファイルの送信処理  
  ```bash
  git send-pack origin main
  ```  

---

### 4. ヘルプ・設定・ユーティリティ

- **help** - ヘルプ情報を表示  
  ```bash
  git help
  git help commit
  git help -a
  ```

- **config** - 設定オプションを取得・設定  
  ```bash
  git config user.name "Your Name"
  git config --global user.email "email@example.com"
  git config --list
  ```

- **version** - Gitのバージョン情報を表示  
  ```bash
  git version
  git version --build-options
  ```

- **alias** - エイリアスを設定  
  ```bash
  git config alias.st status
  git config alias.co checkout
  ```

- **credential-fill** - 認証情報を埋める  
  ```bash
  git credential-fill
  ```

- **maintenance** - リポジトリのメンテナンス  
  ```bash
  git maintenance run
  git maintenance start
  ```

- **interpret-trailers** - コミットメッセージのトレーラーを解釈  
  ```bash
  git interpret-trailers --trailer "Signed-off-by: Name <email>"
  ```

- **notes** - オブジェクトにノートを追加  
  ```bash
  git notes add -m "Note message"
  git notes show
  git notes list
  ```

- **range-diff** - コミット範囲の差分を表示  
  ```bash
  git range-diff main..feature-old main..feature-new
  ```

- **rerere** - 解決済みの競合を記録・再利用  
  ```bash
  git rerere
  git rerere status
  ```

- **web-browse** - ブラウザでリポジトリを開く  
  ```bash
  git web--browse
  git web--browse --browser=firefox
  ```  

---

※ 上記は主要コマンドの一覧です。サードパーティ製プラグインやエイリアスを含めるとさらに多数存在します。実際の環境にある全コマンドは、ターミナルで以下を実行してご確認ください。  

```bash
git help -a
```

## 実用的な例

### 新しい機能の開発フロー

```bash
# 1. 最新のmainブランチに切り替え

git checkout main
git pull origin main

# 2. 新しい機能ブランチを作成

git checkout -b feature/new-functionality

# 3. ファイルを編集して変更をコミット

git add .
git commit -m "新しい機能を追加"

# 4. リモートにプッシュ

git push -u origin feature/new-functionality

# 5. mainブランチにマージ

git checkout main
git merge feature/new-functionality

# 6. 不要なブランチを削除

git branch -d feature/new-functionality

```

### 緊急修正（ホットフィックス）

```bash
# 1. 本番ブランチから修正ブランチを作成

git checkout main
git checkout -b hotfix/critical-bug

# 2. バグを修正してコミット

git add .
git commit -m "緊急修正: 重要なバグを修正"

# 3. mainブランチにマージ

git checkout main
git merge hotfix/critical-bug

# 4. 開発ブランチにもマージ

git checkout develop
git merge hotfix/critical-bug

# 5. 修正ブランチを削除

git branch -d hotfix/critical-bug

```

### 過去のコミットを確認・修正

```bash
# 特定のコミットの内容を確認

git show commit-hash

# 過去のコミットに戻る（一時的）

git checkout commit-hash

# 特定のコミットの変更を取り消し

git revert commit-hash

# 最後のコミットを修正

git commit --amend -m "修正されたコミットメッセージ"

# 過去のコミットを対話的に編集

git rebase -i HEAD~3

```

### .gitignoreの活用

```bash
# .gitignoreファイルを作成

echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore

# 既に追跡されているファイルを無視するように設定

git rm --cached filename.txt
echo "filename.txt" >> .gitignore
git commit -m ".gitignoreを更新"

```

これらのコマンドを組み合わせることで、効率的にGitを使用してプロジェクトを管理できます。
