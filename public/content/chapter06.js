// 第6章：条件分岐
registerChapter({
  number: 6,
  title: "条件分岐",
  description: "if・elif・elseによる処理の分岐と、比較演算子・論理演算子・truthyとfalsyの考え方を学び、状況に応じて動きを変えるプログラムを書けるようになります。",
  steps: [
    {
      id: 51,
      title: "ifの基本とインデント",
      explanation: `<p>ここまでのプログラムは、上から下へ全行が必ず実行されました。<code>if</code>文を使うと「条件を満たすときだけ実行する」処理が書けるようになります。プログラムがはじめて「判断」を手に入れる、大きな一歩です。</p>
<pre><code>temperature = 31

if temperature &gt;= 30:
    print("真夏日です")
    print("水分補給を忘れずに")

print("ここは必ず実行される")</code></pre>
<p>構文のポイントは3つです。</p>
<ol>
<li><code>if 条件:</code>のように、条件の後ろに必ずコロンを書く</li>
<li>条件を満たしたとき実行する行は、<strong>半角スペース4つ</strong>で字下げ（インデント）する</li>
<li>同じ深さでインデントされた行のまとまりを「ブロック」と呼び、まとめて実行・スキップされる</li>
</ol>
<p>多くの言語ではブロックを波かっこで囲みますが、Pythonでは<strong>インデントそのものが文法</strong>です。見た目の字下げと実際の処理範囲が必ず一致するので、誰が書いても構造が読み取りやすいコードになります。逆に言えば、インデントを1つ間違えるだけで意味が変わるということでもあります。</p>
<p>上の例で<code>temperature</code>が30未満のときは、インデントされた2行がまるごとスキップされ、インデントの外にある最後のprintだけが実行されます。「どこまでがifの中で、どこからが外か」をインデントで意識しながら読む習慣をつけましょう。条件に使っている<code>&gt;=</code>（以上）などの比較演算子は、ステップ55で体系的に整理します。</p>`,
      task: `まずそのまま実行して、ifブロックがスキップされることを確認してください。次に<code>temperature</code>を31に変えて再実行し、ブロック内の2行が実行されることを確認してください。`,
      code: `# 気温によってメッセージを出し分ける
temperature = 25

if temperature >= 30:
    print("真夏日です")
    print("水分補給を忘れずに")

print("ここは必ず実行される")

# TODO: 一度実行して出力を見た後、temperatureを31に変えて再実行する`,
      solution: `# 気温によってメッセージを出し分ける
temperature = 31

if temperature >= 30:
    print("真夏日です")
    print("水分補給を忘れずに")

print("ここは必ず実行される")`,
      hints: [
        `temperature = 25のままだと、条件を満たさないのでifブロックは実行されません。`,
        `1行目の代入を temperature = 31 に変えると、30以上なのでブロックが実行されます。`
      ],
      expectedOutput: "真夏日です"
    },
    {
      id: 52,
      title: "IndentationError体験と修正",
      explanation: `<p>if文のコロンの次の行をインデントし忘れると、IndentationError（インデントの誤りを表すエラー）が発生します。実際のトレースバックを見てみましょう。</p>
<pre><code>  File "main.py", line 4
    print("合格です")
    ^
IndentationError: expected an indented block after 'if' statement on line 3</code></pre>
<p>エラーメッセージを分解して読みます。</p>
<table>
<tr><th>部分</th><th>意味</th></tr>
<tr><td>line 4</td><td>問題が検出された行番号</td></tr>
<tr><td>expected an indented block</td><td>「インデントされたブロックが来るはず」だった</td></tr>
<tr><td>after 'if' statement on line 3</td><td>3行目のif文の後で、という位置情報</td></tr>
</table>
<p>つまり「3行目のif文がコロンで終わっているのに、次の行が字下げされていない」という指摘です。Pythonのエラーメッセージは近年どんどん親切になっており、原因の行番号まで教えてくれます。エラーが出たら慌てずに最終行のエラー名とメッセージを読む、という習慣がデバッグ力の土台になります。</p>
<p>修正は、ifの中に入れたい行の先頭に半角スペース4つを入れるだけです。</p>
<pre><code>if score &gt;= 80:
    print("合格です")  # スペース4つでifの中に入る</code></pre>
<p>関連するエラーとして、逆に不要な字下げをすると「unexpected indent」、タブとスペースを混在させると「TabError」が出ます（第21章で詳しく扱います）。エディタの設定を「Tabキーでスペース4つを入力」にしておくと、この種のエラーを大きく減らせます。</p>`,
      task: `初期コードは実行すると<code>IndentationError</code>になります。トレースバックを確認してから、ifブロックに入れるべき行を正しくインデントして直してください。`,
      code: `score = 85

# コロンの次の行はインデントが必要
if score >= 80:
print("合格です")

print("判定終了")`,
      solution: `score = 85

# コロンの次の行はインデントが必要
if score >= 80:
    print("合格です")

print("判定終了")`,
      hints: [
        `まず実行して「IndentationError: expected an indented block」を確認しましょう。`,
        `print("合格です")の行頭に半角スペースを4つ入れて、ifブロックの中に入れます。`,
        `print("判定終了")はifの外に置いたまま（インデントなし）にします。`
      ],
      expectedOutput: "合格です"
    },
    {
      id: 53,
      title: "else",
      explanation: `<p>ifだけでは「条件を満たしたときの処理」しか書けません。「満たさなかったときはこちら」を書くのが<code>else</code>です。</p>
<pre><code>age = 20

if age &gt;= 18:
    print("大人料金です")
else:
    print("学生料金です")</code></pre>
<p>書き方のルールを確認しましょう。</p>
<ul>
<li><code>else</code>は対応するifと<strong>同じインデントの深さ</strong>に書く（ずれると別の意味になるかエラーになる）</li>
<li>elseには条件を書かず、コロンだけを付ける</li>
<li>elseのブロックも半角スペース4つでインデントする</li>
</ul>
<p>if-elseの2つのブロックは「どちらか一方だけが必ず実行される」関係です。両方実行されることも、両方スキップされることもありません。この性質のおかげで、読み手は「処理は必ず2択のどちらかに入る」と安心して読めます。</p>
<p>elseを使わずにifを2つ並べて書くこともできますが、おすすめしません。</p>
<pre><code># 悪い例：条件を2回書くと、修正時に片方だけ直して矛盾しやすい
if age &gt;= 18:
    print("大人料金です")
if age &lt; 18:
    print("学生料金です")</code></pre>
<p>「18歳以上」という基準を後から「20歳以上」に変えるとき、悪い例では2か所の修正が必要で、片方を直し忘れると両方表示されたり何も表示されなかったりするバグになります。elseなら条件は1か所だけなので、この種のバグが構造的に起こりません。「裏返しの条件はelseに任せる」と覚えましょう。</p>`,
      task: `初期コードにelseを追加して、18歳未満の場合に「学生料金: 1100円」と表示されるようにしてください。`,
      code: `age = 17

if age >= 18:
    print("大人料金: 1800円")
# TODO: elseを追加して、18歳未満なら「学生料金: 1100円」と表示する

print("チケットを発行しました")`,
      solution: `age = 17

if age >= 18:
    print("大人料金: 1800円")
else:
    print("学生料金: 1100円")

print("チケットを発行しました")`,
      hints: [
        `elseはifと同じインデントの深さ（行頭）に「else:」と書きます。`,
        `else:の次の行に、スペース4つでインデントしてprintを書きます。`
      ],
      expectedOutput: "学生料金: 1100円"
    },
    {
      id: 54,
      title: "elif",
      explanation: `<p>3つ以上に分岐したいときは<code>elif</code>（else ifの略）を使います。ifとelseの間に、いくつでも条件を追ねられます。</p>
<pre><code>score = 72

if score &gt;= 90:
    grade = "S"
elif score &gt;= 80:
    grade = "A"
elif score &gt;= 70:
    grade = "B"
else:
    grade = "C"</code></pre>
<p>最重要ポイントは、<strong>条件は上から順に評価され、最初に成立した1つのブロックだけが実行される</strong>ことです。score=72なら、90以上→不成立、80以上→不成立、70以上→成立、でBに決まり、以降の条件はもう見ません。</p>
<p>この性質から、<strong>条件を並べる順番</strong>が結果を左右します。ゆるい条件を先に書いてしまった失敗例を見てください。</p>
<pre><code>score = 95
if score &gt;= 70:      # 95はここで成立してしまう
    grade = "B"
elif score &gt;= 90:    # ここには永遠に到達しない
    grade = "S"</code></pre>
<p>95点は「70以上」も満たすため、先に書かれたBで確定してしまい、Sの条件は死んだコード（到達不能なコード）になります。エラーは出ないのに結果が間違う、発見しにくいバグの典型です。数値の範囲で分岐するときは「厳しい条件（大きい値）から順に書く」が鉄則です。</p>
<p>また、elifの連なりは「最初の成立で打ち切り」なので、各条件に<code>score &gt;= 80 and score &lt; 90</code>のような上限チェックを書く必要はありません。上の条件が不成立だった時点で「90未満」は確定しているからです。この暗黙の絞り込みを意識できると、条件式を短く保てます。</p>`,
      task: `初期コードは95点なのに評価がBになってしまいます。条件を並べる順番を直して、正しく「S」と判定されるようにしてください。`,
      code: `score = 95

# 95点ならSのはずが、実行するとBになってしまう
# TODO: 条件を「大きい値から順」に並べ替えて直す
if score >= 70:
    grade = "B"
elif score >= 80:
    grade = "A"
elif score >= 90:
    grade = "S"
else:
    grade = "C"

print(f"{score}点の評価は{grade}です")`,
      solution: `score = 95

# 条件は上から順に評価されるので、厳しい（大きい）値から並べる
if score >= 90:
    grade = "S"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"

print(f"{score}点の評価は{grade}です")`,
      hints: [
        `条件は上から順に試され、最初に成立したところで確定します。95は「70以上」を先に満たしてしまいます。`,
        `90以上→80以上→70以上の順になるよう、条件と代入のペアを並べ替えましょう。`
      ],
      expectedOutput: "95点の評価はSです"
    },
    {
      id: 55,
      title: "比較演算子と真偽値（bool）",
      explanation: `<p>ifの条件に書いてきた<code>&gt;=</code>などを、ここで体系的に整理します。値どうしを比べる演算子を比較演算子と呼びます。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>例（x=10のとき）</th></tr>
<tr><td><code>==</code></td><td>等しい</td><td><code>x == 10</code> → True</td></tr>
<tr><td><code>!=</code></td><td>等しくない</td><td><code>x != 10</code> → False</td></tr>
<tr><td><code>&lt;</code> / <code>&lt;=</code></td><td>より小さい／以下</td><td><code>x &lt; 10</code> → False</td></tr>
<tr><td><code>&gt;</code> / <code>&gt;=</code></td><td>より大きい／以上</td><td><code>x &gt;= 10</code> → True</td></tr>
</table>
<p>「等しい」は<code>=</code>ではなく<code>==</code>です。<code>=</code>は代入（変数に値を入れる）で、まったく別の意味なので注意してください（この取り違えは第21章で詳しく扱います）。</p>
<p>比較の結果は<code>True</code>か<code>False</code>のどちらかで、この2値だけを持つ型をbool型（真偽値）と呼びます。比較結果は普通の値として変数に入れたりprintしたりできます。</p>
<pre><code>result = 10 &gt;= 10
print(result)        # True
print(type(result))  # &lt;class 'bool'&gt;</code></pre>
<p>つまりifは「boolを受け取って分岐する文」であり、条件式の部分だけを切り出して変数に名前を付ければ、<code>if is_adult:</code>のような読みやすいコードになります。</p>
<p>Pythonならではの便利機能として、比較の連結があります。</p>
<pre><code>x = 10
print(0 &lt; x &lt; 100)  # 「0より大きく100より小さい」を1つの式で書ける</code></pre>
<p>数学の不等式と同じ感覚で範囲チェックが書けるのはPythonの美点で、多くの言語では<code>0 &lt; x and x &lt; 100</code>と2つに分けて書く必要があります。</p>`,
      task: `TODOの2行を書き換えて、<code>x</code>と<code>y</code>が「等しいか」と「等しくないか」をそれぞれ比較演算子で判定して表示してください。`,
      code: `x = 10
y = 7

print(x > y)

# TODO: xとyが等しいか（==）を判定して表示する
print(False)

# TODO: xとyが等しくないか（!=）を判定して表示する
print(False)

# 比較の結果はbool型
result = x >= 10
print(result)
print(type(result))

# 比較は連結できる
print(0 < x < 100)`,
      solution: `x = 10
y = 7

print(x > y)

# 等しいかは==で判定する（=は代入なので別物）
print(x == y)

# 等しくないかは!=で判定する
print(x != y)

# 比較の結果はbool型
result = x >= 10
print(result)
print(type(result))

# 比較は連結できる
print(0 < x < 100)`,
      hints: [
        `等しいかどうかの判定は=を2つ重ねた==です。=1つだと代入になってしまいます。`,
        `print(x == y)とprint(x != y)に書き換えます。10と7なのでFalseとTrueになります。`
      ],
      expectedOutput: "<class 'bool'>"
    },
    {
      id: 56,
      title: "and・or・not",
      explanation: `<p>「18歳以上で、かつチケットを持っている」のように条件を組み合わせるには、論理演算子<code>and</code>・<code>or</code>・<code>not</code>を使います。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>Trueになる条件</th></tr>
<tr><td><code>A and B</code></td><td>かつ</td><td>AとBの両方がTrueのとき</td></tr>
<tr><td><code>A or B</code></td><td>または</td><td>AとBの少なくとも一方がTrueのとき</td></tr>
<tr><td><code>not A</code></td><td>〜でない</td><td>AがFalseのとき</td></tr>
</table>
<pre><code>age = 25
has_ticket = True

print(age &gt;= 18 and has_ticket)  # True（両方成立）
print(age &gt;= 65 or age &lt;= 6)     # False（どちらも不成立）
print(not has_ticket)            # False（Trueの反転）</code></pre>
<p>andとorの取り違えは、エラーにならずに結果だけが間違う厄介なバグを生みます。日本語の「AとBの人は入場可」は、コードでは<code>A and B</code>のこともあれば「AまたはBに該当する人」つまり<code>A or B</code>のこともあり、日常語は曖昧です。迷ったら「両方必要ならand、片方でよいならor」と条件の意図に立ち返って確認しましょう。</p>
<p>ミドルエンジニアにも重要な性質として、短絡評価（ショートサーキット）があります。<code>A and B</code>はAがFalseならBを評価せずにFalseを返し、<code>A or B</code>はAがTrueならBを評価しません。結果が確定した時点で残りを省略する仕組みで、「左側でNoneチェックをしてから右側で中身を使う」という定番の防御パターンを支えています。</p>
<pre><code>name = ""
# nameが空でないことを確認してから先頭文字を見る（左がFalseなら右は実行されない）
print(name != "" and name[0] == "A")  # False（エラーにならない）</code></pre>`,
      task: `初期コードは16歳でチケットを持っているだけで入場できてしまいます。「18歳以上かつチケットあり」の条件になるよう、<code>or</code>を<code>and</code>に直してください。`,
      code: `age = 16
has_ticket = True

print(age >= 18 and has_ticket)
print(age >= 65 or age <= 6)
print(not has_ticket)

# 18歳以上「かつ」チケットありのときだけ入場可にしたい
# TODO: orをandに直す（今は16歳でも入場できてしまう）
if age >= 18 or has_ticket:
    print("入場できます")
else:
    print("入場できません")`,
      solution: `age = 16
has_ticket = True

print(age >= 18 and has_ticket)
print(age >= 65 or age <= 6)
print(not has_ticket)

# 18歳以上「かつ」チケットあり：両方必要なのでand
if age >= 18 and has_ticket:
    print("入場できます")
else:
    print("入場できません")`,
      hints: [
        `「かつ」＝両方の条件が必要なときはandを使います。`,
        `orのままだとhas_ticketがTrueなだけで全体がTrueになります。andに変えると16歳では不成立になり、elseが実行されます。`
      ],
      expectedOutput: "入場できません"
    },
    {
      id: 57,
      title: "inを使った条件と複数条件の整理",
      explanation: `<p>「値がいくつかの候補のどれかに一致するか」を調べたいとき、orを並べると条件式がどんどん長くなります。</p>
<pre><code># 動くが冗長：day == を3回も書いている
if day == "土" or day == "日" or day == "祝":
    print("休みです")</code></pre>
<p>こんなときは第4章・第5章でも登場した<code>in</code>演算子の出番です。候補をタプルやリストにまとめ、「その中に含まれるか」という1つの判定に置き換えられます。</p>
<pre><code>if day in ("土", "日", "祝"):
    print("休みです")</code></pre>
<p>この書き方には3つの利点があります。</p>
<ul>
<li><strong>短い</strong>：変数名を1回書くだけで済む</li>
<li><strong>意図が明確</strong>：「候補リストに含まれるか」という目的がそのまま読める</li>
<li><strong>修正に強い</strong>：候補の追加・削除がタプルの編集だけで完了する</li>
</ul>
<p>候補が今後増えそうなら、タプルに名前を付けて条件の外に出すとさらに読みやすくなります（例：<code>HOLIDAYS = ("土", "日", "祝")</code>）。</p>
<p>また、文字列に対するinは「部分文字列が含まれるか」の判定になるのでした（第3章）。条件分岐と組み合わせると、簡単な形式チェックが書けます。</p>
<pre><code>mail = "info@example.com"
if "@" in mail:
    print("メールアドレスの形式です")</code></pre>
<p>否定形は<code>not in</code>で書けます。<code>if day not in ("土", "日"):</code>のように、英語の語順どおり自然に読めるのがPythonらしいところです。orの羅列を見つけたらinに置き換えられないか考える、というのは実務のコードレビューでも定番の指摘です。</p>`,
      task: `TODOのif文を、<code>or</code>の羅列ではなく<code>in</code>とタプルを使った判定に書き換えてください。`,
      code: `day = "土"

# orを並べた書き方（動くが冗長）
if day == "土" or day == "日":
    print("週末です")

# TODO: 上と同じ判定をinとタプル("土", "日")で書き換える
if day == "土" or day == "日":
    print("inでも週末と判定できました")

# 文字列へのinは部分一致の判定
mail = "info@example.com"
if "@" in mail:
    print("メールアドレスの形式です")`,
      solution: `day = "土"

# orを並べた書き方（動くが冗長）
if day == "土" or day == "日":
    print("週末です")

# inを使うと候補への一致が1つの式で書ける
if day in ("土", "日"):
    print("inでも週末と判定できました")

# 文字列へのinは部分一致の判定
mail = "info@example.com"
if "@" in mail:
    print("メールアドレスの形式です")`,
      hints: [
        `「値 in 候補のタプル」で、候補のどれかに一致するかを判定できます。`,
        `if day in ("土", "日"):のように書き換えます。出力は変わらないことを確認しましょう。`
      ],
      expectedOutput: "inでも週末と判定できました"
    },
    {
      id: 58,
      title: "truthy・falsy（空文字・空リスト・0）",
      explanation: `<p>ifの条件には、boolだけでなく<strong>あらゆる値</strong>を書けます。Pythonはbool以外の値を受け取ると、自動的に真偽どちらとして扱うかを決めます。真として扱われる値をtruthy（トゥルーシー）、偽として扱われる値をfalsy（フォルシー）と呼びます。falsyな値は少数派なので、こちらを覚えるのが早道です。</p>
<table>
<tr><th>falsyな値</th><th>意味</th></tr>
<tr><td><code>False</code> / <code>None</code></td><td>偽そのもの／値がないことを表す値</td></tr>
<tr><td><code>0</code> / <code>0.0</code></td><td>数値のゼロ</td></tr>
<tr><td><code>""</code></td><td>空文字列</td></tr>
<tr><td><code>[]</code> / <code>()</code> / <code>{}</code> / <code>set()</code></td><td>空のリスト・タプル・辞書・集合</td></tr>
</table>
<p>これ以外はすべてtruthyです。<code>bool()</code>関数に値を渡すと、どちらに扱われるかを確認できます。</p>
<pre><code>print(bool(""))      # False
print(bool("hello")) # True
print(bool(0))       # False
print(bool([]))      # False
print(bool([1, 2]))  # True</code></pre>
<p>この仕組みを使うと「空かどうか」の判定が簡潔に書けます。Pythonでは<code>len(cart) &gt; 0</code>と書くより、リストをそのまま条件に置くのが慣用的（イディオム）とされています。</p>
<pre><code>cart = []
if cart:                # 「カートに中身があれば」と読める
    print("商品があります")
else:
    print("カートは空です")</code></pre>
<p>公式のスタイルガイド（PEP 8）も、空判定にはこの書き方を推奨しています。ただし注意点もあります。「0や空文字も意味のある値」として区別したい場面では、<code>if x:</code>だと0とNoneを見分けられません。そのときは<code>if x is not None:</code>のように明示的に書きます（isは後の章で扱います）。まずは「falsyは偽物リストの8つ」と「空判定はif cart:」を押さえましょう。</p>`,
      task: `bool()の観察部分を実行して結果を確かめた後、TODOのif文を<code>len(cart) &gt; 0</code>ではなくリストをそのまま条件に書く慣用的な形に直してください。`,
      code: `# どの値がtruthyでどれがfalsyかを観察する
print(bool(""))
print(bool("hello"))
print(bool(0))
print(bool(42))
print(bool([]))
print(bool([1, 2]))

cart = []
# TODO: len(cart) > 0 を使わず、リストをそのまま条件に書く形に直す
if len(cart) > 0:
    print("カートに商品があります")
else:
    print("カートは空です")`,
      solution: `# どの値がtruthyでどれがfalsyかを観察する
print(bool(""))
print(bool("hello"))
print(bool(0))
print(bool(42))
print(bool([]))
print(bool([1, 2]))

cart = []
# 空のリストはfalsyなので、リスト自体を条件に書ける
if cart:
    print("カートに商品があります")
else:
    print("カートは空です")`,
      hints: [
        `空のリストはfalsy、中身のあるリストはtruthyとして扱われます。`,
        `if cart:と書けば「cartに中身があれば」という意味になります。`
      ],
      expectedOutput: "カートは空です"
    },
    {
      id: 59,
      title: "条件式（三項演算子）",
      explanation: `<p>「条件によって変数に入れる値を変えたい」だけなのに、if-elseで4行使うのは少し大げさです。Pythonには、値を選ぶことに特化した1行の書き方「条件式」（他言語では三項演算子と呼ばれる構文に相当）があります。</p>
<pre><code># if-else版：4行
if stock &gt; 0:
    status = "在庫あり"
else:
    status = "在庫なし"

# 条件式版：1行で同じ意味
status = "在庫あり" if stock &gt; 0 else "在庫なし"</code></pre>
<p>語順は<code>Aの値 if 条件 else Bの値</code>です。「基本はA、ただし条件を満たさなければB」と英語の語順で読みます。条件が真ならifの左側、偽ならelseの右側が式全体の値になります。</p>
<p>条件式は「式」（値を生み出すもの）なので、値が置ける場所ならどこにでも書けます。f-stringの波かっこの中に埋め込めるのが実務では特に便利です。</p>
<pre><code>stock = 3
print(f"バッジ: {'販売中' if stock &gt; 0 else '売り切れ'}")</code></pre>
<p>一方で、使いどころには節度が必要です。条件式の中に条件式を入れ子にすると、途端に読めなくなります。</p>
<pre><code># 悪い例：ネストした条件式は読解が困難
label = "S" if x &gt; 90 else "A" if x &gt; 80 else "B"</code></pre>
<p>使い分けの目安は「<strong>2択で値を選ぶだけなら条件式、処理を分けたい・3択以上ならif-elif文</strong>」です。行数を減らすこと自体が目的ではなく、読み手が一瞬で意味を取れるかどうかで選びましょう。</p>`,
      task: `TODOの行を条件式（1行のif-else）に書き換えて、上のif-else文と同じ判定結果になるようにしてください。`,
      code: `stock = 3

# if-else文で書いた場合
if stock > 0:
    status = "在庫あり"
else:
    status = "在庫なし"
print(status)

# TODO: 上と同じ判定を条件式（1行）で書く
status = "在庫なし"
print(status)

# 条件式はf-stringの中にも書ける
print(f"バッジ: {'販売中' if stock > 0 else '売り切れ'}")`,
      solution: `stock = 3

# if-else文で書いた場合
if stock > 0:
    status = "在庫あり"
else:
    status = "在庫なし"
print(status)

# 条件式なら1行で同じ意味になる
status = "在庫あり" if stock > 0 else "在庫なし"
print(status)

# 条件式はf-stringの中にも書ける
print(f"バッジ: {'販売中' if stock > 0 else '売り切れ'}")`,
      hints: [
        `条件式の語順は「真のときの値 if 条件 else 偽のときの値」です。`,
        `status = "在庫あり" if stock > 0 else "在庫なし" と書きます。`
      ],
      expectedOutput: "バッジ: 販売中"
    },
    {
      id: 60,
      title: "総合演習（BMI判定プログラム）",
      explanation: `<p>第6章の総合演習として、BMI（体格指数。体重と身長から算出される肥満度の国際的な指標）の判定プログラムを完成させます。BMIの計算式は「体重(kg)÷身長(m)の2乗」です。日本肥満学会の基準を簡略化した、次の区分で判定します。</p>
<table>
<tr><th>BMI</th><th>判定</th></tr>
<tr><td>18.5未満</td><td>低体重</td></tr>
<tr><td>18.5以上25.0未満</td><td>普通体重</td></tr>
<tr><td>25.0以上30.0未満</td><td>肥満（1度）</td></tr>
<tr><td>30.0以上</td><td>肥満（2度以上）</td></tr>
</table>
<p>この章で学んだ道具を総動員します。設計のポイントを3つ挙げます。</p>
<ol>
<li><strong>計算</strong>：べき乗は第2章の<code>**</code>演算子で<code>height_m ** 2</code>と書けます。表示は第3章のf-string書式<code>{bmi:.1f}</code>で小数第1位に丸めます。</li>
<li><strong>判定</strong>：区分が4つあるのでif-elif-elseです。ステップ54で学んだとおり、elifは上の条件が不成立のときだけ評価されるので、「25.0未満」の判定に「18.5以上」を書き足す必要はありません。小さい値から<code>&lt;</code>で並べるだけで区間が表現できます。</li>
<li><strong>範囲チェック</strong>：「普通体重の範囲か」は、ステップ55の比較の連結<code>18.5 &lt;= bmi &lt; 25.0</code>で1つの式として書けます。</li>
</ol>
<pre><code>bmi = 63.0 / (1.70 ** 2)   # 21.799...
print(f"BMI: {bmi:.1f}")   # BMI: 21.8</code></pre>
<p>実務のコードでも「値を計算し、しきい値で区分し、結果を整形して出力する」という流れは、料金計算やアラート判定などあらゆる場面で登場する基本形です。TODOを上から順に埋めて完成させましょう。</p>`,
      task: `TODO1〜3を実装してください。BMIの計算、elifによる4区分の判定、比較の連結による範囲チェックの3つです。身長1.70m・体重63.0kgで「判定: 普通体重」になれば成功です。`,
      code: `# BMI判定プログラム
height_m = 1.70
weight_kg = 63.0

# TODO 1: BMIを計算する（体重 / 身長の2乗。2乗は ** 2）
bmi = 0.0
print(f"BMI: {bmi:.1f}")

# TODO 2: elifを2つ追加して4区分の判定を完成させる
#   18.5未満: 低体重 / 25.0未満: 普通体重 / 30.0未満: 肥満（1度） / それ以上: 肥満（2度以上）
if bmi < 18.5:
    category = "低体重"
else:
    category = "?"

print(f"判定: {category}")

# TODO 3: 18.5以上25.0未満かどうかを、比較の連結で判定する
is_normal = False
print(f"普通体重の範囲内: {is_normal}")`,
      solution: `# BMI判定プログラム
height_m = 1.70
weight_kg = 63.0

# 1. BMI = 体重(kg) / 身長(m)の2乗
bmi = weight_kg / (height_m ** 2)
print(f"BMI: {bmi:.1f}")

# 2. しきい値の小さい順に判定する（上が不成立なら下限は自動的に確定する）
if bmi < 18.5:
    category = "低体重"
elif bmi < 25.0:
    category = "普通体重"
elif bmi < 30.0:
    category = "肥満（1度）"
else:
    category = "肥満（2度以上）"

print(f"判定: {category}")

# 3. 比較の連結で範囲チェック
is_normal = 18.5 <= bmi < 25.0
print(f"普通体重の範囲内: {is_normal}")`,
      hints: [
        `BMIは weight_kg / (height_m ** 2) で計算します。63.0と1.70なら約21.8になります。`,
        `elif bmi < 25.0: のように、小さいしきい値から順に並べます。`,
        `範囲チェックは 18.5 <= bmi < 25.0 と1つの式で書けます。`
      ],
      expectedOutput: "判定: 普通体重"
    }
  ]
});
