---
layout: page
title: "Visual Studio Code リファレンス"
---

# Visual Studio Code リファレンス

Visual Studio Codeの設定ファイルと便利な機能についてのリファレンスです。

* 目次
{:toc}

## 概要

Visual Studio Code（VS Code）は、Microsoft が開発した無料のソースコードエディタです。豊富な拡張機能と高いカスタマイズ性により、多くの開発者に愛用されています。

### 主要な設定ファイル

VS Codeでは以下の設定ファイルで環境をカスタマイズできます：

- **settings.json** - エディタとワークスペースの設定
- **keybindings.json** - キーボードショートカットの設定
- **tasks.json** - タスクランナーの設定
- **snippets.json** - コードスニペットの設定

## settings.json

### 基本設定

```json
{
  // エディタの基本設定
  "editor.fontSize": 14,
  "editor.fontFamily": "'Cascadia Code', 'Fira Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": true,
  
  // 行の設定
  "editor.lineNumbers": "on",
  "editor.rulers": [80, 120],
  "editor.wordWrap": "on",
  "editor.renderWhitespace": "selection",
  
  // カーソルとスクロール
  "editor.cursorStyle": "line",
  "editor.cursorBlinking": "blink",
  "editor.smoothScrolling": true,
  "editor.mouseWheelScrollSensitivity": 1
}
```

### 外観とテーマ設定

```json
{
  // テーマとカラー
  "workbench.colorTheme": "Dark+ (default dark)",
  "workbench.iconTheme": "vs-seti",
  "workbench.preferredDarkColorTheme": "Dark+ (default dark)",
  "workbench.preferredLightColorTheme": "Default Light+",
  
  // ウィンドウ設定
  "window.titleBarStyle": "custom",
  "window.menuBarVisibility": "toggle",
  "window.zoomLevel": 0,
  
  // サイドバーとエクスプローラー
  "workbench.sideBar.location": "left",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "workbench.startupEditor": "welcomePage"
}
```

### 言語固有の設定

```json
{
  // JavaScript/TypeScript
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  
  // Python
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "editor.tabSize": 4
  },
  
  // JSON
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features",
    "editor.formatOnSave": true
  },
  
  // Markdown
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "off",
      "strings": "off",
      "other": "off"
    }
  }
}
```

### ファイルとフォルダの設定

```json
{
  // ファイル関連
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  
  // 除外設定
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/build": true,
    "**/.vscode": false
  },
  
  // 検索除外
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true,
    "**/dist": true,
    "**/build": true
  }
}
```

### ターミナル設定

```json
{
  // 統合ターミナル
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "'Cascadia Code', monospace",
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.copyOnSelection": true,
  "terminal.integrated.rightClickBehavior": "copyPaste"
}
```

## keybindings.json

### 基本的なキーバインド設定

```json
[
  // エディタ操作
  {
    "key": "ctrl+d",
    "command": "editor.action.deleteLines",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+d",
    "command": "editor.action.copyLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+k",
    "command": "editor.action.deleteLines",
    "when": "editorTextFocus && !editorReadonly"
  },
  
  // 移動とナビゲーション
  {
    "key": "ctrl+alt+up",
    "command": "editor.action.insertCursorAbove",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+down",
    "command": "editor.action.insertCursorBelow",
    "when": "editorTextFocus"
  },
  
  // ファイル操作
  {
    "key": "ctrl+shift+n",
    "command": "workbench.action.files.newUntitledFile"
  },
  {
    "key": "ctrl+shift+s",
    "command": "workbench.action.files.saveAs"
  }
]
```

### 高度なキーバインド設定

```json
[
  // 検索とパネル制御
  {
    "key": "ctrl+shift+f",
    "command": "workbench.view.search",
    "when": "!searchViewletVisible"
  },
  {
    "key": "escape",
    "command": "workbench.action.hidePanel",
    "when": "panelFocus"
  },
  
  // Git操作
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  },
  {
    "key": "ctrl+enter",
    "command": "git.commitStaged",
    "when": "scmInputBoxFocus"
  },
  
  // デバッグ
  {
    "key": "f9",
    "command": "editor.debug.action.toggleBreakpoint",
    "when": "debuggersAvailable && editorTextFocus"
  },
  {
    "key": "f5",
    "command": "workbench.action.debug.start",
    "when": "debuggersAvailable"
  },
  
  // カスタム機能
  {
    "key": "ctrl+k ctrl+t",
    "command": "workbench.action.selectTheme"
  },
  {
    "key": "ctrl+k ctrl+s",
    "command": "workbench.action.openGlobalKeybindings"
  }
]
```

