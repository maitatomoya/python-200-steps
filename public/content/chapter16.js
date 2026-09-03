// 第16章：文字列処理と正規表現
registerChapter({
  number: 16,
  title: "文字列処理と正規表現",
  description: "split・joinなどの文字列メソッドを整理し、パターンでテキストを検索・抽出・置換する正規表現（reモジュール）の基本を身につけます。",
  steps: [
    {
      id: 151,
      title: "split・join",
      explanation: `<p>テキスト処理の基本中の基本が「分割」と「連結」です。CSVデータの読み取り、ログの解析、単語の切り出しなど、実務のテキスト処理はほぼ必ずこの2つから始まります。</p>
<h4>split：文字列をリストに分割する</h4>
<pre><code>csv_line = "apple,banana,cherry"
print(csv_line.split(","))   # ['apple', 'banana', 'cherry']

text = "  Python  is  fun  "
print(text.split())          # ['Python', 'is', 'fun']</code></pre>
<p><code>文字列.split(区切り文字)</code>は、区切り文字で切り分けたリストを返します。注目すべきは<strong>引数なしのsplit()</strong>の特別な動作です。任意の連続する空白（スペース・タブ・改行）で分割し、先頭・末尾の空白は無視されます。<code>split(" ")</code>だと連続スペースの間に空文字列<code>''</code>が入ってしまうので、自然文を単語に分けるときは引数なしが定石です。</p>
<h4>join：リストを1つの文字列に連結する</h4>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(" / ".join(fruits))  # apple / banana / cherry
print("".join(["a", "b", "c"]))  # abc（区切りなし連結）</code></pre>
<p>joinは<code>"区切り文字".join(リスト)</code>という形で、<strong>区切り文字側のメソッド</strong>である点が初学者のつまずきポイントです。「リスト.join(...)ではない」と覚えてください。この設計のおかげで、リストだけでなくタプルやジェネレータなど任意のイテラブルを連結できます。なお、要素に数値が混ざっていると<code>TypeError</code>になるため、<code>str()</code>で文字列化してから連結します。</p>
<p>splitとjoinは対になる操作です。「splitで分解→加工→joinで再構築」という流れは、テキスト処理の最も基本的な型として頭に入れておきましょう。</p>`,
      task: `TODOの3箇所を完成させてください。(1)カンマ区切りの文字列を<code>split(",")</code>でリストにする、(2)そのリストを<code>" / "</code>区切りで<code>join</code>する、(3)引数なしの<code>split()</code>で空白区切りの単語リストを作る。`,
      code: `csv_line = "りんご,みかん,バナナ"

# TODO 1: カンマで分割してリストにする（split(",")を使う）
# 今のままだと文字列のままなので「要素数: 10」と表示されてしまう
fruits = csv_line
print(fruits)
print("要素数:", len(fruits))

# TODO 2: リストを「 / 」区切りの1つの文字列に連結する
# （" / ".join(fruits) の形。joinは区切り文字側のメソッド）
joined = fruits
print(joined)

# TODO 3: 引数なしのsplit()で、余分な空白を無視して単語リストにする
text = "  Python  is  fun  "
words = text
print(words)`,
      solution: `csv_line = "りんご,みかん,バナナ"

fruits = csv_line.split(",")
print(fruits)
print("要素数:", len(fruits))

joined = " / ".join(fruits)
print(joined)

text = "  Python  is  fun  "
words = text.split()
print(words)`,
      hints: [
        "splitは文字列のメソッドです。csv_line.split(\",\") でカンマ区切りのリストが返ります。",
        "joinは「\" / \".join(fruits)」のように区切り文字側から呼びます。fruits.join(...)ではない点に注意してください。",
        "text.split() と引数なしで呼ぶと、連続する空白をまとめて区切ってくれるので ['Python', 'is', 'fun'] になります。"
      ],
      expectedOutput: "りんご / みかん / バナナ"
    },
    {
      id: 152,
      title: "判定メソッド（startswith・endswith・isdigit等）",
      explanation: `<p>文字列には「〜で始まるか」「数字だけか」といった判定を行うメソッドが揃っています。すべて真偽値（True/False）を返すので、if文の条件にそのまま使えます。</p>
<table>
<tr><th>メソッド</th><th>Trueになる条件</th><th>例</th></tr>
<tr><td>startswith(x)</td><td>xで始まる</td><td>"https://a.com".startswith("https://")</td></tr>
<tr><td>endswith(x)</td><td>xで終わる</td><td>"report.pdf".endswith(".pdf")</td></tr>
<tr><td>isdigit()</td><td>全文字が数字</td><td>"12345".isdigit() → True</td></tr>
<tr><td>isalpha()</td><td>全文字が文字（数字・記号なし）</td><td>"abc123".isalpha() → False</td></tr>
<tr><td>isupper() / islower()</td><td>全文字が大文字／小文字</td><td>"HELLO".isupper() → True</td></tr>
<tr><td>isspace()</td><td>全文字が空白</td><td>"  ".isspace() → True</td></tr>
</table>
<pre><code>filename = "report.pdf"
if filename.endswith(".pdf"):
    print("PDFファイルです")

# タプルを渡すと「いずれかに一致」を1回で判定できる
if filename.endswith((".pdf", ".csv")):
    print("処理対象です")</code></pre>
<p>実務で特に重宝するのが、startswithとendswithに<strong>タプルを渡せる</strong>仕様です。「.pdfまたは.csvで終わる」をor条件を並べずに1回で書けます。URLのプロトコル判定（http://とhttps://）などでも定番です。</p>
<p>is系メソッドの注意点は「<strong>すべての文字が</strong>条件を満たすときだけTrue」であることです。空文字列<code>""</code>に対してはすべてFalseを返します。また<code>isdigit()</code>がTrueでも<code>"1.5"</code>や<code>"-3"</code>はFalseです（小数点やマイナス記号は数字ではないため）。数値に変換できるかを厳密に判定したい場合は、第10章で学んだtry-exceptでint()やfloat()を試す方法が確実です。</p>`,
      task: `TODO部分の条件を書き換えて、拡張子が<code>.pdf</code>または<code>.csv</code>のファイルだけが「処理対象」と表示されるようにしてください。<code>endswith</code>にタプルを渡す書き方を使います。後半の判定メソッドの出力も観察しましょう。`,
      code: `filenames = ["report.pdf", "photo.png", "data.csv", "memo.txt"]

# TODO: 条件を「name.endswith((".pdf", ".csv"))」に書き換えて、
# .pdfと.csvのファイルだけを処理対象にする
# （今のままでは全ファイルが表示されてしまう）
for name in filenames:
    if True:
        print(name, "-> 処理対象")

# 判定メソッドの動きを観察しよう（この部分は変更不要）
print("12345".isdigit())
print("abc123".isalpha())
print("HELLO".isupper())
print("https://example.com".startswith("https://"))`,
      solution: `filenames = ["report.pdf", "photo.png", "data.csv", "memo.txt"]

for name in filenames:
    if name.endswith((".pdf", ".csv")):
        print(name, "-> 処理対象")

print("12345".isdigit())
print("abc123".isalpha())
print("HELLO".isupper())
print("https://example.com".startswith("https://"))`,
      hints: [
        "endswithは「文字列の末尾が指定した文字列か」を判定します。if name.endswith(\".pdf\"): のように使います。",
        "複数の候補はタプルでまとめて渡せます。name.endswith((\".pdf\", \".csv\")) と括弧が二重になる点に注意してください。"
      ],
      expectedOutput: "data.csv -> 処理対象"
    },
    {
      id: 153,
      title: "整形メソッド（center・ljust・rjust・zfill）",
      explanation: `<p>出力の見た目を整える「パディング（幅揃え）」のメソッドを学びます。レポートの表組み、請求書の金額欄、連番ファイル名の生成など、テキストをきれいに揃えたい場面で活躍します。</p>
<table>
<tr><th>メソッド</th><th>動き</th><th>例（幅8）</th></tr>
<tr><td>ljust(幅, 埋め文字)</td><td>左寄せして右側を埋める</td><td>"ab".ljust(8, ".") → "ab......"</td></tr>
<tr><td>rjust(幅, 埋め文字)</td><td>右寄せして左側を埋める</td><td>"ab".rjust(8, ".") → "......ab"</td></tr>
<tr><td>center(幅, 埋め文字)</td><td>中央寄せして両側を埋める</td><td>"ab".center(8, "-") → "---ab---"</td></tr>
<tr><td>zfill(幅)</td><td>左側を0で埋める（数値向け）</td><td>"7".zfill(8) → "00000007"</td></tr>
</table>
<pre><code>print("TITLE".center(11, "-"))   # ---TITLE---
print("apple".ljust(8) + "100")  # apple   100（埋め文字省略は空白）
print(str(7).zfill(3))           # 007</code></pre>
<p>共通の仕様として、埋め文字を省略すると半角スペースで埋められます（zfillは常に0）。また、<strong>元の文字列が指定幅より長い場合は切り詰めずそのまま返す</strong>ため、データが壊れる心配はありません。</p>
<p>zfillは「zero fill」の略で、"007"のような<strong>ゼロ埋め連番</strong>の生成が主な用途です。数値そのものには使えないので<code>str(7).zfill(3)</code>のように文字列化してから呼びます。マイナス記号は特別扱いされ、<code>"-5".zfill(4)</code>は<code>"0-05"</code>ではなく、符号の後ろに0が入った<code>"-005"</code>になります。</p>
<p>なお第3章で学んだf-stringの書式指定でも同じことができ、<code>f"{7:03d}"</code>は"007"、<code>f"{'ab':&lt;8}"</code>は左寄せです。1つの値の埋め込みならf-string、既にある文字列変数を加工するならメソッド、と使い分けるのが読みやすい書き方です。</p>`,
      task: `TODOの3箇所を完成させてください。(1)番号を<code>zfill(5)</code>で5桁ゼロ埋めにする、(2)<code>center(11, "-")</code>で見出しを中央寄せにする、(3)商品名を<code>ljust(8)</code>で左寄せ、価格を<code>rjust(6)</code>で右寄せして表を整える。`,
      code: `# 受注番号を5桁のゼロ埋めで表示したい
# TODO 1: str(number)にzfill(5)を付けて 00001 の形式にする
for number in [1, 23, 456]:
    print(str(number))

# TODO 2: centerを使って幅11・埋め文字"-"の中央寄せ見出しにする
# （---TITLE--- と表示されるのが正解）
print("TITLE")

# TODO 3: 商品名をljust(8)で左寄せ、価格をrjust(6)で右寄せして
# 桁の揃った表にする（価格はstr()で文字列にしてから）
items = [("apple", 100), ("melon", 1500), ("fig", 80)]
for name, price in items:
    print(name + str(price))`,
      solution: `for number in [1, 23, 456]:
    print(str(number).zfill(5))

print("TITLE".center(11, "-"))

items = [("apple", 100), ("melon", 1500), ("fig", 80)]
for name, price in items:
    print(name.ljust(8) + str(price).rjust(6))`,
      hints: [
        "zfillは文字列のメソッドなので、str(number).zfill(5) の順で呼びます。",
        "centerの引数は（全体の幅, 埋め文字）です。\"TITLE\".center(11, \"-\") で両側に3文字ずつ-が入ります。",
        "ljust・rjustで埋め文字を省略すると半角スペースで埋まります。name.ljust(8) + str(price).rjust(6) で列が揃います。"
      ],
      expectedOutput: "---TITLE---"
    },
    {
      id: 154,
      title: "re.searchとマッチオブジェクト",
      explanation: `<p>ここからは<strong>正規表現（regular expression）</strong>を学びます。正規表現とは「文字列のパターンを記号で表現する小さな言語」で、「Aの後に数字が続く」「日付の形をしている」といった柔軟な検索・抽出・置換ができます。Pythonでは標準ライブラリの<strong>reモジュール</strong>が担当します。</p>
<pre><code>import re

text = "注文番号はA1234です"
match = re.search(r"A\\d+", text)
if match:
    print(match.group())  # A1234
    print(match.start())  # 5（見つかった開始位置）
    print(match.end())    # 10（終了位置）</code></pre>
<p>ポイントを3つに分けて押さえましょう。</p>
<p>第一に、パターンは<code>r"..."</code>という<strong>raw文字列</strong>（バックスラッシュをエスケープ記号として解釈しない文字列）で書くのが鉄則です。正規表現は<code>\\d</code>のようにバックスラッシュを多用するため、raw文字列でないと二重に書く必要が出て読みにくくなります。</p>
<p>第二に、パターン記号の初歩です。<code>\\d</code>は「数字1文字」、<code>+</code>は「直前の要素の1回以上の繰り返し」を表します。つまり<code>r"A\\d+"</code>は「Aの後に数字が1個以上続く並び」という意味になります。</p>
<p>第三に、<code>re.search(パターン, 文字列)</code>の戻り値です。見つかると<strong>マッチオブジェクト</strong>（マッチした場所や内容の情報を持つオブジェクト）が返り、見つからないと<code>None</code>が返ります。マッチオブジェクトの<code>group()</code>でマッチした文字列そのもの、<code>start()</code>と<code>end()</code>で位置が取れます。Noneに対して<code>group()</code>を呼ぶと<code>AttributeError</code>になるため、<code>if match:</code>で確認してから使うのが定番の型です（Noneは第6章で学んだfalsyな値なので、この書き方で判定できます）。</p>`,
      task: `パターン<code>r"A"</code>を、「Aの後に数字が1個以上続く」を表す<code>r"A\\d+"</code>に書き換えて、注文番号A1234全体が取り出せるようにしてください。見つからない場合にNoneが返ることも観察しましょう。`,
      code: `import re

text = "注文番号はA1234です"

# TODO: パターンを r"A\\d+" に書き換える
# （\\dは「数字1文字」、+は「1回以上の繰り返し」。
#  今のままでは "A" の1文字しかマッチしない）
match = re.search(r"A", text)
if match:
    print("見つかった:", match.group())
    print("開始位置:", match.start())
    print("終了位置:", match.end())

# 見つからない場合はNoneが返る（if文で確認してから使うのが定番）
match2 = re.search(r"B\\d+", text)
print(match2)`,
      solution: `import re

text = "注文番号はA1234です"

match = re.search(r"A\\d+", text)
if match:
    print("見つかった:", match.group())
    print("開始位置:", match.start())
    print("終了位置:", match.end())

match2 = re.search(r"B\\d+", text)
print(match2)`,
      hints: [
        "パターンはraw文字列で r\"A\\d+\" と書きます。\\dが数字1文字、+が「直前の要素を1回以上」の意味です。",
        "書き換えるのはre.searchの第1引数だけです。マッチに成功するとgroup()で「A1234」全体が取れます。"
      ],
      expectedOutput: "見つかった: A1234"
    },
    {
      id: 155,
      title: "re.findall",
      explanation: `<p>re.searchは「最初の1件」しか見つけません。テキスト中の<strong>該当箇所をすべて</strong>集めたいときは<code>re.findall(パターン, 文字列)</code>を使います。</p>
<pre><code>import re

text = "会議は10時から12時まで、休憩は15分です"
numbers = re.findall(r"\\d+", text)
print(numbers)  # ['10', '12', '15']</code></pre>
<p>searchとの違いを整理しましょう。</p>
<table>
<tr><th>関数</th><th>見つける件数</th><th>戻り値</th><th>見つからないとき</th></tr>
<tr><td>re.search</td><td>最初の1件</td><td>マッチオブジェクト</td><td>None</td></tr>
<tr><td>re.findall</td><td>すべて</td><td>文字列のリスト</td><td>空リスト []</td></tr>
</table>
<p>findallの戻り値は<strong>マッチオブジェクトではなく文字列のリスト</strong>である点に注意してください。位置情報（start・end）は持たないぶん、結果をそのままforループやlen()に渡せて手軽です。見つからないときは空リストが返るため、Noneチェックは不要で、<code>len()</code>で件数を数えたり<code>if 結果リスト:</code>で有無を判定したりできます。</p>
<pre><code>log = "error: disk, warning: slow, error: timeout"
errors = re.findall(r"error: \\w+", log)
print(errors)       # ['error: disk', 'error: timeout']
print(len(errors))  # 2</code></pre>
<p>新しい記号<code>\\w</code>は「単語を構成する文字1文字」（英数字とアンダースコア。日本語などの文字も含む）を表します。<code>r"error: \\w+"</code>で「error: の後に単語が続く部分」を全部拾えるので、ログから特定パターンの行だけ抽出して件数を数える、といった集計がすぐ書けます。取り出した結果はただの文字列リストなので、第15章で学んだCounterと組み合わせれば頻度集計にも発展できます。「全部拾ってリストで受け取り、あとはリスト処理」という流れがfindallの型です。</p>`,
      task: `TODOの2箇所を完成させてください。(1)<code>re.search</code>を<code>re.findall</code>に変えて数字の並びをすべて取り出す、(2)ログから<code>r"error: \\w+"</code>にマッチする部分をすべて取り出して件数を表示する。`,
      code: `import re

text = "会議は10時から12時まで、休憩は15分です"

# TODO 1: searchをfindallに変えて、数字の並びを「すべて」取り出す
# （searchは最初の1件のマッチオブジェクトしか返さない）
numbers = re.search(r"\\d+", text)
print(numbers)

# TODO 2: r"error: \\w+" のパターンでre.findallを使い、
# エラー部分をすべて取り出して件数も表示する
log = "error: disk, warning: slow, error: timeout"
errors = []
print(errors)
print("エラー件数:", len(errors))`,
      solution: `import re

text = "会議は10時から12時まで、休憩は15分です"

numbers = re.findall(r"\\d+", text)
print(numbers)

log = "error: disk, warning: slow, error: timeout"
errors = re.findall(r"error: \\w+", log)
print(errors)
print("エラー件数:", len(errors))`,
      hints: [
        "re.findall(r\"\\d+\", text) は、マッチした文字列だけを集めたリストを返します。['10', '12', '15'] の形です。",
        "errorsの行を errors = re.findall(r\"error: \\w+\", log) に書き換えれば、リストなのでlen()がそのまま件数になります。"
      ],
      expectedOutput: "['10', '12', '15']"
    },
    {
      id: 156,
      title: "re.sub",
      explanation: `<p>検索・抽出ときたら次は<strong>置換</strong>です。<code>re.sub(パターン, 置換後の文字列, 対象文字列)</code>は、パターンにマッチした箇所を<strong>すべて</strong>置き換えた新しい文字列を返します（subはsubstitute＝置き換えるの略）。</p>
<pre><code>import re

text = "電話番号は090-1234-5678です"
masked = re.sub(r"\\d", "*", text)
print(masked)  # 電話番号は***-****-****です</code></pre>
<p>第3章で学んだ<code>replace</code>との違いが重要です。replaceは「決まった文字列」しか置換できませんが、re.subは「数字ならどれでも」「連続する空白」のような<strong>パターン</strong>を置換できます。</p>
<table>
<tr><th>やりたいこと</th><th>使うもの</th></tr>
<tr><td>「abc」を「xyz」に（固定文字列）</td><td>text.replace("abc", "xyz")</td></tr>
<tr><td>「すべての数字」を*に（パターン）</td><td>re.sub(r"\\d", "*", text)</td></tr>
<tr><td>「連続する空白」を1つに（パターン）</td><td>re.sub(r" +", " ", text)</td></tr>
</table>
<pre><code>spaced = "Python    is     fun"
print(re.sub(r" +", " ", spaced))  # Python is fun</code></pre>
<p>個人情報のマスキング（電話番号や会員番号を*に伏せる）、表記ゆれの正規化（連続空白を1つにまとめる）、区切り文字の統一など、データクレンジングと呼ばれる前処理の中核がre.subです。元の文字列は変更されず<strong>新しい文字列が返る</strong>点は、文字列メソッドと同じです（文字列はイミュータブルなので）。</p>
<p>もうひとつ覚えておきたいのは、パターンに特別な記号を含まない<code>re.sub(r"/", "-", text)</code>のような使い方も普通にできることです。まずはreplaceで書けるか考え、パターンが必要になったらre.subに切り替える、という判断で十分です。置換回数を制限したいときは第4引数countも指定できます。</p>`,
      task: `TODOの3箇所を完成させてください。(1)replaceでは全種類の数字を一度に伏せられないので<code>re.sub(r"\\d", "*", text)</code>に置き換える、(2)連続する空白を<code>r" +"</code>のパターンで1つにまとめる、(3)日付の区切り<code>/</code>を<code>-</code>に置換する。`,
      code: `import re

text = "電話番号は090-1234-5678です"

# TODO 1: replaceでは「0」しか置換できていない。
# re.sub(r"\\d", "*", text) に置き換えて数字をすべて伏せる
masked = text.replace("0", "*")
print(masked)

# TODO 2: re.subとパターン r" +" で連続する空白を1つにまとめる
spaced = "Python    is     fun"
normalized = spaced
print(normalized)

# TODO 3: re.subで日付の区切りを「/」から「-」に置き換える
dates = "2026/09/03と2026/12/24"
print(dates)`,
      solution: `import re

text = "電話番号は090-1234-5678です"

masked = re.sub(r"\\d", "*", text)
print(masked)

spaced = "Python    is     fun"
normalized = re.sub(r" +", " ", spaced)
print(normalized)

dates = "2026/09/03と2026/12/24"
print(re.sub(r"/", "-", dates))`,
      hints: [
        "re.subの引数は（パターン, 置換後, 対象文字列）の順です。r\"\\d\" はどの数字にもマッチします。",
        "「 +」は「スペース1個以上の連続」という意味のパターンです。これを\" \"（1個のスペース）に置き換えます。",
        "TODO 3は re.sub(r\"/\", \"-\", dates) をprintの中に書けば完成です。"
      ],
      expectedOutput: "電話番号は***-****-****です"
    },
    {
      id: 157,
      title: "パターン文法（文字クラス・量指定子）",
      explanation: `<p>正規表現のパターンを自分で組み立てられるように、記号の文法を体系的に整理します。パターンは「何にマッチするか（文字の指定）」と「何回繰り返すか（量指定子）」の組み合わせで読み解けます。</p>
<h4>文字の指定</h4>
<table>
<tr><th>記号</th><th>意味</th><th>例</th></tr>
<tr><td>[abc]</td><td>a・b・cのどれか1文字（文字クラス）</td><td>c[ao]t → cat・cot</td></tr>
<tr><td>[a-z] [0-9]</td><td>範囲指定（-で連続範囲）</td><td>[A-Z]は英大文字1文字</td></tr>
<tr><td>\\d</td><td>数字1文字（[0-9]と同じ）</td><td>\\d\\d → 25など</td></tr>
<tr><td>\\w</td><td>単語構成文字1文字（英数字と_）</td><td>変数名・単語の抽出</td></tr>
<tr><td>\\s</td><td>空白文字1文字（スペース・タブ等）</td><td>区切りの検出</td></tr>
<tr><td>.</td><td>任意の1文字</td><td>c.t → cat・cut・c5t</td></tr>
</table>
<h4>量指定子（直前の要素の繰り返し回数）とアンカー</h4>
<table>
<tr><th>記号</th><th>意味</th></tr>
<tr><td>+</td><td>1回以上</td></tr>
<tr><td>*</td><td>0回以上</td></tr>
<tr><td>?</td><td>0回か1回（あってもなくてもよい）</td></tr>
<tr><td>{3}</td><td>ちょうど3回</td></tr>
<tr><td>{2,3}</td><td>2回以上3回以下</td></tr>
<tr><td>^ と $</td><td>それぞれ文字列の先頭・末尾（アンカー）</td></tr>
</table>
<pre><code>import re

# 英大文字2〜3文字 + ハイフン + 数字2〜3桁「だけ」からなる文字列
pattern = r"^[A-Z]{2,3}-\\d{2,3}$"
print(bool(re.search(pattern, "AB-12")))    # True
print(bool(re.search(pattern, "ABCD-1")))   # False</code></pre>
<p>実務で特に重要なのが<strong>アンカー</strong>です。<code>^</code>と<code>$</code>で挟まないと「文字列のどこかに含まれていればマッチ」になるため、入力チェック（バリデーション）では「全体がこの形式か」を<code>^...$</code>で明示します。パターンを読むときは「文字の指定→繰り返し回数」のペアに区切って左から読むと、複雑に見える式も分解できます。</p>`,
      task: `TODOの2箇所を修正してください。(1)<code>r"c.t"</code>を文字クラスとアンカーを使った<code>r"^c[ao]t$"</code>に書き換えて、catとcotだけにマッチさせる、(2)商品コードのパターンに量指定子<code>{2,3}</code>を追加して「英大文字2〜3文字-数字2〜3桁」の形式にする。`,
      code: `import re

# TODO 1: r"c.t" の「.」は任意の1文字なのでcutにもマッチしてしまう。
# 文字クラス[ao]とアンカー^ $を使った r"^c[ao]t$" に書き換えて、
# catとcotだけにマッチさせる
words = ["cat", "cot", "cut", "coat"]
for w in words:
    if re.search(r"c.t", w):
        print(w, "はマッチ")

# TODO 2: 有効な商品コードは「英大文字2〜3文字 + ハイフン + 数字2〜3桁」。
# 量指定子{2,3}を使ってパターンを完成させる
# （AB-12とABC-123の2つだけが有効と表示されれば正解）
codes = ["A-1", "AB-12", "ABC-123", "ABCD-1"]
for c in codes:
    if re.search(r"^[A-Z]-\\d$", c):
        print(c, "は有効")`,
      solution: `import re

words = ["cat", "cot", "cut", "coat"]
for w in words:
    if re.search(r"^c[ao]t$", w):
        print(w, "はマッチ")

codes = ["A-1", "AB-12", "ABC-123", "ABCD-1"]
for c in codes:
    if re.search(r"^[A-Z]{2,3}-\\d{2,3}$", c):
        print(c, "は有効")`,
      hints: [
        "[ao]は「aかoのどちらか1文字」という文字クラスです。^と$で挟むと「文字列全体がこの形」という意味になります。",
        "{2,3}は「直前の要素を2回以上3回以下」という量指定子です。[A-Z]{2,3}で英大文字2〜3文字、\\d{2,3}で数字2〜3桁を表せます。"
      ],
      expectedOutput: "ABC-123 は有効"
    },
    {
      id: 158,
      title: "グループ（()とgroup）",
      explanation: `<p>「日付にマッチさせるだけでなく、年・月・日をバラバラに取り出したい」。そんなときに使うのが<strong>グループ</strong>です。パターンの一部を丸括弧<code>( )</code>で囲むと、その部分だけを後から個別に取り出せます。</p>
<pre><code>import re

text = "生年月日: 1995-04-23"
match = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)
if match:
    print(match.group(0))   # 1995-04-23（マッチ全体）
    print(match.group(1))   # 1995（1番目の括弧）
    print(match.group(2))   # 04（2番目の括弧）
    print(match.groups())   # ('1995', '04', '23')</code></pre>
<p>取り出し方のルールを整理します。</p>
<table>
<tr><th>書き方</th><th>返るもの</th></tr>
<tr><td>group(0) または group()</td><td>マッチした全体</td></tr>
<tr><td>group(1), group(2), ...</td><td>左から数えてn番目の括弧の中身</td></tr>
<tr><td>groups()</td><td>全グループをタプルでまとめて</td></tr>
</table>
<p>番号は<strong>左括弧が現れる順に1から</strong>振られます。0が「全体」で1からがグループ、という番号のずれは初学者が混乱しやすいポイントなので注意してください。<code>groups()</code>はタプルを返すため、第4章で学んだアンパックと相性が抜群です。</p>
<pre><code>year, month, day = match.groups()
print(year + "年" + month + "月" + day + "日")</code></pre>
<p>グループで取り出した値は<strong>常に文字列</strong>です。"04"を数値として計算したいならint("04")のように変換します（int()は先頭の0を問題なく扱えます）。</p>
<p>この「パターンで構造を捉えて、部品を括弧で抜き出す」技術は、ログの解析・URLからのID抽出・ファイル名の分解など、非定型テキストから構造化データを作るあらゆる場面の基礎になります。findallにグループ入りパターンを渡すとグループ部分だけのリストが返る、という発展形もいずれ出会うので頭の片隅に置いておきましょう。</p>`,
      task: `パターンを<code>( )</code>で3つのグループに分け、年・月・日を個別に取り出してください。最後は<code>groups()</code>のアンパックで「→ 1995年04月23日」の形式に組み立てます。`,
      code: `import re

text = "生年月日: 1995-04-23"

# TODO 1: パターンを (\\d{4})-(\\d{2})-(\\d{2}) に書き換えて
# 年・月・日を3つのグループに分ける
match = re.search(r"\\d{4}-\\d{2}-\\d{2}", text)
if match:
    print("全体:", match.group(0))
    # TODO 2: group(1)〜group(2)で年と月を表示する
    print("年:", "????")
    print("月:", "??")
    # TODO 3: groups()を year, month, day にアンパックして
    # 「→ 1995年04月23日」の形式で表示する
    print("→ ????年??月??日")`,
      solution: `import re

text = "生年月日: 1995-04-23"

match = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)
if match:
    print("全体:", match.group(0))
    print("年:", match.group(1))
    print("月:", match.group(2))
    year, month, day = match.groups()
    print("→ " + year + "年" + month + "月" + day + "日")`,
      hints: [
        "グループ化は括弧で囲むだけです。(\\d{4})-(\\d{2})-(\\d{2}) で年・月・日が1〜3番のグループになります。",
        "group(0)は全体、group(1)が最初の括弧です。番号が0からではなく1から始まる点に注意してください。",
        "match.groups()は('1995', '04', '23')のタプルを返すので、year, month, day = match.groups() と3変数で受け取れます。"
      ],
      expectedOutput: "→ 1995年04月23日"
    },
    {
      id: 159,
      title: "re.compileとフラグ（re.IGNORECASE等）",
      explanation: `<p>同じパターンを何度も使うときの定番の書き方が<code>re.compile</code>です。パターンを事前に<strong>コンパイル</strong>（正規表現エンジンが使う内部形式へ変換）してパターンオブジェクトにしておき、そのメソッドとしてsearchやfindallを呼びます。</p>
<pre><code>import re

pattern = re.compile(r"\\d+")      # 1回だけコンパイル
print(pattern.search("abc123").group())  # 123
print(pattern.findall("1a22b333"))       # ['1', '22', '333']</code></pre>
<p>メリットは2つあります。ひとつは<strong>効率</strong>：ループの中で毎回re.search(パターン, ...)と書くと内部で毎回パターン解析が走りますが、compileしておけば1回で済みます。もうひとつは<strong>可読性</strong>：パターンに名前（変数名）を付けられるので、「このパターンが何を表すか」がコードから読み取れます。</p>
<p>もうひとつの主役が<strong>フラグ</strong>（マッチングの挙動を変えるオプション）です。</p>
<table>
<tr><th>フラグ</th><th>効果</th></tr>
<tr><td>re.IGNORECASE（短縮形 re.I）</td><td>大文字小文字を区別しない</td></tr>
<tr><td>re.MULTILINE（re.M）</td><td>^ と $ が各行の先頭・末尾にもマッチ</td></tr>
<tr><td>re.DOTALL（re.S）</td><td>. が改行にもマッチ</td></tr>
</table>
<pre><code>pattern = re.compile(r"python", re.IGNORECASE)
print(bool(pattern.search("PYTHON入門")))  # True（大文字でもマッチ）</code></pre>
<p>特に使用頻度が高いのがre.IGNORECASEです。ユーザー入力や検索キーワードは「Python」「python」「PYTHON」のように表記が揺れるのが普通なので、大文字小文字を区別しない検索は実務の定番です。複数のフラグは<code>re.IGNORECASE | re.MULTILINE</code>のように縦棒で組み合わせられます。なおcompileせずに<code>re.search(r"python", text, re.IGNORECASE)</code>と第3引数に渡すこともできるので、1回きりの検索ならこちらでも構いません。</p>`,
      task: `パターンを<code>re.compile(r"python", re.IGNORECASE)</code>でコンパイルし、ループ内の判定を<code>pattern.search(t)</code>に書き換えてください。大文字小文字に関係なくpythonを含む3件がヒットすれば正解です。`,
      code: `import re

texts = ["Python入門", "PYTHONは楽しい", "Javaの本", "pythonで自動化"]

# TODO 1: ループの前でパターンを1回だけコンパイルする
# pattern = re.compile(r"python", re.IGNORECASE)
# TODO 2: if文の条件を pattern.search(t) に書き換える
# （今のままでは小文字のpythonしかヒットせず、ヒット数: 1になる）
count = 0
for t in texts:
    if re.search(r"python", t):
        print(t)
        count += 1
print("ヒット数:", count)`,
      solution: `import re

texts = ["Python入門", "PYTHONは楽しい", "Javaの本", "pythonで自動化"]

pattern = re.compile(r"python", re.IGNORECASE)

count = 0
for t in texts:
    if pattern.search(t):
        print(t)
        count += 1
print("ヒット数:", count)`,
      hints: [
        "re.compileの第2引数にフラグを渡します。re.compile(r\"python\", re.IGNORECASE) で大文字小文字を区別しないパターンになります。",
        "コンパイル後はre.search(...)ではなく、パターンオブジェクトのメソッドとして pattern.search(t) と呼びます。"
      ],
      expectedOutput: "ヒット数: 3"
    },
    {
      id: 160,
      title: "総合演習（ログ行の解析）",
      explanation: `<p>この章の総仕上げは、実務で最も正規表現が活躍する題材のひとつ、<strong>ログ解析</strong>です。サーバーのログは「時刻 [レベル] サーバー名 メッセージ」のような半構造化テキスト（形式は決まっているが表形式ではないデータ）で出力されます。ここから必要な情報を抜き出し、集計するツールを作ります。</p>
<pre><code>2026-09-01 10:23:45 [ERROR] db-server connection failed</code></pre>
<p>この1行を分解するパターンを、部品ごとに組み立てます。</p>
<table>
<tr><th>部品</th><th>パターン</th><th>意味</th></tr>
<tr><td>時刻</td><td>(\\d{2}:\\d{2}:\\d{2})</td><td>数字2桁:2桁:2桁</td></tr>
<tr><td>レベル</td><td>\\[(\\w+)\\]</td><td>[ ]で囲まれた単語。[は文字クラスの記号なので\\[とエスケープ</td></tr>
<tr><td>サーバー名</td><td>(\\S+)</td><td>空白以外の文字の連続（\\sの逆が\\S）</td></tr>
<tr><td>メッセージ</td><td>(.+)</td><td>残り全部</td></tr>
</table>
<p>新出の記号を2つ補足します。<code>\\[</code>のように<strong>バックスラッシュでのエスケープ</strong>は、[や.など正規表現で特別な意味を持つ記号を「ただの文字」として扱うための書き方です。<code>\\S</code>（大文字）は「空白以外の1文字」で、小文字の<code>\\s</code>の反対です。ハイフンを含むdb-serverのような名前は\\w+では途切れてしまうため\\S+を使います。</p>
<p>処理の流れは「compileしたパターンで各行をsearch→groups()で4つの部品をアンパック→レベルをCounterで集計、ERRORだけ詳細表示」です。この章で学んだグループ・compileに加えて、第15章のCounterも総動員します。</p>
<pre><code>pattern = re.compile(r"(\\d{2}:\\d{2}:\\d{2}) \\[(\\w+)\\] (\\S+) (.+)")
match = pattern.search(line)
if match:
    time_part, level, server, message = match.groups()</code></pre>
<p>「パターンを部品に分けて考え、グループで構造を抜き出し、抜き出した後はPythonの通常のデータ処理に引き渡す」。この流れが身につけば、CSVにできない雑多なテキストからデータを掘り出す力が手に入ります。</p>`,
      task: `TODOの3箇所を完成させてください。(1)時刻・レベル・サーバー名・メッセージを取り出す4グループのパターンを完成させる、(2)<code>groups()</code>で4つの値を受け取り、レベルをCounterで集計しつつERRORの行だけ「時刻 サーバー名 - メッセージ」を表示する、(3)集計結果を<code>dict(level_counter)</code>で表示する。`,
      code: `import re
from collections import Counter

logs = [
    "2026-09-01 10:23:45 [ERROR] db-server connection failed",
    "2026-09-01 10:24:02 [INFO] web-server request ok",
    "2026-09-01 10:25:11 [ERROR] db-server timeout",
    "2026-09-01 10:26:30 [WARN] cache-server memory high",
    "2026-09-01 10:27:00 [INFO] web-server request ok",
]

# TODO 1: パターンを完成させる。時刻の後に続けて
# 「 \\[(\\w+)\\] (\\S+) (.+)」を追加し、
# レベル・サーバー名・メッセージの3グループを増やす
pattern = re.compile(r"(\\d{2}:\\d{2}:\\d{2})")

level_counter = Counter()
for line in logs:
    match = pattern.search(line)
    if match:
        # TODO 2: match.groups()を
        # time_part, level, server, message の4変数で受け取り、
        # level_counter[level] += 1 で集計する。
        # さらにlevelが"ERROR"のときだけ
        # print(time_part, server, "-", message) で詳細を表示する
        print(match.group(1))

# TODO 3: 集計結果を print("集計:", dict(level_counter)) で表示する
print("集計:", {})`,
      solution: `import re
from collections import Counter

logs = [
    "2026-09-01 10:23:45 [ERROR] db-server connection failed",
    "2026-09-01 10:24:02 [INFO] web-server request ok",
    "2026-09-01 10:25:11 [ERROR] db-server timeout",
    "2026-09-01 10:26:30 [WARN] cache-server memory high",
    "2026-09-01 10:27:00 [INFO] web-server request ok",
]

pattern = re.compile(r"(\\d{2}:\\d{2}:\\d{2}) \\[(\\w+)\\] (\\S+) (.+)")

level_counter = Counter()
for line in logs:
    match = pattern.search(line)
    if match:
        time_part, level, server, message = match.groups()
        level_counter[level] += 1
        if level == "ERROR":
            print(time_part, server, "-", message)

print("集計:", dict(level_counter))`,
      hints: [
        "パターン全体は r\"(\\d{2}:\\d{2}:\\d{2}) \\[(\\w+)\\] (\\S+) (.+)\" です。[はエスケープして\\[と書く点に注意してください。",
        "グループが4つあるので、time_part, level, server, message = match.groups() の4変数アンパックで受け取れます。",
        "Counterは level_counter[level] += 1 のように存在しないキーでも0から数えられます。最後はdict()に変換して表示します。"
      ],
      expectedOutput: "集計: {'ERROR': 2, 'INFO': 2, 'WARN': 1}"
    }
  ]
});
