// 第25章：よくあるエラー：論理と実践
registerChapter({
  number: 25,
  title: "よくあるエラー：論理と実践",
  description: "エラー50選の最終章。実際のトレースバックを読んで原因を特定し、論理ミスや設計の悪癖まで踏み込んで修復する実践編です。",
  steps: [
    {
      id: 241,
      title: "off-by-oneエラー（rangeの終端）",
      explanation: `<p>off-by-oneエラー（1つずれエラー）は「境界が1つずれる」バグの総称で、プロでも頻繁にやらかす定番ミスです。今回の初期コードを実行すると、次のようなトレースバック（エラー発生までの呼び出し履歴の表示）が出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 6, in &lt;module&gt;
    print(f"{i}日目: {temps[i]}度")
                      ~~~~~^^^
IndexError: list index out of range</code></pre>
<p>トレースバックは下から読むのが鉄則です。最終行の「IndexError: list index out of range」が例外名とメッセージ、その上が発生した行です。Python 3.11以降は波線と山括弧の記号で「行のどの部分が問題か」まで指してくれます。ここではtemps[i]のアクセスが範囲外だと分かります。</p>
<p>原因はrange(1, 8)です。7日分のデータを「1日目から」と考えて1〜7で回したくなりますが、インデックスは0始まりなので有効なのはtemps[0]〜temps[6]。temps[7]は存在しません。しかもエラーになる前の出力をよく見ると、1日目に2番目のデータ14.0が表示されており、全体が1つずれています。エラーで止まることより、この「静かなずれ」のほうが怖いのです。</p>
<table>
<tr><th>典型パターン</th><th>正しい形</th></tr>
<tr><td>range(1, len(x) + 1)でx[i]を参照</td><td>range(len(x))で回し、表示用の番号はi + 1</td></tr>
<tr><td>添字と表示番号を1つの変数で兼ねる</td><td>enumerate(x, start=1)で番号と要素を分けて受け取る</td></tr>
</table>
<p>模範解答のようにenumerateを使えば、添字の計算そのものが消えるためoff-by-oneが構造的に起きなくなります。「添字を手計算しない」がこのバグへの最強の防御です。</p>`,
      task: `実行してトレースバックを確認し、7日分の気温が「1日目: 12.5度」から「7日目: 13.7度」まで正しく表示されるようにループを修正してください。`,
      code: `# 1週間の気温データ（7日分）
temps = [12.5, 14.0, 13.2, 15.8, 16.1, 14.9, 13.7]

# 1日目から7日目までの気温を表示したい
for i in range(1, 8):
    print(f"{i}日目: {temps[i]}度")`,
      solution: `# 1週間の気温データ（7日分）
temps = [12.5, 14.0, 13.2, 15.8, 16.1, 14.9, 13.7]

# enumerateで「表示用の日番号」と「要素」を別々に受け取る
for day, temp in enumerate(temps, start=1):
    print(f"{day}日目: {temp}度")`,
      hints: [
        `リストの添字は0始まりです。7要素のリストで有効な添字は0〜6。range(1, 8)は1〜7を生成するので、最初の要素が飛ばされ、最後は範囲外になります。`,
        `enumerate(temps, start=1)を使うと、1始まりの番号と要素そのものを同時に受け取れて、添字の計算が不要になります。`
      ],
      expectedOutput: "7日目: 13.7度"
    },
    {
      id: 242,
      title: "whileの無限ループ（更新忘れ）",
      explanation: `<p>初期コードを実行すると「0円」の行が延々と流れ続け、プログラムが終わりません。これはトレースバックが出ない種類のバグ、無限ループです。whileの条件savings &lt; 10000が永遠に真のままだからです。ループの中でmonthsは増やしていますが、肝心のsavingsを更新し忘れています。</p>
<p>実行が止まらないときは、Ctrl+C（コントロールキーとCを同時押し）で強制終了します。するとKeyboardInterruptという例外のトレースバックが表示されます。</p>
<pre><code>^CTraceback (most recent call last):
  File "main.py", line 7, in &lt;module&gt;
    print(f"{months}か月目: 貯金{savings}円")
KeyboardInterrupt</code></pre>
<p>これは実は貴重な手がかりで、「中断した瞬間にどの行を実行していたか」が表示されます。無限ループの調査では、Ctrl+Cを数回試して毎回同じあたりの行が出るなら、そのループが回り続けていると推測できます。</p>
<p>whileループを書くときのチェックリストは次の3点です。</p>
<ul>
<li>条件に使っている変数は、ループ本体の中で必ず変化するか</li>
<li>変化の方向は条件を偽に近づけているか（増やすべき変数を減らしていないか）</li>
<li>境界値でちょうど止まるか（9999円で止まる、10000円を超えてから止まる、の違いを意識する）</li>
</ul>
<p>実務では「万一のための脱出口」として、ループ回数の上限を設けてbreakする防御的な書き方もよく使われます。まずは条件の変数を更新する1行を足して、5か月で目標達成するプログラムに直しましょう。</p>`,
      task: `実行すると止まらないことを確認し（実行環境がタイムアウトで打ち切ります）、毎月2000円ずつ貯金が増えるように修正して「5か月で目標達成」と表示させてください。`,
      code: `# 貯金が10000円に達するまで毎月2000円ずつ貯める
savings = 0
months = 0

while savings < 10000:
    months = months + 1
    print(f"{months}か月目: 貯金{savings}円")

print(f"{months}か月で目標達成")`,
      solution: `# 貯金が10000円に達するまで毎月2000円ずつ貯める
savings = 0
months = 0

while savings < 10000:
    months = months + 1
    savings = savings + 2000
    print(f"{months}か月目: 貯金{savings}円")

print(f"{months}か月で目標達成")`,
      hints: [
        `whileの条件はsavingsを見ていますが、ループの中でsavingsは一度も変わっていません。条件が永遠に真のままです。`,
        `monthsを増やしている行の近くに、savingsに2000を足す1行を追加しましょう。`
      ],
      expectedOutput: "5か月で目標達成"
    },
    {
      id: 243,
      title: "条件の論理ミス（andとorの取り違え）",
      explanation: `<p>初期コードを実行すると、150点の行でIndexErrorが発生します。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 10, in &lt;module&gt;
    rank = levels[score // 25]
           ~~~~~~^^^^^^^^^^^^^
IndexError: list index out of range</code></pre>
<p>ここで重要な教訓があります。トレースバックが指す行は「エラーが発生した場所」であって「原因が書かれた場所」とは限らない、ということです。levelsの行だけ見つめても答えは出ません。「なぜ150がここまで来られたのか」と一歩さかのぼると、無効値を弾くはずのif文にたどり着きます。</p>
<p>score &lt; 0 and score &gt; 100は「0未満、かつ100超」。1つの数が同時に両方を満たすことはあり得ないので、この条件は常に偽になり、どんな値も素通りします。正しくは「0未満、または100超」のorです。日本語の「〜と〜は無効」につられてandと書いてしまうのが典型パターンです。</p>
<table>
<tr><th>書き方</th><th>意味</th><th>150のとき</th></tr>
<tr><td>score &lt; 0 and score &gt; 100</td><td>両方満たす（あり得ない）</td><td>偽（素通り）</td></tr>
<tr><td>score &lt; 0 or score &gt; 100</td><td>どちらか満たせば無効</td><td>真（弾ける）</td></tr>
<tr><td>not (0 &lt;= score &lt;= 100)</td><td>有効範囲の否定</td><td>真（弾ける）</td></tr>
</table>
<p>3つ目のように「有効な範囲を書いてnotで裏返す」形は、正常系を素直に表現できるため読み間違いが起きにくい書き方です。条件式を書いたら、境界値（0、100）と明らかな異常値（-1、150）を頭の中で代入して検算する習慣をつけましょう。</p>`,
      task: `実行してIndexErrorを確認し、無効な点数（0未満または100超）が正しく弾かれるようにif文の条件を修正してください。`,
      code: `# テストの点数（0〜100点が有効）をランク判定する
scores = [85, 40, 150, 100]
levels = ["E", "D", "C", "B", "A"]

for score in scores:
    # 無効な点数（0未満または100超）は弾きたい
    if score < 0 and score > 100:
        print(f"無効な点数です: {score}")
        continue
    rank = levels[score // 25]
    print(f"{score}点 → ランク{rank}")`,
      solution: `# テストの点数（0〜100点が有効）をランク判定する
scores = [85, 40, 150, 100]
levels = ["E", "D", "C", "B", "A"]

for score in scores:
    # 「0未満」または「100超」のどちらかに当てはまれば無効
    if score < 0 or score > 100:
        print(f"無効な点数です: {score}")
        continue
    rank = levels[score // 25]
    print(f"{score}点 → ランク{rank}")`,
      hints: [
        `エラーはlevelsの行で起きていますが、原因は150がif文を素通りしていることです。150を条件に代入して、真偽を手で確かめてみましょう。`,
        `「0未満、かつ100超」を同時に満たす数はありません。「どちらか一方でも当てはまれば無効」にするにはandではなく何を使いますか。`
      ],
      expectedOutput: "無効な点数です: 150"
    },
    {
      id: 244,
      title: "isと==の混同",
      explanation: `<p>初期コードでは期限切れの本が1冊もないのに、実行すると「期限切れはありません」ではなくIndexErrorになります。原因はresult is []という比較です。</p>
<p>==とisは似て見えますが、比べているものが違います。==は「値が等しいか」、isは「同じオブジェクトそのものか（メモリ上の同一人物か）」を判定します。[]と書くたびに新しい空リストが作られるため、result is []は中身が何であれ常に偽です。その結果、空のresultがelse側に流れてresult[0]で範囲外アクセスが起きました。</p>
<pre><code>a = []
b = []
print(a == b)    # True（値は等しい）
print(a is b)    # False（別のオブジェクト）</code></pre>
<p>文字列や数値のリテラルにisを使うと、Pythonは警告で教えてくれます。</p>
<pre><code>SyntaxWarning: "is" with 'str' literal. Did you mean "=="?</code></pre>
<p>厄介なのは、小さな整数や短い文字列はPythonの内部最適化（キャッシュ）で偶然isが真になることがある点です。「手元では動いたのに本番で壊れる」を生む温床なので、値の比較には必ず==を使います。</p>
<table>
<tr><th>比較したいもの</th><th>正しい書き方</th></tr>
<tr><td>値の等しさ</td><td>==</td></tr>
<tr><td>Noneかどうか</td><td>is None / is not None</td></tr>
<tr><td>リストが空かどうか</td><td>if not result:（空はfalsyを利用）</td></tr>
</table>
<p>isの正しい出番はNone判定です。Noneはプログラム全体で1つしか存在しない特別なオブジェクトなので、is Noneが公式スタイルガイド（PEP 8）でも推奨されています。</p>`,
      task: `実行してIndexErrorを確認し、resultが空のとき「期限切れの本はありません」と表示されるように比較を修正してください。`,
      code: `def find_overdue(books):
    """返却期限切れの本のタイトル一覧を返す"""
    overdue = []
    for book in books:
        if book["days_left"] < 0:
            overdue.append(book["title"])
    return overdue

books = [
    {"title": "Python入門", "days_left": 3},
    {"title": "アルゴリズム図鑑", "days_left": 5},
]

result = find_overdue(books)
if result is []:
    print("期限切れの本はありません")
else:
    print(f"最初の期限切れ: {result[0]}")`,
      solution: `def find_overdue(books):
    """返却期限切れの本のタイトル一覧を返す"""
    overdue = []
    for book in books:
        if book["days_left"] < 0:
            overdue.append(book["title"])
    return overdue

books = [
    {"title": "Python入門", "days_left": 3},
    {"title": "アルゴリズム図鑑", "days_left": 5},
]

result = find_overdue(books)
if not result:
    print("期限切れの本はありません")
else:
    print(f"最初の期限切れ: {result[0]}")`,
      hints: [
        `isは「同じオブジェクトか」を比べます。[]と書くたびに新しいリストが作られるので、result is []は常に偽になります。`,
        `空リストの判定はif result == []:でも動きますが、Python流はif not result:です（空のリストはfalsy）。`
      ],
      expectedOutput: "期限切れの本はありません"
    },
    {
      id: 245,
      title: "組み込み関数のシャドーイング",
      explanation: `<p>初期コードは合計までは正しく表示されますが、平均の計算で止まります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 11, in &lt;module&gt;
    average = sum(sales) / len(sales)
              ~~~^^^^^^^
TypeError: 'int' object is not callable</code></pre>
<p>「'int' object is not callable」は「整数は呼び出せない（関数のように括弧を付けて実行できない）」という意味です。sum(sales)と書いた瞬間のsumは、もはや組み込み関数ではありません。前半でsum = 0と代入した時点で、変数sumが組み込み関数sumを覆い隠して（シャドーイングして）いるのです。だからsum(sales)は「整数0に括弧を付けて呼び出そうとした」ことになり、TypeErrorになります。</p>
<p>Pythonでは組み込み関数の名前も普通の変数と同じ仕組みで解決されるため、代入すれば簡単に上書きできてしまいます。エラーメッセージに「not callable」を見たら、「その名前、直前にどこかで別の値を代入していないか」を疑うのが定石です。</p>
<table>
<tr><th>つい使いがちな名前</th><th>代わりの名前の例</th></tr>
<tr><td>sum</td><td>total</td></tr>
<tr><td>list</td><td>items、names</td></tr>
<tr><td>max / min</td><td>largest / smallest</td></tr>
<tr><td>str / id / type</td><td>text / user_id / kind</td></tr>
</table>
<p>特にlistを変数名にすると、その後のlist(range(3))のような型変換が全滅するため被害が広がります。多くのエディタは組み込み名を特別な色で表示するので、変数名を付けた瞬間に色が変わったら危険信号です。修正は単純で、変数名を組み込みとかぶらない名前に変えるだけです。</p>`,
      task: `実行してTypeErrorを確認し、組み込み関数sumを覆い隠している変数名を別の名前に変えて、合計と平均の両方が表示されるようにしてください。`,
      code: `# 各商品の売上を集計する
sales = [1200, 3400, 560, 2800]

# 合計を入れる変数のつもりでsumという名前を使ってしまった
sum = 0
for s in sales:
    sum = sum + s
print(f"合計: {sum}円")

# 平均も組み込み関数で計算しようとすると……
average = sum(sales) / len(sales)
print(f"平均: {average:.0f}円")`,
      solution: `# 各商品の売上を集計する
sales = [1200, 3400, 560, 2800]

# 組み込み関数とかぶらない名前に変える
total = 0
for s in sales:
    total = total + s
print(f"合計: {total}円")

# sumはそのまま組み込み関数として使える
average = sum(sales) / len(sales)
print(f"平均: {average:.0f}円")`,
      hints: [
        `「'int' object is not callable」は、関数だと思って呼び出した名前の中身が整数だったという意味です。sumに何を代入したか探しましょう。`,
        `変数sumをtotalなどに一括で改名すれば、組み込み関数sumが復活します。`
      ],
      expectedOutput: "平均: 1990円"
    },
    {
      id: 246,
      title: "ソートの罠（文字列としての数値ソート）",
      explanation: `<p>初期コードの実行結果は二段構えで壊れています。まずランキングが['9', '88', '72', '100']と、9が最上位に来る不可解な並びになり、続いて合計でTypeErrorが発生します。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 10, in &lt;module&gt;
    total = sum(scores)
TypeError: unsupported operand type(s) for +: 'int' and 'str'</code></pre>
<p>原因はどちらも同じで、split(",")の結果が文字列のリスト['88', '100', '9', '72']だからです。文字列同士の大小比較は辞書順（1文字目から文字コードで比べる）で行われます。"100"と"9"では1文字目の"1"と"9"を比べ、"1"のほうが小さいので"100" &lt; "9"が真になります。数としては100のほうが大きいのに、です。桁数の多い数値ほど「先頭の1文字」に負けるという、実務のID順・バージョン順の整列でも頻出する罠です。</p>
<p>そしてsum(scores)のTypeErrorは「整数と文字列は足せない」の意味です（sumは初期値0に要素を足していくため'int' and 'str'と表示されます）。並びがおかしい時点で「これは数値ではなく文字列では？」と型を疑えるようになると、デバッグが一気に速くなります。print(type(scores[0]))で確かめるのも有効です。</p>
<table>
<tr><th>比較</th><th>結果</th><th>理由</th></tr>
<tr><td>9 &lt; 100</td><td>True</td><td>数値としての比較</td></tr>
<tr><td>"9" &lt; "100"</td><td>False</td><td>先頭の"9"と"1"の辞書順比較</td></tr>
</table>
<p>修正の定石は「境界で変換する」です。外部から来た文字列データは、受け取った直後に内包表記などでintへ変換し、以降のプログラム内では数値として扱います。並べ替えだけ直したいならsorted(scores, key=int)という手もありますが、合計も計算する今回は最初に変換するのが正解です。</p>`,
      task: `実行して並び順の異常とTypeErrorを確認し、分割した直後に数値へ変換して、ランキングが[100, 88, 72, 9]、合計が269点になるよう修正してください。`,
      code: `# CSVの1行を分割して得た点数データ
line = "88,100,9,72"
scores = line.split(",")

# 高い順に並べたつもりが……
ranking = sorted(scores, reverse=True)
print(f"ランキング: {ranking}")

# 合計を計算しようとすると……
total = sum(scores)
print(f"合計: {total}点")`,
      solution: `# CSVの1行を分割して得た点数データ
line = "88,100,9,72"
# 分割した直後に数値へ変換しておく
scores = [int(s) for s in line.split(",")]

# 数値として高い順に並ぶ
ranking = sorted(scores, reverse=True)
print(f"ランキング: {ranking}")

total = sum(scores)
print(f"合計: {total}点")`,
      hints: [
        `split()の戻り値は必ず文字列のリストです。'9'と'100'の比較は辞書順なので、先頭文字の'9'と'1'で決まります。`,
        `リスト内包表記で[int(s) for s in line.split(",")]のように、分割直後に全要素をintへ変換しましょう。`
      ],
      expectedOutput: "ランキング: [100, 88, 72, 9]"
    },
    {
      id: 247,
      title: "getの既定値とNoneの伝播ミス",
      explanation: `<p>初期コードを実行すると、リトライ回数は表示されるのに、その後で止まります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 10, in &lt;module&gt;
    total_wait = timeout * retry
                 ~~~~~~~~^~~~~~~
TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'</code></pre>
<p>「'NoneType' and 'int'」という表示から、掛け算の左側timeoutがNoneだと分かります。しかしこの行はNoneを作った犯人ではありません。犯人は数行上のconfig.get("timeout")です。getは既定値を指定しないと、キーが存在しないときにNoneを返します。エラーにならず静かにNoneが変数へ入り、離れた場所で計算に使われた瞬間に爆発する。これがNoneの伝播（でんぱ）と呼ばれる、実務で最も出会う障害パターンの1つです。</p>
<p>NoneTypeを含むTypeErrorを見たときの調査手順は決まっています。</p>
<ol>
<li>エラー行のどの変数がNoneかをメッセージの型名の位置から特定する</li>
<li>その変数に値を入れた場所を上流へさかのぼる</li>
<li>Noneを返し得る操作（既定値なしのget、returnのない関数、re.searchの不一致など）を見つける</li>
</ol>
<p>修正は発生源で行うのが鉄則です。エラー行をif timeout is not None:で包むのは対症療法で、Noneがさらに別の場所へ流れる余地を残します。今回はget("timeout", 30)のように第2引数で既定値を指定し、「設定がなければ30秒」という仕様をコードで表現します。既定値はエラー回避の小細工ではなく、仕様の宣言なのだという意識を持つと設計が一段うまくなります。</p>`,
      task: `実行してTypeErrorを確認し、Noneが生まれた場所を特定して、timeoutの既定値が30になるようにgetの使い方を修正してください。`,
      code: `# アプリの設定（timeoutの設定を書き忘れている）
config = {"name": "MyApp", "retry": 3}

timeout = config.get("timeout")
retry = config.get("retry")

print(f"リトライ回数: {retry}回")

# 全リトライにかかる最大待ち時間を見積もる
total_wait = timeout * retry
print(f"最大待ち時間: {total_wait}秒")`,
      solution: `# アプリの設定（timeoutの設定を書き忘れている）
config = {"name": "MyApp", "retry": 3}

# 設定がないときの既定値を第2引数で指定する
timeout = config.get("timeout", 30)
retry = config.get("retry", 3)

print(f"リトライ回数: {retry}回")

total_wait = timeout * retry
print(f"最大待ち時間: {total_wait}秒")`,
      hints: [
        `エラーメッセージの'NoneType'は、掛け算の左側timeoutがNoneだったことを示しています。timeoutに値を入れたのはどの行ですか。`,
        `辞書のgetは第2引数に既定値を指定できます。config.get("timeout", 30)のように書きます。`
      ],
      expectedOutput: "最大待ち時間: 90秒"
    },
    {
      id: 248,
      title: "例外の握りつぶしで沈黙するバグ",
      explanation: `<p>初期コードを実行すると、意外な場所でエラーになります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 15, in &lt;module&gt;
    average = sum(prices) / len(prices)
              ~~~~~~~~~~~~^~~~~~~~~~~~~
ZeroDivisionError: division by zero</code></pre>
<p>「ゼロで割った」と言われても、コードに0など書いていません。len(prices)が0、つまりpricesが空だったのです。3件のデータがあるのに、なぜ1件も追加されなかったのでしょうか。</p>
<p>真犯人はループの中に隠れています。item["prise"]はキー名のtypo（正しくはprice）で、本来なら3回ともKeyErrorが発生するはずでした。ところがexcept Exception: passがすべての例外を無言で握りつぶしたため、typoの存在ごと消え、まったく別の場所でZeroDivisionErrorとして噴出しました。これが例外の握りつぶし（error swallowing）です。トレースバックが本当の原因と無関係な場所を指すため、デバッグを著しく困難にします。</p>
<p>tryとexceptを書くときの原則は次の3つです。</p>
<ul>
<li>捕まえる例外の型を絞る（今回なら変換失敗を表すValueErrorのみ。typoのKeyErrorは捕まえずに落として気づけるようにする）</li>
<li>握りつぶさず記録する（最低でもprintで内容を出す。実務ではloggingモジュールを使う）</li>
<li>「無視してよい」と仕様で言い切れる場合だけpassし、その理由をコメントに書く</li>
</ul>
<p>except Exception: passは「エラーが起きても知らせないでくれ」という宣言と同じです。エラーは早く・大きく鳴らすほうが、結果として障害対応は短くなります。</p>`,
      task: `実行してZeroDivisionErrorを確認し、握りつぶされていた真の原因（キー名のtypo）を修正したうえで、exceptをValueErrorに絞ってください。`,
      code: `# 商品データから価格の平均を計算する
items = [
    {"name": "りんご", "price": "120"},
    {"name": "みかん", "price": "80"},
    {"name": "バナナ", "price": "100"},
]

prices = []
for item in items:
    try:
        prices.append(int(item["prise"]))
    except Exception:
        pass

average = sum(prices) / len(prices)
print(f"平均価格: {average:.0f}円")`,
      solution: `# 商品データから価格の平均を計算する
items = [
    {"name": "りんご", "price": "120"},
    {"name": "みかん", "price": "80"},
    {"name": "バナナ", "price": "100"},
]

prices = []
for item in items:
    try:
        prices.append(int(item["price"]))
    except ValueError:
        print(f"価格を数値に変換できません: {item['name']}")

average = sum(prices) / len(prices)
print(f"平均価格: {average:.0f}円")`,
      hints: [
        `ZeroDivisionErrorはpricesが空だった結果にすぎません。ループの中で3回発生していたはずの例外が、except Exception: passで見えなくなっています。`,
        `辞書のキー名をよく見ると"prise"になっています。修正したうえで、exceptはint()の失敗を表すValueErrorだけを捕まえ、メッセージを表示しましょう。`
      ],
      expectedOutput: "平均価格: 100円"
    },
    {
      id: 249,
      title: "グローバル変数依存のバグ",
      explanation: `<p>初期コードを実行すると、関数の1行目で止まります。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 8, in &lt;module&gt;
    add_item(120, 3)
    ~~~~~~~~^^^^^^^^
  File "main.py", line 5, in add_item
    total = total + price * quantity
            ^^^^^
UnboundLocalError: cannot access local variable 'total' where it is not associated with a value</code></pre>
<p>今回のトレースバックは2段になっています。上の段が呼び出した側、下の段が実際にエラーが起きた関数内の行です。呼び出しが深くなるほど段数が増え、いちばん下が現場です。</p>
<p>Pythonは「関数内のどこかで代入される名前は、その関数のローカル変数」と決めてからコードを実行します。total = total + ...の左辺で代入しているためtotalはローカル扱いになり、右辺を評価する時点では「まだ値の入っていないローカル変数」なのでUnboundLocalErrorになります。第14章で学んだとおりglobal totalと宣言すれば動きますが、ここではあえてそれを選びません。</p>
<p>グローバル変数に依存した関数には、動いたとしても次の問題が残ります。</p>
<ul>
<li>関数の入出力が見えない（何を読み書きするか、呼び出し側から分からない）</li>
<li>単体で試せない（先にグローバルの状態を整えないと呼べない）</li>
<li>呼び出し順に暗黙の制約が生まれ、離れたコードが壊し合う</li>
</ul>
<p>模範解答では、現在の合計を引数で受け取り、新しい合計をreturnで返す形に設計し直しています。データの流れが「引数として入り、戻り値として出る」だけになり、関数は入力が同じなら常に同じ結果を返します。エラーを直すとは、赤い表示を消すことではなく、バグが生まれにくい形に作り替えることでもあるのです。</p>`,
      task: `実行してUnboundLocalErrorを確認し、globalで逃げるのではなく、合計を引数で受け取り戻り値で返す設計に修正して「合計: 520円」を表示させてください。`,
      code: `# 買い物の合計を計算する（グローバル変数に依存した設計）
total = 0

def add_item(price, quantity):
    total = total + price * quantity
    print(f"小計を加えて: {total}円")

add_item(120, 3)
add_item(80, 2)
print(f"合計: {total}円")`,
      solution: `# 買い物の合計を計算する（引数と戻り値で値を受け渡す設計）
def add_item(total, price, quantity):
    """現在の合計に商品の小計を加えた新しい合計を返す"""
    total = total + price * quantity
    print(f"小計を加えて: {total}円")
    return total

total = 0
total = add_item(total, 120, 3)
total = add_item(total, 80, 2)
print(f"合計: {total}円")`,
      hints: [
        `関数内で代入される名前はローカル変数扱いになります。global宣言でも動きますが、この課題では設計ごと直します。`,
        `add_itemの引数にtotalを追加し、計算後の値をreturnで返して、呼び出し側でtotal = add_item(total, 120, 3)のように受け取り直しましょう。`
      ],
      expectedOutput: "合計: 520円"
    },
    {
      id: 250,
      title: "卒業：エラーだらけのプログラムを完全修復する",
      explanation: `<p>最終ステップは卒業試験です。初期コードには本章と第21〜24章で学んだ種類のバグが3つ仕込まれています。トレースバックは一度に1つしか表示されないので、「実行→最下行の例外名とメッセージを読む→発生行から原因へさかのぼる→直して再実行」のサイクルで1つずつ剥がしていきます。</p>
<ol>
<li>1つ目はTypeError: unsupported operand type(s) for +: 'int' and 'str'。splitの結果が文字列のまま集計に流れています（型の罠）</li>
<li>直すと次はIndexError: list index out of range。rangeの終端がずれています（off-by-one）</li>
<li>さらに直すとTypeError: '&gt;=' not supported between instances of 'float' and 'NoneType'。既定値のないgetからNoneが伝播しています</li>
</ol>
<p>どれも本章で戦った相手です。エラーメッセージのどこを読み、どこへさかのぼるか、もう手が覚えているはずです。</p>
<h4>250ステップの総括</h4>
<p>第1章のprint("Hello, World!")から始まり、データ構造・制御構文・関数・クラス・ジェネレータ・デコレータ・標準ライブラリ・型ヒントと積み上げ、最後の50ステップでは主要なエラーを自分の手で起こし、読み、直してきました。「エラーは敵ではなく、原因の場所を教えてくれる最良の味方」。この感覚こそが、この教材で手に入れた最大の武器です。</p>
<p>次の一歩は、公式ドキュメントを「辞書」として使い始めること、pytestでテストを書きながら小さなツールを自作すること、そしてpandasやFastAPIなど関心のある分野のライブラリへ進むことです。エラーが出ても、あなたはもう読めます。250ステップの完走、おめでとうございます。ここからが本当のプログラミングの始まりです。</p>`,
      task: `実行とトレースバックの読解を繰り返して3つのバグ（型の罠・off-by-one・Noneの伝播）をすべて修復し、3科目の点数と「判定: 合格」が表示されるようにしてください。`,
      code: `# 卒業試験：模擬試験の合否レポートを完全修復する
line = "72,88,65"
subjects = ["国語", "数学", "英語"]

# 点数の合計と平均を計算する
scores = line.split(",")
total = sum(scores)
average = total / len(scores)

# 科目ごとの点数を表示する
for i in range(1, len(subjects) + 1):
    print(f"{subjects[i]}: {scores[i]}点")

# 合否を判定する（合格ラインは設定から読む）
config = {"name": "模擬試験"}
passing = config.get("passing")

print(f"合計{total}点 / 平均{average:.1f}点")
if average >= passing:
    print("判定: 合格")
else:
    print("判定: 不合格")`,
      solution: `# 卒業試験：模擬試験の合否レポートを完全修復する
line = "72,88,65"
subjects = ["国語", "数学", "英語"]

# 修正1: 文字列のリストを数値のリストに変換してから集計する
scores = [int(s) for s in line.split(",")]
total = sum(scores)
average = total / len(scores)

# 修正2: zipで科目と点数を組にして回す（添字のずれが起きない）
for subject, score in zip(subjects, scores):
    print(f"{subject}: {score}点")

# 修正3: 設定がないときの既定値を指定する
config = {"name": "模擬試験"}
passing = config.get("passing", 70)

print(f"合計{total}点 / 平均{average:.1f}点")
if average >= passing:
    print("判定: 合格")
else:
    print("判定: 不合格")`,
      hints: [
        `1つ目のTypeErrorは、splitの結果が文字列のリストのままsumに渡っているのが原因です。ステップ246と同じ直し方が使えます。`,
        `IndexErrorはrange(1, len(subjects) + 1)のずれが原因です。zip(subjects, scores)で組にして回すと添字が不要になります。`,
        `最後のTypeErrorは'NoneType'との比較です。既定値のないgetを探して、合格ライン70を既定値に指定しましょう。`
      ],
      expectedOutput: "判定: 合格"
    }
  ]
});
