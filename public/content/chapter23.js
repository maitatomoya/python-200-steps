// 第23章：よくあるエラー：コレクション
registerChapter({
  number: 23,
  title: "よくあるエラー：コレクション",
  description: "リスト・辞書などコレクション操作で頻出するエラーと落とし穴を、実際のトレースバックを読みながら特定し修正する訓練をします。",
  steps: [
    {
      id: 221,
      title: "IndexError（範囲外アクセス）",
      explanation: `<p>この章では、コレクション（リストや辞書などデータの入れ物）の操作で頻出するエラーを扱います。エラーが出たら、まず「トレースバック（エラー発生までの経緯を示すPythonのエラー表示）」を読みます。初期コードを実行すると次のような表示が出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    print("最後の点数:", scores[3])
                         ~~~~~~^^^
IndexError: list index out of range</code></pre>
<p>トレースバックは<strong>最後の行から読む</strong>のが鉄則です。最終行の「IndexError: list index out of range」がエラーの種類と内容で、「リストの範囲外のインデックスを使った」という意味です。その上の「File "main.py", line 4」が発生場所、さらに<code>~~~</code>と<code>^^^</code>の印が「<code>scores[3]</code>という添字アクセスが原因」だと具体的な位置まで教えてくれます。</p>
<p>原因の典型は「数え方のずれ」です。要素が3個のリストで使えるインデックスは0・1・2の3つで、3は存在しません。</p>
<table>
<tr><th>書き方</th><th>結果</th></tr>
<tr><td><code>scores[2]</code></td><td>75（最後の要素）</td></tr>
<tr><td><code>scores[len(scores) - 1]</code></td><td>75（要素数から計算）</td></tr>
<tr><td><code>scores[-1]</code></td><td>75（末尾からのアクセス）</td></tr>
<tr><td><code>scores[3]</code></td><td>IndexError</td></tr>
</table>
<p>「最後の要素が欲しいときはlen - 1、または負のインデックス」と覚えておくと、このエラーの大半は防げます。</p>`,
      task: `トレースバックを読んで原因の行を特定し、最後の点数（75）が正しく表示されるように修正してください。`,
      code: `scores = [80, 92, 75]

# 最後の点数を表示したい
print("最後の点数:", scores[3])`,
      solution: `scores = [80, 92, 75]

# 最後の点数を表示したい（インデックスは0始まりなので最後はlen - 1）
print("最後の点数:", scores[len(scores) - 1])`,
      hints: [
        `トレースバックは最後の行から読みます。最終行がエラーの種類、その上が発生した行です`,
        `要素3個のリストで使えるインデックスは0・1・2です。最後の要素はscores[len(scores) - 1]またはscores[-1]で取れます`
      ],
      expectedOutput: "最後の点数: 75"
    },
    {
      id: 222,
      title: "IndexError（off-by-one：lenとrange）",
      explanation: `<p>今度は同じIndexErrorでも、ループの中で起きるパターンです。実行するとまず0〜2行目までは正常に表示され、<strong>途中から</strong>エラーになります。</p>
<pre><code>0 りんご
1 みかん
2 ぶどう
Traceback (most recent call last):
  File "main.py", line 5, in &lt;module&gt;
    print(i, fruits[i])
             ~~~~~~^^^
IndexError: list index out of range</code></pre>
<p>「途中まで動いてから落ちる」のはループ内エラーの特徴です。こういうときは「エラーになった瞬間の変数の値」を考えます。<code>range(len(fruits) + 1)</code>はrange(4)なので、iは0・1・2・3と進みます。要素3個のリストにインデックス3は存在しないため、4周目で落ちるわけです。</p>
<p>このような「境界が1つずれるバグ」を<strong>off-by-oneエラー</strong>と呼びます。プログラミング全体で最も多いバグのひとつです。<code>range(n)</code>は「0からn-1まで」を生成するので、リスト全体を回るなら<code>range(len(fruits))</code>で過不足ありません。</p>
<table>
<tr><th>書き方</th><th>iの値</th><th>結果</th></tr>
<tr><td><code>range(len(fruits))</code></td><td>0, 1, 2</td><td>正常</td></tr>
<tr><td><code>range(len(fruits) + 1)</code></td><td>0, 1, 2, 3</td><td>最後でIndexError</td></tr>
</table>
<p>なお、番号付きでループするならインデックス計算そのものを避けられる<code>for i, fruit in enumerate(fruits):</code>がより安全でPythonらしい書き方です。</p>`,
      task: `途中まで表示されてからエラーになる原因を特定し、3つの果物がすべて番号付きで表示されるように修正してください。`,
      code: `fruits = ["りんご", "みかん", "ぶどう"]

# 全部の果物を番号付きで表示したい
for i in range(len(fruits) + 1):
    print(i, fruits[i])`,
      solution: `fruits = ["りんご", "みかん", "ぶどう"]

# range(len(fruits))で0からlen-1までを過不足なく回す
for i in range(len(fruits)):
    print(i, fruits[i])`,
      hints: [
        `途中まで正常に動いているので、ループの最後の周回でiがいくつになるかを考えましょう`,
        `range(len(fruits))は0〜2を生成します。+ 1を付けると存在しないインデックス3まで進んでしまいます`
      ],
      expectedOutput: "2 ぶどう"
    },
    {
      id: 223,
      title: "KeyError（存在しないキー。get・inでの防御）",
      explanation: `<p>辞書に存在しないキーを角括弧で参照すると<strong>KeyError</strong>になります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 3, in &lt;module&gt;
    print("orange:", prices["orange"])
                     ~~~~~~^^^^^^^^^^
KeyError: 'orange'</code></pre>
<p>KeyErrorの最終行には<strong>見つからなかったキーそのもの</strong>が表示されるので、原因特定は比較的簡単です。よくある原因は次の3パターンです。</p>
<ul>
<li>そのキーがまだ登録されていない（今回のケース）</li>
<li>キーのつづりの打ち間違い（"apple"を"aple"と書くなど）</li>
<li>型の不一致（キーが数値の1なのに文字列の"1"で引くなど）</li>
</ul>
<p>「存在しないかもしれないキー」を扱うときの防御方法は2つ覚えておきましょう。</p>
<table>
<tr><th>方法</th><th>書き方</th><th>向いている場面</th></tr>
<tr><td>getで既定値</td><td><code>prices.get("orange", "未登録")</code></td><td>無いときの代わりの値を決めたいとき</td></tr>
<tr><td>inで事前確認</td><td><code>if "orange" in prices:</code></td><td>有無によって処理を分けたいとき</td></tr>
</table>
<p><code>get</code>はキーが無くてもエラーにならず、第2引数の既定値（省略時はNone）を返します。一方、キーが必ず存在するはずの場面では、あえて角括弧を使ってKeyErrorで早く気づけるようにする、という使い分けも実務では大切です。</p>`,
      task: `KeyErrorの原因を確認し、orangeが未登録でもエラーにならないようgetとinを使って修正してください。orangeは「未登録」と表示します。`,
      code: `prices = {"apple": 120, "banana": 80}

print("orange:", prices["orange"])
print("banana:", prices["banana"])`,
      solution: `prices = {"apple": 120, "banana": 80}

# 方法1：getで既定値を指定する（キーが無ければ"未登録"が返る）
print("orange:", prices.get("orange", "未登録"))

# 方法2：inで事前に有無を確認する
if "banana" in prices:
    print("banana:", prices["banana"])`,
      hints: [
        `KeyErrorの最終行には見つからなかったキーが表示されます。pricesにそのキーはありますか`,
        `prices.get("orange", "未登録")は、キーが無いときに第2引数の値を返します`
      ],
      expectedOutput: "orange: 未登録"
    },
    {
      id: 224,
      title: "RuntimeError（ループ中に辞書のサイズを変更）",
      explanation: `<p>辞書をforでループしている最中に、その辞書へ要素の追加や削除をすると<strong>RuntimeError</strong>になります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    for name in stock:
                ^^^^^
RuntimeError: dictionary changed size during iteration</code></pre>
<p>メッセージは「イテレーション（反復処理）の最中に辞書のサイズが変わった」という意味です。forループは辞書を先頭から順にたどる「しおり」のような仕組みで動いていますが、途中で要素を消すとしおりの位置が信用できなくなるため、Pythonは安全のために即座にエラーで止めます。値の変更（<code>stock[name] = 0</code>など）は許されますが、キーの追加・削除はエラーになります。</p>
<p>修正の定番は2つです。</p>
<table>
<tr><th>方法</th><th>書き方</th></tr>
<tr><td>キー一覧を先に固定する</td><td><code>for name in list(stock):</code></td></tr>
<tr><td>条件を満たすものだけで作り直す</td><td><code>stock = {k: v for k, v in stock.items() if v != 0}</code></td></tr>
</table>
<p><code>list(stock)</code>はループ開始時点のキーを別のリストに写し取るので、ループ対象は変化せず、元の辞書を安全に削除できます。辞書内包表記による作り直しは「削除する」のではなく「残すものを選ぶ」発想で、意図が読み取りやすいため実務ではこちらが好まれることも多いです。なお、リストでも同様にループ中のremoveは要素の取りこぼしを起こすので、同じ考え方で防ぎます。</p>`,
      task: `トレースバックを読んで原因を特定し、在庫が0の商品を安全に取り除けるように修正してください。`,
      code: `stock = {"apple": 3, "banana": 0, "grape": 5}

# 在庫が0の商品を取り除きたい
for name in stock:
    if stock[name] == 0:
        del stock[name]

print(stock)`,
      solution: `stock = {"apple": 3, "banana": 0, "grape": 5}

# キーの一覧をlist()で先に固定してからループする
for name in list(stock):
    if stock[name] == 0:
        del stock[name]

print(stock)`,
      hints: [
        `ループでたどっている最中の辞書からdelで要素を消していることが原因です`,
        `for name in list(stock): のようにキー一覧を先にリストへ写せば、元の辞書を安全に変更できます`
      ],
      expectedOutput: "{'apple': 3, 'grape': 5}"
    },
    {
      id: 225,
      title: "AttributeError（listにaddはない。メソッド名の取り違え）",
      explanation: `<p><strong>AttributeError</strong>は「そのオブジェクトに、指定した名前の属性やメソッドが存在しない」ときのエラーです。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    numbers.add(3)
    ^^^^^^^^^^^
AttributeError: 'list' object has no attribute 'add'</code></pre>
<p>最終行は「'list'オブジェクトに'add'という属性は無い」と読みます。<strong>'list' object</strong>の部分が重要で、「操作しようとした値の実際の型」を教えてくれています。要素を追加するメソッドは型ごとに名前が違うため、取り違えが頻発します。</p>
<table>
<tr><th>型</th><th>追加のメソッド</th><th>例</th></tr>
<tr><td>リスト</td><td>append（末尾に1個）</td><td><code>numbers.append(3)</code></td></tr>
<tr><td>セット</td><td>add</td><td><code>tags.add("python")</code></td></tr>
<tr><td>辞書</td><td>キーへの代入</td><td><code>prices["orange"] = 100</code></td></tr>
</table>
<p>つまり<code>numbers.add(3)</code>は「セットの流儀をリストに使ってしまった」わけです。このエラーが出たら、(1)最終行で実際の型を確認する、(2)その型が持つ正しいメソッド名を思い出す、の順で対処します。なお、打ち間違いが正しい名前に近い場合（appendをapendと書いた場合など）、最近のPythonは「Did you mean: 'append'?」という修正候補まで表示してくれます。迷ったら<code>dir(numbers)</code>でそのオブジェクトが持つメソッドの一覧を確認するのも有効です。</p>`,
      task: `エラーメッセージから「listにaddが無い」ことを確認し、リストに3を追加する正しいメソッドに修正してください。`,
      code: `numbers = [1, 2]

# 3を追加したい
numbers.add(3)
print(numbers)`,
      solution: `numbers = [1, 2]

# リストの末尾に追加するメソッドはappend（addはセット用）
numbers.append(3)
print(numbers)`,
      hints: [
        `最終行の'list' object has no attribute 'add'は「リストにaddというメソッドは無い」という意味です`,
        `addはセットのメソッドです。リストの末尾に1個追加するメソッド名を思い出しましょう`
      ],
      expectedOutput: "[1, 2, 3]"
    },
    {
      id: 226,
      title: "浅いコピーの罠（b = aとcopy・deepcopy）",
      explanation: `<p>今回のコードは、コピーしたつもりのリストに追加したら<strong>元のリストまで変わってしまう</strong>という罠です。検査用のassert文（条件がFalseだとAssertionErrorを出して止める文）が異変を検出します。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 8, in &lt;module&gt;
    assert original == ["東京", "大阪"], "originalまで変わっている: " + str(original)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: originalまで変わっている: ['東京', '大阪', '福岡']</code></pre>
<p>原因は<code>copied = original</code>です。この代入はリストの中身を複製せず、<strong>同じリストを指す名前（参照）をもう1つ作るだけ</strong>です。付箋にたとえると、1つの箱に「original」と「copied」という2枚の付箋を貼った状態で、どちらの名前から操作しても同じ箱の中身が変わります。</p>
<table>
<tr><th>書き方</th><th>意味</th></tr>
<tr><td><code>b = a</code></td><td>複製しない。同じリストに別名を付けるだけ</td></tr>
<tr><td><code>b = a.copy()</code></td><td>浅いコピー。リスト本体を複製する</td></tr>
<tr><td><code>b = copy.deepcopy(a)</code></td><td>深いコピー。入れ子の内側まですべて複製する</td></tr>
</table>
<p><code>a.copy()</code>（<code>list(a)</code>や<code>a[:]</code>も同じ効果）で独立したリストになります。ただし浅いコピーは「一番外側だけ」の複製なので、リストの中にリストが入っている場合、内側は共有されたままです。その場合は標準ライブラリの<code>copy.deepcopy</code>を使います。「代入はコピーではない」はPythonの最重要原則のひとつです。</p>`,
      task: `copiedへの追加がoriginalに影響しないように、リストを正しく複製してからassertが通ることを確認してください。`,
      code: `original = ["東京", "大阪"]
copied = original

# コピーしたつもりで追加
copied.append("福岡")

# コピー元は変わっていないはず…？
assert original == ["東京", "大阪"], "originalまで変わっている: " + str(original)
print("original:", original)
print("copied:", copied)`,
      solution: `original = ["東京", "大阪"]
# copy()でリスト本体を複製する（b = aは同じリストへの別名を作るだけ）
copied = original.copy()

copied.append("福岡")

assert original == ["東京", "大阪"], "originalまで変わっている: " + str(original)
print("original:", original)
print("copied:", copied)`,
      hints: [
        `copied = originalは複製ではなく、同じリストにもう1つ名前を付けているだけです`,
        `original.copy()やlist(original)で独立した複製が作れます`
      ],
      expectedOutput: "copied: ['東京', '大阪', '福岡']"
    },
    {
      id: 227,
      title: "リストの掛け算の罠（[[0]*3]*3で行が連動）",
      explanation: `<p>前ステップの「参照の共有」が、より気づきにくい形で現れるのが二次元リスト（リストの中にリストがある構造）です。<code>[[0] * 3] * 3</code>で3×3の盤面を作り、左上の1マスだけ変えたつもりが、実行すると次のようになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 7, in &lt;module&gt;
    assert grid[1][0] == 0, "2行目まで変わっている: " + str(grid)
           ^^^^^^^^^^^^^^^
AssertionError: 2行目まで変わっている: [[1, 0, 0], [1, 0, 0], [1, 0, 0]]</code></pre>
<p>すべての行の先頭が1になっています。<code>[0] * 3</code>は問題ありません（数値は複製されても困らない値です）。罠は外側の<code>* 3</code>で、これは<strong>同じ内側リストへの参照を3つ並べる</strong>だけです。つまり3つの「行」の正体は全部同じ1つのリストなので、1行目を書き換えると全行が連動して変わります。</p>
<table>
<tr><th>書き方</th><th>行の実体</th><th>結果</th></tr>
<tr><td><code>[[0] * 3] * 3</code></td><td>同じリスト×3</td><td>1行変えると全行変わる</td></tr>
<tr><td><code>[[0] * 3 for _ in range(3)]</code></td><td>独立したリスト×3</td><td>行ごとに独立して変えられる</td></tr>
</table>
<p>修正はリスト内包表記で<strong>行を毎回新しく作る</strong>ことです。<code>for _ in range(3)</code>の繰り返しのたびに<code>[0] * 3</code>が評価されるため、独立した行が3つできます。「ミュータブル（変更可能）なものを*で増やしてはいけない」と覚えておきましょう。</p>`,
      task: `全行が連動してしまう原因を理解し、行ごとに独立した3×3の盤面を作るように修正してください。`,
      code: `# 3x3の盤面を作りたい
grid = [[0] * 3] * 3

# 左上のマスだけ1にしたい
grid[0][0] = 1

assert grid[1][0] == 0, "2行目まで変わっている: " + str(grid)
print(grid)`,
      solution: `# 3x3の盤面を作りたい（内包表記で行を毎回新しく作る）
grid = [[0] * 3 for _ in range(3)]

# 左上のマスだけ1にしたい
grid[0][0] = 1

assert grid[1][0] == 0, "2行目まで変わっている: " + str(grid)
print(grid)`,
      hints: [
        `外側の* 3は同じ行リストへの参照を3つ並べるだけで、行は複製されません`,
        `[[0] * 3 for _ in range(3)]なら、繰り返しのたびに新しい行が作られます`
      ],
      expectedOutput: "[[1, 0, 0], [0, 0, 0], [0, 0, 0]]"
    },
    {
      id: 228,
      title: "ValueError（too many values to unpack）",
      explanation: `<p>複数の変数へ一度に代入する「アンパック」で、変数の数と要素の数が合わないと<strong>ValueError</strong>になります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    name, age = data
    ^^^^^^^^^
ValueError: too many values to unpack (expected 2, got 3)</code></pre>
<p>メッセージは「アンパックするには値が多すぎる（2個を期待したが3個あった）」という意味で、期待した数と実際の数の両方を教えてくれる親切なエラーです。逆に要素が足りない場合は「not enough values to unpack (expected 3, got 2)」になります。</p>
<p>対処は状況に応じて3通りあります。</p>
<table>
<tr><th>方法</th><th>書き方</th><th>使いどころ</th></tr>
<tr><td>変数の数を合わせる</td><td><code>name, age, city = data</code></td><td>全要素を使うとき</td></tr>
<tr><td>*で余りをまとめる</td><td><code>name, *rest = data</code></td><td>先頭だけ欲しいとき（restはリスト）</td></tr>
<tr><td>要らない要素は_で受ける</td><td><code>name, _, city = data</code></td><td>一部を捨てると明示したいとき</td></tr>
</table>
<p>このエラーは、関数が返すタプルの要素数を勘違いしたときや、CSVのような区切りデータをsplitした結果の列数が想定とずれたときに実務でよく遭遇します。「expectedとgotの数を見比べて、データ側と受け取り側のどちらが想定とずれているか確認する」のが定石です。</p>`,
      task: `エラーメッセージのexpectedとgotの数を確認し、3つの要素をすべて受け取るように修正してください。`,
      code: `data = ["田中", 28, "東京"]

# 名前と年齢を取り出したい
name, age = data
print(name, age)`,
      solution: `data = ["田中", 28, "東京"]

# 変数の数を要素の数に合わせる（余りを*restで受ける方法もある）
name, age, city = data
print(name, age, city)`,
      hints: [
        `(expected 2, got 3)は「受け取る変数が2個なのに、値が3個あった」という意味です`,
        `name, age, city = dataのように変数を3つにするか、name, age, *rest = dataで余りをまとめて受け取れます`
      ],
      expectedOutput: "田中 28 東京"
    },
    {
      id: 229,
      title: "スライスは範囲外でもエラーにならない（挙動の観察と正しい使い分け）",
      explanation: `<p>ここまでIndexErrorを見てきましたが、実は<strong>スライス（word[10:20]のような範囲の切り出し）は範囲外を指定してもエラーになりません</strong>。初期コードを実行すると、この対比が観察できます。</p>
<pre><code>pyt

Traceback (most recent call last):
  File "main.py", line 8, in &lt;module&gt;
    print(word[10])
          ~~~~^^^^
IndexError: string index out of range</code></pre>
<p>2行目に注目してください。<code>word[10:20]</code>は範囲外なのにエラーにならず、<strong>空文字列</strong>が表示されています（空なので何も見えません）。一方、1文字を取り出す<code>word[10]</code>は即座にIndexErrorです。</p>
<table>
<tr><th>書き方</th><th>範囲外のときの挙動</th></tr>
<tr><td><code>word[10]</code>（インデックス）</td><td>IndexErrorで停止する</td></tr>
<tr><td><code>word[10:20]</code>（スライス）</td><td>空文字列・空リストを返す（エラーなし）</td></tr>
<tr><td><code>word[2:100]</code>（終端だけ範囲外）</td><td>あるところまで切り出す（"thon"）</td></tr>
</table>
<p>スライスは「あるぶんだけ切り出す」という寛容な仕様のため、先頭n文字の取り出し（<code>word[:3]</code>）などは長さを気にせず安全に書けます。これは便利ですが、裏を返すと<strong>範囲の指定ミスに気づけず、空のままプログラムが進んでしまう</strong>危険もあります。エラーで早く気づきたい場面ではインデックスを、長さが不定でも動いてほしい場面ではスライスを、と使い分けましょう。インデックスを使うときは、lenで範囲内かを確認してからアクセスするのが定石です。</p>`,
      task: `スライスとインデックスの挙動の違いを観察し、範囲外のインデックスアクセスはlenで確認してから行うように修正してください。範囲外のときは「インデックス10は範囲外」と表示します。`,
      code: `word = "python"

# スライスは範囲外でもエラーにならない
print(word[0:3])
print(word[10:20])

# ところが1文字のインデックスアクセスは…
print(word[10])`,
      solution: `word = "python"

print(word[0:3])
# スライスは範囲外なら空文字列を返す（角括弧で囲んで見えるようにする）
print("[" + word[10:20] + "]")

# インデックスアクセスは範囲内かを確認してから使う
if len(word) > 10:
    print(word[10])
else:
    print("インデックス10は範囲外")`,
      hints: [
        `エラーになったのはインデックスアクセスの行だけです。スライスの行は空文字列を返して通過しています`,
        `if len(word) > 10: のように長さを確認してから添字アクセスすれば、IndexErrorを防げます`
      ],
      expectedOutput: "インデックス10は範囲外"
    },
    {
      id: 230,
      title: "総合：コレクション操作のバグ修正",
      explanation: `<p>この章の総合演習です。初期コードにはこの章で学んだバグが3つ仕込まれています。実際のデバッグと同じように、次のサイクルで1つずつ直していきましょう。</p>
<ol>
<li>実行してトレースバックの<strong>最終行</strong>でエラーの種類を確認する</li>
<li>その上の行番号で場所を特定し、修正する</li>
<li>再実行して次のエラーに進む（エラーは一度に1つしか表示されません）</li>
</ol>
<p>最初の実行では、辞書をループしながらdelしていることによるRuntimeErrorが出るはずです。それを直すと次のエラーが現れ、また直すと次が…と続きます。3つのバグはいずれも既出のパターンです。</p>
<table>
<tr><th>エラー・症状</th><th>この章で学んだ対処</th></tr>
<tr><td>RuntimeError: dictionary changed size during iteration</td><td>キー一覧をlist()で固定してからループする</td></tr>
<tr><td>KeyError</td><td>getで既定値を指定するか、inで確認する</td></tr>
<tr><td>IndexError: list index out of range</td><td>最後の要素はlen - 1（または-1）で参照する</td></tr>
</table>
<p>実務のデバッグも、この「最終行を読む→場所を特定→修正→再実行」の繰り返しです。エラーメッセージを恐れず、むしろ「原因の場所と種類を教えてくれる案内」として活用できるようになれば、この章の目標は達成です。すべて修正できると、在庫レポートが最後まで表示されます。</p>`,
      task: `3つのバグを1つずつ修正してください。修正のたびに実行し、トレースバックがどう変わるかを観察しましょう。最終的に「melonの在庫: 0」と「最後の商品: grape」が表示されれば完成です。`,
      code: `# 在庫レポート（バグが3つある。1つ直すごとに実行して次のエラーを確認する）
stock = {"apple": 3, "banana": 0, "grape": 5}

# 在庫0の商品を取り除く
for name in stock:
    if stock[name] == 0:
        del stock[name]

# melonの在庫を表示する（未登録なら0）
print("melonの在庫:", stock["melon"])

# 名前順で最後の商品を表示する
names = sorted(stock)
print("最後の商品:", names[len(names)])`,
      solution: `# 在庫レポート（修正済み）
stock = {"apple": 3, "banana": 0, "grape": 5}

# 在庫0の商品を取り除く（キー一覧をlist()で固定してからループ）
for name in list(stock):
    if stock[name] == 0:
        del stock[name]

# melonの在庫を表示する（未登録なら0）
print("melonの在庫:", stock.get("melon", 0))

# 名前順で最後の商品を表示する（最後のインデックスはlen - 1）
names = sorted(stock)
print("最後の商品:", names[len(names) - 1])`,
      hints: [
        `まずはループ中の辞書削除によるRuntimeErrorです。list(stock)でキーを固定しましょう`,
        `次はmelonのKeyErrorです。未登録なら0にしたいのでstock.get("melon", 0)が使えます`,
        `最後はIndexErrorです。リストの最後の要素はnames[len(names) - 1]で参照します`
      ],
      expectedOutput: "最後の商品: grape"
    }
  ]
});
