// 第22章：よくあるエラー：型と値
registerChapter({
  number: 22,
  title: "よくあるエラー：型と値",
  description: "TypeError・ValueError・ZeroDivisionErrorなど、値の型や中身が原因で実行中に起きるエラーを、実際のトレースバックを読みながら修正していきます。",
  steps: [
    {
      id: 211,
      title: "TypeError（strとintの連結）",
      explanation: `<p>前章の構文エラーは実行前に見つかりましたが、この章で扱うTypeError・ValueErrorなどは<strong>実行中に</strong>起きるエラーです。プログラムは途中まで動き、問題の行に到達した瞬間に止まります。まずは遭遇率トップクラスの「文字列と数値の連結」から。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    print("年齢は" + age + "歳です")
          ~~~~~~~~~^~~~~
TypeError: can only concatenate str (not "int") to str</code></pre>
<p>メッセージは「strに連結できるのはstrだけで、intは連結できない」という意味です。<code>~~~</code>と<code>^</code>の記号にも注目してください。<code>^</code>が問題の演算子<code>+</code>を、<code>~~~</code>がその左右の値を指しており、「この足し算の組み合わせが悪い」とピンポイントで教えてくれています。TypeError（型エラー）は、<strong>演算や関数に対して型の合わない値を渡した</strong>ときに起きる例外です。</p>
<p>修正には2つの方向があります。</p>
<table>
<tr><th>やりたいこと</th><th>修正</th><th>例</th></tr>
<tr><td>文字として繋げたい</td><td>str()で文字列化するかf-string</td><td><code>f"年齢は{age}歳です"</code></td></tr>
<tr><td>数値として計算したい</td><td>int()やfloat()で数値化</td><td><code>int("28") + 1</code></td></tr>
</table>
<p>実務では<strong>f-stringに書き換えるのが定番</strong>です。f-stringは埋め込んだ値を自動で文字列に変換してくれるため、このエラー自体が起きなくなります。<code>+</code>連結で数値を扱うときだけstr()が必要、と整理しておきましょう。</p>`,
      task: `トレースバックを確認し、f-stringを使って「年齢は28歳です」と表示されるように修正してください。`,
      code: `age = 28
print("年齢は" + age + "歳です")`,
      solution: `age = 28
print(f"年齢は{age}歳です")`,
      hints: [
        `文字列と数値は+で直接連結できません。文字列として埋め込む方法を考えましょう。`,
        `print(f"年齢は{age}歳です") のようにf-stringを使うと、値が自動で文字列化されます。`
      ],
      expectedOutput: "年齢は28歳です"
    },
    {
      id: 212,
      title: "TypeError（'int' object is not iterable）",
      explanation: `<p>for文の<code>in</code>の右側には、イテラブル（要素を順に取り出せるオブジェクト。リスト・文字列・rangeなど）を置く必要があります。そこに整数を置くと、このエラーになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    for i in count:
             ^^^^^
TypeError: 'int' object is not iterable</code></pre>
<p>「'int' object is not iterable」は「int型のオブジェクトは反復（イテレート）できない」という意味です。「5回繰り返したい」という頭の中のイメージのまま<code>for i in 5:</code>相当のコードを書いてしまうのが典型パターンで、<strong>回数の繰り返しには<code>range()</code></strong>を使うのが正解です。</p>
<pre><code>count = 5
for i in range(count):    # 0, 1, 2, 3, 4 を順に生成する
    print("処理", i + 1)</code></pre>
<p>for文に置けるもの・置けないものを整理します。</p>
<table>
<tr><th>inの右側に置くもの</th><th>可否</th><th>備考</th></tr>
<tr><td>リスト・タプル・文字列・辞書</td><td>可</td><td>要素を順に取り出す</td></tr>
<tr><td>range(n)</td><td>可</td><td>0からn-1の整数列</td></tr>
<tr><td>整数・浮動小数点数</td><td>不可</td><td>今回のエラーになる</td></tr>
</table>
<p>同じメッセージは<code>list(5)</code>や<code>sum(5)</code>など、イテラブルを期待する関数に数値を渡したときにも出ます。「not iterableと言われたら、リストやrangeを渡すべき場所に単独の数値を渡していないか」を確認する、が調査の型です。</p>`,
      task: `range()を使って5回の繰り返しに修正し、「処理 1」から「処理 5」まで表示されるようにしてください。`,
      code: `count = 5
for i in count:
    print("処理", i + 1)`,
      solution: `count = 5
for i in range(count):
    print("処理", i + 1)`,
      hints: [
        `整数そのものはfor文で回せません。回数の繰り返しに使う関数は何だったでしょうか。`,
        `for i in range(count): に書き換えると、iには0〜4が順に入ります。`
      ],
      expectedOutput: "処理 5"
    },
    {
      id: 213,
      title: "ValueError（int(\"abc\")）",
      explanation: `<p>ValueError（値エラー）は、<strong>型は合っているのに値の中身が不正</strong>なときに起きる例外です。int()は文字列を受け取れる（型はOK）けれど、"abc"は整数として解釈できない（値がNG）、という状況です。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    total += int(s)
             ~~~^^^
ValueError: invalid literal for int() with base 10: 'abc'</code></pre>
<p>「invalid literal for int() with base 10: 'abc'」は「10進数のint()にとって'abc'は不正な表記」という意味です。<strong>末尾に問題の値そのものが表示される</strong>のがこのエラーの親切なところで、データのどの要素でつまずいたかが一目で分かります。TypeErrorとの違いを整理しましょう。</p>
<table>
<tr><th>例外</th><th>原因</th><th>例</th></tr>
<tr><td>TypeError</td><td>型そのものが不適合</td><td><code>int([1, 2])</code>（リストは変換対象外）</td></tr>
<tr><td>ValueError</td><td>型は適合、値の中身が不正</td><td><code>int("abc")</code>（文字列だが数字でない）</td></tr>
</table>
<p>外部から来たデータ（CSVの1列、ユーザーの入力など）には、こうした「数値のはずが数値でない」値が混ざるのが現実です。防御の定番は2つあります。ひとつは変換前に<code>s.isdigit()</code>（文字列が数字だけかを判定するメソッド）で確認するLBYL方式、もうひとつは<code>try-except ValueError</code>で受け止めるEAFP方式です。今回は数え上げの途中なのでisdigit()でスキップする方針で修正します。</p>`,
      task: `リストには数値に変換できない文字列が混ざっています。isdigit()で判定して変換できる要素だけを合計し、「合計: 430」と表示してください。`,
      code: `data = ["100", "250", "abc", "80"]
total = 0
for s in data:
    total += int(s)
print("合計:", total)`,
      solution: `data = ["100", "250", "abc", "80"]
total = 0
for s in data:
    if s.isdigit():
        total += int(s)
print("合計:", total)`,
      hints: [
        `エラーメッセージの末尾に、変換に失敗した値'abc'が表示されています。`,
        `int(s)の前に if s.isdigit(): を入れて、数字だけの文字列のときだけ加算します。`
      ],
      expectedOutput: "合計: 430"
    },
    {
      id: 214,
      title: "ZeroDivisionError",
      explanation: `<p>0で割る計算は数学的に定義できないため、Pythonは即座にZeroDivisionErrorを送出します。単純なようで、実務では意外な経路で発生する厄介なエラーです。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    average = sum(scores) / len(scores)
              ~~~~~~~~~~~~^~~~~~~~~~~~~
ZeroDivisionError: division by zero</code></pre>
<p>ポイントは、コードのどこにも「0」と書いていないのにこのエラーが起きることです。<code>scores</code>が空リストのとき<code>len(scores)</code>が0になり、平均の計算が0除算になります。つまり実体は「割る数がたまたま0になるデータが来た」というデータ起因のバグで、<strong>平均・割合・単価などの割り算は、分母が0になるケースを必ず持っている</strong>と考えるべきです。</p>
<p>典型的な発生パターンと防御をまとめます。</p>
<table>
<tr><th>場面</th><th>分母が0になる条件</th></tr>
<tr><td>平均値の計算</td><td>データが0件</td></tr>
<tr><td>達成率・割合の計算</td><td>目標値や母数が0</td></tr>
<tr><td>1件あたりの計算</td><td>件数が0</td></tr>
</table>
<p>防御は割る前に<code>if len(scores) == 0:</code>（または<code>if not scores:</code>）で空かどうかを確認し、「データなし」として別扱いするのが基本です。なお整数除算<code>//</code>や剰余<code>%</code>でも同じエラーが起き、メッセージは「integer division or modulo by zero」に変わります。どちらも対処は同じで、<strong>分母を作る値の出どころを疑う</strong>ことが第一歩です。</p>`,
      task: `scoresが空リストでもエラーにならないように、割り算の前に件数チェックを追加し、空のときは「平均点: データなし」と表示してください。`,
      code: `scores = []
average = sum(scores) / len(scores)
print("平均点:", average)`,
      solution: `scores = []
if len(scores) == 0:
    print("平均点: データなし")
else:
    average = sum(scores) / len(scores)
    print("平均点:", average)`,
      hints: [
        `コードに0は書かれていませんが、len(scores)の値を確認してみましょう。`,
        `if len(scores) == 0: で空リストを先に判定し、割り算はelse側で行います。`
      ],
      expectedOutput: "平均点: データなし"
    },
    {
      id: 215,
      title: "TypeError（引数の個数不一致）",
      explanation: `<p>関数を定義したときの引数の個数と、呼び出すときに渡す個数が食い違うと、TypeErrorになります。メッセージに個数の内訳がはっきり書かれるのが特徴です。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    greet("田中", "佐藤")
    ~~~~~^^^^^^^^^^^^^^^^
TypeError: greet() takes 1 positional argument but 2 were given</code></pre>
<p>「takes 1 positional argument but 2 were given」は「位置引数を1個しか受け取らないのに2個渡された」という意味です。逆に渡す数が足りないときは、次のように<strong>足りない引数の名前まで</strong>教えてくれます。</p>
<pre><code>TypeError: greet() missing 1 required positional argument: 'name'</code></pre>
<p>このエラーが出たら、確認する場所は2か所です。</p>
<ol>
<li><strong>def行</strong>：関数がいくつの引数を受け取る設計か</li>
<li><strong>呼び出し行</strong>：実際にいくつ渡しているか</li>
</ol>
<p>どちらを直すべきかは意図によります。「2人に挨拶したい」なら、呼び出しを2回に分けるのが今回の正解です。関数側を2引数に変える、可変長引数<code>*names</code>で何人でも受け取れるようにする、という設計変更もあり得ますが、<strong>まず関数の設計（def行）を正として呼び出し側を合わせる</strong>のが、他人のコードを直すときの安全な基本方針です。なお、クラスのメソッド呼び出しで個数がずれた場合は、自動で渡されるselfが数に含まれるためメッセージの個数が1つ多く見えることも覚えておくと、将来の混乱を防げます。</p>`,
      task: `greet()は引数を1つしか受け取りません。呼び出しを2回に分けて、田中さんと佐藤さんの両方に挨拶が表示されるように修正してください。`,
      code: `def greet(name):
    print(f"こんにちは、{name}さん")

greet("田中", "佐藤")`,
      solution: `def greet(name):
    print(f"こんにちは、{name}さん")

greet("田中")
greet("佐藤")`,
      hints: [
        `def greet(name): は引数1個の設計です。呼び出しで2個渡しているのが原因です。`,
        `greet("田中")とgreet("佐藤")のように、1人ずつ2回呼び出します。`
      ],
      expectedOutput: "こんにちは、佐藤さん"
    },
    {
      id: 216,
      title: "浮動小数点の比較ミス（==がFalse。math.isclose）",
      explanation: `<p>今回のエラーは、raise文が送出したValueErrorです。しかし本当のバグはその1行上、<strong>浮動小数点数を<code>==</code>で比較している</strong>ことにあります。</p>
<pre><code>小計: 0.30000000000000004
Traceback (most recent call last):
  File "main.py", line 4, in &lt;module&gt;
    raise ValueError("小計が0.3と一致しません")
ValueError: 小計が0.3と一致しません</code></pre>
<p>エラーの前に出力された「小計: 0.30000000000000004」が決定的な手がかりです。コンピュータは小数を2進数で近似して保持するため、0.1や0.2は内部ではごくわずかにずれた値になっています。その結果<code>0.1 + 0.2 == 0.3</code>はFalseです。これはPythonのバグではなく、浮動小数点数を使うあらゆる言語に共通する仕様です。</p>
<p>対処の定番は2つあります。</p>
<table>
<tr><th>目的</th><th>方法</th><th>例</th></tr>
<tr><td>値の比較</td><td>math.isclose()（十分近いかを判定）</td><td><code>math.isclose(subtotal, 0.3)</code></td></tr>
<tr><td>表示の整形</td><td>round()やf-stringの書式指定</td><td><code>round(subtotal, 2)</code></td></tr>
</table>
<p>覚えるべき習慣は「<strong>floatに<code>==</code>を使わない</strong>」。比較はmath.isclose()、表示はround()で丸める、と役割を分けます。なお金額計算のように誤差が一切許されない場面では、標準ライブラリのdecimalモジュール（10進数を正確に扱う仕組み）を使う選択肢もあります。トレースバックだけでなく、<strong>エラー直前の出力もヒントとして読む</strong>ことを、このステップで体に入れましょう。</p>`,
      task: `mathモジュールをインポートし、==の代わりにmath.isclose()で比較するように修正してください。表示のずれはround(subtotal, 2)で整えてください。`,
      code: `subtotal = 0.1 + 0.2
print("小計:", subtotal)
if subtotal != 0.3:
    raise ValueError("小計が0.3と一致しません")
print("チェックOK")`,
      solution: `import math

subtotal = 0.1 + 0.2
print("小計:", round(subtotal, 2))
if not math.isclose(subtotal, 0.3):
    raise ValueError("小計が0.3と一致しません")
print("チェックOK")`,
      hints: [
        `エラー直前の出力を見ると、0.1+0.2が0.3ちょうどになっていないことが分かります。`,
        `条件は if not math.isclose(subtotal, 0.3): に、表示は round(subtotal, 2) に書き換えます。`,
        `ファイルの先頭に import math を忘れずに追加しましょう。`
      ],
      expectedOutput: "チェックOK"
    },
    {
      id: 217,
      title: "TypeError（文字列は不変：item assignment不可）",
      explanation: `<p>リストは<code>a[1] = "y"</code>のように要素を書き換えられますが、文字列は<strong>イミュータブル（作成後に変更できない性質）</strong>なので、同じ操作がTypeErrorになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    word[1] = "y"
    ~~~~^^^
TypeError: 'str' object does not support item assignment</code></pre>
<p>「'str' object does not support item assignment」は「str型は要素への代入（item assignment）をサポートしない」という意味です。<code>word[1]</code>で文字を<strong>読む</strong>のは自由ですが、<strong>書き換える</strong>ことはできません。同じメッセージはタプル（'tuple' object ...）でも出ます。</p>
<p>では文字列を「変更」したいときはどうするか。答えは<strong>変更済みの新しい文字列を作って変数に入れ直す</strong>ことです。</p>
<table>
<tr><th>方法</th><th>例</th><th>向いている場面</th></tr>
<tr><td>replace()</td><td><code>word.replace("i", "y")</code></td><td>特定の文字・部分文字列の置換</td></tr>
<tr><td>スライス＋連結</td><td><code>word[:1] + "y" + word[2:]</code></td><td>位置を指定した置換</td></tr>
<tr><td>list化して加工しjoin</td><td><code>"".join(chars)</code></td><td>多数の文字を個別に操作</td></tr>
</table>
<p>replace()などの文字列メソッドが元の文字列を変えずに<strong>新しい文字列を返す</strong>のは、この不変性が理由です。だから戻り値を<code>word = word.replace(...)</code>のように受け取り直す必要があります。「文字列・タプル・数値は不変、リスト・辞書・集合は可変」という区分は、次のステップ以降のエラーを理解する土台にもなります。</p>`,
      task: `文字列は要素代入できません。replace()を使って"pithon"を"python"に直し、「修正後: python」と表示してください。`,
      code: `word = "pithon"
word[1] = "y"
print("修正後:", word)`,
      solution: `word = "pithon"
word = word.replace("i", "y")
print("修正後:", word)`,
      hints: [
        `文字列はイミュータブルなので、直接書き換えるのではなく新しい文字列を作ります。`,
        `word = word.replace("i", "y") のように、replace()の戻り値を代入し直します。`
      ],
      expectedOutput: "修正後: python"
    },
    {
      id: 218,
      title: "ValueError（int(\"1.5\")の罠。floatを経由する修正）",
      explanation: `<p>「数字の文字列ならint()で変換できる」と思っていると、小数の文字列で足をすくわれます。int()が受け付けるのは<strong>整数として解釈できる文字列だけ</strong>で、"1.5"のような小数表記はValueErrorになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    hours = int(value)
ValueError: invalid literal for int() with base 10: '1.5'</code></pre>
<p>「数値っぽい文字列なのに変換に失敗した」ときは、末尾に表示された値をよく見てください。小数点が含まれていたら、このパターンです。変換の可否を整理します。</p>
<table>
<tr><th>変換</th><th>結果</th></tr>
<tr><td><code>int("15")</code></td><td>15（成功）</td></tr>
<tr><td><code>int("1.5")</code></td><td>ValueError（小数表記は不可）</td></tr>
<tr><td><code>float("1.5")</code></td><td>1.5（成功）</td></tr>
<tr><td><code>int(1.5)</code></td><td>1（float値からは変換可。小数部切り捨て）</td></tr>
</table>
<p>面白いのは表の最終行で、int()は<strong>float型の値からなら</strong>変換でき、そのとき小数部を0方向へ切り捨てます。したがって小数の文字列を整数にしたいときは、<code>int(float("1.5"))</code>のように<strong>floatを経由する</strong>のが定石です。今回のコードでは、時間数"1.5"をまずfloat()で数値化し、60を掛けてからint()で整数の分に整えます。なおisdigit()も"1.5"に対してはFalseを返す（小数点は数字ではない）ため、前ステップの防御と組み合わせるときも小数の存在を意識する必要があります。</p>`,
      task: `文字列"1.5"はint()で直接変換できません。float()を経由して数値化し、60を掛けて「分に換算: 90 分」と表示してください。`,
      code: `value = "1.5"
hours = int(value)
minutes = hours * 60
print("分に換算:", minutes, "分")`,
      solution: `value = "1.5"
hours = float(value)
minutes = int(hours * 60)
print("分に換算:", minutes, "分")`,
      hints: [
        `int()は小数点を含む文字列を変換できません。まず小数として読み取りましょう。`,
        `hours = float(value) としてから、minutes = int(hours * 60) で整数に整えます。`
      ],
      expectedOutput: "分に換算: 90 分"
    },
    {
      id: 219,
      title: "AttributeError相当のNone罠（sort()の戻り値Noneを代入）",
      explanation: `<p>「'NoneType' object has no attribute ...」というエラーは、実務で最も出会うメッセージのひとつです。NoneTypeはNoneの型のことで、要するに<strong>Noneが入った変数に対してメソッドを呼んでしまった</strong>という意味です。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 3, in &lt;module&gt;
    sorted_scores.reverse()
    ^^^^^^^^^^^^^^^^^^^^^
AttributeError: 'NoneType' object has no attribute 'reverse'</code></pre>
<p>エラー行だけ見ても原因は分かりません。本当の問題は1行上の<code>sorted_scores = scores.sort()</code>です。リストのsort()メソッドは<strong>リスト自体をその場で並べ替え、戻り値としてNoneを返す</strong>仕様なので、戻り値を代入するとNoneを掴んでしまいます。「NoneTypeのエラーを見たら、<strong>その変数にNoneを入れた犯人を1行ずつ遡って探す</strong>」のが調査の型です。</p>
<p>紛らわしい2系統を整理します。</p>
<table>
<tr><th>書き方</th><th>動き</th><th>戻り値</th></tr>
<tr><td><code>scores.sort()</code></td><td>元のリストを直接並べ替える</td><td>None</td></tr>
<tr><td><code>sorted(scores)</code></td><td>並べ替えた新しいリストを作る</td><td>新しいリスト</td></tr>
<tr><td><code>scores.reverse()</code></td><td>元のリストを逆順にする</td><td>None</td></tr>
<tr><td><code>sorted(scores, reverse=True)</code></td><td>降順の新しいリストを作る</td><td>新しいリスト</td></tr>
</table>
<p>append()・extend()・insert()など、リストを直接書き換えるメソッドは軒並みNoneを返します。<strong>戻り値を受け取りたいならsorted()などの「新しい値を返す関数」を使う</strong>。この使い分けが身につくと、None起因のエラーは激減します。</p>`,
      task: `sort()の戻り値はNoneです。sorted()とreverse=Trueを使って降順の新しいリストを作り、「高い順: [95, 88, 72, 60]」と表示してください。`,
      code: `scores = [72, 95, 88, 60]
sorted_scores = scores.sort()
sorted_scores.reverse()
print("高い順:", sorted_scores)`,
      solution: `scores = [72, 95, 88, 60]
sorted_scores = sorted(scores, reverse=True)
print("高い順:", sorted_scores)`,
      hints: [
        `エラー行の1つ上を見ましょう。scores.sort()は何を返すメソッドだったでしょうか。`,
        `sorted_scores = sorted(scores, reverse=True) とすれば、降順の新しいリストが得られます。`
      ],
      expectedOutput: "高い順: [95, 88, 72, 60]"
    },
    {
      id: 220,
      title: "総合：型エラーだらけの関数を直す",
      explanation: `<p>この章の総仕上げは、関数の中で起きるエラーの修正です。関数内でエラーが起きると、トレースバックは<strong>複数のフレーム（呼び出しの段）</strong>を持ちます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 7, in &lt;module&gt;
    print(build_report(name, scores))
          ~~~~~~~~~~~~^^^^^^^^^^^^^^
  File "main.py", line 2, in build_report
    average = sum(scores) / len(scores)
              ~~~^^^^^^^^
TypeError: unsupported operand type(s) for +: 'int' and 'str'</code></pre>
<p>読み方はこうです。<strong>最下段がエラーの発生場所</strong>（build_report内のsum）、その上が呼び出し元（7行目のprint）。つまり「7行目から呼ばれたbuild_reportの2行目で失敗した」と、呼び出しの経路ごと分かります。メッセージの「unsupported operand type(s) for +: 'int' and 'str'」は、intとstrの足し算はできないという意味で、sum()が内部で0 + "80"を計算しようとした結果です。点数が<strong>文字列のリスト</strong>で渡ってきているのが根本原因です。</p>
<p>この初期コードには、章で学んだ問題が3つ潜んでいます。</p>
<ol>
<li>文字列のリストをsum()に渡している（int変換が必要。内包表記が便利）</li>
<li>空リストのとき0除算になる（件数チェックで防御）</li>
<li>float型のaverageを<code>+</code>で文字列連結している（f-stringで解決）</li>
</ol>
<p>1つ直すたびに実行し、トレースバックの変化を確認しながら進めてください。エラーの種類が変わったら前進です。最終的にf-stringの書式指定<code>{average:.1f}</code>で小数1桁に整えると、出力がきれいに揃います。</p>`,
      task: `build_report()には型と値の問題が3つあります。実行→修正→再実行を繰り返して全て直し、tanakaは「平均80.0点」、scoresが空のsatoは「記録なし」と表示されるようにしてください。`,
      code: `def build_report(name, scores):
    average = sum(scores) / len(scores)
    return "受講者" + name + ":平均" + average + "点"

data = {"tanaka": ["80", "70", "90"], "sato": []}
for name, scores in data.items():
    print(build_report(name, scores))`,
      solution: `def build_report(name, scores):
    numbers = [int(s) for s in scores]
    if len(numbers) == 0:
        return f"受講者{name}:記録なし"
    average = sum(numbers) / len(numbers)
    return f"受講者{name}:平均{average:.1f}点"

data = {"tanaka": ["80", "70", "90"], "sato": []}
for name, scores in data.items():
    print(build_report(name, scores))`,
      hints: [
        `最初のエラーはsum()の中の足し算です。scoresの中身の型を確認しましょう。内包表記 [int(s) for s in scores] で数値化できます。`,
        `数値化するとsatoの空リストで0除算が起きます。len()が0なら「記録なし」を返して先に抜けましょう。`,
        `最後はreturn行の文字列連結です。f-stringに書き換え、平均は {average:.1f} の書式で小数1桁にします。`
      ],
      expectedOutput: "受講者tanaka:平均80.0点"
    }
  ]
});
