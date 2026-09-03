// 第19章：dataclassとEnum
registerChapter({
  number: 19,
  title: "dataclassとEnum",
  description: "データを入れる箱としてのクラスを短く安全に書けるdataclassと、決まった選択肢を型として表現するEnumを学びます。",
  steps: [
    {
      id: 181,
      title: "dataclassの基本（@dataclass）",
      explanation: `<p>クラスで「データを入れる箱」を作るとき、これまでは<code>__init__</code>で引数を受け取り、<code>self.x = x</code>のような代入を1つずつ書いていました。フィールドが増えるほど同じような行が並び、書き間違いも起きやすくなります。この定型作業を自動化してくれるのが<strong>dataclass（データクラス）</strong>です。</p>
<p>使い方は、<code>dataclasses</code>モジュールから<code>dataclass</code>をインポートし、クラス定義の直前に<code>@dataclass</code>デコレータ（関数やクラスに機能を追加する記法。第14章で学びました）を付けるだけです。フィールドは型ヒント付きのクラス変数として並べます。</p>
<pre><code>from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)        # Point(x=3, y=4)
print(p.x)      # 3</code></pre>
<p>この短い定義だけで、dataclassは次のメソッドを自動生成します。</p>
<table>
<tr><th>自動生成されるもの</th><th>効果</th></tr>
<tr><td><code>__init__</code></td><td><code>Point(3, 4)</code>のように引数で初期化できる</td></tr>
<tr><td><code>__repr__</code></td><td><code>print</code>すると<code>Point(x=3, y=4)</code>と中身が見える</td></tr>
<tr><td><code>__eq__</code></td><td><code>==</code>でフィールドの値どうしを比較できる</td></tr>
</table>
<p>注意点として、<strong>型ヒントを付けたクラス変数だけがフィールドとして認識されます</strong>。型ヒントは実行時に強制されない（第18章）ので、ここでは「フィールド宣言の目印」として機能していると考えると分かりやすいでしょう。デコレータを付け忘れると、ただのクラス変数の宣言になってしまい、<code>Point(3, 4)</code>は「引数を受け取れない」という<code>TypeError</code>になります。</p>`,
      task: `実行すると<code>TypeError: Point() takes no arguments</code>になります。<code>Point</code>クラスに<code>@dataclass</code>デコレータを付けて、<code>Point(3, 4)</code>で初期化できるようにしてください。`,
      code: `from dataclasses import dataclass

# TODO: このクラスに@dataclassデコレータを付けて、
# Point(3, 4)で初期化できるようにする
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)
print(p.x + p.y)
`,
      solution: `from dataclasses import dataclass

# @dataclassを付けると__init__や__repr__が自動生成される
@dataclass
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)
print(p.x + p.y)
`,
      hints: [
        `デコレータはクラス定義の直前の行に@付きで書きます（第14章の@構文と同じ形です）。`,
        `class Point:の1行上に@dataclassと書くだけです。importはすでにされています。`
      ],
      expectedOutput: "Point(x=3, y=4)"
    },
    {
      id: 182,
      title: "デフォルト値とfield",
      explanation: `<p>dataclassのフィールドには、関数のデフォルト引数と同じ感覚で<strong>デフォルト値</strong>を設定できます。<code>price: int = 100</code>のように書くと、初期化時に省略された場合は100が使われます。</p>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Product:
    name: str                          # 必須フィールド
    price: int = 100                   # デフォルト値あり
    code: str = field(default="A-000") # fieldで指定する書き方

p = Product("りんご")
print(p)   # Product(name='りんご', price=100, code='A-000')</code></pre>
<p>ここで重要なルールがあります。<strong>デフォルト値のあるフィールドの後に、デフォルト値のないフィールドを置くことはできません</strong>。dataclassはフィールドの並び順どおりに<code>__init__</code>の引数を作るため、関数定義で「デフォルト引数の後に通常引数は置けない」のと同じ制約がかかるのです。違反すると、クラス定義の時点で<code>TypeError: non-default argument 'price' follows default argument</code>が発生します。必須のフィールドを前に、省略可能なフィールドを後ろに並べるのが基本です。</p>
<p>もう1つ、<code>field()</code>関数を使うとデフォルト値以外の細かい設定もできます。代表的な引数を挙げます。</p>
<table>
<tr><th>fieldの引数</th><th>意味</th></tr>
<tr><td><code>default</code></td><td>デフォルト値（<code>= 値</code>と同じ意味）</td></tr>
<tr><td><code>default_factory</code></td><td>デフォルト値を作る関数を渡す（次のステップで詳しく）</td></tr>
<tr><td><code>repr=False</code></td><td><code>print</code>したときの表示にそのフィールドを含めない</td></tr>
</table>
<p>単純な値なら<code>= 100</code>で十分ですが、追加設定が必要になったら<code>field()</code>を使う、と覚えておきましょう。</p>`,
      task: `実行するとクラス定義の時点で<code>TypeError</code>になります。フィールドの並び順を直して、必須の<code>name</code>を先頭に、デフォルト値のある<code>price</code>と<code>code</code>を後ろに配置してください。`,
      code: `from dataclasses import dataclass, field

# 実行するとTypeErrorになる：デフォルト値のあるフィールドの後に
# デフォルト値のないフィールドは置けない
@dataclass
class Product:
    price: int = 100
    name: str    # TODO: nameを先頭（デフォルト値なしの位置）に移動する
    code: str = field(default="A-000")

p1 = Product("りんご")
p2 = Product("メロン", 1500, "A-777")
print(p1)
print(p2)
`,
      solution: `from dataclasses import dataclass, field

# 必須フィールドを前に、デフォルト値ありのフィールドを後ろに並べる
@dataclass
class Product:
    name: str
    price: int = 100
    code: str = field(default="A-000")

p1 = Product("りんご")
p2 = Product("メロン", 1500, "A-777")
print(p1)
print(p2)
`,
      hints: [
        `関数のデフォルト引数と同じで「デフォルト値なし→あり」の順に並べる必要があります。`,
        `nameをクラスの先頭フィールドに移動し、price・codeをその後ろに置きます。`
      ],
      expectedOutput: "Product(name='りんご', price=100, code='A-000')"
    },
    {
      id: 183,
      title: "ミュータブルデフォルトの罠（field(default_factory)）",
      explanation: `<p>第24章でも扱う有名な罠に「関数のデフォルト引数にリストを使うと、呼び出し間で同じリストが共有されてしまう」という問題があります。dataclassでも同じ危険があるため、<strong>リストや辞書などのミュータブル（変更可能）な値を<code>= []</code>の形でデフォルト値にすると、実行時に<code>ValueError</code>で拒否されます</strong>。Pythonがバグの芽を先回りして止めてくれるのです。</p>
<pre><code>@dataclass
class Playlist:
    name: str
    songs: list[str] = []   # ValueError: mutable default ...</code></pre>
<p>正しい書き方は、<code>field()</code>の<strong><code>default_factory</code></strong>に「デフォルト値を作る関数」を渡す方法です。<code>list</code>を渡せば、インスタンスを作るたびに<code>list()</code>が呼ばれて<strong>毎回新しい空リスト</strong>が用意されます。</p>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Playlist:
    name: str
    songs: list[str] = field(default_factory=list)

a = Playlist("作業用")
b = Playlist("ドライブ用")
a.songs.append("春の歌")
print(a.songs)   # ['春の歌']
print(b.songs)   # []（bは影響を受けない）</code></pre>
<p>ポイントは<code>default_factory=list</code>のように<strong>関数そのものを渡す</strong>ことです。<code>list()</code>と書いてしまうと「今この場で作った1つのリスト」を渡すことになり意味が変わってしまいます（関数はオブジェクトとして渡せる、という第14章の知識がここで活きます）。空の辞書なら<code>default_factory=dict</code>、初期値入りが必要なら<code>default_factory=lambda: [0, 0]</code>のようにlambda式も使えます。intやstrなどイミュータブルな値は共有されても書き換えられないため、<code>= 100</code>の形で問題ありません。</p>`,
      task: `実行すると<code>ValueError: mutable default ... is not allowed</code>になります。<code>songs</code>フィールドを<code>field(default_factory=list)</code>を使う形に書き換えて、インスタンスごとに独立した空リストが作られるようにしてください。`,
      code: `from dataclasses import dataclass, field

# 実行するとValueErrorになる：ミュータブルな値（リスト）は
# そのままデフォルト値にできない
@dataclass
class Playlist:
    name: str
    songs: list[str] = []    # TODO: field(default_factory=list)に書き換える

a = Playlist("作業用")
b = Playlist("ドライブ用")
a.songs.append("春の歌")
print(a.songs)
print(b.songs)
`,
      solution: `from dataclasses import dataclass, field

# default_factoryに関数を渡すと、インスタンスごとに新しい値が作られる
@dataclass
class Playlist:
    name: str
    songs: list[str] = field(default_factory=list)

a = Playlist("作業用")
b = Playlist("ドライブ用")
a.songs.append("春の歌")
print(a.songs)
print(b.songs)
`,
      hints: [
        `リストのような変更可能な値は、インスタンスごとに新しく作る仕組みが必要です。`,
        `= []の部分を= field(default_factory=list)に置き換えます。listの後ろに()は付けません。`
      ],
      expectedOutput: "['春の歌']"
    },
    {
      id: 184,
      title: "frozen=Trueと不変データ",
      explanation: `<p><code>@dataclass(frozen=True)</code>と書くと、<strong>作成後にフィールドを書き換えられない不変（イミュータブル）なクラス</strong>になります。書き換えようとすると<code>FrozenInstanceError</code>という例外が発生します。タプルのdataclass版と考えると分かりやすいでしょう。</p>
<pre><code>from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int

red = Color(255, 0, 0)
# red.r = 128  →  FrozenInstanceError
dark_red = replace(red, r=128)   # 一部だけ変えた新インスタンスを作る
print(dark_red)   # Color(r=128, g=0, b=0)</code></pre>
<p>値を変えたいときは、<code>dataclasses.replace()</code>で「指定したフィールドだけ差し替えた新しいインスタンス」を作ります。元のオブジェクトはそのまま残るので、「いつの間にか誰かに書き換えられていた」というバグを構造的に防げます。設定値・座標・色のような「値そのもの」を表すデータに向いた設計です。</p>
<p>frozenにはもう1つ大きな利点があります。<strong>ハッシュ可能（hashable）になるため、辞書のキーや集合の要素として使える</strong>のです。通常のdataclassは<code>__eq__</code>を自動生成する代わりにハッシュ値が無効化されるので、辞書のキーにすると<code>TypeError: unhashable type</code>になります。「中身が同じなら同じキーとして扱いたい」データはfrozenにする、と覚えておきましょう。</p>
<table>
<tr><th>設定</th><th>書き換え</th><th>辞書のキーにできるか</th></tr>
<tr><td><code>@dataclass</code></td><td>できる</td><td>できない（unhashable）</td></tr>
<tr><td><code>@dataclass(frozen=True)</code></td><td>できない</td><td>できる</td></tr>
</table>`,
      task: `<code>Color</code>を<code>frozen=True</code>の不変データクラスに変更し、直接の書き換えの代わりに<code>replace()</code>で<code>r=128</code>の<code>dark_red</code>を作ってください。最後に2色をキーにした辞書から「暗い赤」を取り出します。`,
      code: `from dataclasses import dataclass, replace

# TODO: frozen=Trueを指定して不変（イミュータブル）にする
@dataclass
class Color:
    r: int
    g: int
    b: int

red = Color(255, 0, 0)
# TODO: 直接書き換えるのではなく、replace(red, r=128)で新インスタンスを作る
red.r = 128
dark_red = red
print(red)
print(dark_red)
palette = {red: "赤", dark_red: "暗い赤"}    # frozenでないと辞書のキーにできない
print(palette[dark_red])
`,
      solution: `from dataclasses import dataclass, replace

# frozen=Trueで書き換え禁止になり、辞書のキーにも使える
@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int

red = Color(255, 0, 0)
# replaceは指定フィールドだけ差し替えた新しいインスタンスを返す
dark_red = replace(red, r=128)
print(red)
print(dark_red)
palette = {red: "赤", dark_red: "暗い赤"}
print(palette[dark_red])
`,
      hints: [
        `デコレータに引数を付けて@dataclass(frozen=True)と書きます。`,
        `red.r = 128の行を削除し、dark_red = replace(red, r=128)に置き換えます。redは元のまま残ります。`
      ],
      expectedOutput: "Color(r=128, g=0, b=0)"
    },
    {
      id: 185,
      title: "eq・orderの自動生成",
      explanation: `<p>dataclassが自動生成する<code>__eq__</code>のおかげで、<code>==</code>比較は最初から「全フィールドの値が等しいか」で判定されます。自分で<code>__eq__</code>を書いたときと同じ動きが、宣言だけで手に入るわけです。</p>
<p>一方、<code>&lt;</code>や<code>&gt;</code>などの<strong>大小比較は自動では生成されません</strong>。そのため<code>sorted()</code>にdataclassのリストを渡すと、<code>TypeError: '&lt;' not supported between instances of 'Score' and 'Score'</code>が発生します。並べ替えたい場合は<code>@dataclass(order=True)</code>を指定します。すると<code>__lt__</code>・<code>__le__</code>・<code>__gt__</code>・<code>__ge__</code>がまとめて生成されます。</p>
<pre><code>from dataclasses import dataclass

@dataclass(order=True)
class Score:
    point: int
    name: str

print(Score(72, "佐藤") &lt; Score(90, "鈴木"))   # True
scores = [Score(72, "佐藤"), Score(90, "鈴木")]
print(sorted(scores, reverse=True)[0].name)      # 鈴木</code></pre>
<p>比較の仕組みは重要です。<strong>フィールドを定義順に並べたタプルどうしを比較する</strong>のと同じ動きになります。上の例では<code>(point, name)</code>のタプル比較なので、まず<code>point</code>で比べ、同点なら<code>name</code>の文字列比較で決まります。つまり<strong>フィールドの定義順が比較の優先順位になる</strong>ため、並べ替えの基準にしたいフィールドを先頭に置くのが設計のコツです。</p>
<table>
<tr><th>指定</th><th>生成されるもの</th></tr>
<tr><td><code>@dataclass</code>（eq=Trueが既定）</td><td><code>__eq__</code>（==比較）</td></tr>
<tr><td><code>@dataclass(order=True)</code></td><td>加えて<code>__lt__</code>など4つ（大小比較・sorted対応）</td></tr>
</table>`,
      task: `実行すると<code>sorted()</code>の行で<code>TypeError</code>になります。<code>@dataclass(order=True)</code>を指定して、点数の高い順に表示できるようにしてください。`,
      code: `from dataclasses import dataclass

# 実行するとTypeErrorになる：dataclassは==は自動生成するが、
# 大小比較はorder=Trueを指定しないと作られない
@dataclass    # TODO: order=Trueを指定する
class Score:
    point: int
    name: str

scores = [Score(72, "佐藤"), Score(90, "鈴木"), Score(85, "高橋")]
print(Score(90, "鈴木") == Score(90, "鈴木"))
for s in sorted(scores, reverse=True):
    print(s.point, s.name)
`,
      solution: `from dataclasses import dataclass

# order=Trueで__lt__などが生成され、sortedで並べ替えられる
# 比較はフィールド定義順のタプル比較（まずpoint、同点ならname）
@dataclass(order=True)
class Score:
    point: int
    name: str

scores = [Score(72, "佐藤"), Score(90, "鈴木"), Score(85, "高橋")]
print(Score(90, "鈴木") == Score(90, "鈴木"))
for s in sorted(scores, reverse=True):
    print(s.point, s.name)
`,
      hints: [
        `frozen=Trueのときと同じく、デコレータに引数を渡します。`,
        `@dataclassを@dataclass(order=True)に書き換えるだけです。pointが先頭フィールドなので点数順になります。`
      ],
      expectedOutput: "90 鈴木"
    },
    {
      id: 186,
      title: "Enumの基本",
      explanation: `<p>信号の色、曜日、会員ランクのように「<strong>取りうる値が決まっている選択肢</strong>」をプログラムで扱うとき、これまでは<code>"red"</code>のような文字列定数を使うのが一般的でした。しかし文字列には弱点があります。<code>"red"</code>と書くべきところを<code>"Red"</code>とタイプミスしてもエラーにならず、静かにバグになるのです。</p>
<p>この問題を解決するのが<strong>Enum（列挙型）</strong>です。<code>enum</code>モジュールの<code>Enum</code>クラスを継承し、選択肢をクラス変数として並べます。</p>
<pre><code>from enum import Enum

class Signal(Enum):
    RED = "赤"
    YELLOW = "黄"
    GREEN = "青"

current = Signal.RED
print(current)              # Signal.RED
if current is Signal.RED:
    print("止まれ")</code></pre>
<p><code>Signal.RED</code>のような1つ1つの選択肢を<strong>メンバー</strong>と呼びます。メンバーはそれぞれ唯一のオブジェクトなので、比較には<code>is</code>（同一性の比較。第12章のisinstanceの回で触れた「同じオブジェクトか」の判定）が使えます。<code>==</code>でも比較できますが、Enumどうしの比較は<code>is</code>を使うのがPythonの慣習です。</p>
<p>Enumの利点を整理します。</p>
<ul>
<li><strong>タイプミスが即エラーになる</strong>：<code>Signal.REDD</code>と書けば<code>AttributeError</code>で即座に気づける</li>
<li><strong>選択肢が一箇所に集まる</strong>：とりうる値の全体像がクラス定義を見れば分かる</li>
<li><strong>型ヒントに使える</strong>：関数の引数を<code>signal: Signal</code>と宣言すれば意図が明確になる</li>
</ul>
<p>「マジックストリング（意味の説明がないまま散らばる文字列定数）をEnumに置き換える」のは実務のリファクタリングでも頻出のパターンです。</p>`,
      task: `信号を表す<code>Signal</code>に、メンバー<code>YELLOW</code>（値は<code>"黄"</code>）と<code>GREEN</code>（値は<code>"青"</code>）を追加して、実行できるようにしてください。`,
      code: `from enum import Enum

# TODO: メンバーYELLOW（値"黄"）とGREEN（値"青"）を追加する
class Signal(Enum):
    RED = "赤"

current = Signal.RED
print(current)
print(Signal.GREEN.value)
if current is Signal.RED:
    print("止まれ")
`,
      solution: `from enum import Enum

# 取りうる値が決まった選択肢はEnumのメンバーとして定義する
class Signal(Enum):
    RED = "赤"
    YELLOW = "黄"
    GREEN = "青"

current = Signal.RED
print(current)
print(Signal.GREEN.value)
if current is Signal.RED:
    print("止まれ")
`,
      hints: [
        `メンバーはRED = "赤"と同じ形式で、クラスの中に1行ずつ並べます。`,
        `RED = "赤"の下にYELLOW = "黄"とGREEN = "青"を追加します。`
      ],
      expectedOutput: "Signal.RED"
    },
    {
      id: 187,
      title: "Enumの値・名前・イテレーション",
      explanation: `<p>Enumのメンバーは、<strong>名前（name）と値（value）</strong>という2つの情報を持っています。<code>Rank.GOLD</code>なら名前は<code>"GOLD"</code>、値は定義時に<code>=</code>で割り当てた<code>3</code>です。それぞれ属性でアクセスできます。</p>
<pre><code>from enum import Enum

class Rank(Enum):
    BRONZE = 1
    SILVER = 2
    GOLD = 3

print(Rank.GOLD.name)    # GOLD（文字列）
print(Rank.GOLD.value)   # 3</code></pre>
<p>さらにEnumクラスは<strong>イテラブル</strong>（forで回せるオブジェクト。第13章）なので、全メンバーを定義順に取り出せます。選択肢の一覧表示やメニューの生成に便利です。</p>
<pre><code>for r in Rank:
    print(r.name, r.value)
# BRONZE 1 / SILVER 2 / GOLD 3 の順に表示される</code></pre>
<p>逆方向の変換も2種類用意されています。</p>
<table>
<tr><th>書き方</th><th>意味</th><th>失敗時の例外</th></tr>
<tr><td><code>Rank(2)</code></td><td><strong>値</strong>からメンバーを取得</td><td><code>ValueError</code></td></tr>
<tr><td><code>Rank["SILVER"]</code></td><td><strong>名前</strong>からメンバーを取得</td><td><code>KeyError</code></td></tr>
</table>
<p>この2つは実務で特に重要です。たとえばJSONやデータベースには<code>2</code>や<code>"SILVER"</code>のような生の値として保存されているので、読み込んだデータをプログラム内のEnumメンバーへ復元するときに<code>Rank(2)</code>や<code>Rank["SILVER"]</code>を使います。呼び出し方が「関数呼び出しの<code>()</code>は値から」「辞書アクセスの<code>[]</code>は名前から」と役割分担している点を混同しないようにしましょう。</p>`,
      task: `TODOの行を埋めてください。(1)<code>GOLD</code>の名前と値を出力、(2)値<code>2</code>からメンバーを取得して出力、(3)名前<code>"SILVER"</code>からメンバーを取得して出力します。`,
      code: `from enum import Enum

class Rank(Enum):
    BRONZE = 1
    SILVER = 2
    GOLD = 3

# TODO: GOLDの名前(name)と値(value)をこの順で出力する
print(Rank.GOLD)
print(Rank.GOLD)

# 全メンバーを定義順に表示する
for r in Rank:
    print(r.name, r.value)

# TODO: 値2からメンバーを取得して出力し、名前"SILVER"からも取得して出力する
print()
print()
`,
      solution: `from enum import Enum

class Rank(Enum):
    BRONZE = 1
    SILVER = 2
    GOLD = 3

# メンバーはname（名前）とvalue（値）を持つ
print(Rank.GOLD.name)
print(Rank.GOLD.value)

# 全メンバーを定義順に表示する
for r in Rank:
    print(r.name, r.value)

# Rank(値)は値から、Rank[名前]は名前からメンバーを取得する
print(Rank(2))
print(Rank["SILVER"])
`,
      hints: [
        `名前と値はメンバーの属性です。ドットでアクセスします。`,
        `値からの取得は関数呼び出しの形Rank(2)、名前からの取得は辞書アクセスの形Rank["SILVER"]です。`
      ],
      expectedOutput: "SILVER 2"
    },
    {
      id: 188,
      title: "auto()",
      explanation: `<p>前のステップの<code>Rank</code>のように値そのものに意味がある場合は<code>= 1</code>のように手書きしますが、「メンバーを区別できさえすればよく、<strong>値は何でもいい</strong>」という場面も多くあります。曜日や状態の種類などが典型です。そんなときに値を手で連番管理するのは面倒ですし、途中にメンバーを挿入したときに番号を振り直すミスも起きがちです。</p>
<p>そこで使うのが<strong><code>auto()</code></strong>です。<code>enum</code>モジュールから<code>auto</code>をインポートして値の位置に書くと、<strong>1から始まる連番が自動で割り当てられます</strong>。</p>
<pre><code>from enum import Enum, auto

class Weekday(Enum):
    MON = auto()   # 1
    TUE = auto()   # 2
    WED = auto()   # 3

for d in Weekday:
    print(d.name, d.value)</code></pre>
<p>auto()を使うかどうかの判断基準を整理します。</p>
<table>
<tr><th>状況</th><th>おすすめ</th></tr>
<tr><td>値をファイルやDBに保存する・外部システムと共有する</td><td>手書きで固定（<code>= 1</code>など）</td></tr>
<tr><td>プログラム内で区別できればよい</td><td><code>auto()</code></td></tr>
</table>
<p>注意点として、auto()の具体的な番号は「たまたま今そうなっている値」に過ぎません。<strong>メンバーの追加や並べ替えで番号が変わる</strong>ため、auto()の値を外部に保存してしまうと、後からコードを変更したときに保存済みデータと番号がずれる事故につながります。外部とやり取りする値には<code>= "gold"</code>のような明示的な文字列を使うのが実務での定石です。逆にいえば、値がプログラムの外に出ないなら、auto()で宣言を簡潔に保つのがきれいな書き方です。</p>`,
      task: `手書きの連番<code>1〜5</code>をやめて、すべてのメンバーの値を<code>auto()</code>に書き換えてください。<code>auto</code>のインポートも必要です。出力が同じままであることを確認しましょう。`,
      code: `from enum import Enum

# TODO: autoをインポートし、手書きの連番をすべてauto()に書き換える
class Weekday(Enum):
    MON = 1
    TUE = 2
    WED = 3
    THU = 4
    FRI = 5

for d in Weekday:
    print(d.name, d.value)
`,
      solution: `from enum import Enum, auto

# 値に意味がないメンバーはauto()で自動採番する（1から始まる連番）
class Weekday(Enum):
    MON = auto()
    TUE = auto()
    WED = auto()
    THU = auto()
    FRI = auto()

for d in Weekday:
    print(d.name, d.value)
`,
      hints: [
        `インポートをfrom enum import Enum, autoに変更します。`,
        `= 1などの値の部分をすべて= auto()に置き換えます。1から順に自動で番号が付きます。`
      ],
      expectedOutput: "FRI 5"
    },
    {
      id: 189,
      title: "dataclassとEnumの組み合わせ",
      explanation: `<p>dataclassとEnumは組み合わせて使うと真価を発揮します。定番の形は「<strong>dataclassのフィールドの型をEnumにする</strong>」というものです。タスク管理を例に見てみましょう。</p>
<pre><code>from dataclasses import dataclass
from enum import Enum

class Status(Enum):
    TODO = "未着手"
    DONE = "完了"

@dataclass
class Task:
    title: str
    status: Status = Status.TODO   # 型はEnum、デフォルトはメンバー

t = Task("資料作成")
print(t.status.value)   # 未着手
t.status = Status.DONE
print(t.status.value)   # 完了</code></pre>
<p>この設計のポイントは3つあります。</p>
<ul>
<li><strong>デフォルト値にメンバーをそのまま書ける</strong>：Enumのメンバーはイミュータブルな唯一のオブジェクトなので、リストと違ってdefault_factoryは不要です。<code>status: Status = Status.TODO</code>と直接書けます。</li>
<li><strong>状態の変更が安全になる</strong>：<code>t.status = "完了"</code>のような生の文字列も代入はできてしまいますが（型ヒントは強制されないため）、コード規約として<code>Status.DONE</code>を使えば、タイプミスは<code>AttributeError</code>で即発見できます。</li>
<li><strong>表示には<code>.value</code>を使う</strong>：画面に出すのは<code>t.status.value</code>（「完了」）、プログラム内の比較は<code>t.status is Status.DONE</code>、と使い分けます。</li>
</ul>
<p>「データの構造はdataclass、とりうる状態はEnum」という分担は、実務のモデル設計（注文のステータス、ユーザーの権限、支払い方法など）でそのまま通用する基本形です。この章の総仕上げとして、次のステップでこの形を発展させます。</p>`,
      task: `<code>Task</code>データクラスに<code>status</code>フィールドを追加してください。型は<code>Status</code>、デフォルト値は<code>Status.TODO</code>です。`,
      code: `from dataclasses import dataclass
from enum import Enum

class Status(Enum):
    TODO = "未着手"
    DONE = "完了"

@dataclass
class Task:
    title: str
    # TODO: statusフィールドを追加する（型はStatus、デフォルトはStatus.TODO）

t = Task("資料作成")
print(t.title, t.status.value)
t.status = Status.DONE
print(t.title, t.status.value)
`,
      solution: `from dataclasses import dataclass
from enum import Enum

class Status(Enum):
    TODO = "未着手"
    DONE = "完了"

# フィールドの型をEnumにすると、とりうる状態が型で表現できる
@dataclass
class Task:
    title: str
    status: Status = Status.TODO

t = Task("資料作成")
print(t.title, t.status.value)
t.status = Status.DONE
print(t.title, t.status.value)
`,
      hints: [
        `フィールドは「名前: 型 = デフォルト値」の形で追加します。`,
        `title: strの下にstatus: Status = Status.TODOと書きます。Enumメンバーはそのままデフォルト値にできます。`
      ],
      expectedOutput: "資料作成 完了"
    },
    {
      id: 190,
      title: "総合演習（タスク管理モデル）",
      explanation: `<p>この章の総合演習です。dataclassとEnumを組み合わせたタスク管理モデルを完成させ、既習の内包表記（第9章）・sorted＋lambda（第9章）・ジェネレータ式とsum（第13章）で集計処理を書きます。</p>
<p>登場する部品を整理します。</p>
<table>
<tr><th>部品</th><th>役割</th></tr>
<tr><td><code>Status(Enum)</code></td><td>タスクの状態（未着手・作業中・完了）を型で表す</td></tr>
<tr><td><code>@dataclass Task</code></td><td>タイトル・優先度・状態・タグを持つデータの箱</td></tr>
<tr><td><code>field(default_factory=list)</code></td><td>タグのリストをインスタンスごとに独立させる</td></tr>
</table>
<p>処理の流れは実務のダッシュボード表示そのものです。まず「未完了のタスクだけを抜き出す」フィルタリングをリスト内包表記で行います。Enumの比較なので<code>t.status is not Status.DONE</code>と書きます。次に<code>sorted()</code>の<code>key</code>引数へlambda式を渡し、優先度の昇順（数字が小さいほど優先）に並べ替えます。</p>
<pre><code>pending = [t for t in tasks if t.status is not Status.DONE]
for t in sorted(pending, key=lambda t: t.priority):
    print(t.title)</code></pre>
<p>件数の集計には、ジェネレータ式とsumを組み合わせた定番イディオムが便利です。</p>
<pre><code>done_count = sum(1 for t in tasks if t.status is Status.DONE)</code></pre>
<p>「条件を満たすものを1として合計する」ことで、条件付きの個数を1行で数えられます。<code>len([t for t in tasks if ...])</code>でも同じ結果になりますが、sum＋ジェネレータ式は途中のリストを作らないぶんメモリ効率が良い、というのは第13章で学んだとおりです。モデル定義（dataclass＋Enum）と集計ロジック（内包表記＋組み込み関数）の組み合わせは、次章の総合演習でも軸になります。</p>`,
      task: `3つのTODOを埋めてください。(1)未完了タスクの抽出（<code>status is not Status.DONE</code>）、(2)優先度の昇順での並べ替え（<code>sorted</code>と<code>key=lambda</code>）、(3)完了済み件数の集計（<code>sum</code>とジェネレータ式）です。`,
      code: `from dataclasses import dataclass, field
from enum import Enum

class Status(Enum):
    TODO = "未着手"
    DOING = "作業中"
    DONE = "完了"

@dataclass
class Task:
    title: str
    priority: int = 3
    status: Status = Status.TODO
    tags: list[str] = field(default_factory=list)

tasks = [
    Task("レポート提出", 1, Status.DOING),
    Task("買い物", 3),
    Task("会議準備", 2, Status.DONE, ["仕事"]),
    Task("部屋の掃除", 2),
]

# TODO: 未完了（status is not Status.DONE）のタスクだけを内包表記で抜き出す
pending = tasks

# TODO: priorityの小さい順に並べ替えて表示する（sortedとkey=lambda）
for t in pending:
    print(f"[優先度{t.priority}] {t.title} ({t.status.value})")

# TODO: 完了済み（status is Status.DONE）の件数をsumとジェネレータ式で数える
done_count = 0
print(f"完了: {done_count}/{len(tasks)}件")
`,
      solution: `from dataclasses import dataclass, field
from enum import Enum

class Status(Enum):
    TODO = "未着手"
    DOING = "作業中"
    DONE = "完了"

@dataclass
class Task:
    title: str
    priority: int = 3
    status: Status = Status.TODO
    tags: list[str] = field(default_factory=list)

tasks = [
    Task("レポート提出", 1, Status.DOING),
    Task("買い物", 3),
    Task("会議準備", 2, Status.DONE, ["仕事"]),
    Task("部屋の掃除", 2),
]

# 未完了タスクをリスト内包表記で抽出する
pending = [t for t in tasks if t.status is not Status.DONE]

# 優先度の昇順（数字が小さいほど優先）で表示する
for t in sorted(pending, key=lambda t: t.priority):
    print(f"[優先度{t.priority}] {t.title} ({t.status.value})")

# 条件を満たすものを1として合計する定番イディオム
done_count = sum(1 for t in tasks if t.status is Status.DONE)
print(f"完了: {done_count}/{len(tasks)}件")
`,
      hints: [
        `フィルタリングは[t for t in tasks if 条件]、並べ替えはsorted(リスト, key=lambda t: t.priority)の形です。`,
        `Enumの比較はisとis notを使います。完了件数はsum(1 for t in tasks if t.status is Status.DONE)です。`,
        `3つのTODOはそれぞれ1行の書き換えで完成します。`
      ],
      expectedOutput: "[優先度1] レポート提出 (作業中)"
    }
  ]
});
