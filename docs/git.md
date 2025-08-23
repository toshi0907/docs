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
