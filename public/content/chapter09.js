// 第9章：内包表記とラムダ
registerChapter({
  number: 9,
  title: "内包表記とラムダ",
  description: "リスト・辞書・集合を1行で組み立てる内包表記と、名前のない小さな関数lambdaを学び、データ変換のコードを短く読みやすく書けるようになります。",
  steps: [
    {
      id: 81,
      title: "リスト内包表記の基本",
      explanation: `<p>リスト内包表記（list comprehension）は、既存のリストなどをもとに新しいリストを1行で作るPythonらしい構文です。第7章で学んだ「空のリストを用意してfor文でappendしていく」処理を、より短く、意図が伝わりやすい形で書けます。</p>
<pre><code># for文で書いた場合
squares = []
for n in [1, 2, 3]:
    squares.append(n * n)

# リスト内包表記で書いた場合（結果は同じ）
squares = [n * n for n in [1, 2, 3]]</code></pre>
<p>構文は次のとおりで、角かっこの中に「式」と「for句」を書きます。</p>
<table>
<tr><th>部分</th><th>役割</th></tr>
<tr><td>式（n * n）</td><td>新しいリストの各要素をどう作るか</td></tr>
<tr><td>for 変数 in イテラブル</td><td>元データを1要素ずつ取り出す（for文と同じ）</td></tr>
</table>
<p>読み方のコツは「forの後ろから読む」ことです。「[1, 2, 3]の各要素nについて、n * nを集めたリスト」と読めば、for文と同じ意味だと分かります。イテラブル（forで回せるオブジェクトの総称。リスト・文字列・rangeなど）なら何でも元データにできます。</p>
<p>内包表記はappendメソッドの呼び出しを繰り返さないぶん、for文よりわずかに高速で、「新しいリストを作る」という目的が1行で伝わるため実務のコードでも頻繁に使われます。一方で、複雑な処理を無理に1行に詰め込むと逆に読みにくくなるので、式が長くなる場合は素直にfor文を使う判断も大切です。</p>`,
      task: `for文で作っている<code>squares_loop</code>と同じ結果になるように、リスト内包表記で<code>squares</code>を作ってください。`,
      code: `numbers = [1, 2, 3, 4, 5]

# for文で書いた場合
squares_loop = []
for n in numbers:
    squares_loop.append(n * n)
print(squares_loop)

# TODO: 同じ結果をリスト内包表記で作る（[式 for 変数 in リスト] の形）
squares = []
print(squares)`,
      solution: `numbers = [1, 2, 3, 4, 5]

# for文で書いた場合
squares_loop = []
for n in numbers:
    squares_loop.append(n * n)
print(squares_loop)

# 同じ結果をリスト内包表記で作る
squares = [n * n for n in numbers]
print(squares)`,
      hints: [
        `内包表記は「[各要素をどう変換するかの式 for 変数 in 元のリスト]」という形です。`,
        `for文のappendの中身「n * n」が、内包表記の先頭に置く式になります。`
      ],
      expectedOutput: "[1, 4, 9, 16, 25]"
    },
    {
      id: 82,
      title: "条件フィルタ付き内包表記（後置if）",
      explanation: `<p>リスト内包表記のfor句の後ろにifを付けると、「条件を満たす要素だけを集める」フィルタ処理が書けます。for句より後ろに置くので「後置if」と呼びます。</p>
<pre><code>numbers = [1, 2, 3, 4, 5, 6]

# for文で書いた場合
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)

# 後置ifを使った内包表記（結果は同じ）
evens = [n for n in numbers if n % 2 == 0]</code></pre>
<p>読み方は「numbersの各要素nのうち、n % 2 == 0を満たすものだけを集めたリスト」です。for文で3行かかっていた絞り込みが1行になり、「フィルタしている」という意図も明確になります。</p>
<p>もちろん、変換とフィルタは組み合わせられます。次の例は「偶数だけを取り出して、それぞれ2乗する」処理です。</p>
<pre><code>even_squares = [n * n for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36]</code></pre>
<p>処理の順序に注意してください。先にifで絞り込まれ、残った要素だけが先頭の式で変換されます。つまり「for→if→式」の順で評価されます。SQLを知っている人なら、式がSELECT、for句がFROM、後置ifがWHEREに対応すると考えると覚えやすいでしょう。実務でも「ログの中からエラー行だけ抜き出す」「在庫が0より多い商品だけ集める」のような絞り込みに毎日のように登場する書き方です。</p>`,
      task: `後置ifを追加して、<code>evens</code>には偶数だけ、<code>passed</code>には80点以上の点数だけが入るようにしてください。`,
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# TODO: 後置ifを追加して偶数だけを取り出す
evens = [n for n in numbers]
print(evens)

scores = [55, 90, 72, 88, 64, 95]

# TODO: 後置ifを追加して80点以上だけを取り出す
passed = [s for s in scores]
print(passed)`,
      solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 後置ifを追加して偶数だけを取り出す
evens = [n for n in numbers if n % 2 == 0]
print(evens)

scores = [55, 90, 72, 88, 64, 95]

# 後置ifを追加して80点以上だけを取り出す
passed = [s for s in scores if s >= 80]
print(passed)`,
      hints: [
        `後置ifは「for 変数 in リスト」のさらに後ろに「if 条件」の形で書きます。`,
        `偶数の判定は剰余演算子を使った「n % 2 == 0」、80点以上は「s >= 80」です。`
      ],
      expectedOutput: "[2, 4, 6, 8, 10]"
    },
    {
      id: 83,
      title: "値の変換にif-else（三項演算子との組み合わせ）",
      explanation: `<p>「条件によって入れる値を変えたい」ときは、第6章で学んだ条件式（三項演算子）を内包表記の式の部分に置きます。ここで多くの人がつまずくのが、後置ifとの書く位置の違いです。</p>
<table>
<tr><th>目的</th><th>書く位置</th><th>例</th></tr>
<tr><td>要素を絞り込む（フィルタ）</td><td>forの後ろ（後置if。elseは書けない）</td><td>[n for n in nums if n % 2 == 0]</td></tr>
<tr><td>値を変換する（if-else）</td><td>forの前（式の一部として書く）</td><td>["偶数" if n % 2 == 0 else "奇数" for n in nums]</td></tr>
</table>
<p>後置ifはあくまで「集めるかどうか」を決めるフィルタなので、elseを続けると構文エラー（SyntaxError）になります。elseが必要になった時点で、それはフィルタではなく「値の変換」なので、forの前に条件式として書く、と覚えてください。</p>
<pre><code>numbers = [1, 2, 3, 4]

# NG: 後置ifにelseは書けない → SyntaxError
# labels = ["偶数" for n in numbers if n % 2 == 0 else "奇数"]

# OK: if-elseはforの前に置く
labels = ["偶数" if n % 2 == 0 else "奇数" for n in numbers]
print(labels)  # ['奇数', '偶数', '奇数', '偶数']</code></pre>
<p>条件式「A if 条件 else B」は、条件が真ならA、偽ならBを返す式でした。内包表記と組み合わせると「全要素を残しつつ、条件に応じて値を出し分ける」処理が1行で書けます。フィルタと変換は同時に使うこともでき、その場合は「式（if-else可） for 変数 in イテラブル if 条件」という並びになります。</p>`,
      task: `実行するとSyntaxErrorになります。if-elseを正しい位置（forの前）に移動して、偶数なら「偶数」、奇数なら「奇数」のラベルのリストを作ってください。`,
      code: `numbers = [1, 2, 3, 4, 5, 6]

# 実行するとSyntaxErrorになる。後置ifにはelseを書けないため、
# if-elseで値を変換するときはforの前に置く必要がある
labels = ["偶数" for n in numbers if n % 2 == 0 else "奇数"]
print(labels)

scores = [55, 90, 72]

# こちらは正しい書き方の例（完成済み）
results = ["合格" if s >= 70 else "不合格" for s in scores]
print(results)`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]

# if-elseで値を変換するときはforの前に置く
labels = ["偶数" if n % 2 == 0 else "奇数" for n in numbers]
print(labels)

scores = [55, 90, 72]

# こちらは正しい書き方の例（完成済み）
results = ["合格" if s >= 70 else "不合格" for s in scores]
print(results)`,
      hints: [
        `elseで値を出し分けるのは「フィルタ」ではなく「変換」です。変換の式はforの前に置きます。`,
        `「"偶数" if n % 2 == 0 else "奇数"」というひとかたまりの条件式を、内包表記の先頭に置きます。`
      ],
      expectedOutput: "['奇数', '偶数', '奇数', '偶数', '奇数', '偶数']"
    },
    {
      id: 84,
      title: "辞書内包表記",
      explanation: `<p>内包表記はリスト専用ではありません。波かっこを使い「キー: 値」の形の式を書くと、辞書を1行で作る辞書内包表記になります。</p>
<pre><code># {キーの式: 値の式 for 変数 in イテラブル}
fruits = ["apple", "banana", "cherry"]
lengths = {name: len(name) for name in fruits}
print(lengths)  # {'apple': 5, 'banana': 6, 'cherry': 6}</code></pre>
<p>既存の辞書を加工するときは、第5章で学んだitems()と多重代入を組み合わせて「for キー, 値 in 辞書.items()」の形で回すのが定番です。次の例は、価格表から税込み価格の辞書を作ります。</p>
<pre><code>prices = {"apple": 120, "banana": 80}
with_tax = {name: int(price * 1.1) for name, price in prices.items()}
print(with_tax)  # {'apple': 132, 'banana': 88}</code></pre>
<p>int()は小数点以下を切り捨てて整数化する関数でした。浮動小数点の誤差（120 * 1.1が132.00000000000003になる現象）があっても、切り捨てにより安定した整数が得られます。</p>
<p>辞書内包表記が特に活躍するのは「リストから検索用の辞書を作る」場面です。リストから目的の要素を探すと先頭から順に調べるため件数に比例して遅くなりますが、辞書ならキーで一発で引けます。大量データを何度も検索する前処理として「名前→データ」の辞書を内包表記で作っておくのは、実務で頻出のパターンです。後置ifによるフィルタもリスト内包表記と同様に使えます（例：値が100以上のペアだけ残す）。</p>`,
      task: `辞書内包表記で、<code>lengths</code>には名前→文字数の辞書を、<code>with_tax</code>には値段を1.1倍してint()で整数化した税込み辞書を作ってください。`,
      code: `fruits = ["apple", "banana", "cherry"]

# TODO: 名前→文字数 の辞書を辞書内包表記で作る（{キーの式: 値の式 for ...} の形）
lengths = {}
print(lengths)

prices = {"apple": 120, "banana": 80, "cherry": 300}

# TODO: items()で回して、値を1.1倍しint()で整数化した税込み辞書を作る
with_tax = {}
print(with_tax)`,
      solution: `fruits = ["apple", "banana", "cherry"]

# 名前→文字数 の辞書を辞書内包表記で作る
lengths = {name: len(name) for name in fruits}
print(lengths)

prices = {"apple": 120, "banana": 80, "cherry": 300}

# items()で回して、値を1.1倍しint()で整数化した税込み辞書を作る
with_tax = {name: int(price * 1.1) for name, price in prices.items()}
print(with_tax)`,
      hints: [
        `辞書内包表記は波かっこの中に「キーの式: 値の式 for 変数 in イテラブル」を書きます。`,
        `既存の辞書から作るときは「for name, price in prices.items()」のように2つの変数で受け取ります。`
      ],
      expectedOutput: "{'apple': 132, 'banana': 88, 'cherry': 330}"
    },
    {
      id: 85,
      title: "集合内包表記",
      explanation: `<p>波かっこの中に「キー: 値」ではなく単独の式を書くと、集合（set）を作る集合内包表記になります。第5章で学んだとおり、集合は重複を持たないデータ構造なので、「変換した結果の重複を自動的に取り除きたい」ときに便利です。</p>
<pre><code>words = ["apple", "Banana", "APPLE", "banana"]

# 小文字に揃えてから集合にする → 重複が消える
unique = {w.lower() for w in words}
print(unique)  # {'banana', 'apple'} など（順序は不定）</code></pre>
<p>「apple」と「APPLE」は文字列としては別物ですが、lower()で小文字化してから集合に入れることで同じものとして扱えます。リスト内包表記＋set()関数でも同じ結果は得られますが、集合内包表記なら中間のリストを作らないぶん無駄がなく、「重複を除きたい」という意図も明確です。</p>
<p>1つ注意すべきなのは、集合には順序がないことです。printしたときの並び順は実行環境によって変わる可能性があるため、順序が必要な場面ではsorted()で並べ替えてリストにしてから使います。</p>
<pre><code>print(sorted(unique))  # ['apple', 'banana'] と順序が確定する</code></pre>
<p>3種類の内包表記の見分け方を整理しておきましょう。</p>
<table>
<tr><th>構文</th><th>作られるもの</th></tr>
<tr><td>[式 for ...]</td><td>リスト</td></tr>
<tr><td>{キー: 値 for ...}</td><td>辞書</td></tr>
<tr><td>{式 for ...}</td><td>集合</td></tr>
</table>`,
      task: `集合内包表記で、<code>unique</code>には各単語を小文字化して重複を除いた集合を、<code>abs_set</code>には各数値の絶対値の集合を作ってください（表示はsorted()で並べ替えています）。`,
      code: `words = ["apple", "Banana", "APPLE", "banana", "Cherry"]

# TODO: 集合内包表記で、lower()で小文字化して重複を除いた集合を作る
unique = set()
print(sorted(unique))

numbers = [1, -2, 3, -3, 2, -1]

# TODO: 集合内包表記で、絶対値（abs関数）の集合を作る
abs_set = set()
print(sorted(abs_set))`,
      solution: `words = ["apple", "Banana", "APPLE", "banana", "Cherry"]

# 集合内包表記で、lower()で小文字化して重複を除いた集合を作る
unique = {w.lower() for w in words}
print(sorted(unique))

numbers = [1, -2, 3, -3, 2, -1]

# 集合内包表記で、絶対値（abs関数）の集合を作る
abs_set = {abs(n) for n in numbers}
print(sorted(abs_set))`,
      hints: [
        `集合内包表記は波かっこで「{式 for 変数 in イテラブル}」と書きます。コロンがない点が辞書内包表記との違いです。`,
        `1つ目は「w.lower()」、2つ目は「abs(n)」を式の部分に置きます。`
      ],
      expectedOutput: "['apple', 'banana', 'cherry']"
    },
    {
      id: 86,
      title: "lambda式",
      explanation: `<p>lambda式（ラムダ式）は、名前を付けずにその場で作る小さな関数です。「引数を受け取って式を1つ評価し、その結果を返す」だけの関数を1行で書けます。</p>
<pre><code># defで書いた関数
def double(x):
    return x * 2

# 同じ働きのlambda式
lambda x: x * 2</code></pre>
<p>構文は「lambda 引数: 式」です。defと違ってreturnは書かず、コロンの後ろの式の値が自動的に戻り値になります。引数はカンマ区切りで複数書けます。</p>
<table>
<tr><th>項目</th><th>def</th><th>lambda</th></tr>
<tr><td>名前</td><td>必須</td><td>不要（無名関数）</td></tr>
<tr><td>中身</td><td>複数の文を書ける</td><td>式1つだけ</td></tr>
<tr><td>if文やfor文</td><td>書ける</td><td>書けない（条件式は可）</td></tr>
<tr><td>主な用途</td><td>あらゆる関数定義</td><td>他の関数に渡す小さな処理</td></tr>
</table>
<p>このステップでは動きを理解するためにlambdaを変数に代入して呼び出しますが、実務でこの書き方をするならdefを使うべき、とPythonの公式スタイルガイド（PEP 8）は定めています。defなら関数名がエラー表示に出てデバッグしやすいからです。</p>
<p>ではlambdaはいつ使うのか。真価を発揮するのは、次のステップで学ぶsorted()のkey引数のように「関数を引数として渡す」場面です。わざわざ名前を付けるほどでもない一度きりの小さな処理を、使う場所のすぐそばに書けるのがlambdaの存在意義です。</p>`,
      task: `<code>double</code>を「xを2倍して返すlambda式」に、<code>add</code>を「aとbの2つの引数を受け取り合計を返すlambda式」に修正してください。`,
      code: `def double_def(x):
    return x * 2

# TODO: 上のdouble_defと同じ働きになるよう、式の部分を直す
double = lambda x: x

# TODO: 2つの引数aとbを受け取り、合計を返すlambda式に書き換える
add = lambda a: a

print(double_def(5))
print(double(5))
print(add(10, 20))`,
      solution: `def double_def(x):
    return x * 2

# double_defと同じ働きのlambda式
double = lambda x: x * 2

# 2つの引数aとbを受け取り、合計を返すlambda式
add = lambda a, b: a + b

print(double_def(5))
print(double(5))
print(add(10, 20))`,
      hints: [
        `lambda式は「lambda 引数: 戻り値になる式」の形です。returnは書きません。`,
        `引数を2つ受け取るときは「lambda a, b: 式」のようにカンマで並べます。`
      ],
      expectedOutput: "30"
    },
    {
      id: 87,
      title: "sortedのkey引数とreverse",
      explanation: `<p>第4章で学んだsorted()は、そのままだと要素を「値そのもの」で比較して昇順に並べます。key引数に関数を渡すと、「各要素をその関数に通した結果」で比較するようになり、並べ替えの基準を自由に決められます。</p>
<pre><code>words = ["banana", "Apple", "cherry", "date"]

print(sorted(words, key=len))        # 文字数の短い順
print(sorted(words, key=str.lower))  # 大文字小文字を区別しない辞書順
print(sorted(words, reverse=True))   # 降順（逆順）</code></pre>
<p>key=lenのように既存の関数をそのまま渡せる点に注目してください。かっこを付けたlen()ではなく、関数そのものを渡します。デフォルトの文字列比較は大文字が小文字より前に並ぶ（内部の文字コード順で比較される）ため、人間の感覚に合わせるにはkey=str.lowerがよく使われます。</p>
<p>そしてlambdaが最も活躍するのがこのkey引数です。タプルや辞書のリストを「特定の位置・キーの値」で並べ替える処理は実務で頻出です。</p>
<pre><code>scores = [("sato", 85), ("suzuki", 92)]

# 各タプルの2番目の要素（点数）を基準に、高い順で並べる
ranking = sorted(scores, key=lambda pair: pair[1], reverse=True)</code></pre>
<p>「lambda pair: pair[1]」は「タプルを受け取り、その2番目の要素を返す関数」です。sorted()は各要素をこの関数に通した値で大小を比較します。なお、Pythonのソートは安定ソート（比較結果が同じ要素どうしは元の順序を保つ）なので、同点の要素の並びが崩れない点も実務では重要な性質です。</p>`,
      task: `3つのTODOを修正してください。1つ目は文字数順（key=len）、2つ目は大文字小文字を区別しない順（key=str.lower）、3つ目は点数の高い順（keyにlambda、reverse=True）です。`,
      code: `words = ["banana", "Apple", "cherry", "date"]

# TODO: 文字数の短い順に並べる（key=len）
print(sorted(words))

# TODO: 大文字小文字を区別せずに並べる（key=str.lower）
print(sorted(words))

scores = [("sato", 85), ("suzuki", 92), ("takahashi", 78)]

# TODO: 点数（各タプルの2番目の要素）の高い順に並べる（keyにlambda、reverse=True）
print(sorted(scores))`,
      solution: `words = ["banana", "Apple", "cherry", "date"]

# 文字数の短い順に並べる
print(sorted(words, key=len))

# 大文字小文字を区別せずに並べる
print(sorted(words, key=str.lower))

scores = [("sato", 85), ("suzuki", 92), ("takahashi", 78)]

# 点数（各タプルの2番目の要素）の高い順に並べる
print(sorted(scores, key=lambda pair: pair[1], reverse=True))`,
      hints: [
        `keyには関数そのものを渡します。「key=len」のようにかっこを付けずに書きます。`,
        `タプルの2番目の要素を取り出す関数は「lambda pair: pair[1]」と書けます。降順にするにはreverse=Trueを追加します。`
      ],
      expectedOutput: "[('suzuki', 92), ('sato', 85), ('takahashi', 78)]"
    },
    {
      id: 88,
      title: "map・filterと内包表記の比較",
      explanation: `<p>内包表記と同じことを実現する組み込み関数として、map()とfilter()があります。他の言語（JavaScriptなど）ではおなじみの関数なので、読めるようにしておきましょう。</p>
<table>
<tr><th>関数</th><th>働き</th><th>内包表記での同等品</th></tr>
<tr><td>map(関数, イテラブル)</td><td>各要素に関数を適用する（変換）</td><td>[f(x) for x in xs]</td></tr>
<tr><td>filter(関数, イテラブル)</td><td>関数がTrueを返す要素だけ残す</td><td>[x for x in xs if f(x)]</td></tr>
</table>
<pre><code>numbers = [1, 2, 3, 4]

mapped = map(lambda n: n * 10, numbers)
print(mapped)        # &lt;map object at 0x...&gt; ← リストではない！
print(list(mapped))  # [10, 20, 30, 40]</code></pre>
<p>重要な注意点として、map()とfilter()の戻り値はリストではなくイテレータ（要素を1つずつ順に取り出せるオブジェクト。求められるまで計算を遅らせる）です。printしてもmap objectとしか表示されないため、結果を確認したいときはlist()でリスト化します。この遅延評価の仕組みは第13章のジェネレータで詳しく学びます。</p>
<p>ではどちらを使うべきか。Pythonコミュニティでは一般に内包表記が推奨されます。lambdaを書くならその場で式を書ける内包表記のほうが短く読みやすいためです。一方、str.lowerのような既存の関数をそのまま適用するだけならmap(str.lower, words)も簡潔で、好みが分かれるところです。実務では他人の書いたmap・filterを正しく読めることがまず大切で、自分で書くときは迷ったら内包表記、と覚えておけば十分です。</p>`,
      task: `map()とfilter()で作った<code>mapped</code>・<code>filtered</code>と同じ結果になるように、2つのprintの中を内包表記で書いてください。`,
      code: `numbers = [1, 2, 3, 4, 5, 6]

# mapとfilterはイテレータを返すので、list()でリスト化して表示する
mapped = list(map(lambda n: n * 10, numbers))
filtered = list(filter(lambda n: n % 2 == 0, numbers))
print(mapped)
print(filtered)

# TODO: 上のmapと同じ結果（全要素を10倍）を内包表記で作る
print([])

# TODO: 上のfilterと同じ結果（偶数だけ）を内包表記で作る
print([])`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]

# mapとfilterはイテレータを返すので、list()でリスト化して表示する
mapped = list(map(lambda n: n * 10, numbers))
filtered = list(filter(lambda n: n % 2 == 0, numbers))
print(mapped)
print(filtered)

# mapと同じ結果（全要素を10倍）を内包表記で作る
print([n * 10 for n in numbers])

# filterと同じ結果（偶数だけ）を内包表記で作る
print([n for n in numbers if n % 2 == 0])`,
      hints: [
        `mapの変換は内包表記の先頭の式に、filterの条件は後置ifに対応します。`,
        `10倍は「[n * 10 for n in numbers]」、偶数の絞り込みは後置ifで「n % 2 == 0」を使います。`
      ],
      expectedOutput: "[10, 20, 30, 40, 50, 60]"
    },
    {
      id: 89,
      title: "二次元リストとネスト内包表記",
      explanation: `<p>リストの中にリストが入った構造を二次元リストと呼びます。表計算の表や、ゲームの盤面のようなデータを表すのに使われます。内包表記はネスト（入れ子）にでき、二次元リストの変換や平坦化が簡潔に書けます。</p>
<pre><code>matrix = [[1, 2], [3, 4]]

# パターン1：内包表記の中に内包表記 → 二次元のまま各要素を変換
doubled = [[n * 2 for n in row] for row in matrix]
print(doubled)  # [[2, 4], [6, 8]]</code></pre>
<p>外側の内包表記が行（row）を1つずつ取り出し、内側の内包表記がその行の中身を変換した新しい行を作る、という二段構えです。</p>
<pre><code># パターン2：for句を2つ並べる → 一次元に平坦化（flatten）
flat = [n for row in matrix for n in row]
print(flat)  # [1, 2, 3, 4]</code></pre>
<p>平坦化のfor句の順序は間違えやすいポイントです。for文で書いたときと同じ順、つまり外側のループ（for row in matrix）を先に、内側のループ（for n in row）を後に書きます。</p>
<pre><code># 上の平坦化をfor文で書くと
flat = []
for row in matrix:      # 先に書いたfor句
    for n in row:       # 後に書いたfor句
        flat.append(n)</code></pre>
<p>2つのパターンの見分け方は角かっこの数です。結果を二次元のままにしたいなら式の部分が[内包表記]になり、一次元にしたいならfor句を2つ並べます。なお、ネストが3段以上になると急激に読みにくくなるため、実務では2段までにとどめ、それ以上は素直にfor文で書くのが良い判断とされています。</p>`,
      task: `<code>doubled</code>には各要素を2倍した二次元リストを（内包表記の中に内包表記）、<code>flat</code>には一次元に平坦化したリストを（for句を2つ並べる）作ってください。`,
      code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# TODO: 各要素を2倍した二次元リストを作る（式の部分を内包表記にする）
doubled = []
print(doubled)

# TODO: 一次元に平坦化する（for句を2つ並べる。外側のforを先に書く）
flat = []
print(flat)`,
      solution: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# 各要素を2倍した二次元リストを作る
doubled = [[n * 2 for n in row] for row in matrix]
print(doubled)

# 一次元に平坦化する（外側のfor句を先に書く）
flat = [n for row in matrix for n in row]
print(flat)`,
      hints: [
        `二次元のまま変換するときは「[[内側の内包表記] for row in matrix]」の形になります。`,
        `平坦化は「[n for row in matrix for n in row]」。for文の外側→内側と同じ順でfor句を並べます。`
      ],
      expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8, 9]"
    },
    {
      id: 90,
      title: "総合演習（成績データの変換・集計）",
      explanation: `<p>この章の総仕上げとして、辞書のリストで表された成績データを、内包表記とlambdaを総動員して変換・集計します。実務のデータ処理では「データベースやAPIから受け取った辞書のリストを、目的に合わせて別の形に変換する」作業が日常的に発生します。この形の処理を素早く書けることは大きな武器になります。</p>
<p>この章で学んだ道具の使いどころを整理しておきましょう。</p>
<table>
<tr><th>やりたいこと</th><th>使う道具</th></tr>
<tr><td>検索しやすい形にする</td><td>辞書内包表記（リスト→辞書）</td></tr>
<tr><td>条件で絞り込む</td><td>後置if付きのリスト内包表記</td></tr>
<tr><td>特定のキーで並べ替える</td><td>sorted()＋key=lambda</td></tr>
<tr><td>表示用の文字列に変換する</td><td>リスト内包表記＋文字列連結</td></tr>
</table>
<p>辞書のリストから値を取り出すときは、内包表記の式の部分で角かっこによるキーアクセスを使います。</p>
<pre><code>students = [{"name": "sato", "score": 85}]

names = [s["name"] for s in students]
score_map = {s["name"]: s["score"] for s in students}
ranking = sorted(students, key=lambda s: s["score"], reverse=True)</code></pre>
<p>変数sには辞書が1つずつ入るので、s["name"]やs["score"]で中身を取り出せます。sorted()のkeyに渡すlambdaも同じ発想で、「辞書を受け取って並べ替えの基準になる値を返す」関数を書くだけです。</p>
<p>平均点の計算では、リスト内包表記で点数だけのリストを作ってからsum()に渡しています。「必要な値だけ抜き出してから集計関数へ」という流れも定番のパターンです。</p>`,
      task: `3つのTODOを完成させてください。1. 名前→点数の辞書、2. 70点以上の学生名リスト、3. 点数の高い順に並べた「名前:点数」形式のリストです。`,
      code: `students = [
    {"name": "sato", "score": 85},
    {"name": "suzuki", "score": 92},
    {"name": "takahashi", "score": 58},
    {"name": "tanaka", "score": 74},
    {"name": "ito", "score": 63},
]

# TODO 1: 名前→点数の辞書を辞書内包表記で作る
score_map = {}
print(score_map)

# TODO 2: 70点以上の学生の名前リストを後置ifで作る
passed = []
print(passed)

# TODO 3: 点数の高い順に並べ替え、「名前:点数」の形の文字列リストに変換する
ranking = students
top = []
print(top)

# 平均点（ここは完成済み）
average = sum([s["score"] for s in students]) / len(students)
print(f"平均点: {average:.1f}")`,
      solution: `students = [
    {"name": "sato", "score": 85},
    {"name": "suzuki", "score": 92},
    {"name": "takahashi", "score": 58},
    {"name": "tanaka", "score": 74},
    {"name": "ito", "score": 63},
]

# 名前→点数の辞書を辞書内包表記で作る
score_map = {s["name"]: s["score"] for s in students}
print(score_map)

# 70点以上の学生の名前リストを後置ifで作る
passed = [s["name"] for s in students if s["score"] >= 70]
print(passed)

# 点数の高い順に並べ替え、「名前:点数」の形の文字列リストに変換する
ranking = sorted(students, key=lambda s: s["score"], reverse=True)
top = [s["name"] + ":" + str(s["score"]) for s in ranking]
print(top)

# 平均点（ここは完成済み）
average = sum([s["score"] for s in students]) / len(students)
print(f"平均点: {average:.1f}")`,
      hints: [
        `辞書のリストでは、内包表記の変数sに辞書が入るので、s["name"]やs["score"]で値を取り出せます。`,
        `並べ替えは「sorted(students, key=lambda s: s["score"], reverse=True)」の形です。`,
        `「名前:点数」の文字列は、s["name"] + ":" + str(s["score"])のように連結して作れます。`
      ],
      expectedOutput: "平均点: 74.4"
    }
  ]
});
