---
layout: page
title: "GitHub リファレンス"
---

# GitHub リファレンス

GitHubの各種機能とツールに関する設定方法、ベストプラクティス、および実用的な使い方のガイドです。

* 目次
{:toc}

## GitHub Copilot

### GitHub Copilotとは

GitHub Copilotは、AIを活用したコード補完ツールで、OpenAIのCodexモデルを基盤として動作します。リアルタイムでコードの提案を行い、開発者の生産性を大幅に向上させることができます。

### instruction.mdファイルについて

GitHub Copilotを効果的に活用するためには、プロジェクト固有の指示ファイルを作成することが重要です。`copilot-instructions.md`や`.copilot-instructions.md`のようなファイルを作成することで、Copilotにプロジェクトのコンテキストや方針を伝えることができます。

#### instruction.mdのベストプラクティス

**1. プロジェクト概要の記述**
- プロジェクトの目的と技術スタック
- コーディング規約とスタイルガイド
- アーキテクチャパターンや設計方針

**2. コンテキスト情報の提供**
- 使用しているフレームワークやライブラリ
- プロジェクト固有の用語や概念
- 重要なファイル構造の説明

**3. 効果的な指示の書き方**
- 具体的で明確な指示を記述
- 避けるべきパターンや制約の明記
- 例外的なケースの説明

#### instruction.mdテンプレート例

```markdown
# プロジェクト名 - Copilot Instructions

## プロジェクト概要
- 技術スタック: [使用技術を記載]
- アーキテクチャ: [設計パターンを記載]
- 目的: [プロジェクトの目的を記載]

## コーディング規約
- 言語: [主要言語とバージョン]
- スタイル: [コーディングスタイル]
- 命名規則: [変数・関数・クラスの命名規則]

## 重要なガイドライン
- [プロジェクト固有のルール]
- [セキュリティ要件]
- [パフォーマンス要件]

## ファイル構造
- src/: [ソースコードの説明]
- tests/: [テストファイルの説明]
- docs/: [ドキュメントの説明]

## 禁止事項
- [使用を避けるべきパターン]
- [セキュリティ上の制約]
```

### 設定方法

#### 1. GitHub Copilotの有効化

1. **GitHub アカウントでのサブスクリプション**
   - GitHub.comの設定から「Copilot」セクションにアクセス
   - 個人プラン（月額10ドル）またはビジネスプラン（月額19ドル/ユーザー）を選択
   - 学生・教育者・OSS維持者は無料で利用可能

2. **IDEでの設定**

**Visual Studio Code**
```bash
# 拡張機能のインストール
# Extensions > GitHub Copilot で検索してインストール
# または以下のコマンドでインストール
code --install-extension GitHub.copilot
```

**JetBrains IDEs (IntelliJ IDEA, PyCharm等)**
```
File > Settings > Plugins > GitHub Copilot をインストール
```

**Vim/Neovim**
```vim
" vim-plug を使用する場合
Plug 'github/copilot.vim'

" 設定後
:Copilot setup
```

#### 2. 認証とアクティベーション

```bash
# VS Codeの場合、コマンドパレットから
# "GitHub Copilot: Sign In" を実行

# または、認証用ブラウザが自動的に開くのでGitHubアカウントでログイン
```

### ベストプラクティス

#### 効果的なコメントの書き方

```javascript
// 良い例：具体的で明確なコメント
// ユーザーIDを受け取って、データベースからユーザー情報を取得する関数
function getUserById(userId) {
    // Copilotが適切な実装を提案
}

// さらに詳細なコンテキストを提供
// 非同期でAPIからユーザーデータを取得し、エラーハンドリングも含める
async function fetchUserData(apiEndpoint, userId) {
    // Copilotがtry-catch文付きの実装を提案
}
```

#### プロンプトエンジニアリングのコツ

1. **関数名とコメントで意図を明確に**
```python
# 悪い例
def calc(x, y):
    pass

# 良い例
def calculate_compound_interest(principal, rate, time, frequency):
    """
    複利計算を行う関数
    principal: 元本
    rate: 年利率（小数点で指定、例：0.05 = 5%）
    time: 投資期間（年）
    frequency: 複利の計算回数（年間）
    """
    pass
```

2. **段階的なコメントで複雑な処理を説明**
```python
def process_user_data():
    # 1. CSVファイルからユーザーデータを読み込み
    
    # 2. データのバリデーションを実行
    
    # 3. 無効なレコードをフィルタリング
    
    # 4. データを正規化して保存
```

#### コード品質の向上

```python
# テスト駆動開発のサポート
def test_user_authentication():
    """
    ユーザー認証機能のテストケース
    - 正しい認証情報での成功ケース
    - 間違った認証情報での失敗ケース
    - 空の認証情報での処理
    """
    # Copilotが包括的なテストコードを提案
```

