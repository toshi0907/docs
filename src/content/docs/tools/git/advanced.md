---
title: "Git: 応用テクニック集"
description: "Git リファレンスのうち、応用テクニック集についてまとめたページです。"
sidebar:
  label: "応用テクニック集"
  order: 9
---

## 履歴調査コマンド

コミット「メッセージ」を検索する`--grep`とは異なり、差分（コード内容そのもの）を対象に履歴を調査するためのコマンド群です。

```bash
# "calculateTotal" という文字列の追加・削除があったコミットを検索(pickaxe)
git log -S"calculateTotal" --oneline

# 正規表現で検索したい場合(-Gは差分内の行が正規表現にマッチするか)
git log -G"function\s+calculateTotal" --oneline

# 該当コミットの実際の差分も一緒に表示
git log -S"calculateTotal" -p -- src/utils.js

# 指定した行範囲(10〜20行目)の変更履歴を差分付きで時系列に表示
git log -L 10,20:src/utils.js

# 関数名を指定して、その関数の変更履歴を追跡(対応言語のみ)
git log -L :calculateTotal:src/utils.js
```

`git blame`はさらにオプションを組み合わせることで調査の精度を上げられます。`-w`で空白(インデント修正など)の変更を無視し、`-C`でリネーム・移動をまたいだ検出を行い、`-L`で行範囲を絞り込みます。

```bash
# 空白の変更を無視してblameを実行
git blame -w src/app.js

# 他ファイルからのコピー・移動も検出対象にする(-Cを重ねるほど検出範囲が広がる)
git blame -C -C -- src/app.js

# 特定の行範囲だけに絞って表示
git blame -L 100,150 src/app.js

# 組み合わせて使うことも可能
git blame -w -C -L 100,150 src/app.js
```

`git cherry-pick`(特定コミットを取り込む)とは別に、`git cherry`は「このブランチのコミットのうち、まだ向こう側に取り込まれていないものはどれか」を差分内容ベースで判定してくれます。リリースブランチへのバックポート漏れ確認などに便利です。

```bash
# upstream(例: main)にまだ取り込まれていない、現在のブランチ独自のコミットを一覧表示
git cherry -v main
# 出力の先頭が「+」は未取り込み、「-」は内容的に取り込み済み(コミットハッシュが違っても
# rebase/cherry-pickで内容が同じなら「-」と判定される)
```

「このコミットはどのブランチ・どのタグに含まれているか」を調べたい場合は`--contains`を使います。デプロイ状況の確認やバックポート漏れの調査に役立ちます。

```bash
# 指定コミットを含むローカルブランチの一覧
git branch --contains abc1234
git branch -a --contains abc1234

# 指定コミットを含むタグの一覧(=どのリリースから含まれているか)
git tag --contains abc1234
```

## 安全な取り消しとコンフリクト解決

`git reset`はオプションによって「ステージング内容」「作業ツリーの内容」がどこまで巻き戻るかが変わります。違いを理解せず使うと変更を失う事故につながるため、それぞれの意味を正しく覚えておく必要があります。

```bash
# --soft: HEADだけ移動。ステージング・作業ツリーの内容はそのまま維持
# → コミットをやり直したい(内容は残したまま1つ前に戻ってコミットし直す)時
git reset --soft HEAD~1

# --mixed(デフォルト): HEADとステージングを戻すが、作業ツリーのファイル内容は維持
# → コミットもステージも取り消して、また add からやり直したい時
git reset HEAD~1

# --hard: HEAD・ステージング・作業ツリーの内容すべてを指定コミットの状態に戻す
# → 変更ごと完全に破棄したい時(未コミットの変更は失われるので要注意)
git reset --hard HEAD~1
```

`git clean`は追跡外ファイルを一括削除するコマンドです。`rm -rf`と違い誤って必要なファイルを消すと復元できないため、必ず`-n`(dry-run)で確認してから実行するのが鉄則です。

