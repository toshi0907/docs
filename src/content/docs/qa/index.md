---
title: "Q&A"
description: "GitHub Issue で寄せられた質問と、その回答をまとめた一覧です。"
sidebar:
  label: "Q&A 一覧"
  order: -100000
---

GitHub Issue で寄せられた簡単な質問と、その回答をまとめた一覧です。個々の質問への回答は専用ページとして作成し、ここからリンクしています。

## 運用の流れ

1. 質問を GitHub Issue として起票する（[質問用テンプレート](https://github.com/toshi0907/docs/issues/new?template=question.md)）
2. 質問内容に対する回答を `src/content/docs/qa/<issue番号>-<内容を表す英字スラッグ>.md` として作成する
3. 作成したページへのリンクをこの一覧に追加する（Issue 番号の降順）
4. 回答ページへのリンクを Issue にコメントし、Issue をクローズする

ページ作成の詳細な規約（フロントマター、見出し構成など）は `claude-instructions.md` の「Issueからの回答ページ作成」を参照してください。

## 質問一覧

- **[シェルスクリプトでコマンド結果を配列に入れる方法](/docs/qa/144-bash-command-output-to-array/)** - bash でコマンドの実行結果を配列に格納する方法（`mapfile`、`read -a` など）（Issue [#144](https://github.com/toshi0907/docs/issues/144)）
