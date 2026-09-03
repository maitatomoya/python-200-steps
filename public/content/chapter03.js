// 第3章：文字列とf-string
registerChapter({
  number: 3,
  title: "文字列とf-string",
  description: "文字列の作り方・切り出し・メソッドによる加工と、f-stringによる整形出力を学びます。実務のコードで毎日使う最重要の基礎です。",
  steps: [
    {
      id: 21,
      title: "文字列リテラル（'と\"）とエスケープシーケンス",
      explanation: `<p>文字列（テキストデータ）は、シングルクォート（'）またはダブルクォート（"）で囲んで作ります。このようにコードへ直接書いた値のことをリテラルと呼びます。どちらのクォートで囲んでも意味はまったく同じですが、文字列の中にクォート自身を含めたいときは囲む記号を使い分けると便利です。</p>
<pre><code>print('It is a pen')       # シングルクォートで囲む
print("It's a pen")        # 中に'があるときはダブルクォートで囲む
print('He said "Hi"')      # 中に"があるときはシングルクォートで囲む</code></pre>
<p>もうひとつの道具が<strong>エスケープシーケンス</strong>（バックスラッシュ\\で始まる特殊な文字表記）です。改行やタブのような「見えない文字」や、囲み記号と同じクォートを文字列の中に書きたいときに使います。</p>
<table>
<tr><th>表記</th><th>意味</th></tr>
<tr><td><code>\\n</code></td><td>改行</td></tr>
<tr><td><code>\\t</code></td><td>タブ（位置を揃える空白）</td></tr>
<tr><td><code>\\\\</code></td><td>バックスラッシュそのもの</td></tr>
<tr><td><code>\\'</code></td><td>シングルクォート</td></tr>
<tr><td><code>\\"</code></td><td>ダブルクォート</td></tr>
</table>
<pre><code>print("1行目\\n2行目")    # \\nの位置で改行される
print("名前\\t年齢")      # \\tはタブ</code></pre>
<p>クォートを閉じ忘れたり、中に書いたクォートで文字列が途中で終わってしまうと、SyntaxError（構文エラー）になります。エラーメッセージには問題の行が表示されるので、クォートの対応を確認する習慣をつけましょう。実務ではどちらのクォートを使うかをプロジェクト内で統一するのが一般的で、フォーマッタ（コードを自動整形するツール）が揃えてくれることも多いです。</p>`,
      task: `1つ目の文字列は中にシングルクォートを含むためSyntaxErrorになります。ダブルクォートで囲んで直してください。さらに、<code>\\n</code>を使って「1行目」と「2行目」を2行に分けて表示してください。`,
      code: `# 文字列の中に'があるため、ここでSyntaxErrorになる
message = 'It's a pen'
print(message)

# TODO: エスケープシーケンスを使って「1行目」と「2行目」を2行に分けて表示する
print("1行目2行目")
`,
      solution: `# 中に'を含む文字列は、ダブルクォートで囲むと安全
message = "It's a pen"
print(message)

# \\nを使うと文字列の途中で改行できる
print("1行目\\n2行目")
`,
      hints: [
        `文字列の中に'を含めたいときは、外側を"で囲むと'をそのまま書けます。`,
        `改行したい位置に\\nを書きます。\\nは2文字に見えますが「改行1文字」を表します。`
      ],
      expectedOutput: "It's a pen"
    },
    {
      id: 22,
      title: "連結と繰り返し（+と*）",
      explanation: `<p>文字列は<code>+</code>で連結、<code>*</code>で繰り返しができます。数値の足し算・掛け算と同じ記号ですが、対象が文字列だと意味が変わります。</p>
<pre><code>first = "Py"
second = "thon"
print(first + second)   # Python
print("-" * 10)         # ----------（10回繰り返し）</code></pre>
<p>注意点は、<code>+</code>で連結できるのは<strong>文字列同士だけ</strong>ということです。文字列と数値を+で繋ぐと、TypeError（型の不一致エラー）になります。第2章で学んだint()・float()の仲間である<code>str()</code>を使って、数値を文字列に変換してから連結します。</p>
<pre><code>version = 3
print("Python" + str(version))   # str()で"3"に変換してから連結</code></pre>
<p>Pythonが自動で型変換しないのは、たとえば「"1" + 1」を数値の2にしたいのか文字列の"11"にしたいのか、意図が曖昧になるのを防ぐためです。この「曖昧なことは黙って処理せずエラーにする」姿勢はPythonの設計思想そのもので、エラーメッセージも「can only concatenate str (not "int") to str」（strにはstrしか連結できない）と原因をはっきり教えてくれます。</p>
<p>区切り線を「-」の繰り返しで作るテクニックは、実行結果を見やすくするためによく使われます。またこの後のステップで学ぶf-stringを使うと、str()による変換なしで数値を文字列へ埋め込めるようになります。まずは「+は同じ型同士」という原則を押さえましょう。</p>`,
      task: `<code>name + version</code>は文字列と数値の連結なのでTypeErrorになります。str()でversionを文字列に変換してから連結するように修正してください。`,
      code: `name = "Python"
version = 3
# TODO: このままだとTypeErrorになる。str()で数値を文字列に変換してから連結する
label = name + version
print(label)

# 文字列に*を使うと繰り返しになる
line = "-" * 10
print(line)
`,
      solution: `name = "Python"
version = 3
# str()で数値を文字列に変換してから連結する
label = name + str(version)
print(label)

# 文字列に*を使うと繰り返しになる
line = "-" * 10
print(line)
`,
      hints: [
        `TypeErrorのメッセージ「can only concatenate str (not "int") to str」は「文字列には文字列しか連結できない」という意味です。`,
        `str(version)と書くと、数値の3が文字列の"3"になります。`
      ],
      expectedOutput: "Python3"
    },
    {
      id: 23,
      title: "len()",
      explanation: `<p><code>len()</code>は、文字列の長さ（文字数）を返す組み込み関数です。半角も全角も1文字は1と数え、空白や記号も含みます。</p>
<pre><code>print(len("Python"))      # 6
print(len("こんにちは"))    # 5（日本語も1文字ずつ数える）
print(len(""))            # 0（空文字列）
print(len("a b"))         # 3（空白も1文字と数える）</code></pre>
<p>lenは英語のlength（長さ）の略です。第2章のmin・max・absと同じ組み込み関数なので、importなどの準備なしでいつでも使えます。</p>
<p>実務では、入力された文字列の長さチェックで頻繁に登場します。「パスワードは8文字以上か」「投稿は140文字以内か」といった検証は、すべてlen()が出発点です。また、次章で学ぶリストにもlen()はそのまま使えて「要素がいくつあるか」を返します。「長さや個数を知りたければlen()」というルールはPython全体で一貫しています。</p>
<p>ひとつ注意したいのは、len()が数えるのは「見た目の幅」ではなく「文字の個数」だということです。全角文字は画面上では半角2文字ぶんの幅がありますが、len()では1と数えます。また、len()は関数なのでlen("abc")と書きます。この章で学ぶupper()などのメソッドの形（"abc".len()）では書けない、という違いも次のステップ以降で意識してみてください。</p>`,
      task: `2つ目のprintを修正して、greetingの文字数をlen()で数えて表示してください。`,
      code: `word = "programming"
print("文字数:", len(word))

greeting = "Hello, Python!"
# TODO: len()を使ってgreetingの文字数を表示する
print("文字数:", 0)
`,
      solution: `word = "programming"
print("文字数:", len(word))

greeting = "Hello, Python!"
# len()は空白や記号も1文字と数える
print("文字数:", len(greeting))
`,
      hints: [
        `len(調べたい文字列)の形で呼び出すと、文字数が数値で返ってきます。`,
        `1つ目のprintと同じ形で、対象の変数だけをgreetingに変えます。`
      ],
      expectedOutput: "文字数: 14"
    },
    {
      id: 24,
      title: "インデックス（正・負）",
      explanation: `<p>文字列の各文字には<strong>インデックス</strong>（位置を表す番号）が付いていて、<code>文字列[番号]</code>で1文字を取り出せます。最重要ポイントは<strong>先頭が0番</strong>だということです。</p>
<table>
<tr><th>文字</th><td>P</td><td>y</td><td>t</td><td>h</td><td>o</td><td>n</td></tr>
<tr><th>正のインデックス</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>負のインデックス</th><td>-6</td><td>-5</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr>
</table>
<pre><code>word = "Python"
print(word[0])     # P（先頭は0番）
print(word[1])     # y
print(word[-1])    # n（-1は末尾）
print(word[-2])    # o（後ろから2番目）</code></pre>
<p>負のインデックスは「後ろから数えた位置」で、-1が最後の文字です。文字数を調べてから末尾を計算しなくても、word[-1]と書くだけで末尾にアクセスできる、Pythonらしい便利な記法です。</p>
<p>存在しない位置を指定するとIndexError（範囲外アクセスのエラー）になります。"Python"は6文字なので有効な正のインデックスは0〜5で、word[6]はエラーです。「n文字の文字列の最後はn-1番」という1のズレは、プログラミング全般で最もよくあるバグの一種（off-by-oneエラーと呼ばれます）の原因なので、最初に体へ染み込ませておく価値があります。なお、インデックスで取り出せるのは1文字だけです。複数文字をまとめて取り出す方法は、次のステップのスライスで学びます。</p>`,
      task: `3つ目のprintを修正して、負のインデックスでwordの最後の文字「n」を表示してください。`,
      code: `word = "Python"
print("先頭:", word[0])
print("3文字目:", word[2])
# TODO: 負のインデックスで最後の文字を表示する
print("最後:", word[0])
`,
      solution: `word = "Python"
print("先頭:", word[0])
print("3文字目:", word[2])
# -1は「後ろから1番目」つまり最後の文字
print("最後:", word[-1])
`,
      hints: [
        `-1は「後ろから1番目」、つまり最後の文字を指します。文字数を数える必要はありません。`,
        `角括弧の中に負の数を書くだけで、後ろから数えた位置になります。`
      ],
      expectedOutput: "最後: n"
    },
    {
      id: 25,
      title: "スライス",
      explanation: `<p><strong>スライス</strong>は、<code>文字列[開始:終了]</code>の形で文字列の一部分を切り出す記法です。ポイントは「開始のインデックスは含み、<strong>終了のインデックスは含まない</strong>」ことです。</p>
<pre><code>word = "Pythonista"
print(word[0:6])    # Python（0番から5番まで。6番は含まない）
print(word[:6])     # Python（開始を省略すると先頭から）
print(word[6:])     # ista（終了を省略すると末尾まで）
print(word[-4:])    # ista（負のインデックスも使える）</code></pre>
<p>「終了を含まない」仕様は一見不便に思えますが、<code>word[:n]</code>がちょうどn文字になる、<code>word[:k]</code>と<code>word[k:]</code>を繋ぐと元に戻る、という2つの計算のしやすさがあり、多くの言語で採用されている方式です。</p>
<p>さらに<code>[開始:終了:ステップ]</code>と3つ目の数を書くと「何文字おきに取るか」を指定できます。</p>
<pre><code>print(word[::2])     # Ptoit（1文字おき）
print(word[::-1])    # atsinohtyP（ステップ-1で逆順）</code></pre>
<p>1文字だけ取り出すインデックスと違い、スライスは範囲外を指定してもエラーにならず、ある範囲だけを返します（word[0:100]は全体が返ります）。この挙動の使いどころと注意点は第23章で詳しく扱います。スライスは次章のリストでもまったく同じ形で使える、Pythonの中核記法です。切り出した結果は新しい文字列で、元のwordは変わらないことも覚えておきましょう。</p>`,
      task: `最後のprintを修正して、スライスでwordから「thon」を切り出し、「抜き出し: thon」と表示してください。`,
      code: `word = "Pythonista"
print(word[0:6])
print(word[6:])
# TODO: スライスで「thon」を切り出す
print("抜き出し:", word[0:0])
`,
      solution: `word = "Pythonista"
print(word[0:6])
print(word[6:])
# 開始2番から、終了6番の直前（5番）まで
print("抜き出し:", word[2:6])
`,
      hints: [
        `「thon」のtはインデックス2番、nは5番にあります。`,
        `終了には「最後に欲しい文字の次の番号」を書きます。終了の位置自体は含まれません。`
      ],
      expectedOutput: "抜き出し: thon"
    },
    {
      id: 26,
      title: "upper・lower・strip",
      explanation: `<p>文字列には、その値自身に対して<code>値.名前()</code>の形で呼び出せる<strong>メソッド</strong>（値に紐づいた関数）が多数用意されています。まずは使用頻度の高い3つを覚えましょう。</p>
<table>
<tr><th>メソッド</th><th>働き</th></tr>
<tr><td><code>upper()</code></td><td>すべて大文字にした新しい文字列を返す</td></tr>
<tr><td><code>lower()</code></td><td>すべて小文字にした新しい文字列を返す</td></tr>
<tr><td><code>strip()</code></td><td>前後の空白・改行を取り除いた新しい文字列を返す</td></tr>
</table>
<pre><code>word = "Python"
print(word.upper())    # PYTHON
print(word.lower())    # python
raw = "  hello  "
print(raw.strip())     # hello（前後の空白が消える）</code></pre>
<p>重要な性質が2つあります。1つ目は、これらのメソッドは<strong>元の文字列を変えず、新しい文字列を返す</strong>ことです。word.upper()を呼んでもwordは"Python"のままです。Pythonの文字列は一度作ると中身を変更できない性質（イミュータブルと言います）を持つため、文字列メソッドはすべて「加工した新しい文字列を返す」設計になっています。結果を使いたければ変数に代入するか、その場でprintに渡します。</p>
<p>2つ目は、メソッドはドットで繋げて連続適用できることです。</p>
<pre><code>messy = "  Hello World  "
print(messy.strip().upper())   # HELLO WORLD</code></pre>
<p>strip()は、ユーザー入力や外部データの前後に紛れ込む余計な空白・改行を取り除く定番処理で、実務のデータ整形で毎日のように使います。upper()・lower()は「PYTHON」「python」「Python」を同じものとして比較したいときの前処理として使われます。</p>`,
      task: `1つ目のprintではstrip()で前後の空白を取り除いた文字列を[ ]の中に表示し、最後のprintではlower()でwordを小文字にして表示してください。`,
      code: `raw = "  Hello Python  "
# TODO: strip()で前後の空白を取り除いてから連結する
print("[" + raw + "]")

word = "Python"
print(word.upper())
# TODO: lower()で小文字にして表示する
print(word)
`,
      solution: `raw = "  Hello Python  "
# strip()は前後の空白を取り除いた新しい文字列を返す
print("[" + raw.strip() + "]")

word = "Python"
print(word.upper())
print(word.lower())
`,
      hints: [
        `メソッドは「変数名.メソッド名()」の形で呼び出します。`,
        `raw.strip()の戻り値は空白を除いた新しい文字列なので、そのまま+で連結できます。`
      ],
      expectedOutput: "[Hello Python]"
    },
    {
      id: 27,
      title: "replace・find・in演算子",
      explanation: `<p>文字列の検索・置換でよく使う3つの道具を学びます。</p>
<table>
<tr><th>道具</th><th>働き</th></tr>
<tr><td><code>replace(a, b)</code></td><td>aをbに置き換えた新しい文字列を返す</td></tr>
<tr><td><code>find(a)</code></td><td>aが最初に現れる位置を返す。見つからなければ-1</td></tr>
<tr><td><code>a in s</code></td><td>aがsに含まれていればTrue、いなければFalse</td></tr>
</table>
<pre><code>text = "I like Java"
print(text.replace("Java", "Python"))   # I like Python

sentence = "Python is fun"
print(sentence.find("is"))     # 7（先頭から数えた位置）
print(sentence.find("xyz"))    # -1（見つからないとき）
print("fun" in sentence)       # True</code></pre>
<p><code>in</code>はメソッドではなく演算子で、結果は<strong>True/False（真偽値。成り立つかどうかを表す値）</strong>になります。真偽値は第6章の条件分岐で主役になりますが、printで表示して観察することはもうできます。</p>
<p>使い分けの目安は「位置まで知りたいならfind、含まれるかだけ知りたいならin」です。findが見つからないときに返す-1は、0以上の正常な位置と区別するための約束ですが、この-1をうっかり位置として使ってしまうバグが定番です。存在チェックだけが目的なら、inの方が安全で意図も伝わります。</p>
<p>replaceも前のステップのメソッドと同じく<strong>元の文字列は変えず</strong>、置き換え後の新しい文字列を返します。text自体を更新したいときは、text = text.replace("Java", "Python")のように代入し直します。</p>`,
      task: `1つ目のprintを修正して、replaceでtextの「Java」を「Python」に置き換えた結果を表示してください。`,
      code: `text = "I like Java"
# TODO: replaceで「Java」を「Python」に置き換えた結果を表示する
print(text)

sentence = "Python is fun"
print("isの位置:", sentence.find("is"))
print("funを含む:", "fun" in sentence)
`,
      solution: `text = "I like Java"
# replaceは置き換えた「新しい文字列」を返す（元のtextは変わらない）
print(text.replace("Java", "Python"))

sentence = "Python is fun"
print("isの位置:", sentence.find("is"))
print("funを含む:", "fun" in sentence)
`,
      hints: [
        `replaceは「置き換えた結果の新しい文字列」を返します。元のtextは変わりません。`,
        `replace(置き換え前, 置き換え後)の順で2つの文字列を渡し、結果をprintに渡します。`
      ],
      expectedOutput: "I like Python"
    },
    {
      id: 28,
      title: "f-stringの基本（値と式の埋め込み）",
      explanation: `<p><strong>f-string</strong>（フォーマット済み文字列リテラル）は、文字列の中に変数や式を直接埋め込める記法です。クォートの前に<code>f</code>を付け、埋め込みたい場所を<code>{}</code>で囲みます。Python 3.6で導入されて以来、出力整形の第一選択になっています。</p>
<pre><code>name = "佐藤"
age = 28
print(f"{name}さんは{age}歳です")   # 佐藤さんは28歳です</code></pre>
<p>これまで使ってきた方法と比べてみましょう。</p>
<table>
<tr><th>方法</th><th>書き方</th><th>難点</th></tr>
<tr><td>カンマ区切り</td><td><code>print("age:", age)</code></td><td>区切りの空白が入り、細かい整形がしづらい</td></tr>
<tr><td>+連結</td><td><code>"age:" + str(age)</code></td><td>str()変換が必要で長くなる</td></tr>
<tr><td>f-string</td><td><code>f"age:{age}"</code></td><td>変換不要で、完成形がそのまま見える</td></tr>
</table>
<p><code>{}</code>の中には変数だけでなく<strong>式</strong>も書けます。計算結果をその場で埋め込めるので、一時変数を減らせます。</p>
<pre><code>price = 120
count = 3
print(f"合計は{price * count}円です")   # 合計は360円です</code></pre>
<p>数値を埋め込むときにstr()による変換が要らないのもf-stringの利点で、{}の中の値は自動で文字列になります。なお、{という文字そのものを表示したいときは{{のように2つ重ねて書きます。f-stringは「読んだときに完成形が想像できる」ことが最大の価値です。これ以降の章では、出力の整形にf-stringを積極的に使っていきます。</p>`,
      task: `2つのprintをf-stringに書き換えて、「佐藤さんは28歳です」「合計は360円です」と表示してください。合計は<code>{}</code>の中で式を計算します。`,
      code: `name = "佐藤"
age = 28
# TODO: f-stringを使って「佐藤さんは28歳です」と表示する
print(name + "さんは" + "歳です")

price = 120
count = 3
# TODO: f-stringの中で式を計算して「合計は360円です」と表示する
print("合計は円です")
`,
      solution: `name = "佐藤"
age = 28
# クォートの前にfを付け、{}の中に変数を書く
print(f"{name}さんは{age}歳です")

price = 120
count = 3
# {}の中には式も書ける
print(f"合計は{price * count}円です")
`,
      hints: [
        `クォートの前にfを付け、埋め込みたい場所を{}で囲みます。`,
        `1つ目は{}の中に変数名だけを書きます。数値でもstr()は不要です。`,
        `2つ目は{}の中にprice * countのような式をそのまま書けます。`
      ],
      expectedOutput: "佐藤さんは28歳です"
    },
    {
      id: 29,
      title: "f-stringの書式指定（:.2f・桁区切り・幅揃え）",
      explanation: `<p>f-stringの<code>{}</code>の中では、コロンに続けて<strong>書式指定</strong>（表示形式の指示）を書けます。よく使うものを覚えると、出力の見た目を一気に整えられます。</p>
<table>
<tr><th>書式</th><th>意味</th><th>例</th></tr>
<tr><td><code>:.2f</code></td><td>小数第2位まで表示</td><td>3.14159 → 3.14</td></tr>
<tr><td><code>:,</code></td><td>3桁区切りのカンマ</td><td>1234567 → 1,234,567</td></tr>
<tr><td><code>:&gt;8</code></td><td>幅8で右寄せ</td><td>150 →「     150」</td></tr>
<tr><td><code>:&lt;8</code></td><td>幅8で左寄せ</td><td>150 →「150     」</td></tr>
<tr><td><code>:^8</code></td><td>幅8で中央寄せ</td><td>150 →「  150   」</td></tr>
</table>
<pre><code>pi = 3.14159265
print(f"{pi:.2f}")           # 3.14（四捨五入して2桁）

population = 125000000
print(f"{population:,}")     # 125,000,000

price = 150
print(f"{price:&gt;8}円")       # 幅8で右寄せ</code></pre>
<p>組み合わせも可能で、<code>:,.2f</code>と書けば「3桁区切り＋小数第2位まで」になります。金額の表示で定番の形です。</p>
<pre><code>total = 1234567.891
print(f"{total:,.2f}円")     # 1,234,567.89円</code></pre>
<p>第2章で学んだ浮動小数点の誤差への対策としても書式指定は有効です。round()が値そのものを丸めるのに対し、書式指定は<strong>表示だけを丸める</strong>ので、計算には元の精度を保ちつつ、人に見せる桁だけ整えられます。これが実務の定石です。幅寄せは、複数行の出力で桁を揃えて表のように見せたいときに活躍します。</p>`,
      task: `piは<code>:.2f</code>で小数第2位まで、populationは<code>:,</code>で3桁区切りにして表示されるように、2つのf-stringへ書式指定を追加してください。`,
      code: `pi = 3.14159265
# TODO: 小数第2位までで表示する（書式指定:.2f）
print(f"円周率は{pi}です")

population = 125000000
# TODO: 3桁区切りで表示する（書式指定:,）
print(f"人口は{population}人です")

item = "りんご"
price = 150
print(f"{item}は{price:>5}円")
`,
      solution: `pi = 3.14159265
# 変数名の後にコロンで書式指定を続ける
print(f"円周率は{pi:.2f}です")

population = 125000000
print(f"人口は{population:,}人です")

item = "りんご"
price = 150
# :>5は「5文字ぶんの幅で右寄せ」の意味
print(f"{item}は{price:>5}円")
`,
      hints: [
        `書式指定は{変数名:書式}のように、変数名の後にコロンで続けて書きます。`,
        `小数の桁数は.2fのように「.桁数f」で指定します。`,
        `3桁区切りは、コロンの後にカンマを1つ書くだけです。`
      ],
      expectedOutput: "人口は125,000,000人です"
    },
    {
      id: 30,
      title: "総合演習（プロフィールカードの整形出力）",
      explanation: `<p>第3章の総仕上げとして、プロフィールカードを整形して出力します。使うのはこの章で学んだ道具だけです。</p>
<table>
<tr><th>道具</th><th>この演習での役割</th></tr>
<tr><td><code>*</code>による繰り返し</td><td>区切り線を作る</td></tr>
<tr><td><code>upper()</code></td><td>名前を大文字にする</td></tr>
<tr><td><code>len()</code></td><td>趣味の文字数を数える</td></tr>
<tr><td>f-string</td><td>値の埋め込み</td></tr>
<tr><td><code>:.1f</code></td><td>身長を小数第1位までにする</td></tr>
</table>
<p>整形出力のコツは、「データ」と「見た目」を分けて考えることです。変数にはデータをそのまま持たせておき、表示の瞬間にf-stringで整えます。たとえば身長は162.48という元の値を保ったまま、表示だけを:.1fで丸めます。データを先にround()で丸めてしまうと、後で正確な値が必要になったときに困るためです。</p>
<pre><code>name = "sato yuki"
line = "-" * 24
print(line)
print(f"NAME  : {name.upper()}")</code></pre>
<p>このように、f-stringの{}の中では変数だけでなく、name.upper()のような<strong>メソッド呼び出し</strong>やlen(hobby)のような<strong>関数呼び出し</strong>もそのまま書けます。短い式なら{}内に直接書き、長く複雑になるなら一度変数に受けてから埋め込むと読みやすさを保てます。目安は「1つの{}に1つの処理」です。</p>
<p>ラベルの後ろに空白を足して「NAME  :」「AGE   :」のようにコロンの位置を揃えるのも、出力を読みやすくする実務的な小技です。今回は手で空白を入れて揃えていますが、項目が増えてきたら前ステップの幅寄せで機械的に揃えることもできます。</p>`,
      task: `TODOの3か所を修正して、名前は大文字、身長は小数第1位まで、趣味は「camera(6文字)」の形式で表示されるプロフィールカードを完成させてください。`,
      code: `name = "sato yuki"
age = 29
height = 162.48
hobby = "camera"

line = "-" * 24
print(line)
# TODO: nameを大文字にして表示する
print(f"NAME  : {name}")
print(f"AGE   : {age}歳")
# TODO: heightを:.1fで小数第1位までにして表示する
print(f"HEIGHT: {height}cm")
# TODO: hobbyの後ろに(6文字)のようにlen()で数えた文字数を付ける
print(f"HOBBY : {hobby}")
print(line)
`,
      solution: `name = "sato yuki"
age = 29
height = 162.48
hobby = "camera"

line = "-" * 24
print(line)
# {}の中ではメソッド呼び出しも書ける
print(f"NAME  : {name.upper()}")
print(f"AGE   : {age}歳")
# 値はそのまま、表示だけを:.1fで丸める
print(f"HEIGHT: {height:.1f}cm")
# {}の中では関数呼び出しも書ける
print(f"HOBBY : {hobby}({len(hobby)}文字)")
print(line)
`,
      hints: [
        `f-stringの{}の中では、name.upper()のようなメソッド呼び出しもそのまま書けます。`,
        `小数の桁指定は{height:.1f}のように、変数名の後にコロンで続けます。`,
        `文字数はlen(hobby)で得られ、その結果を{}に埋め込めます。`
      ],
      expectedOutput: "HEIGHT: 162.5cm"
    }
  ]
});
