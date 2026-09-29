---
title: "Git: 実用例"
description: "Git リファレンスのうち、--no-pagerオプションの実用的な使用例、実用的な例についてまとめたページです。"
sidebar:
  label: "実用例"
  order: 8
---

## --no-pagerオプションの実用的な使用例

`--no-pager`オプションは、Gitコマンドの出力をページャー（通常は`less`）を使わずに直接表示するために使用します。スクリプトや自動化、CI/CD環境で特に有用です。

### 基本的な使用方法

```bash
# ページャーなしでログを表示
git --no-pager log --oneline -10

# ページャーなしで状態確認
git --no-pager status

# ページャーなしで差分表示
git --no-pager diff

```

### スクリプトでの活用

```bash
#!/bin/bash

# スクリプトでgitコマンドの出力を処理する場合
changes=$(git --no-pager diff --name-only)
if [ -n "$changes" ]; then
    echo "変更されたファイル:"
    git --no-pager diff --name-only
fi

# 特定の形式で出力を取得
commit_count=$(git --no-pager log --oneline | wc -l)
echo "コミット総数: $commit_count"

# ファイルにリダイレクトする場合
git --no-pager log --oneline --since="1 month ago" > monthly_commits.txt

```

### CI/CD環境での使用

```bash
# GitHub Actions、Jenkins等でのビルドスクリプト
echo "=== Git状態確認 ==="
git --no-pager status --porcelain

echo "=== 最近のコミット ==="
git --no-pager log --oneline -5

echo "=== 変更されたファイル ==="
git --no-pager diff --name-only HEAD~1

# 差分の有無を確認（終了コードを利用）
if git --no-pager diff --quiet; then
    echo "変更なし"
else
    echo "変更あり"
    git --no-pager diff --stat
fi

```

### 設定による制御

```bash
# 環境変数で一時的にページャーを無効化
export GIT_PAGER=cat
git log
git diff
unset GIT_PAGER

# グローバル設定でページャーを無効化（非推奨）
git config --global core.pager cat

# 特定のコマンドのみページャーを無効化
git config --global pager.status false
git config --global pager.branch false

# 設定の確認と削除
git config --get core.pager
git config --unset core.pager

```

### よくある使用場面

```bash
# 1. コミットハッシュを変数に取得
latest_commit=$(git --no-pager log -1 --pretty=format:"%H")
echo "最新コミット: $latest_commit"

# 2. 変更ファイル一覧をループ処理
for file in $(git --no-pager diff --name-only); do
    echo "処理中: $file"
    # ファイルごとの処理...
done

# 3. ブランチ情報の取得
current_branch=$(git --no-pager branch --show-current)
echo "現在のブランチ: $current_branch"

# 4. タグ情報の出力
git --no-pager tag --list | head -5

# 5. 統計情報のレポート生成
echo "=== プロジェクト統計 ===" > report.txt
echo "ブランチ数: $(git --no-pager branch --all | wc -l)" >> report.txt
echo "タグ数: $(git --no-pager tag | wc -l)" >> report.txt
echo "今週のコミット数: $(git --no-pager log --oneline --since='1 week ago' | wc -l)" >> report.txt

```

### 注意事項

- `--no-pager`オプションは`git`コマンドの直後に指定する必要があります
- 大量の出力がある場合、端末がスクロールしてしまう可能性があります
- 対話的な作業では通常ページャーがある方が便利です
- スクリプトや自動化でのみ使用することを推奨します

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
