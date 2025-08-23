---
layout: page
title: "正規表現 リファレンス"
---

# 正規表現 リファレンス

正規表現（Regular Expression）の基本的な使い方から応用までの包括的なリファレンスです。様々なプログラミング言語やツールでの実践的な使用例を含めて説明します。

* 目次
{:toc}

## 基本概念

### 正規表現とは

正規表現は、文字列のパターンを記述するための表記法です。テキストの検索、置換、検証などに使用され、多くのプログラミング言語やテキストエディタで標準的にサポートされています。

**主な用途:**
- 文字列の検索とマッチング
- データの抽出
- 入力値の検証（バリデーション）
- テキストの置換
- ログファイルの解析

### 正規表現エンジンの種類

- **POSIX基本正規表現（BRE）**: 基本的な機能のみ
- **POSIX拡張正規表現（ERE）**: より豊富な機能
- **Perl互換正規表現（PCRE）**: 最も機能が豊富で広く使用

## 基本的な構文

### リテラル文字

```regex
hello

```

- 文字列 "hello" に完全一致

### メタ文字

正規表現で特別な意味を持つ文字：

```regex
. ^ $ * + ? { } [ ] \ | ( )

```

### ドット（.）- 任意の一文字

```regex
h.llo

```

- "hello", "hallo", "h3llo" などにマッチ
- 改行文字以外の任意の一文字

### 文字クラス

#### 基本的な文字クラス

```regex
[abc]        # a, b, c のいずれか一文字
[a-z]        # 小文字のアルファベット一文字
[A-Z]        # 大文字のアルファベット一文字
[0-9]        # 数字一文字
[a-zA-Z]     # アルファベット一文字
[a-zA-Z0-9]  # 英数字一文字

```

#### 否定文字クラス

```regex
[^abc]       # a, b, c 以外の文字
[^0-9]       # 数字以外の文字

```

#### 定義済み文字クラス

```regex
\d    # 数字 [0-9]
\D    # 数字以外 [^0-9]
\w    # 単語文字 [a-zA-Z0-9_]
\W    # 単語文字以外 [^a-zA-Z0-9_]
\s    # 空白文字（スペース、タブ、改行など）
\S    # 空白文字以外

```

## 量詞（Quantifiers）

### 基本的な量詞

```regex
*      # 0回以上の繰り返し
+      # 1回以上の繰り返し
?      # 0回または1回（オプション）
{n}    # ちょうどn回
{n,}   # n回以上
{n,m}  # n回以上m回以下

```

### 実用例

```regex
\d+           # 1つ以上の数字
\d{3}         # ちょうど3桁の数字
\d{2,4}       # 2～4桁の数字
colou?r       # "color" または "colour"
ab*c          # "ac", "abc", "abbc", "abbbc" など

```

### 貪欲（Greedy）と非貪欲（Non-greedy）

```regex
.*      # 貪欲：可能な限り長くマッチ
.*?     # 非貪欲：最短でマッチ
.+?     # 非貪欲：1回以上の最短マッチ

```

**例：**

```html
<div>Hello</div><div>World</div>

```

```regex
<div>.*</div>     # "<div>Hello</div><div>World</div>" 全体
<div>.*?</div>    # "<div>Hello</div>" のみ

```

## アンカー

### 位置指定

```regex
^      # 行の開始
$      # 行の終了
\A     # 文字列の開始
\Z     # 文字列の終了
\b     # 単語境界
\B     # 単語境界以外

```

### 実用例

```regex
^Hello     # 行の先頭の "Hello"
World$     # 行の末尾の "World"
\bcat\b    # 独立した単語としての "cat"
^\d+$      # 行全体が数字のみ

```

## グループ化とキャプチャ

### 基本的なグループ

```regex
(abc)          # グループ化とキャプチャ
(?:abc)        # グループ化のみ（非キャプチャ）
(a|b|c)        # いずれか一つ（OR演算）

```

### 後方参照

```regex
(hello) \1     # "hello hello" にマッチ
(\w+) \1       # 同じ単語の繰り返し

```

### 名前付きキャプチャ

```regex
(?<name>\w+)   # 名前付きキャプチャ（言語により記法が異なる）
(?P<name>\w+)  # Python式の名前付きキャプチャ

```

## 先読み・後読み

### 先読み（Lookahead）

```regex
(?=...)        # 正の先読み
(?!...)        # 負の先読み

```

**例：**

```regex
\d+(?=円)      # "円" が後に続く数字
\d+(?!円)      # "円" が後に続かない数字

```

### 後読み（Lookbehind）

