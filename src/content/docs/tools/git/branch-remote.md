---
title: "Git: ブランチ・リモート・マージ"
description: "Git リファレンスのうち、ブランチ、リモートリポジトリ、マージと競合についてまとめたページです。"
sidebar:
  label: "ブランチ・リモート・マージ"
  order: 4
---

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
