---
title: "Git: コマンド一覧"
description: "Git リファレンスのうち、Git コマンド一覧についてまとめたページです。"
sidebar:
  label: "コマンド一覧"
  order: 7
---

以下は Git に組み込まれている主なコマンドをカテゴリ別に列挙したものです。最新版の全コマンドは `git help -a` でご確認いただけます。

---

## 1. 基本的な Porcelain コマンド

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
  # 基本的な使用法
  git diff                        # ワーキングディレクトリとステージングエリアの差分
  git diff HEAD~1                 # 直前のコミットとの差分
  git diff --cached               # ステージングエリアとHEADの差分
  
  # 終了コードを利用（CI/CDでの差分チェックに便利）
  git diff --exit-code            # 差分があれば終了コード1、なければ0で終了
  git diff --quiet                # --exit-codeと同じ（出力なし）
  
  # 出力形式の制御
  git diff --name-only            # 変更されたファイル名のみ表示
  git diff --stat                 # 統計情報を表示（追加/削除行数）
  git diff --numstat              # 数値形式の統計情報
  git diff --name-status          # ファイル名と変更ステータス（A/M/D）
  
  # 比較対象の指定
  git diff branch1..branch2       # ブランチ間の差分
  git diff --no-index file1 file2 # Git管理外ファイルの比較
  
  # 差分の詳細制御
  git diff -w                     # 空白の違いを無視
  git diff --word-diff            # 単語レベルの差分表示
  
  # ページャーを無効化（スクリプトや自動化で便利）
  git --no-pager diff             # ページャーなしで差分表示
  git --no-pager diff --name-only # ファイル名のみページャーなしで表示
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
  git log --oneline -10
  git log --since="1 week ago"
  git log --author="name"
  git log --grep="bug fix"
  git --no-pager log --oneline -5
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
  git status -s                   # 短縮形式で表示
  git status --porcelain          # スクリプトで処理しやすい形式
  git status --branch             # ブランチ情報も表示
  git --no-pager status           # ページャーなしで状態表示
  git --no-pager status -s        # 短縮形式でページャーなし
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

## 2. 低レベル（Plumbing）コマンド

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

## 3. ネットワーク／サーバ向けコマンド

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

## 4. ヘルプ・設定・ユーティリティ

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
