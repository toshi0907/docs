---
layout: page
title: "GDB リファレンス"
---

# GDB リファレンス

GDB（GNU Debugger）の基本的な使い方から応用的なデバッグテクニックまでの包括的なリファレンスです。C/C++プログラムのデバッグを中心に、効率的なデバッグワークフローとベストプラクティスを説明します。

* 目次
{:toc}

## 基本概念

### GDBとは

GDB（GNU Debugger）は、GNU Projectが開発したフリーソフトウェアのデバッガです。主にC、C++、Ada、Fortran、Go、Rust、Free Pascalなどのプログラムのデバッグに使用されます。

### デバッグの重要性

- **バグの特定**: プログラムの実行時エラーや論理エラーを特定
- **動作の理解**: プログラムの実行フローや変数の状態を確認
- **パフォーマンス分析**: プログラムのボトルネックを特定
- **セキュリティ調査**: 脆弱性や異常な動作の分析

## インストールと環境設定

### Linux環境でのインストール

```bash
# Ubuntu/Debian系
sudo apt update
sudo apt install gdb

# CentOS/RHEL/Fedora系
sudo yum install gdb
# または
sudo dnf install gdb

# Arch Linux
sudo pacman -S gdb

# インストール確認
gdb --version
```

### macOS環境でのインストール

```bash
# Homebrewを使用
brew install gdb

# コード署名の設定（必要な場合）
# GDBがプロセスにアタッチできるよう設定
codesign -s gdb-cert /usr/local/bin/gdb
```

### デバッグ情報付きコンパイル

```bash
# デバッグ情報を含めてコンパイル
gcc -g -o program program.c

# より詳細なデバッグ情報
gcc -g3 -O0 -o program program.c

# C++プログラムの場合
g++ -g -std=c++17 -o program program.cpp

# 最適化を無効にしてデバッグ
gcc -g -O0 -DDEBUG -o program program.c
```

## 基本的な使い方

### GDBの起動と終了

```bash
# プログラムをGDBで起動
gdb ./program

# プログラムに引数を渡す場合
gdb --args ./program arg1 arg2

# 実行中のプロセスにアタッチ
gdb -p <プロセスID>

# コアダンプファイルの解析
gdb ./program core

# GDBの終了
(gdb) quit
```

### 基本的なコマンド

```bash
# プログラムの実行
(gdb) run
(gdb) run arg1 arg2  # 引数付きで実行

# ステップ実行
(gdb) step          # 関数内にステップイン
(gdb) next          # 次の行へ（関数はステップオーバー）
(gdb) continue      # 実行継続

# ブレークポイントの設定
(gdb) break main    # main関数にブレークポイント
(gdb) break 25      # 25行目にブレークポイント
(gdb) break file.c:30  # 特定ファイルの30行目

# 変数の値を表示
(gdb) print variable_name
(gdb) print *pointer
(gdb) print array[0]

# 現在の状態確認
(gdb) where         # スタックトレース表示
(gdb) list          # ソースコード表示
(gdb) info registers # レジスタ情報表示
```

## デバッグ実行の制御

### ブレークポイント管理

```bash
# ブレークポイント一覧表示
(gdb) info breakpoints

# 条件付きブレークポイント
(gdb) break 30 if x > 10

# 関数名でのブレークポイント
(gdb) break function_name

# クラスのメソッドにブレークポイント（C++）
(gdb) break ClassName::methodName

# ブレークポイントの無効化/有効化
(gdb) disable 1     # ブレークポイント1を無効化
(gdb) enable 1      # ブレークポイント1を有効化

# ブレークポイントの削除
(gdb) delete 1      # ブレークポイント1を削除
(gdb) clear         # 現在行のブレークポイントを削除
```

### ウォッチポイント

```bash
# 変数の値が変更されたときに停止
(gdb) watch variable_name

# メモリ読み取り時に停止
(gdb) rwatch variable_name

# メモリ読み書き時に停止
(gdb) awatch variable_name

# ウォッチポイント一覧
(gdb) info watchpoints
```

### ステップ実行の詳細

```bash
# 関数内に入らずに次の行へ
(gdb) next
(gdb) n

# 関数内にステップイン
(gdb) step
(gdb) s

# 現在の関数から抜けるまで実行
(gdb) finish

# 指定した行まで実行
(gdb) until 50

# 次の関数呼び出しまで実行
(gdb) nexti   # アセンブリレベル
(gdb) stepi   # アセンブリレベル
```