```regex
(?<=...)       # 正の後読み
(?<!...)       # 負の後読み

```

**例：**

```regex
(?<=\$)\d+     # "$" が前にある数字
(?<!\$)\d+     # "$" が前にない数字

```

## 実用的なパターン集

### 日本の電話番号

```regex
# 固定電話

0\d{1,4}-\d{1,4}-\d{4}

# 携帯電話

0[789]0-\d{4}-\d{4}

# 一般的な形式

0\d{1,4}-?\d{1,4}-?\d{4}

```

### メールアドレス

```regex
# 簡単な形式

[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}

# より厳密な形式

^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$

```

### URL

```regex
# HTTP/HTTPS URL

https?://[^\s/$.?#].[^\s]*

# より詳細

^https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$

```

### 日付

```regex
# YYYY/MM/DD

\d{4}/\d{1,2}/\d{1,2}

# YYYY-MM-DD

\d{4}-\d{2}-\d{2}

# DD/MM/YYYY または MM/DD/YYYY

\d{1,2}/\d{1,2}/\d{4}

```

### IPアドレス

```regex
# 簡単な形式

\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}

# より厳密な形式（0-255の範囲をチェック）

^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$

```

### パスワード強度

```regex
# 最低8文字、大文字小文字数字記号を含む

^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$

```

## 言語・ツール別の使用例

### Python

```python
import re

text = "電話番号: 090-1234-5678, 03-1234-5678"

# 検索

pattern = r'\d{2,4}-\d{4}-\d{4}'
matches = re.findall(pattern, text)
print(matches)  # ['090-1234-5678', '03-1234-5678']

# 置換

masked = re.sub(r'\d{3}-\d{4}-\d{4}', 'XXX-XXXX-XXXX', text)
print(masked)

# マッチオブジェクトの使用

match = re.search(r'(\d{3})-(\d{4})-(\d{4})', text)
if match:
    print(f"全体: {match.group(0)}")
    print(f"局番: {match.group(1)}")
    print(f"番号1: {match.group(2)}")
    print(f"番号2: {match.group(3)}")

# コンパイル済みパターン

pattern = re.compile(r'\d+')
numbers = pattern.findall("価格は1000円、税込み1100円です")
print(numbers)  # ['1000', '1100']

```

### JavaScript

```javascript
const text = "メールアドレス: user@example.com, admin@test.org";

// 検索
const pattern = /[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}/g;
const matches = text.match(pattern);
console.log(matches); // ['user@example.com', 'admin@test.org']

// 置換
const masked = text.replace(/[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}/g, 'XXX@XXX.XXX');
console.log(masked);

// 検証
const email = "test@example.com";
const isValid = /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
console.log(isValid); // true

// キャプチャグループ
const urlPattern = /^(https?):\/\/([^\/]+)(\/.*)?$/;
const url = "https://example.com/path/to/page";
const match = url.match(urlPattern);
if (match) {
    console.log(`プロトコル: ${match[1]}`);
    console.log(`ホスト: ${match[2]}`);
    console.log(`パス: ${match[3] || '/'}`);
}

```

### コマンドラインツール

#### grep

```bash
# ファイル内の検索

grep -E '\d{3}-\d{4}-\d{4}' file.txt

# IPアドレスの検索

grep -E '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b' access.log

# 大文字小文字を区別しない検索

grep -iE 'error|warning' log.txt

# 行番号付きで表示

grep -nE 'function\s+\w+' script.js

```

#### sed

```bash
# 電話番号をマスク

sed -E 's/[0-9]{3}-[0-9]{4}-[0-9]{4}/XXX-XXXX-XXXX/g' file.txt

# HTMLタグの除去

sed -E 's/<[^>]*>//g' html_file.txt

# 複数の空白を一つに

sed -E 's/[[:space:]]+/ /g' file.txt

# 行の先頭の空白を除去

sed -E 's/^[[:space:]]*//' file.txt

```

#### awk

```bash
# パターンマッチした行の処理

awk '/[0-9]{4}-[0-9]{2}-[0-9]{2}/ {print "日付:", $0}' file.txt

# フィールドの抽出

awk '$1 ~ /^[0-9]+$/ {print "数字:", $1}' data.txt

```

### Vim/Neovim

```vim
" 検索
/\d\{3\}-\d\{4\}-\d\{4\}

" 置換
:%s/\d\{3\}-\d\{4\}-\d\{4\}/XXX-XXXX-XXXX/g

" 大文字小文字を区別しない検索
/\cpattern

" 単語境界を使った検索
/\<word\>

```

## デバッグとテスト

### オンラインツール

