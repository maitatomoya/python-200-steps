// 第24章：よくあるエラー：関数とクラス
registerChapter({
  number: 24,
  title: "よくあるエラー：関数とクラス",
  description: "関数とクラスの定義・呼び出しで起きやすいエラーと落とし穴を、実際のトレースバックを読みながら特定し修正する訓練をします。",
  steps: [
    {
      id: 231,
      title: "ミュータブルデフォルト引数の罠（呼び出し間でリストが共有される）",
      explanation: `<p>この章では関数とクラスにまつわるエラーを扱います。最初はPythonで最も有名な罠、<strong>ミュータブル（変更可能）なデフォルト引数</strong>です。初期コードを実行すると、検査のassert文が異変を検出します。</p>
<pre><code>AssertionError: 前回の中身が残っている: ['ペン', 'ノート']</code></pre>
<p>2回目の呼び出しで新しいリストが使われるはずなのに、1回目に追加した"ペン"が残っています。原因は、デフォルト値の<code>items=[]</code>が<strong>関数を定義した瞬間に1回だけ評価され、以後すべての呼び出しで同じリストが使い回される</strong>ことです。呼び出しのたびに新しい[]が作られるわけではありません。</p>
<table>
<tr><th>デフォルト値</th><th>安全性</th></tr>
<tr><td>数値・文字列・True/False・None・タプル</td><td>安全（変更できない値）</td></tr>
<tr><td>リスト[]・辞書{}・セット</td><td>危険（呼び出し間で共有される）</td></tr>
</table>
<p>定番の修正パターンは<strong>Noneを番兵（目印）にする</strong>方法です。</p>
<pre><code>def add_item(item, items=None):
    if items is None:
        items = []</code></pre>
<p>デフォルトを変更不可能なNoneにしておき、関数の中で「Noneだったら新しいリストを作る」ようにすれば、呼び出しごとに独立したリストになります。この書き方はPythonの実務コードで頻出のイディオム（定型表現）なので、形ごと覚えてしまいましょう。</p>`,
      task: `2回目の呼び出しに前回の中身が残る原因を理解し、items=Noneと関数内での初期化に書き換えてassertが通るように修正してください。`,
      code: `def add_item(item, items=[]):
    items.append(item)
    return items

list1 = add_item("ペン")
list2 = add_item("ノート")

# 2回目の呼び出しは新しいリストになるはず…？
assert list2 == ["ノート"], "前回の中身が残っている: " + str(list2)
print(list1)
print(list2)`,
      solution: `def add_item(item, items=None):
    # デフォルトにはNoneを使い、関数の中で毎回新しいリストを作る
    if items is None:
        items = []
    items.append(item)
    return items

list1 = add_item("ペン")
list2 = add_item("ノート")

assert list2 == ["ノート"], "前回の中身が残っている: " + str(list2)
print(list1)
print(list2)`,
      hints: [
        `items=[]は関数定義時に1回だけ作られ、すべての呼び出しで同じリストが共有されます`,
        `デフォルトをNoneにして、関数の中でif items is None: items = [] と初期化するのが定番です`
      ],
      expectedOutput: "['ノート']"
    },
    {
      id: 232,
      title: "UnboundLocalError（関数内での代入とglobal・引数渡しでの修正）",
      explanation: `<p>関数の外にある変数を関数の中で増やそうとすると、<strong>UnboundLocalError</strong>という少し不思議なエラーに出会います。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 8, in &lt;module&gt;
    increment()
    ~~~~~~~~~^^
  File "main.py", line 5, in increment
    count = count + 1
            ^^^^^
UnboundLocalError: cannot access local variable 'count' where it is not associated with a value</code></pre>
<p>今回のトレースバックは2段になっています。上の段が「呼び出した場所」、下の段が「実際にエラーが起きた関数の中」で、<strong>下へ行くほど深い呼び出し先</strong>です。メッセージは「ローカル変数countに、まだ値が入っていない状態でアクセスした」という意味です。</p>
<p>なぜ外側のcount（値0）が見えないのでしょうか。Pythonは<strong>関数内のどこかで代入される名前を、その関数のローカル変数として扱う</strong>というルールで動きます。<code>count = count + 1</code>は代入なので、countは関数全体でローカル扱いになり、右辺の<code>count</code>を読む時点では「まだ値のないローカル変数」となってエラーになるのです。</p>
<table>
<tr><th>修正方法</th><th>書き方</th><th>評価</th></tr>
<tr><td>引数と戻り値で渡す</td><td><code>def increment(current): return current + 1</code></td><td>推奨。依存が明確でテストしやすい</td></tr>
<tr><td>global宣言</td><td>関数の先頭に<code>global count</code></td><td>動くが、変更箇所が追いにくくなるため多用しない</td></tr>
</table>
<p>模範解答では推奨の「引数で受け取り、戻り値で返す」形に修正します。関数の入出力が引数と戻り値だけになると、コードの見通しが大きく良くなります。</p>`,
      task: `トレースバックの2段構造を確認し、countを引数で受け取って戻り値で返す形に修正してください。`,
      code: `count = 0

def increment():
    # 関数の外のcountを増やしたい
    count = count + 1
    print(count)

increment()`,
      solution: `count = 0

def increment(current):
    # 引数で受け取り、増やした値を戻り値で返す
    return current + 1

count = increment(count)
print("count:", count)`,
      hints: [
        `関数内で代入される名前は、その関数全体でローカル変数として扱われます。右辺のcountを読む時点ではまだ値がありません`,
        `def increment(current): のように引数で受け取り、return current + 1で返して、呼び出し側でcount = increment(count)と受け取ります`
      ],
      expectedOutput: "count: 1"
    },
    {
      id: 233,
      title: "return忘れ（Noneが返る）",
      explanation: `<p>計算はしているのに<code>return</code>を書き忘れる。これも定番のバグで、エラーは<strong>関数ではなく呼び出し側の行</strong>で起きるため、原因に気づきにくいのが特徴です。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    total = add(2, 3) + 10
            ~~~~~~~~~~^~~~
TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'</code></pre>
<p>メッセージは「NoneType（Noneの型）とintは+で計算できない」という意味です。ここで重要なのは、<strong>トレースバックに'NoneType'が現れたら「どこかがNoneを返している」を疑う</strong>という読み方です。Pythonの関数は、returnを書かずに終わると自動的に<code>None</code>を返します。resultに計算結果を入れても、returnしなければ呼び出し側には何も届きません。</p>
<pre><code>def add(a, b):
    result = a + b    # 計算しただけ。呼び出し側にはNoneが返る

def add(a, b):
    result = a + b
    return result     # これで呼び出し側に5が届く</code></pre>
<p>Noneが原因のエラーは、発生場所（+の行）と原因の場所（return忘れの関数）が離れがちです。「エラー行でNoneになり得る値はどれか」→「その値を作った関数はreturnしているか」の順にさかのぼるのが定石です。同じ理由で、print(add(2, 3))が「None」と表示されるときもreturn忘れをまず疑いましょう。</p>`,
      task: `'NoneType'というメッセージから原因の関数を特定し、計算結果をreturnで返すように修正してください。`,
      code: `def add(a, b):
    result = a + b  # 計算しただけでreturnを忘れている

total = add(2, 3) + 10
print("合計:", total)`,
      solution: `def add(a, b):
    result = a + b
    return result

total = add(2, 3) + 10
print("合計:", total)`,
      hints: [
        `エラーの'NoneType'は「add(2, 3)がNoneを返している」ことを示しています`,
        `returnの無い関数はNoneを返します。関数の最後にreturn resultを追加しましょう`
      ],
      expectedOutput: "合計: 15"
    },
    {
      id: 234,
      title: "SyntaxError（positional argument follows keyword argument）",
      explanation: `<p>関数呼び出しの引数の並べ方にもルールがあります。初期コードを実行すると、次のエラーになります。</p>
<pre><code>  File "main.py", line 4
    introduce(name="佐藤", 25)
                           ^
SyntaxError: positional argument follows keyword argument</code></pre>
<p>これはSyntaxError（構文エラー）なので、これまでのエラーと表示の形が違うことにも注目してください。「Traceback (most recent call last):」の行が無く、実行前のチェック段階で検出されています。つまり<strong>プログラムは1行も実行されていません</strong>。</p>
<p>メッセージは「位置引数がキーワード引数の後に置かれている」という意味です。引数には2種類あります。</p>
<table>
<tr><th>種類</th><th>例</th><th>渡し先の決まり方</th></tr>
<tr><td>位置引数</td><td><code>introduce("佐藤", 25)</code></td><td>並び順で決まる</td></tr>
<tr><td>キーワード引数</td><td><code>introduce(name="佐藤", age=25)</code></td><td>名前で決まる</td></tr>
</table>
<p>両方を混ぜるときは<strong>位置引数が先、キーワード引数が後</strong>という順序が絶対のルールです。<code>introduce(name="佐藤", 25)</code>では、名前指定の後に順序頼みの25が来るため、「25は何番目のつもりなのか」が決められず構文の段階で拒否されます。修正は、すべてキーワード引数にする（<code>name="佐藤", age=25</code>）か、位置引数を前に出す（<code>"佐藤", age=25</code>）かのどちらかです。</p>`,
      task: `キーワード引数と位置引数の順序ルールを確認し、正しい呼び出しに修正してください。`,
      code: `def introduce(name, age):
    print(name + "（" + str(age) + "歳）")

introduce(name="佐藤", 25)`,
      solution: `def introduce(name, age):
    print(name + "（" + str(age) + "歳）")

# キーワード引数は位置引数より後に置く（すべてキーワード引数にしてもよい）
introduce(name="佐藤", age=25)`,
      hints: [
        `キーワード引数（name="佐藤"）の後ろに、順序頼みの位置引数（25）は置けません`,
        `introduce(name="佐藤", age=25)のように両方に名前を付けるか、introduce("佐藤", 25)と両方位置引数にします`
      ],
      expectedOutput: "佐藤（25歳）"
    },
    {
      id: 235,
      title: "AttributeError（self.への代入忘れ・属性名typo）",
      explanation: `<p>クラスの__init__で受け取った値をインスタンスに保存したつもりが、<code>self.</code>を忘れているパターンです。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 9, in &lt;module&gt;
    user.hello()
    ~~~~~~~~~~^^
  File "main.py", line 6, in hello
    print("こんにちは、" + self.name + "さん")
                           ^^^^^^^^^
AttributeError: 'User' object has no attribute 'name'</code></pre>
<p>「'User'オブジェクトにnameという属性は無い」という意味です。注意したいのは、<strong>エラーが出た場所（helloメソッド）と原因の場所（__init__）が違う</strong>ことです。トレースバックが指すのは「無い属性を読もうとした行」であって、「保存し忘れた行」ではありません。</p>
<p>__init__の中の<code>name = name</code>は、引数nameをローカル変数nameに入れ直しているだけで、メソッドが終わると消えてしまいます。インスタンスに保存するには必ず<code>self.name = name</code>と書きます。</p>
<table>
<tr><th>書き方</th><th>意味</th></tr>
<tr><td><code>name = name</code></td><td>ローカル変数への代入。メソッド終了で消える</td></tr>
<tr><td><code>self.name = name</code></td><td>インスタンス属性への保存。他のメソッドから使える</td></tr>
</table>
<p>同じAttributeErrorは属性名の打ち間違いでも起きます（保存はself.nameなのにself.nemaと読むなど）。その場合、最近のPythonは似た名前を見つけて「Did you mean: 'name'?」と候補を出してくれます。このエラーを見たら、(1)__init__でself.付きで保存しているか、(2)読む側と保存側でつづりが一致しているか、の2点を確認しましょう。</p>`,
      task: `エラーが出た行と原因の行が違うことを確認し、__init__で受け取った名前をインスタンス属性として保存するように修正してください。`,
      code: `class User:
    def __init__(self, name):
        name = name  # self.を忘れている

    def hello(self):
        print("こんにちは、" + self.name + "さん")

user = User("田中")
user.hello()`,
      solution: `class User:
    def __init__(self, name):
        self.name = name  # インスタンス属性として保存する

    def hello(self):
        print("こんにちは、" + self.name + "さん")

user = User("田中")
user.hello()`,
      hints: [
        `エラーはhelloメソッドで出ていますが、原因は__init__での保存し忘れです`,
        `name = nameはローカル変数への代入です。self.name = nameと書くとインスタンスに保存されます`
      ],
      expectedOutput: "こんにちは、田中さん"
    },
    {
      id: 236,
      title: "TypeError（メソッド定義のself忘れ）",
      explanation: `<p>メソッド定義で<code>self</code>を書き忘れると、一見不思議なTypeErrorが出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 6, in &lt;module&gt;
    dog.bark()
    ~~~~~~~~^^
TypeError: Dog.bark() takes 0 positional arguments but 1 was given</code></pre>
<p>「bark()は引数を0個しか受け取らないのに、1個渡された」と言われますが、呼び出しは<code>dog.bark()</code>で引数を渡していないように見えます。この「見えない1個」の正体が<strong>インスタンス自身</strong>です。</p>
<p>Pythonでは<code>dog.bark()</code>という呼び出しは、実際には<code>Dog.bark(dog)</code>のように変換されて実行されます。つまりメソッドには<strong>第1引数としてインスタンスが自動的に渡される</strong>のです。それを受け取る器が仮引数selfで、定義に書き忘れると「受け取り口が0個なのに1個来た」というこのエラーになります。</p>
<table>
<tr><th>定義</th><th>dog.bark()の結果</th></tr>
<tr><td><code>def bark():</code></td><td>TypeError（インスタンスを受け取れない）</td></tr>
<tr><td><code>def bark(self):</code></td><td>正常（selfにdogが入る）</td></tr>
</table>
<p>「takes N positional arguments but N+1 were given」という<strong>数が1つだけずれたTypeError</strong>をクラスのメソッドで見たら、まずself忘れを疑うのが定石です。エラーメッセージの「Dog.bark()」のように、どのクラスのどのメソッドかまで表示してくれるので、場所の特定は簡単です。</p>`,
      task: `「見えない1個の引数」の正体を理解し、メソッドがインスタンスを受け取れるように定義を修正してください。`,
      code: `class Dog:
    def bark():
        print("ワン！")

dog = Dog()
dog.bark()`,
      solution: `class Dog:
    def bark(self):  # 第1引数selfでインスタンスを受け取る
        print("ワン！")

dog = Dog()
dog.bark()`,
      hints: [
        `dog.bark()はDog.bark(dog)のように実行され、インスタンスが第1引数として自動的に渡されます`,
        `def bark(self): と定義して、自動的に渡されるインスタンスを受け取れるようにします`
      ],
      expectedOutput: "ワン！"
    },
    {
      id: 237,
      title: "RecursionError（基底ケースのない再帰）",
      explanation: `<p>再帰関数（自分自身を呼び出す関数）に終了条件が無いと、<strong>RecursionError</strong>になります。トレースバックにも特徴的な表示が現れます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 5, in &lt;module&gt;
    print("5! =", factorial(5))
                  ~~~~~~~~~^^^
  File "main.py", line 3, in factorial
    return n * factorial(n - 1)
               ~~~~~~~~~^^^^^^^
  File "main.py", line 3, in factorial
    return n * factorial(n - 1)
               ~~~~~~~~~^^^^^^^
  File "main.py", line 3, in factorial
    return n * factorial(n - 1)
               ~~~~~~~~~^^^^^^^
  [Previous line repeated 996 more times]
RecursionError: maximum recursion depth exceeded</code></pre>
<p>同じ再帰呼び出しの行が3回表示されたあと、「[Previous line repeated 996 more times]（前の行がさらに996回繰り返された）」と要約されています。同じ行が延々と繰り返されている、つまり<strong>再帰が止まっていない</strong>ことをPython自身が教えてくれているわけです。Pythonは再帰の深さに上限（既定でおよそ1000）を設けており、超えると暴走を止めるためにこのエラーを出します。</p>
<p>再帰関数には必ず2つの要素が必要です。</p>
<table>
<tr><th>要素</th><th>意味</th><th>今回の例</th></tr>
<tr><td>基底ケース</td><td>再帰せずに答えを返す終了条件</td><td>nが1以下なら1を返す</td></tr>
<tr><td>前進</td><td>呼び出すたびに基底ケースへ近づくこと</td><td>nを1ずつ減らす</td></tr>
</table>
<p>初期コードはnを減らして前進はしているものの、基底ケースが無いため、5→4→3→…→0→-1→-2と<strong>止まる場所がないまま</strong>呼び出し続けています。RecursionErrorを見たら「基底ケースはあるか」「すべての呼び出しが基底ケースに向かって前進しているか」の2点を確認しましょう。</p>`,
      task: `トレースバックの繰り返し表示から再帰が止まっていないことを確認し、基底ケースを追加して5の階乗が表示されるように修正してください。`,
      code: `def factorial(n):
    # 基底ケース（再帰の終了条件）がない
    return n * factorial(n - 1)

print("5! =", factorial(5))`,
      solution: `def factorial(n):
    # 基底ケース：1以下になったら再帰を止めて1を返す
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("5! =", factorial(5))`,
      hints: [
        `[Previous line repeated ...]は同じ再帰呼び出しが延々と続いた印です。止まる条件がありません`,
        `関数の先頭にif n <= 1: return 1を追加すると、そこで再帰が止まります`
      ],
      expectedOutput: "5! = 120"
    },
    {
      id: 238,
      title: "ミュータブルなクラス属性の共有罠（インスタンス属性にする修正）",
      explanation: `<p>ミュータブルデフォルト引数（ステップ231）のクラス版ともいえる罠です。実行すると、別々のチームのはずなのにメンバーが混ざっていることをassertが検出します。</p>
<pre><code>AssertionError: team_aの分まで入っている: ['佐藤', '鈴木']</code></pre>
<p>原因は<code>members = []</code>を<strong>クラス直下</strong>に書いていることです。この位置に書いた変数は「クラス属性」となり、<strong>クラスにただ1つだけ作られ、すべてのインスタンスから共有されます</strong>。team_aから追加してもteam_bから追加しても、同じ1つのリストに入っていくわけです。</p>
<table>
<tr><th>書く場所</th><th>種類</th><th>実体の数</th></tr>
<tr><td>クラス直下の<code>members = []</code></td><td>クラス属性</td><td>クラスに1つ（全インスタンス共有）</td></tr>
<tr><td>__init__内の<code>self.members = []</code></td><td>インスタンス属性</td><td>インスタンスごとに1つ</td></tr>
</table>
<p>インスタンスごとに独立させたいデータは、__init__の中で<code>self.members = []</code>と初期化します。こうすればインスタンスを作るたびに新しいリストが作られます。</p>
<p>なお、クラス属性そのものが悪いわけではありません。全インスタンスで共有したい定数（<code>species = "犬"</code>のような変更しない値）には適しています。危険なのは<strong>ミュータブルなクラス属性をインスタンスから変更する</strong>組み合わせです。「インスタンスごとのデータは__init__でselfに付ける」を原則にしましょう。</p>`,
      task: `membersが全インスタンスで共有されている原因を理解し、インスタンス属性として初期化する形に修正してください。`,
      code: `class Team:
    members = []  # クラス直下に書いたリストは全インスタンスで共有される

    def add(self, name):
        self.members.append(name)

team_a = Team()
team_b = Team()
team_a.add("佐藤")
team_b.add("鈴木")

# team_bには鈴木だけのはず…？
assert team_b.members == ["鈴木"], "team_aの分まで入っている: " + str(team_b.members)
print("team_a:", team_a.members)
print("team_b:", team_b.members)`,
      solution: `class Team:
    def __init__(self):
        # インスタンス属性として毎回新しいリストを作る
        self.members = []

    def add(self, name):
        self.members.append(name)

team_a = Team()
team_b = Team()
team_a.add("佐藤")
team_b.add("鈴木")

assert team_b.members == ["鈴木"], "team_aの分まで入っている: " + str(team_b.members)
print("team_a:", team_a.members)
print("team_b:", team_b.members)`,
      hints: [
        `クラス直下のmembers = []はクラスに1つだけ作られ、team_aとteam_bが同じリストを共有します`,
        `__init__を定義して、その中でself.members = []と初期化すればインスタンスごとに独立します`
      ],
      expectedOutput: "team_b: ['鈴木']"
    },
    {
      id: 239,
      title: "循環importと二重実行の罠（単一ファイルでの擬似再現）",
      explanation: `<p>実務でファイルを分割し始めると出会うのが<strong>循環import</strong>（AがBをimportし、BがAをimportし合う状態）です。この教材のコードはmain.pyとして実行されるため、<code>from main import greet</code>と書くと<strong>自分自身のimport</strong>になり、同じ現象を擬似再現できます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 3, in &lt;module&gt;
    from main import greet
  File "main.py", line 3, in &lt;module&gt;
    from main import greet
ImportError: cannot import name 'greet' from 'main'</code></pre>
<p>ポイントは<strong>同じ行が2回現れている</strong>ことです。importは対象ファイルの中身を実行する仕組みなので、main.pyの実行中にmainをimportすると同じファイルがもう一度実行され（二重実行）、その2回目もimport行から始まります。2回目の時点ではまだgreetの定義行まで進んでいないため、「greetという名前をmainからimportできない」というImportErrorになるのです。メッセージ末尾に続く「consider renaming ...」は同名ライブラリとの衝突を疑う提案ですが、今回の原因は自己importです。実際の循環importでもimport行が連鎖して並び、「most likely due to a circular import（循環importの可能性が高い）」というヒントが付くこともあります。</p>
<p>対処の定石は次の3つです。</p>
<table>
<tr><th>対処</th><th>内容</th></tr>
<tr><td>依存の一方向化</td><td>共通部分を第3のモジュールに出し、AとBが互いを参照しない設計にする（根本対策）</td></tr>
<tr><td>importの位置調整</td><td>ファイル先頭ではなく、必要な関数の中でimportする（応急処置）</td></tr>
<tr><td>実行部の保護</td><td>実行時だけ動かす処理は<code>if __name__ == "__main__":</code>の下に置き、import時の副作用を防ぐ</td></tr>
</table>
<p><code>__name__</code>は、直接実行されたときだけ"__main__"になる特別な変数です。このガードを付けておくと、importされても実行部が動かず、二重実行の事故を防げます。</p>`,
      task: `自分自身のimport文を削除し、greetの呼び出しをif __name__ == "__main__":のガードの下に置いて修正してください。`,
      code: `# このファイルはmain.pyという名前で実行される
# 自分自身をimportして、循環importと同じ現象を擬似再現する
from main import greet

def greet():
    print("こんにちは")

greet()`,
      solution: `# 自分自身のimportをやめる。実行部はガードの下に置く
def greet():
    print("こんにちは")

if __name__ == "__main__":
    greet()`,
      hints: [
        `importはファイルを実行します。main.pyの中でmainをimportすると同じファイルが二重に実行されます`,
        `from main import greetの行を削除し、greet()の呼び出しをif __name__ == "__main__":の下に移動します`
      ],
      expectedOutput: "こんにちは"
    },
    {
      id: 240,
      title: "総合：クラス設計のバグ修正",
      explanation: `<p>この章の総合演習です。図書館の蔵書管理クラスに、この章で学んだバグが3つ仕込まれています。第23章の総合演習と同じく「実行→トレースバックの最終行を読む→修正→再実行」を繰り返して1つずつ直しましょう。</p>
<p>最初の実行ではメソッド呼び出しのTypeErrorが出るはずです。それを直して再実行すると次の異変が現れます。3つのバグはすべて既出のパターンです。</p>
<table>
<tr><th>エラー・症状</th><th>疑うべき原因</th><th>対処</th></tr>
<tr><td>TypeError: takes 1 positional argument but 2 were given</td><td>メソッド定義のself忘れ</td><td>第1引数にselfを追加</td></tr>
<tr><td>別インスタンスのデータが混ざる（AssertionError）</td><td>ミュータブルなクラス属性の共有</td><td>__init__でself.books = []に</td></tr>
<tr><td>AttributeError: no attribute 'name'</td><td>__init__でのself.への代入忘れ</td><td>self.name = nameに修正</td></tr>
</table>
<p>修正の際は、books属性の参照も<code>self.books</code>に揃えることを忘れないでください。クラス設計の原則としてまとめると次の3点です。</p>
<ol>
<li>メソッドの第1引数は必ずself</li>
<li>インスタンスに保存するデータは必ずself.属性名 = 値</li>
<li>インスタンスごとに独立させたいミュータブルなデータは__init__で初期化</li>
</ol>
<p>この3原則が身についていれば、クラスがらみのエラーの大半は数分で解決できます。すべて修正できると、2つの図書館の蔵書が別々に表示されます。</p>`,
      task: `3つのバグを1つずつ修正してください。最終的に「中央図書館: ['Python入門']」と「北図書館: ['データ分析の基礎']」が表示されれば完成です。`,
      code: `# 図書館の蔵書管理クラス（バグが3つある。1つ直すごとに実行し直す）
class Library:
    books = []

    def __init__(self, name):
        name = name

    def add_book(title):
        Library.books.append(title)

lib_a = Library("中央図書館")
lib_b = Library("北図書館")
lib_a.add_book("Python入門")
lib_b.add_book("データ分析の基礎")

# 蔵書は図書館ごとに別々のはず
assert lib_b.books == ["データ分析の基礎"], "別の図書館の本が混ざっている: " + str(lib_b.books)
print(lib_a.name + ":", lib_a.books)
print(lib_b.name + ":", lib_b.books)`,
      solution: `# 図書館の蔵書管理クラス（修正済み）
class Library:
    def __init__(self, name):
        self.name = name  # インスタンス属性として保存する
        self.books = []  # 図書館ごとに独立した蔵書リスト

    def add_book(self, title):  # 第1引数selfでインスタンスを受け取る
        self.books.append(title)

lib_a = Library("中央図書館")
lib_b = Library("北図書館")
lib_a.add_book("Python入門")
lib_b.add_book("データ分析の基礎")

assert lib_b.books == ["データ分析の基礎"], "別の図書館の本が混ざっている: " + str(lib_b.books)
print(lib_a.name + ":", lib_a.books)
print(lib_b.name + ":", lib_b.books)`,
      hints: [
        `最初のTypeErrorはadd_bookのself忘れです。def add_book(self, title): に直します`,
        `次のAssertionErrorはクラス属性booksの共有が原因です。__init__の中でself.books = []と初期化し、追加もself.books.append(title)にします`,
        `最後はname = nameのself.忘れです。self.name = nameに直せば完成です`
      ],
      expectedOutput: "北図書館: ['データ分析の基礎']"
    }
  ]
});
