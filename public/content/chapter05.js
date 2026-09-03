// 第5章：辞書と集合
registerChapter({
  number: 5,
  title: "辞書と集合",
  description: "キーと値のペアを管理する辞書（dict）と、重複のない要素の集まりである集合（set）を学び、目的に応じてデータ構造を使い分ける力を身につけます。",
  steps: [
    {
      id: 41,
      title: "辞書の作成とアクセス",
      explanation: `<p>辞書（dict）は「キーと値のペア」をまとめて管理するデータ構造です。リストが要素を「並び順の番号（インデックス）」で取り出すのに対し、辞書は「キー」という名前で値を取り出します。「商品名から値段を調べる」「ユーザー名から年齢を調べる」のように、対応関係を表すのに最適です。</p>
<p>辞書は波かっこで作り、キーと値をコロンで区切って並べます。値の取り出しは角かっこにキーを書きます。</p>
<pre><code># キー: 値 のペアをカンマで並べる
prices = {"apple": 120, "banana": 80}

print(prices["apple"])  # 120
print(prices)           # {'apple': 120, 'banana': 80}</code></pre>
<p>リストと辞書の違いを整理すると次のようになります。</p>
<table>
<tr><th></th><th>リスト</th><th>辞書</th></tr>
<tr><td>作り方</td><td><code>[10, 20, 30]</code></td><td><code>{"a": 10, "b": 20}</code></td></tr>
<tr><td>取り出し方</td><td><code>nums[0]</code>（番号で指定）</td><td><code>prices["apple"]</code>（キーで指定）</td></tr>
<tr><td>向いている用途</td><td>順番のあるデータの列</td><td>名前と値の対応関係</td></tr>
</table>
<p>キーには文字列や数値などが使えます。同じキーを2回書くと後の値で上書きされるため、キーは辞書の中で必ず一意（重複しない状態）になります。また、Python 3.7以降の辞書は追加した順番を保持するので、printしたときの並びは登録順で安定しています。実務でもAPIのレスポンス（JSON形式のデータ）や設定値の管理など、辞書は最も出番の多いデータ構造のひとつです。まずはキーで値を取り出す感覚をつかみましょう。</p>`,
      task: `初期コードの2つ目の<code>print</code>を書き換えて、<code>orange</code>の値段を表示してください。`,
      code: `# 商品名をキー、値段を値にした辞書
prices = {"apple": 120, "banana": 80, "orange": 98}

# キーを[]で指定して値を取り出す
print(prices["apple"])

# TODO: "banana"を"orange"に変えて、orangeの値段を表示する
print(prices["banana"])

# 辞書全体もprintできる
print(prices)`,
      solution: `# 商品名をキー、値段を値にした辞書
prices = {"apple": 120, "banana": 80, "orange": 98}

# キーを[]で指定して値を取り出す
print(prices["apple"])

# orangeの値段を表示する
print(prices["orange"])

# 辞書全体もprintできる
print(prices)`,
      hints: [
        `辞書の値は「辞書名["キー"]」の形で取り出します。`,
        `print(prices["banana"])のキー部分を"orange"に変えるだけです。`
      ],
      expectedOutput: "{'apple': 120, 'banana': 80, 'orange': 98}"
    },
    {
      id: 42,
      title: "KeyError体験とget()",
      explanation: `<p>存在しないキーを角かっこで指定すると、KeyError（指定したキーが辞書に存在しないことを表すエラー）が発生してプログラムは止まります。</p>
<pre><code>stock = {"pen": 10}
print(stock["eraser"])</code></pre>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    print(stock["eraser"])
KeyError: 'eraser'</code></pre>
<p>トレースバック（エラーに至るまでの実行経路の表示）の最終行を見ると、エラーの種類がKeyErrorで、問題のキーが'eraser'だと一目で分かります。</p>
<p>「キーが存在しないかもしれない」場面では<code>get()</code>メソッドを使います。get()は第1引数にキー、第2引数に「キーがなかったときに返す既定値」を取り、エラーを起こさずに値を返します。既定値を省略した場合はNone（値が存在しないことを表す特別な値）が返ります。</p>
<pre><code>stock = {"pen": 10}
print(stock.get("pen", 0))     # 10（キーがあれば通常どおり）
print(stock.get("eraser", 0))  # 0（なければ既定値が返る）
print(stock.get("eraser"))     # None</code></pre>
<p>使い分けの目安は「キーが必ずあるはずなら角かっこ（なければバグなので早く気づけたほうがよい）、なくても正常といえる処理ならget()」です。実務では、外部から受け取ったデータのように中身が保証されない辞書にget()を使うのが定番のパターンです。</p>`,
      task: `初期コードは途中で<code>KeyError</code>になります。<code>get()</code>を使って、eraserが辞書にないときは0が表示されるように直してください。`,
      code: `stock = {"pen": 10, "note": 5}

print(stock["pen"])

# 存在しないキーへのアクセスはKeyErrorになる
# TODO: get()を使って、キーがないときは0が返るように直す
count = stock["eraser"]
print(f"eraserの在庫: {count}個")`,
      solution: `stock = {"pen": 10, "note": 5}

print(stock["pen"])

# get()なら存在しないキーでもエラーにならず既定値が返る
count = stock.get("eraser", 0)
print(f"eraserの在庫: {count}個")`,
      hints: [
        `まずそのまま実行して、トレースバックの最終行にKeyError: 'eraser'と表示されることを確認しましょう。`,
        `get()は「stock.get("キー", 既定値)」の形で使います。`,
        `stock["eraser"]をstock.get("eraser", 0)に書き換えます。`
      ],
      expectedOutput: "eraserの在庫: 0個"
    },
    {
      id: 43,
      title: "追加・変更・削除（del・pop）",
      explanation: `<p>辞書は作った後から自由に項目を増やしたり減らしたりできます。基本操作を表で整理します。</p>
<table>
<tr><th>操作</th><th>書き方</th><th>説明</th></tr>
<tr><td>追加</td><td><code>d["新キー"] = 値</code></td><td>存在しないキーへの代入で項目が増える</td></tr>
<tr><td>変更</td><td><code>d["既存キー"] = 値</code></td><td>存在するキーへの代入で値が上書きされる</td></tr>
<tr><td>削除</td><td><code>del d["キー"]</code></td><td>項目を取り除く（キーがなければKeyError）</td></tr>
<tr><td>取り出して削除</td><td><code>d.pop("キー")</code></td><td>値を返しつつ項目を取り除く</td></tr>
</table>
<p>注目したいのは、追加と変更が同じ書き方だという点です。Pythonは「キーがなければ追加、あれば上書き」と自動で判断します。シンプルな反面、キー名を打ち間違えると「変更したつもりが別のキーで追加されていた」というバグになるので、キー名は定数のように慎重に扱いましょう。</p>
<pre><code>scores = {"math": 70}
scores["english"] = 65   # 追加
scores["math"] = 85      # 変更
del scores["english"]    # 削除
print(scores)            # {'math': 85}</code></pre>
<p><code>pop()</code>は「削除した値をそのまま使いたい」ときに便利です。また、get()と同様に第2引数へ既定値を渡せるので、キーがないかもしれない場面でも安全に使えます。</p>
<pre><code>d = {"a": 1}
x = d.pop("a")       # 1が返り、項目は消える
y = d.pop("b", 0)    # キーがなくても既定値0が返る</code></pre>
<p>delはリストの要素削除（del nums[0]）にも使える汎用の文で、popはリストにもある同名メソッドです。第4章で学んだリスト操作と対応づけて覚えると整理しやすいでしょう。</p>`,
      task: `TODOコメントに従って、scienceの追加（90に修正）・mathの変更・englishの削除を行い、期待どおりの出力にしてください。`,
      code: `scores = {"math": 70, "english": 65}

# TODO 1: scienceの値を0ではなく90にして追加する
scores["science"] = 0

# TODO 2: mathの値を85に変更する行を追加する

# TODO 3: delでenglishを削除する行を追加する

# popは削除しつつ値を返す
removed = scores.pop("science")
print(f"取り出した値: {removed}")
print(scores)`,
      solution: `scores = {"math": 70, "english": 65}

# 追加：新しいキーへの代入で項目が増える
scores["science"] = 90

# 変更：既存のキーへの代入で上書きされる
scores["math"] = 85

# 削除：delは項目を取り除く
del scores["english"]

# popは削除しつつ値を返す
removed = scores.pop("science")
print(f"取り出した値: {removed}")
print(scores)`,
      hints: [
        `追加と変更はどちらも「scores["キー"] = 値」の形です。`,
        `削除は「del scores["english"]」のように書きます。`,
        `最後にmathだけが残り、popでscienceの90が取り出されれば正解です。`
      ],
      expectedOutput: "{'math': 85}"
    },
    {
      id: 44,
      title: "in演算子とkeys・values",
      explanation: `<p>「この辞書にあのキーはあるか？」を調べるには<code>in</code>演算子を使います。ここで重要な仕様がひとつあります。<strong>辞書に対するinは「キー」だけを調べる</strong>という点です。値を調べたつもりでFalseが返る、というのは初心者がよく踏む落とし穴です。</p>
<pre><code>menu = {"coffee": 400}
print("coffee" in menu)   # True（キーにある）
print(400 in menu)        # False！ 値は調べていない</code></pre>
<p>値の側を調べたいときは<code>values()</code>メソッドで「値の集まり」を取り出し、それに対してinを使います。同様に<code>keys()</code>はキーの集まりを返します。</p>
<pre><code>print(400 in menu.values())   # True
print("coffee" in menu.keys())  # Trueだが、単にin menuと書くのが普通</code></pre>
<p>keys()やvalues()が返すのは「ビュー」と呼ばれる特殊なオブジェクトで、辞書の中身を映すレンズのようなものです。元の辞書に項目を追加すると、取得済みのビューにも自動で反映されます。リストとして固定したいときは<code>list()</code>で変換します。</p>
<pre><code>menu = {"coffee": 400, "tea": 350}
print(list(menu.keys()))    # ['coffee', 'tea']
print(list(menu.values()))  # [400, 350]</code></pre>
<p>実務では「キーの存在チェックはin、値の一覧が必要ならlist(d.values())」というパターンが頻出します。inがキーを見るという仕様は、辞書の主役がキーであることの表れだと理解しておきましょう。</p>`,
      task: `TODOの行を書き換えて、値の400が辞書にあるかを<code>values()</code>を使って正しく判定してください。`,
      code: `menu = {"coffee": 400, "tea": 350, "juice": 300}

# inはキーに対して判定する
print("coffee" in menu)

# 値の400があるか調べたい。しかしinはキーを見るのでFalseになる
print(400 in menu)

# TODO: values()を使って「値に400があるか」を正しく判定する
print(False)

# キー一覧と値一覧をリスト化して表示
print(list(menu.keys()))
print(list(menu.values()))`,
      solution: `menu = {"coffee": 400, "tea": 350, "juice": 300}

# inはキーに対して判定する
print("coffee" in menu)

# 値の400があるか調べたい。しかしinはキーを見るのでFalseになる
print(400 in menu)

# values()を使えば「値の集まり」に対して判定できる
print(400 in menu.values())

# キー一覧と値一覧をリスト化して表示
print(list(menu.keys()))
print(list(menu.values()))`,
      hints: [
        `辞書そのものへのinはキーだけを調べます。値を調べるにはvalues()が必要です。`,
        `print(400 in menu.values())のように書きます。`
      ],
      expectedOutput: "['coffee', 'tea', 'juice']"
    },
    {
      id: 45,
      title: "items()とlist化しての観察",
      explanation: `<p><code>items()</code>メソッドは、辞書の全項目を「(キー, 値)のタプル」の集まりとして取り出します。keys()・values()と同じくビューが返るので、list()でリスト化すると中身を観察できます。</p>
<pre><code>fruits = {"apple": 120, "banana": 80}
pairs = list(fruits.items())
print(pairs)  # [('apple', 120), ('banana', 80)]</code></pre>
<p>出力をよく見ると、リストの中に丸かっこのタプルが並んでいます。第4章で学んだとおりタプルはイミュータブル（後から変更できない性質）なので、キーと値のペアを「壊れない1組」として安全に持ち運べます。</p>
<p>ペアはインデックスで取り出せて、さらに第4章で学んだアンパック（タプルの中身を複数の変数へ一度に代入する書き方）と組み合わせると、キーと値を別々の変数に受け取れます。</p>
<pre><code>first = pairs[0]      # ('apple', 120)
name, price = first   # name="apple", price=120
print(f"{name}は{price}円")</code></pre>
<p>3つの取り出しメソッドを整理しておきましょう。</p>
<table>
<tr><th>メソッド</th><th>取り出すもの</th><th>list化した例</th></tr>
<tr><td><code>keys()</code></td><td>キーだけ</td><td><code>['apple', 'banana']</code></td></tr>
<tr><td><code>values()</code></td><td>値だけ</td><td><code>[120, 80]</code></td></tr>
<tr><td><code>items()</code></td><td>(キー, 値)のタプル</td><td><code>[('apple', 120), ('banana', 80)]</code></td></tr>
</table>
<p>items()は第7章で学ぶfor文と組み合わせたときに真価を発揮する、辞書処理の中心となるメソッドです。ここでは「タプルのペアが並んでいる」という構造をしっかり目に焼き付けておきましょう。</p>`,
      task: `TODO部分を書き換えて、先頭のペア<code>first</code>をアンパックし、変数<code>name</code>と<code>price</code>に分けてください。`,
      code: `fruits = {"apple": 120, "banana": 80}

# items()で(キー, 値)のペア一覧を取り出す
pairs = list(fruits.items())
print(pairs)

# 先頭のペアはタプル
first = pairs[0]
print(first)

# TODO: firstをアンパックしてnameとpriceに分ける
name = "?"
price = 0
print(f"{name}は{price}円")`,
      solution: `fruits = {"apple": 120, "banana": 80}

# items()で(キー, 値)のペア一覧を取り出す
pairs = list(fruits.items())
print(pairs)

# 先頭のペアはタプル
first = pairs[0]
print(first)

# アンパックでキーと値を別々の変数に受け取る
name, price = first
print(f"{name}は{price}円")`,
      hints: [
        `firstは('apple', 120)という要素2個のタプルです。`,
        `アンパックは「name, price = first」のようにカンマ区切りの変数で受け取ります。`
      ],
      expectedOutput: "appleは120円"
    },
    {
      id: 46,
      title: "ネストした辞書",
      explanation: `<p>辞書の値には、数値や文字列だけでなく辞書そのものも入れられます。辞書の中に辞書が入った構造を「ネスト（入れ子）」と呼び、ユーザー情報や設定データなど、実務のデータはほとんどがこの形をしています。</p>
<pre><code>users = {
    "taro": {"age": 28, "city": "Tokyo"},
    "hanako": {"age": 31, "city": "Osaka"},
}</code></pre>
<p>内側の値を取り出すには、角かっこを外側から順に2回つなげます。<code>users["taro"]</code>がまず内側の辞書{"age": 28, "city": "Tokyo"}を返し、それに対して<code>["age"]</code>を適用する、という2段階の動きです。</p>
<pre><code>print(users["taro"]["age"])     # 28
print(users["hanako"]["city"])  # Osaka</code></pre>
<p>角かっこが3つ4つと連なると読みにくくなるので、内側の辞書をいったん変数に受けるのが読みやすいコードのコツです。</p>
<pre><code>taro = users["taro"]
print(f"taroは{taro['age']}歳、{taro['city']}在住")</code></pre>
<p>ネストが深い辞書で途中のキーが存在しないと、その段階でKeyErrorになります。<code>users.get("jiro", {})</code>のように「なければ空の辞書」を既定値にすると、続く<code>.get("age")</code>を安全に呼べるという防御パターンも実務ではよく使われます（この場合の結果はNoneになります）。まずは「外側から内側へ、1段ずつたどる」という基本の動きを確実にしましょう。</p>`,
      task: `TODOの2行を書き換えて、taroのage（28）とhanakoのcity（Osaka）をそれぞれ表示してください。`,
      code: `users = {
    "taro": {"age": 28, "city": "Tokyo"},
    "hanako": {"age": 31, "city": "Osaka"},
}

# TODO: taroのageを取り出す（[]を外側→内側の順に2回使う）
print(users["taro"])

# TODO: hanakoのcityを取り出す
print(users["hanako"])

# 内側の辞書を変数に受けると読みやすい
taro = users["taro"]
print(f"taroは{taro['age']}歳、{taro['city']}在住")`,
      solution: `users = {
    "taro": {"age": 28, "city": "Tokyo"},
    "hanako": {"age": 31, "city": "Osaka"},
}

# taroのage：外側のキー→内側のキーの順にたどる
print(users["taro"]["age"])

# hanakoのcity
print(users["hanako"]["city"])

# 内側の辞書を変数に受けると読みやすい
taro = users["taro"]
print(f"taroは{taro['age']}歳、{taro['city']}在住")`,
      hints: [
        `users["taro"]は内側の辞書を返します。その結果にもう一度[]を使えます。`,
        `users["taro"]["age"]のように角かっこを2つ連ねて書きます。`
      ],
      expectedOutput: "taroは28歳、Tokyo在住"
    },
    {
      id: 47,
      title: "集合の作成と重複除去",
      explanation: `<p>集合（set）は「重複のない要素の集まり」を表すデータ構造です。数学の集合と同じ考え方で、同じ値は1つしか持てず、要素に順序がありません。最大の活躍どころは<strong>重複除去</strong>です。リストを<code>set()</code>に渡すだけで、重複が自動的に取り除かれます。</p>
<pre><code>answers = ["red", "blue", "red", "green", "blue", "red"]
colors = set(answers)
print(len(colors))  # 3（種類の数が分かる）</code></pre>
<p>「アンケートの回答から何種類の答えがあったか数える」「アクセスログからユニークユーザー数を出す」など、実務でも頻出のパターンです。集合は波かっこでも直接作れます。</p>
<pre><code>tags = {"python", "web", "python"}
print(len(tags))  # 2（重複は作った時点で消える）</code></pre>
<p>注意点が2つあります。1つ目は、<strong>空の集合は<code>set()</code>で作る</strong>こと。<code>{}</code>と書くと空の「辞書」になってしまいます。波かっこは辞書が先に予約している、と覚えてください。2つ目は、集合には順序がないため、printしたときの並び順が環境によって変わりうることです。並びを揃えて表示・比較したいときは<code>sorted()</code>でリスト化します。</p>
<pre><code>print(sorted(colors))  # ['blue', 'green', 'red'] と常に同じ並びになる</code></pre>
<p>順序がない代わりに、集合は「ある要素が含まれるか」の判定が非常に高速という強みを持ちます。この性質はステップ49で辞書との使い分けとして整理します。</p>`,
      task: `TODOの行を書き換えて、リスト<code>answers</code>を<code>set()</code>で集合に変換し、重複が除去されることを確認してください。`,
      code: `# アンケートの回答（重複あり）
answers = ["red", "blue", "red", "green", "blue", "red"]
print(len(answers))

# TODO: set()でanswersを集合に変換する
colors = answers
print(len(colors))

# 集合は順序を持たないので、表示はsorted()で並べる
print(sorted(colors))

# 空の集合はset()で作る（{}は空の辞書になる）
empty = set()
print(type(empty))`,
      solution: `# アンケートの回答（重複あり）
answers = ["red", "blue", "red", "green", "blue", "red"]
print(len(answers))

# set()で集合に変換すると重複が消える
colors = set(answers)
print(len(colors))

# 集合は順序を持たないので、表示はsorted()で並べる
print(sorted(colors))

# 空の集合はset()で作る（{}は空の辞書になる）
empty = set()
print(type(empty))`,
      hints: [
        `リストを集合にするには「set(リスト)」と書きます。`,
        `colors = set(answers)に直すと、len(colors)が3になります。`
      ],
      expectedOutput: "['blue', 'green', 'red']"
    },
    {
      id: 48,
      title: "集合演算（和・積・差）",
      explanation: `<p>集合の真骨頂は、2つの集合を比べる「集合演算」です。数学の集合と同じ概念を、演算子1つで計算できます。</p>
<table>
<tr><th>演算</th><th>演算子</th><th>意味</th><th>例：{1,2,3}と{2,3,4}</th></tr>
<tr><td>和集合</td><td><code>|</code></td><td>どちらかに含まれる要素すべて</td><td><code>{1, 2, 3, 4}</code></td></tr>
<tr><td>積集合</td><td><code>&amp;</code></td><td>両方に含まれる要素だけ</td><td><code>{2, 3}</code></td></tr>
<tr><td>差集合</td><td><code>-</code></td><td>左だけに含まれる要素</td><td><code>{1}</code></td></tr>
<tr><td>対称差</td><td><code>^</code></td><td>どちらか片方だけに含まれる要素</td><td><code>{1, 4}</code></td></tr>
</table>
<pre><code>a = {1, 2, 3}
b = {2, 3, 4}
print(sorted(a | b))   # [1, 2, 3, 4]
print(sorted(a &amp; b))   # [2, 3]
print(sorted(a - b))   # [1]</code></pre>
<p>これが実務で効くのは「2つのグループの重なりを調べる」場面です。たとえば「Python講座とJavaScript講座の両方を受講している人（積集合）」「Python講座だけの人（差集合）」が、ループを1行も書かずに求められます。同じ処理をリストで書くと比較のコードが何行も必要になるうえ、要素数が多いと極端に遅くなります。</p>
<p>差集合は<code>a - b</code>と<code>b - a</code>で結果が変わる（引き算と同じで向きがある）点に注意してください。また、演算子の代わりに<code>a.union(b)</code>・<code>a.intersection(b)</code>・<code>a.difference(b)</code>というメソッド名でも書けます。読み手に意味を伝えたいときはメソッド名のほうが親切なこともあります。</p>`,
      task: `TODOの2行を書き換えて、積集合（両方の講座を受講している人）と差集合（Python講座だけの人）を求めてください。`,
      code: `python_users = {"ai", "yuki", "ken", "mio"}
js_users = {"ken", "mio", "sora"}

# 和集合：どちらかの講座を受講している人
print(sorted(python_users | js_users))

# TODO: 積集合（両方を受講している人）を&で求める
print(sorted(python_users | js_users))

# TODO: 差集合（Pythonだけを受講している人）を-で求める
print(sorted(python_users | js_users))`,
      solution: `python_users = {"ai", "yuki", "ken", "mio"}
js_users = {"ken", "mio", "sora"}

# 和集合：どちらかの講座を受講している人
print(sorted(python_users | js_users))

# 積集合：両方を受講している人
print(sorted(python_users & js_users))

# 差集合：Pythonだけを受講している人
print(sorted(python_users - js_users))`,
      hints: [
        `積集合は「a & b」、差集合は「a - b」で求めます。`,
        `2つ目のprintの|を&に、3つ目の|を-に変えるだけです。`,
        `積集合は['ken', 'mio']、差集合は['ai', 'yuki']になれば正解です。`
      ],
      expectedOutput: "['ken', 'mio']"
    },
    {
      id: 49,
      title: "辞書と集合の使い分け",
      explanation: `<p>辞書と集合はどちらも波かっこで書き、どちらも「重複しない要素（キー）」を高速に探せる仲間です。使い分けの軸はただひとつ、<strong>値との対応関係が必要かどうか</strong>です。</p>
<table>
<tr><th></th><th>辞書（dict）</th><th>集合（set）</th></tr>
<tr><td>持つもの</td><td>キーと値のペア</td><td>要素だけ</td></tr>
<tr><td>典型的な用途</td><td>名前から値を引く（対応表）</td><td>含まれるかどうかの判定・重複除去</td></tr>
<tr><td>例</td><td>商品名→価格、ID→ユーザー情報</td><td>訪問済みURL、使用済みクーポン</td></tr>
<tr><td>順序</td><td>挿入順を保持する</td><td>順序を持たない</td></tr>
</table>
<p>「国名から首都を知りたい」なら対応関係が必要なので辞書、「この都市は訪問済みか」を知りたいだけなら値は不要なので集合、という判断になります。値がすべてTrueの辞書を作ってしまうのは集合を知らない人の書き方で、集合を使えば意図がはっきり伝わります。</p>
<pre><code>capitals = {"日本": "東京", "フランス": "パリ"}  # 対応表→辞書
visited = {"東京", "大阪", "京都"}                # 存在チェック→集合
print("大阪" in visited)  # True</code></pre>
<p>両者の血縁関係を示す面白い例があります。辞書のキーは集合と同じく重複できないため、同じキーを2回書くと後の値だけが残ります。</p>
<pre><code>data = {"a": 1, "a": 2}
print(data)  # {'a': 2} 前の1は上書きされて消える</code></pre>
<p>なお、リストでのin判定は先頭から順に探すため要素数に比例して遅くなりますが、辞書・集合はハッシュという仕組みでほぼ一定時間で判定できます。存在チェックが大量に発生する処理では、リストから集合への置き換えが定番の高速化手法です。</p>`,
      task: `訪問済み都市は「あるかないか」だけ管理できれば十分です。TODOの行をリストから集合に書き換えてください。`,
      code: `# 対応関係（キー→値）を扱うなら辞書
capitals = {"日本": "東京", "フランス": "パリ"}
print(capitals["日本"])

# TODO: 「あるかないか」だけの管理なので、リストではなく集合に書き換える
visited = ["東京", "大阪", "京都", "東京", "大阪"]
print("大阪" in visited)
print("福岡" in visited)

# 辞書のキーは集合と同じく重複できない
data = {"a": 1, "a": 2}
print(data)`,
      solution: `# 対応関係（キー→値）を扱うなら辞書
capitals = {"日本": "東京", "フランス": "パリ"}
print(capitals["日本"])

# 「あるかないか」だけの管理なら集合（重複も自然に消える）
visited = {"東京", "大阪", "京都"}
print("大阪" in visited)
print("福岡" in visited)

# 辞書のキーは集合と同じく重複できない
data = {"a": 1, "a": 2}
print(data)`,
      hints: [
        `集合は波かっこで要素だけを並べます（コロンは書きません）。`,
        `visited = {"東京", "大阪", "京都"}のように書き換えます。重複していた要素は最初から入れる必要がありません。`
      ],
      expectedOutput: "{'a': 2}"
    },
    {
      id: 50,
      title: "総合演習（在庫管理辞書の操作）",
      explanation: `<p>第5章の総合演習です。果物店の在庫管理を題材に、この章で学んだ辞書操作を一通り組み合わせます。使う道具を振り返っておきましょう。</p>
<table>
<tr><th>操作</th><th>書き方</th><th>学んだステップ</th></tr>
<tr><td>追加・変更</td><td><code>d["キー"] = 値</code></td><td>ステップ43</td></tr>
<tr><td>削除</td><td><code>del d["キー"]</code></td><td>ステップ43</td></tr>
<tr><td>安全な取得</td><td><code>d.get("キー", 既定値)</code></td><td>ステップ42</td></tr>
<tr><td>値の一覧</td><td><code>d.values()</code></td><td>ステップ44</td></tr>
</table>
<p>今回の新しい組み合わせは「在庫を減らす」処理と「合計を求める」処理です。在庫の減算は、現在の値を読み取ってから引き算した結果を同じキーに代入します。</p>
<pre><code>stock = {"バナナ": 6}
stock["バナナ"] = stock["バナナ"] - 3  # 6を読み取り、3を引いて上書き
# stock["バナナ"] -= 3 と複合代入演算子でも書ける（第2章）</code></pre>
<p>合計は、values()で値の集まりを取り出し、第4章で学んだ<code>sum()</code>に渡します。</p>
<pre><code>total = sum(stock.values())</code></pre>
<p>このように「辞書から値の集まりを取り出し、組み込み関数で集計する」のは、ループを覚える前でもできる強力なパターンです。実務でも売上集計やリソース使用量の合算など、形を変えて何度も登場します。番号付きのTODOを上から順に埋めて、在庫の変動を追いかけてください。最後のprintの並びが期待どおりになれば合格です。</p>`,
      task: `TODO1〜3を実装してください。ぶどうを4個で追加し、バナナを3個減らし、みかんを<code>del</code>で削除します。最終出力の在庫合計が17個になれば成功です。`,
      code: `# 在庫管理：商品名→個数
stock = {"りんご": 10, "バナナ": 6, "みかん": 0}

# TODO 1: ぶどうを4個で追加する

# TODO 2: バナナを3個販売した（値を3減らす）

# TODO 3: 在庫が0のみかんをdelで削除する

# 存在しない商品はget()で安全に確認できる
print(f"メロンの在庫: {stock.get('メロン', 0)}個")

# 在庫の一覧と集計
print(stock)
print(f"商品数: {len(stock)}種類")
print(f"在庫合計: {sum(stock.values())}個")`,
      solution: `# 在庫管理：商品名→個数
stock = {"りんご": 10, "バナナ": 6, "みかん": 0}

# 1. 追加：新しいキーへの代入
stock["ぶどう"] = 4

# 2. 販売：現在の値から3を引いて上書き
stock["バナナ"] = stock["バナナ"] - 3

# 3. 取り扱い終了：delで削除
del stock["みかん"]

# 存在しない商品はget()で安全に確認できる
print(f"メロンの在庫: {stock.get('メロン', 0)}個")

# 在庫の一覧と集計
print(stock)
print(f"商品数: {len(stock)}種類")
print(f"在庫合計: {sum(stock.values())}個")`,
      hints: [
        `追加は stock["ぶどう"] = 4 のように書きます。`,
        `減算は stock["バナナ"] = stock["バナナ"] - 3、または stock["バナナ"] -= 3 です。`,
        `削除後の辞書は りんご10・バナナ3・ぶどう4 の3種類、合計17個になります。`
      ],
      expectedOutput: "在庫合計: 17個"
    }
  ]
});