## 変数とメモリの調査

### 変数の表示と操作

```bash
# 変数の値を表示
(gdb) print variable
(gdb) p variable     # 短縮形

# 異なる形式での表示
(gdb) print/x variable    # 16進数で表示
(gdb) print/d variable    # 10進数で表示
(gdb) print/t variable    # 2進数で表示
(gdb) print/c variable    # 文字として表示

# ポインタの参照先を表示
(gdb) print *pointer

# 配列の表示
(gdb) print array
(gdb) print array@10      # 配列の最初の10要素を表示

# 構造体の表示
(gdb) print structure
(gdb) print structure.member

# 変数の型情報を表示
(gdb) whatis variable
(gdb) ptype variable      # より詳細な型情報
```

### メモリダンプ

```bash
# メモリの内容を表示
(gdb) x/nfu address
# n: 表示する単位数
# f: 表示形式 (x=16進, d=10進, u=符号なし, o=8進, t=2進, c=文字, s=文字列)
# u: 単位サイズ (b=バイト, h=2バイト, w=4バイト, g=8バイト)

# 例: 16進数で4ワード表示
(gdb) x/4xw 0x400000

# 文字列として表示
(gdb) x/s pointer_to_string

# 命令として表示
(gdb) x/10i $pc          # プログラムカウンタから10命令
```

### 自動表示設定

```bash
# 変数を自動表示に追加
(gdb) display variable_name

# 自動表示一覧
(gdb) info display

# 自動表示の削除
(gdb) undisplay 1        # 表示番号1を削除
(gdb) delete display 1   # 同上
```

## スタックとバックトレース

### スタックフレームの調査

```bash
# スタックトレース表示
(gdb) backtrace
(gdb) bt               # 短縮形
(gdb) bt full          # ローカル変数も表示

# 特定のフレームに移動
(gdb) frame 2          # フレーム2に移動
(gdb) up               # 一つ上のフレーム
(gdb) down             # 一つ下のフレーム

# 現在のフレーム情報
(gdb) info frame
(gdb) info locals      # ローカル変数表示
(gdb) info args        # 引数表示
```

### 関数呼び出しの追跡

```bash
# 関数の開始時に自動で情報表示
(gdb) set trace-commands on

# 関数の呼び出し履歴を記録
(gdb) set logging on
(gdb) set logging file debug.log

# 特定の関数の呼び出し回数を表示
(gdb) break function_name
(gdb) commands
(gdb) silent
(gdb) printf "Function called %d times\n", ++call_count
(gdb) continue
(gdb) end
```

## 高度なデバッグテクニック

### 条件付きデバッグ

```bash
# 条件付きブレークポイント
(gdb) break function_name if parameter == 42

# 複雑な条件
(gdb) break 50 if (x > 10 && y < 20)

# 文字列比較
(gdb) break function_name if strcmp(str, "target") == 0

# ブレークポイントでのアクション
(gdb) break 30
(gdb) commands
(gdb) print "Debug point reached"
(gdb) print variable
(gdb) continue
(gdb) end
```

### マルチスレッドデバッグ

```bash
# スレッド一覧表示
(gdb) info threads

# 特定スレッドに切り替え
(gdb) thread 2

# 全スレッドで同じコマンド実行
(gdb) thread apply all bt

# スレッド固有のブレークポイント
(gdb) break function_name thread 2

# スレッドの実行制御
(gdb) set scheduler-locking on   # 現在のスレッドのみ実行
(gdb) set scheduler-locking off  # 全スレッド実行
```

### コアダンプ解析

```bash
# コアダンプファイルの解析
gdb program_name core_file

# クラッシュ時の状況確認
(gdb) bt                    # クラッシュ時のスタックトレース
(gdb) info registers        # レジスタの状態
(gdb) x/20i $pc            # クラッシュ地点の命令

# シグナル情報の確認
(gdb) info signals
(gdb) info program
```

## GDB設定とカスタマイズ

### .gdbinitファイル

