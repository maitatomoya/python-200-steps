// 第1章：はじめてのPython
registerChapter({
  number: 1,
  title: "はじめてのPython",
  description: "print関数を中心に、Pythonプログラムの書き方・実行のしかた・エラーメッセージの読み方という、この先すべての土台になる基本を身につけます。",
  steps: [
    {
      id: 1,
      title: 'print("Hello, World!")',
      explanation: `<p>プログラミング学習の第一歩は、画面に文字を表示することです。Pythonでは<code>print()</code>という関数（かっこ付きで呼び出す、名前の付いた機能のこと）を使います。かっこの中に表示したい内容を書くと、実行時にその内容が画面（標準出力と呼ばれる出力先）に表示されます。</p>
<pre><code>print("Hello, World!")</code></pre>
<p>表示したい文字の並びは<code>"</code>（ダブルクォート）または<code>'</code>（シングルクォート）で囲みます。クォートで囲まれた文字の並びを<strong>文字列</strong>と呼びます。クォートは「ここからここまでが表示したいデータですよ」という目印で、画面には表示されません。</p>
<p>Pythonのプログラムは拡張子<code>.py</code>のファイルに書き、<code>python3 main.py</code>のようにコマンドで実行します。C言語やJavaと違ってコンパイル（機械語への事前変換）が不要で、書いたらすぐ実行できるのがPythonの特徴です。また、プログラムは<strong>上の行から順番に1行ずつ実行</strong>されます。<code>print()</code>を2つ書けば、書いた順に2行表示されます。</p>
<pre><code>print("Hello, World!")
print("Hello, Python!")</code></pre>
<p>たった1行でも、これは立派なプログラムです。「コードを書く→実行する→結果を確かめる」というサイクルが学習の基本になるので、まずはこの流れを体で覚えましょう。</p>`,
      task: `初期コードを実行して<code>Hello, World!</code>が表示されることを確認したら、その下に<code>Hello, Python!</code>と表示する行を追加してください。`,
      code: `# はじめてのPythonプログラム
print("Hello, World!")
# TODO: この下に「Hello, Python!」と表示するprintを追加する
`,
      solution: `# はじめてのPythonプログラム
print("Hello, World!")
print("Hello, Python!")
`,
      hints: [
        `1行目のprintと同じ形の行をもう1つ書けば、2行目として表示されます。`,
        `print("Hello, Python!") のように、クォートの中の文字だけを変えます。`
      ],
      expectedOutput: "Hello, Python!"
    },
    {
      id: 2,
      title: "構文エラー体験：クォートの閉じ忘れを直す",
      explanation: `<p>プログラミングでは、エラーは避けるものではなく<strong>読んで直すもの</strong>です。最初に出会うことが多いのが<strong>SyntaxError（構文エラー）</strong>。文法のルールに違反した書き方をしたとき、Pythonが「この書き方は解釈できません」と実行前に知らせてくれるエラーです。</p>
<p>たとえば文字列の閉じクォートを忘れると、次のようなメッセージが表示されます。</p>
<pre><code>  File "main.py", line 1
    print("こんにちは、Python)
          ^
SyntaxError: unterminated string literal (detected at line 1)</code></pre>
<p>この表示の読み方を覚えましょう。</p>
<table>
<tr><th>行</th><th>意味</th></tr>
<tr><td>File "main.py", line 1</td><td>エラーが起きたファイル名と行番号</td></tr>
<tr><td>^（キャレット）</td><td>問題が検出されたおおよその位置</td></tr>
<tr><td>SyntaxError: unterminated string literal</td><td>エラーの種類と内容。「終端されていない文字列リテラル」＝閉じクォートがない</td></tr>
</table>
<p>エラーメッセージは英語ですが、パターンは限られています。「<strong>最後の行にエラーの種類と原因が書いてあり、その上に場所が書いてある</strong>」という構造はどのエラーでも共通です。エラーが出たら慌てずに、まず最後の行を読み、次に行番号の場所を見る。この習慣が身につくと、デバッグ（プログラムの誤りを見つけて直す作業）の速度が大きく変わります。クォートは<code>"</code>で開いたら<code>"</code>で閉じる、<code>'</code>で開いたら<code>'</code>で閉じる、と対で使うのがルールです。</p>`,
      task: `初期コードを実行するとSyntaxErrorが発生します。エラーメッセージを読んで原因の行を特定し、正しく<code>こんにちは、Python</code>と表示されるように修正してください。`,
      code: `# このプログラムには構文エラーがある。実行してエラーメッセージを読んでみよう
print("こんにちは、Python)
`,
      solution: `# 閉じクォートを追加して構文エラーを修正した
print("こんにちは、Python")
`,
      hints: [
        `エラーメッセージの最後の行「unterminated string literal」は「文字列が終端されていない」という意味です。`,
        `文字列の最後に閉じる側の " を追加します。かっこの中が "こんにちは、Python" となればOKです。`
      ],
      expectedOutput: "こんにちは、Python"
    },
    {
      id: 3,
      title: "printで複数の値を表示する（カンマ区切りとsep）",
      explanation: `<p><code>print()</code>のかっこの中には、カンマで区切って<strong>複数の値</strong>を渡せます。渡した値は、標準では半角スペース1つで区切られて1行に表示されます。</p>
<pre><code>print("りんご", "みかん", "ぶどう")</code></pre>
<pre><code>りんご みかん ぶどう</code></pre>
<p>この区切り文字は<code>sep</code>（separatorの略）という指定で自由に変更できます。<code>sep="-"</code>のように、値の並びの最後に「名前=値」の形で書き足します（この書き方はキーワード引数と呼ばれ、第8章で詳しく学びます）。</p>
<pre><code>print("2026", "09", "03", sep="-")
print("080", "1234", "5678", sep="/")
print("すきま", "なし", sep="")</code></pre>
<pre><code>2026-09-03
080/1234/5678
すきまなし</code></pre>
<p><code>sep=""</code>（空文字列）を指定すると、区切りなしでぴったり連結されることも覚えておきましょう。</p>
<p>カンマ区切りが便利なのは、<strong>文字列と数値を混ぜて渡せる</strong>点です。この先のステップで学ぶ変数や計算結果も、そのままカンマで並べて表示できます。「ラベルの文字列＋データの値」をカンマで並べるのは、実務のログ出力やデバッグでも毎日のように使う基本形です。</p>`,
      task: `2つ目の<code>print()</code>に<code>sep="-"</code>を追加して、<code>2026-09-03</code>と表示されるようにしてください。1つ目のprintはそのまま残して、出力の違いを見比べましょう。`,
      code: `# sepを指定しない場合はスペース区切りになる
print("2026", "09", "03")
# TODO: 下の行に sep="-" を追加して 2026-09-03 と表示する
print("2026", "09", "03")
`,
      solution: `# sepを指定しない場合はスペース区切りになる
print("2026", "09", "03")
# sep="-" を指定するとハイフン区切りになる
print("2026", "09", "03", sep="-")
`,
      hints: [
        `sepは、表示したい値をすべて並べたあと、最後にカンマで区切って書きます。`,
        `print("2026", "09", "03", sep="-") の形になります。`
      ],
      expectedOutput: "2026-09-03"
    },
    {
      id: 4,
      title: "コメント（#）",
      explanation: `<p><code>#</code>から行末までは<strong>コメント</strong>として扱われ、プログラムの実行時には完全に無視されます。コメントは「コードを読む人間のためのメモ」で、処理の意図や背景を書き残すために使います。</p>
<pre><code># 消費税率（2026年時点の標準税率）
tax_rate = 0.1
print(tax_rate)  # 行の途中から書くこともできる</code></pre>
<p>コメントには大きく3つの使い道があります。</p>
<table>
<tr><th>使い道</th><th>例</th></tr>
<tr><td>処理の意図・背景を説明する</td><td># 端数は切り捨てる仕様のためintを使う</td></tr>
<tr><td>行の途中に補足を書く</td><td>print(x)  # デバッグ用</td></tr>
<tr><td>コードを一時的に無効化する（コメントアウト）</td><td># print("旧処理")</td></tr>
</table>
<p>逆に、コメントにすべき行を地の文のまま書いてしまうと、Pythonはそれをプログラムとして解釈しようとして<strong>SyntaxError</strong>になります。日本語の説明文はPythonの文法として成立しないからです。このときのメッセージは<code>invalid syntax</code>（解釈できない構文）や<code>invalid character</code>（Pythonの文法で使えない文字。全角の括弧や句読点など）といった形で表示されます。</p>
<p>よいコメントのコツは「<strong>何をしているか」ではなく「なぜそうしているか」を書く</strong>ことです。<code>x = x + 1  # xに1を足す</code>のようなコードを読めば分かるコメントは価値が低く、「なぜ1を足す必要があるのか」を書くと未来の自分や同僚を助けます。なお、コードを長期間コメントアウトしたまま残すのは実務では嫌われます。不要なコードは消すのが原則です。</p>`,
      task: `初期コードの1行目は説明文がそのまま書かれているため、実行するとSyntaxErrorになります。1行目をコメントにして、プログラムが正しく動くように修正してください。`,
      code: `ここからコメント練習用のプログラム（説明のメモ）
print("コメントの練習")
print("この行は実行される")  # この部分は実行されない
`,
      solution: `# ここからコメント練習用のプログラム（説明のメモ）
print("コメントの練習")
print("この行は実行される")  # この部分は実行されない
`,
      hints: [
        `Pythonにとって日本語の説明文は文法違反です。実行時に無視される「コメント」に変える必要があります。`,
        `1行目の先頭に # を付けると、その行全体がコメントになります。`
      ],
      expectedOutput: "コメントの練習"
    },
    {
      id: 5,
      title: "変数への代入",
      explanation: `<p><strong>変数</strong>は、値に名前を付けて保存しておく仕組みです。「名前 = 値」と書くことで、値を変数に<strong>代入</strong>できます。ここでの<code>=</code>は数学の「等しい」ではなく「<strong>右辺の値を左辺の名前に割り当てる</strong>」という意味です。読むときは「nameに"Python"を代入する」と読みます。</p>
<pre><code>name = "Python"
year = 1991
print(name)
print(year)</code></pre>
<pre><code>Python
1991</code></pre>
<p>変数名を書いた場所は、実行時にその中身の値に置き換わります。<code>print(name)</code>はクォートがないので「nameという文字列」ではなく「変数nameの中身」が表示される点に注意してください。<code>print("name")</code>と書くと文字どおり<code>name</code>と表示されてしまいます。</p>
<p>変数名には命名のルールと慣習があります。</p>
<table>
<tr><th>ルール・慣習</th><th>例</th></tr>
<tr><td>英小文字と数字と_（アンダースコア）を使う</td><td>user_name、price2</td></tr>
<tr><td>数字から始めてはいけない（文法エラー）</td><td>2ndPlace は不可</td></tr>
<tr><td>複数の単語は_でつなぐ（スネークケースと呼ぶ）</td><td>total_price、tax_rate</td></tr>
<tr><td>意味の分かる名前にする</td><td>a より price、x1 より user_count</td></tr>
</table>
<p>変数の価値は「同じ値を何度も使い回せる」「値に意味のある名前が付いてコードが読みやすくなる」ことにあります。よい変数名を付ける習慣は、そのままよいプログラマーへの近道です。</p>`,
      task: `TODOの位置で、変数<code>year</code>に整数<code>1991</code>を代入して、プログラムが最後まで動くようにしてください（Pythonが公開された年です）。`,
      code: `name = "Python"
# TODO: 変数yearに1991を代入する

print("言語名:", name)
print("公開年:", year)
`,
      solution: `name = "Python"
year = 1991

print("言語名:", name)
print("公開年:", year)
`,
      hints: [
        `1行目の name = "Python" と同じ「名前 = 値」の形で書きます。`,
        `1991は数値なのでクォートで囲まずに year = 1991 と書きます。`
      ],
      expectedOutput: "公開年: 1991"
    },
    {
      id: 6,
      title: "変数の上書きと入れ替え",
      explanation: `<p>変数には何度でも代入できます。新しく代入すると、前の値は捨てられて<strong>上書き</strong>されます。</p>
<pre><code>level = 1
print(level)
level = 2
print(level)</code></pre>
<pre><code>1
2</code></pre>
<p>また、代入の右辺には変数自身を使えます。<code>level = level + 1</code>は「今のlevelの値に1を足した結果を、あらためてlevelに代入する」という意味で、カウントアップの定番パターンです。右辺が先に計算されてから左辺に代入される、という順序を意識しましょう。</p>
<p>では、2つの変数<code>a</code>と<code>b</code>の中身を入れ替えるにはどうすればよいでしょうか。<code>a = b</code>と書いた瞬間にaの元の値は消えてしまうので、<strong>一時変数（temporary variable、通称temp）</strong>に退避してから移すのが基本手順です。</p>
<pre><code>a = 1
b = 2
temp = a    # aの値を退避する
a = b       # aにbの値を上書きする
b = temp    # 退避しておいた元のaの値をbに入れる</code></pre>
<p>この「退避→上書き→書き戻し」は多くのプログラミング言語に共通する古典的なテクニックです。なおPythonには<code>a, b = b, a</code>と1行で入れ替えられる便利な記法もあります（第4章の多重代入で学びます）が、まずは仕組みが目に見える一時変数方式を確実に理解しておきましょう。</p>`,
      task: `変数<code>temp</code>を使って<code>a</code>と<code>b</code>の中身を入れ替え、<code>a: 紅茶</code>、<code>b: コーヒー</code>と表示されるようにしてください。`,
      code: `a = "コーヒー"
b = "紅茶"

# TODO: 変数tempを使ってaとbの中身を入れ替える（3行になる）

print("a:", a)
print("b:", b)
`,
      solution: `a = "コーヒー"
b = "紅茶"

temp = a
a = b
b = temp

print("a:", a)
print("b:", b)
`,
      hints: [
        `いきなり a = b とするとaの元の値が消えます。まずaの値をtempに退避しましょう。`,
        `temp = a、a = b、b = temp の3行の順番で書きます。`
      ],
      expectedOutput: "a: 紅茶"
    },
    {
      id: 7,
      title: "数値の計算をprintする",
      explanation: `<p>Pythonは高機能な電卓としても使えます。数値はクォートで囲まずにそのまま書き、計算には<strong>演算子</strong>（計算の種類を表す記号）を使います。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>例</th><th>結果</th></tr>
<tr><td>+</td><td>足し算</td><td>100 + 25</td><td>125</td></tr>
<tr><td>-</td><td>引き算</td><td>100 - 25</td><td>75</td></tr>
<tr><td>*</td><td>掛け算</td><td>100 * 25</td><td>2500</td></tr>
<tr><td>/</td><td>割り算</td><td>100 / 25</td><td>4.0</td></tr>
</table>
<p>掛け算が×ではなく<code>*</code>（アスタリスク）、割り算が÷ではなく<code>/</code>（スラッシュ）なのは、キーボードにある記号を使うためです。ここで最重要の注意点があります。<strong>クォートで囲むと計算されません</strong>。</p>
<pre><code>print("100 + 25")
print(100 + 25)</code></pre>
<pre><code>100 + 25
125</code></pre>
<p>クォートで囲んだ<code>"100 + 25"</code>は「1、0、0、スペース、+…という文字の並び」つまりただの文字列なので、そのまま表示されます。クォートを外すと計算式として評価（式を計算して値を求めること）され、結果の値が表示されます。「クォートがあれば文字列、なければプログラムの部品」という区別は、この先ずっと付いて回る重要な感覚です。変数と組み合わせて<code>print(price * 3)</code>のように書けるようになると、プログラムらしさが一気に増します。</p>`,
      task: `2つ目の<code>print()</code>のクォートを外して、計算結果の<code>125</code>が表示されるようにしてください。1つ目はそのまま残して出力を見比べましょう。`,
      code: `# クォートで囲むと文字列としてそのまま表示される
print("100 + 25")
# TODO: 下の行のクォートを外して、計算結果の125が表示されるようにする
print("100 + 25")
`,
      solution: `# クォートで囲むと文字列としてそのまま表示される
print("100 + 25")
# クォートを外すと計算式として評価され、結果が表示される
print(100 + 25)
`,
      hints: [
        `クォートで囲まれている間は、+も含めてただの「文字」として扱われます。`,
        `print(100 + 25) のように、かっこの中を裸の数式にします。`
      ],
      expectedOutput: "125"
    },
    {
      id: 8,
      title: "NameError体験：変数名のtypoを直す",
      explanation: `<p>定義していない名前を使おうとすると<strong>NameError</strong>が発生します。原因の大半は変数名の打ち間違い（typo）です。実行すると次のような<strong>トレースバック</strong>（エラーに至るまでの実行経路の表示）が出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 2, in &lt;module&gt;
    print(mesage)
NameError: name 'mesage' is not defined. Did you mean: 'message'?</code></pre>
<p>読み方はSyntaxErrorのときと同じで、<strong>まず最後の行</strong>です。</p>
<table>
<tr><th>部分</th><th>意味</th></tr>
<tr><td>NameError</td><td>エラーの種類：未定義の名前を使った</td></tr>
<tr><td>name 'mesage' is not defined</td><td>「mesageという名前は定義されていない」</td></tr>
<tr><td>Did you mean: 'message'?</td><td>「messageの間違いでは？」というPythonからの修正候補の提案</td></tr>
<tr><td>File "main.py", line 2</td><td>エラーが起きた場所（2行目）</td></tr>
</table>
<p>近年のPythonは、定義済みの変数の中から似た名前を探して<code>Did you mean</code>で提案してくれます。この提案とエラー行の表示を突き合わせれば、typoは数秒で直せます。</p>
<p>SyntaxErrorが「実行前の文法チェック」で見つかるのに対し、NameErrorは「実行してその行に到達したとき」に発生する<strong>実行時エラー</strong>です。つまりエラー行より前までの処理は実行されています。この違いを知っておくと、エラーの原因調査がぐっと楽になります。</p>`,
      task: `初期コードを実行するとNameErrorが発生します。トレースバックの<code>Did you mean</code>の提案を参考に、変数名のtypoを修正してください。`,
      code: `message = "おはようございます"
print(mesage)
`,
      solution: `message = "おはようございます"
print(message)
`,
      hints: [
        `1行目で定義した変数名と、2行目で使っている変数名を1文字ずつ見比べてみましょう。`,
        `2行目の mesage は s が1つ足りません。message に直します。`
      ],
      expectedOutput: "おはようございます"
    },
    {
      id: 9,
      title: "endによる改行制御",
      explanation: `<p><code>print()</code>は、表示の最後に自動で<strong>改行</strong>を付け加えます。だからprintを2回呼ぶと2行に分かれるのです。この「最後に付ける文字」は<code>end</code>という指定で変更できます。標準では<code>end="\\n"</code>（\\nは改行を表す特殊な文字。第3章で詳しく学びます）になっています。</p>
<pre><code>print("読み込み中", end="")
print("...", end="")
print("完了")</code></pre>
<pre><code>読み込み中...完了</code></pre>
<p><code>end=""</code>（空文字列）を指定すると改行されず、次のprintの出力が同じ行に続きます。最後のprintだけendを指定しなければ、そこで通常どおり改行されます。</p>
<table>
<tr><th>指定</th><th>動作</th></tr>
<tr><td>指定なし</td><td>最後に改行する（標準の動作）</td></tr>
<tr><td>end=""</td><td>改行しない。次の出力が同じ行に続く</td></tr>
<tr><td>end=" "</td><td>改行の代わりにスペースを付ける</td></tr>
<tr><td>end="---"</td><td>改行の代わりに任意の文字列を付ける</td></tr>
</table>
<p>前のステップで学んだ<code>sep</code>が「値と値の<strong>間</strong>」の区切りを決めるのに対し、<code>end</code>は「出力の<strong>最後</strong>」に付く文字を決めます。両方同時に指定することもできます。進捗表示のように1行に出力を継ぎ足していく場面や、出力のレイアウトを細かく整えたい場面で活躍する、地味ながら実用的な機能です。</p>`,
      task: `最初の2つの<code>print()</code>に<code>end=""</code>を追加して、3つの出力が<code>読み込み中...完了</code>と1行につながって表示されるようにしてください。`,
      code: `# TODO: 1行で「読み込み中...完了」と表示されるように、
# 最初の2つのprintにend=""を追加する
print("読み込み中")
print("...")
print("完了")
`,
      solution: `# end=""を指定すると改行されず、次の出力が同じ行に続く
print("読み込み中", end="")
print("...", end="")
print("完了")
`,
      hints: [
        `printは標準で最後に改行します。改行させたくないprintに end="" を指定します。`,
        `print("読み込み中", end="") のように、表示する値のあとにカンマで区切って書きます。最後のprintはそのままでOKです。`
      ],
      expectedOutput: "読み込み中...完了"
    },
    {
      id: 10,
      title: "総合演習：自己紹介の整形出力",
      explanation: `<p>第1章の総仕上げとして、これまで学んだ要素を組み合わせて自己紹介プログラムを完成させます。使う道具を振り返りましょう。</p>
<table>
<tr><th>道具</th><th>書き方</th><th>学んだステップ</th></tr>
<tr><td>print関数</td><td>print("こんにちは")</td><td>ステップ1</td></tr>
<tr><td>カンマ区切りの複数表示</td><td>print("年齢:", 25)</td><td>ステップ3</td></tr>
<tr><td>sepによる区切り指定</td><td>print("a", "b", sep="/")</td><td>ステップ3</td></tr>
<tr><td>コメント</td><td># メモ</td><td>ステップ4</td></tr>
<tr><td>変数への代入</td><td>name = "山田"</td><td>ステップ5</td></tr>
<tr><td>endによる改行制御</td><td>print("x", end="")</td><td>ステップ9</td></tr>
</table>
<p>ポイントは、データ（名前・年齢・趣味）を先に変数へまとめておき、表示部分では変数を参照することです。こうすると、あとで名前を変えたいときに<strong>代入の1行を直すだけ</strong>で済み、表示部分には手を入れずに済みます。「データと表示の分離」という、実務のプログラム設計にも通じる考え方の入り口です。</p>
<pre><code>item = "りんご"
count = 3
print("商品:", item)
print("個数:", count, "個")</code></pre>
<pre><code>商品: りんご
個数: 3 個</code></pre>
<p>カンマ区切りでは値の間に自動でスペースが1つ入ること、<code>sep</code>や<code>end</code>は値を全部並べた最後に書くことに注意して、TODOを1つずつ埋めていきましょう。</p>`,
      task: `TODOを埋めて、「名前: 山田太郎」「年齢: 25 歳」「趣味/読書」「よろしくお願いします！」の4行が表示されるプログラムを完成させてください。変数の値はそのまま使います。`,
      code: `# 自己紹介プログラム
name = "山田太郎"
age = 25
hobby = "読書"

# TODO: カンマ区切りを使って「名前: 山田太郎」と表示する

# TODO: カンマ区切りを使って「年齢: 25 歳」と表示する

# TODO: sep="/"を使って「趣味/読書」と表示する

# TODO: end=""を使って「よろしく」と「お願いします！」を1行で表示する
print("よろしく")
print("お願いします！")
`,
      solution: `# 自己紹介プログラム
name = "山田太郎"
age = 25
hobby = "読書"

print("名前:", name)
print("年齢:", age, "歳")
print("趣味", hobby, sep="/")
print("よろしく", end="")
print("お願いします！")
`,
      hints: [
        `「名前: 山田太郎」は print("名前:", name) で作れます。カンマ区切りは自動でスペースが1つ入ります。`,
        `「年齢: 25 歳」は3つの値をカンマで並べます。数値の変数ageもそのまま渡せます。`,
        `「趣味/読書」はスペースを入れたくないので、sep="/" を最後に指定します。`
      ],
      expectedOutput: "趣味/読書"
    }
  ]
});