```bash
# 削除対象を確認するだけ(実際には削除しない)
git clean -n -d

# .gitignoreされているファイルも対象に含めて確認
git clean -n -d -x

# 確認後、実際に削除を実行
git clean -f -d

# .gitignore対象(node_modules, dist等)も含めて削除(誤って消したくない場合は要注意)
git clean -f -d -x
```

マージコンフリクトが発生したファイルについて、中身を1行ずつ手で直さなくても「自分側」または「取り込む側」の内容をそのまま採用したい場合は`checkout --ours`/`--theirs`(または`restore --ours`/`--theirs`)が使えます。

```bash
# マージ中、自分側(現在のブランチ)の内容でファイルを確定させる
git checkout --ours package-lock.json
git add package-lock.json

# 取り込む側(マージ元ブランチ)の内容で確定させる
git checkout --theirs src/config.yml
git add src/config.yml

# 新しいGitではrestoreも使える(用途が「復元」であることが明確)
git restore --ours package-lock.json
git restore --theirs src/config.yml

# rebase中は「ours/theirs」の意味が逆転する点に注意
git rebase main
git checkout --theirs src/config.yml
```

featureブランチをmainに統合する際、`--no-ff`(前述)以外に`--squash`という選択肢もあります。個人の試行錯誤ブランチや細かいWIPコミットの塊を1つのコミットにまとめて取り込みたい場合に使います。

```bash
# featureブランチの全コミットを1つにまとめて取り込む(マージコミットは作られない)
git merge --squash feature/experimental
git commit -m "feat: 実験的機能をまとめて統合"
```

## bisectとrebaseの自動化

`git bisect`(基本操作は前述)は、実務ではもう一歩踏み込んだ使い方が必要になることがあります。

```bash
# ある中間コミットがビルド不能・テスト環境が壊れているなどで判定不能な場合
git bisect skip

# 複数コミットをまとめてスキップ範囲指定することも可能
git bisect skip HEAD~5..HEAD~3

# 「バグの有無」ではなく「速度」のような別の二値評価をしたい場合、
# good/badの代わりに用語を変更できる
git bisect start --term-old=fast --term-new=slow
git bisect slow          # 現在(遅い)
git bisect fast v1.2.0   # 過去(速かった)時点
```

`git bisect run ./test.sh`にテストスクリプトを渡すと全自動化できます。スクリプトが終了コード125を返すとGitはそのコミットを自動的にskip扱いにしてくれるため、判定不能なコミットを含む範囲でも探索を止めずに進められます。

`rebase -i`で履歴を並べ替えるだけでなく、各コミットが適用されるたびに任意のコマンド(テストなど)を自動実行させることもできます。「どのコミットからテストが壊れ始めたか」を手動でチェックアウトを繰り返さずに特定できます。

```bash
# 直近5コミットの、各コミット適用後にテストを実行
git rebase -i --exec "npm test" HEAD~5

# 対話画面を経由せず直接実行する場合
git rebase --exec "npm test" HEAD~5

# 途中のコミットでテストが失敗すると停止するので、修正してから再開
git rebase --continue
```

## rebaseの応用テクニック

複数の小さな修正コミットを、最終的に1つのわかりやすい履歴にまとめる際は`--fixup`と`--autosquash`の組み合わせが便利です。

```bash
# 「このコミットは○○コミットの修正だよ」と紐付けてコミット
git commit --fixup <対象コミットのハッシュ>

# rebase時に自動で該当コミットの直後に並べ替えてsquash対象としてマークしてくれる
git rebase -i --autosquash HEAD~5

# 差分に加えてコミットメッセージも書き直したい場合
git commit --fixup=amend:<対象コミットのハッシュ>

# 差分はなく、コミットメッセージだけを直したい場合
git commit --fixup=reword:<対象コミットのハッシュ>
```

`--onto`を使うと、通常の`rebase`のようにブランチ全体を移動するのではなく「特定の範囲のコミットだけ」を任意の場所に付け替えられます。誤って別ブランチから分岐してしまった時などに便利です。

