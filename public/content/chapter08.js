// 第8章：関数
registerChapter({
  number: 8,
  title: "関数",
  description: "defによる関数定義、引数と戻り値、スコープを学び、処理を関数に分割して再利用できるようになります。",
  steps: [
    {
      id: 71,
      title: "defと呼び出し",
      explanation: `<p>ここまで書いてきたコードは、上から順に一度だけ実行されるものでした。同じ処理に名前を付けてまとめ、何度でも呼び出せるようにする仕組みが<strong>関数</strong>です。<code>def</code>（defineの略）で定義します。</p>
<pre><code>def greet():
    print("こんにちは！")

greet()  # ここで初めて実行される
greet()  # 何度でも呼び出せる</code></pre>
<p>文法のポイントは次のとおりです。</p>
<ul>
<li><code>def 関数名():</code>と書き、行末にコロンを付ける。処理はインデントしたブロックに書く（forやifと同じルール）</li>
<li>関数名は変数と同じく小文字とアンダースコアで付ける（greet、show_totalなど）</li>
<li><strong>定義しただけでは実行されない</strong>。<code>関数名()</code>と括弧付きで書いたときに初めて中身が実行される（これを「呼び出し」という）</li>
</ul>
<p>「定義」と「呼び出し」の区別は関数の最重要ポイントです。defのブロックは「こういう処理に、この名前を付けます」という登録にすぎません。呼び出しを書き忘れると、エラーも出ずにただ何も起きないため、初心者がつまずきやすいところです。</p>
<p>関数を使うと、同じ処理の重複をなくせるだけでなく、処理のまとまりに名前が付くことでコード自体が読みやすくなります。まずは「定義してから呼び出す」という2段階の流れを体に覚えさせましょう。なお、呼び出しは定義よりも後（ファイルの下側）に書く必要があります。定義前に呼び出すとNameErrorになります。</p>`,
      task: `<code>show_rule</code>関数は定義だけで呼び出しがないため、何も表示されません。呼び出しの1行を追加して、メッセージが表示されるようにしてください。`,
      code: `# 関数の定義と呼び出し
def greet():
    print("こんにちは！")

greet()

# 定義だけでは実行されない関数
def show_rule():
    print("関数は呼び出されるまで実行されない")

# TODO: show_ruleを呼び出す1行をここに追加する
`,
      solution: `# 関数の定義と呼び出し
def greet():
    print("こんにちは！")

greet()

# 定義だけでは実行されない関数
def show_rule():
    print("関数は呼び出されるまで実行されない")

# 関数名()で呼び出すと中身が実行される
show_rule()
`,
      hints: [
        `関数は定義しただけでは実行されません。「関数名()」と括弧付きで書いたときに実行されます`,
        `ファイルの末尾にshow_rule()と書き加えます`
      ],
      expectedOutput: "関数は呼び出されるまで実行されない"
    },
    {
      id: 72,
      title: "引数",
      explanation: `<p>関数に外から値を渡す仕組みが<strong>引数</strong>（ひきすう）です。定義側の括弧に書く変数を<strong>仮引数</strong>（パラメータ）、呼び出し側で渡す実際の値を<strong>実引数</strong>と呼びます。</p>
<pre><code>def greet(name):  # nameが仮引数
    print(f"こんにちは、{name}さん")

greet("佐藤")  # "佐藤"が実引数
greet("鈴木")  # 渡す値を変えると結果も変わる</code></pre>
<p>呼び出すと、実引数の値が仮引数に代入されてからブロックが実行されます。同じ関数でも渡す値によって結果が変わる、つまり「値を差し替えられるテンプレート」になるのが引数の力です。</p>
<p>引数はカンマで区切って複数定義できます。呼び出し時は<strong>定義と同じ順番</strong>で渡します（この渡し方を位置引数と呼びます）。</p>
<pre><code>def introduce(name, age):
    print(f"{name}です。{age}歳です")

introduce("高橋", 30)</code></pre>
<p>引数の個数が定義と合わないと、TypeError（型や引数の使い方の誤りを伝えるエラー）になります。エラーメッセージには「missing 1 required positional argument」（必須の位置引数が1つ足りない）のように、不足している引数名まで表示されるので、落ち着いて読めば原因がすぐ分かります。関数名と引数の並びは「その関数の使い方の約束事」だと考えてください。</p>`,
      task: `<code>introduce</code>関数が名前と年齢の2つの引数を受け取るように定義を修正し、「鈴木です。28歳です」と表示されるように呼び出してください。`,
      code: `def greet(name):
    print(f"こんにちは、{name}さん")

greet("佐藤")

# TODO: introduceが名前と年齢の2つの引数を受け取るように定義と呼び出しを修正する
def introduce(name):
    print(f"{name}です。?歳です")

introduce("鈴木")
`,
      solution: `def greet(name):
    print(f"こんにちは、{name}さん")

greet("佐藤")

# 名前と年齢の2つの引数を受け取る
def introduce(name, age):
    print(f"{name}です。{age}歳です")

introduce("鈴木", 28)
`,
      hints: [
        `仮引数はカンマ区切りで複数書けます。def introduce(name, age):`,
        `呼び出し側も2つの値を順番どおりに渡します。introduce("鈴木", 28)`
      ],
      expectedOutput: "鈴木です。28歳です"
    },
    {
      id: 73,
      title: "return（returnなしはNone）",
      explanation: `<p>関数から結果の値を呼び出し元へ返すには<strong>return文</strong>を使います。printは「画面に表示する」だけで、値を返しているわけではありません。この違いは関数を学ぶうえで最大のつまずきポイントです。</p>
<pre><code>def add(a, b):
    return a + b  # 計算結果を呼び出し元に返す

result = add(3, 5)  # 返された8がresultに入る
print(result * 2)  # 戻り値は次の計算に使える</code></pre>
<p>returnが実行されると関数はそこで終了し、returnの後ろの式の値が<strong>戻り値</strong>として呼び出し元に渡ります。呼び出し式<code>add(3, 5)</code>そのものが8という値に置き換わる、とイメージしてください。</p>
<p>一方、returnを書かない関数（またはreturnまで到達しなかった場合）の戻り値は<strong>None</strong>（「値がない」ことを表す特別な値）になります。printしかしない関数の結果を変数に代入すると、Noneが入ります。</p>
<pre><code>def add_print(a, b):
    print(a + b)  # 表示するだけで返していない

result = add_print(3, 5)  # 8と表示はされるが…
print(result)  # None</code></pre>
<p>このNoneをさらに計算に使おうとするとTypeErrorになります。「その場で表示したい」ならprint、「結果を後で使いたい」ならreturnと使い分けましょう。実務では、関数は計算してreturnし、表示は呼び出し側で行う設計が基本です。計算と表示を分けておくと、同じ関数を画面表示にも集計にも使い回せます。</p>`,
      task: `まず実行して、戻り値がNoneになりTypeErrorが起きることをトレースバックで確認してください。その後、<code>add</code>をreturnで結果を返す形に修正してください。`,
      code: `# このaddは表示するだけで、値を返していない
def add(a, b):
    print(a + b)

result = add(3, 5)
print("戻り値:", result)
print("2倍:", result * 2)  # resultがNoneなのでTypeErrorになる

# TODO: addをreturnで結果を返す形に直す（表示は呼び出し側で行う）
`,
      solution: `# returnで計算結果を呼び出し元に返す
def add(a, b):
    return a + b

result = add(3, 5)
print("戻り値:", result)
print("2倍:", result * 2)
`,
      hints: [
        `printは表示するだけで値を返しません。値を返すのはreturnです`,
        `関数内のprint(a + b)をreturn a + bに書き換えると、result * 2が計算できるようになります`
      ],
      expectedOutput: "2倍: 16"
    },
    {
      id: 74,
      title: "複数の戻り値（タプル）",
      explanation: `<p>Pythonの関数は、値を<strong>複数まとめて返す</strong>ことができます。仕組みはシンプルで、returnにカンマ区切りで値を並べると、それらが1つの<strong>タプル</strong>（第4章で学んだ変更不可のシーケンス）に自動的にまとめられて返ります。</p>
<pre><code>def get_min_max(numbers):
    return min(numbers), max(numbers)  # タプル(最小, 最大)が返る

result = get_min_max([3, 1, 4])
print(result)  # (1, 4)</code></pre>
<p>受け取り側では、第4章のアンパックを使って複数の変数で一度に受け取るのが定番です。</p>
<pre><code>lowest, highest = get_min_max([3, 1, 4])
print(lowest)   # 1
print(highest)  # 4</code></pre>
<p>変数の数とタプルの要素数が一致していないと、ValueError（too many values to unpackなど）になります。また、1つの値しか返さない関数の戻り値を2つの変数で受け取ろうとすると、「cannot unpack non-iterable」というTypeErrorになります。エラーメッセージに「unpack」という単語があれば、返す個数と受け取る個数のずれを疑いましょう。</p>
<p>複数の戻り値は「最小と最大」「商と余り」「成功フラグと結果」のように、<strong>ひとまとまりの計算結果</strong>を返すときに便利です。組み込みのdivmod(a, b)（商と余りのタプルを返す関数）も同じ仕組みです。ただし、返す値が4つも5つもあるなら詰め込みすぎのサインで、辞書やクラス（第11章で学びます）でまとめるほうが読みやすくなります。</p>`,
      task: `<code>get_min_max</code>が最小値と最大値の2つを返すように修正して、アンパックで受け取れるようにしてください。`,
      code: `def get_min_max(numbers):
    # TODO: 最小値と最大値の2つをカンマ区切りで返すようにする
    return min(numbers)

scores = [72, 85, 60, 94]
lowest, highest = get_min_max(scores)
print(f"最低点: {lowest} 最高点: {highest}")
`,
      solution: `def get_min_max(numbers):
    # カンマで並べるとタプルとして返る
    return min(numbers), max(numbers)

scores = [72, 85, 60, 94]
lowest, highest = get_min_max(scores)
print(f"最低点: {lowest} 最高点: {highest}")
`,
      hints: [
        `returnに値をカンマで並べるとタプルとして返せます`,
        `return min(numbers), max(numbers)と書きます`
      ],
      expectedOutput: "最低点: 60 最高点: 94"
    },
    {
      id: 75,
      title: "デフォルト引数",
      explanation: `<p>引数には<strong>デフォルト値</strong>（既定値）を設定できます。<code>def f(x=値)</code>の形で書くと、その引数は呼び出し時に省略でき、省略されたときにデフォルト値が使われます。</p>
<pre><code>def order_coffee(size="M"):
    print(f"コーヒー（{size}サイズ）")

order_coffee()     # コーヒー（Mサイズ）
order_coffee("L")  # コーヒー（Lサイズ）</code></pre>
<p>「たいていはこの値でよいが、変えたい人だけ指定できる」という柔軟な関数が作れます。実務のライブラリ関数はデフォルト引数だらけで、たとえばprintも実は<code>sep=" "</code>や<code>end="\\n"</code>というデフォルト引数を持っています。第1章で使った<code>print(a, b, sep="/")</code>は、デフォルト値を上書きしていたのです。</p>
<p>ルールが1つあります。<strong>デフォルト値を持つ引数は、持たない引数より後ろに置く</strong>ことです。<code>def f(x=1, y):</code>のような並びは構文エラー（parameter without a default follows parameter with a default）になります。呼び出し時に「どの値がどの引数に対応するか」が曖昧になるのを防ぐためです。</p>
<p>なお、デフォルト値にリストなどの変更可能な値を書くと、思わぬバグを生みます（デフォルト値は関数定義時に一度だけ作られ、呼び出し間で共有されるため）。詳しくは第24章で扱いますが、「デフォルト値には数値・文字列・Noneなどの変更不可な値を使う」と覚えておくと安全です。</p>`,
      task: `<code>greet</code>のmessage引数にデフォルト値「おはよう」を設定して、引数なしの<code>greet()</code>でも動くようにしてください。`,
      code: `# sizeにはデフォルト値があるので省略できる
def order_coffee(size="M"):
    print(f"コーヒー（{size}サイズ）を注文しました")

order_coffee()
order_coffee("L")

# TODO: messageにデフォルト値"おはよう"を設定して、引数なしでも動くようにする
def greet(message):
    print(f"{message}、世界！")

greet("こんにちは")
greet()  # このままだとTypeErrorになる
`,
      solution: `# sizeにはデフォルト値があるので省略できる
def order_coffee(size="M"):
    print(f"コーヒー（{size}サイズ）を注文しました")

order_coffee()
order_coffee("L")

# messageにデフォルト値を設定すると省略できる
def greet(message="おはよう"):
    print(f"{message}、世界！")

greet("こんにちは")
greet()
`,
      hints: [
        `デフォルト値は仮引数にdef greet(message=値):の形で設定します`,
        `def greet(message="おはよう"):とすれば、greet()でもエラーになりません`
      ],
      expectedOutput: "おはよう、世界！"
    },
    {
      id: 76,
      title: "キーワード引数",
      explanation: `<p>関数を呼び出すとき、<code>引数名=値</code>の形で「どの引数に渡すか」を名前で指定できます。これを<strong>キーワード引数</strong>と呼びます（名前を指定しない従来の渡し方は<strong>位置引数</strong>です）。</p>
<pre><code>def make_profile(name, age, city):
    print(f"{name}（{age}歳・{city}在住）")

# 位置引数：順番で対応が決まる
make_profile("佐藤", 30, "東京")

# キーワード引数：名前で対応が決まるので順番は自由
make_profile(city="東京", name="佐藤", age=30)</code></pre>
<p>キーワード引数の利点は2つあります。1つ目は<strong>順番の間違いを防げる</strong>こと。位置引数で順番を取り違えても、型が合っていればエラーにならず、間違った結果が出るだけという厄介なバグになります。2つ目は<strong>呼び出しが読みやすくなる</strong>こと。<code>resize(300, 200, True)</code>よりも<code>resize(width=300, height=200, keep_ratio=True)</code>のほうが、値の意味がひと目で分かります。</p>
<p>位置引数とキーワード引数は混在できますが、<strong>位置引数を先に書く</strong>のがルールです。<code>f(name="佐藤", 30)</code>のようにキーワード引数の後に位置引数を置くと、構文エラー（positional argument follows keyword argument）になります。</p>
<p>引数が3つ以上ある関数や、TrueやFalseを渡す引数では、キーワード引数を使うのが読みやすいコードの定石です。前ステップのデフォルト引数と組み合わせると、「必要な引数だけ名前で指定する」柔軟な呼び出しができます。</p>`,
      task: `最後の呼び出しをキーワード引数を使う形に直して、「鈴木（25歳・大阪在住）」と正しく表示されるようにしてください。`,
      code: `def make_profile(name, age, city):
    print(f"{name}（{age}歳・{city}在住）")

# 位置引数：定義の順番どおりに渡す
make_profile("佐藤", 30, "東京")

# TODO: 引数の順番を取り違えている。キーワード引数を使って
# 「鈴木（25歳・大阪在住）」と表示されるように直す
make_profile("大阪", "鈴木", 25)
`,
      solution: `def make_profile(name, age, city):
    print(f"{name}（{age}歳・{city}在住）")

# 位置引数：定義の順番どおりに渡す
make_profile("佐藤", 30, "東京")

# キーワード引数：名前で指定するので順番に依存しない
make_profile(city="大阪", name="鈴木", age=25)
`,
      hints: [
        `キーワード引数は引数名=値の形で渡し、順番に関係なく対応が決まります`,
        `make_profile(city="大阪", name="鈴木", age=25)のように名前で指定します`
      ],
      expectedOutput: "鈴木（25歳・大阪在住）"
    },
    {
      id: 77,
      title: "可変長引数（*args・**kwargs）",
      explanation: `<p>引数の個数を決めずに、いくつでも受け取れる関数を作る仕組みが<strong>可変長引数</strong>です。書き方は2種類あります。</p>
<table>
<tr><th>書き方</th><th>受け取るもの</th><th>関数内での型</th></tr>
<tr><td><code>*args</code></td><td>余った位置引数すべて</td><td>タプル</td></tr>
<tr><td><code>**kwargs</code></td><td>余ったキーワード引数すべて</td><td>辞書</td></tr>
</table>
<pre><code>def total(*numbers):
    return sum(numbers)  # numbersはタプル

print(total(1, 2))        # 3
print(total(1, 2, 3, 4))  # 10</code></pre>
<p><code>*</code>付きの引数は、渡された位置引数をまとめて1つのタプルとして受け取ります。printが何個でも値を受け取れるのも、この仕組みのおかげです。</p>
<pre><code>def show_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

show_info(name="高橋", job="エンジニア")</code></pre>
<p><code>**</code>付きの引数は、キーワード引数を「引数名がキー、渡した値が値」の辞書として受け取ります。第7章で学んだitems()のループがそのまま活躍します。</p>
<p>argsやkwargsという名前は慣習で、他の名前でも動きますが、実務のコードでは圧倒的にこの2つが使われるので、そのまま覚えるのがおすすめです。可変長引数は、ログ出力・設定の受け渡し・第14章で学ぶデコレータなど「どんな引数でも素通しで受け取りたい」場面で活躍します。まずは「*はタプル、**は辞書」という対応を押さえましょう。</p>`,
      task: `<code>show_info</code>のループを修正して、受け取ったキーワード引数を「name: 高橋」のように「キー: 値」の形式で表示してください。`,
      code: `# *argsの例：位置引数をいくつでも受け取れる
def total(*numbers):
    print("受け取った値:", numbers)
    print("合計:", sum(numbers))

total(1, 2, 3)
total(10, 20, 30, 40)

# TODO: 「キー: 値」の形式で表示されるように修正する
def show_info(**info):
    for key, value in info.items():
        print(key)

show_info(name="高橋", job="エンジニア")
`,
      solution: `# *argsの例：位置引数をいくつでも受け取れる
def total(*numbers):
    print("受け取った値:", numbers)
    print("合計:", sum(numbers))

total(1, 2, 3)
total(10, 20, 30, 40)

# **kwargsはキーワード引数を辞書として受け取る
def show_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

show_info(name="高橋", job="エンジニア")
`,
      hints: [
        `**infoは受け取ったキーワード引数を辞書として保持します`,
        `f-stringを使ってprint(f"{key}: {value}")と書きます`
      ],
      expectedOutput: "job: エンジニア"
    },
    {
      id: 78,
      title: "スコープの基本（ローカルとグローバル）",
      explanation: `<p>変数には「見える範囲」があり、これを<strong>スコープ</strong>と呼びます。関数の中で作った変数は<strong>ローカル変数</strong>となり、その関数の中でしか使えません。関数の外（トップレベル）で作った変数は<strong>グローバル変数</strong>と呼ばれ、どこからでも読めます。</p>
<pre><code>def calc():
    result = 10 * 2  # ローカル変数
    return result

print(calc())   # 20
print(result)   # NameError！関数の外からは見えない</code></pre>
<p>関数の実行が終わるとローカル変数は消えます。だからこそ、他の場所との名前の衝突を心配せずに関数を書けるのです。</p>
<p>注意が必要なのは「関数の中からグローバル変数を<strong>変更</strong>したい」場合です。関数内で<code>count = 1</code>のように代入すると、グローバル変数の変更ではなく<strong>同名の新しいローカル変数の作成</strong>になります。外のcountは変わりません。</p>
<pre><code>count = 0

def add_count():
    count = 1  # 新しいローカル変数（外のcountはそのまま）

add_count()
print(count)  # 0のまま</code></pre>
<p>エラーにならず、静かに期待と違う動きをするのが厄介なところです。<code>global</code>宣言を使えば書き換えも可能ですが、どこからでも変更できる変数はバグの温床になります。実務では「<strong>必要な値は引数で受け取り、結果はreturnで返す</strong>」設計が基本です。データの流れが関数の入口（引数）と出口（戻り値）に集まり、追いやすいコードになります。</p>`,
      task: `まず実行して、関数内の代入では外の<code>count</code>が変わらないことを確認してください。その後、引数と戻り値を使う形に修正して「カウント: 1」と表示されるようにしてください。`,
      code: `def calc():
    result = 10 * 2  # ローカル変数
    return result

print(calc())

count = 0  # グローバル変数

# TODO: 関数内の代入は新しいローカル変数を作るだけで、外のcountは変わらない。
# 現在の値を引数で受け取り、1増やした値をreturnする形に直す
def add_count():
    count = 1

add_count()
print("カウント:", count)
`,
      solution: `def calc():
    result = 10 * 2  # ローカル変数
    return result

print(calc())

count = 0  # グローバル変数

# 引数で受け取り、戻り値で返すのが基本の設計
def add_count(current):
    return current + 1

count = add_count(count)
print("カウント:", count)
`,
      hints: [
        `関数内でcount = 1と書くと、グローバル変数の変更ではなくローカル変数の作成になります`,
        `def add_count(current):として、return current + 1で返します`,
        `呼び出し側はcount = add_count(count)で戻り値を受け取ります`
      ],
      expectedOutput: "カウント: 1"
    },
    {
      id: 79,
      title: "docstringと関数分割の実践",
      explanation: `<p>関数が増えてきたら、「何をする関数か」を関数自身に説明させましょう。defの直後に書く文字列を<strong>docstring</strong>（ドックストリング、関数の説明文）と呼びます。慣習として三重クォート<code>"""..."""</code>で書きます。</p>
<pre><code>def calc_total(prices):
    """価格リストの合計を返す。"""
    return sum(prices)

print(calc_total.__doc__)  # docstringを取り出せる</code></pre>
<p>docstringはただのコメントではなく、関数の<code>__doc__</code>属性として保存され、help()関数やエディタのホバー表示にも使われます。「何を受け取り、何を返すか」を1文で書くだけでも、読み手（数か月後の自分を含む）への効果は絶大です。</p>
<p>もう1つの実践が<strong>関数分割</strong>です。上から下へだらっと書かれた処理を、意味のまとまりごとに関数へ切り出します。分割の目安は次のとおりです。</p>
<ul>
<li>1つの関数は<strong>1つの仕事</strong>だけをする（計算と表示を分ける、など）</li>
<li>同じ処理が2回以上出てきたら関数化を検討する</li>
<li>関数名は動詞で始め、docstringが1文で書ける粒度にする（1文で説明できないなら分割が大きすぎるサイン）</li>
</ul>
<p>関数に切り出すと、部品ごとに動作確認ができ、名前が処理の説明になってコメントが減ります。書籍「リーダブルコード」でも重視されている実践で、この先クラスやモジュールを学ぶときの土台になります。</p>`,
      task: `平均を計算する処理を、docstring付きの関数<code>calc_average</code>に切り出して、f-stringから呼び出す形に修正してください。`,
      code: `def calc_total(prices):
    """価格リストの合計を返す。"""
    return sum(prices)

# __doc__でdocstringを確認できる
print(calc_total.__doc__)

prices = [120, 250, 380]
print(f"合計: {calc_total(prices)}円")

# TODO: 下の平均の計算を、docstring付きの関数calc_averageに切り出して呼び出す
total = sum(prices)
average = total / len(prices)
print(f"平均: {average:.1f}円")
`,
      solution: `def calc_total(prices):
    """価格リストの合計を返す。"""
    return sum(prices)

def calc_average(prices):
    """価格リストの平均を返す。"""
    return sum(prices) / len(prices)

# __doc__でdocstringを確認できる
print(calc_total.__doc__)

prices = [120, 250, 380]
print(f"合計: {calc_total(prices)}円")
print(f"平均: {calc_average(prices):.1f}円")
`,
      hints: [
        `defの直後の行に"""説明文"""と書くとdocstringになります`,
        `calc_averageはsum(prices) / len(prices)を返す関数にして、printのf-stringから呼び出します`
      ],
      expectedOutput: "平均: 250.0円"
    },
    {
      id: 80,
      title: "総合演習（温度変換・成績判定の関数群）",
      explanation: `<p>この章の総仕上げとして、実用的な関数群を完成させます。テーマは温度変換と成績判定です。これまでに学んだ「def・引数・return・関数分割」を総動員しましょう。</p>
<p>温度の変換式は、摂氏をC、華氏をFとすると「F = C × 9 ÷ 5 + 32」です。計算式を関数に閉じ込めておけば、呼び出し側は式を覚える必要がなくなります。これが関数化の実利です。</p>
<pre><code>def c_to_f(celsius):
    """摂氏を華氏に変換して返す。"""
    return celsius * 9 / 5 + 32</code></pre>
<p>成績判定は、点数を受け取って区分の文字列を返す関数にします。if-elif-elseで<strong>上の条件から順に絞り込む</strong>のがポイントです。80以上→60以上→それ未満の順に書けば、「60以上80未満」のような複合条件を書かずに済みます。</p>
<pre><code>def judge_grade(score):
    """点数から成績を返す。80以上A、60以上B、それ未満C。"""
    if score &gt;= 80:
        return "A"
    elif score &gt;= 60:
        return "B"
    else:
        return "C"</code></pre>
<p>returnは関数をそこで終了させるので、elifを使わずifを並べて早期returnする書き方（ガード節）もできます。どちらの関数も「計算して返すだけ」で、printは呼び出し側のループに任せています。この「計算と表示の分離」は、関数を再利用しやすくする実務の基本設計です。第7章で学んだforループをテストコード代わりに使い、複数の値を流し込んで関数が正しく動くことを確認しましょう。</p>`,
      task: `<code>judge_grade</code>を完成させてください。80点以上はA、60点以上はB、それ未満はCを返します。`,
      code: `def c_to_f(celsius):
    """摂氏を華氏に変換して返す。"""
    return celsius * 9 / 5 + 32

def judge_grade(score):
    """点数から成績を返す。80以上A、60以上B、それ未満C。"""
    # TODO: if-elif-elseで判定してA・B・Cのいずれかを返す
    return "?"

# 温度変換のテスト
for c in [0, 25, 100]:
    print(f"摂氏{c}度 = 華氏{c_to_f(c):.1f}度")

# 成績判定のテスト
for score in [95, 70, 50]:
    print(f"{score}点: {judge_grade(score)}")
`,
      solution: `def c_to_f(celsius):
    """摂氏を華氏に変換して返す。"""
    return celsius * 9 / 5 + 32

def judge_grade(score):
    """点数から成績を返す。80以上A、60以上B、それ未満C。"""
    if score >= 80:
        return "A"
    elif score >= 60:
        return "B"
    else:
        return "C"

# 温度変換のテスト
for c in [0, 25, 100]:
    print(f"摂氏{c}度 = 華氏{c_to_f(c):.1f}度")

# 成績判定のテスト
for score in [95, 70, 50]:
    print(f"{score}点: {judge_grade(score)}")
`,
      hints: [
        `if score >= 80: return "A"のように、条件を満たしたらすぐreturnできます`,
        `80以上→60以上→それ以外の順に、if・elif・elseで書きます`
      ],
      expectedOutput: "70点: B"
    }
  ]
});
