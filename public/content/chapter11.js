// 第11章：クラスの基礎
registerChapter({
  number: 11,
  title: "クラスの基礎",
  description: "クラスとインスタンスの概念から、__init__・メソッド・self・クラス属性までを学び、最後にBankAccountクラスを完成させます。",
  steps: [
    {
      id: 101,
      title: "クラスとインスタンス",
      explanation: `<p>クラス（class）は、関連するデータと処理をひとまとめにした「オブジェクトの設計図」です。そして設計図であるクラスから作られた実体を<strong>インスタンス</strong>（instance）と呼びます。たとえば「犬」という設計図から、「ポチ」や「タロー」という個別の犬を何匹でも作れます。これまで使ってきた文字列やリストも、実はstrクラスやlistクラスのインスタンスです。</p>
<p>クラスはclass文で定義します。クラス名は慣習として<strong>単語の先頭を大文字にするCapWords形式</strong>（例：Dog、BankAccount）で書きます。中身をあとから書く場合は、「何もしない」ことを表すpass文を置いておきます。</p>
<pre><code>class Dog:
    pass

pochi = Dog()          # インスタンス化
print(type(pochi))     # &lt;class '__main__.Dog'&gt;</code></pre>
<p>クラス名に丸括弧を付けて関数のように呼び出すと、インスタンスが1つ作られます。これを<strong>インスタンス化</strong>といいます。type()で型を調べると&lt;class '__main__.Dog'&gt;と表示されます。__main__は「実行中のスクリプト本体」を表すモジュール名です。</p>
<table>
<tr><th>用語</th><th>意味</th><th>例</th></tr>
<tr><td>クラス</td><td>設計図。データと処理の定義</td><td>class Dog:</td></tr>
<tr><td>インスタンス</td><td>設計図から作られた実体</td><td>pochi = Dog()</td></tr>
<tr><td>インスタンス化</td><td>クラスからインスタンスを作ること</td><td>Dog()</td></tr>
</table>
<p>同じクラスから作っても、インスタンスはそれぞれ<strong>別のオブジェクト</strong>です。同一のオブジェクトかどうかを調べるis演算子で比較するとFalseになることで確認できます。</p>`,
      task: `TODOの位置に、Dogクラスのインスタンスをもう1つ作って変数<code>taro</code>に代入し、その型を表示するコードを追加してください。最後の<code>pochi is taro</code>の結果も観察しましょう。`,
      code: `class Dog:
    pass

# Dogクラスからインスタンスを作る
pochi = Dog()
print(type(pochi))

# TODO: もう1つインスタンスを作って変数taroに代入し、type(taro)を表示する

# 2つのインスタンスは別のオブジェクト（Falseになる）
# print(pochi is taro)
`,
      solution: `class Dog:
    pass

# Dogクラスからインスタンスを作る
pochi = Dog()
print(type(pochi))

# もう1つインスタンスを作る
taro = Dog()
print(type(taro))

# 2つのインスタンスは別のオブジェクト（Falseになる）
print(pochi is taro)
`,
      hints: [
        `インスタンスはクラス名に丸括弧を付けて「クラス名()」で作れます。`,
        `pochiを作った行とまったく同じ書き方で、変数名だけtaroに変えてみましょう。最後のprint文のコメントアウト（#）も外してください。`
      ],
      expectedOutput: "<class '__main__.Dog'>"
    },
    {
      id: 102,
      title: "__init__と属性",
      explanation: `<p>インスタンスごとに異なるデータを持たせるには、<strong>__init__メソッド</strong>を定義します。__init__はインスタンス化の瞬間に自動で呼ばれる特別なメソッドで、<strong>イニシャライザ</strong>（初期化メソッド）と呼ばれます。名前の前後にアンダースコア2つが付くメソッドは「特殊メソッド（ダンダーメソッド）」といい、Pythonが決まったタイミングで自動的に呼び出します。</p>
<pre><code>class Dog:
    def __init__(self, name, age):
        self.name = name    # 属性nameに引数nameの値を保存
        self.age = age      # 属性ageに引数ageの値を保存

pochi = Dog("ポチ", 3)      # __init__が自動で呼ばれる
print(pochi.name)           # ポチ
print(pochi.age)            # 3</code></pre>
<p>第1引数の<strong>self</strong>は「作られようとしているインスタンス自身」を指します（詳しくはステップ104で扱います）。<code>self.name = name</code>は「このインスタンスのnameという入れ物に、引数nameの値をしまう」という意味です。インスタンスが持つこの入れ物を<strong>属性</strong>（attribute）と呼び、「インスタンス.属性名」で読み書きできます。</p>
<p>注意点として、<code>Dog("ポチ", 3)</code>と書いたとき、selfには自動でインスタンスが渡されるため、引数として自分で渡すのはnameとageの2つだけです。引数の数が合わないと「TypeError: __init__() takes 2 positional arguments but 3 were given」のようなエラーになります。関数のデフォルト引数やキーワード引数（第8章）は、__init__でもまったく同じように使えます。</p>`,
      task: `Dogクラスの__init__を修正して、第2引数<code>age</code>を受け取り属性<code>self.age</code>に保存できるようにしてください。そのままではTypeErrorになります。`,
      code: `class Dog:
    def __init__(self, name):
        self.name = name
        # TODO: 引数ageを受け取り、属性self.ageに保存できるようにする
        # （defの引数リストにも追加が必要）

pochi = Dog("ポチ", 3)
print(pochi.name)
print(pochi.age)
`,
      solution: `class Dog:
    def __init__(self, name, age):
        self.name = name
        # 引数ageを属性self.ageに保存する
        self.age = age

pochi = Dog("ポチ", 3)
print(pochi.name)
print(pochi.age)
`,
      hints: [
        `Dog("ポチ", 3)と2つの値を渡しているので、__init__側もselfの後ろに2つの引数を受け取る必要があります。`,
        `def __init__(self, name, age): と引数を増やし、本体にself.age = ageの1行を追加します。`
      ],
      expectedOutput: "ポチ"
    },
    {
      id: 103,
      title: "メソッド",
      explanation: `<p>クラスの中に定義した関数を<strong>メソッド</strong>（method）と呼びます。書き方は普通の関数とほぼ同じですが、2つの違いがあります。1つは<strong>class文の中にインデントして定義する</strong>こと、もう1つは<strong>第1引数に必ずselfを書く</strong>ことです。</p>
<pre><code>class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):                  # メソッドの定義
        print(f"{self.name}：ワンワン！")

pochi = Dog("ポチ")
pochi.bark()                         # メソッドの呼び出し</code></pre>
<p>メソッドは「インスタンス.メソッド名()」の形で呼び出します。呼び出すときにselfへ値を渡す必要はありません。Pythonがドットの左側のインスタンス（この例ではpochi）を自動でselfに渡してくれるからです。</p>
<p>メソッドの強みは、<strong>self経由でそのインスタンスの属性を自由に使える</strong>ことです。上の例ではbark()の中でself.nameを参照しているので、「どの犬が呼んだか」によって出力が変わります。普通の関数なら引数で名前を渡す必要がありますが、メソッドなら「データ（属性）と処理（メソッド）が同じオブジェクトにまとまっている」ため、呼び出し側のコードがシンプルになります。これがクラスを使う最大の利点で、<strong>オブジェクト指向プログラミング</strong>（データと処理をオブジェクトという単位にまとめる考え方）の基本です。</p>
<p>メソッドも関数と同じく、引数を増やしたりreturnで値を返したりできます。</p>`,
      task: `<code>introduce</code>メソッドを完成させて、「私は〇〇です。」（〇〇は属性name）と表示されるようにしてください。`,
      code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name}：ワンワン！")

    def introduce(self):
        # TODO: 「私は〇〇です。」（〇〇はself.name）と表示する
        pass

pochi = Dog("ポチ")
pochi.bark()
pochi.introduce()
`,
      solution: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name}：ワンワン！")

    def introduce(self):
        # 自分の名前を使って自己紹介する
        print(f"私は{self.name}です。")

pochi = Dog("ポチ")
pochi.bark()
pochi.introduce()
`,
      hints: [
        `メソッドの中では、self.nameで自分の属性を参照できます。bark()の書き方が参考になります。`,
        `passを消して、print(f"私は{self.name}です。")のようにf-stringで出力しましょう。`
      ],
      expectedOutput: "私はポチです。"
    },
    {
      id: 104,
      title: "selfの意味（AttributeError体験と修正）",
      explanation: `<p>メソッドの第1引数selfの正体は「<strong>そのメソッドを呼び出したインスタンス自身</strong>」です。実は<code>tama.meow()</code>という呼び出しは、内部的には<code>Cat.meow(tama)</code>と同じで、ドットの左側のtamaが自動的にselfに渡されています。だからメソッドの中でself.nameと書けば「呼び出したインスタンスのname属性」にアクセスできるのです。</p>
<p>selfまわりで初心者が最もよく出会うのが<strong>AttributeError</strong>です。存在しない属性にアクセスすると発生します。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 11, in &lt;module&gt;
    tama.meow()
  File "main.py", line 8, in meow
    print(self.nmae + "：ニャー")
          ^^^^^^^^^
AttributeError: 'Cat' object has no attribute 'nmae'. Did you mean: 'name'?</code></pre>
<p>トレースバック（エラー発生までの呼び出し履歴）の最終行を読むと、「Catオブジェクトにはnmaeという属性がない」と書かれています。__init__で保存したのはself.nameなのに、メソッド内でself.nmaeとタイプミスしたのが原因です。最近のPythonは「Did you mean: 'name'?」と修正候補まで教えてくれるので、必ず最終行まで読む習慣をつけましょう。</p>
<p>もう1つの定番ミスは、selfを付けずに<code>print(name)</code>と書いてしまうことです。この場合は「そんな変数はない」という意味のNameErrorになります。<strong>属性には必ずself.を付ける</strong>と覚えてください。</p>`,
      task: `このコードは実行するとAttributeErrorになります。トレースバックを読んで原因の行を特定し、正しく「タマ：ニャー」と表示されるように修正してください。`,
      code: `class Cat:
    def __init__(self, name):
        self.name = name

    def meow(self):
        # このメソッドにはタイプミスがある
        print(self.nmae + "：ニャー")

tama = Cat("タマ")
tama.meow()
`,
      solution: `class Cat:
    def __init__(self, name):
        self.name = name

    def meow(self):
        # 属性名のタイプミス（nmae）をnameに修正した
        print(self.name + "：ニャー")

tama = Cat("タマ")
tama.meow()
`,
      hints: [
        `トレースバックの最終行に「'Cat' object has no attribute 'nmae'」と表示されます。__init__で保存した属性名と見比べてみましょう。`,
        `meow()の中のself.nmaeをself.nameに直せば、__init__で保存した属性を正しく参照できます。`
      ],
      expectedOutput: "タマ：ニャー"
    },
    {
      id: 105,
      title: "属性の初期値とメソッドからの変更",
      explanation: `<p>属性は、必ずしも引数から受け取る必要はありません。__init__の中で<strong>固定の初期値</strong>を代入しておくこともよくあります。そして、メソッドの中で<code>self.属性 = 新しい値</code>と代入すれば、あとから属性を変更できます。</p>
<pre><code>class Counter:
    def __init__(self):
        self.count = 0          # 初期値0で始める

    def increment(self):
        self.count += 1         # 呼ばれるたびに1増やす

c = Counter()
c.increment()
c.increment()
print(c.count)                  # 2</code></pre>
<p>このように、インスタンスは「現在の値」を属性として持ち続けます。プログラミングではこれをオブジェクトの<strong>状態</strong>（state）と呼びます。increment()を呼ぶたびにcountという状態が更新されていくわけです。</p>
<p>関数だけで同じことをしようとすると、カウントの値を引数と戻り値で毎回受け渡すか、グローバル変数（第8章で学んだ、関数の外の変数）を使うことになります。グローバル変数はプログラムのどこからでも書き換えられてしまうため、規模が大きくなるとバグの温床になります。クラスを使えば「状態」と「それを変更する操作」がインスタンスの中に閉じ込められるので、<strong>どこで値が変わるのかをメソッド定義だけ見れば把握できる</strong>ようになります。これは実務でクラスを使う大きな動機の1つです。</p>`,
      task: `Counterクラスの__init__を完成させて、属性<code>count</code>を0で初期化してください。そのままではincrement()の中でAttributeErrorになります。`,
      code: `class Counter:
    def __init__(self):
        # TODO: 属性countを0で初期化する
        pass

    def increment(self):
        self.count += 1

c = Counter()
c.increment()
c.increment()
c.increment()
print(f"カウント: {c.count}")
`,
      solution: `class Counter:
    def __init__(self):
        # 属性countを0で初期化する
        self.count = 0

    def increment(self):
        self.count += 1

c = Counter()
c.increment()
c.increment()
c.increment()
print(f"カウント: {c.count}")
`,
      hints: [
        `increment()はself.countがすでに存在する前提で+= 1しています。最初の値を__init__で用意しておく必要があります。`,
        `passを消してself.count = 0と書けば、インスタンス作成時にカウントが0から始まります。`
      ],
      expectedOutput: "カウント: 3"
    },
    {
      id: 106,
      title: "__str__で表示を整える",
      explanation: `<p>自作クラスのインスタンスをそのままprint()すると、次のような素っ気ない表示になります。</p>
<pre><code>&lt;__main__.Book object at 0x104f3a2d0&gt;</code></pre>
<p>これは「Bookクラスのオブジェクトがメモリ上のこの場所にある」という意味で、人間にとってほぼ役に立ちません。そこで<strong>__str__メソッド</strong>を定義します。__str__は、print()やstr()に渡されたときに自動で呼ばれる特殊メソッドで、「このオブジェクトを人間向けの文字列にするとどうなるか」を決めます。</p>
<pre><code>class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def __str__(self):
        return f"{self.title}（{self.price}円）"

b = Book("Python入門", 2500)
print(b)        # Python入門（2500円）</code></pre>
<p>注意点は2つあります。第一に、__str__は<strong>printするのではなくreturnで文字列を返す</strong>こと。print()側が戻り値を受け取って表示します。第二に、<strong>戻り値は必ずstr型</strong>であること。数値などを返すと「TypeError: __str__ returned non-string」になります。数値を混ぜたいときはf-stringで文字列にまとめるのが定番です。</p>
<p>デバッグのときにprint(インスタンス)で中身がひと目で分かるようになるため、実務でも属性を持つクラスには__str__（または次章で学ぶ__repr__）を定義するのが良い習慣とされています。</p>`,
      task: `Bookクラスに<code>__str__</code>メソッドを定義して、print(b)で「Python入門（2500円）」と表示されるようにしてください。`,
      code: `class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    # TODO: __str__メソッドを定義して「タイトル（価格円）」の形式の文字列を返す

b = Book("Python入門", 2500)
print(b)
`,
      solution: `class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def __str__(self):
        # print()されたときの表示を定義する
        return f"{self.title}（{self.price}円）"

b = Book("Python入門", 2500)
print(b)
`,
      hints: [
        `def __str__(self): という名前でメソッドを定義すると、print()のときに自動で呼ばれます。アンダースコアは前後2つずつです。`,
        `printではなくreturnを使い、f"{self.title}（{self.price}円）"のような文字列を返しましょう。`
      ],
      expectedOutput: "Python入門（2500円）"
    },
    {
      id: 107,
      title: "複数インスタンスの独立性",
      explanation: `<p>同じクラスから作ったインスタンスは、<strong>それぞれが独立した属性を持ちます</strong>。1つのインスタンスの属性を変更しても、他のインスタンスには一切影響しません。</p>
<pre><code>class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def damage(self, amount):
        self.hp -= amount

hero = Player("勇者", 100)
slime = Player("スライム", 20)

hero.damage(30)
print(hero.hp)      # 70（勇者だけ減る）
print(slime.hp)     # 20（スライムは無傷）</code></pre>
<p>hero.damage(30)を呼んだとき、selfにはheroが渡されるため、変更されるのはheroのhp属性だけです。<code>self.hp -= amount</code>という同じ1行のコードが、「誰が呼んだか」によって別々のデータを更新する。これがクラスの仕組みの核心です。</p>
<p>第4章で学んだ「リストのコピーと参照の罠」（b = aで両方変わる現象）を思い出してください。あれは<strong>2つの変数が同じオブジェクトを指していた</strong>から起きた現象でした。今回のheroとslimeは、インスタンス化を2回行っているので<strong>最初から別のオブジェクト</strong>です。だからお互いに影響しません。逆に、<code>hero2 = hero</code>のように代入でコピーしたつもりになると、リストのときと同様に同じインスタンスを指してしまい、hero2への変更がheroにも「見える」ことになります。インスタンスを増やしたいときは必ずクラスから作り直しましょう。</p>`,
      task: `TODOの位置で、slimeに5のダメージを与えるコードを追加してください。実行して、heroとslimeのHPがそれぞれ独立に管理されていることを確認しましょう。`,
      code: `class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def damage(self, amount):
        self.hp -= amount

hero = Player("勇者", 100)
slime = Player("スライム", 20)

hero.damage(30)
# TODO: slimeに5のダメージを与える

print(f"{hero.name}のHP: {hero.hp}")
print(f"{slime.name}のHP: {slime.hp}")
`,
      solution: `class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def damage(self, amount):
        self.hp -= amount

hero = Player("勇者", 100)
slime = Player("スライム", 20)

hero.damage(30)
# slimeに5のダメージを与える（heroのHPには影響しない）
slime.damage(5)

print(f"{hero.name}のHP: {hero.hp}")
print(f"{slime.name}のHP: {slime.hp}")
`,
      hints: [
        `hero.damage(30)と同じ形で、呼び出す相手（ドットの左側）をslimeに変えます。`,
        `slime.damage(5)を追加すると、slimeのhpだけが20から15に減ります。`
      ],
      expectedOutput: "スライムのHP: 15"
    },
    {
      id: 108,
      title: "クラス属性とインスタンス属性",
      explanation: `<p>属性には2種類あります。これまで使ってきた<strong>インスタンス属性</strong>（__init__などでself.に代入するもの）と、<strong>クラス属性</strong>（class文の直下に書くもの）です。</p>
<pre><code>class Student:
    school = "さくら高校"        # クラス属性：全インスタンスで共有

    def __init__(self, name):
        self.name = name          # インスタンス属性：個体ごとに独立

a = Student("佐藤")
b = Student("鈴木")
print(a.school)     # さくら高校
print(b.school)     # さくら高校（同じ値を共有している）</code></pre>
<p>クラス属性は「そのクラスの全インスタンスに共通する値」を1か所で管理するのに使います。<code>a.school</code>のようにインスタンス経由で読むと、Pythonはまず<strong>インスタンス属性を探し、見つからなければクラス属性を探す</strong>という順序で値を見つけます。この検索順序を知っておくと、同名のインスタンス属性を代入した瞬間にクラス属性が「隠れる」現象も理解できます。</p>
<table>
<tr><th>種類</th><th>定義場所</th><th>持ち主</th><th>用途</th></tr>
<tr><td>クラス属性</td><td>class文の直下</td><td>クラス（全体で1つ）</td><td>共通の定数・設定値</td></tr>
<tr><td>インスタンス属性</td><td>メソッド内でself.に代入</td><td>インスタンスごと</td><td>個体ごとのデータ</td></tr>
</table>
<p>1つ注意があります。クラス属性にリストや辞書などの<strong>変更可能な値を置くと、全インスタンスで共有されているため、1か所の変更が全体に波及</strong>します。これは実務でも定番のバグ源なので、個体ごとに持たせたいデータは必ず__init__でインスタンス属性として初期化しましょう。</p>`,
      task: `Studentクラスにクラス属性<code>school</code>を追加し、値を「さくら高校」にしてください。そのままではAttributeErrorになります。`,
      code: `class Student:
    # TODO: クラス属性schoolを定義し、値を"さくら高校"にする

    def __init__(self, name):
        self.name = name

a = Student("佐藤")
b = Student("鈴木")
print(a.school)
print(b.school)
print(f"{a.name}と{b.name}は同じ学校")
`,
      solution: `class Student:
    # クラス属性：全インスタンスで共有される
    school = "さくら高校"

    def __init__(self, name):
        self.name = name

a = Student("佐藤")
b = Student("鈴木")
print(a.school)
print(b.school)
print(f"{a.name}と{b.name}は同じ学校")
`,
      hints: [
        `クラス属性はメソッドの外、class文の直下のインデント位置に「変数名 = 値」の形で書きます。selfは付けません。`,
        `TODOのコメントの位置にschool = "さくら高校"と書けば、aからもbからも同じ値が読めます。`
      ],
      expectedOutput: "さくら高校"
    },
    {
      id: 109,
      title: "メソッド間の呼び出し（self.メソッド名）",
      explanation: `<p>メソッドの中から、同じクラスの別のメソッドを呼び出すこともできます。書き方は属性のときと同じで、<strong>self.メソッド名()</strong>とします。selfを付け忘れると「そんな関数はない」という意味のNameErrorになるので注意してください。</p>
<pre><code>class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    def subtotal(self):
        return self.price * self.quantity

    def total_with_tax(self):
        return self.subtotal() * 1.1    # 自分のメソッドを呼ぶ</code></pre>
<p>total_with_tax()は、小計の計算をsubtotal()に任せて、自分は税の計算だけを担当しています。このように<strong>処理を小さなメソッドに分割し、組み合わせて使う</strong>のは、第8章で学んだ関数分割と同じ発想です。小計の計算方法が変わっても、subtotal()を1か所直すだけで、それを使う全メソッドに反映されます。</p>
<p>メソッド分割の目安は関数と同じで、「1つのメソッドは1つの仕事」です。特にクラスでは、次のような分け方が定番です。</p>
<ul>
<li><strong>計算するメソッド</strong>（値をreturnする。printしない）</li>
<li><strong>表示するメソッド</strong>（計算メソッドの結果を整形して出力する）</li>
<li><strong>状態を変更するメソッド</strong>（属性を書き換える）</li>
</ul>
<p>計算と表示を分けておくと、「計算結果を画面表示にもデータ保存にも使いたい」といった変更に強くなります。実務のコードレビューでもよく指摘されるポイントです。</p>`,
      task: `<code>total_with_tax</code>メソッドを完成させてください。<code>self.subtotal()</code>を呼び出して小計を求め、それを1.1倍（消費税10%）した値を返します。`,
      code: `class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    def subtotal(self):
        return self.price * self.quantity

    def total_with_tax(self):
        # TODO: self.subtotal()で小計を求め、1.1倍して返す
        pass

order = Order(500, 3)
print(f"小計: {order.subtotal()}円")
print(f"税込: {int(order.total_with_tax())}円")
`,
      solution: `class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    def subtotal(self):
        return self.price * self.quantity

    def total_with_tax(self):
        # 小計の計算はsubtotal()に任せ、ここでは税の計算だけを行う
        return self.subtotal() * 1.1

order = Order(500, 3)
print(f"小計: {order.subtotal()}円")
print(f"税込: {int(order.total_with_tax())}円")
`,
      hints: [
        `同じクラスのメソッドは、メソッド内からself.subtotal()のようにselfを付けて呼び出します。`,
        `passを消して、return self.subtotal() * 1.1と書きましょう。呼び出し側でint()に通すので小数のまま返して構いません。`
      ],
      expectedOutput: "税込: 1650円"
    },
    {
      id: 110,
      title: "総合演習（BankAccountクラス）",
      explanation: `<p>この章の総合演習として、銀行口座を表すBankAccountクラスを完成させます。使うのはすべてこの章で学んだ道具です。</p>
<ul>
<li><strong>__init__</strong>：口座名義を引数で受け取り、残高は初期値0で始める（ステップ102・105）</li>
<li><strong>メソッドによる状態の変更</strong>：deposit（入金）とwithdraw（出金）で残高を増減させる（ステップ105）</li>
<li><strong>__str__</strong>：print(口座)で現在の状態を見やすく表示する（ステップ106）</li>
</ul>
<p>今回のポイントは、withdrawに<strong>残高不足チェック</strong>を入れることです。出金額が残高を上回るときは残高を変更せず、メッセージだけを表示します。</p>
<pre><code>def withdraw(self, amount):
    if amount &gt; self.balance:
        print("残高不足です")
    else:
        self.balance -= amount</code></pre>
<p>このように「属性を不正な状態（残高マイナス）にさせないチェックをメソッド側に持たせる」のは、クラス設計の重要な考え方です。残高を変更する入り口をdepositとwithdrawの2つに限定しておけば、この2つのメソッドさえ正しければ残高は絶対に壊れない、と保証できます。属性を外から直接書き換えるのではなくメソッド経由で操作させるこの方針は<strong>カプセル化</strong>と呼ばれ、次章で学ぶ@propertyでさらに強化できます。</p>
<p>なお、失敗を呼び出し元に伝える手段としては第10章で学んだ例外（raise）もあります。今回はメッセージ表示で済ませますが、第12章の独自例外クラスで例外を使った版に発展させます。</p>`,
      task: `BankAccountクラスの2つのTODOを完成させてください。<code>withdraw</code>は残高不足なら「残高不足です」と表示して何もせず、足りていれば残高を減らして「〇〇円を出金しました（残高: 〇〇円）」と表示します。<code>__str__</code>は「口座名義: 〇〇 / 残高: 〇〇円」の形式の文字列を返します。`,
      code: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"{amount}円を入金しました（残高: {self.balance}円）")

    def withdraw(self, amount):
        # TODO: amountが残高より大きければ「残高不足です」と表示して何もしない
        # 足りていれば残高を減らし「〇〇円を出金しました（残高: 〇〇円）」と表示する
        pass

    def __str__(self):
        # TODO: 「口座名義: 〇〇 / 残高: 〇〇円」の形式の文字列を返す
        pass

account = BankAccount("山田太郎")
account.deposit(10000)
account.withdraw(3000)
account.withdraw(20000)
print(account)
`,
      solution: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"{amount}円を入金しました（残高: {self.balance}円）")

    def withdraw(self, amount):
        # 残高不足のときは状態を変更しない（不正な残高を防ぐ）
        if amount > self.balance:
            print("残高不足です")
        else:
            self.balance -= amount
            print(f"{amount}円を出金しました（残高: {self.balance}円）")

    def __str__(self):
        # 現在の口座の状態を人間向けの文字列で返す
        return f"口座名義: {self.owner} / 残高: {self.balance}円"

account = BankAccount("山田太郎")
account.deposit(10000)
account.withdraw(3000)
account.withdraw(20000)
print(account)
`,
      hints: [
        `withdrawはif amount > self.balance:で残高不足を判定し、else側で残高を減らしてから表示します。depositの書き方が参考になります。`,
        `__str__はprintではなくreturnで文字列を返します。ステップ106のBookクラスと同じ形です。`,
        `期待される実行結果は、入金→出金成功→残高不足→口座情報の4行です。`
      ],
      expectedOutput: "口座名義: 山田太郎 / 残高: 7000円"
    }
  ]
});
