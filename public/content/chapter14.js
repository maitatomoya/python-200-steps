// 第14章：デコレータとスコープ
registerChapter({
  number: 14,
  title: "デコレータとスコープ",
  description: "関数がオブジェクトであることを起点に、クロージャとスコープ宣言（global・nonlocal）を理解し、実務で頻出するデコレータを自分で書けるようになります。",
  steps: [
    {
      id: 131,
      title: "関数はオブジェクト（変数に代入・引数に渡す）",
      explanation: `<p>Pythonでは関数も整数や文字列と同じ「オブジェクト」です。つまり、変数に代入したり、リストに入れたり、別の関数に引数として渡したりできます。この性質が、この章の主役であるデコレータの土台になります。</p>
<pre><code>def shout(text):
    return text.upper() + "!"

loud = shout       # ()を付けない：関数そのものを代入
print(loud("hi"))  # HI!  loudはshoutの別名として使える
print(shout.__name__)  # shout（関数は自分の名前を持っている）</code></pre>
<p>最重要ポイントは()の有無です。shoutと書けば「関数オブジェクトそのもの」、shout("hi")と書けば「関数を呼び出した結果の値」を意味します。たった2文字の違いで、意味がまったく変わります。</p>
<table>
<tr><th>書き方</th><th>意味</th><th>型</th></tr>
<tr><td>shout</td><td>関数そのもの</td><td>function</td></tr>
<tr><td>shout("hi")</td><td>呼び出した結果</td><td>str（この例では）</td></tr>
</table>
<p>関数を引数として受け取る関数は「高階関数」と呼ばれます。第9章で使ったsorted(data, key=len)のkey=lenも、len関数そのものを渡していたのです。「処理そのものを値として受け渡しできる」と理解できると、mapやfilter、sortedのkey引数、そしてデコレータまでが一本の線でつながります。</p>`,
      task: `<code>speak(shout("hello"), "hello")</code>は、関数の「呼び出し結果の文字列」を渡してしまうためTypeErrorになります。関数そのものを渡すように修正してください。`,
      code: `def shout(text):
    return text.upper() + "!"

def whisper(text):
    return "(" + text.lower() + ")"

def speak(style_func, text):
    # 受け取った関数style_funcを使ってtextを加工する（高階関数）
    result = style_func(text)
    print(result)

# TODO: 関数名の後ろに()を付けると「呼び出した結果」が渡されてしまう
# 関数そのものを渡すように修正する
speak(shout("hello"), "hello")
speak(whisper, "HELLO")
`,
      solution: `def shout(text):
    return text.upper() + "!"

def whisper(text):
    return "(" + text.lower() + ")"

def speak(style_func, text):
    # 受け取った関数style_funcを使ってtextを加工する（高階関数）
    result = style_func(text)
    print(result)

# ()を付けずに、関数そのものを渡す
speak(shout, "hello")
speak(whisper, "HELLO")
`,
      hints: [
        `shout("hello")は文字列"HELLO!"を返すので、speakの中でそれを関数として呼ぼうとしてTypeErrorになります。`,
        `2行目のspeak(whisper, "HELLO")が正しいお手本です。第1引数には()なしの関数名だけを渡します。`
      ],
      expectedOutput: "HELLO!"
    },
    {
      id: 132,
      title: "関数内関数とクロージャ",
      explanation: `<p>関数の中で別の関数を定義できます。内側の関数からは、外側の関数の引数やローカル変数がそのまま見えます。この「外側の変数を覚えた内側の関数」をクロージャ（closure。閉包）と呼びます。</p>
<pre><code>def make_greeter(name):
    def greeter():  # 関数内関数
        print(f"こんにちは、{name}さん")  # 外側のnameが見える
    return greeter  # ()を付けずに関数そのものを返す

hello = make_greeter("太郎")
hello()  # こんにちは、太郎さん</code></pre>
<p>不思議なのは、make_greeterの実行はとっくに終わっているのに、返されたgreeterがnameの値を覚えていることです。通常、関数のローカル変数は関数の終了とともに消えますが、内側の関数が参照している変数はクロージャの仕組みによって生き残ります。</p>
<p>前ステップの「()の有無」がここでも効いてきます。return greeter()と書くと「greeterを実行した結果」（printしかしていないので戻り値None）が返ってしまい、あとから呼び出せません。return greeterと書いてこそ「あとから何度でも呼べる関数」を返せます。</p>
<p>make_greeter("太郎")とmake_greeter("花子")は、それぞれ別のnameを覚えた独立のクロージャを作ります。「設定値を焼き込んだ専用関数を量産する工場」がクロージャの典型的な使い道です。</p>`,
      task: `<code>return greeter()</code>は関数を実行した結果（None)を返してしまうため、あとで呼び出せずTypeErrorになります。関数そのものを返すように修正してください。`,
      code: `def make_greeter(name):
    # 内側の関数は、外側の引数nameを覚えている（クロージャ）
    def greeter():
        print(f"こんにちは、{name}さん")
    # TODO: ()を付けて呼び出した結果（None）を返してしまっている
    # 関数そのものを返すように修正する
    return greeter()

hello_taro = make_greeter("太郎")
hello_hana = make_greeter("花子")

hello_taro()
hello_hana()
`,
      solution: `def make_greeter(name):
    # 内側の関数は、外側の引数nameを覚えている（クロージャ）
    def greeter():
        print(f"こんにちは、{name}さん")
    # ()を付けずに、関数そのものを返す
    return greeter

hello_taro = make_greeter("太郎")
hello_hana = make_greeter("花子")

hello_taro()
hello_hana()
`,
      hints: [
        `greeter()はその場で実行して戻り値Noneを返します。hello_taroにNoneが入るので、hello_taro()でTypeErrorになります。`,
        `return文から()を外して、関数オブジェクトそのものを返します。`
      ],
      expectedOutput: "こんにちは、花子さん"
    },
    {
      id: 133,
      title: "UnboundLocalError体験とglobal",
      explanation: `<p>関数の中で変数に代入すると、その変数は関数全体で「ローカル変数」として扱われます。これはPythonが関数のコードを読み込む時点で決まるルールで、代入行より前の行にも適用されます。そのため次のコードはUnboundLocalError（まだ値の入っていないローカル変数を読んだ、というエラー）になります。</p>
<pre><code>count = 0

def increment():
    count = count + 1  # 右辺のcountは「まだ値のないローカル変数」扱い

increment()
# UnboundLocalError: cannot access local variable 'count'
# where it is not associated with a value</code></pre>
<p>「外側のcountを読んでから1を足したい」つもりでも、関数内に代入がある時点でcountはローカル変数と判定され、右辺を評価する時点では未代入なのでエラーになるわけです。読むだけならグローバル変数をそのまま参照できるのに、代入が絡んだ瞬間にルールが変わる点がつまずきどころです。</p>
<p>グローバル変数に代入したいときは、関数の先頭でglobal countと宣言します。これで関数内のcountがグローバル変数そのものを指すようになります。ただし実務では、globalの多用はデータの流れを追いにくくするため嫌われます。基本は「引数で受け取り、戻り値で返す」設計にして、globalはどうしても必要な場面に限るのが良い習慣です（第8章で学んだスコープの話の発展形です）。</p>`,
      task: `<code>increment</code>関数はUnboundLocalErrorになります。関数の先頭に<code>global count</code>を追加して、グローバル変数countを更新できるようにしてください。`,
      code: `count = 0

def increment():
    # 関数内で代入すると、countは関数全体で「ローカル変数」とみなされる
    # そのため次の行は「代入前のローカル変数を読んだ」ことになりエラーになる
    # TODO: 関数の先頭にglobal宣言を追加して修正する
    count = count + 1

increment()
increment()
print(f"カウント: {count}")
`,
      solution: `count = 0

def increment():
    # global宣言で、この関数内のcountはグローバル変数を指すようになる
    global count
    count = count + 1

increment()
increment()
print(f"カウント: {count}")
`,
      hints: [
        `トレースバックの最終行を読みましょう。UnboundLocalErrorは「値の入っていないローカル変数を読んだ」という意味です。`,
        `代入の前の行に global count と書くと、関数内のcountがグローバル変数を指すようになります。`
      ],
      expectedOutput: "カウント: 2"
    },
    {
      id: 134,
      title: "nonlocal",
      explanation: `<p>関数内関数から「外側の関数の変数」に代入したいときは、globalではなくnonlocal（ノンローカル）を使います。globalはモジュール全体の変数を、nonlocalは1つ外側の関数の変数を指す宣言です。</p>
<pre><code>def make_accumulator():
    total = 0
    def add(amount):
        nonlocal total  # 外側のtotalに代入すると宣言
        total = total + amount
        return total
    return add</code></pre>
<p>nonlocalが無いと、add内に代入がある時点でtotalはaddのローカル変数と見なされ、前ステップと同じUnboundLocalErrorになります。「読むだけなら宣言不要、代入するなら宣言が必要」という関係はglobalと同じです。</p>
<table>
<tr><th>宣言</th><th>指す場所</th><th>主な使い場面</th></tr>
<tr><td>（宣言なし）</td><td>その関数のローカル変数</td><td>通常の変数</td></tr>
<tr><td>nonlocal</td><td>1つ外側の関数の変数</td><td>クロージャの状態を更新する</td></tr>
<tr><td>global</td><td>モジュール全体の変数</td><td>どうしても必要なときだけ</td></tr>
</table>
<p>nonlocalは、クロージャに「更新できる状態」を持たせるための鍵です。makeで作った関数を呼ぶたびにtotalが積み上がっていく動きは、まさに「小さな記憶を持った関数」です。グローバル変数と違って状態が外から見えないため、安全に閉じ込められるのも利点です。次のステップでこのパターンを定番の形に仕上げます。</p>`,
      task: `<code>add</code>関数内の代入がUnboundLocalErrorを起こします。代入の前に<code>nonlocal total</code>を追加して、外側の関数の変数totalを更新できるようにしてください。`,
      code: `def make_accumulator():
    total = 0

    def add(amount):
        # TODO: totalは「1つ外側の関数」の変数
        # nonlocal宣言を追加してから加算する
        total = total + amount
        return total

    return add

acc = make_accumulator()
print(acc(100))
print(acc(50))
print(acc(30))
`,
      solution: `def make_accumulator():
    total = 0

    def add(amount):
        # nonlocal宣言で、外側の関数のtotalを更新できるようになる
        nonlocal total
        total = total + amount
        return total

    return add

acc = make_accumulator()
print(acc(100))
print(acc(50))
print(acc(30))
`,
      hints: [
        `外側の「関数」の変数に代入するのでglobalではなくnonlocalを使います。globalはモジュール全体の変数用です。`,
        `total = total + amount の直前の行に nonlocal total と書きます。`
      ],
      expectedOutput: "180"
    },
    {
      id: 135,
      title: "クロージャでカウンタを作る",
      explanation: `<p>クロージャとnonlocalを組み合わせた定番が「カウンタ」です。呼ばれるたびに1増える関数を、工場関数（関数を作って返す関数）で量産できます。</p>
<pre><code>def make_counter(name):
    count = 0
    def counter():
        nonlocal count
        count += 1
        return f"{name}: {count}回目"
    return counter</code></pre>
<p>重要なのは、make_counter()を呼ぶたびに新しいcountが生まれることです。visit_a = make_counter("入口A")とvisit_b = make_counter("入口B")は、それぞれ独立したcountを抱えています。visit_aを何回呼んでも、visit_bのカウントには一切影響しません。グローバル変数でカウントを取るとすべての呼び出しが混ざってしまいますが、クロージャなら状態が関数ごとに閉じ込められ、外から勝手に書き換えられる心配もありません。</p>
<p>同じことは第11章で学んだクラスでも実現できます。属性countとメソッドを持つCounterクラスを作る方法との使い分けは、おおむね「状態1つと操作1つだけならクロージャで軽く、状態や操作が複数あるならクラスで」が目安です。</p>
<p>この「関数が状態を抱えて、呼ばれるたびに動く」構造は、次のステップから学ぶデコレータの中にそのまま登場します。ここで動きをしっかり体感しておきましょう。</p>`,
      task: `<code>print(visit_b())</code>と<code>print(visit_a())</code>の2行を追加してください。visit_bが「入口B: 1回目」、その後のvisit_aが「入口A: 3回目」になり、2つのカウンタが独立していることを確認しましょう。`,
      code: `def make_counter(name):
    count = 0

    def counter():
        nonlocal count
        count += 1
        return f"{name}: {count}回目"

    return counter

visit_a = make_counter("入口A")
visit_b = make_counter("入口B")

print(visit_a())
print(visit_a())
# TODO: visit_b()を1回呼び出して表示する（入口B: 1回目になるはず）
# TODO: さらにvisit_a()を呼び出して表示する（入口A: 3回目になるはず）
`,
      solution: `def make_counter(name):
    count = 0

    def counter():
        nonlocal count
        count += 1
        return f"{name}: {count}回目"

    return counter

visit_a = make_counter("入口A")
visit_b = make_counter("入口B")

print(visit_a())
print(visit_a())
# visit_bは独立したcountを持つので1回目から始まる
print(visit_b())
# visit_aのカウントはvisit_bの影響を受けず3回目になる
print(visit_a())
`,
      hints: [
        `make_counterを呼ぶたびに、新しいcountを抱えた別のクロージャが作られます。`,
        `print(visit_b())とprint(visit_a())を1行ずつ追加して、出力の回数表示を見比べましょう。`
      ],
      expectedOutput: "入口A: 3回目"
    },
    {
      id: 136,
      title: "デコレータの仕組み（手動での適用）",
      explanation: `<p>デコレータ（decorator。装飾するもの）とは、「関数を受け取り、機能を足した新しい関数を返す関数」のことです。ここまでに学んだ「関数はオブジェクト」と「関数内関数とクロージャ」の知識だけで作れます。</p>
<pre><code>def log_decorator(func):
    def wrapper():
        print("--- 実行前 ---")
        func()  # 元の関数を呼ぶ（クロージャがfuncを覚えている）
        print("--- 実行後 ---")
    return wrapper</code></pre>
<p>log_decoratorは、受け取った関数funcを前後の処理で包んだwrapper関数を返します。makeの実行が終わってもwrapperがfuncを覚えていられるのは、クロージャの働きです。</p>
<p>使うときは、元の関数をデコレータに通した結果を、同じ名前に代入し直します。</p>
<pre><code>def greet():
    print("こんにちは")

greet = log_decorator(greet)  # 包んだ関数で上書き
greet()  # 以後greetを呼ぶと、前後にログが付く</code></pre>
<p>この代入以降、greetという名前が指す実体はwrapperです。呼び出す側のコードを一切変えずに、関数の前後へ処理を差し込めるのがデコレータの価値です。ログ出力・実行時間計測・アクセス権チェックなど、「たくさんの関数に共通で足したい処理」を一箇所にまとめられます。次のステップで、この書き換えを1行で済ませる@構文を学びます。</p>`,
      task: `<code>...</code>を書き換えて、greetをlog_decoratorで包んだ関数に置き換えてから呼び出してください。`,
      code: `def log_decorator(func):
    # 元の関数funcを、前後の処理で包んだwrapperを返す
    def wrapper():
        print("--- 実行前 ---")
        func()
        print("--- 実行後 ---")
    return wrapper

def greet():
    print("こんにちは")

# TODO: greetをlog_decoratorに渡して、返ってきた関数をgreetに代入し直す
greet = ...

greet()
`,
      solution: `def log_decorator(func):
    # 元の関数funcを、前後の処理で包んだwrapperを返す
    def wrapper():
        print("--- 実行前 ---")
        func()
        print("--- 実行後 ---")
    return wrapper

def greet():
    print("こんにちは")

# greetを包んだwrapperで上書きする（手動でのデコレータ適用）
greet = log_decorator(greet)

greet()
`,
      hints: [
        `デコレータは「関数を受け取って関数を返す」ので、戻り値を元の名前に代入し直せば置き換えられます。`,
        `log_decoratorの引数に()なしのgreetを渡し、その戻り値をgreetに代入します。`
      ],
      expectedOutput: "--- 実行後 ---"
    },
    {
      id: 137,
      title: "@構文",
      explanation: `<p>前ステップの「greet = log_decorator(greet)」という書き換えは頻出パターンなので、Pythonには専用の記法があります。関数定義の直前の行に@デコレータ名と書くだけです。</p>
<pre><code>@announce
def morning_routine():
    print("ラジオ体操をする")

# 上の書き方は、下の書き方と完全に同じ意味
def morning_routine():
    print("ラジオ体操をする")
morning_routine = announce(morning_routine)</code></pre>
<p>@構文は糖衣構文（syntax sugar。同じ意味をより読みやすく書ける記法）です。defの直前に置くことで「この関数は定義した瞬間からannounceで包まれる」と一目で分かり、包み忘れや代入し忘れも防げます。</p>
<p>実は第12章で使った@propertyも、この仕組みそのものでした。propertyにメソッドを渡し、返ってきたオブジェクトで同名を上書きしていたのです。謎の呪文に見えていた@が「関数を関数に通して置き換える、ただの代入の省略形」だと分かると、Webフレームワークで頻繁に見かける@app.routeや、テストで使う@pytest.fixtureのようなコードも怖くなくなります。</p>
<p>なお、@構文にしたら手動の代入行は必ず削除します。残すと二重に包まれてしまい、前後のメッセージが2回ずつ表示されてしまいます。</p>`,
      task: `手動の書き換え行を削除し、<code>@announce</code>を<code>def morning_routine():</code>の直前の行に付けて、同じ動作を@構文で実現してください。`,
      code: `def announce(func):
    def wrapper():
        print("【開始】")
        func()
        print("【終了】")
    return wrapper

# TODO: @announceをdefの直前の行に付ける
def morning_routine():
    print("ラジオ体操をする")
    print("朝ごはんを食べる")

# TODO: @構文にしたら、この手動の書き換え行は削除する
morning_routine = announce(morning_routine)

morning_routine()
`,
      solution: `def announce(func):
    def wrapper():
        print("【開始】")
        func()
        print("【終了】")
    return wrapper

# @構文：定義した瞬間にannounceで包まれる
@announce
def morning_routine():
    print("ラジオ体操をする")
    print("朝ごはんを食べる")

morning_routine()
`,
      hints: [
        `@デコレータ名は、包みたい関数のdefの「直前の行」に書きます。`,
        `@announceを付けたうえで、morning_routine = announce(morning_routine)の行を削除します。残すと二重に包まれます。`
      ],
      expectedOutput: "【終了】"
    },
    {
      id: 138,
      title: "引数を取る関数へのデコレータ（*args・**kwargs）",
      explanation: `<p>前ステップまでのwrapper()は、引数なしの関数しか包めませんでした。add(3, 5)のような関数を包むと、wrapperが引数を受け取れずTypeErrorになります。そこで第8章で学んだ可変長引数*argsと**kwargsを使い、「どんな引数でも受け取って、そのまま元の関数へ横流しする」形にします。</p>
<pre><code>def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"呼び出し: {func.__name__}")
        result = func(*args, **kwargs)  # 受けた引数をそのまま渡す
        return result  # 戻り値も忘れずに返す
    return wrapper</code></pre>
<p>ポイントは3つあります。第一に、wrapper(*args, **kwargs)と定義すれば位置引数もキーワード引数もすべて受け取れること。第二に、func(*args, **kwargs)と書けば受け取った引数を展開してそのまま渡せること。第三に、funcの戻り値をreturnで返し忘れないことです。returnを忘れるとwrapperはNoneを返すため、「デコレータを付けた途端に関数の計算結果が消える」という分かりにくいバグになります。</p>
<p>この「*argsと**kwargsで受けて横流しし、戻り値もreturnする」形は、あらゆる関数に付けられる汎用デコレータの決まり文句です。実務のデコレータはほぼ例外なくこの形をしているので、テンプレートとして手に馴染ませておきましょう。</p>`,
      task: `<code>wrapper</code>が引数を受け取れないためTypeErrorになります。<code>*args, **kwargs</code>で受け取り、<code>func</code>にそのまま渡すように修正してください。`,
      code: `def log_calls(func):
    # TODO: wrapperが引数を受け取れるように*argsと**kwargsを追加し、
    # funcにそのまま渡す（戻り値のreturnはそのまま）
    def wrapper():
        print(f"呼び出し: {func.__name__}")
        result = func()
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

@log_calls
def introduce(name, age=20):
    return f"{name}（{age}歳）"

print(add(3, 5))
print(introduce("太郎", age=25))
`,
      solution: `def log_calls(func):
    # *argsと**kwargsで、どんな引数でも受け取ってそのまま横流しする
    def wrapper(*args, **kwargs):
        print(f"呼び出し: {func.__name__}")
        result = func(*args, **kwargs)
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

@log_calls
def introduce(name, age=20):
    return f"{name}（{age}歳）"

print(add(3, 5))
print(introduce("太郎", age=25))
`,
      hints: [
        `add(3, 5)の3と5は、実際にはwrapperに渡されています。wrapperがそれを受け取れる形にする必要があります。`,
        `定義側はdef wrapper(*args, **kwargs):、呼び出し側はfunc(*args, **kwargs)と書いて引数を素通しします。`
      ],
      expectedOutput: "太郎（25歳）"
    },
    {
      id: 139,
      title: "functools.wraps",
      explanation: `<p>デコレータで包んだ関数の__name__（関数名）を確認すると、wrapperと表示されてしまう問題があります。包んだ後の実体はwrapper関数なので、__name__や__doc__（docstring）がwrapperのものにすり替わってしまうのです。</p>
<pre><code>@simple_decorator
def calculate_tax(price):
    """税込金額を計算する"""
    return int(price * 1.1)

print(calculate_tax.__name__)  # wrapper（本来はcalculate_taxのはず）
print(calculate_tax.__doc__)   # None</code></pre>
<p>関数名やdocstringは、エラーメッセージ・デバッグ・ドキュメント生成ツールが参照する大事な情報です。すべてwrapperになってしまうと、トレースバックを見ても「どの関数で起きたエラーなのか」が分からなくなります。</p>
<p>解決策は、標準ライブラリfunctoolsのwrapsデコレータです。wrapperの定義にひと言添えるだけで、元の関数の名前やdocstringがwrapperにコピーされます。</p>
<pre><code>import functools

def simple_decorator(func):
    @functools.wraps(func)  # 元の関数の情報を引き継ぐ
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper</code></pre>
<p>@functools.wraps(func)のように引数を取る形の@も、「wraps(func)の戻り値がデコレータになり、それがwrapperに適用される」という同じ仕組みの積み重ねです。実務でデコレータを書くときは@functools.wrapsを付けるのがマナー、と覚えてください。</p>`,
      task: `デコレータで包んだ結果、関数名がwrapperになっています。<code>@functools.wraps(func)</code>を<code>def wrapper</code>の直前の行に追加して、元の関数の情報を引き継いでください。`,
      code: `import functools

def simple_decorator(func):
    # TODO: def wrapperの直前の行に@functools.wraps(func)を追加する
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@simple_decorator
def calculate_tax(price):
    """価格から消費税込みの金額を計算する"""
    return int(price * 1.1)

print(calculate_tax(1000))
print(f"関数名: {calculate_tax.__name__}")
print(f"docstring: {calculate_tax.__doc__}")
`,
      solution: `import functools

def simple_decorator(func):
    # functools.wrapsが__name__やdocstringを元の関数からコピーしてくれる
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@simple_decorator
def calculate_tax(price):
    """価格から消費税込みの金額を計算する"""
    return int(price * 1.1)

print(calculate_tax(1000))
print(f"関数名: {calculate_tax.__name__}")
print(f"docstring: {calculate_tax.__doc__}")
`,
      hints: [
        `まず修正前のコードを実行して、関数名がwrapper、docstringがNoneになってしまうことを確認しましょう。`,
        `デコレータの中のdef wrapper(...):の直前の行に、@functools.wraps(func)を同じインデントで追加します。`
      ],
      expectedOutput: "関数名: calculate_tax"
    },
    {
      id: 140,
      title: "総合演習（実行ログ・計測デコレータ）",
      explanation: `<p>総合演習として、この章の全要素を使った「実行ログ・計測デコレータ」を完成させます。関数の呼び出し回数を計測し、引数と戻り値をログに残す、実務のデバッグでそのまま役立つ道具です。</p>
<pre><code>def call_logger(func):
    count = 0  # 呼び出し回数（クロージャが抱える状態）

    @functools.wraps(func)         # (139) 関数情報を引き継ぐ
    def wrapper(*args, **kwargs):  # (138) どんな引数でも受ける
        nonlocal count             # (134) 外側のcountを更新する宣言
        count += 1
        # ログを出してから元の関数を呼び、戻り値を返す
        ...</code></pre>
<p>countはcall_loggerのローカル変数ですが、クロージャの仕組みでwrapperが抱え続け、nonlocal宣言によって更新できます（クロージャカウンタと同じ構造です）。デコレータは関数ごとに適用されるため、addとjoin_wordsはそれぞれ独立したcountを持ちます。addを2回呼んでもjoin_wordsのカウントは1回目から始まる点に注目してください。</p>
<p>実務では、ここに実行時間の計測（time.perf_counter。第17章で学びます）やログファイルへの記録を足した形が、性能調査やAPIの監視で広く使われています。「呼び出し側のコードを1行も変えずに、関数へ横断的な機能を差し込む」というデコレータの真価を、この演習で味わってください。関数はオブジェクト・クロージャ・nonlocal・可変長引数・functools.wrapsと、この章の学びがすべて1つのデコレータに詰まっています。</p>`,
      task: `TODOの2箇所を完成させてください。(1)<code>@functools.wraps(func)</code>をwrapperに適用する、(2)<code>nonlocal</code>宣言をしてから<code>count</code>を1増やす、の2点です。`,
      code: `import functools

def call_logger(func):
    count = 0

    # TODO 1: functools.wrapsをwrapperに適用する
    def wrapper(*args, **kwargs):
        # TODO 2: countを1増やす（nonlocal宣言を忘れずに）
        print(f"[LOG] {func.__name__} 呼び出し{count}回目 引数: {args}")
        result = func(*args, **kwargs)
        print(f"[LOG] 戻り値: {result}")
        return result

    return wrapper

@call_logger
def add(a, b):
    """2つの数を足す"""
    return a + b

@call_logger
def join_words(words):
    """単語リストを読点でつなぐ"""
    return "、".join(words)

print(add(3, 5))
print(add(10, 20))
print(join_words(["晴れ", "曇り", "雨"]))
print(f"関数名: {add.__name__}")
`,
      solution: `import functools

def call_logger(func):
    count = 0

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # クロージャのcountをnonlocalで更新し、呼び出し回数を計測する
        nonlocal count
        count += 1
        print(f"[LOG] {func.__name__} 呼び出し{count}回目 引数: {args}")
        result = func(*args, **kwargs)
        print(f"[LOG] 戻り値: {result}")
        return result

    return wrapper

@call_logger
def add(a, b):
    """2つの数を足す"""
    return a + b

@call_logger
def join_words(words):
    """単語リストを読点でつなぐ"""
    return "、".join(words)

print(add(3, 5))
print(add(10, 20))
print(join_words(["晴れ", "曇り", "雨"]))
print(f"関数名: {add.__name__}")
`,
      hints: [
        `修正前でも動きますが「呼び出し0回目」のままです。カウントが増えない原因と、関数名の表示を確認しましょう。`,
        `def wrapperの直前に@functools.wraps(func)を追加し、wrapperの先頭でnonlocal countを宣言してからcount += 1します。`
      ],
      expectedOutput: "[LOG] add 呼び出し2回目 引数: (10, 20)"
    }
  ]
});