```bash
# <newbase> より後、<upstream> より後ろの範囲を現在のブランチに付け替える
git rebase --onto <newbase> <upstream>

# 例: feature/A から間違えて分岐した feature/B を、本来の main 起点に付け替える
git rebase --onto main feature/A feature/B
```

複数のブランチが連鎖している「スタックドブランチ」構成(`feature/a` → `feature/b` → `feature/c`)で根元のブランチをrebaseすると、通常は上位のブランチだけ古いコミットを指したまま取り残されます。Git 2.38以降の`--update-refs`を使うと、rebase対象のコミット範囲に含まれる各ブランチの参照も自動的に新しい位置へ更新してくれます。

```bash
# featureブランチの連鎖(A -> B -> C)をrebase対象範囲に含むブランチごと更新
git rebase --update-refs main

# デフォルトで常に有効化しておくことも可能
git config rebase.updateRefs true
```

通常の`rebase`はマージコミットを平坦化してしまいますが、`--rebase-merges`を使うとトピックブランチ内のマージ構造を保ったままベースだけを付け替えられます。

```bash
# マージコミットの構造を保持しつつ、対話的にrebase
git rebase -i --rebase-merges main
```

rebaseやmerge時に発生するコンフリクトのうち「基本的に片方を優先したい」場合は`-X ours`/`-X theirs`で自動解決できます。行単位でマージを試みた上で優先側を選ぶため、`checkout --ours`/`--theirs`より安全に使える場面があります。

```bash
# rebase中、コンフリクトした行は基本的に自分側(rebase先のブランチ)を優先する
git rebase -X ours feature/base-branch

# マージ時に相手側の変更を優先したい場合
git merge -X theirs feature/other-branch
```

`ours`/`theirs`の意味はrebaseとmergeで向きが逆になる点に注意してください(rebaseでは「今チェックアウトしているブランチ」が`theirs`扱いになります)。

## ブランチとリモートの管理

開発が進むとローカル・リモートにマージ済みブランチが溜まっていきます。`--merged`(取り込み済み)と`--no-merged`(未取り込み)でフィルタすると、削除して良いブランチが一目でわかります。

```bash
# 現在のブランチにマージ済みのブランチ一覧(削除候補)
git branch --merged main

# まだマージされていないブランチ一覧
git branch --no-merged main

# マージ済みブランチをまとめて削除(mainブランチ自体は除外)
git branch --merged main | grep -v '^\*\|main$' | xargs -r git branch -d
```

`git branch -vv`は各ローカルブランチの追跡先リモートブランチと差分コミット数を表示します。`fetch --prune`と組み合わせると、リモートで削除済みのブランチを見つけて整理できます。

```bash
# 各ローカルブランチの追跡先リモートブランチと差分コミット数を表示
git branch -vv
# 例: * feature/login  abc1234 [origin/feature/login: gone] コミットメッセージ

# fetch時にリモートで削除済みのブランチへの追跡参照を自動整理
git fetch --prune

# [gone] と表示された、リモートで削除済みのローカルブランチをまとめて削除
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs -r git branch -D
```

過去のコミット時点のコードを一時的に確認・ビルドしたいだけで、新しいブランチを作る必要がない場合は`git switch --detach`が便利です。ブランチに紐付かない「detached HEAD」状態になり、うっかり既存ブランチの履歴を汚す心配がありません。

```bash
# 特定タグの時点のコードを一時的に確認する
git switch --detach v1.2.0

# ビルドして動作確認したら、ブランチに戻るだけで元の状態に復帰
git switch main

# detached HEAD状態で気に入った変更ができた場合は、その場で新しいブランチとして保存できる
git switch --detach HEAD~3
git switch -c hotfix/from-old-commit
```

ローカルブランチの削除(`branch -d`/`-D`、前述)に対して、リモートブランチの削除は別コマンドです。

```bash
# リモートブランチを削除
git push origin --delete feature/done

# 上と同義の書き方(空refへのpush)
git push origin :feature/done
```

歴史の長い巨大リポジトリをフルクローンすると時間もディスク容量も消費します。`--depth`で直近の履歴だけを取得する「浅い(shallow)クローン」にしておき、必要になった時だけ履歴を掘り下げると効率的です。