- **regex101.com**: パターンのテストと説明
- **regexr.com**: 視覚的な正規表現エディタ
- **regexpal.com**: シンプルなテストツール

### デバッグのコツ

1. **小さなパターンから始める**

   ```regex
   # 段階的に構築
   \d           # 数字一文字
   \d+          # 数字の連続
   \d{3}        # 3桁の数字
   \d{3}-       # 3桁の数字とハイフン
   \d{3}-\d{4}  # 最終形

   ```

2. **キャプチャグループを使った確認**

   ```regex
   # デバッグ用
   (\d{3})-(\d{4})-(\d{4})

   ```

3. **フラグを活用**

   ```regex
   # 大文字小文字を区別しない（言語により記法が異なる）
   /pattern/i

   ```

## パフォーマンスの考慮事項

### 効率的なパターン

```regex
# Good: 具体的

^(https?|ftp)://

# Bad: 非効率

^(h|f).*(s|p)://

# Good: 非キャプチャグループ

(?:abc|def)+

# Bad: 不要なキャプチャ

(abc|def)+

```

### 回避すべきパターン

```regex
# 破滅的バックトラッキング（避ける）

(a+)+b
(a*)*

```

## よくある間違いと対策

### エスケープの忘れ

```regex
# Wrong: ドット文字をリテラルとして扱いたい場合

example.com

# Correct: エスケープが必要

example\.com

```

### 量詞の適用範囲

```regex
# Wrong: "ab" の繰り返しを意図している場合

ab+

# Correct: グループ化が必要

(ab)+

```

### 文字クラス内での特殊文字

```regex
# Wrong: ハイフンを文字として扱いたい場合

[a-z-A-Z]

# Correct: ハイフンは最初か最後に配置

[-a-zA-Z]
[a-zA-Z-]

```

## 実際の使用例

### ログ解析

```bash
# Apacheアクセスログの解析

grep -E '^[0-9.]+.*"GET /api/' access.log

# エラーログの抽出

grep -E '(ERROR|FATAL|CRITICAL)' application.log

# IPアドレス別アクセス数

grep -oE '^[0-9.]+' access.log | sort | uniq -c | sort -nr

```

### データクリーニング

```python
import re

def clean_phone_number(phone):
    # 数字以外を除去
    digits = re.sub(r'[^\d]', '', phone)

    # 11桁の携帯電話番号の場合
    if len(digits) == 11 and digits.startswith('0'):
        return f"{digits[:3]}-{digits[3:7]}-{digits[7:]}"

    return phone

# テストデータ

phones = ["090-1234-5678", "090 1234 5678", "09012345678", "(090)1234-5678"]
for phone in phones:
    print(f"{phone} -> {clean_phone_number(phone)}")

```

### バリデーション

```javascript
function validateForm(data) {
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{3}-\d{4}-\d{4}$/,
        zipcode: /^\d{3}-\d{4}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    };

    const errors = {};

    for (const [field, pattern] of Object.entries(patterns)) {
        if (data[field] && !pattern.test(data[field])) {
            errors[field] = `Invalid ${field} format`;
        }
    }

    return errors;
}

```

## 参考情報

### 学習リソース

- **正規表現入門書籍**: 「詳説 正規表現」Jeffrey Friedl著
- **練習サイト**: RegexOne, Regex Crossword
- **チートシート**: 各言語のドキュメント

### 正規表現フレーバーの違い

| 機能 | POSIX BRE | POSIX ERE | PCRE | JavaScript |
|------|-----------|-----------|------|------------|
| `+` | `\+` | `+` | `+` | `+` |
| `?` | `\?` | `?` | `?` | `?` |
| `{n,m}` | `\{n,m\}` | `{n,m}` | `{n,m}` | `{n,m}` |
| `(...)` | `\(...\)` | `(...)` | `(...)` | `(...)` |
| 先読み | ❌ | ❌ | ✅ | ✅ |
| 後読み | ❌ | ❌ | ✅ | 一部 |

### まとめ

正規表現は強力なパターンマッチング機能を提供しますが、複雑になりがちです。以下のポイントを意識して使用してください：

1. **シンプルに保つ**: 必要以上に複雑なパターンは避ける
2. **テストを行う**: 期待する結果が得られることを確認
3. **ドキュメント化**: 複雑なパターンにはコメントを付ける
4. **パフォーマンスを考慮**: 大量のデータに対しては効率性を重視
5. **代替手段も検討**: 場合によっては文字列関数の方が適切

正規表現をマスターすることで、テキスト処理の効率が大幅に向上し、多くのプログラミングタスクで役立つでしょう。
