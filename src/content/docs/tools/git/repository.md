---
title: "Git: リポジトリの作成"
description: "Git リファレンスのうち、リポジトリの初期化、ベアリポジトリ（Bare Repository）についてまとめたページです。"
sidebar:
  label: "リポジトリの作成"
  order: 2
---

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
