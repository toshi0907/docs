# バッチファイル リファレンス

Windowsバッチファイル（.bat/.cmd）の基本的な使い方とコマンドのリファレンスです。

## 目次
1. [基本概念](#基本概念)
2. [ファイルの作成と実行](#ファイルの作成と実行)
3. [変数](#変数)
4. [出力とユーザー入力](#出力とユーザー入力)
5. [条件分岐](#条件分岐)
6. [ループ](#ループ)
7. [ファイル・ディレクトリ操作](#ファイルディレクトリ操作)
8. [よく使用されるコマンド](#よく使用されるコマンド)
9. [エラーハンドリング](#エラーハンドリング)
10. [実用的な例](#実用的な例)

## 基本概念

### バッチファイルとは
バッチファイルは、Windowsのコマンドプロンプトで実行される一連のコマンドを記述したテキストファイルです。拡張子は`.bat`または`.cmd`を使用します。

### 基本的な特徴
- テキストエディタで編集可能
- コマンドプロンプトのコマンドを自動実行
- システム管理やファイル操作の自動化に使用
- 環境変数の設定や起動スクリプトとして利用

## ファイルの作成と実行

### バッチファイルの作成

```batch
@echo off
rem これはコメントです
echo Hello, World!
pause
```

**ファイルの保存:**
- 拡張子を `.bat` または `.cmd` で保存
- 文字コードはShift_JISまたはUTF-8（BOM付き）で保存

**実行方法:**
```batch
# コマンドプロンプトから実行
sample.bat

# ダブルクリックで実行
# またはエクスプローラーから右クリック → 開く
```

### 基本的なコマンド

```batch
@echo off          rem 実行中のコマンドを非表示にする
rem コメント       rem または :: でコメントを記述
echo 文字列        rem 文字列を表示
pause              rem キー入力待ち
cls                rem 画面をクリア
exit               rem バッチファイルを終了
```

## 変数

### 変数の定義と使用

```batch
@echo off
rem 変数の定義
set name=田中太郎
set age=25
set path_dir=C:\Users\Public

rem 変数の表示
echo 名前: %name%
echo 年齢: %age%歳
echo パス: %path_dir%
```

### ユーザー入力による変数設定

```batch
@echo off
set /p username="ユーザー名を入力してください: "
set /p password="パスワードを入力してください: "

echo 入力されたユーザー名: %username%
echo パスワードの文字数: %password%
```

### 環境変数

```batch
@echo off
rem 環境変数の表示
echo ユーザー名: %USERNAME%
echo コンピュータ名: %COMPUTERNAME%
echo 現在のディレクトリ: %CD%
echo 現在の日付: %DATE%
echo 現在の時刻: %TIME%

rem 環境変数の設定（セッション中のみ有効）
set MY_VAR=値
echo %MY_VAR%
```

## 出力とユーザー入力

### テキストの出力

```batch
@echo off
rem 基本的な出力
echo シンプルなメッセージ

rem 改行なしの出力
echo|set /p="改行なし: "
echo 続きのテキスト

rem ファイルへの出力
echo テキスト内容 > output.txt          rem 上書き
echo 追加内容 >> output.txt             rem 追記
```

### 文字色の変更

```batch
@echo off
rem 文字色を変更（colorコマンド）
color 0A    rem 黒背景に明るい緑文字
echo 緑色のテキスト

color 0C    rem 黒背景に明るい赤文字
echo 赤色のテキスト

color       rem デフォルトに戻す
```

## 条件分岐

### if文の基本

```batch
@echo off
set /p num="数字を入力してください: "

if %num% == 10 (
    echo 入力された数字は10です
) else (
    echo 入力された数字は10ではありません
)
```

### ファイル・フォルダの存在確認

```batch
@echo off
rem ファイルの存在確認
if exist "C:\temp\sample.txt" (
    echo ファイルが存在します
) else (
    echo ファイルが存在しません
)

rem フォルダの存在確認
if exist "C:\temp\" (
    echo フォルダが存在します
) else (
    echo フォルダが存在しません
)
```

### 文字列比較

```batch
@echo off
set /p input="yes または no を入力してください: "

if /i "%input%" == "yes" (
    echo はいが選択されました
) else if /i "%input%" == "no" (
    echo いいえが選択されました
) else (
    echo 無効な入力です
)

rem /i オプション: 大文字小文字を区別しない
```

## ループ

### for文（ファイル処理）

```batch
@echo off
rem 現在のディレクトリの全ファイルを処理
for %%f in (*.*) do (
    echo ファイル: %%f
)

rem 特定の拡張子のファイルのみ処理
for %%f in (*.txt) do (
    echo テキストファイル: %%f
)
```

### for文（数値範囲）

```batch
@echo off
rem 1から10まで繰り返し
for /l %%i in (1,1,10) do (
    echo 数値: %%i
)

rem 開始値、増分、終了値の指定
for /l %%i in (0,2,10) do (
    echo 偶数: %%i
)
```

### for文（ディレクトリ処理）

```batch
@echo off
rem サブディレクトリも含めて処理
for /r "C:\temp" %%f in (*.txt) do (
    echo フルパス: %%f
)

rem ディレクトリのみ処理
for /d %%d in (*) do (
    echo ディレクトリ: %%d
)
```

### while風ループ（goto使用）

```batch
@echo off
set count=0

:loop
if %count% geq 5 goto end
echo カウント: %count%
set /a count=%count%+1
goto loop

:end
echo ループ終了
```

## ファイル・ディレクトリ操作

### ファイル操作

```batch
@echo off
rem ファイルのコピー
copy "source.txt" "destination.txt"

rem ファイルの移動/リネーム
move "old_name.txt" "new_name.txt"

rem ファイルの削除
del "sample.txt"

rem ファイルの削除（確認なし）
del /q "sample.txt"

rem 複数ファイルの削除
del *.tmp
```

### ディレクトリ操作

```batch
@echo off
rem ディレクトリの作成
mkdir "新しいフォルダ"
md "別のフォルダ"

rem ディレクトリの削除（空の場合）
rmdir "フォルダ名"

rem ディレクトリの削除（中身ごと、確認なし）
rmdir /s /q "フォルダ名"

rem ディレクトリの移動
cd "C:\Users\Public"

rem 現在のディレクトリを表示
cd
```

### ファイル・ディレクトリの一覧

```batch
@echo off
rem ファイル一覧表示
dir
dir /b          rem ファイル名のみ
dir /a:d        rem ディレクトリのみ
dir /s          rem サブディレクトリも含む

rem ツリー表示
tree
tree /f         rem ファイルも含む
```

## よく使用されるコマンド

### テキスト処理

```batch
@echo off
rem ファイルの内容表示
type "sample.txt"

rem ファイル内容の検索
find "検索文字列" "sample.txt"
findstr "正規表現" "sample.txt"

rem ファイルの先頭/末尾表示（PowerShellコマンドを使用）
powershell "Get-Content sample.txt | Select-Object -First 10"
powershell "Get-Content sample.txt | Select-Object -Last 10"
```

### システム情報

```batch
@echo off
rem システム情報表示
systeminfo

rem プロセス一覧
tasklist

rem サービス一覧
sc query

rem ネットワーク情報
ipconfig
ipconfig /all
```

### 日付・時刻操作

```batch
@echo off
rem 現在の日付と時刻
echo %DATE% %TIME%

rem 日付のフォーマット
set today=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2%
echo 今日の日付（YYYYMMDD形式）: %today%

rem タイムスタンプ付きファイル名
set timestamp=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
set timestamp=%timestamp: =0%
echo backup_%timestamp%.txt
```

## エラーハンドリング

### エラーレベルの確認

```batch
@echo off
rem コマンドの実行
copy "source.txt" "backup.txt"

rem エラーレベルの確認
if %errorlevel% == 0 (
    echo コピー成功
) else (
    echo コピー失敗（エラーレベル: %errorlevel%）
)
```

### エラー出力の制御

```batch
@echo off
rem 標準出力とエラー出力をファイルに出力
command > output.txt 2> error.txt

rem 標準出力とエラー出力を同じファイルに出力
command > all_output.txt 2>&1

rem エラー出力を無視
command 2>nul
```

## 実用的な例

### バックアップスクリプト

```batch
@echo off
setlocal enabledelayedexpansion

rem バックアップ設定
set source_dir=C:\Important_Data
set backup_dir=D:\Backup
set timestamp=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
set timestamp=!timestamp: =0!
set backup_folder=%backup_dir%\Backup_%timestamp%

rem バックアップディレクトリの作成
mkdir "%backup_folder%"

rem ファイルのコピー
echo バックアップを開始します...
xcopy "%source_dir%" "%backup_folder%" /e /i /h /y

if %errorlevel% == 0 (
    echo バックアップが正常に完了しました
    echo バックアップ先: %backup_folder%
) else (
    echo バックアップに失敗しました
)

pause
```

### ログ削除スクリプト

```batch
@echo off
rem 30日以上古いログファイルを削除

set log_dir=C:\Logs
set days=30

echo %days%日以上古いログファイルを削除します...

rem PowerShellコマンドを使用して日付ベースでファイル削除
powershell "Get-ChildItem '%log_dir%\*.log' | Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-%days%)} | Remove-Item -Force"

echo 古いログファイルの削除が完了しました
pause
```

### システム情報収集スクリプト

```batch
@echo off
set report_file=system_report_%DATE:~0,4%%DATE:~5,2%%DATE:~8,2%.txt

echo システム情報を収集中...

echo ==================== > %report_file%
echo システム情報レポート >> %report_file%
echo 作成日時: %DATE% %TIME% >> %report_file%
echo ==================== >> %report_file%
echo. >> %report_file%

echo [システム情報] >> %report_file%
systeminfo >> %report_file%
echo. >> %report_file%

echo [ディスク使用量] >> %report_file%
wmic logicaldisk get size,freespace,caption >> %report_file%
echo. >> %report_file%

echo [実行中のプロセス] >> %report_file%
tasklist >> %report_file%

echo レポートが作成されました: %report_file%
pause
```

### 環境設定スクリプト

```batch
@echo off
echo 開発環境を設定中...

rem 必要なディレクトリの作成
mkdir "C:\Dev\Projects" 2>nul
mkdir "C:\Dev\Tools" 2>nul
mkdir "C:\Dev\Backup" 2>nul

rem 環境変数の設定（現在のセッションのみ）
set DEV_HOME=C:\Dev
set PROJECT_PATH=%DEV_HOME%\Projects
set TOOLS_PATH=%DEV_HOME%\Tools

rem パスの追加
set PATH=%PATH%;%TOOLS_PATH%

echo 開発環境の設定が完了しました
echo DEV_HOME: %DEV_HOME%
echo PROJECT_PATH: %PROJECT_PATH%
echo TOOLS_PATH: %TOOLS_PATH%

pause
```

このリファレンスを参考に、効率的なバッチファイルを作成してください。