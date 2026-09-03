// 第4章：リストとタプル
registerChapter({
  number: 4,
  title: "リストとタプル",
  description: "複数の値をまとめて扱うリストとタプルを学びます。要素の追加・削除・集計から、全員が一度ははまる参照の罠まで押さえます。",
  steps: [
    {
      id: 31,
      title: "リストの作成とインデックス",
      explanation: `<p><strong>リスト</strong>は、複数の値を順番に並べて1つにまとめるデータ構造です。角括弧[]の中にカンマ区切りで値を書いて作ります。</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits)         # ['apple', 'banana', 'cherry']

numbers = [10, 20, 30]
empty = []            # 空のリスト</code></pre>
<p>ここまでの章では値の数だけ変数を作るしかありませんでしたが、リストを使えばscore1、score2、score3…と変数を増やす代わりに、1つのリストへまとめられます。要素の型は揃えるのが基本ですが、文法上は数値と文字列を混ぜることもできます。</p>
<p>各要素へのアクセスは、文字列のインデックスとまったく同じ書き方です。<strong>先頭が0番</strong>で、負のインデックスは後ろから数えます。</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple
print(fruits[1])     # banana
print(fruits[-1])    # cherry（最後の要素）</code></pre>
<p>printにリストをそのまま渡すと、['apple', 'banana', 'cherry']のように角括弧付きの全体像が表示されます（文字列の要素はシングルクォート付きで表示されます）。「今リストに何が入っているか」を確認する、デバッグの基本手段です。</p>
<p>文字列で学んだインデックスの知識がそのまま通用するのはPythonの一貫性のおかげで、この後のステップで学ぶlen()・スライス・in演算子も同じように使えます。「文字列でできたことはリストでも試してみる」という姿勢で進めましょう。</p>`,
      task: `最後のprintを修正して、負のインデックスで最後の要素「cherry」を表示してください。`,
      code: `fruits = ["apple", "banana", "cherry"]
print(fruits)
print("先頭:", fruits[0])
# TODO: 負のインデックスで最後の要素を表示する
print("最後:", fruits[0])
`,
      solution: `fruits = ["apple", "banana", "cherry"]
print(fruits)
print("先頭:", fruits[0])
# 文字列と同じく、-1は最後の要素を指す
print("最後:", fruits[-1])
`,
      hints: [
        `文字列のインデックスと同じルールです。-1は最後の要素を指します。`,
        `角括弧の中に-1を書くと、要素数を数えなくても末尾にアクセスできます。`
      ],
      expectedOutput: "最後: cherry"
    },
    {
      id: 32,
      title: "要素の変更（IndexError体験と修正）",
      explanation: `<p>リストは文字列と違って<strong>ミュータブル</strong>（作った後に中身を変更できる性質）です。<code>リスト[番号] = 新しい値</code>で要素を書き換えられます。</p>
<pre><code>scores = [70, 85, 90]
scores[0] = 75
print(scores)    # [75, 85, 90]</code></pre>
<p>一方、存在しない位置に代入しようとするとIndexErrorになります。今回のcodeは意図的にこのエラーを起こします。実行すると、次のようなトレースバック（エラーに至るまでの経緯の表示）が出ます。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 3, in &lt;module&gt;
    scores[3] = 100
IndexError: list index out of range</code></pre>
<p>読み方のポイントは<strong>最終行から見る</strong>ことです。「IndexError: list index out of range」がエラーの種類と内容（リストのインデックスが範囲外）で、その上の行が発生した場所と実際のコードです。3要素のリストscoresの有効なインデックスは0・1・2で、scores[3]は存在しません。「3番目の要素」のつもりでscores[3]と書いてしまうのは、0始まりに慣れるまで誰もが通るミスです。</p>
<p>末尾を確実に指したいときは、scores[-1]と負のインデックスを使うと要素数を気にせず安全に書けます。また、既存の要素を「書き換える」のではなく、リストの末尾に「追加」したいときは、代入ではなく次のステップで学ぶappendを使います。この「変更は代入、追加はメソッド」という区別を意識しておきましょう。</p>`,
      task: `<code>scores[3]</code>への代入はIndexErrorになります。意図は「最後の要素90を100に書き換える」です。正しいインデックスに直してください。`,
      code: `scores = [70, 85, 90]
# 最後の要素90を100に書き換えたい（このままだとIndexError）
scores[3] = 100
print(scores)
`,
      solution: `scores = [70, 85, 90]
# インデックスは0始まりなので、3つ目の要素は2番（scores[-1]でもよい）
scores[2] = 100
print(scores)
`,
      hints: [
        `インデックスは0から始まるので、3つ目の要素の番号は2です。`,
        `scores[-1]のように、負のインデックスで末尾を指す書き方もあります。`
      ],
      expectedOutput: "[70, 85, 100]"
    },
    {
      id: 33,
      title: "append・insert・remove・pop",
      explanation: `<p>リストに要素を出し入れする4つの基本メソッドを学びます。すべて<strong>リスト自身を直接変更する</strong>（新しいリストを返すのではない）ことに注意してください。</p>
<table>
<tr><th>メソッド</th><th>働き</th></tr>
<tr><td><code>append(x)</code></td><td>末尾にxを追加する</td></tr>
<tr><td><code>insert(i, x)</code></td><td>位置iにxを差し込む</td></tr>
<tr><td><code>remove(x)</code></td><td>最初に見つかったxを削除する</td></tr>
<tr><td><code>pop()</code></td><td>末尾の要素を取り除いて返す（pop(i)で位置指定も可）</td></tr>
</table>
<pre><code>members = ["田中", "鈴木"]
members.append("佐藤")        # 末尾に追加
members.insert(0, "山本")     # 先頭に差し込む
print(members)                # ['山本', '田中', '鈴木', '佐藤']

members.remove("鈴木")        # 値を指定して削除
last = members.pop()          # 末尾を取り除き、その値を受け取る
print(last)                   # 佐藤</code></pre>
<p>popだけは「削除した値を返す」ので、変数で受け取ってそのまま使えます。removeは「値」で、popは「位置」で削除する、という使い分けです。removeで存在しない値を指定するとValueErrorになる点にも注意しましょう。</p>
<p>もうひとつ、これらのメソッドの戻り値をうっかり代入するミスが定番です。members = members.append("佐藤")と書くと、appendは何も返さない（Noneという「値がない」ことを表す特別な値を返す）ため、リストがNoneに置き換わって消えてしまいます。「リストを変更するメソッドは、代入せずそのまま呼ぶ」と覚えてください。この罠は第22章でもエラーとして詳しく扱います。</p>`,
      task: `TODOの2か所を埋めてください。insertで先頭（位置0）に「山本」を追加し、removeで「鈴木」を削除します。printで途中経過が変わっていく様子を観察しましょう。`,
      code: `members = ["田中", "鈴木"]
members.append("佐藤")
print(members)

# TODO: insertを使って先頭（位置0）に「山本」を追加する

print(members)

# TODO: removeで「鈴木」を削除する

print(members)

last = members.pop()
print("popで取り出した:", last)
print(members)
`,
      solution: `members = ["田中", "鈴木"]
members.append("佐藤")
print(members)

# insertは(位置, 値)の順で渡す
members.insert(0, "山本")
print(members)

# removeは削除したい値そのものを渡す
members.remove("鈴木")
print(members)

last = members.pop()
print("popで取り出した:", last)
print(members)
`,
      hints: [
        `insertは(位置, 値)の順で2つの引数を渡します。先頭は位置0です。`,
        `removeには、削除したい値そのもの（"鈴木"）を渡します。`,
        `どちらもリスト自身を変更するので、代入は不要です。members.insert(...)のようにそのまま呼びます。`
      ],
      expectedOutput: "popで取り出した: 佐藤"
    },
    {
      id: 34,
      title: "len・sum・min・max・sorted",
      explanation: `<p>リストの集計は、組み込み関数に任せるのが基本です。文字列で学んだlen()に加えて、数値のリストにはsum・min・maxがそのまま使えます。</p>
<table>
<tr><th>関数</th><th>働き</th></tr>
<tr><td><code>len(lst)</code></td><td>要素数を返す</td></tr>
<tr><td><code>sum(lst)</code></td><td>合計を返す</td></tr>
<tr><td><code>max(lst)</code>・<code>min(lst)</code></td><td>最大値・最小値を返す</td></tr>
<tr><td><code>sorted(lst)</code></td><td>昇順に並べ替えた新しいリストを返す</td></tr>
</table>
<pre><code>scores = [72, 95, 60, 88]
print(len(scores))       # 4
print(sum(scores))       # 315
print(max(scores))       # 95
print(sorted(scores))    # [60, 72, 88, 95]</code></pre>
<p>平均値を求める組み込み関数はありませんが、sum(scores) / len(scores)の組み合わせで計算できます。この「小さな道具を組み合わせて目的を達成する」のがPython流です。</p>
<p>sorted()は<strong>元のリストを変えず</strong>、並べ替えた新しいリストを返します。似たものにリスト自身を並べ替えるsort()メソッドがありますが、こちらは何も返さない（None）ため、result = scores.sort()と代入するとresultがNoneになる罠があります（第25章で扱う定番バグです）。迷ったら、元のデータを保ったまま結果を受け取れるsorted()を使うのが安全です。</p>
<p>第7章でループを学ぶと集計を自力でも書けるようになりますが、実務では「組み込み関数で書けるものは組み込み関数で」が読みやすさと速度の両面で正解です。組み込み関数はC言語で実装されており、自分でループを書くより高速に動きます。</p>`,
      task: `TODOの3か所を修正して、最高点・最低点・平均点を表示してください。平均は「合計÷件数」で計算します。`,
      code: `scores = [72, 95, 60, 88]
print("件数:", len(scores))
print("合計:", sum(scores))
# TODO: 最高点と最低点をmax・minで表示する
print("最高:", 0)
print("最低:", 0)
# TODO: 平均点を計算して表示する（合計÷件数）
print("平均:", 0)
print("並び替え:", sorted(scores))
`,
      solution: `scores = [72, 95, 60, 88]
print("件数:", len(scores))
print("合計:", sum(scores))
print("最高:", max(scores))
print("最低:", min(scores))
# 平均を求める組み込み関数はないので、sumとlenを組み合わせる
print("平均:", sum(scores) / len(scores))
print("並び替え:", sorted(scores))
`,
      hints: [
        `最高点はmax(scores)、最低点はmin(scores)で求められます。`,
        `平均は「合計÷件数」なので、sumとlenの結果を/で割り算します。`
      ],
      expectedOutput: "平均: 78.75"
    },
    {
      id: 35,
      title: "コピーと参照の罠（b = aで両方変わる。copy()・スライスコピー）",
      explanation: `<p>リストの代入には、初心者からミドルまで全員が一度ははまる<strong>参照の罠</strong>があります。<code>b = a</code>と書いても、リストは<strong>コピーされません</strong>。</p>
<pre><code>a = [1, 2, 3]
b = a           # コピーではなく「同じリストに別名を付けた」だけ
b.append(4)
print(a)        # [1, 2, 3, 4] ←aまで変わってしまう</code></pre>
<p>変数は「値の入った箱」ではなく「値に貼った名札」だとイメージしてください。b = aは、同じ1つのリストにaとbという2枚の名札を貼る操作です。どちらの名札経由で変更しても、実体のリストは1つしかないので、両方の表示が変わります。この「変数が実体を指し示す関係」を参照と呼びます。数値や文字列で同じ罠を踏まなかったのは、それらがイミュータブルで、後から中身を書き換える操作がそもそも存在しないからです。</p>
<p>独立したコピーが欲しいときは、copy()メソッドか全範囲スライスを使います。</p>
<pre><code>a = [1, 2, 3]
b = a.copy()    # 新しいリストを作ってコピー（b = a[:]でも同じ）
b.append(4)
print(a)        # [1, 2, 3]（aは影響を受けない）
print(b)        # [1, 2, 3, 4]</code></pre>
<p>ただし、copy()が作るのは1段階だけの「浅いコピー」です。リストの中にリストが入っている場合、内側のリストは共有されたままになる、というさらに深い罠があり、第23章でdeepcopyとあわせて扱います。まずは「リストの代入はコピーではない。コピーしたければcopy()」を確実に押さえてください。関数にリストを渡すときにも同じ仕組みが働くため、この理解は第8章以降でも効いてきます。</p>`,
      task: `<code>b = a</code>のままだと、bへのappendでaまで変わってしまいます。copy()を使ってbを独立したコピーにし、aが[1, 2, 3]のまま表示されるように直してください。`,
      code: `a = [1, 2, 3]
# TODO: これでは「同じリスト」を指してしまう。copy()を使ったコピーに直す
b = a
b.append(4)
print("a =", a)
print("b =", b)
`,
      solution: `a = [1, 2, 3]
# copy()は新しいリストを作って返す（a[:]のスライスコピーでも同じ）
b = a.copy()
b.append(4)
print("a =", a)
print("b =", b)
`,
      hints: [
        `まず一度そのまま実行して、aまで[1, 2, 3, 4]に変わることを確認すると理解が深まります。`,
        `a.copy()は中身の同じ新しいリストを返します。それをbに代入します。`
      ],
      expectedOutput: "a = [1, 2, 3]"
    },
    {
      id: 36,
      title: "in演算子とindex・count",
      explanation: `<p>「リストにその値があるか・どこにあるか・いくつあるか」を調べる3つの道具です。</p>
<table>
<tr><th>道具</th><th>働き</th></tr>
<tr><td><code>値 in リスト</code></td><td>含まれていればTrue、いなければFalse</td></tr>
<tr><td><code>リスト.index(値)</code></td><td>最初に見つかった位置を返す（なければValueError）</td></tr>
<tr><td><code>リスト.count(値)</code></td><td>出現回数を返す</td></tr>
</table>
<pre><code>colors = ["red", "blue", "red", "green"]
print("blue" in colors)         # True
print("yellow" in colors)       # False
print(colors.index("green"))    # 3
print(colors.count("red"))      # 2</code></pre>
<p>文字列で学んだin演算子が、リストでもそのまま使えます。ただし1つ違いがあります。文字列のinは「部分文字列」を探しますが、リストのinは「要素そのものとの一致」を調べます。["apple", "banana"]に対して"app" in ...はFalseです（"apple"という要素の一部であっても、要素として一致しないため）。</p>
<p>注意したいのはindex()の失敗時の挙動です。文字列のfind()は見つからないと-1を返しましたが、リストのindex()は<strong>ValueErrorを発生させてプログラムを止めます</strong>。そのため、存在するかどうか分からない値には、先にinで確認してからindexを使うのが安全です（第6章で条件分岐を学ぶと、この確認を自然に書けるようになります）。</p>
<p>count()は重複データの確認によく使います。count(x)が0かどうかでinと同じ判定もできますが、「含まれるか」だけが知りたいならinの方が意図が読み手に伝わります。目的に一番近い道具を選ぶことが、読みやすいコードへの近道です。</p>`,
      task: `TODOの2か所を修正してください。「yellow」が含まれるかをin演算子で、「green」の位置をindexメソッドで表示します。`,
      code: `colors = ["red", "blue", "red", "green"]
print("blueを含む:", "blue" in colors)
# TODO: 「yellow」が含まれるかをin演算子で表示する
print("yellowを含む:", False)
# TODO: indexメソッドで「green」の位置を表示する
print("greenの位置:", 0)
print("redの個数:", colors.count("red"))
`,
      solution: `colors = ["red", "blue", "red", "green"]
print("blueを含む:", "blue" in colors)
print("yellowを含む:", "yellow" in colors)
print("greenの位置:", colors.index("green"))
print("redの個数:", colors.count("red"))
`,
      hints: [
        `inは「値 in リスト」の語順で書く演算子です。結果はTrueかFalseになります。`,
        `indexはメソッドなので、colors.index(値)の形で呼び出します。`
      ],
      expectedOutput: "greenの位置: 3"
    },
    {
      id: 37,
      title: "リストの連結と繰り返し",
      explanation: `<p>文字列と同じく、リストも<code>+</code>で連結、<code>*</code>で繰り返しができます。どちらも<strong>新しいリストを返し</strong>、元のリストは変わりません。</p>
<pre><code>morning = ["パン", "コーヒー"]
lunch = ["パスタ", "サラダ"]
meals = morning + lunch
print(meals)     # ['パン', 'コーヒー', 'パスタ', 'サラダ']

zeros = [0] * 5
print(zeros)     # [0, 0, 0, 0, 0]</code></pre>
<p>[0] * 5のような繰り返しは、「決まった長さのリストを初期値で埋めて用意する」定番テクニックです。</p>
<p>連結には<code>extend()</code>メソッドという道具もあります。+が新しいリストを作るのに対し、extendは元のリスト自身に相手の全要素を追加します。</p>
<pre><code>meals = ["パン"]
meals.extend(["パスタ", "サラダ"])   # mealsそのものに追加される
print(meals)     # ['パン', 'パスタ', 'サラダ']</code></pre>
<p>使い分けは「元のリストを残したいなら+、1つのリストを育てていくならextend」です。ここでextendのつもりでappend(["パスタ", "サラダ"])と書いてしまうと、リストが丸ごと1つの要素として入れ子になる、という取り違えが定番ミスです。appendは「1要素の追加」、extendは「全要素の追加」と覚えましょう。</p>
<p>注意点も2つあります。リストと文字列のように型の違うもの同士の+はTypeErrorです。また、[[0] * 3] * 3のように「リストのリスト」を*で作ると、3つの行がすべて同じリストを指してしまい、前ステップの参照の罠を踏みます（第23章で扱います）。*で増やしてよいのは数値や文字列のようなイミュータブルな値だけ、と覚えておくと安全です。</p>`,
      task: `TODOを修正して、+でmorningとlunchを連結したリストmealsを作ってください。zerosの行はそのままで、[0]が5個に増える様子を観察しましょう。`,
      code: `morning = ["パン", "コーヒー"]
lunch = ["パスタ", "サラダ"]
# TODO: +で2つのリストを連結してmealsを作る
meals = morning
print(meals)

zeros = [0] * 5
print(zeros)
`,
      solution: `morning = ["パン", "コーヒー"]
lunch = ["パスタ", "サラダ"]
# +は2つのリストを繋げた新しいリストを返す（morningは変わらない）
meals = morning + lunch
print(meals)

zeros = [0] * 5
print(zeros)
`,
      hints: [
        `リストの連結は文字列と同じで、+で繋ぐだけです。`,
        `連結の結果は新しいリストとして返ってくるので、それをmealsに代入します。`
      ],
      expectedOutput: "['パン', 'コーヒー', 'パスタ', 'サラダ']"
    },
    {
      id: 38,
      title: "タプル（イミュータブル。TypeError体験）",
      explanation: `<p><strong>タプル</strong>は、リストとよく似た「値の並び」ですが、<strong>一度作ったら変更できない</strong>（イミュータブル）点が決定的に違います。丸括弧()で作ります。</p>
<pre><code>point = (10, 20)
print(point[0])      # 10（読み取りはリストと同じ）
print(len(point))    # 2（len・スライス・inも使える）</code></pre>
<p>インデックス・スライス・len・inといった読み取り系の操作はリストと共通ですが、要素を書き換えようとするとTypeErrorになります。今回のcodeを実行すると、次のエラーが出ます。</p>
<pre><code>TypeError: 'tuple' object does not support item assignment</code></pre>
<p>「タプルは要素への代入をサポートしない」という意味です。append・remove等の変更系メソッドもありません。値を変えたい場合は、新しいタプルを作って変数に代入し直します。タプル自体は変更できなくても、変数の指す先を新しいタプルへ切り替えるのは自由だからです。</p>
<p>「変更できないのは不便では」と思うかもしれませんが、これは長所です。座標(x, y)やRGB値のように「セットで1つの意味を持ち、途中で書き換わってほしくないデータ」をタプルにしておけば、うっかり書き換えるバグをPythonが未然に防いでくれます。前ステップで見た参照の罠も、イミュータブルなタプルでは起きません。</p>
<p>実務での使い分けは「増減・変更するならリスト、変更しない並びはタプル」が基本です。また、タプルは辞書のキーにできる（リストはできない）という違いもあり、これは第5章で辞書を学ぶと意味が分かります。</p>`,
      task: `<code>point[0]</code>への代入はTypeErrorになります。タプルは変更できないので、(99, 20)という新しいタプルを作ってpointに代入し直す形へ修正してください。`,
      code: `point = (10, 20)
print(point)
print("x座標:", point[0])
# x座標を99に変えたい（このままだとTypeError）
point[0] = 99
print(point)
`,
      solution: `point = (10, 20)
print(point)
print("x座標:", point[0])
# タプルは変更できないので、新しいタプルを作って代入し直す
point = (99, 20)
print(point)
`,
      hints: [
        `タプルの要素は書き換えられませんが、変数に別のタプルを代入し直すことはできます。`,
        `point = (新しいx座標, 20)の形で、丸ごと作り直します。`
      ],
      expectedOutput: "(99, 20)"
    },
    {
      id: 39,
      title: "多重代入とアンパック",
      explanation: `<p><strong>多重代入</strong>と<strong>アンパック</strong>は、複数の変数への代入を1行で書けるPythonらしい記法です。</p>
<pre><code>x, y = 10, 20          # 多重代入
print(x, y)            # 10 20

date = (2024, 12, 25)
year, month, day = date    # タプルを3つの変数に分解
print(year)            # 2024</code></pre>
<p>アンパックとは、タプルやリストの各要素を、対応する位置の変数へ一斉に割り当てることです。実は多重代入のx, y = 10, 20も、右辺が(10, 20)というタプルとして作られ、それが左辺の2つの変数にアンパックされています。見た目は別の機能でも、裏側は同じ仕組みです。</p>
<p>この仕組みの応用が、変数の入れ替えです。第1章では一時変数を経由して入れ替えましたが、アンパックなら1行で書けます。</p>
<pre><code>a = 1
b = 2
a, b = b, a     # 右辺の(2, 1)が先に作られ、左辺に展開される
print(a, b)     # 2 1</code></pre>
<p>右辺全体が先に評価されてから代入されるため、一時変数がなくても値は壊れません。他言語の経験者が最初に感動するPythonのイディオム（定番の書き方）の1つです。</p>
<p>注意点として、左辺の変数の数と右辺の要素数は一致している必要があります。合わないと「ValueError: too many values to unpack」等のエラーになります（第23章で扱います）。要素数が決まっているタプルとアンパックは相性がよく、関数が複数の値をまとめて返す仕組み（第8章）でも、この形が主役になります。</p>`,
      task: `TODOの2か所を修正してください。dateを1行のアンパックでyear・month・dayに分解し、aとbの入れ替えを多重代入（一時変数なし）で書きます。`,
      code: `x, y = 10, 20
print(x, y)

date = (2024, 12, 25)
# TODO: 3行の代入を、1行のアンパックにまとめる
year = date[0]
month = date[1]
day = date[2]
print(f"{year}年{month}月{day}日")

a = 1
b = 2
# TODO: 多重代入でaとbの値を入れ替える（一時変数を使わない）
print("a =", a, "b =", b)
`,
      solution: `x, y = 10, 20
print(x, y)

date = (2024, 12, 25)
# アンパック：各要素が対応する位置の変数に入る
year, month, day = date
print(f"{year}年{month}月{day}日")

a = 1
b = 2
# 右辺の(b, a)が先に作られてから代入される
a, b = b, a
print("a =", a, "b =", b)
`,
      hints: [
        `アンパックは「変数1, 変数2, 変数3 = タプル」の形で書きます。`,
        `入れ替えは、左辺と右辺で変数の順番を逆にした多重代入です。`
      ],
      expectedOutput: "a = 2 b = 1"
    },
    {
      id: 40,
      title: "総合演習（テストの点数集計）",
      explanation: `<p>第4章の総仕上げとして、テストの点数リストを集計します。ループはまだ学んでいませんが、この章の道具だけで一通りの集計が書けます。</p>
<table>
<tr><th>道具</th><th>この演習での役割</th></tr>
<tr><td><code>append</code></td><td>新しい点数の追加</td></tr>
<tr><td><code>len</code>・<code>sum</code></td><td>件数と合計</td></tr>
<tr><td><code>max</code>・<code>min</code></td><td>最高点・最低点</td></tr>
<tr><td><code>sum / len</code></td><td>平均</td></tr>
<tr><td><code>sorted</code>＋スライス</td><td>並べ替えて上位を取り出す</td></tr>
</table>
<p>集計処理を書くときの実務的なポイントを2つ挙げます。1つ目は<strong>元データを壊さない</strong>ことです。並べ替えにsorted()を使えば、scoresは受け取った順のまま保たれます。「入力データは読み取り専用として扱い、加工結果は新しい変数に受ける」を意識すると、後から「元の順番が必要だった」となっても安全です。</p>
<p>2つ目は、表示の丸めはf-stringに任せることです。平均点は77.666...という割り切れない値になりますが、average変数には正確な値のまま持たせ、表示の瞬間だけ:.1fで丸めます。</p>
<pre><code>ranking = sorted(scores)    # 昇順の新しいリスト
top3 = ranking[-3:]         # 末尾3件＝大きい方から3件
print(f"平均点: {average:.1f}点")</code></pre>
<p>sorted()の結果は昇順（小さい順）なので、「上位3件」はリストの末尾3件です。文字列で学んだスライスがリストでもそのまま使え、ranking[-3:]で「後ろから3つ」を切り出せます。第7章でループ、第9章で内包表記を学ぶと集計の幅はさらに広がりますが、「組み込み関数＋スライスでここまでできる」というPythonの表現力を体感してください。</p>`,
      task: `TODOを埋めて集計を完成させてください。88点をappendで追加し、件数・合計・最高・最低・平均を求め、sortedとスライスで上位3件（昇順のまま）を取り出します。`,
      code: `scores = [68, 92, 75, 84, 59]

# TODO: appendで88を追加する
print("点数一覧:", scores)

# TODO: len・sum・max・minを使って各値を求める
count = 0
total = 0
highest = 0
lowest = 0
# TODO: 平均を求める（合計÷件数）
average = 0

print(f"受験者数: {count}人")
print(f"合計点: {total}点")
print(f"最高点: {highest}点 / 最低点: {lowest}点")
# TODO: 平均点は:.1fで小数第1位まで表示する
print(f"平均点: {average}点")

# TODO: sortedで昇順に並べ、スライスで上位3件（末尾3件）を取り出す
ranking = scores
top3 = ranking
print("上位3件(昇順):", top3)
`,
      solution: `scores = [68, 92, 75, 84, 59]

# 新しい点数を末尾に追加する
scores.append(88)
print("点数一覧:", scores)

count = len(scores)
total = sum(scores)
highest = max(scores)
lowest = min(scores)
# averageには正確な値を持たせ、丸めは表示側で行う
average = total / count

print(f"受験者数: {count}人")
print(f"合計点: {total}点")
print(f"最高点: {highest}点 / 最低点: {lowest}点")
print(f"平均点: {average:.1f}点")

# sortedは元のscoresを変えずに、昇順の新しいリストを返す
ranking = sorted(scores)
top3 = ranking[-3:]
print("上位3件(昇順):", top3)
`,
      hints: [
        `件数はlen、合計はsum、最高・最低はmax・minです。すべてscoresを渡すだけです。`,
        `平均はtotal / countで計算し、表示するf-string側に:.1fを付けます。`,
        `昇順リストの「上位3件」は末尾の3つなので、[-3:]のスライスで取り出せます。`
      ],
      expectedOutput: "平均点: 77.7点"
    }
  ]
});