```bash
# 直近1コミットだけ取得する浅いクローン
git clone --depth 1 https://github.com/example/huge-repo.git

# 後から全履歴が必要になった場合、shallowを解除して取得
git fetch --unshallow

# 現在のリポジトリがshallowかどうかを確認
git rev-parse --is-shallow-repository
```

`--depth`によるshallow cloneが「コミット履歴」を制限するのに対し、Partial Cloneは`blob`(ファイル内容)や`tree`オブジェクトの取得を実際に必要になるまで遅延させます。巨大リポジトリのclone/fetchを大幅に高速化できます。

```bash
# blobオブジェクトの取得を遅延(ファイル内容は必要時に取得)
git clone --filter=blob:none https://example.com/repo.git

# treeオブジェクトも省略するさらに軽量なclone
git clone --filter=tree:0 https://example.com/repo.git
```

画像・動画・デザインファイルなど大容量のバイナリをGit本体の履歴に直接含めず、軽量なポインタファイルとして参照したい場合はGit LFS(Large File Storage)拡張機能を使います。

```bash
git lfs install
git lfs track "*.psd"
git add .gitattributes
git add design.psd
git commit -m "Add design file via LFS"
git push origin main
git lfs pull
```

自分のブランチの変更内容を、レビュー依頼用のテキスト(差分の要約とpull先URL)としてまとめて出力したい場合は`git request-pull`が使えます。GitHub等のPull Request機能がない環境でも、メールなどでレビュー依頼を送る際の伝統的な手法です。

```bash
git request-pull origin/main https://github.com/user/repo.git feature-branch
```

`origin/main`から`feature-branch`までの差分概要(diffstat付き)とpull元URLがテキストとして出力されるので、そのままメール本文などに貼り付けられます。

`git remote show`(前述)がリモートの状態を一覧表示するのに対し、`git remote prune`は明示的に単独で追跡ブランチの掃除だけを実行したい場合に使います。

```bash
git remote prune origin --dry-run  # 削除される追跡ブランチを事前確認
git remote prune origin            # 削除済みブランチの追跡情報を実際に削除
```

## 差分と比較の応用

`git diff`や`git log`でブランチ間を比較する際、`A..B`と`A...B`は見た目が似ていますが意味が異なり、混同するとレビュー時に誤った差分を見てしまうことがあります。

```bash
# 2ドット: 単純に「BにあってAにない」コミット/差分(片方向)
git log main..feature/login
git diff main..feature/login

# 3ドット: AとBの共通の祖先(マージベース)を基準にした差分
# 「featureブランチだけで発生した変更」を見たい時はこちらが正解
git log main...feature/login
git diff main...feature/login

# 3ドットlogは --left-right を付けると、どちらのブランチのコミットか記号で区別できる
git log --left-right --oneline main...feature/login
```

`main`が先に進んでいる状況で`diff main..feature`を使うと、featureの変更に加えてmain側の差分まで逆向きに混ざって見えてしまうため、ブランチのレビューには基本的に3ドット(`...`)を使うのが安全です。

ファイルが「追加された」「削除された」「変更された」など、変更の種類ごとにログを絞り込みたい場合は`--diff-filter`を使います。

```bash
# 追加されたファイルのみを含むコミットを表示
git log --diff-filter=A --oneline -- src/

# 削除されたファイルのみを含むコミットを表示(いつ・誰が消したか調査)
git log --diff-filter=D --oneline --summary -- src/legacy.js

# 複数の種別を組み合わせる(追加または削除)
git log --diff-filter=AD --oneline
```

主なフィルタ文字は`A`(追加)`D`(削除)`M`(変更)`R`(リネーム)`C`(コピー)です。大文字小文字を反転(`--diff-filter=a`のように小文字)すると「それ以外」を意味します。

実際にブランチをチェックアウト・マージすることなく、「もし今マージしたらコンフリクトするか」をシミュレーションしたい場合は`git merge-tree --write-tree`(Git 2.38+)が使えます。CIでのマージ可否チェックなどに便利です。

