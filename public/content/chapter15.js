// 第15章：標準ライブラリ活用
registerChapter({
  number: 15,
  title: "標準ライブラリ活用",
  description: "math・random・collections・itertools・functools・jsonなど、Pythonに最初から同梱されている便利なモジュール群の使い方を学びます。",
  steps: [
    {
      id: 141,
      title: "importとモジュール（math）",
      explanation: `<p>Pythonには、よく使う機能をまとめた<strong>モジュール</strong>（関数や定数を集めた部品ファイル）が最初から大量に同梱されています。これを<strong>標準ライブラリ</strong>と呼び、「バッテリー同梱（batteries included）」というPythonの設計思想を象徴する存在です。追加インストールなしで、数学・乱数・日付・JSONなどの機能がすぐ使えます。</p>
<p>モジュールを使うには、ファイルの先頭で<code>import モジュール名</code>と書きます。読み込んだあとは<code>モジュール名.関数名()</code>の形で呼び出します。</p>
<pre><code>import math

print(math.sqrt(2))     # 平方根 → 1.4142135623730951
print(math.floor(3.7))  # 切り捨て → 3
print(math.ceil(3.2))   # 切り上げ → 4
print(math.pi)          # 円周率の定数 → 3.141592653589793</code></pre>
<p>mathモジュールの代表的な機能を整理します。</p>
<table>
<tr><th>名前</th><th>意味</th><th>例</th></tr>
<tr><td>math.sqrt(x)</td><td>平方根</td><td>math.sqrt(16) → 4.0</td></tr>
<tr><td>math.floor(x)</td><td>切り捨て（小さい方の整数へ）</td><td>math.floor(3.7) → 3</td></tr>
<tr><td>math.ceil(x)</td><td>切り上げ（大きい方の整数へ）</td><td>math.ceil(3.2) → 4</td></tr>
<tr><td>math.pi</td><td>円周率（関数ではなく定数）</td><td>3.141592653589793</td></tr>
</table>
<p>importせずに<code>math.sqrt(16)</code>を呼ぶと、「mathという名前を知らない」という意味の<code>NameError: name 'math' is not defined</code>が発生します。import文は「この名前を使います」という宣言なので、使うより前（慣習的にはファイルの先頭）に書くのがルールです。なお<code>math.sqrt()</code>の戻り値は整数の平方根でも<code>4.0</code>のようにfloat型になる点も覚えておきましょう。</p>`,
      task: `実行すると<code>NameError</code>になるコードです。先頭に<code>import math</code>を追加して、4つのprintがすべて動くように修正してください。`,
      code: `# 平方根や切り捨てなどの数学関数はmathモジュールにまとまっている
# TODO: このまま実行するとNameErrorになる
# 先頭に「import math」を1行追加して直す

print(math.sqrt(16))
print(math.floor(3.7))
print(math.ceil(3.2))
print(round(math.pi, 2))`,
      solution: `# 平方根や切り捨てなどの数学関数はmathモジュールにまとまっている
import math

print(math.sqrt(16))
print(math.floor(3.7))
print(math.ceil(3.2))
print(round(math.pi, 2))`,
      hints: [
        "モジュールは使う前にimportで読み込む必要があります。エラーメッセージの「name 'math' is not defined」は「mathという名前を知らない」という意味です。",
        "ファイルの1行目（コメントの下）に「import math」と書くだけで、math.sqrt()などが使えるようになります。"
      ],
      expectedOutput: "3.14"
    },
    {
      id: 142,
      title: "from importとas",
      explanation: `<p>import文には書き方のバリエーションがあります。使い分けを覚えると、コードがすっきり読みやすくなります。</p>
<table>
<tr><th>書き方</th><th>呼び出し方</th><th>使いどころ</th></tr>
<tr><td>import math</td><td>math.sqrt(16)</td><td>基本形。どのモジュール由来か一目で分かる</td></tr>
<tr><td>from math import sqrt, pi</td><td>sqrt(16)</td><td>特定の関数だけ頻繁に使うとき</td></tr>
<tr><td>import statistics as st</td><td>st.mean(...)</td><td>長いモジュール名に短い別名を付けるとき</td></tr>
</table>
<pre><code>from math import sqrt, pi
print(sqrt(16))  # モジュール名なしで直接呼べる

import statistics as st
print(st.mean([1, 2, 3]))  # 別名stで呼べる</code></pre>
<p><code>from モジュール名 import 名前</code>は、モジュールの中の特定の関数や定数だけを現在のファイルに直接取り込む書き方です。カンマ区切りで複数指定できます。ただし<code>from math import *</code>のようにアスタリスクで全部取り込む書き方は、どの名前がどこから来たのか分からなくなり、名前の衝突（自分の変数を上書きしてしまう事故）も起きやすいため、実務では避けるのが定石です。</p>
<p><code>import モジュール名 as 別名</code>は、モジュールに短い別名（エイリアス）を付けます。データ分析の世界では<code>import numpy as np</code>や<code>import pandas as pd</code>という別名がほぼ業界標準になっているほど、よく使われる書き方です。</p>
<p>今回使うstatisticsモジュールは平均や中央値などの統計計算を提供する標準ライブラリで、<code>st.mean()</code>（平均）と<code>st.median()</code>（中央値：データを並べたときの真ん中の値）を試します。</p>`,
      task: `TODOの2箇所を修正してください。(1)<code>sqrt</code>と<code>pi</code>をfrom importで直接使えるようにする、(2)statisticsモジュールを別名<code>st</code>で取り込む。`,
      code: `# TODO 1: 下のimport文を「from math import sqrt, pi」に書き換えて、
# モジュール名なしでsqrtとpiを使えるようにする
import math

print(sqrt(25))
print(round(pi, 3))

# TODO 2: statisticsモジュールを別名stで取り込む（import 名前 as 別名）
import statistics

print(st.mean([1, 2, 3, 4]))
print(st.median([1, 5, 2, 8, 3]))`,
      solution: `from math import sqrt, pi

print(sqrt(25))
print(round(pi, 3))

import statistics as st

print(st.mean([1, 2, 3, 4]))
print(st.median([1, 5, 2, 8, 3]))`,
      hints: [
        "「from math import sqrt, pi」と書くと、math.を付けずにsqrt(25)やpiが直接使えます。",
        "別名を付けるには「import statistics as st」。以降はst.mean()、st.median()の形で呼び出せます。"
      ],
      expectedOutput: "3.142"
    },
    {
      id: 143,
      title: "randomとseed固定",
      explanation: `<p>randomモジュールは乱数（ランダムな値）を作る標準ライブラリです。ゲームの敵の出現、テストデータの生成、機械学習のデータシャッフルなど、実務でも登場頻度の高いモジュールです。</p>
<table>
<tr><th>関数</th><th>意味</th></tr>
<tr><td>random.randint(a, b)</td><td>a以上b以下の整数を1つ返す（bを含む点に注意）</td></tr>
<tr><td>random.choice(リスト)</td><td>リストから要素を1つランダムに選ぶ</td></tr>
<tr><td>random.shuffle(リスト)</td><td>リストの並び順をその場でシャッフルする</td></tr>
<tr><td>random.random()</td><td>0.0以上1.0未満の小数を返す</td></tr>
<tr><td>random.seed(値)</td><td>乱数の種を固定する</td></tr>
</table>
<p>ここで重要なのが<strong>シード（seed：乱数の種）</strong>です。コンピュータの乱数は実は計算で作られる「疑似乱数」で、計算の出発点となる種の値が同じなら、生成される乱数の列も毎回完全に同じになります。</p>
<pre><code>import random

random.seed(42)  # 種を42に固定
print(random.randint(1, 6))  # 何度実行しても同じ値になる
print(random.choice(["A", "B", "C"]))  # これも毎回同じ</code></pre>
<p>「ランダムなのに毎回同じ」は一見矛盾に思えますが、実務では極めて重要なテクニックです。テストで「乱数を使う処理の結果」を検証したいとき、機械学習で「実験を再現」したいとき、シードを固定しないと結果が毎回変わって比較できません。この性質を<strong>再現性</strong>と呼びます。逆に本番のゲームや抽選では、seedを固定せず（デフォルトでは現在時刻などから種が作られる）毎回違う結果にします。</p>`,
      task: `このままだと実行のたびに結果が変わるコードです。<code>import random</code>の直後に<code>random.seed(42)</code>を追加して、何度実行しても同じ結果になるようにしてください。`,
      code: `import random

# TODO: このままだと実行のたびに結果が変わってしまう。
# import文の直後に random.seed(42) を1行追加して、
# 何度実行しても同じ結果（再現性のある結果）になるようにする

for i in range(3):
    print("サイコロ:", random.randint(1, 6))

fruits = ["りんご", "みかん", "バナナ"]
print("選ばれたのは:", random.choice(fruits))`,
      solution: `import random

random.seed(42)

for i in range(3):
    print("サイコロ:", random.randint(1, 6))

fruits = ["りんご", "みかん", "バナナ"]
print("選ばれたのは:", random.choice(fruits))`,
      hints: [
        "random.seed(42)は「乱数の種を42に固定する」という意味です。乱数を使う処理より前に1回だけ呼びます。",
        "importの直後（forループより前）にrandom.seed(42)を書けば、randint・choiceの結果が毎回同じ列になります。"
      ],
      expectedOutput: "選ばれたのは: バナナ"
    },
    {
      id: 144,
      title: "collections.Counter",
      explanation: `<p>「リストの中に各要素が何個あるか数える」処理は、実務で非常によく出てきます。辞書とforループでも書けますが、collectionsモジュールの<strong>Counter</strong>を使えば1行で終わります。</p>
<pre><code>from collections import Counter

votes = ["犬", "猫", "犬", "鳥", "犬"]
counter = Counter(votes)
print(counter)            # Counter({'犬': 3, '猫': 1, '鳥': 1})
print(counter["犬"])      # 3
print(counter["うさぎ"])  # 0（存在しないキーでもKeyErrorにならない）</code></pre>
<p>Counterは辞書（dict）のサブクラス（辞書を拡張したクラス）で、キーが要素、値が出現回数になります。普通の辞書と違い、<strong>存在しないキーにアクセスしてもKeyErrorにならず0を返す</strong>のが便利なポイントです。</p>
<p>もうひとつの目玉機能が<code>most_common(n)</code>です。出現回数の多い順に上位n件を「(要素, 回数)のタプルのリスト」で返します。引数を省略すると全要素を多い順に返します。</p>
<pre><code>print(counter.most_common(2))
# [('犬', 3), ('猫', 1)] のように多い順で返る</code></pre>
<p>手書きの集計ループと比べてみましょう。</p>
<table>
<tr><th>方法</th><th>行数</th><th>特徴</th></tr>
<tr><td>辞書＋forループ</td><td>4〜5行</td><td>初期化やキー存在チェックが必要</td></tr>
<tr><td>Counter(リスト)</td><td>1行</td><td>集計・ランキング・0返しが揃っている</td></tr>
</table>
<p>「自分で書けるけど標準ライブラリに任せる」のは手抜きではなく、バグを減らし意図を明確にする実務の基本姿勢です。コードレビューでも、手書き集計ループはCounterへの置き換えを提案されることが多いです。</p>`,
      task: `手作業の集計ループを<code>Counter(fruits)</code>の1行に置き換えてください。そのままだと最後の<code>most_common</code>の行が<code>AttributeError</code>になります（普通の辞書にはmost_commonがないため）。`,
      code: `# TODO: 手作業の集計をCounterで置き換える
# 1. from collections import Counter を先頭に追加
# 2. 下の集計ループ（4行）を counter = Counter(fruits) の1行にする
# ※今のままでは最後の行がAttributeErrorになる
#   （普通の辞書にはmost_commonメソッドがないため）

fruits = ["りんご", "みかん", "りんご", "バナナ", "みかん", "りんご"]

counter = {}
for f in fruits:
    if f not in counter:
        counter[f] = 0
    counter[f] += 1

print(counter["りんご"])
print(counter.most_common(2))
print(counter["ぶどう"])`,
      solution: `from collections import Counter

fruits = ["りんご", "みかん", "りんご", "バナナ", "みかん", "りんご"]

counter = Counter(fruits)

print(counter["りんご"])
print(counter.most_common(2))
print(counter["ぶどう"])`,
      hints: [
        "Counterはリストを渡すだけで要素の出現回数を数えてくれます。from collections import Counter で取り込みます。",
        "counter = Counter(fruits) と書けば、if文を含む集計ループはまるごと不要になります。Counterなら存在しない「ぶどう」も0が返ります。"
      ],
      expectedOutput: "[('りんご', 3), ('みかん', 2)]"
    },
    {
      id: 145,
      title: "collections.defaultdict",
      explanation: `<p>「キーごとにリストを持つ辞書」を作るとき、普通の辞書では最初のアクセスで<code>KeyError</code>が起きます。</p>
<pre><code>groups = {}
groups["a"].append("apple")  # KeyError: 'a'（"a"キーがまだ無い）</code></pre>
<p>この問題を解決するのがcollectionsモジュールの<strong>defaultdict</strong>です。「存在しないキーにアクセスされたら、指定した関数を呼んで初期値を自動生成する辞書」で、コンストラクタに初期値を作る関数を渡します。</p>
<pre><code>from collections import defaultdict

groups = defaultdict(list)       # 初期値は list() つまり空リスト
groups["a"].append("apple")      # "a"キーが自動的に[]で作られてから追加
print(groups["a"])               # ['apple']

counts = defaultdict(int)        # 初期値は int() つまり0
counts["x"] += 1                 # 0から始まるので初回でも足せる</code></pre>
<p>渡すのは<code>list()</code>のような呼び出しではなく、<code>list</code>という<strong>関数（クラス）そのもの</strong>である点に注意してください。第14章で学んだ「関数はオブジェクトとして渡せる」の実践例です。</p>
<table>
<tr><th>初期値の指定</th><th>作られる初期値</th><th>典型用途</th></tr>
<tr><td>defaultdict(list)</td><td>[]（空リスト）</td><td>グループ分け（値を追記していく）</td></tr>
<tr><td>defaultdict(int)</td><td>0</td><td>カウント（+=で数える）</td></tr>
<tr><td>defaultdict(set)</td><td>set()（空集合）</td><td>重複なしの収集</td></tr>
</table>
<p>使い分けの目安は、単純な出現回数の集計ならCounter、「キーごとに複数の値を集める」グループ分けならdefaultdict(list)です。なお、defaultdictは「読むだけのつもりのアクセス」でもキーを作ってしまう副作用があるため、存在チェックには<code>in</code>演算子を使うことも覚えておくと安全です。</p>`,
      task: `実行すると<code>KeyError</code>になるコードです。<code>from collections import defaultdict</code>を追加し、<code>groups</code>を<code>defaultdict(list)</code>に書き換えて、頭文字ごとのグループ分けが動くようにしてください。`,
      code: `# 単語を頭文字ごとにグループ分けする
# TODO: このまま実行すると1周目のループでKeyErrorになる
# 1. from collections import defaultdict を先頭に追加
# 2. groups = {} を groups = defaultdict(list) に書き換える

words = ["apple", "banana", "avocado", "blueberry", "cherry"]

groups = {}
for word in words:
    groups[word[0]].append(word)

for key in sorted(groups):
    print(key, groups[key])`,
      solution: `from collections import defaultdict

words = ["apple", "banana", "avocado", "blueberry", "cherry"]

groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)

for key in sorted(groups):
    print(key, groups[key])`,
      hints: [
        "KeyErrorの原因は、まだ存在しないキー groups['a'] に対していきなり.append()しようとしているためです。",
        "defaultdict(list)にすると、存在しないキーへのアクセス時に空リストが自動で作られるので、そのまま.append()できます。渡すのはlist()ではなくlistです。"
      ],
      expectedOutput: "a ['apple', 'avocado']"
    },
    {
      id: 146,
      title: "itertools（chain・product）",
      explanation: `<p>itertoolsは「イテレータを組み合わせる道具箱」と呼ばれる標準ライブラリです。第13章で学んだイテレータの考え方をベースに、ループ処理の定番パターンを効率よく書けます。今回は代表格の<code>chain</code>と<code>product</code>を学びます。</p>
<h4>chain：複数のイテラブルを連結して1つのループで回す</h4>
<pre><code>import itertools

list1 = [1, 2]
list2 = [3, 4]
for x in itertools.chain(list1, list2):
    print(x)  # 1, 2, 3, 4 の順に出る</code></pre>
<p><code>list1 + list2</code>との違いは、chainが<strong>新しいリストを作らない</strong>ことです。+演算子は連結結果のリストをメモリ上に丸ごと作りますが、chainは要素を順に取り出すイテレータを返すだけなので、大きなデータでもメモリを余分に使いません。またリストとタプルなど、型の違うイテラブル同士も連結できます。</p>
<h4>product：複数のイテラブルの全組み合わせ（直積）を作る</h4>
<pre><code>sizes = ["S", "M"]
colors = ["赤", "青"]
for size, color in itertools.product(sizes, colors):
    print(size, color)  # S赤, S青, M赤, M青 の4通り</code></pre>
<p>productは二重forループと同じ全組み合わせを生成します。数学の「直積」に相当し、商品バリエーションの生成やテストケースの網羅などで活躍します。二重ループがproduct1つになることで、ネスト（入れ子）が減ってコードが平坦になり読みやすくなるのが実務上のメリットです。3つ以上のイテラブルも渡せるため、三重・四重ループの置き換えにも使えます。</p>
<p>itertoolsには他にも、要素の並べ替えを全列挙する<code>permutations</code>、組み合わせを列挙する<code>combinations</code>などがあります。「ループの定番パターンだな」と感じたら、まずitertoolsに既製品がないか探す習慣をつけましょう。</p>`,
      task: `TODOの2箇所を書き換えてください。(1)リストの連結を<code>itertools.chain</code>に、(2)二重forループを<code>itertools.product</code>を使った1つのループにします。出力は変わらないことを確認しましょう。`,
      code: `import itertools

morning = ["メール確認", "朝会"]
afternoon = ["実装", "レビュー"]

# TODO 1: 「morning + afternoon」をitertools.chain(morning, afternoon)に
# 書き換える（新しいリストを作らずに連結して回せる）
for task in morning + afternoon:
    print(task)

sizes = ["S", "M"]
colors = ["赤", "青"]

# TODO 2: 二重ループをitertools.product(sizes, colors)を使った
# 1つのループに書き換える（for size, color in ...の形で受け取る）
for size in sizes:
    for color in colors:
        print(size + "の" + color)`,
      solution: `import itertools

morning = ["メール確認", "朝会"]
afternoon = ["実装", "レビュー"]

for task in itertools.chain(morning, afternoon):
    print(task)

sizes = ["S", "M"]
colors = ["赤", "青"]

for size, color in itertools.product(sizes, colors):
    print(size + "の" + color)`,
      hints: [
        "chainは複数のイテラブルを引数に取り、先頭から順に要素を流してくれます。for task in itertools.chain(morning, afternoon): の形です。",
        "productは全組み合わせをタプルで返すので、for size, color in itertools.product(sizes, colors): のように2つの変数でアンパックして受け取ります。"
      ],
      expectedOutput: "Sの赤"
    },
    {
      id: 147,
      title: "functools（reduce・lru_cache）",
      explanation: `<p>functoolsは「関数を扱うための関数」を集めた標準ライブラリです。第14章で学んだデコレータやクロージャの知識が活きる場所で、今回は<code>reduce</code>と<code>lru_cache</code>を学びます。</p>
<h4>reduce：リストを畳み込んで1つの値にする</h4>
<pre><code>from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a * b, numbers)
print(total)  # 120（((((1*2)*3)*4)*5)）</code></pre>
<p>reduceは「2引数の関数」と「イテラブル」を受け取り、先頭から順に<strong>結果と次の要素をその関数で結合し続けて</strong>最終的に1つの値にします。合計ならsum()がありますが、積や独自の結合ルールにはreduceが便利です。lambda式（第9章）との組み合わせが定番です。</p>
<h4>lru_cache：関数の結果を自動でキャッシュするデコレータ</h4>
<pre><code>from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n &lt;= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))  # 832040（キャッシュのおかげで一瞬）</code></pre>
<p>キャッシュとは「一度計算した結果を保存しておき、同じ入力が来たら計算せずに保存済みの結果を返す」仕組みです。フィボナッチ数列の素朴な再帰は同じ計算を何度も繰り返すため、fib(30)で約270万回も関数が呼ばれますが、<code>@lru_cache</code>を付けるだけで31回程度に激減します。LRUはLeast Recently Used（最近使われていないものから捨てる）の略で、<code>maxsize</code>でキャッシュの上限を指定できます（Noneは無制限）。</p>
<p>注意点として、キャッシュが効くのは「同じ引数なら必ず同じ結果を返す関数」だけです。乱数や外部状態に依存する関数に付けると、古い結果が返り続けるバグになります。</p>`,
      task: `TODOの2箇所を修正してください。(1)合計を計算しているループを<code>reduce</code>と<code>lambda</code>による積の計算に置き換える、(2)<code>fib</code>関数に<code>@lru_cache(maxsize=None)</code>を付けて高速化する。`,
      code: `from functools import reduce, lru_cache

numbers = [1, 2, 3, 4, 5]

# TODO 1: このループは「合計」を求めている。
# reduce(lambda a, b: a * b, numbers) に置き換えて「積」を求める
total = 0
for n in numbers:
    total += n
print("積:", total)

# TODO 2: このままだとfib(30)の計算に同じ呼び出しが何百万回も発生する。
# @lru_cache(maxsize=None) をdefの直前の行に付けて高速化する
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print("fib(30):", fib(30))`,
      solution: `from functools import reduce, lru_cache

numbers = [1, 2, 3, 4, 5]

total = reduce(lambda a, b: a * b, numbers)
print("積:", total)

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print("fib(30):", fib(30))`,
      hints: [
        "reduceの第1引数は「2つの値を受け取って1つにまとめる関数」です。積ならlambda a, b: a * b を渡します。",
        "lru_cacheはデコレータなので、@lru_cache(maxsize=None) を def fib(n): の直前の行に書きます。第14章の@構文と同じ形です。"
      ],
      expectedOutput: "fib(30): 832040"
    },
    {
      id: 148,
      title: "heapq・bisect",
      explanation: `<p>今回は「効率よくデータを扱う」2つの標準ライブラリを学びます。どちらも、単純なやり方より計算量（データ量が増えたときの処理時間の伸び方）の面で有利になる道具です。</p>
<h4>heapq：最小値を高速に取り出すヒープ</h4>
<pre><code>import heapq

scores = [30, 10, 50, 20, 40]
heapq.heapify(scores)          # リストをヒープ構造に並べ替える
print(heapq.heappop(scores))   # 10（最小値が取り出される）
print(heapq.heappop(scores))   # 20（次の最小値）</code></pre>
<p>ヒープとは「先頭が常に最小値になるよう管理されたリスト」です。<code>heapify</code>でリストをヒープ化し、<code>heappop</code>で最小値を取り出し、<code>heappush</code>で要素を追加します。毎回sort()し直すのと違い、追加や取り出しのたびに全体を並べ替えないため高速です。「優先度の高いタスクから処理する」優先度付きキューの実装として、ジョブスケジューラや経路探索アルゴリズムで使われます。</p>
<h4>bisect：ソート済みリストへの二分探索</h4>
<pre><code>import bisect

data = [10, 20, 30, 40, 50]
pos = bisect.bisect_left(data, 35)  # 35を入れるべき位置 → 3
bisect.insort(data, 35)             # ソート順を保ったまま挿入
print(data)  # [10, 20, 30, 35, 40, 50]</code></pre>
<p>二分探索とは「ソート済みのデータを半分ずつに絞り込んで探す」方法で、先頭から順に見る線形探索よりはるかに速く位置を特定できます。<code>bisect_left</code>は「この値を入れるならどの位置か」を返し、<code>insort</code>は実際にソート順を保って挿入します。</p>
<table>
<tr><th>やりたいこと</th><th>道具</th></tr>
<tr><td>最小値（最優先のもの）を次々取り出す</td><td>heapq</td></tr>
<tr><td>ソート済みリストに順序を保って挿入・位置検索</td><td>bisect</td></tr>
</table>
<p>どちらも「前提条件」が大事です。heappopはヒープ化済みのリストに、bisectはソート済みのリストにだけ正しく動きます。</p>`,
      task: `TODOの2箇所を書き換えてください。(1)sortではなく<code>heapq.heapify</code>と<code>heappop</code>で最小値を2回取り出す、(2)<code>bisect.bisect_left</code>で35を入れる位置を調べ、<code>bisect.insort</code>で挿入する。`,
      code: `import heapq
import bisect

scores = [30, 10, 50, 20, 40]

# TODO 1: sortを使わずに、heapq.heapify(scores)でヒープ化してから
# heapq.heappop(scores)で最小値を2回取り出して表示する
scores.sort()
print("最小値:", scores[0])
print("2番目:", scores[1])

sorted_scores = [10, 20, 30, 40, 50]

# TODO 2: bisect.bisect_left(sorted_scores, 35)で挿入位置を調べ、
# bisect.insort(sorted_scores, 35)でソート順を保ったまま挿入する
print("35を入れる位置:", 0)
print(sorted_scores)`,
      solution: `import heapq
import bisect

scores = [30, 10, 50, 20, 40]

heapq.heapify(scores)
print("最小値:", heapq.heappop(scores))
print("2番目:", heapq.heappop(scores))

sorted_scores = [10, 20, 30, 40, 50]

pos = bisect.bisect_left(sorted_scores, 35)
print("35を入れる位置:", pos)
bisect.insort(sorted_scores, 35)
print(sorted_scores)`,
      hints: [
        "heapq.heapify(scores)でリストをヒープ化すると、heapq.heappop(scores)が呼ばれるたびに残りの最小値が取り出されます。",
        "bisect.bisect_left(sorted_scores, 35)は挿入位置（インデックス）を返すだけで、実際に挿入するのはbisect.insort(sorted_scores, 35)です。"
      ],
      expectedOutput: "[10, 20, 30, 35, 40, 50]"
    },
    {
      id: 149,
      title: "json（dumps・loads）",
      explanation: `<p>JSON（JavaScript Object Notation）は、システム間でデータをやり取りするための世界標準のテキスト形式です。Web APIのレスポンス、設定ファイル、ログ出力など、実務のあらゆる場面で登場します。Pythonの辞書とよく似た見た目ですが、あくまで「文字列」である点が重要です。</p>
<p>jsonモジュールの中心は2つの関数です。名前の由来はdump（吐き出す）とload（読み込む）で、末尾のsはstring（文字列）を意味します。</p>
<table>
<tr><th>関数</th><th>変換の向き</th><th>覚え方</th></tr>
<tr><td>json.dumps(オブジェクト)</td><td>Python → JSON文字列</td><td>送信・保存する側</td></tr>
<tr><td>json.loads(文字列)</td><td>JSON文字列 → Python</td><td>受信・復元する側</td></tr>
</table>
<pre><code>import json

user = {"name": "佐藤", "age": 28}
text = json.dumps(user, ensure_ascii=False)
print(text)        # {"name": "佐藤", "age": 28}
print(type(text))  # str（辞書ではなく文字列になっている）

data = json.loads('{"city": "Tokyo", "population": 14000000}')
print(data["city"])  # Tokyo（辞書として使える）</code></pre>
<p>注意すべきポイントが3つあります。第一に、<code>ensure_ascii=False</code>を指定しないと日本語が「\\u4f50\\u85e4」のようなエスケープ表記になります（日本語をそのまま出したい場面での定番オプションです）。第二に、変換の対応関係です。JSONとPythonでは真偽値や空値の表記が異なり、<code>true/false/null</code>はPythonでは<code>True/False/None</code>に相互変換されます。第三に、str(辞書)とjson.dumps(辞書)は別物です。Pythonのstr()はシングルクォートを使うためJSONとしては不正で、他のシステムに渡すと解析エラーになります。必ずjson.dumpsを使いましょう。</p>
<p>整形して見やすくしたいときは<code>json.dumps(user, ensure_ascii=False, indent=2)</code>のようにインデント幅も指定できます。</p>`,
      task: `TODOの2箇所を修正してください。(1)<code>str(user)</code>を<code>json.dumps(user, ensure_ascii=False)</code>に置き換える、(2)JSON文字列を<code>json.loads</code>で辞書に戻してから値を取り出す（今のままでは文字列に対する辞書アクセスでTypeErrorになります）。`,
      code: `import json

user = {"name": "佐藤", "age": 28, "skills": ["Python", "SQL"]}

# TODO 1: str()ではJSONとして不正な形式（シングルクォート）になる。
# json.dumps(user, ensure_ascii=False) に置き換える
text = str(user)
print(text)
print("型:", type(text).__name__)

# TODO 2: json_textはただの文字列なので、このままではTypeErrorになる。
# json.loads(json_text) で辞書に変換してから使う
json_text = '{"city": "Tokyo", "population": 14000000}'
data = json_text
print(data["city"])
print(data["population"] + 1)`,
      solution: `import json

user = {"name": "佐藤", "age": 28, "skills": ["Python", "SQL"]}

text = json.dumps(user, ensure_ascii=False)
print(text)
print("型:", type(text).__name__)

json_text = '{"city": "Tokyo", "population": 14000000}'
data = json.loads(json_text)
print(data["city"])
print(data["population"] + 1)`,
      hints: [
        "json.dumpsはPythonのオブジェクトをJSON文字列に変換します。日本語をそのまま出すにはensure_ascii=Falseを付けます。",
        "受け取ったJSON文字列はjson.loadsで辞書に戻します。戻した後はdata['city']のように普通の辞書として使えます。"
      ],
      expectedOutput: "14000001"
    },
    {
      id: 150,
      title: "総合演習（単語頻度カウンタ）",
      explanation: `<p>この章の総仕上げとして、テキスト分析の入門課題である<strong>単語頻度カウンタ</strong>を作ります。単語のリストから「総単語数」「異なり語数」「頻度ランキング」を求め、結果をJSONレポートとして出力する、という小さなツールです。検索エンジンのキーワード分析やレビューの傾向分析など、実務のテキスト処理の原型といえる処理です。</p>
<p>使う道具はこの章で学んだものだけです。</p>
<table>
<tr><th>処理</th><th>使う道具</th><th>学んだステップ</th></tr>
<tr><td>出現回数の集計</td><td>Counter(words)</td><td>ステップ144</td></tr>
<tr><td>頻度トップNの取得</td><td>most_common(n)</td><td>ステップ144</td></tr>
<tr><td>結果のJSON出力</td><td>json.dumps</td><td>ステップ149</td></tr>
</table>
<p>用語を2つ押さえておきましょう。<strong>総単語数</strong>は重複を含めた単語の個数（len(words)）、<strong>異なり語数</strong>は重複を除いた種類の数です。Counterのキーは重複なしなので、len(counter)がそのまま異なり語数になります。</p>
<pre><code>from collections import Counter

words = ["a", "b", "a", "c", "a"]
counter = Counter(words)
print(len(words))    # 5（総単語数）
print(len(counter))  # 3（異なり語数：a, b, c）
for word, count in counter.most_common(2):
    print(word, count)  # a 3 → b 1 の順</code></pre>
<p>most_common(n)は「(単語, 回数)のタプル」のリストを返すため、forループで<code>for word, count in ...</code>とアンパックして受け取るのが定番の形です。またdict()に渡せばそのまま辞書になるので、JSONレポートに組み込むのも簡単です。同数の場合は先に出現した単語が先に並ぶため、結果は毎回同じになります。</p>
<p>手作業の集計ループを既製品の部品に置き換えていくと、コードの行数が減るだけでなく「何をしているか」が名前から読み取れるようになります。標準ライブラリを知っていること自体が、コードの読みやすさへの投資なのです。</p>`,
      task: `TODOの3箇所を完成させてください。(1)手作業の集計を<code>Counter(words)</code>に置き換える、(2)<code>most_common(3)</code>で頻度トップ3を「単語: N回」の形式で表示する、(3)トップ3を含めたレポート辞書を<code>json.dumps</code>（ensure_ascii=False）で出力する。`,
      code: `import json
from collections import Counter

words = [
    "to", "be", "or", "not", "to", "be",
    "that", "is", "the", "question",
    "to", "be", "is", "to", "do",
]

# TODO 1: 手作業の集計を counter = Counter(words) の1行に置き換える
counter = {}
for w in words:
    counter[w] = counter.get(w, 0) + 1

print("総単語数:", len(words))
print("異なり語数:", len(counter))

print("--- 頻度トップ3 ---")
# TODO 2: counter.most_common(3) を使って、頻度の多い順に
# 「単語: N回」の形式で上位3件を表示する
for word, count in sorted(counter.items()):
    print(f"{word}: {count}回")

# TODO 3: reportに "top": dict(counter.most_common(3)) を追加し、
# json.dumps(report, ensure_ascii=False) で出力する
report = {"total": len(words), "unique": len(counter)}
print(report)`,
      solution: `import json
from collections import Counter

words = [
    "to", "be", "or", "not", "to", "be",
    "that", "is", "the", "question",
    "to", "be", "is", "to", "do",
]

counter = Counter(words)

print("総単語数:", len(words))
print("異なり語数:", len(counter))

print("--- 頻度トップ3 ---")
for word, count in counter.most_common(3):
    print(f"{word}: {count}回")

report = {
    "total": len(words),
    "unique": len(counter),
    "top": dict(counter.most_common(3)),
}
print(json.dumps(report, ensure_ascii=False))`,
      hints: [
        "Counter(words)で集計は1行になります。most_common(3)は多い順に3件の(単語, 回数)タプルを返すので、for word, count in ... でアンパックしましょう。",
        "most_common(3)の結果はdict()に渡すとそのまま辞書になります。report辞書に \"top\" キーとして追加してからjson.dumpsに渡してください。",
        "json.dumpsにはensure_ascii=Falseを忘れずに。出力の最後の行が {\"total\": 15, ...} のようなJSON形式になっていれば完成です。"
      ],
      expectedOutput: "to: 4回"
    }
  ]
});