## tasks.json

### 基本的なタスク設定

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
      },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "npm: test",
      "type": "npm",
      "script": "test",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

### JavaScript/TypeScript プロジェクト用タスク

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "TypeScript: ビルド",
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "option": "watch",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "silent"
      },
      "problemMatcher": ["$tsc-watch"]
    },
    {
      "label": "ESLint: 全ファイル",
      "type": "shell",
      "command": "npx",
      "args": ["eslint", "src/**/*.{js,ts}", "--fix"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "problemMatcher": ["$eslint-stylish"]
    },
    {
      "label": "Prettier: フォーマット",
      "type": "shell",
      "command": "npx",
      "args": ["prettier", "--write", "src/**/*.{js,ts,json,md}"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "silent"
      }
    }
  ]
}
```

### Python プロジェクト用タスク

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Python: テスト実行",
      "type": "shell",
      "command": "python",
      "args": ["-m", "pytest", "tests/"],
      "group": {
        "kind": "test",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "problemMatcher": []
    },
    {
      "label": "Python: Black フォーマット",
      "type": "shell",
      "command": "python",
      "args": ["-m", "black", "."],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "silent"
      }
    },
    {
      "label": "Python: flake8 リント",
      "type": "shell",
      "command": "python",
      "args": ["-m", "flake8", "src/"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always"
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "message": 4
          }
        ]
      }
    }
  ]
}
```

