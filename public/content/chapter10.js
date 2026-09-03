// 第10章：例外処理
registerChapter({
  number: 10,
  title: "例外処理",
  description: "エラーメッセージ（トレースバック）の読み方から、try-except・raiseによる例外処理まで学び、想定外の入力でも壊れない堅牢なプログラムを書けるようになります。",
  steps: [
    {
      id: 91,
      title: "トレースバックの読み方（発生行・例外名・メッセージ）",
      explanation: `<p>プログラムの実行中に発生するエラーを例外（exception）と呼びます。例外が発生すると、Pythonはトレースバック（エラーに至るまでの呼び出し履歴の表示）を出力してプログラムを停止します。トレースバックを正しく読めることは、デバッグ力に直結する最重要スキルです。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 6, in &lt;module&gt;
    total = total + int(p)
ValueError: invalid literal for int() with base 10: '30O'</code></pre>
<p>読むときの鉄則は「下から読む」ことです。</p>
<table>
<tr><th>見る場所</th><th>分かること</th></tr>
<tr><td>最終行の先頭（ValueError）</td><td>例外の型。エラーの種類を表す</td></tr>
<tr><td>最終行のコロン以降</td><td>エラーメッセージ。何がダメだったかの詳細</td></tr>
<tr><td>その上のFile行とコード行</td><td>発生したファイル・行番号・実際のコード</td></tr>
</table>
<p>上の例なら「6行目のint(p)で、'30O'という文字列を10進数の整数として解釈できなかった」と読み取れます。メッセージ内の'30O'という具体的な値がヒントで、よく見ると数字のゼロではなく英字のOが混ざっています。</p>
<p>1行目の「most recent call last」は「最後に呼ばれたものが一番下に表示される」という意味です。関数呼び出しが深くなるとFile行が何段も並びますが、一番下が実際にエラーが起きた場所、その上は呼び出し元をさかのぼった履歴です。エラーが出たら慌てて全部読もうとせず、まず最終行で「型とメッセージ」を確認し、次にその上で「場所」を特定する。この2ステップを習慣にしてください。</p>`,
      task: `このプログラムは実行するとValueErrorで停止します。トレースバックの最終行のメッセージから原因の値を特定し、データを修正して「合計: 650円」と表示されるようにしてください。`,
      code: `# 実行するとエラーで止まる。トレースバックを下から読み、
# 例外の型・メッセージ・発生行を確認してから直そう
prices = ["100", "250", "30O"]

total = 0
for p in prices:
    total = total + int(p)

print(f"合計: {total}円")`,
      solution: `# トレースバックのメッセージ「invalid literal for int() with base 10: '30O'」から
# 数字のゼロが英字のOになっていたことが分かるので修正した
prices = ["100", "250", "300"]

total = 0
for p in prices:
    total = total + int(p)

print(f"合計: {total}円")`,
      hints: [
        `トレースバックは下から読みます。最終行に例外の型（ValueError）と、問題になった値がそのまま表示されています。`,
        `メッセージに出ている'30O'をよく見てください。最後の文字は数字のゼロではなく英字のO（オー）です。`
      ],
      expectedOutput: "合計: 650円"
    },
    {
      id: 92,
      title: "try-exceptの基本",
      explanation: `<p>例外が発生してもプログラムを停止させず、自分で決めた処理に切り替える仕組みがtry-except文です。「失敗するかもしれない処理」をtryブロックに置き、失敗したときの対応をexceptブロックに書きます。</p>
<pre><code>try:
    number = int("abc")
    print("この行は実行されない")
except ValueError:
    print("数値に変換できませんでした")

print("プログラムは続行できる")</code></pre>
<p>実行の流れは次のとおりです。</p>
<ol>
<li>tryブロックの中を上から順に実行する</li>
<li>例外が発生しなければ、exceptブロックは丸ごとスキップされる</li>
<li>例外が発生したら、tryブロックの残りは実行されず、直ちにexceptブロックへ移る</li>
<li>exceptブロックの実行後、プログラムは停止せずその先へ進む</li>
</ol>
<p>ポイントは3番です。tryブロック内で例外が起きた瞬間、それ以降の行は実行されません。上の例では、int("abc")で例外が発生するため、その次のprintは実行されないままexceptへ飛びます。</p>
<p>exceptの後ろに書いたValueErrorは「捕まえる例外の型」です（型の指定は次のステップで詳しく学びます）。例外を捕まえることを「例外をキャッチする」「ハンドリングする」とも言います。注意点として、try-exceptは「エラーを握りつぶす魔法」ではありません。失敗が想定内で、代わりの動作が明確に決まっている場面でだけ使うのが原則です。何でもtryで囲むとバグの発見が遅れる、という落とし穴は第98ステップで体験します。</p>`,
      task: `<code>int(text)</code>の処理をtry-exceptで囲み、変換に失敗したら「数値に変換できませんでした」と表示して、最後の行まで実行が続くようにしてください。`,
      code: `text = "abc"

# TODO: 下の2行をtryブロックに入れ、ValueErrorが発生したら
# 「数値に変換できませんでした」と表示するexceptブロックを追加する
number = int(text)
print(f"変換成功: {number}")

print("プログラムは最後まで実行された")`,
      solution: `text = "abc"

try:
    number = int(text)
    print(f"変換成功: {number}")
except ValueError:
    print("数値に変換できませんでした")

print("プログラムは最後まで実行された")`,
      hints: [
        `失敗するかもしれない処理を「try:」の下にインデントして入れ、その後ろに「except ValueError:」ブロックを続けます。`,
        `tryもexceptも、ifと同じようにコロンとインデント（スペース4つ）でブロックを作ります。`
      ],
      expectedOutput: "プログラムは最後まで実行された"
    },
    {
      id: 93,
      title: "例外の型指定（ValueError・ZeroDivisionError）",
      explanation: `<p>exceptに書く例外の型は「どの失敗に対応するか」の宣言です。指定した型と違う例外が発生した場合は捕まえられず、プログラムは通常どおり停止します。だからこそ、起こり得る例外を正しく見極めて指定する必要があります。まずは代表的な例外の型を押さえましょう。</p>
<table>
<tr><th>例外の型</th><th>発生する場面の例</th></tr>
<tr><td>ValueError</td><td>int("abc")など、型は合うが値が不正</td></tr>
<tr><td>ZeroDivisionError</td><td>10 / 0など、0での割り算</td></tr>
<tr><td>TypeError</td><td>"1" + 2など、型が合わない操作</td></tr>
<tr><td>KeyError</td><td>辞書に存在しないキーへのアクセス</td></tr>
<tr><td>IndexError</td><td>リストの範囲外のインデックスへのアクセス</td></tr>
</table>
<pre><code>def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("0では割れません")
        return None</code></pre>
<p>もしここでexcept ValueErrorと書いてしまうと、0除算で発生するのはZeroDivisionErrorなので捕まえられず、関数はそのまま例外で停止します。「try-exceptを書いたのにエラーで落ちる」ときは、発生している例外の型とexceptで指定した型が食い違っていないかをトレースバックの最終行で確認するのが定石です。</p>
<p>正しい型を知る一番確実な方法は、わざと失敗させてトレースバックを見ることです。対話モードやテスト用スクリプトでint("x")や1 / 0を実行すれば、最終行に正確な型名が表示されます。エラーメッセージは敵ではなく、正しいexceptを書くための情報源だと考えてください。</p>`,
      task: `2つの関数のexceptに指定されている例外の型が間違っています。トレースバックで実際に発生する型を確認し、正しい型に修正してください。`,
      code: `def safe_divide(a, b):
    try:
        return a / b
    except ValueError:  # TODO: 0除算で発生する例外の型ではない。正しい型に直す
        print("0では割れません")
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))

def to_int(text):
    try:
        return int(text)
    except ZeroDivisionError:  # TODO: 文字列変換の失敗で発生する型に直す
        print(f"整数に変換できません: {text}")
        return None

print(to_int("42"))
print(to_int("hello"))`,
      solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("0では割れません")
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))

def to_int(text):
    try:
        return int(text)
    except ValueError:
        print(f"整数に変換できません: {text}")
        return None

print(to_int("42"))
print(to_int("hello"))`,
      hints: [
        `まずそのまま実行してみましょう。トレースバックの最終行に、実際に発生した例外の型名が表示されます。`,
        `0での割り算はZeroDivisionError、int()での変換失敗はValueErrorです。2つの関数で指定が逆になっています。`
      ],
      expectedOutput: "0では割れません"
    },
    {
      id: 94,
      title: "複数のexceptとas e",
      explanation: `<p>1つのtryブロックの中で、種類の違う例外が発生し得ることはよくあります。exceptブロックは複数並べることができ、発生した例外の型に合うものが1つだけ実行されます。</p>
<pre><code>try:
    number = int(text)
    result = number / divisor
except ValueError as e:
    print(f"変換エラー: {e}")
except ZeroDivisionError as e:
    print(f"計算エラー: {e}")</code></pre>
<p>「as e」を付けると、発生した例外オブジェクトを変数eで受け取れます。例外オブジェクトをprintやf-stringに渡すと、トレースバックの最終行に出るのと同じエラーメッセージが得られます。「何が起きたか」をユーザーへの表示やログに残すときに欠かせない書き方です（変数名は自由ですが、eやexcが慣例です）。</p>
<p>複数のexceptに関して覚えておきたいことが2つあります。</p>
<ul>
<li>複数の型を同じ処理でまとめて捕まえたいときは、タプルにして「except (ValueError, ZeroDivisionError):」と書ける</li>
<li>exceptは上から順に照合されるため、広い型（Exceptionなど多くの例外を含む親の型）を先に書くと、後ろの具体的なexceptに到達しなくなる。狭い型を上に、広い型を下に書くのが原則</li>
</ul>
<p>実務では「入力起因の失敗（ValueError）はユーザーに再入力を促す」「計算起因の失敗（ZeroDivisionError）は既定値で続行する」のように、失敗の種類ごとに対応を変えるのが普通です。except節を分けることは、失敗への対応方針をコードで表現することでもあります。</p>`,
      task: `<code>calc</code>関数に2つのexceptブロックを追加してください。ValueErrorなら「変換エラー: メッセージ」、ZeroDivisionErrorなら「計算エラー: メッセージ」と表示し、どちらの場合もNoneを返します。`,
      code: `def calc(text, divisor):
    try:
        number = int(text)
        return number / divisor
    # TODO: ValueErrorをas eで捕まえ、「変換エラー: {e}」と表示してNoneを返す
    # TODO: ZeroDivisionErrorをas eで捕まえ、「計算エラー: {e}」と表示してNoneを返す
    except ValueError:
        return None

print(calc("100", 4))
print(calc("abc", 4))
print(calc("100", 0))`,
      solution: `def calc(text, divisor):
    try:
        number = int(text)
        return number / divisor
    except ValueError as e:
        print(f"変換エラー: {e}")
        return None
    except ZeroDivisionError as e:
        print(f"計算エラー: {e}")
        return None

print(calc("100", 4))
print(calc("abc", 4))
print(calc("100", 0))`,
      hints: [
        `exceptブロックは「except 型 as 変数:」の形で、tryの後ろにいくつでも並べられます。`,
        `as eで受け取った例外オブジェクトは、f"変換エラー: {e}"のようにf-stringに埋め込めばメッセージが表示されます。`
      ],
      expectedOutput: "計算エラー: division by zero"
    },
    {
      id: 95,
      title: "else・finally",
      explanation: `<p>try-except文には、あと2つのブロックを追加できます。成功時だけ実行されるelseと、成否にかかわらず必ず実行されるfinallyです。4つのブロックの役割を整理しましょう。</p>
<table>
<tr><th>ブロック</th><th>実行されるタイミング</th></tr>
<tr><td>try</td><td>常に最初に実行を試みる</td></tr>
<tr><td>except</td><td>tryで例外が発生したときだけ</td></tr>
<tr><td>else</td><td>tryで例外が発生しなかったときだけ</td></tr>
<tr><td>finally</td><td>成功でも失敗でも、最後に必ず</td></tr>
</table>
<pre><code>try:
    number = int(text)
except ValueError:
    print("失敗")
else:
    print(f"成功: {number}")
finally:
    print("--- 処理終了 ---")</code></pre>
<p>「成功時の処理はtryブロックに続けて書けばいいのでは？」と思うかもしれません。elseを使う利点は、例外を監視する範囲を最小限にできることです。成功時の処理をtry内に書くと、その処理から偶然発生した同じ型の例外まで捕まえてしまい、失敗の原因がぼやけます。elseに書けば「int()の失敗だけを監視している」ことがコードから明確に読み取れます。</p>
<p>finallyの典型的な用途は後片付けです。例外が起きても起きなくても、途中でreturnしても必ず実行されるため、「使った資源の解放」や「終了ログの出力」のような、絶対に飛ばしたくない処理を置きます。ファイルやデータベース接続を扱うようになると、finally（およびそれを自動化したwith文）の重要性を実感するはずです。</p>`,
      task: `成功時の表示をelseブロックに移動し、成否にかかわらず「--- 処理終了 ---」と表示するfinallyブロックを追加してください。`,
      code: `def try_convert(text):
    try:
        number = int(text)
        print(f"成功: {number}")  # TODO: この行はelseブロックに移動する
    except ValueError:
        print(f"失敗: {text}は数値ではない")
    # TODO: 成否にかかわらず「--- 処理終了 ---」と表示するfinallyを追加する

try_convert("123")
try_convert("abc")`,
      solution: `def try_convert(text):
    try:
        number = int(text)
    except ValueError:
        print(f"失敗: {text}は数値ではない")
    else:
        print(f"成功: {number}")
    finally:
        print("--- 処理終了 ---")

try_convert("123")
try_convert("abc")`,
      hints: [
        `ブロックの並び順は try → except → else → finally と決まっています。`,
        `elseもfinallyも、exceptと同じインデントの深さで「else:」「finally:」と書き、中身を1段インデントします。`
      ],
      expectedOutput: "成功: 123"
    },
    {
      id: 96,
      title: "raise",
      explanation: `<p>ここまでは発生した例外を「受け止める」側でしたが、raise文を使うと自分から例外を「発生させる」ことができます。関数が受け取った値が想定外だったとき、処理を続けずに呼び出し元へ失敗を知らせる手段です。</p>
<pre><code>def set_age(age):
    if age &lt; 0:
        raise ValueError("年齢は0以上を指定してください")
    print(f"年齢を{age}に設定しました")</code></pre>
<p>「raise 例外の型(メッセージ)」の形で書きます。raiseが実行されると、その関数の残りの処理は行われず、例外が呼び出し元へ伝わります。呼び出し元がtry-exceptで捕まえればメッセージ付きで対処でき、捕まえなければトレースバックが表示されてプログラムが停止します。</p>
<p>なぜわざわざエラーを起こすのでしょうか。上の関数からraiseを消すと、set_age(-5)のような不正な値でも「年齢を-5に設定しました」と表示され、間違ったデータのまま処理が進んでしまいます。バグは発生地点から離れるほど原因究明が難しくなるため、おかしな値に気づいた時点で大きな音を立てて止める方が、静かに壊れ続けるより安全なのです。この考え方は「fail fast（早く失敗せよ）」と呼ばれ、堅牢なソフトウェア設計の基本原則です。</p>
<p>メッセージには「何がどうダメで、どうすればよいか」を書きます。「エラー」とだけ書かれた例外と「年齢は0以上を指定してください」では、受け取った側の対応速度がまったく違います。未来の自分や同僚への伝言だと思って書きましょう。</p>`,
      task: `<code>set_age</code>関数に検証を追加してください。ageが0未満なら「年齢は0以上を指定してください」、150を超えるなら「年齢は150以下を指定してください」というメッセージでValueErrorをraiseします。`,
      code: `def set_age(age):
    # TODO: ageが0未満なら「年齢は0以上を指定してください」のValueErrorをraiseする
    # TODO: ageが150を超えるなら「年齢は150以下を指定してください」のValueErrorをraiseする
    print(f"年齢を{age}に設定しました")

set_age(30)

# 現状では不正な値でもそのまま通ってしまう
try:
    set_age(-5)
except ValueError as e:
    print(f"エラーを捕まえた: {e}")`,
      solution: `def set_age(age):
    if age < 0:
        raise ValueError("年齢は0以上を指定してください")
    if age > 150:
        raise ValueError("年齢は150以下を指定してください")
    print(f"年齢を{age}に設定しました")

set_age(30)

try:
    set_age(-5)
except ValueError as e:
    print(f"エラーを捕まえた: {e}")`,
      hints: [
        `例外を発生させるには「raise ValueError("メッセージ")」と書きます。if文と組み合わせて条件付きでraiseします。`,
        `raiseが実行されると関数はそこで中断されるので、検証はprintより前に書きます。`
      ],
      expectedOutput: "エラーを捕まえた: 年齢は0以上を指定してください"
    },
    {
      id: 97,
      title: "関数から例外で失敗を伝える設計",
      explanation: `<p>関数が失敗し得るとき、それをどう呼び出し元へ伝えるかは設計の重要な分かれ道です。よくある2つの方式を比較してみましょう。</p>
<table>
<tr><th>方式</th><th>利点</th><th>欠点</th></tr>
<tr><td>Noneなど特別な値を返す</td><td>書くのが簡単</td><td>呼び出し側がチェックを忘れても気づけない。失敗の理由を伝えられない</td></tr>
<tr><td>例外をraiseする</td><td>無視すると必ず停止するので失敗を見逃せない。メッセージで理由を伝えられる</td><td>呼び出し側にtry-exceptの手間がある</td></tr>
</table>
<p>Noneを返す方式の怖さは「静かに壊れる」ことです。チェックを忘れたNoneが変数に入って処理が進み、遠く離れた場所でTypeErrorになったり、間違った集計結果が出たりします。例外方式なら、対処を忘れた失敗はその場でトレースバックとして表面化します。</p>
<pre><code>def parse_price(text):
    try:
        price = int(text.strip())
    except ValueError:
        raise ValueError(f"価格として解釈できません: {text}")
    if price &lt; 0:
        raise ValueError(f"価格が負の数です: {price}")
    return price</code></pre>
<p>この例では、int()が出す英語のメッセージをそのまま流さず、いったん捕まえて「この関数の文脈での意味」を持つメッセージに変換してraiseし直しています。低レベルなエラーを、使う側に分かる言葉に翻訳するのは実務でよく使うテクニックです。</p>
<p>こうして関数は「成功なら正しい値を返す。失敗なら例外で理由を伝える」という単純な約束になり、呼び出し側は正常系の処理とエラー処理をtry-exceptで明確に分離できます。役割分担がはっきりするのが例外設計の最大の利点です。</p>`,
      task: `<code>parse_price</code>の2つの「return None」を、メッセージ付きのValueErrorをraiseする形に書き換え、呼び出し側のループもtry-exceptで「スキップ: メッセージ」と表示する形に修正してください。`,
      code: `# Noneを返して失敗を伝える設計。呼び出し側のチェック漏れで静かに壊れやすい
def parse_price(text):
    try:
        price = int(text.strip())
    except ValueError:
        return None  # TODO: 「価格として解釈できません: 元の文字列」のValueErrorをraiseする
    if price < 0:
        return None  # TODO: 「価格が負の数です: 値」のValueErrorをraiseする
    return price

items = ["100", " 250 ", "abc", "-50", "980"]

total = 0
for item in items:
    # TODO: try-exceptに書き換え、ValueErrorをas eで捕まえて
    # 「スキップ: {e}」と表示する
    price = parse_price(item)
    if price is not None:
        total = total + price

print(f"合計: {total}円")`,
      solution: `# 失敗はNoneではなく、メッセージ付きの例外で呼び出し元に伝える設計
def parse_price(text):
    try:
        price = int(text.strip())
    except ValueError:
        raise ValueError(f"価格として解釈できません: {text}")
    if price < 0:
        raise ValueError(f"価格が負の数です: {price}")
    return price

items = ["100", " 250 ", "abc", "-50", "980"]

total = 0
for item in items:
    try:
        total = total + parse_price(item)
    except ValueError as e:
        print(f"スキップ: {e}")

print(f"合計: {total}円")`,
      hints: [
        `return Noneの行を「raise ValueError(f"...: {text}")」の形に置き換えます。f-stringでメッセージに値を埋め込みましょう。`,
        `呼び出し側は、加算の行をtryブロックに入れ、「except ValueError as e:」でメッセージを表示すればNoneチェックが不要になります。`
      ],
      expectedOutput: "合計: 1330円"
    },
    {
      id: 98,
      title: "裸のexcept:の乱用を直す",
      explanation: `<p>型を指定しない「except:」は裸のexceptと呼ばれ、あらゆる例外を無差別に捕まえます。一見親切な安全網に見えますが、実務では最も嫌われる書き方の1つです。次のコードには変数名のtypo（打ち間違い）によるバグがあります。</p>
<pre><code>def average(scores):
    try:
        totall = sum(scores)     # 代入した変数名がtotall
        return total / len(scores)   # 参照した変数名はtotal
    except:
        return 0</code></pre>
<p>本来ならNameErrorが発生してtypoにすぐ気づけるはずが、裸のexceptがそれまで捕まえて0を返してしまいます。結果、「平均を計算したら必ず0になる」という不可解な症状だけが残り、原因のトレースバックは永遠に表示されません。これが「例外の握りつぶし」で、バグを隠すことでデバッグを何倍も難しくします。</p>
<p>直し方の原則はシンプルです。</p>
<ul>
<li>捕まえるのは「想定していて、対応方法が決まっている型」だけに限定する（この例なら空リストによるZeroDivisionErrorのみ）</li>
<li>想定外の例外は捕まえずに落とし、トレースバックを見て修正する</li>
</ul>
<p>なお、裸のexceptは幅広い例外を継承するBaseExceptionレベルまで捕まえるため、Ctrl+Cによる中断（KeyboardInterrupt）まで無効化してしまうという実害もあります。どうしても幅広く受けたい場面（ログを記録して再送出する場合など）でも、せめて「except Exception as e:」と書いてメッセージを記録するのが最低ラインです。「exceptの型指定は狭ければ狭いほど良い」と覚えてください。</p>`,
      task: `裸の<code>except:</code>を<code>ZeroDivisionError</code>だけを捕まえる形に修正してください。すると隠れていたNameErrorが表面化するので、トレースバックを読んでtypoも修正し、平均80.0が表示されるようにしてください。`,
      code: `# 平均点を返す関数。80.0が返るはずなのに、なぜか0が表示される
def average(scores):
    try:
        totall = sum(scores)
        return total / len(scores)
    except:
        # 「エラーが出たら0を返せばいい」と裸のexceptで握りつぶしている
        return 0

print(average([80, 90, 70]))  # 80.0になるはず
print(average([]))            # 空リストのときだけ0を返したい`,
      solution: `# 捕まえる例外を限定したことで隠れていたNameError（変数名typo）が
# 表面化し、修正できた
def average(scores):
    try:
        total = sum(scores)
        return total / len(scores)
    except ZeroDivisionError:
        # 空のリストのときだけ0を返す
        return 0

print(average([80, 90, 70]))
print(average([]))`,
      hints: [
        `まず「except:」を「except ZeroDivisionError:」に変えて実行してみましょう。今まで隠れていた例外のトレースバックが表示されます。`,
        `トレースバックの最終行にNameErrorと未定義の変数名が出ます。代入している変数名と見比べてみてください。`
      ],
      expectedOutput: "80.0"
    },
    {
      id: 99,
      title: "EAFPとLBYL（Python流の考え方）",
      explanation: `<p>失敗し得る処理への向き合い方には、2つの流儀があります。</p>
<table>
<tr><th>流儀</th><th>意味</th><th>書き方</th></tr>
<tr><td>LBYL</td><td>Look Before You Leap（跳ぶ前に見よ）。実行前に条件を確認する</td><td>if文で事前チェック</td></tr>
<tr><td>EAFP</td><td>Easier to Ask Forgiveness than Permission（許可より許しを求める方が易しい）。まず実行し、失敗したら対処する</td><td>try-except</td></tr>
</table>
<pre><code>inventory = {"apple": 3}

# LBYL：キーの存在を確認してから使う
if "apple" in inventory:
    count = inventory["apple"]
else:
    count = 0

# EAFP：まずアクセスし、なければ例外で対処
try:
    count = inventory["apple"]
except KeyError:
    count = 0</code></pre>
<p>Pythonコミュニティは伝統的にEAFPを好むと言われます。理由は主に2つあります。第一に、確認すべき条件が複数あるとLBYLのif文は長く複雑になりがちで、チェック漏れも起きやすいのに対し、EAFPは「正常系のコードをまっすぐ書き、失敗はexceptに集約する」ため読みやすくなります。第二に、LBYLには「チェックした瞬間と使う瞬間の間に状況が変わるかもしれない」という原理的な隙があります（ファイルや並行処理を扱うときに問題になります）。</p>
<p>ただしEAFPが常に正解ではありません。失敗がほとんど起きない前提の処理ならEAFPが簡潔ですが、単純な1条件の確認ならif文の方が意図が伝わることも多く、辞書のget()のような専用メソッドで済むならそれが最善です。両方の流儀を知り、コードが最も読みやすくなる方を選ぶのがPythonicな態度です。</p>`,
      task: `LBYL版の<code>sell_lbyl</code>と同じ動作になるように、EAFP版の<code>sell_eafp</code>をtry-exceptで完成させてください。在庫が0以下なら「在庫切れ」のValueErrorをraiseし、KeyErrorとValueErrorをまとめて捕まえます。`,
      code: `inventory = {"apple": 3, "banana": 0}

# LBYL：使う前に条件を調べてから実行する（完成済み）
def sell_lbyl(name):
    if name in inventory and inventory[name] > 0:
        inventory[name] = inventory[name] - 1
        return f"{name}を販売しました"
    return f"{name}は販売できません"

# EAFP：まず実行してみて、ダメなら例外で対処する
def sell_eafp(name):
    # TODO: try-exceptで書き換える。
    # 在庫が0以下なら raise ValueError("在庫切れ")
    # KeyErrorとValueErrorをタプルでまとめて捕まえ、「{name}は販売できません」を返す
    inventory[name] = inventory[name] - 1
    return f"{name}を販売しました"

print(sell_lbyl("apple"))
print(sell_lbyl("orange"))
print(sell_eafp("banana"))
print(sell_eafp("apple"))`,
      solution: `inventory = {"apple": 3, "banana": 0}

# LBYL：使う前に条件を調べてから実行する（完成済み）
def sell_lbyl(name):
    if name in inventory and inventory[name] > 0:
        inventory[name] = inventory[name] - 1
        return f"{name}を販売しました"
    return f"{name}は販売できません"

# EAFP：まず実行してみて、ダメなら例外で対処する
def sell_eafp(name):
    try:
        if inventory[name] <= 0:
            raise ValueError("在庫切れ")
        inventory[name] = inventory[name] - 1
        return f"{name}を販売しました"
    except (KeyError, ValueError):
        return f"{name}は販売できません"

print(sell_lbyl("apple"))
print(sell_lbyl("orange"))
print(sell_eafp("banana"))
print(sell_eafp("apple"))`,
      hints: [
        `存在しないキーへのアクセスはKeyErrorになるので、事前のinチェックは不要です。tryブロック内で直接inventory[name]を使いましょう。`,
        `複数の型をまとめて捕まえるには「except (KeyError, ValueError):」のようにタプルで指定します。`
      ],
      expectedOutput: "orangeは販売できません"
    },
    {
      id: 100,
      title: "総合演習（堅牢な数値変換ツール）",
      explanation: `<p>第10章の総仕上げとして、この章の道具を総動員した「壊れない数値変換ツール」を作ります。要件は実務さながらです。文字列のリストを受け取り、変換できるものはintまたはfloatに変換し、できないものはエラーメッセージとして記録し、最後に合計を出す。1件の不正データで全体が止まってはいけません。</p>
<p>設計は2層に分けます。</p>
<table>
<tr><th>関数</th><th>役割</th></tr>
<tr><td>to_number</td><td>1件の変換に専念。失敗はValueErrorをraiseして伝える</td></tr>
<tr><td>summarize</td><td>全件のループを管理。例外を捕まえて成功と失敗を仕分ける</td></tr>
</table>
<p>to_numberの中では「まずintを試し、ダメならfloatを試す」というEAFPの多段構えを使います。ここで登場するpassは「何もしない」ことを表す文で、ブロックに何か書く必要があるが処理は不要、という場面で使います。</p>
<pre><code>try:
    return int(text)
except ValueError:
    pass  # intで解釈できなければ次のfloatを試す
try:
    return float(text)
except ValueError:
    raise ValueError(f"数値として解釈できません: {text}")</code></pre>
<p>floatでも失敗したときは、英語の元メッセージではなく、このツールの文脈で意味の分かる日本語メッセージに翻訳してraiseし直します（第97ステップの設計です）。呼び出し側のsummarizeは、成功なら結果をリストへ、失敗ならstr(e)でメッセージを文字列化してエラーリストへ振り分けます。「変換の知識はto_numberに、進行の管理はsummarizeに」という責務の分離ができていれば、この章は卒業です。</p>`,
      task: `3つのTODOを完成させてください。<code>to_number</code>はint→floatの順に変換を試し、両方失敗したら「数値として解釈できません: 元の文字列」のValueErrorをraiseします。<code>summarize</code>は失敗をtry-exceptで受け止めて仕分けます。`,
      code: `def to_number(text):
    stripped = text.strip()
    # TODO 1: int(stripped)への変換をtryし、ValueErrorならpassで次へ進む
    # TODO 2: float(stripped)への変換をtryし、それも失敗したら
    #         「数値として解釈できません: 元の文字列」のValueErrorをraiseする
    return int(stripped)

def summarize(texts):
    numbers = []
    errors = []
    for t in texts:
        # TODO 3: to_numberの失敗をtry-exceptで受け止め、
        #         成功なら結果をnumbersへ、失敗ならstr(e)をerrorsへ追加する
        numbers.append(to_number(t))
    return numbers, errors

data = ["10", " 3.5 ", "abc", "-2", "1e3", "12円"]
numbers, errors = summarize(data)

print(f"変換成功: {numbers}")
for msg in errors:
    print(f"エラー: {msg}")

print(f"合計: {sum(numbers)}")`,
      solution: `def to_number(text):
    # 文字列をintまたはfloatに変換する。失敗はValueErrorで呼び出し元に伝える
    stripped = text.strip()
    try:
        return int(stripped)
    except ValueError:
        pass  # intで解釈できなければfloatを試す
    try:
        return float(stripped)
    except ValueError:
        raise ValueError(f"数値として解釈できません: {text}")

def summarize(texts):
    numbers = []
    errors = []
    for t in texts:
        try:
            numbers.append(to_number(t))
        except ValueError as e:
            errors.append(str(e))
    return numbers, errors

data = ["10", " 3.5 ", "abc", "-2", "1e3", "12円"]
numbers, errors = summarize(data)

print(f"変換成功: {numbers}")
for msg in errors:
    print(f"エラー: {msg}")

print(f"合計: {sum(numbers)}")`,
      hints: [
        `to_numberは、try-exceptを2つ順に並べます。1つ目のexceptではpass（何もしない）、2つ目のexceptではraiseです。`,
        `summarizeのループ内は「try: numbers.append(to_number(t))」「except ValueError as e: errors.append(str(e))」の形になります。`,
        `"1e3"は指数表記（10の3乗＝1000.0）としてfloat()が解釈できる点も確認してみましょう。`
      ],
      expectedOutput: "合計: 1011.5"
    }
  ]
});
