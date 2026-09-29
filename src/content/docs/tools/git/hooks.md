---
title: "Git: フック"
description: "Git リファレンスのうち、フックについてまとめたページです。"
sidebar:
  label: "フック"
  order: 6
---

## フックとは

Gitフック（Git Hooks）は、Gitの特定のアクションが実行される前後に自動的に実行されるスクリプトです。コミット、プッシュ、マージなどの操作時に、カスタムの処理を実行できます。

## フックの種類

### クライアントサイドフック

開発者のローカル環境で実行されるフック：

- **pre-commit**: コミット前に実行（コードチェック、テスト実行）
- **prepare-commit-msg**: コミットメッセージ編集前に実行
- **commit-msg**: コミットメッセージの検証
- **post-commit**: コミット後に実行（通知など）
- **pre-push**: プッシュ前に実行（プッシュの検証）

### サーバーサイドフック

リモートリポジトリで実行されるフック：

- **pre-receive**: プッシュされたデータの受信前に実行
- **update**: ブランチ更新前に実行
- **post-receive**: プッシュ完了後に実行（デプロイ、通知）

## フックの場所

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

## 基本的なフックの作成

### pre-commitフックの例（コードの構文チェック）

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

### commit-msgフックの例（コミットメッセージの形式チェック）

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

### pre-pushフックの例（テスト実行）

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

## フックの管理

### フックの有効化と無効化

```bash
# フックを無効化（ファイル名に.disabledを追加）

mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled

# フックを再有効化

mv .git/hooks/pre-commit.disabled .git/hooks/pre-commit

# フックをスキップしてコミット（一時的）

git commit --no-verify -m "コミットメッセージ"

```

### チーム全体でフックを共有

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

### フックのテスト

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

## 高度なフック例

### post-receiveフック（自動デプロイ）

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

### pre-commitフック（複数の検証を実行）

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

## リポジトリ情報の取得（rev-parse）

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
