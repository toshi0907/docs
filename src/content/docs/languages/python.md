---
title: "Python リファレンス"
description: "Pythonの基本的な使い方とプログラミングのリファレンスです。"
sidebar:
  label: "Python"
---

Pythonの基本的な使い方とプログラミングのリファレンスです。初学者でも理解しやすいように段階的に説明します。

## 基本概念

### Python とは

Pythonは、シンプルで読みやすい構文を持つ高水準プログラミング言語です。1991年にGuido van Rossumによって開発され、現在は世界中で広く使用されています。

**特徴:**
- 読みやすく書きやすい構文
- 豊富な標準ライブラリ
- クロスプラットフォーム対応
- オープンソース
- 幅広い用途（Web開発、データ分析、AI/機械学習、自動化など）

### Python の哲学

Pythonには「Pythonの禅（The Zen of Python）」という設計哲学があります：

```python
import this

```

主要な原則：
- Beautiful is better than ugly（美しいものの方が醜いものより良い）
- Simple is better than complex（単純なものの方が複雑なものより良い）
- Readability counts（可読性は重要）

## インストールと環境設定

### Python のインストール

#### Windows

1. [Python公式サイト](https://www.python.org/downloads/)からインストーラーをダウンロード
2. インストーラーを実行し、「Add Python to PATH」にチェック
3. 「Install Now」をクリック

#### macOS

```bash
# Homebrewを使用する場合

brew install python3

# 公式インストーラーを使用する場合

# https://www.python.org/downloads/からダウンロード

```

#### Linux（Ubuntu/Debian）

```bash
sudo apt update
sudo apt install python3 python3-pip

```

### バージョン確認

```bash
python3 --version
pip3 --version

```

### インタラクティブシェル

```bash
python3

```

```python
>>> print("Hello, Python!")
Hello, Python!
>>> exit()

```

## 変数とデータ型

### 変数の宣言と代入

```python
# 変数の宣言（型の指定は不要）

name = "太郎"
age = 25
height = 175.5
is_student = True

```

### 基本データ型

#### 数値型

```python
# 整数（int）

integer_num = 42
negative_num = -10

# 浮動小数点数（float）

float_num = 3.14
scientific = 1.5e-4

# 複素数（complex）

complex_num = 3 + 4j

```

#### 文字列型（str）

```python
# 文字列の作成

single_quote = 'Hello'
double_quote = "World"
multi_line = """複数行の
文字列です"""

# 文字列の連結

full_message = single_quote + " " + double_quote
formatted = f"私の名前は{name}、年齢は{age}歳です"

```

#### ブール型（bool）

```python
is_true = True
is_false = False

# ブール値の評価

print(bool(1))    # True
print(bool(0))    # False
print(bool(""))   # False
print(bool("text"))  # True

```

#### None型

```python
empty_value = None
print(empty_value)  # None

```

### 型変換

```python
# 型変換の例

str_num = "123"
int_num = int(str_num)        # 123
float_num = float(str_num)    # 123.0
str_back = str(int_num)       # "123"

# 型の確認

print(type(int_num))          # <class 'int'>
print(isinstance(int_num, int))  # True

```

## 演算子

### 算術演算子

```python
a = 10
b = 3

print(a + b)   # 13 (加算)
print(a - b)   # 7  (減算)
print(a * b)   # 30 (乗算)
print(a / b)   # 3.333... (除算)
print(a // b)  # 3  (整数除算)
print(a % b)   # 1  (剰余)
print(a ** b)  # 1000 (べき乗)

```

### 比較演算子

```python
x = 5
y = 10

print(x == y)  # False (等しい)
print(x != y)  # True  (等しくない)
print(x < y)   # True  (より小さい)
print(x > y)   # False (より大きい)
print(x <= y)  # True  (以下)
print(x >= y)  # False (以上)

```

### 論理演算子

```python
a = True
b = False

print(a and b)  # False (かつ)
print(a or b)   # True  (または)
print(not a)    # False (否定)

```

### 代入演算子

```python
x = 10
x += 5   # x = x + 5  -> 15
x -= 3   # x = x - 3  -> 12
x *= 2   # x = x * 2  -> 24
x /= 4   # x = x / 4  -> 6.0

```

## 条件分岐とループ

### if文

```python
age = 20

if age >= 20:
    print("成人です")
elif age >= 13:
    print("未成年者です")
else:
    print("子供です")

# 三項演算子

status = "成人" if age >= 20 else "未成年"

```

### for文

```python
# リストをループ

fruits = ["りんご", "バナナ", "オレンジ"]
for fruit in fruits:
    print(f"好きな果物: {fruit}")

# range()を使用

for i in range(5):      # 0から4まで
    print(i)

for i in range(1, 6):   # 1から5まで
    print(i)

for i in range(0, 10, 2):  # 0から8まで、2つ飛び
    print(i)

# enumerate()でインデックスと値を取得

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

```

### while文

```python
count = 0
while count < 5:
    print(f"カウント: {count}")
    count += 1

# 無限ループ（breakで脱出）

while True:
    user_input = input("'q'で終了: ")
    if user_input == 'q':
        break
    print(f"入力された値: {user_input}")

```

### ループ制御

```python
# break: ループを終了

for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue: 次のイテレーションへ

for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9

```

## 関数

### 関数の定義

```python
def greet(name):
    """挨拶する関数"""
    return f"こんにちは、{name}さん！"

# 関数の呼び出し

message = greet("太郎")
print(message)

```

### パラメータと引数

```python
# デフォルト引数

def introduce(name, age=20):
    return f"私は{name}、{age}歳です"

print(introduce("太郎"))        # デフォルト値を使用
print(introduce("花子", 25))    # 値を指定

# キーワード引数

def create_profile(name, age, city="東京"):
    return f"{name}（{age}歳）は{city}に住んでいます"

profile = create_profile(age=30, name="次郎", city="大阪")

```

### 可変長引数

```python
# *args: 位置引数の可変長

def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs: キーワード引数の可変長

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="太郎", age=25, city="東京")

```

### ラムダ関数

```python
# ラムダ関数の定義

square = lambda x: x ** 2
print(square(5))  # 25

# リストと組み合わせて使用

numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# フィルタリング

even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]

```

## リストとタプル

### リスト（list）

```python
# リストの作成

fruits = ["りんご", "バナナ", "オレンジ"]
numbers = [1, 2, 3, 4, 5]
mixed = ["文字", 123, True, None]

# 要素へのアクセス

print(fruits[0])     # "りんご"
print(fruits[-1])    # "オレンジ"（最後の要素）

# スライシング

print(numbers[1:4])  # [2, 3, 4]
print(numbers[:3])   # [1, 2, 3]
print(numbers[2:])   # [3, 4, 5]
print(numbers[::2])  # [1, 3, 5]（2つ飛び）

```

### リストの操作

```python
fruits = ["りんご", "バナナ"]

# 要素の追加

fruits.append("オレンジ")           # 末尾に追加
fruits.insert(1, "いちご")          # 指定位置に挿入
fruits.extend(["ぶどう", "メロン"])  # 複数要素を追加

# 要素の削除

fruits.remove("バナナ")    # 値で削除
deleted = fruits.pop()     # 末尾を削除して返す
fruits.clear()             # 全削除

# その他の操作

numbers = [3, 1, 4, 1, 5]
numbers.sort()             # ソート
print(numbers.count(1))    # 1の個数をカウント
print(numbers.index(4))    # 4のインデックスを取得

```

### リスト内包表記

```python
# 基本的な使い方

squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 条件付き

even_squares = [x ** 2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# 条件式を含む

abs_values = [x if x >= 0 else -x for x in [-3, -1, 0, 1, 3]]
print(abs_values)  # [3, 1, 0, 1, 3]

```

### タプル（tuple）

```python
# タプルの作成（変更不可）

coordinates = (10, 20)
colors = ("赤", "緑", "青")
single_tuple = (42,)  # 要素が1つの場合はカンマが必要

# アンパック

x, y = coordinates
print(f"x={x}, y={y}")

# 複数の値を返す関数

def get_name_age():
    return "太郎", 25

name, age = get_name_age()

```

## 辞書と集合

### 辞書（dict）

```python
# 辞書の作成

person = {
    "name": "太郎",
    "age": 25,
    "city": "東京"
}

# 別の作成方法

person2 = dict(name="花子", age=23, city="大阪")

# 要素へのアクセス

print(person["name"])        # "太郎"
print(person.get("age"))     # 25
print(person.get("job", "未設定"))  # デフォルト値

```

### 辞書の操作

```python
person = {"name": "太郎", "age": 25}

# 要素の追加・更新

person["job"] = "エンジニア"
person.update({"city": "東京", "age": 26})

# 要素の削除

del person["city"]
job = person.pop("job", "未設定")

# キー、値、アイテムの取得

print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['太郎', 26])
print(person.items())   # dict_items([('name', '太郎'), ('age', 26)])

# ループ

for key, value in person.items():
    print(f"{key}: {value}")

```

### 辞書内包表記

```python
# 基本的な使い方

squares = {x: x ** 2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 条件付き

even_squares = {x: x ** 2 for x in range(10) if x % 2 == 0}

```

### 集合（set）

```python
# 集合の作成

numbers = {1, 2, 3, 4, 5}
colors = {"赤", "緑", "青"}
empty_set = set()  # 空の集合

# リストから集合を作成（重複を除去）

unique_numbers = set([1, 2, 2, 3, 3, 4])
print(unique_numbers)  # {1, 2, 3, 4}

```

### 集合の操作

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# 和集合

print(set1 | set2)         # {1, 2, 3, 4, 5, 6}
print(set1.union(set2))

# 積集合

print(set1 & set2)         # {3, 4}
print(set1.intersection(set2))

# 差集合

print(set1 - set2)         # {1, 2}
print(set1.difference(set2))

# 対称差集合

print(set1 ^ set2)         # {1, 2, 5, 6}

# 要素の追加・削除

numbers = {1, 2, 3}
numbers.add(4)
numbers.remove(1)
numbers.discard(10)  # 存在しなくてもエラーなし

```

## 文字列操作

### 文字列の基本操作

```python
text = "Python プログラミング"

# 長さ

print(len(text))           # 17

# 大文字・小文字

english = "Hello World"
print(english.upper())     # "HELLO WORLD"
print(english.lower())     # "hello world"
print(english.capitalize())  # "Hello world"
print(english.title())     # "Hello World"

# 検索

print("Python" in text)    # True
print(text.find("プログラ"))   # 7
print(text.startswith("Python"))  # True
print(text.endswith("ング"))      # True

```

### 文字列の分割と結合

```python
# 分割

sentence = "Python,Java,JavaScript"
languages = sentence.split(",")
print(languages)  # ['Python', 'Java', 'JavaScript']

# 結合

joined = " - ".join(languages)
print(joined)  # "Python - Java - JavaScript"

# 空白の除去

text = "  Hello World  "
print(text.strip())   # "Hello World"
print(text.lstrip())  # "Hello World  "
print(text.rstrip())  # "  Hello World"

```

### 文字列の置換とフォーマット

```python
# 置換

text = "私はPythonが好きです"
replaced = text.replace("Python", "プログラミング")
print(replaced)  # "私はプログラミングが好きです"

# フォーマット（古い方法）

name = "太郎"
age = 25
old_format = "私は%sで、%d歳です" % (name, age)

# .format()メソッド

new_format = "私は{}で、{}歳です".format(name, age)
named_format = "私は{name}で、{age}歳です".format(name=name, age=age)

# f-string（Python 3.6以降）

f_string = f"私は{name}で、{age}歳です"
calculation = f"来年は{age + 1}歳になります"

```

### 正規表現

```python
import re

text = "電話番号: 090-1234-5678"

# パターンマッチング

pattern = r"\d{3}-\d{4}-\d{4}"
if re.search(pattern, text):
    print("電話番号が見つかりました")

# 抽出

phone_numbers = re.findall(pattern, text)
print(phone_numbers)  # ['090-1234-5678']

# 置換

masked = re.sub(r"\d{3}-\d{4}-\d{4}", "XXX-XXXX-XXXX", text)
print(masked)  # "電話番号: XXX-XXXX-XXXX"

```

## ファイル操作

### ファイルの読み書き

```python
# ファイルの書き込み

with open("sample.txt", "w", encoding="utf-8") as file:
    file.write("Hello, Python!\n")
    file.write("ファイル操作のテストです。\n")

# ファイルの読み込み

with open("sample.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# 1行ずつ読み込み

with open("sample.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())

# 全行をリストで取得

with open("sample.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
    print(lines)

```

### ファイルモード

```python
# 書き込みモード

# "w"  : 書き込み（上書き）
# "a"  : 追記

# "x"  : 新規作成（既存ファイルがあるとエラー）

# 読み込みモード

# "r"  : 読み込み
# "r+" : 読み書き

# バイナリモード

# "rb" : バイナリ読み込み
# "wb" : バイナリ書き込み

# 追記の例

with open("log.txt", "a", encoding="utf-8") as file:
    file.write("新しいログエントリ\n")

```

### パス操作

```python
import os
from pathlib import Path

# 現在のディレクトリ

current_dir = os.getcwd()
print(current_dir)

# ファイルの存在確認

if os.path.exists("sample.txt"):
    print("ファイルが存在します")

# ディレクトリの作成

os.makedirs("new_folder", exist_ok=True)

# pathlibを使用（推奨）

path = Path("data/sample.txt")
print(path.parent)      # data
print(path.name)        # sample.txt
print(path.suffix)      # .txt
print(path.stem)        # sample

# ディレクトリ内のファイル一覧

for file_path in Path(".").glob("*.py"):
    print(file_path)

```

### CSV ファイル操作

```python
import csv

# CSV書き込み

data = [
    ["名前", "年齢", "職業"],
    ["太郎", 25, "エンジニア"],
    ["花子", 30, "デザイナー"],
    ["次郎", 22, "学生"]
]

with open("people.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# CSV読み込み

with open("people.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# 辞書として読み込み

with open("people.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['名前']}は{row['年齢']}歳の{row['職業']}です")

```

## 例外処理

### 基本的な例外処理

```python
try:
    # 例外が発生する可能性のあるコード
    number = int(input("数値を入力してください: "))
    result = 10 / number
    print(f"結果: {result}")
except ValueError:
    print("無効な数値が入力されました")
except ZeroDivisionError:
    print("0で割ることはできません")
except Exception as e:
    print(f"予期しないエラーが発生しました: {e}")
else:
    print("正常に処理が完了しました")
finally:
    print("この部分は必ず実行されます")

```

### 独自例外の定義

```python
class CustomError(Exception):
    """独自の例外クラス"""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    if age < 0:
        raise CustomError("年齢は0以上である必要があります")
    if age > 150:
        raise CustomError("年齢は150以下である必要があります")
    return True

try:
    validate_age(-5)
except CustomError as e:
    print(f"エラー: {e.message}")

```

### よくある例外の種類

```python
# ファイル関連

try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("ファイルが見つかりません")

# リスト関連

try:
    my_list = [1, 2, 3]
    print(my_list[10])
except IndexError:
    print("インデックスが範囲外です")

# 辞書関連

try:
    my_dict = {"a": 1}
    print(my_dict["b"])
except KeyError:
    print("キーが存在しません")

# 型関連

try:
    result = "文字列" + 5
except TypeError:
    print("型が適切ではありません")

```

## クラスとオブジェクト指向

### クラスの定義

```python
class Person:
    """人を表すクラス"""

    # クラス変数
    species = "Homo sapiens"

    def __init__(self, name, age):
        """コンストラクタ"""
        self.name = name        # インスタンス変数
        self.age = age
        self._private_info = "秘密情報"  # プライベート（慣例）

    def introduce(self):
        """自己紹介メソッド"""
        return f"私の名前は{self.name}で、{self.age}歳です"

    def have_birthday(self):
        """誕生日メソッド"""
        self.age += 1
        print(f"誕生日おめでとう！{self.age}歳になりました")

    @classmethod
    def from_string(cls, person_str):
        """クラスメソッド"""
        name, age = person_str.split("-")
        return cls(name, int(age))

    @staticmethod
    def is_adult(age):
        """スタティックメソッド"""
        return age >= 20

# インスタンスの作成

person1 = Person("太郎", 25)
person2 = Person("花子", 22)

print(person1.introduce())
person1.have_birthday()

# クラスメソッドの使用

person3 = Person.from_string("次郎-19")
print(person3.introduce())

# スタティックメソッドの使用

print(Person.is_adult(18))  # False

```

### 継承

```python
class Student(Person):
    """学生クラス（Personを継承）"""

    def __init__(self, name, age, school):
        super().__init__(name, age)  # 親クラスのコンストラクタを呼び出し
        self.school = school
        self.grades = []

    def introduce(self):
        """オーバーライド"""
        parent_intro = super().introduce()
        return f"{parent_intro}。{self.school}の学生です"

    def add_grade(self, grade):
        """成績を追加"""
        self.grades.append(grade)

    def get_average(self):
        """平均点を計算"""
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)

# 学生インスタンスの作成

student = Student("佐藤", 20, "東京大学")
print(student.introduce())
student.add_grade(85)
student.add_grade(92)
print(f"平均点: {student.get_average()}")

```

### プロパティとデコレータ

```python
class Temperature:
    """温度クラス"""

    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        """摂氏温度を取得"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """摂氏温度を設定"""
        if value < -273.15:
            raise ValueError("絶対零度より低い温度は設定できません")
        self._celsius = value

    @property
    def fahrenheit(self):
        """華氏温度を取得"""
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        """華氏温度を設定"""
        self.celsius = (value - 32) * 5/9

# 使用例

temp = Temperature(25)
print(f"摂氏: {temp.celsius}°C")
print(f"華氏: {temp.fahrenheit}°F")

temp.fahrenheit = 100
print(f"摂氏: {temp.celsius}°C")

```

### 特殊メソッド（マジックメソッド）

```python
class Vector:
    """2Dベクトルクラス"""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """文字列表現"""
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        """開発者向け文字列表現"""
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):
        """加算演算子"""
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        """等価比較"""
        return self.x == other.x and self.y == other.y

    def __len__(self):
        """長さ（ベクトルのノルム）"""
        return (self.x ** 2 + self.y ** 2) ** 0.5

# 使用例

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1)           # Vector(1, 2)
print(v1 + v2)      # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 2.23606797749979

```

## モジュールとパッケージ

### モジュールの作成と使用

**utils.py**

```python
"""ユーティリティ関数モジュール"""

def calculate_area(length, width):
    """面積を計算する"""
    return length * width

def greet(name):
    """挨拶する"""
    return f"こんにちは、{name}さん！"

PI = 3.14159

class Calculator:
    """計算機クラス"""

    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def multiply(a, b):
        return a * b

```

**main.py**

```python
# モジュール全体をインポート

import utils

area = utils.calculate_area(10, 5)
message = utils.greet("太郎")
print(f"面積: {area}")
print(message)

# 特定の関数をインポート

from utils import calculate_area, PI

area = calculate_area(3, 4)
circle_area = PI * 5 ** 2

# エイリアスを使用

import utils as u
calc = u.Calculator()
result = calc.add(10, 20)

# 全てをインポート（推奨されない）

from utils import *

```

### パッケージの作成

**ディレクトリ構造:**

```

mypackage/
    __init__.py
    math_utils.py
    string_utils.py
    subpackage/
        __init__.py
        advanced.py

```

**mypackage/__init__.py**

```python
"""パッケージの初期化ファイル"""

from .math_utils import add, multiply
from .string_utils import capitalize_words

__version__ = "1.0.0"
__all__ = ["add", "multiply", "capitalize_words"]

```

**mypackage/math_utils.py**

```python
"""数学関連のユーティリティ"""

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def power(base, exponent):
    return base ** exponent

```

**使用例:**

```python
# パッケージからインポート

from mypackage import add, multiply
from mypackage.string_utils import capitalize_words
from mypackage.subpackage.advanced import complex_function

result = add(5, 3)
text = capitalize_words("hello world")

```

### モジュール検索パスとimportlib

```python
import sys
import importlib

# モジュール検索パスを確認

print(sys.path)

# パスを追加

sys.path.append("/path/to/custom/modules")

# 動的インポート

module_name = "math"
math_module = importlib.import_module(module_name)
print(math_module.pi)

# モジュールの再読み込み

importlib.reload(utils)

```

## 標準ライブラリ

### datetime - 日付と時刻

```python
from datetime import datetime, date, time, timedelta

# 現在の日時

now = datetime.now()
today = date.today()
current_time = datetime.now().time()

print(f"現在: {now}")
print(f"今日: {today}")
print(f"時刻: {current_time}")

# 日時の作成

birthday = datetime(1990, 5, 15, 14, 30)
specific_date = date(2023, 12, 25)

# 文字列との変換

date_str = now.strftime("%Y年%m月%d日 %H時%M分")
parsed_date = datetime.strptime("2023-12-25", "%Y-%m-%d")

# 時間の計算

tomorrow = today + timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_ago = now - timedelta(hours=2)

print(f"明日: {tomorrow}")
print(f"来週: {next_week}")

```

### os - オペレーティングシステム

```python
import os

# 環境変数

home_dir = os.environ.get("HOME", "/default/path")
os.environ["MY_VAR"] = "設定値"

# ディレクトリ操作

current_dir = os.getcwd()
os.chdir("/tmp")
os.makedirs("new/nested/directory", exist_ok=True)

# ファイル操作

files = os.listdir(".")
for file in files:
    if os.path.isfile(file):
        size = os.path.getsize(file)
        print(f"{file}: {size} bytes")

# パス操作

path = os.path.join("folder", "subfolder", "file.txt")
dirname = os.path.dirname(path)
basename = os.path.basename(path)

```

### json - JSON処理

```python
import json

# 辞書をJSONに変換

data = {
    "name": "太郎",
    "age": 25,
    "hobbies": ["読書", "映画鑑賞"],
    "married": False
}

# JSON文字列に変換

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# JSONファイルに保存

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# JSONファイルから読み込み

with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)

# JSON文字列から辞書に変換

parsed_data = json.loads(json_str)

```

### random - 乱数生成

```python
import random

# 基本的な乱数

print(random.random())          # 0.0以上1.0未満
print(random.randint(1, 10))    # 1以上10以下の整数
print(random.uniform(1.0, 10.0))  # 1.0以上10.0未満の浮動小数点

# リストから選択

colors = ["赤", "青", "緑", "黄色"]
print(random.choice(colors))      # ランダムに1つ選択
print(random.sample(colors, 2))   # ランダムに2つ選択（重複なし）

# シャッフル

numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)

# シード値の設定（再現可能な乱数）

random.seed(42)

```

### collections - コレクション

```python
from collections import Counter, defaultdict, deque, namedtuple

# Counter - 要素の出現回数をカウント

text = "hello world"
counter = Counter(text)
print(counter)  # Counter({'l': 3, 'o': 2, 'h': 1, ...})
print(counter.most_common(3))  # 上位3つ

# defaultdict - デフォルト値を持つ辞書

dd = defaultdict(list)
dd["fruits"].append("りんご")
dd["fruits"].append("バナナ")
print(dd)  # defaultdict(<class 'list'>, {'fruits': ['りんご', 'バナナ']})

# deque - 両端キュー

dq = deque([1, 2, 3])
dq.appendleft(0)    # 左端に追加
dq.append(4)        # 右端に追加
dq.popleft()        # 左端から削除
dq.pop()            # 右端から削除

# namedtuple - 名前付きタプル

Person = namedtuple("Person", ["name", "age", "city"])
person = Person("太郎", 25, "東京")
print(f"{person.name}は{person.age}歳です")

```

### itertools - イテレータ

```python
import itertools

# 無限イテレータ

counter = itertools.count(1, 2)  # 1, 3, 5, 7, ...
cycler = itertools.cycle(["A", "B", "C"])  # A, B, C, A, B, C, ...

# 組み合わせ

items = ["A", "B", "C"]
combinations = list(itertools.combinations(items, 2))
print(combinations)  # [('A', 'B'), ('A', 'C'), ('B', 'C')]

permutations = list(itertools.permutations(items, 2))
print(permutations)  # [('A', 'B'), ('A', 'C'), ('B', 'A'), ...]

# グループ化

data = [1, 1, 2, 2, 2, 3, 1]
grouped = itertools.groupby(data)
for key, group in grouped:
    print(f"{key}: {list(group)}")

# チェーン

list1 = [1, 2, 3]
list2 = [4, 5, 6]
chained = list(itertools.chain(list1, list2))
print(chained)  # [1, 2, 3, 4, 5, 6]

```

## 仮想環境とパッケージ管理

### venv - 仮想環境

```bash
# 仮想環境の作成

python3 -m venv myenv

# 仮想環境の有効化

## Windows
myenv\Scripts\activate
## macOS/Linux

source myenv/bin/activate

# 仮想環境の無効化

deactivate

# 仮想環境の削除

rm -rf myenv

```

### pip - パッケージ管理

```bash
# パッケージのインストール

pip install requests
pip install "django>=3.0,<4.0"
pip install numpy pandas matplotlib

# 開発用パッケージのインストール

pip install -e .  # カレントディレクトリをパッケージとしてインストール

# インストール済みパッケージの確認

pip list
pip show requests

# 要件ファイルの作成と使用

pip freeze > requirements.txt
pip install -r requirements.txt

# パッケージのアップグレード

pip install --upgrade requests
pip install --upgrade pip

# パッケージのアンインストール

pip uninstall requests

```

### requirements.txt の例

```txt
# Web開発

django==4.2.0
requests>=2.25.0
flask>=2.0.0

# データ分析

numpy>=1.20.0
pandas>=1.3.0
matplotlib>=3.5.0

# 開発ツール

pytest>=6.0.0
black>=22.0.0
flake8>=4.0.0

# 本番環境のみ

gunicorn==20.1.0; platform_system != "Windows"

```

### プロジェクト構造の例

```

myproject/
    venv/                   # 仮想環境
    src/
        mypackage/
            __init__.py
            main.py
            utils.py
    tests/
        test_main.py
        test_utils.py
    docs/
        README.md
    requirements.txt
    setup.py
    .gitignore

```

## 実用的な例

### 1. ファイル整理スクリプト

```python
import os
import shutil
from pathlib import Path

def organize_downloads(download_folder):
    """ダウンロードフォルダをファイル種類別に整理"""

    # ファイル種類別のフォルダ
    folders = {
        "images": [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
        "documents": [".pdf", ".doc", ".docx", ".txt", ".rtf"],
        "videos": [".mp4", ".avi", ".mov", ".wmv", ".flv"],
        "music": [".mp3", ".wav", ".flac", ".aac"],
        "archives": [".zip", ".rar", ".7z", ".tar", ".gz"]
    }

    download_path = Path(download_folder)

    # フォルダを作成
    for folder_name in folders.keys():
        (download_path / folder_name).mkdir(exist_ok=True)

    # ファイルを移動
    for file_path in download_path.iterdir():
        if file_path.is_file():
            file_extension = file_path.suffix.lower()

            for folder_name, extensions in folders.items():
                if file_extension in extensions:
                    destination = download_path / folder_name / file_path.name
                    shutil.move(str(file_path), str(destination))
                    print(f"移動: {file_path.name} -> {folder_name}/")
                    break
            else:
                # その他のファイル
                other_folder = download_path / "others"
                other_folder.mkdir(exist_ok=True)
                destination = other_folder / file_path.name
                shutil.move(str(file_path), str(destination))
                print(f"移動: {file_path.name} -> others/")

# 使用例

# organize_downloads("/path/to/Downloads")

```

### 2. Webスクレイピング

```python
import requests
from bs4 import BeautifulSoup
import csv
import time

def scrape_news_titles(url, max_articles=10):
    """ニュースサイトから記事タイトルを取得"""

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "html.parser")

        # タイトルを抽出（サイトに応じて調整が必要）
        titles = []
        article_elements = soup.find_all("h2", class_="title")[:max_articles]

        for element in article_elements:
            title = element.get_text(strip=True)
            link = element.find("a")["href"] if element.find("a") else ""
            titles.append({"title": title, "link": link})

        return titles

    except requests.RequestException as e:
        print(f"エラーが発生しました: {e}")
        return []

def save_to_csv(articles, filename="news_articles.csv"):
    """記事データをCSVファイルに保存"""

    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["title", "link"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for article in articles:
            writer.writerow(article)

    print(f"{len(articles)}件の記事を{filename}に保存しました")

# 使用例

# articles = scrape_news_titles("https://example-news-site.com")
# save_to_csv(articles)

```

### 3. データ分析スクリプト

```python
import json
import csv
from collections import defaultdict, Counter
from datetime import datetime
import matplotlib.pyplot as plt

def analyze_sales_data(csv_file):
    """売上データを分析"""

    sales_data = []
    monthly_sales = defaultdict(float)
    product_sales = Counter()

    # CSVファイルから読み込み
    with open(csv_file, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            # データの変換
            row["date"] = datetime.strptime(row["date"], "%Y-%m-%d")
            row["amount"] = float(row["amount"])
            row["quantity"] = int(row["quantity"])

            sales_data.append(row)

            # 月別売上
            month_key = row["date"].strftime("%Y-%m")
            monthly_sales[month_key] += row["amount"]

            # 商品別売上
            product_sales[row["product"]] += row["quantity"]

    # 統計情報
    total_sales = sum(monthly_sales.values())
    avg_monthly_sales = total_sales / len(monthly_sales)
    best_selling_product = product_sales.most_common(1)[0]

    print(f"総売上: ¥{total_sales:,.0f}")
    print(f"月平均売上: ¥{avg_monthly_sales:,.0f}")
    print(f"最売れ筋商品: {best_selling_product[0]} ({best_selling_product[1]}個)")

    # グラフの作成
    create_sales_chart(monthly_sales, product_sales)

    return {
        "total_sales": total_sales,
        "monthly_sales": dict(monthly_sales),
        "product_sales": dict(product_sales)
    }

def create_sales_chart(monthly_sales, product_sales):
    """売上グラフを作成"""

    plt.figure(figsize=(12, 5))

    # 月別売上グラフ
    plt.subplot(1, 2, 1)
    months = list(monthly_sales.keys())
    amounts = list(monthly_sales.values())
    plt.bar(months, amounts)
    plt.title("月別売上")
    plt.xticks(rotation=45)
    plt.ylabel("売上額 (¥)")

    # 商品別売上グラフ
    plt.subplot(1, 2, 2)
    top_products = dict(product_sales.most_common(5))
    plt.pie(top_products.values(), labels=top_products.keys(), autopct="%1.1f%%")
    plt.title("トップ5商品の売上比率")

    plt.tight_layout()
    plt.savefig("sales_analysis.png", dpi=300, bbox_inches="tight")
    plt.show()

# 使用例

# results = analyze_sales_data("sales_data.csv")

```

### 4. 自動化スクリプト

```python
import schedule
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

# ログ設定

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("automation.log"),
        logging.StreamHandler()
    ]
)

def send_daily_report():
    """日次レポートをメールで送信"""

    try:
        # レポートデータの生成
        report_data = generate_daily_report()

        # メール送信
        send_email(
            to="manager@company.com",
            subject="日次レポート",
            body=report_data
        )

        logging.info("日次レポートを送信しました")

    except Exception as e:
        logging.error(f"日次レポート送信エラー: {e}")

def generate_daily_report():
    """日次レポートのデータを生成"""

    today = datetime.now().strftime("%Y年%m月%d日")

    # 実際のデータ収集処理をここに実装
    report = f"""
    {today} 日次レポート

    ■ システム状況
    - サーバー稼働率: 99.9%
    - エラー件数: 0件
    - 処理件数: 1,234件

    ■ 売上情報
    - 本日の売上: ¥123,456
    - 目標達成率: 98.7%

    ■ その他
    - 特記事項なし
    """

    return report

def send_email(to, subject, body):
    """メール送信"""

    # SMTP設定（実際の設定に変更してください）
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    username = "your_email@gmail.com"
    password = "your_password"

    msg = MIMEMultipart()
    msg["From"] = username
    msg["To"] = to
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain", "utf-8"))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(username, password)
        server.send_message(msg)

def backup_database():
    """データベースバックアップ"""

    try:
        # バックアップ処理（実際の処理に変更してください）
        backup_command = "mysqldump -u user -p database > backup.sql"
        os.system(backup_command)

        logging.info("データベースバックアップが完了しました")

    except Exception as e:
        logging.error(f"バックアップエラー: {e}")

# スケジュール設定

schedule.every().day.at("09:00").do(send_daily_report)
schedule.every().day.at("02:00").do(backup_database)
schedule.every().monday.at("10:00").do(lambda: print("週次処理"))

def run_scheduler():
    """スケジューラーを実行"""

    logging.info("自動化スクリプトを開始しました")

    while True:
        schedule.run_pending()
        time.sleep(60)  # 1分ごとにチェック

# 使用例

# run_scheduler()

```

### 5. API クライアント

```python
import requests
import json
from typing import Dict, List, Optional

class WeatherAPI:
    """天気予報APIクライアント"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.openweathermap.org/data/2.5"
        self.session = requests.Session()

    def get_current_weather(self, city: str) -> Optional[Dict]:
        """現在の天気を取得"""

        url = f"{self.base_url}/weather"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric",
            "lang": "ja"
        }

        try:
            response = self.session.get(url, params=params)
            response.raise_for_status()
            return response.json()

        except requests.RequestException as e:
            print(f"天気データ取得エラー: {e}")
            return None

    def get_forecast(self, city: str, days: int = 5) -> Optional[List[Dict]]:
        """天気予報を取得"""

        url = f"{self.base_url}/forecast"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric",
            "lang": "ja",
            "cnt": days * 8  # 3時間ごとのデータ
        }

        try:
            response = self.session.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return data.get("list", [])

        except requests.RequestException as e:
            print(f"予報データ取得エラー: {e}")
            return None

    def format_weather_info(self, weather_data: Dict) -> str:
        """天気情報をフォーマット"""

        if not weather_data:
            return "天気情報を取得できませんでした"

        city = weather_data["name"]
        temp = weather_data["main"]["temp"]
        description = weather_data["weather"][0]["description"]
        humidity = weather_data["main"]["humidity"]

        return f"""
        🌍 {city}の天気
        🌡️ 気温: {temp}°C
        ☁️ 天候: {description}
        💧 湿度: {humidity}%
        """

def main():
    """メイン処理"""

    # API キーを設定（実際のキーに変更してください）
    api_key = "your_api_key_here"
    weather = WeatherAPI(api_key)

    # 現在の天気を取得
    cities = ["東京", "大阪", "札幌"]

    for city in cities:
        current_weather = weather.get_current_weather(city)
        if current_weather:
            info = weather.format_weather_info(current_weather)
            print(info)
            print("-" * 30)

# 使用例

# main()

```

このPythonリファレンスは、基本的な構文から実用的なスクリプトまで、Pythonプログラミングに必要な知識を網羅しています。各セクションで学んだ内容を組み合わせることで、より複雑で実用的なアプリケーションを構築できます。

**学習のポイント:**
1. まずは基本的な構文をしっかりと理解する
2. 小さなプログラムから始めて、徐々に複雑な処理に挑戦する
3. エラーメッセージをよく読み、デバッグスキルを身につける
4. 標準ライブラリやサードパーティライブラリを積極的に活用する
5. コードの可読性と保守性を常に意識する

継続的な学習と実践により、Pythonの力を最大限に活用できるようになります。