```bash
# 現在のHEADにfeatureブランチをマージした場合の結果をシミュレーション
git merge-tree --write-tree HEAD feature/login

# 終了コードでも判定可能(0: クリーンにマージ可能、1: コンフリクトあり)
git merge-tree --write-tree main feature/login; echo $?
```

マージのたびに枝分かれした個々のコミットを飛ばし、mainブランチに直接反映された主要な流れだけを追いたい場合は`--first-parent`を使います。リリース履歴の概観把握に向いています。

```bash
git log --first-parent --oneline main
```

`git push`はデフォルトではタグを自動送信しません。`--tags`(前述)は全タグを一括でpushしますが、無関係な古いタグまで送ってしまう可能性があります。`--follow-tags`は今回pushするコミットに到達可能な注釈付きタグ(annotated tag)だけを一緒に送る、より安全な方法です。

```bash
git tag -a v1.2.0 -m "release v1.2.0"
git push --follow-tags origin main
```

## 署名と信頼性の検証

誰がそのコミットやタグを作成したかを暗号学的に証明したい場合は、GPG鍵を使った署名機能を使います。オープンソースプロジェクトや、なりすましコミットを防ぎたい組織のリポジトリで採用されています(GPG鍵自体の登録・自動署名設定は前述)。

```bash
# 個別のコミットに署名
git commit -S -m "feat: 重要な変更"

# タグにも署名(リリースタグでは-aの代わりに-sを使う)
git tag -s v1.0.0 -m "Release 1.0.0"

# 署名の検証状態をログと一緒に確認
git log --show-signature -1

# コミット・タグの署名だけを個別に検証
git verify-commit abc1234
git verify-tag v1.0.0
```

GitHub/GitLabではVerifiedバッジとして表示されるため、リリースタグだけでも署名しておくと配布物の信頼性を示せます。出力に`Good signature`と表示されれば検証成功です。

## リポジトリの内部構造と最適化

コミット同士の親子関係を専用ファイルに事前計算して保存し、`git log --graph`や`git merge-base`などの探索処理を高速化する仕組みが`git commit-graph`です。大規模リポジトリで効果が大きくなります。

```bash
git commit-graph write --reachable
git config core.commitGraph true

# パスごとの変更情報も含めてさらに高速化(git log -- <path> 系が速くなる)
git commit-graph write --changed-paths
```

`git branch`や`git tag`よりも柔軟に、参照(ref)の情報をテンプレート形式で取り出せるのが`git for-each-ref`です。スクリプトで「最終更新日順にブランチを並べる」といった処理を書く時に重宝します。

```bash
# ブランチを最終コミット日時の新しい順に、日時と一緒に一覧表示
git for-each-ref --sort=-committerdate --format='%(committerdate:short) %(refname:short)' refs/heads/

# v1系のタグだけを作成日時付きで抽出
git for-each-ref --sort=-creatordate --format='%(creatordate:short) %(refname:short)' refs/tags/v1.*
```

モノレポなどでリポジトリ全体が非常に大きい場合に、必要なディレクトリだけをチェックアウトしてディスク使用量やチェックアウト時間を削減できるのが`git sparse-checkout`です。

```bash
# sparse-checkoutを有効化(cone modeを推奨)
git sparse-checkout init --cone

# 展開したいディレクトリを指定
git sparse-checkout set frontend/ shared/

# 対象を追加/変更
git sparse-checkout add backend/api

# 全体を再び展開して無効化
git sparse-checkout disable
```

`clone --filter=blob:none --sparse`と組み合わせると、履歴のダウンロード自体も抑えられ、巨大リポジトリでの初回clone速度が大きく改善します。

`git submodule`(前述)と同じく「別リポジトリをプロジェクトに組み込む」ための機能ですが、`git subtree`はポインタ管理ではなく実体のファイルをそのまま履歴に取り込むため、clone時に特別な操作が不要になります。