```bash
# ~/.gdbinitファイルの例
set confirm off
set verbose off
set prompt (gdb) 
set history save on
set history size 10000
set history filename ~/.gdb_history

# 自動的にソースディレクトリを設定
set directories /path/to/source

# カスタムエイリアス
define hook-quit
    set confirm off
end

# 便利なコマンド定義
define xxd
    dump binary memory /tmp/dump.bin $arg0 $arg0+$arg1
    shell xxd /tmp/dump.bin
end
```

### デバッグセッションの記録

```bash
# ログ記録開始
(gdb) set logging on
(gdb) set logging file debug_session.log
(gdb) set logging overwrite on

# 出力の詳細設定
(gdb) set verbose on
(gdb) set debug infrun on
```

## 実用的なデバッグシナリオ

### セグメンテーション違反の調査

```bash
# プログラム実行でセグフォルト発生
(gdb) run

# Program received signal SIGSEGV
# クラッシュ地点の確認
(gdb) bt
(gdb) list

# 問題の変数を調査
(gdb) print pointer
(gdb) x/10xw pointer

# メモリマップの確認
(gdb) info proc mappings
```

### メモリリークの検出準備

```bash
# Valgrindと組み合わせた使用
valgrind --tool=memcheck --leak-check=full --db-attach=yes ./program

# GDB内でのメモリ確認
(gdb) call malloc_stats()
(gdb) call malloc_info(0, stdout)
```

### パフォーマンス問題の調査

```bash
# プロファイリング用ブレークポイント
(gdb) break expensive_function
(gdb) commands
(gdb) silent
(gdb) print "Called at:", clock()
(gdb) continue
(gdb) end

# システムコール追跡
(gdb) catch syscall
(gdb) catch syscall read
(gdb) catch syscall write
```

## トラブルシューティング

### よくある問題と解決方法

#### デバッグシンボルが見つからない

```bash
# デバッグパッケージのインストール（Ubuntu）
sudo apt install libc6-dbg

# シンボルファイルの場所を指定
(gdb) set solib-search-path /usr/lib/debug

# シンボル情報の確認
(gdb) info sharedlibrary
```

#### プロセスにアタッチできない

```bash
# ptrace権限の確認と設定
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope

# 実行中プロセスの確認
ps aux | grep program_name

# アタッチの実行
sudo gdb -p <PID>
```

#### ソースコードが表示されない

```bash
# ソースディレクトリの設定
(gdb) directory /path/to/source
(gdb) set substitute-path /old/path /new/path

# ソースファイルの確認
(gdb) info sources
```

### パフォーマンス最適化

```bash
# シンボル読み込みの最適化
(gdb) set auto-solib-add off
(gdb) sharedlibrary library_name

# ページング無効化
(gdb) set height 0
(gdb) set width 0

# 履歴設定
(gdb) set history save on
(gdb) set history expansion on
```

## 統合開発環境との連携

### Visual Studio Code

```json
// launch.json設定例
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug C++ Program",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/program",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```

### Vim/Neovim

```vim
" .vimrcでのGDB統合設定
packadd termdebug
let g:termdebug_popup = 0
let g:termdebug_wide = 163

" GDBの起動
:Termdebug ./program
```

### Emacs

```lisp
;; GDBモードの設定
(setq gdb-many-windows t
      gdb-show-main t)

;; GDBの起動
M-x gdb
```

## 参考資料

### 公式ドキュメント

- [GDB公式マニュアル](https://www.gnu.org/software/gdb/documentation/) - GNU GDBの公式ドキュメント
- [GDB Quick Reference](https://sourceware.org/gdb/current/onlinedocs/gdb/index.html) - GDBコマンドリファレンス

### 書籍

- "The Art of Debugging with GDB, DDD, and Eclipse" by Norman Matloff and Peter Jay Salzman
- "Advanced Linux Programming" by CodeSourcery LLC

### オンラインリソース

- [GDB Tutorial](https://www.cs.umd.edu/~srhuang/teaching/cmsc212/gdb-tutorial-handout.pdf) - 初心者向けGDBチュートリアル
- [GDB Cheat Sheet](https://darkdust.net/files/GDB%20Cheat%20Sheet.pdf) - GDBコマンドチートシート

### コミュニティとサポート

- [Stack Overflow GDB Tag](https://stackoverflow.com/questions/tagged/gdb) - GDB関連の質問と回答
- [GNU GDB Mailing List](https://sourceware.org/ml/gdb/) - GDB開発者とユーザーのメーリングリスト