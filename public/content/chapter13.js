// 第13章：イテレータとジェネレータ
registerChapter({
  number: 13,
  title: "イテレータとジェネレータ",
  description: "for文の裏側にあるイテレータの仕組みを理解し、yieldで値を1つずつ生み出すジェネレータを使ったメモリ効率のよい処理を学びます。",
  steps: [
    {
      id: 121,
      title: "イテラブルとイテレータ（iter・next）",
      explanation: `<p>for文がリストや文字列を回せるのは、それらが「イテラブル」だからです。イテラブル（iterable。反復可能なもの）とは「要素を順番に取り出せるオブジェクト」の総称で、リスト・タプル・文字列・辞書・rangeなどが該当します。一方、実際に要素を1つずつ取り出す係が「イテレータ」（iterator。反復子）です。</p>
<p>組み込み関数iter()をイテラブルに渡すとイテレータが手に入り、next()を呼ぶたびに次の要素が1つずつ返ってきます。</p>
<pre><code>numbers = [10, 20, 30]
it = iter(numbers)  # イテレータを取り出す
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30</code></pre>
<p>重要なのは、for文が内部でまさにこの仕組みを使っていることです。for n in numbers: と書くと、Pythonは裏でiter(numbers)を呼んでイテレータを作り、next()を繰り返して要素を取り出し、要素が尽きたら自動でループを終えます。つまりfor文は「iterとnextの自動運転」なのです。</p>
<table>
<tr><th>用語</th><th>役割</th><th>例</th></tr>
<tr><td>イテラブル</td><td>要素を順に取り出「せる」オブジェクト</td><td>リスト・文字列・range</td></tr>
<tr><td>イテレータ</td><td>要素を順に取り出す「係」。現在位置を覚えている</td><td>iter()の戻り値</td></tr>
</table>
<p>イテレータは「どこまで読んだか」という状態を持つのが特徴で、同じイテレータにnext()を呼ぶたびに前回の続きが返ります。この性質が、この章の主役であるジェネレータの土台になります。</p>`,
      task: `リスト<code>fruits</code>から取り出したイテレータ<code>it</code>に対して、<code>print(next(it))</code>の呼び出しをあと2回追加し、3つの要素をすべて表示してください。`,
      code: `fruits = ["りんご", "みかん", "ぶどう"]

# iter()でリスト（イテラブル）からイテレータを取り出す
it = iter(fruits)

# next()で要素を1つずつ取り出す
print(next(it))
# TODO: next(it)の呼び出しをあと2回追加して、残り2つの要素も表示する
`,
      solution: `fruits = ["りんご", "みかん", "ぶどう"]

# iter()でリスト（イテラブル）からイテレータを取り出す
it = iter(fruits)

# next()で要素を1つずつ取り出す
print(next(it))
print(next(it))
print(next(it))
`,
      hints: [
        `next()は呼ぶたびに「次の要素」を1つだけ返します。3要素すべて表示するには合計3回呼ぶ必要があります。`,
        `print(next(it))という行をあと2行追加するだけです。同じイテレータitを使うのがポイントです。`
      ],
      expectedOutput: "ぶどう"
    },
    {
      id: 122,
      title: "StopIteration",
      explanation: `<p>イテレータの要素が尽きた状態でさらにnext()を呼ぶと、StopIterationという例外が発生します。これは「もう返す要素がありません」という合図で、エラーというより終了通知に近い存在です。</p>
<pre><code>it = iter([1, 2])
next(it)  # 1
next(it)  # 2
next(it)  # StopIteration発生！</code></pre>
<p>第10章で学んだtry-exceptで、この例外は普通に捕まえられます。実はfor文は、内部でnext()を呼び続け、StopIterationが発生したらそれを合図にループを正常終了する、という動きをしています。for文で要素が尽きてもエラーにならないのは、この後始末を自動でやってくれているからです。</p>
<pre><code>it = iter([1, 2])
while True:
    try:
        value = next(it)
        print(value)
    except StopIteration:
        break  # for文はこれを自動でやっている</code></pre>
<p>また、next()には第2引数として「要素が尽きたときに返す既定値」を渡せます。next(it, None)と書けば、StopIterationを発生させる代わりにNoneが返るため、try-exceptを書かずに済む場面もあります。イテレータを直接操作するコードを書くときに覚えておくと便利なテクニックです。</p>`,
      task: `3回目の<code>next(it)</code>はStopIterationを発生させます。try-exceptでStopIterationを捕まえて「要素がなくなりました」と表示するように修正してください。`,
      code: `numbers = [10, 20]
it = iter(numbers)

print(next(it))
print(next(it))

# 3回目のnext()はStopIterationを発生させる
# TODO: try-exceptでStopIterationを捕まえ、「要素がなくなりました」と表示する
print(next(it))
`,
      solution: `numbers = [10, 20]
it = iter(numbers)

print(next(it))
print(next(it))

# 3回目のnext()はStopIterationを発生させる
try:
    print(next(it))
except StopIteration:
    print("要素がなくなりました")
`,
      hints: [
        `except StopIteration: のように例外の型を指定して捕まえます（第10章の復習です）。`,
        `tryブロックの中にprint(next(it))を入れ、exceptブロックの中でメッセージをprintします。`
      ],
      expectedOutput: "要素がなくなりました"
    },
    {
      id: 123,
      title: "ジェネレータ関数（yield）の基本",
      explanation: `<p>ジェネレータ関数は、returnの代わりにyield（イールド。「産出する」の意味）を使う特別な関数です。関数の中にyieldが1つでもあると、その関数はジェネレータ関数になります。</p>
<pre><code>def count_three():
    yield 1
    yield 2
    yield 3

gen = count_three()  # この時点では中身は1行も実行されない
print(next(gen))  # 1
print(next(gen))  # 2</code></pre>
<p>普通の関数と決定的に違うのは、呼び出した瞬間には中身が実行されないことです。count_three()の戻り値は「ジェネレータオブジェクト」というイテレータの一種で、next()が呼ばれて初めて実行が始まり、最初のyieldまで進んで値を返し、そこで一時停止します。次のnext()で続きから再開し、次のyieldでまた止まる、を繰り返します。</p>
<table>
<tr><th></th><th>return</th><th>yield</th></tr>
<tr><td>実行</td><td>そこで関数が完全に終了する</td><td>一時停止して値を返し、続きから再開できる</td></tr>
<tr><td>返せる回数</td><td>1回だけ</td><td>何回でも</td></tr>
</table>
<p>ジェネレータはイテレータなので、for文でそのまま回せます。要素が尽きると自動的にStopIterationが発生し、for文が終了します。「値を1つずつ、必要になったタイミングで生み出す関数」と考えると、この章の後半で学ぶメモリ効率の話に自然につながります。</p>`,
      task: `ジェネレータ関数<code>greet_gen</code>に「こんばんは」をyieldする行を追加して、3つのあいさつがすべて表示されるようにしてください。`,
      code: `def greet_gen():
    yield "おはよう"
    yield "こんにちは"
    # TODO: 「こんばんは」をyieldする行を追加する

for greeting in greet_gen():
    print(greeting)
`,
      solution: `def greet_gen():
    yield "おはよう"
    yield "こんにちは"
    yield "こんばんは"

for greeting in greet_gen():
    print(greeting)
`,
      hints: [
        `yieldは1つの関数の中に何個でも書けます。書いた順番に値が取り出されます。`,
        `yield "こんにちは"の下に、同じインデントでyieldの行を1行追加します。`
      ],
      expectedOutput: "こんばんは"
    },
    {
      id: 124,
      title: "ジェネレータの状態保持",
      explanation: `<p>ジェネレータの最大の特徴は、一時停止している間もローカル変数の値と実行位置を覚えていることです。普通の関数はreturnした瞬間にローカル変数が消えますが、ジェネレータはyieldで止まっている間、変数の状態をそっくり保持し、next()で再開したときにその続きから動きます。</p>
<pre><code>def stateful():
    total = 0
    total += 10
    yield total  # 10を返して一時停止（totalは保持される）
    total += 10
    yield total  # 再開して20を返す

gen = stateful()
print(next(gen))  # 10
print(next(gen))  # 20</code></pre>
<p>「実行がどこまで進んだか」も状態の一部です。今回の課題のコードでは、yieldの前後にprint()を置いて、next()を呼んだときにどこからどこまで実行されるのかを観察します。ジェネレータを作った直後には何も表示されず、1回目のnext()で関数の先頭から最初のyieldまで、2回目のnext()で最初のyieldの直後から2つ目のyieldまで、というふうに、実行が細切れに進む様子が出力から読み取れます。</p>
<p>この「状態を持ったまま中断・再開できる」性質のおかげで、ジェネレータは「前回の続きから計算する」処理を驚くほど簡潔に書けます。この後のステップの数列生成やストリーム処理で、この威力を体感していきましょう。</p>`,
      task: `<code>print(next(gen))</code>をもう1回追加して、3が表示されることを確認してください。「再開して〜」というメッセージが表示されるタイミングにも注目しましょう。`,
      code: `def counter_gen():
    print("最初のyieldまで実行")
    yield 1
    print("再開して2つ目のyieldまで実行")
    yield 2
    print("再開して3つ目のyieldまで実行")
    yield 3

gen = counter_gen()
print("--- ジェネレータを作った直後（まだ何も表示されない） ---")
print(next(gen))
print(next(gen))
# TODO: next(gen)をもう一度print()で呼び出して、3が表示されることを確認する
`,
      solution: `def counter_gen():
    print("最初のyieldまで実行")
    yield 1
    print("再開して2つ目のyieldまで実行")
    yield 2
    print("再開して3つ目のyieldまで実行")
    yield 3

gen = counter_gen()
print("--- ジェネレータを作った直後（まだ何も表示されない） ---")
print(next(gen))
print(next(gen))
print(next(gen))
`,
      hints: [
        `next()を呼ぶたびに、前回止まったyieldの直後から次のyieldまでが実行されます。`,
        `print(next(gen))を最後にもう1行追加します。yieldの直前にあるprint()がいつ動くかを観察しましょう。`
      ],
      expectedOutput: "再開して3つ目のyieldまで実行"
    },
    {
      id: 125,
      title: "ジェネレータ式",
      explanation: `<p>第9章で学んだリスト内包表記の角括弧を丸括弧に変えると、ジェネレータ式になります。見た目はほぼ同じですが、動作は大きく違います。</p>
<pre><code>squares_list = [n * n for n in range(5)]  # リスト：全要素を即座に作る
squares_gen = (n * n for n in range(5))   # ジェネレータ式：まだ何も計算しない</code></pre>
<p>リスト内包表記はその場で全要素を計算してメモリに並べますが、ジェネレータ式は「計算のレシピ」を作るだけで、値はnext()やfor文で要求されて初めて1つずつ計算されます。この方式を遅延評価（必要になるまで計算を遅らせること）と呼びます。</p>
<p>ジェネレータ式はsum()・max()・min()など、イテラブルを受け取る関数にそのまま渡せます。関数呼び出しの括弧と兼用できるので、引数が1つだけなら丸括弧を二重にする必要はありません。</p>
<pre><code>total = sum(n * n for n in range(1, 11))  # 括弧は1組でよい
print(total)  # 385</code></pre>
<p>使い分けの目安は、「結果を何度も使う・インデックスでアクセスしたい」ならリスト内包表記、「1回集計したら終わり」ならジェネレータ式です。特に大きなデータを合計するだけの場面では、全要素をメモリに並べる必要がないジェネレータ式が有利になります。後置ifによる絞り込みなど、内包表記の文法はそのまま使えます。</p>`,
      task: `角括弧を丸括弧に変えて<code>squares_gen</code>をジェネレータ式にし、型名が<code>generator</code>と表示されることを確認してください。`,
      code: `# リスト内包表記：先に全要素をメモリ上に作る
squares_list = [n * n for n in range(1, 6)]
print(squares_list)

# TODO: 角括弧[ ]を丸括弧( )に変えて、ジェネレータ式にする
squares_gen = [n * n for n in range(1, 6)]
print(sum(squares_gen))
print(type(squares_gen).__name__)
`,
      solution: `# リスト内包表記：先に全要素をメモリ上に作る
squares_list = [n * n for n in range(1, 6)]
print(squares_list)

# ジェネレータ式：丸括弧にすると、値は要求されるまで計算されない
squares_gen = (n * n for n in range(1, 6))
print(sum(squares_gen))
print(type(squares_gen).__name__)
`,
      hints: [
        `リスト内包表記とジェネレータ式の違いは、外側の括弧が角括弧か丸括弧かだけです。`,
        `squares_genを作る行の[と]を(と)に変えます。sum()はジェネレータをそのまま受け取れます。`
      ],
      expectedOutput: "generator"
    },
    {
      id: 126,
      title: "無限ジェネレータとbreakによる打ち切り",
      explanation: `<p>ジェネレータは「要求されるまで計算しない」ので、終わりのない無限ジェネレータを定義できます。while True:とyieldを組み合わせるのが定番の形です。</p>
<pre><code>def countup():
    n = 1
    while True:  # 無限ループだが、yieldで止まるので暴走しない
        yield n
        n += 1</code></pre>
<p>普通の関数でwhile True:を書いたら無限ループになってしまいますが（第7章で体験しましたね）、ジェネレータはyieldのたびに一時停止するため、呼び出し側がnext()を要求した回数しか実行されません。「蛇口をひねった分だけ水が出る」イメージです。</p>
<p>ただし、止めるかどうかは完全に呼び出し側の責任です。for文で回すときはbreakで打ち切る条件を必ず入れます。うっかりlist(countup())のように全要素を集めようとすると、終わりがないため実行が止まらなくなるので絶対に避けてください。</p>
<pre><code>for value in countup():
    if value > 3:
        break  # 打ち切り条件は呼び出し側が握る
    print(value)</code></pre>
<p>無限ジェネレータは「連番を無限に発行するID発行機」のように、必要な個数が事前に決まらない場面で活躍します。標準ライブラリのitertoolsにも同種の道具が揃っています（第15章で学びます）。</p>`,
      task: `打ち切り条件が<code>value >= 100</code>になっているため、100個も集めてしまいます。5個で打ち切るように条件を修正し、<code>[1, 2, 3, 4, 5]</code>と表示されるようにしてください。`,
      code: `def countup():
    # 1から無限に数え上げるジェネレータ
    n = 1
    while True:
        yield n
        n += 1

collected = []
for value in countup():
    collected.append(value)
    # TODO: 5個集めたら打ち切りたい。条件を修正する
    if value >= 100:
        break
print(collected)
`,
      solution: `def countup():
    # 1から無限に数え上げるジェネレータ
    n = 1
    while True:
        yield n
        n += 1

collected = []
for value in countup():
    collected.append(value)
    # 5個集めたら打ち切る
    if value >= 5:
        break
print(collected)
`,
      hints: [
        `無限ジェネレータを止められるのは呼び出し側のbreakだけです。breakの条件を見直しましょう。`,
        `if value >= 100: の100を、5個で止まる値に書き換えます。`
      ],
      expectedOutput: "[1, 2, 3, 4, 5]"
    },
    {
      id: 127,
      title: "yieldで数列を作る（フィボナッチ）",
      explanation: `<p>ジェネレータの「状態を保持する」性質は、数列の生成と相性抜群です。代表例がフィボナッチ数列（前の2つの数を足すと次の数になる数列。0, 1, 1, 2, 3, 5, 8, ...）です。</p>
<pre><code>def fibonacci(count):
    a, b = 0, 1
    for _ in range(count):
        yield a
        a, b = b, a + b  # 2つの変数を同時に更新</code></pre>
<p>ポイントはa, b = b, a + bという多重代入（第4章で学んだ書き方）です。右辺のbとa + bが先にまとめて評価されてから、左辺のaとbに同時に代入されます。これを2行に分けて順番に代入すると、正しく動きません。</p>
<pre><code># 間違い例
a = b      # ここでaが変わってしまう
b = a + b  # 「変わった後のa」で計算されるのでズレる</code></pre>
<p>この間違い方だと2行目の時点でaとbが同じ値になっているため、数列が0, 1, 2, 4, 8, ...と倍々に増えてしまいます。「右辺は代入前の値で評価したい」場面では多重代入が必須です。</p>
<p>なお、変数名の_（アンダースコア）は「ループ回数だけ必要で、値そのものは使わない」ことを示す慣習的な名前です。ジェネレータにすることで、フィボナッチ数列を「必要な個数だけ」「メモリに並べずに」取り出せるようになります。</p>`,
      task: `2行に分けた順次代入がバグの原因で、出力が倍々の数列になっています。多重代入の1行に書き換えて、正しいフィボナッチ数列<code>0 1 1 2 3 5 8 13</code>を表示してください。`,
      code: `def fibonacci(count):
    a, b = 0, 1
    for _ in range(count):
        yield a
        # TODO: この2行の順次代入はバグ（aが先に変わってしまう）
        # 多重代入1行に書き換える
        a = b
        b = a + b

for num in fibonacci(8):
    print(num, end=" ")
print()
`,
      solution: `def fibonacci(count):
    a, b = 0, 1
    for _ in range(count):
        yield a
        # 多重代入なら右辺が先にまとめて評価されるので正しく更新できる
        a, b = b, a + b

for num in fibonacci(8):
    print(num, end=" ")
print()
`,
      hints: [
        `a = bを実行した瞬間にaの値が失われるのが問題です。2つの代入を「同時に」行う必要があります。`,
        `a, b = b, a + b のように、カンマ区切りの多重代入1行にまとめます。`
      ],
      expectedOutput: "0 1 1 2 3 5 8 13"
    },
    {
      id: 128,
      title: "メモリ効率（リストとの対比）",
      explanation: `<p>リストとジェネレータの最大の違いはメモリの使い方です。sys.getsizeof()（オブジェクトそのもののメモリ使用量をバイト単位で返す関数）で比べてみましょう。</p>
<pre><code>import sys

nums_list = [n for n in range(100000)]
nums_gen = (n for n in range(100000))
print(sys.getsizeof(nums_list))  # 数十万バイト（環境により変動）
print(sys.getsizeof(nums_gen))   # 200バイト前後（環境により変動）</code></pre>
<p>リストは10万個の要素すべてをメモリ上に並べるため、サイズは要素数に比例して巨大になります。一方ジェネレータが持っているのは「現在の状態と計算のレシピ」だけなので、要素数が10個でも1億個でもサイズはほぼ一定です。</p>
<table>
<tr><th></th><th>リスト</th><th>ジェネレータ</th></tr>
<tr><td>メモリ使用量</td><td>要素数に比例</td><td>ほぼ一定</td></tr>
<tr><td>再利用</td><td>何度でも使える</td><td>1回使い切り</td></tr>
<tr><td>インデックスアクセス</td><td>nums[3]のように可能</td><td>不可（順に取り出すだけ）</td></tr>
<tr><td>len()</td><td>使える</td><td>使えない</td></tr>
</table>
<p>ジェネレータにも弱点はあります。1回イテレートすると使い切りになり、len()や添字アクセスもできません。「大量データを1回だけ順に処理する」ならジェネレータ、「何度も参照する・ランダムアクセスする」ならリスト、と使い分けるのが実務の基本です。</p>`,
      task: `<code>...</code>の部分を「<code>gen_size</code>が<code>list_size</code>より小さいかどうか」の比較式に置き換えて、Trueと表示されることを確認してください。`,
      code: `import sys

# 10万個の二乗数を「リスト」と「ジェネレータ式」の両方で用意する
squares_list = [n * n for n in range(100000)]
squares_gen = (n * n for n in range(100000))

list_size = sys.getsizeof(squares_list)
gen_size = sys.getsizeof(squares_gen)

print(f"リストのサイズ: {list_size}バイト")
print(f"ジェネレータのサイズ: {gen_size}バイト")
# TODO: ...を「gen_sizeがlist_sizeより小さいか」の比較式に置き換える
print("ジェネレータの方が小さい:", ...)
`,
      solution: `import sys

# 10万個の二乗数を「リスト」と「ジェネレータ式」の両方で用意する
squares_list = [n * n for n in range(100000)]
squares_gen = (n * n for n in range(100000))

list_size = sys.getsizeof(squares_list)
gen_size = sys.getsizeof(squares_gen)

print(f"リストのサイズ: {list_size}バイト")
print(f"ジェネレータのサイズ: {gen_size}バイト")
# ジェネレータは要素をためこまないので、サイズは常に小さい
print("ジェネレータの方が小さい:", gen_size < list_size)
`,
      hints: [
        `「AがBより小さい」は比較演算子で書けます（第6章の復習）。比較の結果はTrueかFalseになります。`,
        `...の部分をgen_sizeとlist_sizeの比較式に置き換えます。printは比較結果をそのまま表示できます。`
      ],
      expectedOutput: "ジェネレータの方が小さい: True"
    },
    {
      id: 129,
      title: "自作クラスをイテラブルにする（__iter__）",
      explanation: `<p>自作クラスのインスタンスをfor文で回そうとすると、TypeError: 'Playlist' object is not iterableというエラーになります。for文で回せるのは__iter__メソッドを持つオブジェクトだけだからです。逆に言えば、__iter__を定義すれば自作クラスもイテラブルになります。</p>
<p>もっとも簡単なのは、内部のリストのイテレータをそのまま返す方法です。</p>
<pre><code>class Playlist:
    def __init__(self):
        self.songs = []

    def __iter__(self):
        return iter(self.songs)  # 内部リストのイテレータを返す</code></pre>
<p>for song in playlist:と書くと、Pythonが裏でiter(playlist)を呼び、それが__iter__メソッドに転送されます（第12章で学んだダンダーメソッドと同じ仕組みです）。__iter__は「イテレータを返すメソッド」でありさえすればよいので、yieldを使ってジェネレータとして書く方法もあります。</p>
<pre><code>    def __iter__(self):
        for song in self.songs:
            yield "曲名: " + song  # 加工しながら返すのも簡単</code></pre>
<p>yield版は、取り出すときに値を加工したり順番を制御したりしたい場合に便利です。イテラブルにしておくと、for文だけでなくlist()・sum()・in演算子など、イテラブルを受け取るあらゆる機能で自作クラスがそのまま使えるようになり、クラスの使い勝手が一気に上がります。</p>`,
      task: `<code>Playlist</code>クラスに<code>__iter__</code>メソッドを追加して、インスタンスをfor文で回せるようにしてください。`,
      code: `class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, title):
        self.songs.append(title)

    # TODO: __iter__メソッドを定義して、内部リストself.songsのイテレータを返す

playlist = Playlist()
playlist.add("春の歌")
playlist.add("夏の歌")
playlist.add("秋の歌")

# __iter__が無いと、この行でTypeError: 'Playlist' object is not iterable
for song in playlist:
    print(song)
`,
      solution: `class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, title):
        self.songs.append(title)

    def __iter__(self):
        # 内部リストのイテレータをそのまま返す
        return iter(self.songs)

playlist = Playlist()
playlist.add("春の歌")
playlist.add("夏の歌")
playlist.add("秋の歌")

# __iter__を定義したので、インスタンスをfor文で回せる
for song in playlist:
    print(song)
`,
      hints: [
        `__iter__は「イテレータを返すメソッド」です。self.songsはリストなので、iter()でイテレータを取り出せます。`,
        `def __iter__(self): の中で、iter(self.songs)をreturnします。`
      ],
      expectedOutput: "秋の歌"
    },
    {
      id: 130,
      title: "総合演習（データストリーム処理）",
      explanation: `<p>総合演習として、センサーの測定値ストリームをジェネレータのパイプラインで処理します。パイプラインとは、複数の処理を配管のようにつなぎ、データを一方向に流していく構成のことです。</p>
<pre><code>stream = read_stream(records)   # 1件ずつ流す
clean = remove_errors(stream)   # 欠損値（None）を取り除く
warnings = (v for v in clean if v >= 25.0)  # 条件で絞る</code></pre>
<p>各段はジェネレータなので、この3行を書いた時点では何も計算されません。最後のfor文が値を1つ要求すると、warningsがcleanに、cleanがstreamに、と要求が連鎖して、データが1件ずつパイプを通り抜けてきます。全データをメモリに並べることなく、1件分のメモリで何万件でも処理できるのがこの構成の強みです。実務でも、ログ解析や大容量データの変換はこの形で書かれます。</p>
<p>注意点は、ジェネレータが1回使い切りであることです。一度for文で最後まで流したパイプラインをもう一度回しても、何も出てきません。集計をやり直したいときは、ジェネレータを作り直す必要があります。今回のコードでも、警告の抽出と平均の計算とでパイプラインを2回組み立てています。</p>
<p>この章で学んだiterとnext・yield・ジェネレータ式・使い切りの性質が、すべてこの1本のプログラムに詰まっています。データを「ためてから処理する」のではなく「流しながら処理する」感覚をつかんでください。</p>`,
      task: `<code>...</code>の部分をジェネレータ式に置き換えて、<code>clean</code>から25.0以上の値だけを取り出す<code>warnings</code>を作ってください。`,
      code: `# センサーの測定値ストリームを、ジェネレータのパイプラインで処理する

def read_stream(records):
    # 測定値を1件ずつ流すジェネレータ
    for record in records:
        yield record

def remove_errors(stream):
    # エラー値（None）を取り除くジェネレータ
    for value in stream:
        if value is not None:
            yield value

records = [22.5, None, 23.1, 24.8, None, 21.9, 25.3]

stream = read_stream(records)
clean = remove_errors(stream)

# TODO: ...をジェネレータ式に置き換えて、cleanのうち25.0以上の値だけを流す
warnings = ...

for w in warnings:
    print(f"警告: {w}度")

# 集計（ジェネレータは使い切りなので、パイプラインを作り直す）
clean2 = remove_errors(read_stream(records))
values = list(clean2)
average = round(sum(values) / len(values), 1)
print(f"有効データ数: {len(values)}件")
print(f"平均気温: {average}度")
`,
      solution: `# センサーの測定値ストリームを、ジェネレータのパイプラインで処理する

def read_stream(records):
    # 測定値を1件ずつ流すジェネレータ
    for record in records:
        yield record

def remove_errors(stream):
    # エラー値（None）を取り除くジェネレータ
    for value in stream:
        if value is not None:
            yield value

records = [22.5, None, 23.1, 24.8, None, 21.9, 25.3]

stream = read_stream(records)
clean = remove_errors(stream)

# ジェネレータ式でパイプラインの最終段を作る
warnings = (value for value in clean if value >= 25.0)

for w in warnings:
    print(f"警告: {w}度")

# 集計（ジェネレータは使い切りなので、パイプラインを作り直す）
clean2 = remove_errors(read_stream(records))
values = list(clean2)
average = round(sum(values) / len(values), 1)
print(f"有効データ数: {len(values)}件")
print(f"平均気温: {average}度")
`,
      hints: [
        `ジェネレータ式は（値 for 変数 in イテラブル if 条件）の形です。丸括弧で囲むのを忘れずに。`,
        `for value in clean に、後置ifで「value >= 25.0」の条件を付けます。`
      ],
      expectedOutput: "警告: 25.3度"
    }
  ]
});