#### セキュリティに関する注意事項

1. **機密情報の取り扱い**
```yaml
# .copilot-ignore.yml ファイルを作成してセンシティブなファイルを除外
# パスワード、API キー、個人情報を含むファイル
secrets/
*.key
*.pem
config/production.yml
```

2. **コード提案の検証**
- Copilotの提案は必ず内容を確認してから採用
- セキュリティ脆弱性がないかチェック
- プロジェクトの要件に適合しているか確認

### 高度な活用方法

#### GitHub Copilot Chat

```bash
# VS Codeでの使用方法
# 1. GitHub Copilot Chat 拡張機能をインストール
# 2. Ctrl+Shift+I でチャットパネルを開く
# 3. 自然言語でコードについて質問
```

**効果的な質問例**
```
# リファクタリングの提案
このコードをより効率的に書き直してください

# エラーの説明
このエラーメッセージの意味と解決方法を教えてください

# コードの最適化
パフォーマンスを向上させる方法はありますか？

# テストケースの生成
この関数のテストケースを作成してください
```

## GitHub Actions

### GitHub Actionsとは

GitHub ActionsはGitHubに統合されたCI/CD（継続的インテグレーション/継続的デプロイメント）プラットフォームです。リポジトリ内のイベント（プッシュ、プルリクエストなど）をトリガーとして、自動化されたワークフローを実行できます。

### 基本概念

- **ワークフロー**: `.github/workflows/` ディレクトリに配置されるYAMLファイル
- **ジョブ**: ワークフロー内で実行される一連の処理
- **ステップ**: ジョブ内の個別のタスク
- **アクション**: 再利用可能な処理単位
- **ランナー**: ワークフローを実行する仮想環境

### YAML設定項目の詳細説明

GitHub ActionsのワークフローはYAMLファイルで設定します。主要な設定項目とその意味を以下に説明します。

#### 基本設定項目

**name**
```yaml
name: CI Pipeline
```
- ワークフローの名前を指定
- GitHub UIで表示される識別名
- 省略可能（省略時はファイル名が使用される）

**on (トリガー設定)**
```yaml
on:
  push:
    branches: [ main, develop ]
    paths: [ 'src/**' ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # 毎週月曜日の午前2時
  workflow_dispatch:     # 手動実行を許可
```
- **push**: 指定ブランチへのプッシュ時に実行
- **pull_request**: プルリクエスト作成・更新時に実行
- **schedule**: Cron形式でスケジュール実行
- **workflow_dispatch**: 手動実行を可能にする
- **paths**: 特定パスの変更時のみ実行

**jobs (ジョブ設定)**
```yaml
jobs:
  job_name:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    strategy:
      matrix:
        node: [16, 18, 20]
    env:
      NODE_ENV: test
```
- **runs-on**: 実行環境（ubuntu-latest, windows-latest, macos-latest等）
- **timeout-minutes**: ジョブのタイムアウト時間（デフォルト360分）
- **strategy.matrix**: 複数の設定値での並列実行
- **env**: 環境変数の設定

**steps (ステップ設定)**
```yaml
steps:
- name: ステップ名
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
- name: コマンド実行
  run: |
    echo "複数行の"
    echo "コマンド実行"
  shell: bash
```
- **name**: ステップの表示名
- **uses**: 既存アクションの使用
- **with**: アクションへのパラメータ
- **run**: シェルコマンドの実行
- **shell**: 使用するシェル（bash, sh, cmd, powershell等）

#### 高度な設定項目

**conditions (条件設定)**
```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: npm run deploy
```

**secrets (シークレット使用)**
```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**outputs (出力設定)**
```yaml
jobs:
  build:
    outputs:
      version: ${{ steps.version.outputs.version }}
    steps:
    - id: version
      run: echo "version=1.0.0" >> $GITHUB_OUTPUT
```

### セットアップ方法

#### 1. 基本的なワークフローファイルの作成

```yaml
# .github/workflows/ci.yml
name: CI

# トリガーの設定
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

# ジョブの定義
jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: チェックアウト
      uses: actions/checkout@v4
      
    - name: Node.js のセットアップ
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: 依存関係のインストール
      run: npm ci
      
    - name: テストの実行
      run: npm test
      
    - name: ビルドの実行
      run: npm run build
