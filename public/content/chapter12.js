// 第12章：クラスの応用
registerChapter({
  number: 12,
  title: "クラスの応用",
  description: "継承・super()・オーバーライド・特殊メソッド・プロパティ・独自例外まで、クラスを実務レベルで使いこなすための道具を学び、図形クラス階層を完成させます。",
  steps: [
    {
      id: 111,
      title: "継承の基本",
      explanation: `<p><strong>継承</strong>（inheritance）は、既存のクラスの機能を引き継いだ新しいクラスを作る仕組みです。<code>class 子クラス名(親クラス名):</code>のように、クラス名の後ろの丸括弧に親クラスを書きます。引き継ぐ元を<strong>親クラス</strong>（スーパークラス・基底クラス）、引き継いだ側を<strong>子クラス</strong>（サブクラス・派生クラス）と呼びます。</p>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name}は食事をした")

class Dog(Animal):              # Animalを継承
    def bark(self):
        print(f"{self.name}：ワンワン！")

pochi = Dog("ポチ")
pochi.eat()                     # 親クラスのメソッドがそのまま使える
pochi.bark()                    # 子クラスで追加したメソッド</code></pre>
<p>Dogは自分では__init__もeat()も定義していませんが、Animalから引き継いでいるので両方使えます。呼び出されたメソッドが子クラスに見つからないとき、Pythonは<strong>親クラスへさかのぼって探します</strong>。この探索の仕組みが継承の正体です。</p>
<p>継承を使う目安は「<strong>子は親の一種である</strong>（is-a関係）」が成り立つことです。「犬は動物の一種」は自然なので継承向きですが、「車はエンジンの一種」は不自然です（車はエンジンを<strong>持つ</strong>関係なので、属性としてエンジンのインスタンスを持たせる方が適切です）。共通の機能をまとめたいという理由だけで無関係なクラスを継承すると、後で設計が破綻しがちです。この使い分けは実務のクラス設計で最初に問われるポイントです。</p>`,
      task: `Dogクラスを修正して、Animalクラスを継承させてください。そのままでは<code>Dog("ポチ")</code>の時点でTypeErrorになります。`,
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name}は食事をした")

# TODO: DogクラスがAnimalクラスを継承するように修正する
class Dog:
    def bark(self):
        print(f"{self.name}：ワンワン！")

pochi = Dog("ポチ")
pochi.eat()
pochi.bark()
`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name}は食事をした")

# DogクラスはAnimalクラスを継承する
class Dog(Animal):
    def bark(self):
        print(f"{self.name}：ワンワン！")

pochi = Dog("ポチ")
pochi.eat()
pochi.bark()
`,
      hints: [
        `継承はclass Dog(Animal):のように、クラス名の後ろの丸括弧に親クラス名を書きます。`,
        `継承させると、Dogは自分で定義していない__init__とeat()をAnimalから引き継ぐため、Dog("ポチ")やpochi.eat()が動くようになります。`
      ],
      expectedOutput: "ポチは食事をした"
    },
    {
      id: 112,
      title: "super()と__init__",
      explanation: `<p>子クラスに独自の属性を追加したいときは、子クラス側にも__init__を定義します。ただし、子クラスに__init__を書くと<strong>親クラスの__init__は自動では呼ばれなくなります</strong>。親の初期化処理も実行するには、<strong>super()</strong>を使って明示的に呼び出します。super()は「親クラスにアクセスするためのオブジェクト」を返す組み込み関数です。</p>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)      # 親の__init__を呼んでnameを初期化
        self.breed = breed          # 子クラス独自の属性を追加

pochi = Dog("ポチ", "柴犬")
print(pochi.name)                   # 親が初期化した属性
print(pochi.breed)                  # 子が初期化した属性</code></pre>
<p>super().__init__(name)を書き忘れると、self.nameが一度も代入されないまま処理が進み、pochi.nameへアクセスした瞬間に「AttributeError: 'Dog' object has no attribute 'name'」が発生します。エラーの発生場所は参照した行なのに、<strong>本当の原因は__init__の書き忘れ</strong>という「原因と発生場所が離れたバグ」の典型例で、実務でもよく見かけます。子クラスに__init__を書いたら、まず先頭でsuper().__init__(...)を呼ぶのを習慣にしましょう。</p>
<p>なお、super().__init__(...)に渡す引数は、親の__init__が要求するもの（selfを除く）です。子が受け取った引数のうち、親に関係する分だけを渡します。</p>`,
      task: `Dogクラスの__init__を完成させてください。<code>super().__init__(name)</code>で親クラスの初期化を呼び出します。そのままではAttributeErrorになります。`,
      code: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        # TODO: super().__init__(name)で親クラスの__init__を呼ぶ
        self.breed = breed

pochi = Dog("ポチ", "柴犬")
print(f"{pochi.name}（{pochi.breed}）")
`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        # 親クラスの__init__を呼び、name属性を初期化する
        super().__init__(name)
        self.breed = breed

pochi = Dog("ポチ", "柴犬")
print(f"{pochi.name}（{pochi.breed}）")
`,
      hints: [
        `子クラスに__init__を書くと親の__init__は自動では呼ばれません。self.nameを誰も代入していないためAttributeErrorになります。`,
        `self.breed = breedの前の行にsuper().__init__(name)を追加しましょう。`
      ],
      expectedOutput: "ポチ（柴犬）"
    },
    {
      id: 113,
      title: "メソッドオーバーライド",
      explanation: `<p>親クラスから引き継いだメソッドを、子クラスで<strong>同じ名前で定義し直して上書きする</strong>ことを<strong>オーバーライド</strong>（override）といいます。メソッドは「まず子クラスから探す」ため、子に同名メソッドがあればそちらが優先されます。</p>
<pre><code>class Animal:
    def cry(self):
        print("何かが鳴いた")

class Dog(Animal):
    def cry(self):                      # 親のcry()を上書き
        print("ワンワン！")

class Bird(Animal):
    pass                                # 上書きしない

Dog().cry()      # ワンワン！（子の定義が使われる）
Bird().cry()     # 何かが鳴いた（親の定義が使われる）</code></pre>
<p>オーバーライドの価値は、「<strong>共通の呼び出し方のまま、クラスごとに振る舞いを変えられる</strong>」ことです。呼び出す側はどのクラスでもcry()と書くだけでよく、実際の動きは各クラスが自分で決めます。親クラスは「全員が持つべきメソッドの一覧と標準の動き」を定め、子クラスは「自分に合った動き」で差し替える、という役割分担になります。</p>
<p>2つ注意点があります。第一に、メソッド名やシグネチャ（引数の構成）を親とそろえること。名前を少しでも間違えると上書きにならず、親の実装が呼ばれ続けます。第二に、親の処理を活かしつつ追加したい場合は、前ステップで学んだsuper()を使ってsuper().cry()のように親版を呼び出せることです。「全部差し替え」か「親の処理＋追加」かを選べると、コードの重複を減らせます。</p>`,
      task: `Dogクラスで<code>cry</code>メソッドをオーバーライドして、「〇〇：ワンワン！」（〇〇は属性name）と表示されるようにしてください。`,
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def cry(self):
        print(f"{self.name}が鳴いた")

class Dog(Animal):
    # TODO: cryメソッドをオーバーライドして「〇〇：ワンワン！」と表示する
    pass

class Cat(Animal):
    def cry(self):
        print(f"{self.name}：ニャー")

pochi = Dog("ポチ")
tama = Cat("タマ")
pochi.cry()
tama.cry()
`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def cry(self):
        print(f"{self.name}が鳴いた")

class Dog(Animal):
    def cry(self):
        # 親クラスのcry()を犬用の鳴き声で上書きする
        print(f"{self.name}：ワンワン！")

class Cat(Animal):
    def cry(self):
        print(f"{self.name}：ニャー")

pochi = Dog("ポチ")
tama = Cat("タマ")
pochi.cry()
tama.cry()
`,
      hints: [
        `オーバーライドは、親とまったく同じ名前・引数でメソッドを定義し直すだけです。Catクラスの書き方が見本になります。`,
        `passを消してdef cry(self):を定義し、print(f"{self.name}：ワンワン！")と書きましょう。`
      ],
      expectedOutput: "ポチ：ワンワン！"
    },
    {
      id: 114,
      title: "isinstanceと多態性",
      explanation: `<p><strong>isinstance(オブジェクト, クラス)</strong>は、オブジェクトがそのクラスのインスタンスかどうかをTrue/Falseで返す組み込み関数です。重要なのは、<strong>子クラスのインスタンスは親クラスのインスタンスとしても扱われる</strong>ことです。</p>
<pre><code>pochi = Dog("ポチ")
print(isinstance(pochi, Dog))       # True
print(isinstance(pochi, Animal))    # True（DogはAnimalの一種）
print(type(pochi) == Animal)        # False（typeは完全一致のみ）</code></pre>
<p>type()による比較は継承関係を考慮しないため、型チェックには原則isinstance()を使います。これは「犬は動物の一種である」というis-a関係をコードで表現したものです。</p>
<p>そして継承とオーバーライドが組み合わさると、<strong>多態性</strong>（ポリモーフィズム）が生まれます。多態性とは「同じ呼び出し方に対して、オブジェクトの実際の型に応じた動きが選ばれる」性質です。</p>
<pre><code>animals = [Dog("ポチ"), Cat("タマ")]
for animal in animals:
    animal.cry()    # 要素がDogならワンワン、Catならニャー</code></pre>
<p>ループ側は要素がどのクラスか気にせずcry()と書くだけでよく、if文で型ごとに分岐する必要がありません。将来Birdクラスを追加しても、<strong>ループのコードは1文字も変えずに</strong>新しい鳴き声に対応できます。これが多態性の実用上の最大の利点です。逆に言うと、isinstance()での分岐が増えてきたら「その処理はメソッドとして各クラスに持たせられないか」を疑うのが、オブジェクト指向設計のセオリーです。</p>`,
      task: `TODOの位置にfor文を書き、<code>animals</code>の各要素の<code>cry()</code>を呼び出してください。さらに要素がDogクラスのインスタンスのときだけ「（犬です）」と表示してください。`,
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def cry(self):
        print(f"{self.name}が鳴いた")

class Dog(Animal):
    def cry(self):
        print(f"{self.name}：ワンワン！")

class Cat(Animal):
    def cry(self):
        print(f"{self.name}：ニャー")

animals = [Dog("ポチ"), Cat("タマ"), Dog("タロー")]

# TODO: for文でanimalsを回して各要素のcry()を呼び出し、
# isinstance()で要素がDogのときだけ「（犬です）」と表示する
`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def cry(self):
        print(f"{self.name}が鳴いた")

class Dog(Animal):
    def cry(self):
        print(f"{self.name}：ワンワン！")

class Cat(Animal):
    def cry(self):
        print(f"{self.name}：ニャー")

animals = [Dog("ポチ"), Cat("タマ"), Dog("タロー")]

# 同じcry()という呼び出しで、実際の型ごとの動きになる（多態性）
for animal in animals:
    animal.cry()
    if isinstance(animal, Dog):
        print("（犬です）")
`,
      hints: [
        `リストの要素はfor animal in animals:で1つずつ取り出せます（第7章）。取り出した要素に対してanimal.cry()を呼びます。`,
        `型の判定はif isinstance(animal, Dog):と書きます。DogとCatで鳴き声が変わることも確認しましょう。`
      ],
      expectedOutput: "タマ：ニャー"
    },
    {
      id: 115,
      title: "ダンダーメソッド（__len__・__eq__）",
      explanation: `<p>__init__や__str__のように、前後にアンダースコア2つが付く特殊メソッドを<strong>ダンダーメソッド</strong>（double underscoreの略）と呼びます。Pythonの組み込み関数や演算子は、裏側でこのダンダーメソッドを呼び出しています。つまり、<strong>自作クラスにダンダーメソッドを定義すると、組み込みの構文がそのまま使えるようになります</strong>。</p>
<table>
<tr><th>書いたコード</th><th>実際に呼ばれるもの</th></tr>
<tr><td>len(obj)</td><td>obj.__len__()</td></tr>
<tr><td>a == b</td><td>a.__eq__(b)</td></tr>
<tr><td>print(obj)</td><td>obj.__str__()</td></tr>
<tr><td>a + b</td><td>a.__add__(b)</td></tr>
</table>
<pre><code>class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __eq__(self, other):
        return self.songs == other.songs</code></pre>
<p>__len__を定義していないクラスにlen()を使うと「TypeError: object of type 'Playlist' has no len()」になります。また__eq__を定義していない場合、==は<strong>同一のオブジェクトかどうか</strong>（is演算子と同じ基準）で比較されるため、中身が同じでも別インスタンスならFalseになります。「中身が等しければ等しい」と扱いたいクラスでは__eq__の定義が必須です。</p>
<p>ミドルエンジニア向けの補足として、__eq__を定義するとそのクラスは自動的に<strong>ハッシュ不可</strong>になり、集合の要素や辞書のキーに使えなくなります（必要なら__hash__も併せて定義します）。等価比較とハッシュは一貫している必要がある、というPythonのルールによるものです。</p>`,
      task: `Playlistクラスに<code>__len__</code>（曲数を返す）と<code>__eq__</code>（曲リストの中身が同じならTrue）を定義して、len()と==が使えるようにしてください。`,
      code: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    # TODO: __len__を定義して、len()で曲数（self.songsの要素数）を返せるようにする

    # TODO: __eq__を定義して、self.songsとother.songsが等しいときTrueになるようにする

p1 = Playlist(["春", "夏", "秋"])
p2 = Playlist(["春", "夏", "秋"])
print(f"曲数: {len(p1)}")
print(f"同じ内容か: {p1 == p2}")
`,
      solution: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        # len(プレイリスト)で曲数を返す
        return len(self.songs)

    def __eq__(self, other):
        # 曲リストの中身が同じなら等しいとみなす
        return self.songs == other.songs

p1 = Playlist(["春", "夏", "秋"])
p2 = Playlist(["春", "夏", "秋"])
print(f"曲数: {len(p1)}")
print(f"同じ内容か: {p1 == p2}")
`,
      hints: [
        `__len__はdef __len__(self):で定義し、return len(self.songs)と書きます。リストのlen()に処理を委ねる形です。`,
        `__eq__は比較相手を第2引数で受け取ります。def __eq__(self, other):と定義し、return self.songs == other.songsと書きましょう。`
      ],
      expectedOutput: "同じ内容か: True"
    },
    {
      id: 116,
      title: "__repr__と__str__の違い",
      explanation: `<p>オブジェクトを文字列にするダンダーメソッドは実は2つあります。<strong>__str__</strong>と<strong>__repr__</strong>です。似ていますが役割が異なります。</p>
<table>
<tr><th></th><th>__str__</th><th>__repr__</th></tr>
<tr><td>対象読者</td><td>エンドユーザー（人間向けの表示）</td><td>開発者（デバッグ向けの表示）</td></tr>
<tr><td>呼ばれる場面</td><td>print()・str()・f-string</td><td>repr()・対話モードでの表示・<strong>リストや辞書の中身の表示</strong></td></tr>
<tr><td>推奨される内容</td><td>読みやすい文</td><td>再現に必要な情報（慣習としてコンストラクタ呼び出し風）</td></tr>
</table>
<pre><code>class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

p = Point(1, 2)
print(p)          # (1, 2)               ←__str__
print(repr(p))    # Point(x=1, y=2)      ←__repr__
print([p])        # [Point(x=1, y=2)]    ←リスト内は__repr__</code></pre>
<p>見落としがちなのが3つ目の例です。<strong>リストや辞書に入れてprintすると、各要素には__repr__が使われます</strong>。__str__しか定義していないと、リストを表示した途端に「&lt;__main__.Point object at 0x...&gt;」の羅列に戻ってしまいます。</p>
<p>また、__str__が未定義の場合、print()は__repr__を代わりに使います（逆は成り立ちません）。このため実務では「<strong>まず__repr__を定義する。人間向け表示を変えたいときだけ__str__を追加する</strong>」が定石です。__repr__は「そのコードを実行すれば同じオブジェクトを作れる」形式にしておくと、デバッグログから状態を再現しやすくなります。</p>`,
      task: `Pointクラスに<code>__repr__</code>を定義して、「Point(x=1, y=2)」の形式の文字列を返すようにしてください。3つのprintの表示の違いを観察しましょう。`,
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    # TODO: __repr__を定義して「Point(x=1, y=2)」の形式の文字列を返す

p = Point(1, 2)
print(p)          # __str__が使われる
print(repr(p))    # __repr__が使われる
print([p])        # リストの中の表示には__repr__が使われる
`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        # 開発者向け：コンストラクタ呼び出し風の形式にするのが慣習
        return f"Point(x={self.x}, y={self.y})"

p = Point(1, 2)
print(p)          # __str__が使われる
print(repr(p))    # __repr__が使われる
print([p])        # リストの中の表示には__repr__が使われる
`,
      hints: [
        `def __repr__(self):で定義し、__str__と同じくreturnで文字列を返します。`,
        `f"Point(x={self.x}, y={self.y})"を返すと、repr(p)とprint([p])の表示が変わることを確認できます。`
      ],
      expectedOutput: "[Point(x=1, y=2)]"
    },
    {
      id: 117,
      title: "プロパティ（@property）",
      explanation: `<p>メソッド定義の直前に<strong>@property</strong>という1行を付けると、そのメソッドを<strong>丸括弧なしで属性のように参照できる</strong>ようになります。この@で始まる記法はデコレータと呼ばれるもので、仕組みそのものは第14章で学びます。ここでは「メソッドの直前に付ける飾り」として形だけ覚えれば十分です。</p>
<pre><code>class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return 3.14159 * self.radius ** 2

c = Circle(10)
print(c.area)       # 314.159（丸括弧なしで呼べる）</code></pre>
<p>@propertyが向いているのは、<strong>他の属性から計算で導ける値</strong>です。面積を普通の属性にすると、radiusを変更したときに面積の更新を忘れて食い違う恐れがあります。プロパティなら参照のたびに計算されるので、常にradiusと整合した値になります。「データの実体はradiusだけ、areaは見せ方」という整理です。</p>
<p>@propertyを付け忘れてc.areaと参照すると、エラーにはならず「&lt;bound method Circle.area of ...&gt;」のような<strong>メソッドオブジェクトそのもの</strong>が表示されます。値ではなく謎の表示が出たら、丸括弧忘れか@property忘れを疑いましょう。</p>
<p>発展として、@プロパティ名.setterを付けたメソッドを追加すると代入時の動きも定義でき、「マイナスの半径を代入されたら例外にする」といった検証を差し込めます。前章のBankAccountで触れたカプセル化を、属性らしい書き心地のまま実現できるのがプロパティの強みです。</p>`,
      task: `<code>area</code>メソッドの直前に<code>@property</code>を付けて、<code>c.area</code>と丸括弧なしで面積を参照できるようにしてください。`,
      code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    # TODO: このメソッドに@propertyを付けて、属性のように参照できるようにする
    def area(self):
        return 3.14159 * self.radius ** 2

c = Circle(10)
print(f"面積: {c.area}")
`,
      solution: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        # 参照されるたびにradiusから計算するので、常に整合した値になる
        return 3.14159 * self.radius ** 2

c = Circle(10)
print(f"面積: {c.area}")
`,
      hints: [
        `@propertyは、def area(self):のすぐ上の行に、同じインデントで書きます。`,
        `付ける前に一度実行して、c.areaがメソッドオブジェクトの表示になることを観察してから修正すると理解が深まります。`
      ],
      expectedOutput: "面積: 314.159"
    },
    {
      id: 118,
      title: "クラスメソッドとスタティックメソッド",
      explanation: `<p>メソッドには、これまでのインスタンスメソッドの他に2種類あります。<strong>クラスメソッド</strong>（@classmethodを付ける）と<strong>スタティックメソッド</strong>（@staticmethodを付ける）です。</p>
<table>
<tr><th>種類</th><th>第1引数</th><th>主な用途</th></tr>
<tr><td>インスタンスメソッド</td><td>self（インスタンス）</td><td>個々のインスタンスのデータを扱う</td></tr>
<tr><td>クラスメソッド</td><td>cls（クラス自身）</td><td>別の作り方のコンストラクタ</td></tr>
<tr><td>スタティックメソッド</td><td>なし</td><td>クラスに関連する補助的な計算</td></tr>
</table>
<pre><code>class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)    # cls()はTemperature()と同じ

    @staticmethod
    def is_freezing(celsius):
        return celsius &lt;= 0

t = Temperature.from_fahrenheit(212)     # 華氏からも作れる
print(t.celsius)                         # 100.0</code></pre>
<p>クラスメソッドの代表的な使い道は<strong>代替コンストラクタ</strong>です。__init__は1つしか定義できませんが、「摂氏から作る」「華氏から作る」のように作り方が複数欲しいとき、from_〇〇という名前のクラスメソッドを追加するのが定石です。第1引数clsにはクラス自身が渡されるため、cls(...)でインスタンスを作って返せます。標準ライブラリにもdict.fromkeys()など同じパターンが多数あります。</p>
<p>スタティックメソッドはselfもclsも受け取らない、実質ただの関数です。「クラスの外に置いてもよいが、意味的にこのクラスの近くに置きたい計算」をまとめるのに使います。どちらもインスタンスを作らずに「クラス名.メソッド名(...)」で呼び出せます。</p>`,
      task: `クラスメソッド<code>from_fahrenheit</code>を完成させてください。華氏<code>f</code>を摂氏（計算式：(f - 32) * 5 / 9）に変換し、<code>cls()</code>でインスタンスを作って返します。`,
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        # TODO: 華氏fを摂氏に変換し、cls()でインスタンスを作って返す
        pass

    @staticmethod
    def is_freezing(celsius):
        return celsius <= 0

t = Temperature.from_fahrenheit(212)
print(f"摂氏: {t.celsius}度")
print(f"氷点下か: {Temperature.is_freezing(-5)}")
`,
      solution: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        # 華氏を摂氏に変換してインスタンスを作る（代替コンストラクタ）
        return cls((f - 32) * 5 / 9)

    @staticmethod
    def is_freezing(celsius):
        return celsius <= 0

t = Temperature.from_fahrenheit(212)
print(f"摂氏: {t.celsius}度")
print(f"氷点下か: {Temperature.is_freezing(-5)}")
`,
      hints: [
        `クラスメソッドの中では、clsがクラス自身を指します。cls(値)と書けばTemperature(値)と同じ意味になります。`,
        `passを消してreturn cls((f - 32) * 5 / 9)と書きましょう。華氏212度は摂氏100.0度になります。`
      ],
      expectedOutput: "摂氏: 100.0度"
    },
    {
      id: 119,
      title: "独自例外クラス（Exception継承）",
      explanation: `<p>第10章では組み込みの例外（ValueErrorなど）を扱いました。実務のプログラムでは、<strong>Exceptionを継承した独自の例外クラス</strong>を定義して、アプリケーション固有のエラーを表現します。</p>
<pre><code>class OutOfStockError(Exception):
    pass

raise OutOfStockError("在庫が足りません")</code></pre>
<p>定義は驚くほど簡単で、Exceptionを継承して本体はpassだけで十分です。メッセージの保持や表示の仕組みはすべてExceptionから継承されるからです。クラス名は組み込み例外にならって<strong>〇〇Errorで終える</strong>のが慣習です。</p>
<p>独自例外を定義する利点は主に2つあります。</p>
<ul>
<li><strong>except節で狙い撃ちできる</strong>：except OutOfStockError:と書けば、在庫切れだけを捕まえて、無関係なバグ（TypeErrorなど）を誤って握りつぶさずに済みます。第10章で学んだ「裸のexcept:を避ける」の実践形です。</li>
<li><strong>エラーの意味が名前で伝わる</strong>：ValueErrorよりOutOfStockErrorの方が、何が起きたかが呼び出し側に明確に伝わります。</li>
</ul>
<p>捕捉には継承の知識がそのまま活きます。except Exception:は<strong>Exceptionのすべての子孫を捕まえる</strong>ため、独自例外もisinstance()の関係で捕捉されます。逆に言えば、独自例外を親クラスにして「AppError ← OutOfStockError」のような階層を作れば、「アプリ由来のエラーだけまとめて捕まえる」といった設計も可能です。継承・isinstance・例外処理という既習の知識が1つにつながるのが、このステップの学びどころです。</p>`,
      task: `TODOの位置に、Exceptionを継承した<code>OutOfStockError</code>クラスを定義してください。そのままでは<code>raise</code>の行でNameErrorになります。`,
      code: `# TODO: Exceptionを継承したOutOfStockErrorクラスを定義する（本体はpassでよい）

class Stock:
    def __init__(self, quantity):
        self.quantity = quantity

    def take(self, n):
        if n > self.quantity:
            raise OutOfStockError(f"在庫不足: 残り{self.quantity}個に対して{n}個の要求")
        self.quantity -= n

stock = Stock(3)
try:
    stock.take(5)
except OutOfStockError as e:
    print(f"エラー捕捉: {e}")
`,
      solution: `# Exceptionを継承した独自例外クラス（本体はpassで十分）
class OutOfStockError(Exception):
    pass

class Stock:
    def __init__(self, quantity):
        self.quantity = quantity

    def take(self, n):
        if n > self.quantity:
            raise OutOfStockError(f"在庫不足: 残り{self.quantity}個に対して{n}個の要求")
        self.quantity -= n

stock = Stock(3)
try:
    stock.take(5)
except OutOfStockError as e:
    print(f"エラー捕捉: {e}")
`,
      hints: [
        `独自例外はclass OutOfStockError(Exception):と書き、本体はpassだけで動きます。継承の書き方はステップ111と同じです。`,
        `メッセージの受け取りや表示はExceptionが引き継いでくれるため、自分で__init__を書く必要はありません。`
      ],
      expectedOutput: "在庫不足: 残り3個に対して5個の要求"
    },
    {
      id: 120,
      title: "総合演習（図形クラス階層）",
      explanation: `<p>この章の総仕上げとして、図形のクラス階層を完成させます。設計は次の通りです。</p>
<ul>
<li><strong>Shape（親クラス）</strong>：名前を持ち、__str__で「名前: 面積〇〇」と表示する。area()は「子クラスで実装すべき」という意味のNotImplementedError（未実装を表す組み込み例外）を送出する</li>
<li><strong>Rectangle・Circle（子クラス）</strong>：super().__init__で名前を設定し、area()をそれぞれの計算式でオーバーライドする</li>
</ul>
<pre><code>class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("サブクラスでarea()を実装してください")

    def __str__(self):
        return f"{self.name}: 面積{self.area():.2f}"</code></pre>
<p>注目してほしいのは、親クラスの__str__が<strong>self.area()を呼んでいる</strong>点です。親クラスを書いた時点では、area()の中身はまだ存在しません。それでも動くのは、実行時にselfの実際の型（RectangleやCircle）のarea()が選ばれるからです。オーバーライド（ステップ113）と多態性（ステップ114）、メソッド間呼び出し（ステップ109）がここで合流します。親が処理の骨組みを決め、子が詳細を埋めるこの形は、実務のフレームワークで多用される設計パターン（テンプレートメソッド）の原型です。</p>
<p>円の面積にはmathモジュールのmath.pi（円周率）を使います。importは第2章から使ってきたのと同じく、ファイルの先頭に書きます。面積は小数になるため、f-stringの書式指定:.2f（第3章）で小数第2位まで表示します。最後に全図形をリストに入れてforで回し、合計面積を求めます。</p>`,
      task: `Circleクラスの2つのTODOを完成させてください。__init__では<code>super().__init__("円")</code>で名前を設定して<code>self.radius</code>を保存し、<code>area</code>では円の面積（math.pi * 半径の2乗）を返します。`,
      code: `import math

class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("サブクラスでarea()を実装してください")

    def __str__(self):
        return f"{self.name}: 面積{self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("長方形")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        # TODO: super().__init__で名前を"円"に設定し、self.radiusにradiusを保存する
        pass

    def area(self):
        # TODO: 円の面積（math.pi * 半径の2乗）を返す
        pass

shapes = [Rectangle(4, 5), Circle(3), Rectangle(2, 8)]
total = 0
for shape in shapes:
    print(shape)
    total += shape.area()
print(f"合計面積: {total:.2f}")
`,
      solution: `import math

class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("サブクラスでarea()を実装してください")

    def __str__(self):
        return f"{self.name}: 面積{self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("長方形")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        # 親クラスの__init__で名前を設定し、半径を保存する
        super().__init__("円")
        self.radius = radius

    def area(self):
        # 円の面積 = 円周率 × 半径の2乗
        return math.pi * self.radius ** 2

shapes = [Rectangle(4, 5), Circle(3), Rectangle(2, 8)]
total = 0
for shape in shapes:
    print(shape)
    total += shape.area()
print(f"合計面積: {total:.2f}")
`,
      hints: [
        `Circleの__init__はRectangleの__init__が見本になります。渡す名前と保存する属性が違うだけです。`,
        `べき乗は**演算子です（第2章）。area()はreturn math.pi * self.radius ** 2と書けます。`,
        `正しく実装できると、長方形20.00・円28.27・長方形16.00の3行と合計面積64.27が表示されます。`
      ],
      expectedOutput: "合計面積: 64.27"
    }
  ]
});
