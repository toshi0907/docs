---
title: "Git: 基本操作"
description: "Git リファレンスのうち、基本操作についてまとめたページです。"
sidebar:
  label: "基本操作"
  order: 3
---

## ファイルの追加とコミット

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

## インタラクティブステージング

`git add -i` を使用すると、対話的にファイルをステージングできます。これにより、ファイルの一部分のみをコミットに含めることが可能になります。

```bash
# インタラクティブモードを開始

git add -i

```

### インタラクティブメニューの項目

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

### パッチモード（部分的なステージング）

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

### 実用的な使用例

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

### インタラクティブステージングのメリット

- **精密なコミット管理**: 関連する変更のみをグループ化
- **レビュー向け**: 論理的な単位でコミット履歴を整理
- **実験的変更の分離**: テスト用コードと実装を分けてコミット
- **段階的な作業**: 大きな変更を小さなコミットに分割

## 履歴の確認

### 基本的なログ表示

```bash
# コミット履歴を表示
git log

# 簡潔な履歴を表示
git log --oneline

# グラフ表示
git log --graph --oneline --all

# 特定のファイルの履歴
git log filename.txt

# 最新のN件のコミットを表示
git log -n 5
git log -5

# 詳細な差分も含めて表示
git log -p
git log --patch

```

### 日付とコミット範囲での絞り込み

```bash
# 特定の日付以降のコミット
git log --since="2024-01-01"
git log --after="2024-01-01"

# 特定の日付より前のコミット
git log --until="2024-12-31"
git log --before="2024-12-31"

# 日付範囲でのフィルタリング
git log --since="2024-01-01" --until="2024-12-31"

# 相対的な日付指定
git log --since="1 week ago"
git log --since="2 days ago"
git log --since="1 month ago"

# 特定のコミット間の履歴
git log commit1..commit2
git log HEAD~5..HEAD

```

### 作者とコミッターでの絞り込み

```bash
# 特定の作者のコミット
git log --author="John Doe"
git log --author="john@example.com"

# 部分マッチでの検索
git log --author="john"

# 特定のコミッターのコミット
git log --committer="John Doe"

# 複数の作者を指定（正規表現）
git log --author="John\|Jane"

```

### コミットメッセージでの検索

```bash
# コミットメッセージに特定の文字列を含むコミット
git log --grep="bug fix"
git log --grep="feature"

# 大文字小文字を区別しない検索
git log --grep="BUG" --regexp-ignore-case

# 複数のキーワードでの検索（AND条件）
git log --grep="bug" --grep="fix" --all-match

# 複数のキーワードでの検索（OR条件）
git log --grep="bug\|fix"

```

### ファイル変更での絞り込み

```bash
# 特定のファイルに関連するコミット
git log -- filename.txt
git log -- src/main.js

# 複数のファイル
git log -- file1.txt file2.txt

# ディレクトリ内のファイル
git log -- src/

# ファイル名変更を追跡
git log --follow -- filename.txt

# 削除されたファイルの履歴も含む
git log --full-history -- filename.txt

```

### 出力フォーマットのカスタマイズ

```bash
# カスタムフォーマット
git log --pretty=format:"%h - %an, %ar : %s"
git log --format="%C(yellow)%h%Creset %C(blue)%an%Creset %C(green)%ar%Creset %s"

# 定義済みのフォーマット
git log --pretty=oneline
git log --pretty=short
git log --pretty=medium
git log --pretty=full
git log --pretty=fuller

# 統計情報も表示
git log --stat
git log --shortstat
git log --name-only
git log --name-status

```

### 高度なログオプション

```bash
# マージコミットを除外
git log --no-merges

# マージコミットのみ表示
git log --merges

# 特定のブランチのコミット（他のブランチにないもの）
git log main..feature-branch
git log ^main feature-branch

# 全ブランチのコミット
git log --all

# リモートブランチも含む
git log --all --remotes

# グラフ表示の詳細設定
git log --graph --all --decorate --oneline
git log --graph --pretty=format:"%C(red)%h%Creset -%C(yellow)%d%Creset %s %C(green)(%cr) %C(bold blue)<%an>%Creset"

```

### ページャーの制御

```bash
# ページャーを無効にして出力
git --no-pager log

# 一時的にページャーを無効化（他のコマンドでも有効）
git --no-pager log --oneline -10
git --no-pager status
git --no-pager diff

# 環境変数でページャーを無効化
export GIT_PAGER=cat
git log

# lessの代わりにcatを使用（スクロールなし）
git config --global core.pager cat

# ページャー設定を一時的に無効化
git -c core.pager=cat log

```

### 実用的なログコマンドの例

```bash
# 今週の自分のコミット
git log --author="$(git config user.name)" --since="1 week ago" --oneline

# 今日の全員のコミット
git log --since="1 day ago" --all --oneline

# 特定の機能に関する変更履歴
git log --grep="authentication" --oneline

# ファイル変更の詳細履歴
git log -p --follow -- important-file.txt

# ブランチ間の差分コミット
git log main..feature --oneline

# 統計情報付きの週次レポート
git log --since="1 week ago" --stat --oneline

```

## 変更の確認

```bash
# 作業ディレクトリの変更を表示

git diff

# ステージングエリアの変更を表示

git diff --cached

# 特定のコミット間の差分

git diff commit1 commit2

```
