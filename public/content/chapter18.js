// 第18章：型ヒント
registerChapter({
  number: 18,
  title: "型ヒント",
  description: "変数・関数への型ヒントの付け方から、ジェネリック表記、type文、Callable、TypedDict、ジェネリック関数まで、モダンPythonの型の書き方を学びます。",
  steps: [
    {
      id: 171,
      title: "型ヒントの基本（変数・引数・戻り値）",
      explanation: `<p>Pythonは変数の型を宣言しなくても動く言語ですが、「この引数はstrを受け取り、intを返す」という情報をコードに書き添えることができます。これを<strong>型ヒント</strong>（type hint）と呼びます。書き方は3パターンです。</p>
<pre><code># 変数：変数名の後ろに「: 型」
count: int = 0

# 引数：引数名の後ろに「: 型」
# 戻り値：閉じカッコの後ろに「-> 型」
def repeat(word: str, times: int) -> str:
    return word * times</code></pre>
<p>型ヒントを付けると、次のようなメリットがあります。</p>
<table>
<tr><th>メリット</th><th>内容</th></tr>
<tr><td>エディタの支援</td><td>補完が正確になり、型の食い違いに波線で警告が出る</td></tr>
<tr><td>静的チェック</td><td>mypyやpyright（型チェッカー）で実行前にバグを発見できる</td></tr>
<tr><td>ドキュメント効果</td><td>関数の使い方が signature（宣言部分）だけで伝わる</td></tr>
</table>
<p>特に3つ目の効果は大きく、<code>def repeat(word: str, times: int) -> str</code>という1行を見るだけで「文字列と整数を渡すと文字列が返る」と分かります。コメントと違って書き方が統一されているため、チームの誰が読んでも誤解がありません。</p>
<p>実務のPythonコードでは型ヒントを書くのが主流になっており、FastAPIのように型ヒントを機能の中核に使うフレームワークもあります。この章では、モダンなPython（3.12以降）で推奨される書き方を一通り身につけます。</p>`,
      task: `関数<code>greet</code>の引数<code>name</code>に<code>str</code>、<code>times</code>に<code>int</code>、戻り値に<code>str</code>の型ヒントを付け、変数<code>age</code>にも<code>int</code>の型ヒントを付けてください。`,
      code: `# TODO: nameにstr、timesにint、戻り値にstrの型ヒントを付ける
def greet(name, times):
    """あいさつをtimes回繰り返して返す"""
    return ("こんにちは、" + name + "さん。") * times

# TODO: 「変数名: 型 = 値」の形式でintの型ヒントを付ける
age = 28

print(greet("佐藤", 2))
print(f"年齢: {age}")
`,
      solution: `def greet(name: str, times: int) -> str:
    """あいさつをtimes回繰り返して返す"""
    return ("こんにちは、" + name + "さん。") * times

# 変数にも「変数名: 型 = 値」の形式で型ヒントを付けられる
age: int = 28

print(greet("佐藤", 2))
print(f"年齢: {age}")
`,
      hints: [
        `引数は「name: str」のようにコロンの後ろに型を書きます。戻り値は閉じカッコとコロンの間に「-> str」を書きます`,
        `1行目はdef greet(name: str, times: int) -> str: となります。変数はage: int = 28です`
      ],
      expectedOutput: "こんにちは、佐藤さん。こんにちは、佐藤さん。"
    },
    {
      id: 172,
      title: "型ヒントは実行時に強制されない",
      explanation: `<p>型ヒントについて最初に理解しておくべき重要な性質があります。それは、<strong>型ヒントは実行時にはチェックされない</strong>ということです。次のコードを見てください。</p>
<pre><code>def double(value: int) -> int:
    return value * 2

print(double("あ"))  # エラーにならず「ああ」と表示される</code></pre>
<p>引数<code>value</code>には<code>int</code>と書いてあるのに、文字列を渡してもエラーになりません。Pythonのインタープリタは型ヒントを「ただの注釈」として素通りさせ、<code>"あ" * 2</code>を普通に実行するからです。この点で、コンパイル時に型が強制されるJavaやGoとは根本的に考え方が異なります。</p>
<p>では型ヒントは誰が使うのかというと、<strong>人間と外部ツール</strong>です。mypyやpyrightといった型チェッカー（コードを実行せずに型の矛盾を検査するツール）にかけると、上のコードは実行前に「int型の引数にstrを渡している」と指摘されます。実務では、エディタの拡張機能やCI（自動テスト環境）に型チェッカーを組み込み、バグを実行前に検出する体制を作るのが一般的です。</p>
<p>なお、関数に付けた型ヒントは<code>__annotations__</code>という特殊属性に辞書として保存されており、プログラムから読み取れます。</p>
<pre><code>print(double.__annotations__)
# {'value': &lt;class 'int'&gt;, 'return': &lt;class 'int'&gt;}</code></pre>
<p>この仕組みを利用して、FastAPIやdataclass（第19章で学びます）のようなライブラリは型ヒントから実際の機能（データ検証など）を組み立てています。</p>`,
      task: `まずそのまま実行し、型ヒントに反する呼び出しがエラーにならないことを観察してください。その後、<code>double(10)</code>の引数を別の整数に変えて再実行してみましょう。`,
      code: `def double(value: int) -> int:
    return value * 2

# 型ヒント通りの使い方
print(double(10))

# 型ヒントに反してstrを渡してもエラーにならない（実行時は強制されない）
print(double("あ"))

# 関数に付けた型ヒントは__annotations__属性で確認できる
print(double.__annotations__)
`,
      solution: `def double(value: int) -> int:
    return value * 2

# 型ヒント通りの使い方
print(double(12))

# 型ヒントに反してstrを渡してもエラーにならない（実行時は強制されない）
print(double("あ"))

# 関数に付けた型ヒントは__annotations__属性で確認できる
print(double.__annotations__)
`,
      hints: [
        `型ヒントはインタープリタには無視されるので、どんな値を渡しても関数自体は実行されます`,
        `double("あ")が動くのは、str * intが文字列の繰り返しとして定義されているためです`
      ],
      expectedOutput: "ああ"
    },
    {
      id: 173,
      title: "list・dict・tupleのジェネリック表記",
      explanation: `<p>「intのリスト」「strをキーにintを値に持つ辞書」のように、コレクションの中身の型まで指定するには、角カッコを使った<strong>ジェネリック表記</strong>を使います。</p>
<pre><code>prices: list[int] = [100, 250]
stock: dict[str, int] = {"りんご": 3}
point: tuple[int, int] = (3, 5)
values: tuple[int, ...] = (1, 2, 3, 4)  # 同じ型が任意個</code></pre>
<table>
<tr><th>書き方</th><th>意味</th></tr>
<tr><td>list[int]</td><td>int型の要素を持つリスト</td></tr>
<tr><td>dict[str, int]</td><td>キーがstr、値がintの辞書</td></tr>
<tr><td>tuple[int, str]</td><td>1番目がint、2番目がstrの2要素タプル</td></tr>
<tr><td>tuple[int, ...]</td><td>int型の要素が任意個のタプル</td></tr>
<tr><td>set[str]</td><td>str型の要素を持つ集合</td></tr>
</table>
<p>tupleだけ意味合いが異なる点に注意してください。listやsetは「全要素が同じ型」を前提に型を1つ書きますが、tupleは<strong>位置ごとに型を指定</strong>します。座標(3, 5)のような固定長のデータ構造を表すのに向いています。</p>
<p>ミドルエンジニア向けの補足として、古いコードでは<code>from typing import List</code>として<code>List[int]</code>と書く形式を見かけます。これはPython 3.8以前の書き方で、3.9以降は組み込みの<code>list</code>や<code>dict</code>をそのまま角カッコ付きで使えるようになりました。新しく書くコードでは小文字の組み込み型を使うのが現在の標準です。読み替えられるようにだけしておきましょう。</p>`,
      task: `TODOの2か所に型ヒントを付けてください。<code>total_price</code>は<code>list[int]</code>を受け取り<code>int</code>を返し、<code>count_words</code>は<code>list[str]</code>を受け取り<code>dict[str, int]</code>を返します。`,
      code: `# TODO: pricesにlist[int]、戻り値にintの型ヒントを付ける
def total_price(prices):
    return sum(prices)

# TODO: wordsにlist[str]、戻り値にdict[str, int]の型ヒントを付ける
def count_words(words):
    counts: dict[str, int] = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    return counts

# タプルは位置ごとに型を書ける
point: tuple[int, int] = (3, 5)

print(total_price([100, 250, 380]))
print(count_words(["py", "go", "py"]))
print(point)
`,
      solution: `def total_price(prices: list[int]) -> int:
    return sum(prices)

def count_words(words: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    return counts

# タプルは位置ごとに型を書ける
point: tuple[int, int] = (3, 5)

print(total_price([100, 250, 380]))
print(count_words(["py", "go", "py"]))
print(point)
`,
      hints: [
        `コレクションの型は角カッコで中身の型を指定します。辞書はdict[キーの型, 値の型]です`,
        `1つ目はdef total_price(prices: list[int]) -> int: となります。2つ目も同じ形です`
      ],
      expectedOutput: "{'py': 2, 'go': 1}"
    },
    {
      id: 174,
      title: "None許容（X | None）とデフォルトNone",
      explanation: `<p>「検索して見つかればstrを、見つからなければNoneを返す」という関数はよくあります。この「strまたはNone」という型は、縦棒を使って<code>str | None</code>と書きます。</p>
<pre><code>def find_user(user_id: int) -> str | None:
    users = {1: "佐藤", 2: "鈴木"}
    return users.get(user_id)  # なければNone</code></pre>
<p>この型ヒントには実用上の大きな価値があります。呼び出す側が「戻り値はNoneかもしれない」と一目で分かるため、Noneチェックを忘れにくくなるのです。型チェッカーを使っていれば、Noneの可能性がある値をそのまま使おうとした時点で警告されます。<code>AttributeError: 'NoneType' object has no attribute ...</code>という実務で頻出のエラーを、実行前に防げるわけです。</p>
<p>もうひとつの定番が「デフォルト値をNoneにする引数」です。</p>
<pre><code>def greet(name: str | None = None) -> str:
    if name is None:
        return "こんにちは、ゲストさん"
    return f"こんにちは、{name}さん"</code></pre>
<p>「指定されなければ既定の動作、指定されればその値を使う」という省略可能な引数のイディオム（定型的な書き方）で、<code>is None</code>による分岐とセットで使います。</p>
<p>なお、古いコードでは<code>Optional[str]</code>という書き方を見かけます。意味は<code>str | None</code>と全く同じですが、「省略可能」という名前が誤解を招きやすいこともあり、Python 3.10以降は<code>str | None</code>と直接書くスタイルが推奨されています。</p>`,
      task: `実行するとTypeErrorになります。<code>greet</code>の引数を<code>name: str | None = None</code>に変更し、<code>name</code>がNoneのときは「こんにちは、ゲストさん」を返すよう修正してください。`,
      code: `def find_user(user_id: int) -> str | None:
    """該当するユーザー名を返す。見つからなければNone"""
    users = {1: "佐藤", 2: "鈴木"}
    return users.get(user_id)

# TODO: nameの型ヒントを「str | None = None」にして、
#       Noneのときは「こんにちは、ゲストさん」を返すようにする
def greet(name):
    return f"こんにちは、{name}さん"

print(find_user(3))
print(greet())
print(greet("田中"))
`,
      solution: `def find_user(user_id: int) -> str | None:
    """該当するユーザー名を返す。見つからなければNone"""
    users = {1: "佐藤", 2: "鈴木"}
    return users.get(user_id)

# デフォルト値をNoneにする省略可能な引数の定番イディオム
def greet(name: str | None = None) -> str:
    if name is None:
        return "こんにちは、ゲストさん"
    return f"こんにちは、{name}さん"

print(find_user(3))
print(greet())
print(greet("田中"))
`,
      hints: [
        `greet()と引数なしで呼ばれているので、引数にデフォルト値が必要です`,
        `def greet(name: str | None = None) -> str: とし、関数の先頭でif name is None: の分岐を書きます`
      ],
      expectedOutput: "こんにちは、ゲストさん"
    },
    {
      id: 175,
      title: "Unionと|記法",
      explanation: `<p>前のステップの<code>str | None</code>は、実は「複数の型のどれか」を表す<strong>Union型</strong>（合併型）の一例です。縦棒<code>|</code>で型をつなぐと、「intまたはstr」のような型を表現できます。</p>
<pre><code>def describe(value: int | str) -> str:
    if isinstance(value, int):
        return f"整数の{value}"
    return f"文字列の「{value}」"</code></pre>
<p>Union型を受け取った関数の中では、<code>isinstance()</code>（オブジェクトが指定した型かどうかを判定する組み込み関数）で分岐するのが定石です。型チェッカーはこの分岐を理解し、「ifの中ではvalueはint、その後はstr」と型を自動的に絞り込んでくれます。これは型の絞り込み（narrowing）と呼ばれる、モダンな型チェッカーの重要な機能です。</p>
<p>戻り値にも使えます。<code>int | float</code>なら「整数か浮動小数点数のどちらかを返す」という意味になります。</p>
<p>古い書き方との対応も知っておきましょう。</p>
<table>
<tr><th>現在の書き方（3.10以降）</th><th>古い書き方</th></tr>
<tr><td>int | str</td><td>Union[int, str]</td></tr>
<tr><td>str | None</td><td>Optional[str]</td></tr>
</table>
<p>ただし、Union型の使いすぎには注意が必要です。<code>int | str | list | None</code>のように選択肢が多い型は「結局何を渡せばいいのか」が分かりにくく、関数の設計自体を見直すサインであることが多いです。Unionは2〜3個の型に留めるのが読みやすいコードのコツです。</p>`,
      task: `TODOの2か所に型ヒントを付けてください。<code>describe</code>の引数は<code>int | str</code>、<code>to_number</code>の戻り値は<code>int | float</code>です。`,
      code: `# TODO: valueに「int | str」の型ヒントを付ける
def describe(value):
    if isinstance(value, int):
        return f"整数の{value}"
    return f"文字列の「{value}」"

print(describe(42))
print(describe("hello"))

# TODO: 戻り値に「int | float」の型ヒントを付ける
def to_number(text: str):
    if "." in text:
        return float(text)
    return int(text)

print(to_number("3.14"))
print(to_number("100"))
`,
      solution: `def describe(value: int | str) -> str:
    if isinstance(value, int):
        return f"整数の{value}"
    return f"文字列の「{value}」"

print(describe(42))
print(describe("hello"))

# 「.」を含むならfloat、含まないならintに変換して返す
def to_number(text: str) -> int | float:
    if "." in text:
        return float(text)
    return int(text)

print(to_number("3.14"))
print(to_number("100"))
`,
      hints: [
        `複数の型を許す場合は、縦棒でint | strのようにつなぎます`,
        `describeはdef describe(value: int | str) -> str:、to_numberはdef to_number(text: str) -> int | float: です`
      ],
      expectedOutput: "文字列の「hello」"
    },
    {
      id: 176,
      title: "型エイリアス（type文）",
      explanation: `<p>型ヒントが複雑になってくると、同じ長い型を何度も書くことになります。たとえば<code>dict[str, list[int]]</code>を受け取る関数が5つあったら、5回同じ表記を繰り返すことになり、読みにくく修正も大変です。そこでPython 3.12で導入されたのが<strong>type文</strong>です。型に別名（型エイリアス）を付けられます。</p>
<pre><code>type Point = tuple[float, float]
type ScoreTable = dict[str, list[int]]

def move(p: Point, dx: float, dy: float) -> Point:
    return (p[0] + dx, p[1] + dy)</code></pre>
<p><code>type 別名 = 型</code>という専用の構文で、「Pointという名前はこの型の別名である」とコードで宣言できます。別名を使うことで、型ヒントが短くなるだけでなく、<strong>その型が何を表すのかという意図</strong>が名前で伝わるようになります。<code>tuple[float, float]</code>より<code>Point</code>の方が、読み手にはずっと多くの情報を伝えます。</p>
<p>実はtype文が登場する前から、単なる代入（<code>Point = tuple[float, float]</code>）でも似たことはできました。type文が優れているのは次の点です。</p>
<ul>
<li>「これは型の定義である」と構文レベルで明示され、普通の変数と区別できる</li>
<li>定義が遅延評価されるため、後方で定義した型を参照する再帰的な定義も書ける</li>
<li>型チェッカーがエイリアスとして正しく認識することが保証される</li>
</ul>
<p>古いコードでは<code>from typing import TypeAlias</code>を使った<code>Point: TypeAlias = ...</code>という書き方も見かけますが、3.12以降の新規コードではtype文が推奨です。</p>`,
      task: `TODOの2か所を実装してください。<code>dict[str, list[int]]</code>に<code>ScoreTable</code>という別名をtype文で付け、変数<code>scores</code>にその型ヒントを付けます。`,
      code: `# type文（Python 3.12以降）で型に別名を付けられる
type Point = tuple[float, float]

# TODO: dict[str, list[int]]にScoreTableという別名をtype文で付ける

def distance_from_origin(p: Point) -> float:
    """原点からの距離を返す"""
    return (p[0] ** 2 + p[1] ** 2) ** 0.5

# TODO: scoresにScoreTableの型ヒントを付ける
scores = {"佐藤": [80, 92], "鈴木": [75]}

p: Point = (3.0, 4.0)
print(distance_from_origin(p))
print(scores["佐藤"])
`,
      solution: `# type文（Python 3.12以降）で型に別名を付けられる
type Point = tuple[float, float]
type ScoreTable = dict[str, list[int]]

def distance_from_origin(p: Point) -> float:
    """原点からの距離を返す"""
    return (p[0] ** 2 + p[1] ** 2) ** 0.5

# 別名を使うと複雑な型ヒントが短く、意図が伝わる形になる
scores: ScoreTable = {"佐藤": [80, 92], "鈴木": [75]}

p: Point = (3.0, 4.0)
print(distance_from_origin(p))
print(scores["佐藤"])
`,
      hints: [
        `Pointの定義行と同じ形で、type ScoreTable = dict[str, list[int]] と書きます`,
        `変数への型ヒントはscores: ScoreTable = {...} のようにコロンで付けます`
      ],
      expectedOutput: "[80, 92]"
    },
    {
      id: 177,
      title: "Callable（関数を受け取る関数の型）",
      explanation: `<p>Pythonでは関数も値として渡せるため（第8章・第9章で学びました）、「関数を受け取る関数」がよく登場します。<code>sorted()</code>のkey引数やmap()に渡す関数がその例です。この「渡される関数」の型を表すのが<code>Callable</code>（呼び出し可能なもの、という意味）です。</p>
<pre><code>from collections.abc import Callable

def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))</code></pre>
<p>書き方は<code>Callable[[引数の型のリスト], 戻り値の型]</code>です。角カッコが二重になっているのは、引数が複数ある場合に対応するためです。</p>
<table>
<tr><th>書き方</th><th>意味</th></tr>
<tr><td>Callable[[int], int]</td><td>intを1つ受け取り、intを返す関数</td></tr>
<tr><td>Callable[[int, str], bool]</td><td>intとstrを受け取り、boolを返す関数</td></tr>
<tr><td>Callable[[], None]</td><td>引数なしで、何も返さない関数</td></tr>
</table>
<p>importは<code>collections.abc</code>から行います。古いコードでは<code>from typing import Callable</code>を見かけますが、typing側のCallableは非推奨の方向にあり、現在は<code>collections.abc.Callable</code>が推奨されています。</p>
<p>Callableの型ヒントがあると、渡す関数の「形」が合っているかを型チェッカーが検証してくれます。たとえば<code>Callable[[int], int]</code>の場所にstrを返す関数を渡すと警告されます。コールバック関数（後で呼び出してもらうために渡す関数）を多用する設計では、この検証がバグの早期発見に大きく効きます。なお、defで定義した関数もlambda式も、どちらもCallableとして渡せます。</p>`,
      task: `TODOを実装してください。<code>apply_twice</code>の引数<code>func</code>に「intを1つ受け取りintを返す関数」を表す<code>Callable[[int], int]</code>の型ヒントを付けます。`,
      code: `from collections.abc import Callable

# TODO: funcに「Callable[[int], int]」の型ヒントを付ける
#       （int1つを受け取りintを返す関数、という意味）
def apply_twice(func, value: int) -> int:
    """funcを2回続けて適用する"""
    return func(func(value))

def add_three(x: int) -> int:
    return x + 3

print(apply_twice(add_three, 10))
print(apply_twice(lambda x: x * 2, 5))
`,
      solution: `from collections.abc import Callable

# Callable[[引数の型], 戻り値の型]で「関数の型」を表せる
def apply_twice(func: Callable[[int], int], value: int) -> int:
    """funcを2回続けて適用する"""
    return func(func(value))

def add_three(x: int) -> int:
    return x + 3

print(apply_twice(add_three, 10))
print(apply_twice(lambda x: x * 2, 5))
`,
      hints: [
        `関数の型はCallable[[引数の型のリスト], 戻り値の型]の形で書きます。角カッコの二重に注意してください`,
        `def apply_twice(func: Callable[[int], int], value: int) -> int: となります`
      ],
      expectedOutput: "16"
    },
    {
      id: 178,
      title: "TypedDict（決まったキーを持つ辞書の型）",
      explanation: `<p>辞書は柔軟なデータ構造ですが、「titleとpriceとstockのキーを必ず持つ辞書」のような決まった形のデータを表すとき、<code>dict[str, ...]</code>ではキー名や各キーの型までは表現できません。そこで使うのが<code>TypedDict</code>です。クラス風の構文で、辞書のキーと値の型を宣言できます。</p>
<pre><code>from typing import TypedDict

class User(TypedDict):
    name: str
    age: int

user: User = {"name": "佐藤", "age": 28}</code></pre>
<p>classキーワードを使いますが、これは<strong>型の宣言専用</strong>で、実行時に作られるのはあくまで普通の辞書です。<code>type(user)</code>はdictを返しますし、アクセスも<code>user["name"]</code>と辞書のままです。「実行時の姿は辞書のまま、型チェック時だけ厳密な形が保証される」のがTypedDictの立ち位置です。</p>
<p>TypedDictが特に活躍するのは、Web APIのJSONレスポンスや設定データなど、<strong>外部とやり取りする辞書形式のデータ</strong>に型を付ける場面です。型チェッカーを使っていれば、次のようなミスを実行前に検出できます。</p>
<ul>
<li>キー名のタイプミス（user["nmae"]など）</li>
<li>必要なキーの入れ忘れ</li>
<li>値の型違い（ageに文字列を入れるなど）</li>
</ul>
<p>なお、属性アクセス（user.name）でデータを扱いたい場合は、第19章で学ぶdataclassの方が適しています。「既存の辞書データに型を付けたい」ならTypedDict、「新しくデータ型を設計する」ならdataclass、というのが実務での使い分けの目安です。</p>`,
      task: `TypedDict<code>Book</code>の定義を完成させてください。<code>title</code>（str）に加えて、<code>price</code>（int）と<code>stock</code>（bool）の2つを追加します。`,
      code: `from typing import TypedDict

# TODO: price（int）とstock（bool）の宣言を追加して定義を完成させる
class Book(TypedDict):
    title: str

book: Book = {"title": "Python入門", "price": 2800, "stock": True}

def describe_book(b: Book) -> str:
    state = "在庫あり" if b["stock"] else "在庫なし"
    return f"{b['title']}（{b['price']}円・{state}）"

print(describe_book(book))
# TypedDictの実体はただの辞書であることを確認する
print(type(book).__name__)
`,
      solution: `from typing import TypedDict

# 「決まったキーを持つ辞書」の形をクラス風の構文で宣言できる
class Book(TypedDict):
    title: str
    price: int
    stock: bool

book: Book = {"title": "Python入門", "price": 2800, "stock": True}

def describe_book(b: Book) -> str:
    state = "在庫あり" if b["stock"] else "在庫なし"
    return f"{b['title']}（{b['price']}円・{state}）"

print(describe_book(book))
# TypedDictの実体はただの辞書であることを確認する
print(type(book).__name__)
`,
      hints: [
        `title: strの行と同じ形式で、クラスの中に2行追加します`,
        `price: int と stock: bool をtitleの下に同じインデントで書きます`
      ],
      expectedOutput: "Python入門（2800円・在庫あり）"
    },
    {
      id: 179,
      title: "ジェネリック関数（def f[T]構文）",
      explanation: `<p>「リストの先頭要素を返す関数」を考えてみましょう。<code>list[int]</code>を受け取ればintが、<code>list[str]</code>を受け取ればstrが返ります。つまり「戻り値の型は、入力の要素の型と同じ」という関係があります。これを表現するのが<strong>型パラメータ</strong>を使ったジェネリック関数で、Python 3.12から専用の構文が使えるようになりました。</p>
<pre><code>def first[T](items: list[T]) -> T:
    return items[0]

first([10, 20])    # 型チェッカーはintと推論
first(["a", "b"])  # 型チェッカーはstrと推論</code></pre>
<p>関数名の直後の<code>[T]</code>が「この関数はTという型パラメータを持つ」という宣言です。Tは呼び出しのたびに具体的な型に置き換わる「型の変数」で、<code>list[T]</code>と<code>-> T</code>に同じTを使うことで「入力の要素の型と戻り値の型は同じ」という関係を型チェッカーに伝えられます。もし戻り値を単に<code>int | str</code>と書いてしまうと「どちらが返るか分からない」という情報しか伝わらず、この「入力と出力の型の連動」は表現できません。ここがジェネリクスの本質的な価値です。</p>
<p>Tという名前は慣習（Typeの頭文字）で、意味のある名前を付けても構いません。複数の型パラメータを<code>[K, V]</code>のように持つこともできます。</p>
<p>ミドルエンジニア向けの補足として、3.11以前は<code>from typing import TypeVar</code>で<code>T = TypeVar("T")</code>とグローバルに宣言する方式でした。3.12の新構文は宣言が関数に閉じるため見通しが良く、新規コードではこちらが推奨されています。</p>`,
      task: `関数<code>first</code>をジェネリック関数にしてください。関数名の直後に<code>[T]</code>を付け、<code>items</code>を<code>list[T]</code>、戻り値を<code>T</code>にします。`,
      code: `# ジェネリック関数（Python 3.12以降の構文）
# TODO: 関数名の直後に[T]を付けて型パラメータを宣言し、
#       itemsをlist[T]、戻り値をTにする
def first(items):
    """リストの先頭要素を返す"""
    return items[0]

def pair[T](value: T) -> tuple[T, T]:
    """同じ値を2つ並べたタプルを返す"""
    return (value, value)

print(first([10, 20, 30]))
print(first(["a", "b"]))
print(pair(7))
`,
      solution: `# ジェネリック関数（Python 3.12以降の構文）
# [T]で型パラメータを宣言すると、入力と出力の型の連動を表現できる
def first[T](items: list[T]) -> T:
    """リストの先頭要素を返す"""
    return items[0]

def pair[T](value: T) -> tuple[T, T]:
    """同じ値を2つ並べたタプルを返す"""
    return (value, value)

print(first([10, 20, 30]))
print(first(["a", "b"]))
print(pair(7))
`,
      hints: [
        `下にあるpair関数の定義が書き方の見本になります`,
        `def first[T](items: list[T]) -> T: となります`
      ],
      expectedOutput: "(7, 7)"
    },
    {
      id: 180,
      title: "総合演習：型ヒント付きユーティリティ関数群",
      explanation: `<p>この章の総仕上げとして、メンバー管理の小さなユーティリティ関数群に型ヒントを付けます。この章で学んだ道具を総動員します。</p>
<table>
<tr><th>道具</th><th>この演習での使いどころ</th><th>学んだステップ</th></tr>
<tr><td>type文</td><td>dict[str, int | str]にMemberという別名を付ける</td><td>176</td></tr>
<tr><td>X | None</td><td>検索関数の「見つからないかもしれない」戻り値</td><td>174</td></tr>
<tr><td>Callable</td><td>点数変換関数を受け取る引数</td><td>177</td></tr>
<tr><td>ジェネリック関数</td><td>要素の型を問わないfirst_or_default</td><td>179</td></tr>
</table>
<p>実装済みの<code>find_member</code>を見てください。戻り値が<code>Member | None</code>なので、呼び出し側は<code>if found is not None:</code>と確認してから使っています。型ヒントが「Noneチェックを促す設計」として機能している例です。</p>
<pre><code>found = find_member(members, "鈴木")
if found is not None:
    print(found["name"])</code></pre>
<p>あなたが型を付けるのは残りの2つです。<code>transform_scores</code>は「点数のリスト」と「点数を変換する関数」を受け取るので、関数引数には<code>Callable[[int], int]</code>を使います。<code>first_or_default</code>は「空のときの既定値」を返すバージョンのfirstで、リストの要素とdefaultと戻り値がすべて同じ型Tになるジェネリック関数にします。</p>
<p>型ヒントは書いた瞬間に動作が変わるものではありませんが、関数の入出力を設計として明文化する行為そのものです。「この関数は何を受け取り、何を返すのか」を型で言い切れるかどうかは、関数の責務が明確かどうかのバロメーターにもなります。書き終えたら、各関数のシグネチャだけを読んで意味が伝わるかを確認してみてください。</p>`,
      task: `TODOの2か所を実装してください。<code>transform_scores</code>には<code>list[int]</code>・<code>Callable[[int], int]</code>・戻り値<code>list[int]</code>の型ヒントを付け、<code>first_or_default</code>は型パラメータTを使ったジェネリック関数にします。`,
      code: `from collections.abc import Callable

type Member = dict[str, int | str]

def find_member(members: list[Member], name: str) -> Member | None:
    """名前が一致するメンバーを返す。見つからなければNone"""
    for m in members:
        if m["name"] == name:
            return m
    return None

# TODO: scoresにlist[int]、funcにCallable[[int], int]、
#       戻り値にlist[int]の型ヒントを付ける
def transform_scores(scores, func):
    """各点数にfuncを適用した新しいリストを返す"""
    return [func(s) for s in scores]

# TODO: 型パラメータTを使ったジェネリック関数にする
#       （itemsはlist[T]、defaultと戻り値はT）
def first_or_default(items, default):
    """先頭要素を返す。リストが空ならdefaultを返す"""
    if len(items) == 0:
        return default
    return items[0]

members: list[Member] = [
    {"name": "佐藤", "score": 82},
    {"name": "鈴木", "score": 74},
]

found = find_member(members, "鈴木")
if found is not None:
    print(f"{found['name']}: {found['score']}点")

print(transform_scores([60, 70, 80], lambda s: s + 5))
print(first_or_default([], 0))
print(first_or_default(["a", "b"], "なし"))
`,
      solution: `from collections.abc import Callable

type Member = dict[str, int | str]

def find_member(members: list[Member], name: str) -> Member | None:
    """名前が一致するメンバーを返す。見つからなければNone"""
    for m in members:
        if m["name"] == name:
            return m
    return None

def transform_scores(scores: list[int], func: Callable[[int], int]) -> list[int]:
    """各点数にfuncを適用した新しいリストを返す"""
    return [func(s) for s in scores]

def first_or_default[T](items: list[T], default: T) -> T:
    """先頭要素を返す。リストが空ならdefaultを返す"""
    if len(items) == 0:
        return default
    return items[0]

members: list[Member] = [
    {"name": "佐藤", "score": 82},
    {"name": "鈴木", "score": 74},
]

found = find_member(members, "鈴木")
if found is not None:
    print(f"{found['name']}: {found['score']}点")

print(transform_scores([60, 70, 80], lambda s: s + 5))
print(first_or_default([], 0))
print(first_or_default(["a", "b"], "なし"))
`,
      hints: [
        `transform_scoresの関数引数はCallable[[int], int]です。角カッコの二重に注意してください`,
        `first_or_defaultはdef first_or_default[T](items: list[T], default: T) -> T: となります`
      ],
      expectedOutput: "鈴木: 74点"
    }
  ]
});
