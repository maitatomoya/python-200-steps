// 第7章：ループ
registerChapter({
  number: 7,
  title: "ループ",
  description: "for文とwhile文による繰り返し処理を学び、break・continue・enumerate・zipを使った実践的なループが書けるようになります。",
  steps: [
    {
      id: 61,
      title: "forとrangeの基本",
      explanation: `<p>同じ処理を何度も繰り返したいとき、コードをコピーして並べるのは非効率でミスのもとです。Pythonでは<strong>for文</strong>（繰り返しを行う構文）を使います。もっとも基本的な形が、<code>range()</code>（連続した整数を順に生成する組み込み関数）との組み合わせです。</p>
<pre><code># iに0、1、2、3、4が順に入り、ブロックが5回実行される
for i in range(5):
    print(i)</code></pre>
<p>この3行のポイントは次のとおりです。</p>
<ul>
<li><code>range(5)</code>は<strong>0から4まで</strong>の整数を順に取り出します。5は含まれません（回数と考えると「5回」でちょうど一致します）</li>
<li><code>i</code>は<strong>ループ変数</strong>と呼ばれ、繰り返しのたびに次の値へ更新されます。名前は自由ですが、単純なカウンタにはi・j・kがよく使われます</li>
<li>for文の行末には<code>:</code>（コロン）が必要で、繰り返したい処理は<strong>インデント</strong>（半角スペース4つの字下げ）して書きます。if文と同じルールです</li>
</ul>
<p>インデントされた行のまとまりを「ブロック」と呼び、ブロック全体が繰り返されます。インデントを外した行はループの外になり、1回しか実行されません。</p>
<pre><code>for i in range(3):
    print("ループ内:", i)
print("ループの外")  # 最後に1回だけ実行される</code></pre>
<p>「0から始まって終わりの数は含まれない」という規則は、スライスなどPython全体で一貫しています。まずはrangeの数を変えて、繰り返しの感覚をつかみましょう。</p>`,
      task: `まず実行して0〜2が表示されるのを確認し、その後2つ目のfor文の<code>range</code>を修正して「カウント: 0」〜「カウント: 4」の5行が表示されるようにしてください。`,
      code: `# forとrangeの基本形：iに0から2が順に入る
for i in range(3):
    print(i)

# TODO: rangeの数を変えて、0から4まで（5回）表示されるようにする
for i in range(3):
    print("カウント:", i)
`,
      solution: `# forとrangeの基本形：iに0から2が順に入る
for i in range(3):
    print(i)

# range(5)で0から4まで5回繰り返す
for i in range(5):
    print("カウント:", i)
`,
      hints: [
        `range(n)は0からn-1までを生成します。5回繰り返すにはnをいくつにしますか`,
        `2つ目のfor文をfor i in range(5):に変えます`
      ],
      expectedOutput: "カウント: 4"
    },
    {
      id: 62,
      title: "rangeの開始・終了・ステップ",
      explanation: `<p>range()は引数の個数によって動きが変わります。<code>range(終了)</code>だけでなく、<code>range(開始, 終了)</code>、さらに<code>range(開始, 終了, ステップ)</code>という形で、どこから・どこまで・いくつ飛びに数えるかを指定できます。</p>
<table>
<tr><th>書き方</th><th>生成される値</th><th>意味</th></tr>
<tr><td><code>range(5)</code></td><td>0 1 2 3 4</td><td>0から5の手前まで</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1 2 3 4 5</td><td>1から6の手前まで</td></tr>
<tr><td><code>range(2, 11, 2)</code></td><td>2 4 6 8 10</td><td>2から11の手前まで2つ飛び</td></tr>
<tr><td><code>range(10, 0, -2)</code></td><td>10 8 6 4 2</td><td>ステップが負なら逆順</td></tr>
</table>
<p>重要なのは<strong>終了の値そのものは含まれない</strong>という点です。「1から5まで」を表示したいなら終了は6にします。この「終端を含まない」仕様は一見不便に見えますが、<code>range(0, len(リスト))</code>のように長さをそのまま渡せるなど、他の機能と組み合わせたときに計算が揃うよう設計されています。</p>
<pre><code># カウントダウン：ステップに-1を指定する
for i in range(3, 0, -1):
    print(i)
print("スタート！")</code></pre>
<p>ステップに負の数を指定するときは、開始を大きく・終了を小さくする必要があります。<code>range(0, 3, -1)</code>のように向きが合っていないと、1回も実行されずにループが終わります（エラーにはならないので気づきにくい点に注意してください）。</p>`,
      task: `2つ目のfor文を「2から10までの偶数」、3つ目のfor文を「5から1へのカウントダウン」になるように、rangeの引数を修正してください。`,
      code: `# 1から5まで表示する（終了の6は含まれない）
for i in range(1, 6):
    print(i)

# TODO: 2から10までの偶数（2 4 6 8 10）を表示するようにrangeを修正する
for i in range(1, 6):
    print("偶数:", i)

# TODO: 5から1へのカウントダウンになるようにrangeを修正する（ステップに負の数）
for i in range(1, 6):
    print("カウントダウン:", i)
`,
      solution: `# 1から5まで表示する（終了の6は含まれない）
for i in range(1, 6):
    print(i)

# 2から10までの偶数：開始2・終了11・ステップ2
for i in range(2, 11, 2):
    print("偶数:", i)

# 5から1へのカウントダウン：ステップに負の数を指定
for i in range(5, 0, -1):
    print("カウントダウン:", i)
`,
      hints: [
        `range(開始, 終了, ステップ)の3つの引数を指定します。終了の値は含まれない点に注意しましょう`,
        `偶数はrange(2, 11, 2)のように2つ飛びで指定します`,
        `カウントダウンはステップを-1にして、開始5・終了0を指定します`
      ],
      expectedOutput: "カウントダウン: 1"
    },
    {
      id: 63,
      title: "リストをforで回す",
      explanation: `<p>rangeで回数を数えるだけでなく、<strong>リストの要素を順に取り出す</strong>のがfor文のもっともよく使う形です。<code>for 変数 in リスト:</code>と書くと、要素が先頭から1つずつ変数に入ります。</p>
<pre><code>fruits = ["りんご", "みかん", "バナナ"]
for fruit in fruits:
    print(fruit)</code></pre>
<p>インデックスを自分で管理する必要がなく、「リストの中身を順に処理する」という意図がそのまま読めるのがPythonらしい書き方です。</p>
<p>実務で頻出するのが<strong>集計（アキュムレータ）パターン</strong>です。ループの前に合計用の変数を0で用意し、ループの中で足し込んでいきます。</p>
<pre><code>prices = [120, 80, 150]
total = 0
for price in prices:
    total += price  # totalにpriceを足し込む
print(total)  # 350</code></pre>
<p>ここでよくあるバグが、<code>total += price</code>（加算）と書くべきところを<code>total = price</code>（上書き）としてしまうことです。上書きにすると、ループが終わった時点でtotalには<strong>最後の要素だけ</strong>が残ります。エラーにはならず結果だけが間違うため、初心者が気づきにくい典型的なバグです。「積み上げたいのか、置き換えたいのか」を意識して代入を書き分けましょう。件数を数えたいときは<code>count += 1</code>、合計なら<code>total += price</code>と、同じ形で応用できます。なお、単純な合計だけなら第4章で学んだ<code>sum()</code>でも求められますが、「条件に合うものだけ足す」といった応用はループでしか書けません。</p>`,
      task: `合計が正しく求まるように、ループ内の代入を修正してください。実行して「合計: 350円」と表示されれば成功です。`,
      code: `# リストの要素を順に取り出す
fruits = ["りんご", "みかん", "バナナ"]
for fruit in fruits:
    print(f"{fruit}を1個買います")

# 合計を計算する（集計パターン）
prices = [120, 80, 150]
total = 0
for price in prices:
    # TODO: 上書きになっていて合計が求まらない。加算に直す
    total = price
print(f"合計: {total}円")
`,
      solution: `# リストの要素を順に取り出す
fruits = ["りんご", "みかん", "バナナ"]
for fruit in fruits:
    print(f"{fruit}を1個買います")

# 合計を計算する（集計パターン）
prices = [120, 80, 150]
total = 0
for price in prices:
    # 複合代入演算子で足し込む
    total += price
print(f"合計: {total}円")
`,
      hints: [
        `total = priceでは毎回上書きされ、最後の要素しか残りません`,
        `第2章で学んだ複合代入演算子+=を使ってtotal += priceと書きます`
      ],
      expectedOutput: "合計: 350円"
    },
    {
      id: 64,
      title: "文字列・辞書をforで回す（items）",
      explanation: `<p>for文が回せるのはリストだけではありません。<strong>イテラブル</strong>（順に要素を取り出せるオブジェクトの総称）であれば何でも回せます。文字列を回すと1文字ずつ取り出せます。</p>
<pre><code>for ch in "abc":
    print(ch)  # a、b、cが1行ずつ表示される</code></pre>
<p>辞書をそのままforに渡すと、取り出されるのは<strong>キーだけ</strong>です。値も一緒に使いたいときは<code>items()</code>メソッドを使うと、キーと値のペア（タプル）が順に取り出せ、2つの変数で受け取れます。</p>
<pre><code>stock = {"りんご": 3, "みかん": 5}
for name in stock:
    print(name)  # キーだけ

for name, count in stock.items():
    print(name, count)  # キーと値の両方</code></pre>
<table>
<tr><th>書き方</th><th>取り出されるもの</th></tr>
<tr><td><code>for k in 辞書:</code></td><td>キー</td></tr>
<tr><td><code>for v in 辞書.values():</code></td><td>値</td></tr>
<tr><td><code>for k, v in 辞書.items():</code></td><td>キーと値のペア</td></tr>
</table>
<p><code>for name, count in ...</code>のように複数の変数で受け取る書き方は、第4章で学んだアンパック（タプルの中身を複数の変数へ展開する機能）そのものです。なお、Pythonの辞書は追加した順序を保つので、ループでも登録順に取り出されます。第5章で学んだkeys()・values()・items()が、ループと組み合わさって本領を発揮するところです。</p>`,
      task: `辞書のループを<code>items()</code>を使う形に修正して、「りんご: 3個」のようにキーと値を並べて表示してください。`,
      code: `# 文字列も1文字ずつ回せる
word = "python"
for ch in word:
    print(ch)

# 辞書をそのまま回すとキーだけが取り出される
stock = {"りんご": 3, "みかん": 5, "バナナ": 2}
# TODO: items()を使ってキーと値を同時に受け取り、「りんご: 3個」の形式で表示する
for name in stock:
    print(name)
`,
      solution: `# 文字列も1文字ずつ回せる
word = "python"
for ch in word:
    print(ch)

# 辞書はitems()でキーと値のペアを受け取る
stock = {"りんご": 3, "みかん": 5, "バナナ": 2}
for name, count in stock.items():
    print(f"{name}: {count}個")
`,
      hints: [
        `辞書のitems()はキーと値のペアを順に返します`,
        `for name, count in stock.items():のように2つの変数で受け取ります`
      ],
      expectedOutput: "みかん: 5個"
    },
    {
      id: 65,
      title: "whileループ",
      explanation: `<p>for文は「回数や要素があらかじめ決まっている繰り返し」に向いています。一方、<strong>while文</strong>は「<strong>条件を満たしている間</strong>繰り返す」構文で、何回繰り返すか事前に分からない処理に使います。</p>
<pre><code>count = 1
while count &lt;= 3:
    print(count)
    count += 1  # 条件に関わる変数を更新する
print("終了")</code></pre>
<p>動きの流れは次のとおりです。</p>
<ol>
<li>条件（count &lt;= 3）を評価する</li>
<li>Trueならブロックを実行し、1に戻る</li>
<li>Falseになったらループを抜けて次の行へ進む</li>
</ol>
<p>whileで絶対に忘れてはいけないのが、<strong>ループの中で条件に関わる変数を更新する</strong>ことです。for文はrangeやリストが自動で「次の値」を用意してくれますが、whileでは自分で進める必要があります。更新を忘れると条件が永遠にTrueのままになり、無限ループになります（次のステップで実際に体験します）。</p>
<p>使い分けの目安は次のとおりです。</p>
<table>
<tr><th>状況</th><th>向いている構文</th></tr>
<tr><td>回数や要素が決まっている</td><td>for</td></tr>
<tr><td>「目標に達するまで」「条件が変わるまで」</td><td>while</td></tr>
</table>
<p>「毎週貯金して目標額に達するまで」のように、終わるタイミングが計算の結果で決まる処理はwhileの出番です。</p>`,
      task: `1週間の貯金額を200円に修正して、何週間で1000円に到達するかを表示してください。`,
      code: `# whileの基本形：条件がTrueの間繰り返す
count = 1
while count <= 3:
    print(f"{count}回目")
    count += 1
print("終了")

# 毎週貯金して1000円以上になるまで繰り返す
savings = 0
weeks = 0
while savings < 1000:
    savings += 100  # TODO: 1週間の貯金額を200円にする
    weeks += 1
print(f"{weeks}週間で{savings}円たまりました")
`,
      solution: `# whileの基本形：条件がTrueの間繰り返す
count = 1
while count <= 3:
    print(f"{count}回目")
    count += 1
print("終了")

# 毎週貯金して1000円以上になるまで繰り返す
savings = 0
weeks = 0
while savings < 1000:
    savings += 200  # 1週間に200円ずつ貯金する
    weeks += 1
print(f"{weeks}週間で{savings}円たまりました")
`,
      hints: [
        `whileは条件がFalseになるまで繰り返します。1週間ごとの増加額を変えましょう`,
        `savings += 100の100を200に書き換えます`
      ],
      expectedOutput: "5週間で1000円たまりました"
    },
    {
      id: 66,
      title: "無限ループ体験（条件更新忘れの修正）",
      explanation: `<p>whileの条件更新を忘れるとどうなるか、あえて体験してみましょう。次のコードは<code>count</code>を増やす行がないため、条件<code>count &lt; 3</code>が永遠にTrueのままです。</p>
<pre><code>count = 0
while count &lt; 3:
    print("処理中...", count)
    # count += 1 を忘れている！</code></pre>
<p>実行すると同じ行が延々と出力され続け、プログラムは自力では止まりません。これが<strong>無限ループ</strong>です。この学習環境では一定時間で実行が打ち切られます（タイムアウト）が、自分のPCのターミナルで起きた場合は<code>Ctrl+C</code>（実行中のプログラムに割り込んで停止させるキー操作）で止めるのが基本です。</p>
<p>無限ループは実務でも起きるバグで、原因の多くは次の3パターンです。</p>
<ul>
<li><strong>更新忘れ</strong>：条件に使う変数をループ内で変えていない</li>
<li><strong>更新の向きが逆</strong>：減らすべき変数を増やしている（またはその逆）</li>
<li><strong>条件式の誤り</strong>：絶対にFalseにならない条件を書いている</li>
</ul>
<p>デバッグのコツは「条件式に登場する変数は、ループ内のどの行で変化するか？」を指差し確認することです。まず1回そのまま実行して無限ループを観察し、それから更新の1行を追加して直してみてください。なお、意図的に<code>while True:</code>で無限ループを作り、内側の条件で抜ける書き方もありますが、それは次のステップで学ぶbreakとセットで使うテクニックです。</p>`,
      task: `まずそのまま実行して無限ループ（タイムアウト）を観察してください。その後、ループ内に<code>count</code>を1増やす行を追加して、正常に終了するように修正してください。`,
      code: `# 警告：このコードは無限ループになる。まず実行してタイムアウトを観察しよう
count = 0
while count < 3:
    print("処理中...", count)
    # TODO: countを1増やす行をここに追加して、ループが止まるようにする

# 修正できたら、このメッセージが表示されるはず
print("正常に終了しました")
`,
      solution: `# 条件に使う変数をループ内で更新すれば止まる
count = 0
while count < 3:
    print("処理中...", count)
    count += 1  # 条件に使う変数を更新する

print("正常に終了しました")
`,
      hints: [
        `条件count < 3のcountが、ループ内のどこかで変化していますか`,
        `print行の下にcount += 1を追加します（インデントはprint行と揃えます）`
      ],
      expectedOutput: "正常に終了しました"
    },
    {
      id: 67,
      title: "break・continue",
      explanation: `<p>ループの流れを途中で変えるキーワードが<strong>break</strong>と<strong>continue</strong>です。</p>
<table>
<tr><th>キーワード</th><th>動き</th><th>典型的な用途</th></tr>
<tr><td><code>break</code></td><td>ループ全体を即座に終了する</td><td>探し物が見つかったら打ち切る</td></tr>
<tr><td><code>continue</code></td><td>今回の周だけ打ち切り、次の周へ進む</td><td>条件に合わないデータをスキップする</td></tr>
</table>
<pre><code>for i in range(1, 10):
    if i == 5:
        break  # 5に達したらループごと終了
    print(i)  # 1〜4だけ表示される</code></pre>
<pre><code>for i in range(1, 6):
    if i % 2 != 0:
        continue  # 奇数はここで次の周へ
    print(i)  # 2と4だけ表示される</code></pre>
<p>どちらもif文と組み合わせて使うのが基本形です。breakは「これ以上回っても無意味」なときに無駄な繰り返しを省き、continueは「この要素は対象外」を早めに宣言して、インデントの深いif-elseを避けるのに役立ちます。特にcontinueを使うと「スキップ条件を先に書き、本処理をフラットに書く」構成にでき、読みやすさが上がります（ガード節と呼ばれる考え方に通じます）。</p>
<p>注意点として、breakで抜けられるのは<strong>いちばん内側のループだけ</strong>です。二重ループの外側までは抜けません。また、whileと組み合わせた<code>while True:</code>＋<code>break</code>は「抜ける条件をループの途中で判定したい」ときの定番パターンです。</p>`,
      task: `2つ目のfor文に<code>continue</code>を使った奇数のスキップを追加して、偶数だけが表示されるようにしてください。`,
      code: `# breakの例：目的の値が見つかったらループを打ち切る
for i in range(1, 10):
    if i == 5:
        print("5を見つけたので終了")
        break
    print(f"探索中: {i}")

# TODO: continueを使って奇数をスキップし、偶数だけ表示する
for i in range(1, 8):
    print(f"偶数: {i}")
`,
      solution: `# breakの例：目的の値が見つかったらループを打ち切る
for i in range(1, 10):
    if i == 5:
        print("5を見つけたので終了")
        break
    print(f"探索中: {i}")

# 奇数のときはcontinueで次の周へスキップする
for i in range(1, 8):
    if i % 2 != 0:
        continue
    print(f"偶数: {i}")
`,
      hints: [
        `continueは「今回の周はここで終わり」を意味します。スキップしたい条件をifで書きます`,
        `ループの先頭でif i % 2 != 0:のときにcontinueします`
      ],
      expectedOutput: "偶数: 6"
    },
    {
      id: 68,
      title: "enumerate",
      explanation: `<p>リストを回しながら「何番目か」も使いたい場面はよくあります。カウンタ変数を自分で用意して増やす方法でも書けますが、初期化と更新の2か所を管理する必要があり、ずれやすいのが難点です。Pythonには専用の組み込み関数<strong>enumerate()</strong>（要素に番号を付けて取り出す関数）があります。</p>
<pre><code>members = ["佐藤", "鈴木", "高橋"]
for i, name in enumerate(members):
    print(i, name)
# 0 佐藤 / 1 鈴木 / 2 高橋</code></pre>
<p>enumerateは「(番号, 要素)」のタプルを順に生成し、forの行で2つの変数にアンパックして受け取ります。番号は0始まりですが、2つ目の引数<code>start</code>で開始番号を変えられます。順位表や行番号のように1始まりにしたいときは<code>enumerate(リスト, start=1)</code>とするだけです。</p>
<pre><code>for i, name in enumerate(members, start=1):
    print(f"{i}番: {name}")</code></pre>
<p>「forの外でi = 0を用意し、ループ内でi += 1する」手書きカウンタと比べて、enumerateには更新忘れがなく、番号と要素の対応が絶対にずれないという利点があります。<code>range(len(リスト))</code>で回してインデックスアクセスする書き方も見かけますが、要素と番号の両方が必要なときはenumerateを使うのがPythonの慣用句（イディオム）です。コードレビューでも「手書きカウンタはenumerateに」という指摘は定番なので、ここで書き方を身につけておきましょう。</p>`,
      task: `2つ目のfor文を<code>enumerate</code>を使う形に書き換えて、1つ目の手書きカウンタ版と同じ出力（1番から始まる名簿）にしてください。`,
      code: `members = ["佐藤", "鈴木", "高橋"]

# 手書きカウンタ：初期化と更新の2か所を管理する必要がある
i = 1
for name in members:
    print(f"{i}番: {name}")
    i += 1

# TODO: enumerateを使って上と同じ出力にする（start=1で1始まりにする）
for name in members:
    print(f"?番: {name}")
`,
      solution: `members = ["佐藤", "鈴木", "高橋"]

# 手書きカウンタ：初期化と更新の2か所を管理する必要がある
i = 1
for name in members:
    print(f"{i}番: {name}")
    i += 1

# enumerateなら番号と要素を同時に受け取れる
for i, name in enumerate(members, start=1):
    print(f"{i}番: {name}")
`,
      hints: [
        `enumerateは(番号, 要素)のペアを返すので、2つの変数で受け取ります`,
        `for i, name in enumerate(members, start=1):と書きます`
      ],
      expectedOutput: "3番: 高橋"
    },
    {
      id: 69,
      title: "zip",
      explanation: `<p>「科目のリスト」と「点数のリスト」のように、対応する2つのリストを同時に回したいときは、組み込み関数<strong>zip()</strong>を使います。zipは複数のイテラブルから同じ位置の要素を1つずつ取り、タプルにまとめて順に生成します（洋服のジッパーのように2列をかみ合わせるイメージです）。</p>
<pre><code>subjects = ["数学", "英語"]
scores = [85, 72]
for subject, score in zip(subjects, scores):
    print(subject, score)
# 数学 85 / 英語 72</code></pre>
<p>enumerateと同じく、forの行でタプルをアンパックして複数の変数で受け取るのが定番の形です。3つ以上のリストも<code>zip(a, b, c)</code>のようにまとめて回せます。</p>
<p>注意点は<strong>長さが違う場合、短いほうに合わせて止まる</strong>ことです。余った要素は黙って無視されるため、データの対応ずれに気づきにくくなります。長さが一致しているべき場面では、<code>zip(a, b, strict=True)</code>と書くと長さ不一致のときにエラーで知らせてくれます（Python 3.10以降で使える安全策です）。</p>
<p>また、zipの結果から辞書を作る<code>dict(zip(keys, values))</code>は、2つのリストを対応表にまとめる実務頻出のイディオムです。「並んだデータを対にして扱いたい」と感じたら、インデックスで回す前にまずzipを思い出してください。</p>`,
      task: `<code>zip</code>を使って2つのリストを同時に回し、「数学: 85点」の形式で3教科の点数を表示してください。`,
      code: `subjects = ["数学", "英語", "理科"]
scores = [85, 72, 90]

# TODO: zipを使って2つのリストを同時に回し、「数学: 85点」の形式で表示する
for subject in subjects:
    print(f"{subject}: ?点")
`,
      solution: `subjects = ["数学", "英語", "理科"]
scores = [85, 72, 90]

# zipで対応する要素をペアにして受け取る
for subject, score in zip(subjects, scores):
    print(f"{subject}: {score}点")
`,
      hints: [
        `zip(リスト1, リスト2)は同じ位置の要素をペアにして返します`,
        `for subject, score in zip(subjects, scores):のように2つの変数で受け取ります`
      ],
      expectedOutput: "理科: 90点"
    },
    {
      id: 70,
      title: "総合演習（九九の一部とFizzBuzz）",
      explanation: `<p>この章の総仕上げとして、ループの定番課題を2つ解きます。1つ目は<strong>二重ループ</strong>（ループの中にループを入れる形）による九九の表です。外側のループが1周する間に、内側のループが最後まで回ります。</p>
<pre><code>for i in range(1, 3):
    for j in range(1, 4):
        print(f"{i}x{j}={i * j}", end=" ")
    print()  # 段の終わりで改行だけを出力</code></pre>
<p><code>end=" "</code>は第1章で学んだ改行の制御で、値を横に並べるのに使います。内側のループを抜けた位置で<code>print()</code>を呼ぶと、段ごとに改行されます。「この行はどちらのループに属しているか」をインデントで意識するのが二重ループ攻略の鍵です。</p>
<p>2つ目は<strong>FizzBuzz</strong>です。プログラミング面接の定番としても有名な問題で、1から順に数えながら、3の倍数ならFizz、5の倍数ならBuzz、両方の倍数（つまり15の倍数）ならFizzBuzzと表示します。</p>
<p>ポイントは<strong>判定の順番</strong>です。if-elif-elseは上から順に評価されるため、15の倍数の判定を最初に書かないと、15は先に「3の倍数」に該当してFizzが表示されてしまい、FizzBuzzに到達しません。「条件が重なるときは、厳しい条件から先に書く」という第6章の教訓が効いてくる問題です。倍数判定は剰余演算子<code>%</code>（割り算の余りを求める演算子）を使い、<code>n % 3 == 0</code>のように「余りが0」で書くのがイディオムです。</p>`,
      task: `FizzBuzzを完成させてください。1〜15について、3の倍数はFizz、5の倍数はBuzz、両方の倍数はFizzBuzz、それ以外は数をそのまま表示します。`,
      code: `# 課題1：九九の1〜3の段（二重ループ）は完成している。実行して動きを確認しよう
for i in range(1, 4):
    for j in range(1, 10):
        print(f"{i}x{j}={i * j}", end=" ")
    print()

# 課題2：FizzBuzz（1〜15）
# TODO: 3の倍数はFizz、5の倍数はBuzz、両方の倍数はFizzBuzz、
# それ以外は数をそのまま表示するように書き換える
for n in range(1, 16):
    print(n)
`,
      solution: `# 課題1：九九の1〜3の段（二重ループ）
for i in range(1, 4):
    for j in range(1, 10):
        print(f"{i}x{j}={i * j}", end=" ")
    print()

# 課題2：FizzBuzz。15の倍数の判定を最初に書くのがポイント
for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
`,
      hints: [
        `if-elif-elseは上から順に評価されます。15の倍数の判定を最初に書かないとFizzBuzzに到達しません`,
        `倍数の判定は剰余演算子を使ってn % 3 == 0のように書きます`,
        `15の倍数→3の倍数→5の倍数→それ以外、の順に判定します`
      ],
      expectedOutput: "FizzBuzz"
    }
  ]
});
