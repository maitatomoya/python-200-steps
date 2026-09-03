// 第21章：よくあるエラー：名前と構文
registerChapter({
  number: 21,
  title: "よくあるエラー：名前と構文",
  description: "ここからは「よくあるエラー50選」。実際のトレースバックを読んで原因を特定し、修正する練習をします。この章では名前解決と構文に関するエラーを扱います。",
  steps: [
    {
      id: 201,
      title: "NameError（変数名typo）",
      explanation: `<p>ここからの5章は「よくあるエラー50選」です。毎回、実際にエラーが出るコードを実行し、トレースバック（エラーに至るまでの実行経路とエラー内容の表示）を読んで原因を特定し、修正します。最初は最も遭遇回数が多いNameError、つまり「その名前は定義されていません」というエラーです。</p>
<p>初期コードを実行すると、次のような表示が出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    print("ようこそ、" + user_nmae + "さん")
                         ^^^^^^^^^
NameError: name 'user_nmae' is not defined. Did you mean: 'user_name'?</code></pre>
<p>トレースバックは<strong>最下行から</strong>読むのが鉄則です。最下行に「例外の種類（NameError）」と「メッセージ（name 'user_nmae' is not defined）」があり、その上の行に「ファイル名・行番号・問題のコード」、さらに<code>^^^^^</code>の記号が問題の箇所そのものを指しています。Python 3.10以降は「Did you mean: 'user_name'?」のように、定義済みの似た名前まで提案してくれるので、typo（打ち間違い）ならほぼ一目で原因が分かります。</p>
<p>NameErrorの典型的な原因は次の3つです。</p>
<table>
<tr><th>原因</th><th>例</th></tr>
<tr><td>変数名の打ち間違い</td><td><code>user_nmae</code>（正しくは<code>user_name</code>）</td></tr>
<tr><td>大文字・小文字の不一致</td><td><code>Name</code>と<code>name</code>は別の変数</td></tr>
<tr><td>変数名を変更した際の直し漏れ</td><td>定義側だけ改名して使用側が古いまま</td></tr>
</table>
<p>「最下行→行番号→<code>^</code>の位置→Did you meanの提案」の順に目を動かす習慣をつけましょう。</p>`,
      task: `初期コードを実行してトレースバックを確認し、2行目の変数名の打ち間違いを修正してください。`,
      code: `user_name = "sato"
print("ようこそ、" + user_nmae + "さん")`,
      solution: `user_name = "sato"
print("ようこそ、" + user_name + "さん")`,
      hints: [
        `トレースバックの最下行に「name 'user_nmae' is not defined」とあります。定義した変数名と見比べましょう。`,
        `1行目で定義しているのはuser_nameです。2行目のuser_nmaeをuser_nameに直します。`
      ],
      expectedOutput: "ようこそ、satoさん"
    },
    {
      id: 202,
      title: "NameError（定義前に使用）",
      explanation: `<p>同じNameErrorでも、今回は打ち間違いではありません。Pythonのスクリプトは<strong>上から下へ1行ずつ実行される</strong>ため、変数は「代入された行より後」でしか使えません。定義より前の行で使うと、その時点ではまだ名前が存在しないのでNameErrorになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 1, in &lt;module&gt;
    print("合計金額:", total)
                       ^^^^^
NameError: name 'total' is not defined</code></pre>
<p>注目すべきは「line 1」です。ファイルの後ろの方を見ればちゃんと<code>total = price + tax</code>と書いてあるのに、エラーになる。これが「定義前に使用」のサインです。前ステップと違って「Did you mean」の提案が出ていないのもヒントになります。似た名前の定義済み変数が見つからないとき、提案は表示されません。</p>
<p>このパターンの対処はシンプルで、<strong>使う行を定義より後ろに移動する（または定義を前に移動する）</strong>だけです。関数の場合も同様に、<code>def</code>文が実行されるより前にその関数を呼び出すとNameErrorになります。</p>
<pre><code>greet()          # NameError: name 'greet' is not defined

def greet():
    print("hello")</code></pre>
<p>「エラー行の変数が、それより上の行で代入されているか」を確認するのが、NameError調査の基本動作です。打ち間違いなら名前を直し、順序の問題なら行を並べ替える。この2パターンでNameErrorの大半は解決できます。</p>`,
      task: `トレースバックの行番号に注目して原因を特定し、計算結果を正しく表示できるように行の順序を修正してください。`,
      code: `print("合計金額:", total)

price = 1200
tax = 120
total = price + tax`,
      solution: `price = 1200
tax = 120
total = price + tax

print("合計金額:", total)`,
      hints: [
        `エラーは1行目で起きています。totalが代入されるのは何行目でしょうか。`,
        `print()の行を、total = price + taxより後ろに移動します。`
      ],
      expectedOutput: "合計金額: 1320"
    },
    {
      id: 203,
      title: "SyntaxError（括弧・クォートの閉じ忘れ）",
      explanation: `<p>SyntaxError（構文エラー）は、これまでのNameErrorと決定的に違う点があります。それは<strong>プログラムが1行も実行される前に起きる</strong>ことです。Pythonは実行前にコード全体を解析（パース）し、文法の誤りを見つけるとその場で止まります。だからトレースバックに「Traceback (most recent call last):」の行がなく、いきなりファイル名と問題の行が表示されます。</p>
<pre><code>  File "main.py", line 3
    print("平均点:", round(average, 1)
         ^
SyntaxError: '(' was never closed</code></pre>
<p>「'(' was never closed」は「この<code>(</code>が最後まで閉じられなかった」という意味で、<code>^</code>は<strong>閉じ忘れた開き括弧の位置</strong>を指します。Python 3.10以降でこの表示は大きく改善されており、以前のバージョンでは「次の行」が問題として示されて原因を探しにくいことがありました。クォートの閉じ忘れの場合は、次のようなメッセージになります。</p>
<pre><code>  File "main.py", line 1
    print("こんにちは)
          ^
SyntaxError: unterminated string literal (detected at line 1)</code></pre>
<p>「unterminated string literal」は「文字列リテラルが終わっていない」という意味です。どちらも対処は同じで、<strong><code>^</code>が指す開き記号に対応する閉じ記号（<code>)</code>や<code>"</code>）を補う</strong>ことです。エディタの括弧ハイライト機能（対応する括弧を強調表示する機能）を使うと発見が早くなります。今回のコードでは3行目の<code>round(average, 1)</code>の外側にある<code>print(</code>が閉じられていません。</p>`,
      task: `エラーメッセージの「'(' was never closed」を手がかりに、閉じ括弧を補って2行の出力が両方表示されるように修正してください。`,
      code: `scores = [80, 65, 92]
average = sum(scores) / len(scores)
print("平均点:", round(average, 1)
print("受験者数:", len(scores))`,
      solution: `scores = [80, 65, 92]
average = sum(scores) / len(scores)
print("平均点:", round(average, 1))
print("受験者数:", len(scores))`,
      hints: [
        `3行目のprint(は開き括弧が2つ、閉じ括弧が1つしかありません。`,
        `round(average, 1)の後ろに、print用の閉じ括弧)をもう1つ追加します。`
      ],
      expectedOutput: "平均点: 79.0"
    },
    {
      id: 204,
      title: "SyntaxError（コロン忘れ）",
      explanation: `<p>ifやforなどの「ブロックを従える文」の行末にはコロン<code>:</code>が必要です。書き忘れると、Python 3.10以降ではとても分かりやすいメッセージが表示されます。</p>
<pre><code>  File "main.py", line 2
    if temperature &gt;= 30
                        ^
SyntaxError: expected ':'</code></pre>
<p>「expected ':'」は「ここに<code>:</code>があるはずだった」という意味で、<code>^</code>が挿入すべき位置（行末）を正確に指しています。修正はその位置に<code>:</code>を1文字足すだけです。以前のバージョンではこれも「invalid syntax」としか表示されず、初心者がつまずく定番でしたが、現在は自己説明的なエラーになっています。</p>
<p>コロンが必要な文をまとめて確認しておきましょう。いずれも「次の行からインデントしたブロックが始まる」合図としてコロンを書きます。</p>
<table>
<tr><th>文</th><th>例</th></tr>
<tr><td>if / elif / else</td><td><code>if x &gt; 0:</code>　<code>else:</code></td></tr>
<tr><td>for / while</td><td><code>for i in range(3):</code></td></tr>
<tr><td>def / class</td><td><code>def greet(name):</code></td></tr>
<tr><td>try / except / finally</td><td><code>try:</code>　<code>except ValueError:</code></td></tr>
</table>
<p>逆に、elseやtryのように条件式を持たない行でもコロンは省略できません。「ブロックの見出し行＝行末にコロン」とセットで覚えると、このエラーはすぐ直せるようになります。なお今回のコードの4行目<code>else:</code>には正しくコロンがあるので、比較して確認してみてください。</p>`,
      task: `エラーメッセージの「expected ':'」が指す位置にコロンを補い、「真夏日です」と表示されるように修正してください。`,
      code: `temperature = 31
if temperature >= 30
    print("真夏日です")
else:
    print("過ごしやすい気温です")`,
      solution: `temperature = 31
if temperature >= 30:
    print("真夏日です")
else:
    print("過ごしやすい気温です")`,
      hints: [
        `^記号が2行目の行末を指しています。そこに足りない1文字は何でしょうか。`,
        `if temperature >= 30 の行末にコロン:を追加します。`
      ],
      expectedOutput: "真夏日です"
    },
    {
      id: 205,
      title: "IndentationError（expected an indented block）",
      explanation: `<p>IndentationError（インデントエラー）はSyntaxErrorの一種で、字下げが文法と食い違っているときに起きます。Pythonはインデントそのものでブロック構造を表すため、他の言語なら「見た目が悪い」で済む字下げミスが、Pythonでは実行前のエラーになります。</p>
<pre><code>  File "main.py", line 3
    print("在庫切れです")
    ^^^^^
IndentationError: expected an indented block after 'if' statement on line 2</code></pre>
<p>「expected an indented block after 'if' statement on line 2」は「2行目のif文の後にはインデントされたブロックが来るはずだった」という意味です。コロンで終わる行（if・for・defなど）の直後の行は、<strong>必ず1段深くインデントしなければならない</strong>のに、3行目が行頭から始まっているためエラーになりました。メッセージが「どの文（if）」「何行目（line 2）」まで教えてくれるので、原因の行がすぐ特定できます。</p>
<p>このエラーが出る典型的な場面は次の2つです。</p>
<ul>
<li>if文などの中身を書くときに字下げを忘れた（今回のパターン）</li>
<li>コードを他の場所からコピーした際にインデントが失われた</li>
</ul>
<p>修正は、ブロックの中身を半角スペース4つで字下げするだけです。この教材（そしてPython公式のスタイルガイドPEP 8）では<strong>インデントは半角スペース4つ</strong>に統一します。なお「中身をあとで書くので今は空にしたい」ときは、何もしない文<code>pass</code>をブロックに置くとエラーを回避できます。</p>`,
      task: `エラーメッセージから問題の行を特定し、if文のブロックが正しくインデントされるように修正してください。`,
      code: `stock = 3
if stock == 0:
print("在庫切れです")
else:
    print("在庫あり:", stock, "個")`,
      solution: `stock = 3
if stock == 0:
    print("在庫切れです")
else:
    print("在庫あり:", stock, "個")`,
      hints: [
        `コロンで終わる行の直後は、1段深くインデントする必要があります。`,
        `3行目のprint("在庫切れです")の行頭に半角スペース4つを入れます。`
      ],
      expectedOutput: "在庫あり: 3 個"
    },
    {
      id: 206,
      title: "IndentationError（unexpected indent）",
      explanation: `<p>前ステップとは逆に、<strong>インデントしてはいけない場所で字下げした</strong>ときのエラーが「unexpected indent（予期しないインデント）」です。</p>
<pre><code>  File "main.py", line 3
    print("商品数:", count)
IndentationError: unexpected indent</code></pre>
<p>2行目の<code>count = len(items)</code>はコロンで終わっていない普通の文なので、その次の行に新しいブロックが始まる理由がありません。それなのに3行目が字下げされているため、Pythonは「このインデントは何のためのものか分からない」と判断してエラーにします。</p>
<p>2種類のIndentationErrorを対比して覚えましょう。</p>
<table>
<tr><th>メッセージ</th><th>意味</th><th>修正</th></tr>
<tr><td>expected an indented block</td><td>字下げが必要なのにない</td><td>インデントを足す</td></tr>
<tr><td>unexpected indent</td><td>字下げが不要なのにある</td><td>インデントを削る</td></tr>
</table>
<p>unexpected indentは、コードを書き足すときに前の行の字下げに引きずられたり、コピーした行の貼り付け位置がずれたりして起こりがちです。判断基準はただ1つ、<strong>直前の行がコロンで終わっているかどうか</strong>です。終わっていれば1段深く、終わっていなければ同じ深さに揃えます。また、同じブロック内の行は全て同じ深さでなければならず、途中で1行だけ深くしてもこのエラーになります。行頭の空白を削除して、周囲の行と深さを揃えましょう。</p>`,
      task: `3行目の不要なインデントを取り除き、「商品数: 3」と表示されるように修正してください。`,
      code: `items = ["ペン", "ノート", "消しゴム"]
count = len(items)
    print("商品数:", count)`,
      solution: `items = ["ペン", "ノート", "消しゴム"]
count = len(items)
print("商品数:", count)`,
      hints: [
        `直前の2行目はコロンで終わっていません。3行目を字下げする理由はあるでしょうか。`,
        `3行目の行頭にあるスペースを全て削除し、1〜2行目と同じ深さに揃えます。`
      ],
      expectedOutput: "商品数: 3"
    },
    {
      id: 207,
      title: "TabError（タブとスペースの混在）",
      explanation: `<p>TabErrorはIndentationErrorの親戚で、<strong>同じブロックのインデントにタブ文字と半角スペースが混在している</strong>ときに起きます。厄介なのは、タブとスペースは画面上ではどちらも「空白」にしか見えないことです。見た目は完全に揃っているのにエラーになるため、原因に気づきにくい代表格です。</p>
<pre><code>  File "main.py", line 3
    	print("処理中です")
    ^
TabError: inconsistent use of tabs and spaces in indentation</code></pre>
<p>「inconsistent use of tabs and spaces in indentation」は「インデントでのタブとスペースの使い方に一貫性がない」という意味です。今回のコードは、forブロックの1行目がスペース4つ、2行目がタブ1つで字下げされています。Pythonはタブとスペースを別物として扱うため、同じ深さのブロックと認めてくれません。</p>
<p>このエラーが起きたときの調査方法と予防策です。</p>
<ul>
<li>エディタの「空白文字を表示」機能をオンにする（スペースは点、タブは矢印などで表示される）</li>
<li>エラー行のインデントをいったん全て削除し、スペースで入力し直す</li>
<li>エディタの設定で「Tabキーでスペース4つを挿入する」を有効にする（多くのエディタでPythonファイルは初期設定済み）</li>
</ul>
<p>Python公式のスタイルガイドPEP 8はスペース4つを推奨しており、実務のコードもほぼスペースに統一されています。他人のコードや古い記事からコピーした行にタブが紛れ込むのが典型的な発生源なので、貼り付け後にエラーが出たらまずTabErrorを疑いましょう。</p>`,
      task: `3行目の行頭にはタブ文字が使われています。タブを削除して半角スペース4つに置き換え、エラーを解消してください。`,
      code: `for i in range(3):
    print("回数:", i + 1)
\tprint("処理中です")`,
      solution: `for i in range(3):
    print("回数:", i + 1)
    print("処理中です")`,
      hints: [
        `見た目は揃っていても、2行目はスペース4つ、3行目はタブ1つで字下げされています。`,
        `3行目の行頭の空白を全て削除して、半角スペースを4回入力し直します。`
      ],
      expectedOutput: "回数: 3"
    },
    {
      id: 208,
      title: "SyntaxError（=と==の取り違え）",
      explanation: `<p><code>=</code>は代入、<code>==</code>は比較。頭では分かっていても、if文の条件式でうっかり<code>=</code>を1つしか書かないミスは、経験者でもやります。Python 3.10以降はこの取り違えを名指しで指摘してくれます。</p>
<pre><code>  File "main.py", line 2
    if answer = 42:
       ^^^^^^^^^^^
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?</code></pre>
<p>「Maybe you meant '==' or ':=' instead of '='?」、つまり「<code>=</code>ではなく<code>==</code>か<code>:=</code>のつもりでは?」という提案です。今回のように値を比較したいなら<code>==</code>に直します。ちなみに<code>:=</code>は「代入した値をそのまま式として使える」演算子（セイウチ演算子と呼ばれます）で、提案に出てくるもう1つの候補ですが、初心者のうちは「比較なら==」だけ覚えれば十分です。</p>
<p>2つの演算子を整理しておきます。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>例</th></tr>
<tr><td><code>=</code></td><td>代入（右の値を左の名前に入れる）</td><td><code>answer = 42</code></td></tr>
<tr><td><code>==</code></td><td>比較（等しいかをTrue/Falseで返す）</td><td><code>answer == 42</code></td></tr>
</table>
<p>Pythonでは、C言語などと違って<strong>if文の条件の位置に代入文を書くこと自体が構文エラー</strong>になります。「代入のつもりが比較になっていた」という逆方向の事故が起きないのは、Pythonの安全な設計のひとつです。エラーメッセージの提案をそのまま受け入れて<code>==</code>に直しましょう。</p>`,
      task: `エラーメッセージの提案に従って2行目を修正し、「正解です」と表示されるようにしてください。`,
      code: `answer = 42
if answer = 42:
    print("正解です")`,
      solution: `answer = 42
if answer == 42:
    print("正解です")`,
      hints: [
        `if文の条件で「等しいか」を調べる演算子は=ではありません。`,
        `if answer == 42: のように=を2つ重ねます。`
      ],
      expectedOutput: "正解です"
    },
    {
      id: 209,
      title: "SyntaxError（予約語を変数名に使用）",
      explanation: `<p>Pythonには、文法上の役割が決まっていて<strong>変数名として使えない単語</strong>があります。これを予約語（キーワード）と呼びます。<code>if</code>・<code>for</code>・<code>class</code>・<code>return</code>などがそうで、変数名にしようとすると構文エラーになります。</p>
<pre><code>  File "main.py", line 1
    class = "初級"
          ^
SyntaxError: invalid syntax</code></pre>
<p>注意したいのは、これまでの親切なメッセージと違って<strong>ただの「invalid syntax」しか表示されない</strong>ことです。Pythonは<code>class</code>を見た瞬間「クラス定義が始まる」と解釈するため、直後に<code>=</code>が来た時点で文法が壊れた、としか報告できないのです。「invalid syntaxだけ表示されて理由が分からないときは、その行に予約語がないか疑う」と覚えておくと調査が速くなります。予約語の一覧は次のコードで確認できます。</p>
<pre><code>import keyword
print(keyword.kwlist)
# ['False', 'None', 'True', 'and', 'as', 'assert', ... 'class', ... 'while', 'with', 'yield']</code></pre>
<p>変数名にしがちな予約語の代表は<code>class</code>・<code>lambda</code>・<code>is</code>・<code>in</code>・<code>from</code>あたりです。<code>class</code>なら<code>course</code>や<code>class_name</code>のように、意味を保った別名に置き換えます。なお<code>list</code>や<code>sum</code>のような組み込み関数名は予約語ではないため代入できてしまいますが、元の機能が使えなくなる別の問題を引き起こします（第25章で扱います）。どちらも避けるのが安全です。</p>`,
      task: `変数名classが予約語のためエラーになっています。変数名をcourse_levelに変更して、2か所とも修正してください。`,
      code: `class = "初級"
print("受講クラス:", class)`,
      solution: `course_level = "初級"
print("受講クラス:", course_level)`,
      hints: [
        `classはクラス定義のための予約語なので、変数名には使えません。`,
        `1行目と2行目のclassを、両方ともcourse_levelに置き換えます。`
      ],
      expectedOutput: "受講クラス: 初級"
    },
    {
      id: 210,
      title: "総合：複数の構文エラーを順に直す",
      explanation: `<p>この章の総仕上げです。実務のデバッグで重要な事実をひとつ。構文エラーが複数あっても、<strong>Pythonは一度に1つしか報告しません</strong>。解析は先頭から進み、最初に文法が壊れた場所で止まるからです。つまり「エラーを直したのにまた別のエラーが出た」は失敗ではなく、前進している証拠です。</p>
<p>デバッグの基本サイクルはこうなります。</p>
<ol>
<li>実行してトレースバックを読む（最下行の種類とメッセージ→行番号→<code>^</code>の位置）</li>
<li>その1か所だけを修正する</li>
<li>再実行して次のエラーを読む。エラーがなくなるまで繰り返す</li>
</ol>
<p>今回の初期コードには、この章で学んだ構文エラーが3つ仕込まれています。最初に報告されるのはfor文のコロン忘れです。</p>
<pre><code>  File "main.py", line 3
    for p in prices
                   ^
SyntaxError: expected ':'</code></pre>
<p>これを直して再実行すると、次は<code>if total = 930:</code>に対して「Maybe you meant '==' ...」の提案付きエラーが、さらに直すと<code>print("合計:", total</code>に「'(' was never closed」が報告されるはずです。章で学んだメッセージの読み方を思い出しながら、1つずつ確実に潰してください。</p>
<table>
<tr><th>メッセージ</th><th>原因</th></tr>
<tr><td>expected ':'</td><td>ブロック見出し行のコロン忘れ</td></tr>
<tr><td>Maybe you meant '=='...</td><td>比較のつもりの<code>=</code></td></tr>
<tr><td>'(' was never closed</td><td>括弧の閉じ忘れ</td></tr>
</table>
<p>焦って複数箇所を同時に書き換えると、どの修正が効いたのか分からなくなります。<strong>1回の実行で1か所</strong>が安全なリズムです。</p>`,
      task: `初期コードには構文エラーが3つあります。実行→修正→再実行を繰り返して全て直し、「合計: 930」と「チェック完了」が表示されるようにしてください。`,
      code: `prices = [300, 480, 150]
total = 0
for p in prices
    total += p
if total = 930:
    print("合計:", total
print("チェック完了")`,
      solution: `prices = [300, 480, 150]
total = 0
for p in prices:
    total += p
if total == 930:
    print("合計:", total)
print("チェック完了")`,
      hints: [
        `まず実行してみましょう。最初に報告されるのは3行目のfor文です。行末に何が足りないでしょうか。`,
        `2つ目は5行目の=と==の取り違え、3つ目は6行目のprint(の閉じ括弧です。`,
        `1か所直すごとに再実行して、エラーメッセージが変わることを確認しましょう。`
      ],
      expectedOutput: "合計: 930"
    }
  ]
});