```bash
# 別リポジトリをsubtreeとして指定ディレクトリに取り込む(squashで履歴を1コミットにまとめる)
git subtree add --prefix=libs/example https://github.com/example/lib.git main --squash

# 取り込んだsubtreeを最新状態に更新
git subtree pull --prefix=libs/example https://github.com/example/lib.git main --squash

# 逆に、自分のリポジトリ内の変更を元のリポジトリへ還元する
git subtree push --prefix=libs/example https://github.com/example/lib.git main
```

チームメンバーがsubmodule特有のコマンドを意識せずに済むのが利点ですが、親リポジトリの履歴が肥大化しやすい点はトレードオフです。

誤ってコミットしてしまった認証情報や、リポジトリを肥大化させている巨大バイナリを履歴ごと消したい場合は`git filter-repo`を使います。古くからある`git filter-branch`は低速かつ罠が多いため非推奨とされており、公式にも後継の`git-filter-repo`(別途インストールが必要な外部ツール)が推奨されています。

```bash
# インストール(pipなどで配布)
pip install git-filter-repo

# 特定ファイルを全履歴から完全に削除
git filter-repo --path secrets/config.json --invert-paths

# 特定の拡張子をまとめて履歴から除去(巨大バイナリの整理など)
git filter-repo --path-glob '*.mp4' --invert-paths

# 実行後はリモートへの force push と、関係者全員の再clone(または履歴の再取得)が必須
git push origin --force --all
```

履歴そのものを書き換える破壊的操作のため、実行前に必ずバックアップを取り、チーム全員に周知したうえで行う必要があります。漏洩した認証情報は履歴から消しても「一度でも公開された」事実は変わらないため、削除に加えて必ず失効・再発行も行いましょう。

コードスタイル統一のための一括フォーマット(Prettier適用など)を行うと、以降の`git blame`がそのコミットばかり指してしまい、本来の変更者が追いにくくなります。無視したいコミットのハッシュをファイルにまとめておくことで解決できます。

```bash
# 無視したいコミットハッシュを記載したファイルを作成
cat > .git-blame-ignore-revs << 'EOF'
# 2026-08-10 Prettier一括適用
a1b2c3d4e5f6...
EOF

# blame実行時に無視ファイルを指定
git blame --ignore-revs-file .git-blame-ignore-revs src/app.js

# 毎回指定しなくて済むようリポジトリ設定に登録
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

GitHub/GitLab上のblame表示もこのファイルを認識するため、チーム全体でコミットしておくと効果的です。

`.gitattributes`(前述)はファイルパスのパターンごとにdiff/mergeの挙動なども制御できます。

```bash
# 特定拡張子はバイナリ扱いにしてdiffを取らない
*.png binary
*.pdf binary

# package-lock.jsonなどはマージ時に「常に自分側(ours)を採用」させる
package-lock.json merge=ours

# 特定ファイルをGitHub上のdiff表示でも常に折りたたむ・除外する
*.min.js -diff linguist-generated=true

# git archive時にテストコードやCI設定など特定のファイル・ディレクトリを除外する
tests/ export-ignore
```

`merge=ours`を使う場合は事前に`git config merge.ours.driver true`の設定が必要です。改行コード起因の無用な差分や、自動生成ファイルでのマージコンフリクトを大幅に減らせます。

Gitのignore設定には3つの階層があります。「リポジトリ全体で共有する`.gitignore`」「マシン全体に効く`core.excludesfile`(前述)」、そして「このクローンだけに効く`.git/info/exclude`」です。チームに共有したくない自分だけのメモファイルや、一時的な検証ファイルを無視したい時に向いています。

```bash
# このリポジトリのクローンだけに効くignoreルールを追記
cat >> .git/info/exclude << 'EOF'
memo.txt
tmp/
EOF
```

`.gitignore`との違いは、こちらはコミット対象にならず、他の人には一切共有されない点です。`.git`ディレクトリ配下にあるため`git clone`し直すと消える点は注意してください。

## その他の便利な機能

`git stash`は全変更を一括退避しますが、実務では「一部だけ退避したい」「退避した内容を別ブランチで育てたい」という場面が多くあります。

```bash
# 変更の一部だけを対話的に選んでスタッシュ
git stash push -p -m "WIP: ログイン処理のみ退避"