### カスタムビルドタスク

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Docker: イメージビルド",
      "type": "shell",
      "command": "docker",
      "args": ["build", "-t", "${workspaceFolderBasename}", "."],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "options": {
        "cwd": "${workspaceFolder}"
      }
    },
    {
      "label": "Git: コミット前チェック",
      "type": "shell",
      "command": "sh",
      "args": ["-c", "npm run lint && npm run test && npm run build"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "shared"
      },
      "dependsOrder": "sequence",
      "dependsOn": ["ESLint: 全ファイル", "npm: test", "npm: build"]
    }
  ]
}
```

## snippets.json

### JavaScript/TypeScript スニペット

```json
{
  "Console Log": {
    "prefix": "log",
    "body": [
      "console.log('$1:', $1);"
    ],
    "description": "コンソールログ出力"
  },
  
  "Function Declaration": {
    "prefix": "func",
    "body": [
      "function ${1:functionName}(${2:parameters}) {",
      "\t$3",
      "\treturn $4;",
      "}"
    ],
    "description": "関数宣言"
  },
  
  "Arrow Function": {
    "prefix": "arrow",
    "body": [
      "const ${1:functionName} = (${2:parameters}) => {",
      "\t$3",
      "\treturn $4;",
      "};"
    ],
    "description": "アロー関数"
  },
  
  "Async Function": {
    "prefix": "async",
    "body": [
      "const ${1:functionName} = async (${2:parameters}) => {",
      "\ttry {",
      "\t\t$3",
      "\t\treturn $4;",
      "\t} catch (error) {",
      "\t\tconsole.error('Error in ${1:functionName}:', error);",
      "\t\tthrow error;",
      "\t}",
      "};"
    ],
    "description": "非同期関数（エラーハンドリング付き）"
  },
  
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "\t$2",
      "}",
      "",
      "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {",
      "\treturn (",
      "\t\t<div>",
      "\t\t\t$4",
      "\t\t</div>",
      "\t);",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "React関数コンポーネント（TypeScript）"
  },
  
  "Use State Hook": {
    "prefix": "useState",
    "body": [
      "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState<${2:type}>(${3:initialValue});"
    ],
    "description": "useState フック"
  }
}
```

### Python スニペット

```json
{
  "Main Function": {
    "prefix": "main",
    "body": [
      "def main():",
      "\t\"\"\"メイン関数\"\"\"",
      "\t$1",
      "",
      "",
      "if __name__ == \"__main__\":",
      "\tmain()"
    ],
    "description": "メイン関数"
  },
  
  "Class Definition": {
    "prefix": "class",
    "body": [
      "class ${1:ClassName}:",
      "\t\"\"\"${2:クラスの説明}\"\"\"",
      "\t",
      "\tdef __init__(self, ${3:parameters}):",
      "\t\t\"\"\"初期化メソッド\"\"\"",
      "\t\t$4",
      "\t",
      "\tdef ${5:method_name}(self, ${6:parameters}):",
      "\t\t\"\"\"${7:メソッドの説明}\"\"\"",
      "\t\t$8"
    ],
    "description": "クラス定義"
  },
  
  "Try Except": {
    "prefix": "try",
    "body": [
      "try:",
      "\t$1",
      "except ${2:Exception} as e:",
      "\tprint(f\"エラーが発生しました: {e}\")",
      "\t$3"
    ],
    "description": "try-except文"
  },
  
  "Function with Docstring": {
    "prefix": "def",
    "body": [
      "def ${1:function_name}(${2:parameters}) -> ${3:return_type}:",
      "\t\"\"\"${4:関数の説明}",
      "\t",
      "\tArgs:",
      "\t\t${5:arg_description}",
      "\t",
      "\tReturns:",
      "\t\t${6:return_description}",
      "\t\"\"\"",
      "\t$7"
    ],
    "description": "ドキュメント付き関数"
  }
}
```

### HTML/CSS スニペット

```json
{
  "HTML5 Boilerplate": {
    "prefix": "html5",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"ja\">",
      "<head>",
      "\t<meta charset=\"UTF-8\">",
      "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "\t<title>${1:Document}</title>",
      "\t<link rel=\"stylesheet\" href=\"${2:style.css}\">",
      "</head>",
      "<body>",
      "\t$3",
      "\t<script src=\"${4:script.js}\"></script>",
      "</body>",
      "</html>"
    ],
    "description": "HTML5 ボイラープレート"
  },
  
  "CSS Flexbox": {
    "prefix": "flex",
    "body": [
      "display: flex;",
      "justify-content: ${1:center};",
      "align-items: ${2:center};",
      "flex-direction: ${3:row};"
    ],
    "description": "Flexbox レイアウト"
  },
  
  "CSS Grid": {
    "prefix": "grid",
    "body": [
      "display: grid;",
      "grid-template-columns: ${1:repeat(auto-fit, minmax(250px, 1fr))};",
      "grid-gap: ${2:1rem};"
    ],
    "description": "CSS Grid レイアウト"
  }
}
```

## 便利な拡張機能

### 必須拡張機能

```json
{
  "recommendations": [
    // 言語サポート
    "ms-python.python",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    
    // フォーマッター
    "esbenp.prettier-vscode",
    "ms-python.black-formatter",
    
    // リンター
    "ms-python.flake8",
    "dbaeumer.vscode-eslint",
    
    // Git
    "eamodio.gitlens",
    "donjayamanne.githistory",
    
    // エディタ拡張
    "vscodevim.vim",
    "ms-vscode.atom-keybindings",
    
    // テーマとアイコン
    "zhuangtongfa.material-theme",
    "PKief.material-icon-theme",
    
    // ユーティリティ
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.live-server"
  ]
}
```

## ワークスペース設定

### .vscode/settings.json（プロジェクト固有）

```json
{
  // プロジェクト固有の設定
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.terminal.activateEnvironment": true,
  
  // ファイル関連（プロジェクト固有）
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true,
    "**/venv": true,
    "**/node_modules": true,
    "**/.pytest_cache": true
  },
  
  // 言語固有設定（プロジェクトレベル）
  "[python]": {
    "editor.rulers": [88],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  
  // 拡張機能設定
  "eslint.workingDirectories": ["frontend", "backend"],
  "prettier.configPath": "./.prettierrc"
}
```

### launch.json（デバッグ設定）

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: 現在のファイル",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    },
    {
      "name": "Node.js: 現在のファイル",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Chrome: デバッグ",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 使用例とベストプラクティス

### 設定の管理

1. **グローバル設定**: 全プロジェクト共通の設定
2. **ワークスペース設定**: プロジェクト固有の設定
3. **設定の同期**: Settings Sync 機能の活用

### キーボードショートカットの活用

```
Ctrl + Shift + P : コマンドパレット
Ctrl + P         : ファイル検索
Ctrl + Shift + F : 全体検索
Ctrl + `         : ターミナル表示/非表示
F1               : ヘルプ表示
```

### タスクの効率的な利用

1. **ビルドタスク**: 頻繁に使用するビルドコマンドを登録
2. **テストタスク**: テスト実行の自動化
3. **デプロイタスク**: 本番環境への デプロイメント

このリファレンスを参考に、効率的なVS Code環境を構築してください。