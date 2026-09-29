---
title: "Git: 便利なコマンド"
description: "Git リファレンスのうち、便利なコマンドについてまとめたページです。"
sidebar:
  label: "便利なコマンド"
  order: 5
---

## 作業の一時保存

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

## ファイルの操作

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

## ブランチとコミットの分析

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

## タグ

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

## git-new-workdir

`git-new-workdir`は、同一リポジトリの複数の作業ディレクトリを作成するGitのユーティリティスクリプトです。同じリポジトリで複数のブランチを同時に作業したい場合に非常に便利です。

### git-new-workdirとは

通常、一つのリポジトリでは一度に一つのブランチしかチェックアウトできませんが、`git-new-workdir`を使用することで、同じリポジトリのデータを共有しながら複数の作業ディレクトリを持つことができます。

### インストールと設定

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

### 基本的な使用方法

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

### 実用的な使用例

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

### Windows環境での考慮事項

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

### git worktreeとの比較

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

### 注意事項

- リポジトリサイズに応じて共有される`.git`ディレクトリが複数の作業ディレクトリから参照される
- 同じブランチを複数の作業ディレクトリでチェックアウトすることは避ける
- 作業ディレクトリを削除する際は、適切にクリーンアップを行う
- Windows環境では`git worktree`の使用を推奨

## git worktree

`git worktree`は、Git 2.5以降で導入された公式機能で、一つのリポジトリから複数の作業ディレクトリを管理することができます。同じリポジトリで複数のブランチを同時に作業する際に非常に便利です。

### git worktreeとは

`git worktree`を使用することで、同一リポジトリの異なるブランチを別々のディレクトリで同時に作業できます。従来の`git-new-workdir`とは異なり、Git本体に組み込まれた公式機能のため、より安全で安定した動作が期待できます。

### 基本的な概念

- **メインワークツリー**: 通常の`.git`ディレクトリを含むリポジトリ
- **リンクワークツリー**: メインワークツリーから作成される追加の作業ディレクトリ
- **共有**: `.git`ディレクトリの大部分がメインワークツリーと共有される
- **独立性**: 各ワークツリーで異なるブランチを独立してチェックアウト可能

### 基本的な使用方法

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

### 実用的な使用例

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

### ワークツリーの管理

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

### 高度な使用方法

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

### ワークフロー例：並行開発

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

### 注意事項とベストプラクティス

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

### パフォーマンスと容量の考慮事項

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

### git-new-workdirとの比較

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

### トラブルシューティング

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

## diff-highlight

`diff-highlight`は、Gitの差分表示をより読みやすくするためのツールです。変更された行内で、実際に変更された部分のみをハイライト表示します。

### diff-highlightとは

通常のGitの差分表示では、行全体が変更されたように表示されますが、`diff-highlight`を使用することで、行内の実際に変更された部分のみが強調表示され、コードレビューや変更内容の確認が格段に効率的になります。

### インストール方法

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

### 手動インストール

```bash
# Gitリポジトリから直接取得
curl -o ~/bin/diff-highlight \
  https://raw.githubusercontent.com/git/git/master/contrib/diff-highlight/diff-highlight
chmod +x ~/bin/diff-highlight

# PATHに~/binが含まれていることを確認
echo $PATH
```

### Gitとの統合設定

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

### 使用例

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

### 色の設定カスタマイズ

```bash
# ハイライト色をカスタマイズ
git config --global color.diff-highlight.oldNormal 'red bold'
git config --global color.diff-highlight.oldHighlight 'red bold 52'
git config --global color.diff-highlight.newNormal 'green bold'
git config --global color.diff-highlight.newHighlight 'green bold 22'

# デフォルト色の確認
git config --get-regexp color.diff-highlight
```

### 高度な設定例

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

### 動作確認とテスト

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

### トラブルシューティング

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

### 他のツールとの組み合わせ

```bash
# delta（より高機能な差分表示ツール）と組み合わせ
git config --global core.pager 'delta'
git config --global interactive.diffFilter 'delta --color-only'

# diff-so-fancyとの組み合わせ
git config --global core.pager 'diff-so-fancy | less --tabs=4 -RFX'
```

## カスタムGitコマンドの作成

### カスタムGitコマンドとは

Gitでは、`git-` で始まる実行可能ファイルを作成することで、独自のGitサブコマンドを作成できます。これにより、頻繁に使用するコマンドの組み合わせを簡単に呼び出したり、プロジェクト固有の操作を自動化したりできます。

### 基本的な作成方法

```bash
# 1. スクリプトファイルを作成（例：git-origcmd）
sudo nano /usr/local/bin/git-origcmd

# 2. 実行権限を付与
sudo chmod +x /usr/local/bin/git-origcmd

# 3. 使用方法
git origcmd  # git-origcmd スクリプトが実行される
```

### 実用的な例

#### git-origcmd（オリジナルコマンドの例）

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

#### その他の便利なカスタムコマンド例

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

### インストールと管理

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

### 注意事項とベストプラクティス

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
