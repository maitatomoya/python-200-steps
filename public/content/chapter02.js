// 第2章：数値と変数
registerChapter({
  number: 2,
  title: "数値と変数",
  description: "整数と小数の違い、四則演算から複合代入・型変換・浮動小数点の誤差まで、数値を扱う計算の基礎を固めます。",
  steps: [
    {
      id: 11,
      title: "整数と小数（intとfloat）",
      explanation: `<p>Pythonの数値には大きく2つの種類があります。<strong>int（整数型）</strong>と<strong>float（浮動小数点数型、いわゆる小数）</strong>です。データの種類のことをプログラミングでは<strong>型</strong>と呼びます。</p>
<table>
<tr><th>型</th><th>意味</th><th>例</th></tr>
<tr><td>int</td><td>小数点を持たない整数</td><td>3、-10、0、1000000</td></tr>
<tr><td>float</td><td>小数点を持つ数</td><td>3.14、-0.5、152.5、3.0</td></tr>
</table>
<p>書き分けは簡単で、<strong>小数点を書けばfloat、書かなければint</strong>になります。注意したいのは<code>3</code>と<code>3.0</code>は値としては等しくても型が違うことです。<code>3</code>はint、<code>3.0</code>はfloatとして扱われます。</p>
<pre><code>count = 3        # 個数はint
weight = 152.5   # 重さのような連続量はfloat
print("個数:", count)
print("重さ:", weight)</code></pre>
<p>使い分けの目安は「数えるものはint、量るものはfloat」です。個数・人数・回数のように1つ2つと数えられるものはint、重さ・温度・割合のように連続的な量はfloatが自然です。</p>
<p>ミドルエンジニア向けの補足を2つ。Pythonのintは他言語と違って<strong>桁数の上限がなく</strong>、何百桁の整数でも正確に計算できます。また大きな数は<code>1_000_000</code>のようにアンダースコアで区切って書け、読みやすくなります（値は1000000と同じ）。一方floatには精度の限界があり、これはステップ18で詳しく体験します。</p>`,
      task: `TODOの位置で、変数<code>price</code>に整数の<code>128</code>を、変数<code>tax_rate</code>に小数の<code>0.1</code>を代入して、4行すべてが表示されるようにしてください。`,
      code: `count = 3        # 個数は整数（int）
weight = 152.5   # 重さは小数（float）
print("個数:", count)
print("重さ:", weight)

# TODO: priceに整数の128を、tax_rateに小数の0.1を代入する

print("価格:", price)
print("税率:", tax_rate)
`,
      solution: `count = 3        # 個数は整数（int）
weight = 152.5   # 重さは小数（float）
print("個数:", count)
print("重さ:", weight)

price = 128      # 価格は整数（int）
tax_rate = 0.1   # 税率は小数（float）

print("価格:", price)
print("税率:", tax_rate)
`,
      hints: [
        `上の2行の代入と同じ形で、名前 = 値 を2行書きます。`,
        `price = 128 と tax_rate = 0.1 です。数値なのでクォートは付けません。`
      ],
      expectedOutput: "税率: 0.1"
    },
    {
      id: 12,
      title: "四則演算",
      explanation: `<p>第1章で軽く触れた四則演算を、変数と組み合わせてきちんと整理します。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>例（a=12、b=4）</th><th>結果</th></tr>
<tr><td>+</td><td>足し算</td><td>a + b</td><td>16</td></tr>
<tr><td>-</td><td>引き算</td><td>a - b</td><td>8</td></tr>
<tr><td>*</td><td>掛け算</td><td>a * b</td><td>48</td></tr>
<tr><td>/</td><td>割り算</td><td>a / b</td><td>3.0</td></tr>
</table>
<p>ここで必ず覚えてほしい重要な仕様があります。<strong><code>/</code>の結果は必ずfloatになる</strong>ことです。12は4で割り切れますが、結果は<code>3</code>ではなく<code>3.0</code>と表示されます。</p>
<pre><code>print(12 / 4)    # 3.0（割り切れてもfloat）
print(10 / 3)    # 3.3333333333333335</code></pre>
<p>「割り切れるかどうかは実行してみないと分からないのだから、結果の型は常にfloatに統一しておく」というPython 3の設計判断です。整数の答えがほしい割り算には、次のステップで学ぶ<code>//</code>を使います。</p>
<p>また、int同士の<code>+</code>・<code>-</code>・<code>*</code>の結果はintのままですが、<strong>intとfloatを混ぜて計算すると結果はfloatになります</strong>（例：<code>2 + 0.5</code>は<code>2.5</code>）。情報が失われない方の型に自動でそろえられる、と理解しておきましょう。計算結果は変数に代入してから使い回すのが実際のプログラムの基本形です。</p>`,
      task: `足し算・引き算にならって、掛け算（<code>*</code>）と割り算（<code>/</code>）の結果を表示する2行を追加してください。割り算の結果の表示が<code>3</code>ではなく<code>3.0</code>になることも確認しましょう。`,
      code: `a = 12
b = 4
print("足し算:", a + b)
print("引き算:", a - b)
# TODO: 掛け算（*）の結果を「掛け算: 48」の形式で表示する

# TODO: 割り算（/）の結果を「割り算: 3.0」の形式で表示する
`,
      solution: `a = 12
b = 4
print("足し算:", a + b)
print("引き算:", a - b)
print("掛け算:", a * b)
print("割り算:", a / b)
`,
      hints: [
        `上の2行とまったく同じ形で、演算子だけを * と / に変えます。`,
        `print("掛け算:", a * b) と print("割り算:", a / b) の2行です。`
      ],
      expectedOutput: "割り算: 3.0"
    },
    {
      id: 13,
      title: "整数除算//・剰余%・べき乗**",
      explanation: `<p>四則演算に加えて、Pythonには実用性の高い3つの演算子があります。</p>
<table>
<tr><th>演算子</th><th>意味</th><th>例</th><th>結果</th></tr>
<tr><td>//</td><td>整数除算（割り算の商を切り捨て）</td><td>130 // 60</td><td>2</td></tr>
<tr><td>%</td><td>剰余（割り算の余り）</td><td>130 % 60</td><td>10</td></tr>
<tr><td>**</td><td>べき乗（累乗）</td><td>2 ** 10</td><td>1024</td></tr>
</table>
<p><code>//</code>と<code>%</code>はペアで使うと威力を発揮します。定番は<strong>単位の変換</strong>です。130分は何時間何分か？を計算してみましょう。</p>
<pre><code>total_minutes = 130
hours = total_minutes // 60    # 商 → 2時間
minutes = total_minutes % 60   # 余り → 10分
print(hours, "時間", minutes, "分")</code></pre>
<p>「60で割った商が時間、余りが分」という関係です。秒→分秒、円→枚数と釣り銭、通し番号→行と列など、実務でこのペアが登場する場面は非常に多くあります。<code>%</code>は第7章で学ぶFizzBuzz（3の倍数判定など）でも主役になります。</p>
<p>補足として、int同士の<code>//</code>の結果はintになります。また<code>//</code>は「切り捨て」と説明されますが、正確には<strong>負の方向への切り捨て（floor）</strong>で、<code>-7 // 2</code>は<code>-3</code>ではなく<code>-4</code>になります。負の数を割るときだけ挙動に注意してください。<code>**</code>は<code>2 ** 0.5</code>のように小数も使え、これは2の平方根を意味します。</p>`,
      task: `<code>//</code>と<code>%</code>を使って130分を「2 時間 10 分」に変換するプログラムを完成させてください。`,
      code: `total_minutes = 130

# TODO: //を使って何時間かを計算する（0を正しい式に書き換える）
hours = 0
# TODO: %を使ってあまり何分かを計算する（0を正しい式に書き換える）
minutes = 0

print(hours, "時間", minutes, "分")
print("2の10乗:", 2 ** 10)
`,
      solution: `total_minutes = 130

# 60で割った商が時間
hours = total_minutes // 60
# 60で割った余りが分
minutes = total_minutes % 60

print(hours, "時間", minutes, "分")
print("2の10乗:", 2 ** 10)
`,
      hints: [
        `130分のうち「まるごと60分が何回とれるか」が時間、「とりきれずに残った分」が余りです。`,
        `hours = total_minutes // 60、minutes = total_minutes % 60 です。`
      ],
      expectedOutput: "2 時間 10 分"
    },
    {
      id: 14,
      title: "演算子の優先順位と括弧",
      explanation: `<p>1つの式に複数の演算子があるとき、どこから計算されるかは<strong>優先順位</strong>で決まります。数学と同じで「掛け算・割り算は足し算・引き算より先」です。</p>
<table>
<tr><th>優先順位</th><th>演算子</th></tr>
<tr><td>高い</td><td>**（べき乗）</td></tr>
<tr><td>中</td><td>* 、/ 、// 、%</td></tr>
<tr><td>低い</td><td>+ 、-</td></tr>
</table>
<p>この仕様は、意図とずれるとバグ（プログラムの誤り）の温床になります。たとえば「100円と200円の合計を2人で割り勘」のつもりで次のように書くと、期待と違う結果になります。</p>
<pre><code>split = 100 + 200 / 2    # 200 / 2 が先に計算され、100 + 100.0 = 200.0</code></pre>
<p>意図どおりにするには、先に計算したい部分を<strong>括弧</strong>で囲みます。括弧の中は優先順位に関係なく最優先で計算されます。</p>
<pre><code>split = (100 + 200) / 2  # 300 / 2 = 150.0</code></pre>
<p>このバグの怖いところは、<strong>エラーにならず、もっともらしい間違った値が出てしまう</strong>ことです。SyntaxErrorやNameErrorと違ってPythonは何も警告してくれないので、結果の値を見て「おかしい」と気づくしかありません。こうした誤りを論理エラーと呼びます。</p>
<p>実務でのおすすめは、優先順位を暗記に頼らず<strong>迷ったら括弧を付ける</strong>ことです。冗長な括弧はエラーになりませんし、「どこから計算されるか」が一目で伝わるコードは、それだけでレビューしやすい良いコードです。</p>`,
      task: `初期コードは割り勘の計算が意図とずれていて、<code>200.0</code>と表示されてしまいます。括弧を追加して、正しく<code>1人あたり: 150.0</code>と表示されるように修正してください。`,
      code: `# 100円の商品と200円の商品を1つずつ買い、2人で割り勘にしたい
# 期待する結果: (100 + 200) / 2 = 150.0
price_a = 100
price_b = 200

# TODO: 括弧を追加して、合計を先に計算するように修正する
split = price_a + price_b / 2

print("1人あたり:", split)
`,
      solution: `# 100円の商品と200円の商品を1つずつ買い、2人で割り勘にしたい
# 期待する結果: (100 + 200) / 2 = 150.0
price_a = 100
price_b = 200

# 括弧の中が最優先で計算される
split = (price_a + price_b) / 2

print("1人あたり:", split)
`,
      hints: [
        `今のコードでは price_b / 2 が先に計算されています。先に足し算をさせたいのはどこですか。`,
        `split = (price_a + price_b) / 2 のように足し算全体を括弧で囲みます。`
      ],
      expectedOutput: "1人あたり: 150.0"
    },
    {
      id: 15,
      title: "複合代入演算子（+=、-=など）",
      explanation: `<p>「変数の今の値に何かを加えて、同じ変数に入れ直す」という操作は、プログラムで最も頻繁に登場するパターンのひとつです。</p>
<pre><code>score = score + 10</code></pre>
<p>これを短く書けるのが<strong>複合代入演算子</strong>です。演算子と<code>=</code>を組み合わせて書きます。</p>
<table>
<tr><th>書き方</th><th>意味</th><th>同じ意味の式</th></tr>
<tr><td>x += 10</td><td>10を足して入れ直す</td><td>x = x + 10</td></tr>
<tr><td>x -= 3</td><td>3を引いて入れ直す</td><td>x = x - 3</td></tr>
<tr><td>x *= 2</td><td>2倍して入れ直す</td><td>x = x * 2</td></tr>
<tr><td>x /= 4</td><td>4で割って入れ直す</td><td>x = x / 4</td></tr>
<tr><td>x //= 2、x %= 3、x **= 2</td><td>//、%、**でも同様に使える</td><td>x = x // 2 など</td></tr>
</table>
<p>単に短いだけでなく、「<strong>この変数を更新している</strong>」という意図が記号から即座に読み取れるため、Pythonでは複合代入を使うのが標準的なスタイルです。合計金額の加算、残高の減算、カウンタの<code>count += 1</code>など、第7章で学ぶループと組み合わせると出番が一気に増えます。</p>
<p>注意点は2つ。<code>x /= 4</code>は<code>/</code>の性質どおり<strong>結果がfloatになる</strong>こと。そして<code>+=</code>は1つの記号なので、<code>+</code>と<code>=</code>の間にスペースを入れて<code>x + = 10</code>と書くとSyntaxErrorになることです。なおC言語やJavaScriptにある<code>x++</code>という書き方はPythonには存在せず、<code>x += 1</code>を使います。</p>`,
      task: `TODOにしたがって、2つの行を複合代入演算子で書き換え、さらに<code>*=</code>で<code>stamina</code>を2倍にする1行を追加して、<code>体力: 180</code>と表示されるようにしてください。`,
      code: `stamina = 100

# TODO: 下の行を -= を使って書き換える
stamina = stamina - 30

# TODO: 下の行を += を使って書き換える
stamina = stamina + 20

# TODO: *= を使ってstaminaを2倍にする1行をここに追加する

print("体力:", stamina)
`,
      solution: `stamina = 100

# -= で30減らす
stamina -= 30

# += で20増やす
stamina += 20

# *= で2倍にする
stamina *= 2

print("体力:", stamina)
`,
      hints: [
        `stamina = stamina - 30 は stamina -= 30 と書き換えられます。+も同様です。`,
        `2倍にする行は stamina *= 2 です。計算の流れは 100 - 30 + 20 = 90、90 * 2 = 180 になります。`
      ],
      expectedOutput: "体力: 180"
    },
    {
      id: 16,
      title: "type()で型を確認する",
      explanation: `<p>変数に入っている値が何型なのかは、<code>type()</code>関数で調べられます。printと組み合わせると型が表示されます。</p>
<pre><code>print(type(100))
print(type(3.14))
print(type("100"))</code></pre>
<pre><code>&lt;class 'int'&gt;
&lt;class 'float'&gt;
&lt;class 'str'&gt;</code></pre>
<p><code>&lt;class 'int'&gt;</code>という表示は「int型（正確にはintクラス。クラスは第11章で学びます）」という意味です。文字列の型は<strong>str</strong>（stringの略）と表示されます。</p>
<p>ここで注目してほしいのは3つ目です。<code>100</code>と<code>"100"</code>は画面上の見た目こそ似ていますが、前者はint、後者は<strong>str（文字列）</strong>でまったくの別物です。クォートで囲んだ瞬間、それは数値ではなく「1、0、0という文字の並び」になります。この違いは次のステップで体験するTypeErrorの原因そのものです。</p>
<table>
<tr><th>値</th><th>型</th><th>+の意味</th></tr>
<tr><td>100</td><td>int</td><td>足し算ができる</td></tr>
<tr><td>"100"</td><td>str</td><td>文字列の連結になる（第3章）</td></tr>
</table>
<p><code>type()</code>は、計算結果が予想と違うときの調査に使える最初のデバッグ道具です。「この変数、実は文字列のままだった」というバグは実務でも頻出で、迷ったら<code>print(type(変数))</code>で確認する習慣が身を助けます。</p>`,
      task: `TODOの行で<code>value_c</code>に小数を代入し、3つ目の型表示が<code>&lt;class 'float'&gt;</code>になるようにしてください。`,
      code: `value_a = 100
value_b = "100"
print(type(value_a))
print(type(value_b))

# TODO: value_cにfloat型になる値を代入する（0を書き換える）
value_c = 0
print(type(value_c))
`,
      solution: `value_a = 100
value_b = "100"
print(type(value_a))
print(type(value_b))

# 小数点を付けて書けばfloatになる
value_c = 3.14
print(type(value_c))
`,
      hints: [
        `float型になるのは小数点を含む数値です。`,
        `value_c = 3.14 や value_c = 0.5 など、小数点付きの数値ならどれでもOKです。`
      ],
      expectedOutput: "<class 'float'>"
    },
    {
      id: 17,
      title: "int()・float()による型変換",
      explanation: `<p>文字列の<code>"1200"</code>と数値の<code>120</code>を足そうとすると、<strong>TypeError</strong>（型の不一致による実行時エラー）が発生します。</p>
<pre><code>Traceback (most recent call last):
  File "main.py", line 3, in &lt;module&gt;
    total = price + tax
TypeError: can only concatenate str (not "int") to str</code></pre>
<p>最後の行を読むと「strに連結（concatenate）できるのはstrだけで、intは連結できない」とあります。Pythonは<code>"1200" + 120</code>を見て「左がstrだから文字列の連結だな」と解釈し、右がintなので矛盾してエラーにした、という流れです。</p>
<p>解決策は、計算の前に型を<strong>変換</strong>してそろえることです。</p>
<table>
<tr><th>関数</th><th>働き</th><th>例</th><th>結果</th></tr>
<tr><td>int(x)</td><td>整数に変換する</td><td>int("1200")</td><td>1200</td></tr>
<tr><td>float(x)</td><td>小数に変換する</td><td>float("3.5")</td><td>3.5</td></tr>
<tr><td>str(x)</td><td>文字列に変換する</td><td>str(99)</td><td>"99"</td></tr>
</table>
<pre><code>price = "1200"
total = int(price) + 120    # 1320
print(total)</code></pre>
<p>なお<code>int(3.9)</code>は四捨五入ではなく小数部の<strong>切り捨て</strong>で3になります。また<code>int("abc")</code>のような変換できない文字列はValueErrorという別のエラーになります（第10章で扱います）。「外から来たデータは文字列のことが多いので、計算の前に数値へ変換する」のは、Webフォームの入力やCSVの読み込みなど実務で毎日行う定番処理です。</p>`,
      task: `初期コードを実行するとTypeErrorが発生します。<code>int()</code>を使って<code>price</code>を整数に変換してから足し算し、<code>合計: 1320</code>と表示されるように修正してください。`,
      code: `# priceはアンケートフォームから届いた文字列データという想定
price = "1200"
tax = 120

# この行がTypeErrorになる。int()で修正しよう
total = price + tax

print("合計:", total)
`,
      solution: `# priceはアンケートフォームから届いた文字列データという想定
price = "1200"
tax = 120

# int()で文字列を整数に変換してから足す
total = int(price) + tax

print("合計:", total)
`,
      hints: [
        `エラーの原因は "1200" が文字列（str）のまま足し算されていることです。計算の前に整数へ変換します。`,
        `total = int(price) + tax のように、int()でpriceを包みます。`
      ],
      expectedOutput: "合計: 1320"
    },
    {
      id: 18,
      title: "浮動小数点の誤差とround()",
      explanation: `<p>電卓では当たり前の<code>0.1 + 0.2 = 0.3</code>が、Pythonでは次のようになります。</p>
<pre><code>print(0.1 + 0.2)</code></pre>
<pre><code>0.30000000000000004</code></pre>
<p>これはPythonのバグではなく、コンピュータ全般に共通する<strong>浮動小数点の誤差</strong>です。コンピュータは数を内部で2進数（0と1）で表しますが、0.1や0.2は2進数では<strong>無限に続く循環小数</strong>になり正確に表せません。有限の桁で打ち切って近似するため、ごくわずかなずれが生じます。10進数で1/3が0.3333…としか書けないのと同じ事情です。JavaScriptでもJavaでも同じ結果になります。</p>
<p>表示を整えるには<code>round()</code>関数で丸めます。<code>round(値, 桁数)</code>で小数第「桁数」位までに丸めた値を返します。</p>
<pre><code>result = 0.1 + 0.2
print(round(result, 2))    # 0.3
print(round(3.14159, 2))   # 3.14</code></pre>
<p>実務上の心得は2つです。第一に、<strong>floatの計算結果を表示するときは丸めてから出す</strong>こと。第二に、floatどうしを「ぴったり等しいか」で比較しないこと（誤差のせいで一致しないことがあります。対策は第22章で学びます）。また、金額計算のように1円の誤差も許されない場面では、floatではなく標準ライブラリのdecimalモジュールを使うのが定石です。ここでは「floatには誤差が原理的にある」と知っておくことが何よりの収穫です。</p>`,
      task: `TODOの行を<code>round()</code>を使って書き換え、<code>丸めた値: 0.3</code>と表示されるようにしてください。1行目の誤差付きの表示はそのまま残して見比べましょう。`,
      code: `result = 0.1 + 0.2
print("そのまま:", result)

# TODO: round()を使って、resultを小数第2位までに丸めた値を表示する
print("丸めた値:", result)
`,
      solution: `result = 0.1 + 0.2
print("そのまま:", result)

# round(値, 桁数)で丸める
print("丸めた値:", round(result, 2))
`,
      hints: [
        `round()は round(丸めたい値, 残したい小数の桁数) の形で使います。`,
        `print("丸めた値:", round(result, 2)) とすると0.3が表示されます。`
      ],
      expectedOutput: "丸めた値: 0.3"
    },
    {
      id: 19,
      title: "組み込み関数min・max・abs",
      explanation: `<p><code>print()</code>や<code>type()</code>、<code>round()</code>のように、Pythonにあらかじめ用意されていてすぐ使える関数を<strong>組み込み関数</strong>と呼びます。数値処理でよく使う3つを覚えましょう。</p>
<table>
<tr><th>関数</th><th>働き</th><th>例</th><th>結果</th></tr>
<tr><td>min(...)</td><td>渡した値の中で最小のものを返す</td><td>min(12, 25, 8)</td><td>8</td></tr>
<tr><td>max(...)</td><td>渡した値の中で最大のものを返す</td><td>max(12, 25, 8)</td><td>25</td></tr>
<tr><td>abs(x)</td><td>絶対値（符号を取り除いた値）を返す</td><td>abs(-17)</td><td>17</td></tr>
</table>
<p><code>min()</code>と<code>max()</code>はカンマ区切りで<strong>いくつでも</strong>値を渡せます。<code>abs()</code>は「差がプラスかマイナスか分からないが、差の大きさだけ知りたい」ときに便利です。</p>
<pre><code>morning = 12
noon = 25
print("低いほう:", min(morning, noon))
print("差の大きさ:", abs(morning - noon))    # 12 - 25 = -13 → 13</code></pre>
<p>ここで<strong>戻り値</strong>という重要な概念を押さえましょう。<code>min(12, 25)</code>と書くと、この式全体が計算されて<code>12</code>という値に置き換わります。この「関数が返してくる値」を戻り値と呼びます。だからこそ<code>print(min(12, 25))</code>のように関数の中に関数を入れたり、<code>lowest = min(a, b, c)</code>のように結果を変数に代入したりできるのです。「式はすべて値になる」という見方は、Pythonのコードを読み解く上での基本姿勢になります。</p>`,
      task: `TODOを埋めて、3つの気温の最低・最高と、夜と昼の気温差（正の数）を表示するプログラムを完成させてください。`,
      code: `morning = 12
noon = 25
night = 8

# TODO: min()を使って3つのうち最低気温を「最低気温: 8」の形式で表示する

# TODO: max()を使って3つのうち最高気温を「最高気温: 25」の形式で表示する

diff = night - noon
# TODO: abs()を使って気温差を正の数で「気温差: 17」の形式で表示する
`,
      solution: `morning = 12
noon = 25
night = 8

print("最低気温:", min(morning, noon, night))
print("最高気温:", max(morning, noon, night))

diff = night - noon
print("気温差:", abs(diff))
`,
      hints: [
        `min()とmax()には3つの変数をカンマ区切りでそのまま渡せます。`,
        `diffは 8 - 25 = -17 です。abs(diff) で符号を取り除いた17が得られます。`
      ],
      expectedOutput: "気温差: 17"
    },
    {
      id: 20,
      title: "総合演習：買い物の合計と割り勘計算",
      explanation: `<p>第2章の総仕上げです。買い物の合計金額を計算し、税込にして、3人で割り勘するプログラムを完成させます。この章で学んだ道具の総動員です。</p>
<table>
<tr><th>処理</th><th>使う道具</th><th>学んだステップ</th></tr>
<tr><td>小計の計算</td><td>* と + 、演算子の優先順位</td><td>ステップ12・14</td></tr>
<tr><td>税込金額（10%増し）</td><td>floatとの掛け算とint()による整数化</td><td>ステップ11・17</td></tr>
<tr><td>割り勘の金額と余り</td><td>// と %</td><td>ステップ13</td></tr>
</table>
<p>設計の流れを先に言葉で整理しましょう。こうした「計算の段取り」を先に考えるのが、プログラムを書く基本手順です。</p>
<ol>
<li>小計 ＝ りんご128円×3個 ＋ 牛乳218円×2本 ＋ パン156円×1個</li>
<li>税込 ＝ 小計 × 1.1 を計算し、int()で小数部を切り捨てて整数の円にする</li>
<li>1人あたり ＝ 税込 // 3、余り ＝ 税込 % 3</li>
</ol>
<p>ポイントは2つ。まず、<code>*</code>は<code>+</code>より優先順位が高いので、<code>apple * 3 + milk * 2</code>は括弧なしでも意図どおり「掛けてから足す」になります。次に、<code>subtotal * 1.1</code>はintとfloatの計算なので結果はfloatになり、ステップ18で見た誤差もわずかに含みます。金額として扱うために<code>int()</code>で整数に戻します。</p>
<pre><code>total = int(976 * 1.1)    # 1073.6000000000001 → 1073</code></pre>
<p>「余り」を出すのは、割り勘で割り切れなかった端数を誰かが多めに払う、という現実の場面を想定しているからです。電卓でも検算しながら、TODOを上から順に埋めていきましょう。</p>`,
      task: `TODOを埋めて、小計・税込金額・3人で割り勘したときの1人あたりの金額と余りを表示するプログラムを完成させてください。りんご3個・牛乳2本・パン1個を買います。`,
      code: `# 買い物の合計と割り勘を計算するプログラム
apple = 128   # りんごの単価
milk = 218    # 牛乳の単価
bread = 156   # パンの単価

# TODO: りんご3個・牛乳2本・パン1個の小計を計算する（0を式に書き換える）
subtotal = 0

# TODO: 消費税10%を加えた税込金額を計算し、int()で整数にする（0を式に書き換える）
total = 0

# TODO: 3人で割り勘したときの1人あたりの金額（//）と余り（%）を計算する
per_person = 0
remainder = 0

print("小計:", subtotal, "円")
print("税込:", total, "円")
print("1人あたり:", per_person, "円")
print("余り:", remainder, "円")
`,
      solution: `# 買い物の合計と割り勘を計算するプログラム
apple = 128   # りんごの単価
milk = 218    # 牛乳の単価
bread = 156   # パンの単価

# りんご3個・牛乳2本・パン1個の小計
subtotal = apple * 3 + milk * 2 + bread

# 消費税10%を加えて、int()で小数部を切り捨てる
total = int(subtotal * 1.1)

# 3人で割り勘：//が1人あたり、%が余り
per_person = total // 3
remainder = total % 3

print("小計:", subtotal, "円")
print("税込:", total, "円")
print("1人あたり:", per_person, "円")
print("余り:", remainder, "円")
`,
      hints: [
        `小計は apple * 3 + milk * 2 + bread です。掛け算が先に計算されるので括弧は不要です（976円になります）。`,
        `税込は total = int(subtotal * 1.1) です。1.1倍の結果はfloatなのでint()で整数に戻します（1073円になります）。`,
        `割り勘は per_person = total // 3、remainder = total % 3 です。`
      ],
      expectedOutput: "1人あたり: 357 円"
    }
  ]
});
