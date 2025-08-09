# Git リファレンス

Gitの基本的な使い方とコマンドのリファレンスです。

## 目次
1. [基本概念](#基本概念)
2. [初期設定](#初期設定)
3. [リポジトリの初期化](#リポジトリの初期化)
4. [基本操作](#基本操作)
5. [ブランチ](#ブランチ)
6. [リモートリポジトリ](#リモートリポジトリ)
7. [マージと競合](#マージと競合)
8. [便利なコマンド](#便利なコマンド)
9. [実用的な例](#実用的な例)

## 基本概念

### Gitとは
Gitは分散型バージョン管理システムで、ファイルの変更履歴を追跡し、複数の開発者が協力してプロジェクトを管理できるツールです。

### 重要な概念
- **リポジトリ**: プロジェクトのファイルとその履歴を保存する場所
- **コミット**: ファイルの変更を記録するスナップショット
- **ブランチ**: 開発の流れを分岐させる仕組み
- **マージ**: 異なるブランチの変更を統合する操作

## 初期設定

### ユーザー情報の設定
```bash
# グローバル設定（全てのリポジトリで使用）
git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# 特定のリポジトリのみの設定
git config user.name "あなたの名前"
git config user.email "your.email@example.com"
```

### 設定の確認
```bash
# 全ての設定を表示
git config --list

# 特定の設定を確認
git config user.name
git config user.email
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

## 基本操作

### ファイルの追加とコミット
```bash
# ファイルをステージングエリアに追加
git add filename.txt

# 全てのファイルを追加
git add .

# 変更されたファイルのみ追加
git add -u

# ステージングエリアの状態を確認
git status

# コミットを作成
git commit -m "コミットメッセージ"

# ステージング と コミットを同時に実行（追跡されているファイルのみ）
git commit -am "コミットメッセージ"
```

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
# ローカルブランチの一覧
git branch

# リモートブランチも含めて表示
git branch -a

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
```

### プッシュとプル
```bash
# リモートにプッシュ
git push origin main

# 初回プッシュ時（上流ブランチを設定）
git push -u origin main

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