# スタッシュから新しいブランチを作成して適用
# (元ブランチが進んでコンフリクトしそうな時に便利)
git stash branch feature/from-stash stash@{0}

# 特定のファイルだけスタッシュに戻す
git checkout stash@{0} -- src/app.js
```

通常の`git stash`は追跡済みファイルの変更しか退避しません。新規作成したファイルや`.gitignore`対象のファイルまで含めて退避したい場合は明示的なオプションが必要です。

```bash
# 追跡済み変更 + 新規untrackedファイルも退避
git stash push --include-untracked -m "作業中の新規ファイル含む"

# .gitignoreされたファイルも含めて全部退避(ビルド成果物なども対象になるので注意)
git stash push --all
```

`--all`は`node_modules`のような巨大な無視ファイルまで拾ってしまうことがあるため、基本は`--include-untracked`を使い、必要なときだけ`--all`を検討するのがおすすめです。

通常コミットは変更差分がないと作成できませんが、`--allow-empty`を使うと差分なしでコミットを作れます。CIパイプラインを手動でトリガーしたい時や、リリースの区切りに目印を打ちたい時などに使います。

```bash
# 差分なしでコミットを作成(CIの再実行トリガーなどに使う)
git commit --allow-empty -m "chore: trigger CI rebuild"
```

乱用すると履歴が読みにくくなるため、用途を明確にしたメッセージを添えて使うのがポイントです。

同じ人物でもマシンやアカウントによってGitの`user.name`/`user.email`が異なると、`git log`や`git shortlog`で別人としてカウントされてしまいます。`.mailmap`ファイルをリポジトリ直下に置くことで、表示上の名前・メールを正規化できます。

```bash
# .mailmap の記述例(リポジトリ直下に作成)
cat > .mailmap << 'EOF'
Taro Yamada <taro@company.com> <taro.yamada@old-email.com>
Taro Yamada <taro@company.com> <t-yamada@laptop.local>
EOF

# 統合後の状態を確認
git log --format="%aN <%aE>" | sort -u
git shortlog -sn
```

過去のコミットハッシュや実際のauthor情報自体は書き換えず、表示だけを正規化する安全な仕組みなので、履歴改変を伴わずに集計・貢献者一覧をきれいにできます。

複数の鍵を使い分けていたり、社内プロキシ経由で接続する必要がある場合、SSH設定ファイルを毎回書き換えずにその場限りの接続設定を指定できるのが`GIT_SSH_COMMAND`環境変数です。

```bash
# 特定の秘密鍵を指定してcloneする
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_work -o IdentitiesOnly=yes" git clone git@github.com:org/repo.git

# 詳細ログを出しながらfetch(接続トラブルの切り分けに便利)
GIT_SSH_COMMAND="ssh -vvv" git fetch origin

# リポジトリ単位で恒久設定したい場合はcore.sshCommandを使う
git config core.sshCommand "ssh -i ~/.ssh/id_work -o IdentitiesOnly=yes"
```

`.gitignore`は基本的なワイルドカードに加え、「一度無視したものを再び対象に含める」否定パターン(`!`)や、階層を問わずマッチする`**`が使えます。ただし否定パターンには「親ディレクトリごと無視されているとファイル単位の否定が効かない」という落とし穴があるので注意してください。

```bash
# distディレクトリ全体を無視するが、重要な設定ファイルだけは対象に含める
dist/
!dist/config.production.json

# 落とし穴: logs/ ごと無視すると中の.gitkeepの否定パターンは効かない
# → ディレクトリ自体ではなく中身をパターンで無視する必要がある
logs/*
!logs/.gitkeep

# 階層を問わず全てのnode_modulesを無視(**は0階層以上にマッチ)
**/node_modules/

# srcディレクトリ直下、任意の深さのtestディレクトリだけを無視
src/**/test/
```