```

#### 2. 複数環境でのテスト

```yaml
# .github/workflows/multi-env-test.yml
name: マルチ環境テスト

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v4
    - name: Node.js ${{ matrix.node-version }} セットアップ
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm test
```

### デプロイメントワークフロー

#### GitHub Pages へのデプロイ

```yaml
# .github/workflows/deploy-pages.yml
name: GitHub Pages へのデプロイ

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: チェックアウト
      uses: actions/checkout@v4
      
    - name: Node.js セットアップ
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: 依存関係インストール
      run: npm ci
      
    - name: ビルド
      run: npm run build
      
    - name: Pages の設定
      uses: actions/configure-pages@v4
      
    - name: アーティファクトのアップロード
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'
        
    - name: Pages へのデプロイ
      uses: actions/deploy-pages@v4
```

#### Docker イメージのビルドとプッシュ

```yaml
# .github/workflows/docker.yml
name: Docker イメージのビルドとプッシュ

on:
  push:
    tags: [ 'v*' ]
  release:
    types: [ published ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - name: チェックアウト
      uses: actions/checkout@v4
      
    - name: Docker Buildx セットアップ
      uses: docker/setup-buildx-action@v3
      
    - name: Docker Hub ログイン
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
        
    - name: メタデータの抽出
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: your-username/your-app
        tags: |
          type=ref,event=tag
          type=raw,value=latest,enable={{is_default_branch}}
          
    - name: ビルドとプッシュ
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
```

### ベストプラクティス

#### 1. セキュリティ

**Secrets の適切な使用**
```yaml
# 秘匿情報は Secrets に保存
- name: API へのリクエスト
  run: |
    curl -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" \
         https://api.example.com/data
```

**最小権限の原則**
```yaml
permissions:
  contents: read      # 必要最小限の権限のみ付与
  pull-requests: write
```

#### 2. パフォーマンス最適化

**キャッシュの活用**
```yaml
- name: 依存関係のキャッシュ
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**並列実行**
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # ...
  
  test:
    runs-on: ubuntu-latest
    # ...
  
  build:
    needs: [lint, test]  # lint と test の完了後に実行
    runs-on: ubuntu-latest
    # ...
```

#### 3. 効率的なワークフロー設計

**条件付き実行**
```yaml
- name: プロダクション環境へのデプロイ
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: npm run deploy:production
```

**再利用可能なワークフロー**
```yaml
# .github/workflows/reusable-test.yml
name: 再利用可能テストワークフロー

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
    - run: npm ci
    - run: npm test
```

```yaml
# .github/workflows/main.yml
name: メインワークフロー

on: [push, pull_request]

jobs:
  call-reusable-workflow:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '18'
```

### トラブルシューティング

#### よくある問題と解決方法

1. **ワークフローが実行されない**
```yaml
# ファイル名の確認: .github/workflows/ 配下に配置
# YAML 構文エラーの確認
# ブランチ名の確認
on:
  push:
    branches: [ main ]  # ブランチ名が正しいか確認
```

2. **アクションのバージョン管理**
```yaml
# 推奨: メジャーバージョンを指定
- uses: actions/checkout@v4

# 特定バージョンでの固定も可能
- uses: actions/checkout@v4.1.1
```

3. **環境変数とシークレット**
```yaml
env:
  # 環境変数の設定
  NODE_ENV: production
  
steps:
- name: 環境変数の使用
  run: echo "環境: $NODE_ENV"
  
- name: シークレットの使用
  run: echo "トークンを使用した処理"
  env:
    TOKEN: ${{ secrets.MY_TOKEN }}
```

### 実用的な活用例

#### 1. 自動的なコード品質チェック

```yaml
name: コード品質チェック

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: ESLint 実行
      run: npx eslint . --ext .js,.ts,.tsx
      
    - name: Prettier チェック
      run: npx prettier --check .
      
    - name: テストカバレッジ
      run: |
        npm test -- --coverage
        npx codecov
```

#### 2. 自動的な依存関係更新

```yaml
name: 依存関係の自動更新

on:
  schedule:
    - cron: '0 0 * * 1'  # 毎週月曜日の0時に実行

jobs:
  update-dependencies:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: 依存関係の更新
      run: |
        npm update
        npm audit fix
        
    - name: プルリクエストの作成
      uses: peter-evans/create-pull-request@v5
      with:
        title: '依存関係の自動更新'
        body: 'npm update による依存関係の自動更新です。'
        branch: update-dependencies
```

#### 3. リリース自動化

```yaml
name: リリース自動化

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: リリースノートの生成
      id: release_notes
      run: |
        # CHANGELOG.md からリリースノートを抽出
        echo "notes=$(cat CHANGELOG.md)" >> $GITHUB_OUTPUT
        
    - name: GitHub リリースの作成
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        body: ${{ steps.release_notes.outputs.notes }}
        draft: false
        prerelease: false
```

このガイドを参考に、プロジェクトの要件に応じてGitHub CopilotとGitHub Actionsを効果的に活用してください。