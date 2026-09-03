// 第20章：総合演習
registerChapter({
  number: 20,
  title: "総合演習",
  description: "第1〜19章で学んだ知識を総動員する実践演習です。1ステップ1テーマで、実務に近い形の課題に取り組みます。",
  steps: [
    {
      id: 191,
      title: "データ集計（辞書＋内包表記）",
      explanation: `<p>ここからは総合演習です。最初のテーマは、実務で最も頻繁に登場する「<strong>リストに入ったレコードの集計</strong>」です。売上データのような「辞書のリスト」を、カテゴリごとに集計します。使うのは辞書（第5章）・内包表記（第9章）・maxのkey引数（第9章）です。</p>
<p>集計の定石は2段階です。まず<strong>集合内包表記</strong>でカテゴリの一覧を重複なく取り出します。次に<strong>辞書内包表記</strong>で「カテゴリ→合計金額」の辞書を組み立てます。合計にはジェネレータ式＋sumを使います。</p>
<pre><code>categories = {s["category"] for s in sales}
totals = {
    c: sum(s["price"] * s["qty"] for s in sales if s["category"] == c)
    for c in categories
}</code></pre>
<p>内包表記が二重に見えて難しく感じたら、「外側は<code>{キー: 値 for c in categories}</code>という普通の辞書内包表記で、値の部分がたまたまsumの式になっている」と分解して読みましょう。また、集合はイテレーション順が不定（第5章）なので、<strong>表示するときは<code>sorted()</code>で並べてから</strong>出力するのがポイントです。</p>
<p>もう1つの頻出パターンが「<strong>一番◯◯なレコードを探す</strong>」処理です。<code>max()</code>の<code>key</code>引数に「比較に使う値を返す関数」をlambda式で渡します。</p>
<pre><code>best = max(sales, key=lambda s: s["price"] * s["qty"])</code></pre>
<p>forループでも書けますが、内包表記とkey引数を使うと「何をしたいのか」が1行で伝わるコードになります。なお、ここでは学習のため素の辞書とリストで書いていますが、実務ではpandasのようなライブラリが同じ発想（絞り込み→集計）で使われます。</p>`,
      task: `2つのTODOを埋めてください。(1)カテゴリごとの売上合計（<code>price * qty</code>の合計）を辞書内包表記で作る、(2)売上額が最大の商品を<code>max()</code>と<code>key</code>引数で求める、です。`,
      code: `sales = [
    {"item": "りんご", "category": "果物", "price": 150, "qty": 4},
    {"item": "キャベツ", "category": "野菜", "price": 200, "qty": 2},
    {"item": "みかん", "category": "果物", "price": 100, "qty": 6},
    {"item": "トマト", "category": "野菜", "price": 120, "qty": 5},
    {"item": "ぶどう", "category": "果物", "price": 400, "qty": 1},
]

# カテゴリの一覧を重複なく取り出す
categories = {s["category"] for s in sales}

# TODO: カテゴリごとの売上合計（price * qty）を辞書内包表記で作る
totals = {}

for name in sorted(totals):
    print(f"{name}: {totals[name]}円")

# TODO: 売上額（price * qty）が最大の商品をmaxとkey引数で求める
best = sales[0]
print(f"最高売上: {best['item']}")
`,
      solution: `sales = [
    {"item": "りんご", "category": "果物", "price": 150, "qty": 4},
    {"item": "キャベツ", "category": "野菜", "price": 200, "qty": 2},
    {"item": "みかん", "category": "果物", "price": 100, "qty": 6},
    {"item": "トマト", "category": "野菜", "price": 120, "qty": 5},
    {"item": "ぶどう", "category": "果物", "price": 400, "qty": 1},
]

# カテゴリの一覧を重複なく取り出す（集合内包表記）
categories = {s["category"] for s in sales}

# カテゴリごとの売上合計を辞書内包表記で組み立てる
totals = {
    c: sum(s["price"] * s["qty"] for s in sales if s["category"] == c)
    for c in categories
}

# 集合の順序は不定なのでsortedで並べてから表示する
for name in sorted(totals):
    print(f"{name}: {totals[name]}円")

# key引数に「比較に使う値」を返すlambdaを渡す
best = max(sales, key=lambda s: s["price"] * s["qty"])
print(f"最高売上: {best['item']}")
`,
      hints: [
        `辞書内包表記の形は{c: 値の式 for c in categories}です。値の式にはsum(... for s in sales if s["category"] == c)を入れます。`,
        `maxはmax(sales, key=lambda s: s["price"] * s["qty"])と書くと「売上額が最大の辞書」を返します。`
      ],
      expectedOutput: "果物: 1600円"
    },
    {
      id: 192,
      title: "テキスト処理ツール（正規表現）",
      explanation: `<p>次のテーマは第16章で学んだ<strong>正規表現</strong>の実践です。注文の受付メッセージから情報を抜き出し、個人情報をマスク（伏せ字に）する、という小さなテキスト処理ツールを作ります。実務でもログの解析や、外部に出す文書からの電話番号除去などでそのまま使うパターンです。</p>
<p>使う3つの関数の役割を復習しましょう。</p>
<table>
<tr><th>関数</th><th>役割</th><th>戻り値</th></tr>
<tr><td><code>re.findall</code></td><td>マッチした部分を<strong>すべて</strong>集める</td><td>文字列のリスト</td></tr>
<tr><td><code>re.search</code></td><td><strong>最初の</strong>マッチを探す</td><td>マッチオブジェクト（なければNone）</td></tr>
<tr><td><code>re.sub</code></td><td>マッチした部分を<strong>置き換える</strong></td><td>置換後の文字列</td></tr>
</table>
<p>金額の抽出は「数字の並び＋円」なので<code>r"\\d+円"</code>です。<code>\\d</code>は数字1文字、<code>+</code>は直前の1回以上の繰り返しでした。注文番号「A-1023」からは、種別と番号を別々に取り出したいので<strong>グループ</strong>（<code>()</code>で囲んだ部分。第16章）を使います。</p>
<pre><code>m = re.search(r"([A-Z])-(\\d+)", text)
if m:
    print(m.group(1))   # A（1つ目のグループ）
    print(m.group(2))   # 1023（2つ目のグループ）</code></pre>
<p>グループを定義していないパターンで<code>m.group(1)</code>を呼ぶと<code>IndexError: no such group</code>になります。「groupの番号は、パターン内の<code>(</code>の登場順」という対応関係を思い出してください。</p>
<p>電話番号のマスクは「3桁-4桁-4桁」を固定回数の量指定子<code>{数}</code>で表現し、<code>re.sub</code>で置き換えます。</p>
<pre><code>masked = re.sub(r"\\d{3}-\\d{4}-\\d{4}", "***-****-****", text)</code></pre>
<p>findallが2件の電話番号を全部見つけるのと同様、subも<strong>マッチした箇所をすべて</strong>置き換えます。1つのテキストに対して「抽出はfindall・search、加工はsub」と使い分けるのが基本形です。</p>`,
      task: `3つのTODOを埋めてください。(1)金額（数字の並び＋円）を<code>findall</code>で抽出、(2)注文番号を「英大文字1文字」と「数字の並び」の2グループで取得、(3)電話番号（3桁-4桁-4桁）を<code>***-****-****</code>に置換、です。`,
      code: `import re

text = "注文番号A-1023を受け付けました。合計は4500円です。連絡先は090-1234-5678、予備は080-9876-5432です。"

# TODO: 「数字の並び+円」をfindallですべて抜き出す
prices = re.findall(r"円", text)
print(prices)

# TODO: 注文番号を「英大文字1文字」と「数字の並び」の2グループで取り出す
m = re.search(r"A-1023", text)
if m:
    print(f"種別: {m.group(1)} 番号: {m.group(2)}")

# TODO: 電話番号(3桁-4桁-4桁)を***-****-****に置き換える
masked = text
print(masked)
`,
      solution: `import re

text = "注文番号A-1023を受け付けました。合計は4500円です。連絡先は090-1234-5678、予備は080-9876-5432です。"

# 数字の並び+円をすべて抜き出す
prices = re.findall(r"\\d+円", text)
print(prices)

# ()のグループで種別と番号を別々に取り出す
m = re.search(r"([A-Z])-(\\d+)", text)
if m:
    print(f"種別: {m.group(1)} 番号: {m.group(2)}")

# 3桁-4桁-4桁の電話番号をすべてマスクする
masked = re.sub(r"\\d{3}-\\d{4}-\\d{4}", "***-****-****", text)
print(masked)
`,
      hints: [
        `数字1文字は\\d、1回以上の繰り返しは+、ちょうどn回は{n}で表します。`,
        `注文番号のパターンは([A-Z])-(\\d+)です。()で囲んだ部分がgroup(1)、group(2)になります。`,
        `置換はre.sub(パターン, 置換後の文字列, text)の形で、マッチした全箇所が置き換わります。`
      ],
      expectedOutput: "種別: A 番号: 1023"
    },
    {
      id: 193,
      title: "クラス設計（在庫管理）",
      explanation: `<p>このステップのテーマは、クラス（第11章）と例外（第10章）を組み合わせた「<strong>守りのあるクラス設計</strong>」です。在庫管理クラスを題材に、「不正な操作をデータに反映させない」書き方を練習します。</p>
<p>初期コードの<code>remove</code>メソッドにはチェックがなく、在庫5個のペンから100個取り出せてしまいます。実行すると在庫が<code>-95個</code>になり、エラーも出ないまま<strong>データが壊れた状態で処理が続いてしまう</strong>のです。これは実務で最も怖いタイプのバグで、気づいたときには壊れたデータがあちこちに波及しています。</p>
<p>対策は「メソッドの入口で条件を検証し、ダメなら<code>raise</code>で例外を送出してデータを変更する前に処理を止める」ことです（第10章の「関数から例外で失敗を伝える設計」の応用です）。</p>
<pre><code>def remove(self, name, qty):
    stock = self.items.get(name, 0)
    if qty &gt; stock:
        raise ValueError(f"{name}の在庫が足りません（在庫{stock}個）")
    self.items[name] = stock - qty</code></pre>
<p>ポイントを整理します。</p>
<ul>
<li><strong>チェックは変更の前に置く</strong>：検証より先に<code>self.items</code>を書き換えてしまうと、例外が出てもデータは壊れたままになる</li>
<li><strong>get(name, 0)でKeyErrorを防ぐ</strong>：存在しない商品名は在庫0として扱う（第5章）</li>
<li><strong>エラーメッセージに状況を入れる</strong>：「何の在庫が」「今いくつなのか」を含めると、呼び出し側がメッセージだけで原因を特定できる</li>
</ul>
<p>呼び出し側は<code>try-except</code>で受け止めて、プログラム全体を止めずにエラーを報告します。「クラスの内側は例外で守り、外側はtry-exceptで受ける」という役割分担は、この後の図書館システム（ステップ199・200）でも軸になります。</p>`,
      task: `<code>remove</code>メソッドに在庫チェックを追加してください。取り出す数が在庫を超えていたら、<code>ペンの在庫が足りません（在庫5個）</code>という形式のメッセージで<code>ValueError</code>を送出します。`,
      code: `class Inventory:
    def __init__(self):
        self.items = {}

    def add(self, name, qty):
        if qty <= 0:
            raise ValueError("数量は1以上を指定してください")
        self.items[name] = self.items.get(name, 0) + qty

    def remove(self, name, qty):
        # TODO: qtyが在庫数を超えていたらValueErrorを送出する
        # メッセージ例: ペンの在庫が足りません（在庫5個）
        stock = self.items.get(name, 0)
        self.items[name] = stock - qty

    def report(self):
        for name, qty in self.items.items():
            print(f"{name}: {qty}個")

inv = Inventory()
inv.add("ノート", 10)
inv.add("ペン", 5)
inv.remove("ノート", 3)
try:
    inv.remove("ペン", 100)
except ValueError as e:
    print(f"エラー: {e}")
inv.report()
`,
      solution: `class Inventory:
    def __init__(self):
        self.items = {}

    def add(self, name, qty):
        if qty <= 0:
            raise ValueError("数量は1以上を指定してください")
        self.items[name] = self.items.get(name, 0) + qty

    def remove(self, name, qty):
        # データを変更する前に検証し、不正なら例外で処理を止める
        stock = self.items.get(name, 0)
        if qty > stock:
            raise ValueError(f"{name}の在庫が足りません（在庫{stock}個）")
        self.items[name] = stock - qty

    def report(self):
        for name, qty in self.items.items():
            print(f"{name}: {qty}個")

inv = Inventory()
inv.add("ノート", 10)
inv.add("ペン", 5)
inv.remove("ノート", 3)
try:
    inv.remove("ペン", 100)
except ValueError as e:
    print(f"エラー: {e}")
inv.report()
`,
      hints: [
        `まず現在の在庫数stockを取得し、qtyと比較してから引き算します。チェックは必ず変更の前に置きます。`,
        `if qty > stock:のときraise ValueError(f"{name}の在庫が足りません（在庫{stock}個）")です。`
      ],
      expectedOutput: "エラー: ペンの在庫が足りません（在庫5個）"
    },
    {
      id: 194,
      title: "ジェネレータでページング処理",
      explanation: `<p>このステップのテーマは、ジェネレータ（第13章）とスライス（第3・4章）を組み合わせた<strong>ページング処理</strong>です。ページングとは、大量のデータを「1ページあたり◯件」に区切って少しずつ処理・表示する手法で、Webアプリの一覧画面やAPIのレスポンス分割など、実務のあらゆる場面に登場します。</p>
<p>作るのは「リストを<code>size</code>件ずつの塊にして順に返す」ジェネレータ関数です。部品は2つだけです。</p>
<ul>
<li><strong>rangeのステップ指定</strong>（第7章）：<code>range(0, len(items), size)</code>は0, 3, 6, ...のように<code>size</code>飛びの開始位置を作る</li>
<li><strong>スライス</strong>：<code>items[start:start + size]</code>で開始位置から<code>size</code>件を切り出す。スライスは範囲外にはみ出してもエラーにならず、あるぶんだけ返してくれるので、端数の最終ページも自然に処理できる</li>
</ul>
<pre><code>def paginate(items, size):
    for start in range(0, len(items), size):
        yield items[start:start + size]

for page in paginate(["a", "b", "c", "d", "e"], 2):
    print(page)
# ['a', 'b'] → ['c', 'd'] → ['e']</code></pre>
<p><code>return</code>ではなく<strong><code>yield</code></strong>を使うのがポイントです。returnで全ページのリスト（リストのリスト）を作って返すと、全ページ分のメモリを一度に確保してしまいます。yieldなら「次のページを要求されたときに1ページだけ作る」遅延評価になるため、データが何万件あっても使うメモリはほぼ1ページ分で済みます（第13章のメモリ効率の話そのものです）。</p>
<p>呼び出し側では<code>enumerate(..., start=1)</code>（第7章）を組み合わせて、1始まりのページ番号を付けて表示します。「ジェネレータで区切り、enumerateで番号を振る」は覚えておいて損のない組み合わせです。</p>`,
      task: `<code>paginate</code>関数を完成させてください。<code>items</code>を先頭から<code>size</code>件ずつスライスで切り出し、<code>yield</code>で順に返すジェネレータ関数にします。`,
      code: `# TODO: itemsをsize件ずつに区切って順にyieldするジェネレータ関数にする
# ヒント: range(0, len(items), size)とスライスを組み合わせる
def paginate(items, size):
    yield items

users = ["u01", "u02", "u03", "u04", "u05", "u06", "u07"]
for page_no, page in enumerate(paginate(users, 3), start=1):
    print(f"{page_no}ページ目: {page}")
`,
      solution: `# itemsをsize件ずつのリストに分けて順に返すジェネレータ関数
def paginate(items, size):
    # rangeのステップ指定でsize飛びの開始位置を作り、スライスで切り出す
    for start in range(0, len(items), size):
        yield items[start:start + size]

users = ["u01", "u02", "u03", "u04", "u05", "u06", "u07"]
for page_no, page in enumerate(paginate(users, 3), start=1):
    print(f"{page_no}ページ目: {page}")
`,
      hints: [
        `開始位置は0, 3, 6, ...と進みます。range(0, len(items), size)で作れます。`,
        `for start in range(0, len(items), size):の中でyield items[start:start + size]とします。`
      ],
      expectedOutput: "3ページ目: ['u07']"
    },
    {
      id: 195,
      title: "デコレータで入力検証",
      explanation: `<p>このステップのテーマは、デコレータ（第14章）による<strong>入力検証の共通化</strong>です。「引数が正の数であること」のようなチェックは多くの関数で必要になりますが、各関数の先頭に同じif文をコピペしていくと、修正時に全箇所を直す羽目になります。チェックをデコレータに一度だけ書き、必要な関数に<code>@</code>で貼り付けるのがきれいな解決策です。</p>
<p>復習を兼ねて構造を確認します。デコレータは「関数を受け取り、機能を追加した別の関数（wrapper）を返す関数」でした。どんな引数の関数にも対応できるよう、wrapperは<code>*args</code>と<code>**kwargs</code>（第8章）で引数を丸ごと受け取り、そのまま元の関数へ渡します。</p>
<pre><code>import functools

def require_positive(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for value in args:
            if value &lt;= 0:
                raise ValueError(f"正の数を指定してください: {value}")
        return func(*args, **kwargs)
    return wrapper</code></pre>
<p>ポイントは3つあります。</p>
<ul>
<li><strong>検証は<code>func</code>を呼ぶ前に行う</strong>：不正な引数なら元の関数を実行させずに例外で止める（前ステップの「変更前にチェック」と同じ思想です）</li>
<li><strong><code>functools.wraps</code>を忘れない</strong>（第14章）：これがないと<code>rectangle_area.__name__</code>が<code>wrapper</code>になってしまい、デバッグ時に関数名が失われる</li>
<li><strong>検証済みなら<code>return func(*args, **kwargs)</code></strong>：戻り値をそのまま返すことで、デコレータを付けても関数の使い勝手が変わらない</li>
</ul>
<p>この形は実務のWebフレームワークで「ログイン必須」「権限チェック」などのデコレータとして日常的に使われています。「横断的なチェックはデコレータへ」という発想を持ち帰ってください。</p>`,
      task: `<code>wrapper</code>内のTODOを埋めてください。<code>args</code>の各値を調べ、0以下の値があれば<code>正の数を指定してください: -1</code>という形式のメッセージで<code>ValueError</code>を送出します。`,
      code: `import functools

def require_positive(func):
    """引数がすべて正の数であることを検証するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # TODO: argsの中に0以下の値があればValueErrorを送出する
        # メッセージ例: 正の数を指定してください: -1
        return func(*args, **kwargs)
    return wrapper

@require_positive
def rectangle_area(width, height):
    return width * height

print(rectangle_area(3, 4))
try:
    print(rectangle_area(-1, 5))
except ValueError as e:
    print(f"エラー: {e}")
print(rectangle_area.__name__)
`,
      solution: `import functools

def require_positive(func):
    """引数がすべて正の数であることを検証するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # 元の関数を呼ぶ前に引数を検証する
        for value in args:
            if value <= 0:
                raise ValueError(f"正の数を指定してください: {value}")
        return func(*args, **kwargs)
    return wrapper

@require_positive
def rectangle_area(width, height):
    return width * height

print(rectangle_area(3, 4))
try:
    print(rectangle_area(-1, 5))
except ValueError as e:
    print(f"エラー: {e}")
print(rectangle_area.__name__)
`,
      hints: [
        `argsは位置引数のタプルです。for value in args:で1つずつ調べられます。`,
        `if value <= 0:のときraise ValueError(f"正の数を指定してください: {value}")とし、検証はreturn func(...)より前に置きます。`
      ],
      expectedOutput: "エラー: 正の数を指定してください: -1"
    },
    {
      id: 196,
      title: "Counterでランキング作成",
      explanation: `<p>このステップのテーマは、<code>collections.Counter</code>（第15章）を使った<strong>ランキング作成</strong>です。検索ログ・アクセスログ・売れ筋商品など、「出現回数を数えて上位を出す」処理は実務の集計タスクの定番中の定番です。</p>
<p>Counterはイテラブルを渡すだけで「要素→出現回数」の辞書のようなオブジェクトを作ってくれます。そしてランキングに直結するのが<strong><code>most_common(n)</code></strong>メソッドです。出現回数の多い順に<code>(要素, 回数)</code>のタプルを並べたリストを返し、引数<code>n</code>で上位n件に絞れます。</p>
<pre><code>from collections import Counter

counter = Counter(["a", "b", "a", "c", "a", "b"])
print(counter.most_common(2))   # [('a', 3), ('b', 2)]</code></pre>
<p>表示では、タプルのリストをforで回しながら<strong>アンパック</strong>（第4章）で受け取ります。さらに順位を付けるために<code>enumerate(..., start=1)</code>を重ねると、変数の受け方は<code>rank, (word, count)</code>という入れ子の形になります。</p>
<pre><code>for rank, (word, count) in enumerate(counter.most_common(3), start=1):
    print(f"{rank}位: {word}（{count}回）")</code></pre>
<p>enumerateが返すのは<code>(順位, 要素)</code>のタプルで、その要素自体が<code>(word, count)</code>のタプルなので、括弧を使って二段階で受け取っているわけです。この「入れ子のアンパック」は最初は読みにくく感じますが、構造とそっくり同じ形の変数を書けばよい、と分かれば怖くありません。</p>
<p>なお、同数の要素が並んだ場合のmost_commonの順序は「先に登場した要素が先」と決まっています（挿入順の保持）。手でソートのkeyを書かなくても安定した結果が得られるのも、Counterを使う利点の1つです。</p>`,
      task: `2つのTODOを埋めてください。(1)<code>Counter</code>で<code>logs</code>の出現回数を数える、(2)<code>most_common(3)</code>と<code>enumerate</code>で上位3件を<code>1位: python（4回）</code>の形式で表示する、です。`,
      code: `from collections import Counter

logs = [
    "python", "javascript", "python", "go", "python",
    "javascript", "rust", "go", "python", "javascript",
]

# TODO: Counterでlogsの出現回数を数える
counter = {}

print("検索ランキング")
# TODO: most_common(3)とenumerate(..., start=1)で上位3件を表示する
# 出力例: 1位: python（4回）
`,
      solution: `from collections import Counter

logs = [
    "python", "javascript", "python", "go", "python",
    "javascript", "rust", "go", "python", "javascript",
]

# イテラブルを渡すだけで出現回数を数えてくれる
counter = Counter(logs)

print("検索ランキング")
# most_commonは(要素, 回数)のタプルを多い順に返す
for rank, (word, count) in enumerate(counter.most_common(3), start=1):
    print(f"{rank}位: {word}（{count}回）")
`,
      hints: [
        `counter = Counter(logs)とするだけで集計は完了します。`,
        `most_common(3)は[('python', 4), ...]の形を返します。for rank, (word, count) in enumerate(counter.most_common(3), start=1):と入れ子のアンパックで受け取ります。`
      ],
      expectedOutput: "1位: python（4回）"
    },
    {
      id: 197,
      title: "日付処理（営業日計算・固定日付）",
      explanation: `<p>このステップのテーマは、datetimeモジュール（第17章）を使った<strong>営業日計算</strong>です。「この期間の営業日は何日あるか」は、納期計算や勤怠集計など業務システムの頻出処理です。標準ライブラリに営業日を直接数える関数はないため、自分で組み立てます。</p>
<p>アルゴリズムは素直です。開始日から終了日まで1日ずつ進めながら、「平日で、かつ祝日でない日」だけをリストに集めます。</p>
<pre><code>current = start
while current &lt;= end:
    if current.weekday() &lt; 5 and current not in holidays:
        business_days.append(current)
    current += timedelta(days=1)</code></pre>
<p>部品を復習しましょう。</p>
<table>
<tr><th>部品</th><th>役割</th></tr>
<tr><td><code>weekday()</code></td><td>月曜=0〜日曜=6を返す。<code>&lt; 5</code>なら平日（月〜金）</td></tr>
<tr><td><code>timedelta(days=1)</code></td><td>日付に足すと1日進む。dateは足し算で日付計算できる</td></tr>
<tr><td><code>current not in holidays</code></td><td>祝日集合に含まれない日か判定。集合のinは高速（第5章）</td></tr>
</table>
<p>祝日はプログラムで判定できない（国や年度で異なる）ため、<strong>集合として自分で定義しておく</strong>のが定番です。dateオブジェクトはイミュータブルでハッシュ可能なので、そのまま集合の要素にできます。</p>
<p>表示には<code>strftime</code>を使い、<code>"%m/%d(%a)"</code>で「09/01(Tue)」のような形式にします。<code>%a</code>は英語の曜日の略称です。なお、2026年9月1日は火曜日で、期間中の9月5日・6日が土日、9月7日を祝日とすると、9月1日〜10日の営業日は7日になります。教材の約束どおり、結果を決定的にするため<code>today()</code>ではなく固定日付で作っている点にも注目してください。</p>`,
      task: `whileループ内のTODOを埋めてください。「平日（<code>weekday()</code>が5未満）かつ<code>holidays</code>に含まれない日」だけを<code>business_days</code>に追加するよう、if文で条件を付けます。`,
      code: `from datetime import date, timedelta

start = date(2026, 9, 1)
end = date(2026, 9, 10)
holidays = {date(2026, 9, 7)}

business_days = []
current = start
while current <= end:
    # TODO: 平日（weekday()が5未満）かつholidaysに含まれない日だけ追加する
    business_days.append(current)
    current += timedelta(days=1)

print(f"営業日数: {len(business_days)}日")
for d in business_days[:3]:
    print(d.strftime("%m/%d(%a)"))
`,
      solution: `from datetime import date, timedelta

start = date(2026, 9, 1)
end = date(2026, 9, 10)
holidays = {date(2026, 9, 7)}

business_days = []
current = start
while current <= end:
    # 平日（月=0〜金=4）かつ祝日でない日だけを営業日として数える
    if current.weekday() < 5 and current not in holidays:
        business_days.append(current)
    current += timedelta(days=1)

print(f"営業日数: {len(business_days)}日")
for d in business_days[:3]:
    print(d.strftime("%m/%d(%a)"))
`,
      hints: [
        `weekday()は月曜=0〜日曜=6を返すので、5未満なら平日です。`,
        `if current.weekday() < 5 and current not in holidays:の中でappendします。currentを進める行はifの外に残します。`
      ],
      expectedOutput: "営業日数: 7日"
    },
    {
      id: 198,
      title: "型ヒントとdataclassでリファクタリング",
      explanation: `<p>このステップのテーマは<strong>リファクタリング</strong>（外から見た動作を変えずに内部の書き方を改善すること）です。辞書ベースで書かれた動くコードを、dataclass（第19章）と型ヒント（第18章）を使う形に書き換えます。出力は1文字も変わりません。それでもやる価値がどこにあるのかを体感するのが狙いです。</p>
<p>辞書ベースのコードには次の弱点があります。</p>
<ul>
<li><code>m["salery"]</code>のようなキーのタイプミスが、実行してその行を通るまで発見できない</li>
<li>「このリストの辞書には何のキーが入っているのか」がコードのどこにも明示されない</li>
<li>エディタの補完が効かない（文字列のキーは推測できないため）</li>
</ul>
<p>dataclassに置き換えると、構造が型として宣言されます。</p>
<pre><code>@dataclass
class Employee:
    name: str
    department: str
    salary: int

def total_salary(members: list[Employee]) -&gt; int:
    return sum(m.salary for m in members)</code></pre>
<p>アクセスは<code>m["salary"]</code>から<code>m.salary</code>に変わります。属性名のタイプミスは<code>AttributeError</code>で即座に分かり、エディタは<code>m.</code>と打った瞬間に候補を出してくれます。さらに関数へ<code>list[Employee]</code>や<code>-&gt; int</code>の型ヒントを付ければ、「何を受け取り何を返す関数か」がシグネチャ（関数の宣言部分）だけで読み取れます。</p>
<p>リファクタリングの手順にもコツがあります。<strong>(1)データクラスを定義、(2)データの作成箇所を置き換え、(3)アクセス箇所を<code>["key"]</code>から<code>.属性</code>へ置き換え、(4)実行して出力が変わっていないことを確認</strong>、の順で機械的に進めます。動作確認を最後に必ず挟むのがリファクタリングの鉄則です。</p>`,
      task: `辞書ベースのコードをリファクタリングしてください。(1)<code>Employee</code>データクラス（<code>name</code>・<code>department</code>・<code>salary</code>）を定義、(2)社員リストを<code>Employee(...)</code>で作成、(3)2つの関数を属性アクセスと型ヒント付きに書き換えます。出力は変えません。`,
      code: `from dataclasses import dataclass

# TODO: Employeeデータクラス（name: str, department: str, salary: int）を定義する

# TODO: 引数と戻り値に型ヒントを付け、辞書アクセスを属性アクセスに書き換える
def total_salary(members):
    return sum(m["salary"] for m in members)

def filter_by_dept(members, dept):
    return [m for m in members if m["department"] == dept]

# TODO: 辞書のリストをEmployeeのリストに書き換える
employees = [
    {"name": "佐藤", "department": "開発", "salary": 400},
    {"name": "鈴木", "department": "営業", "salary": 350},
    {"name": "高橋", "department": "開発", "salary": 450},
]

dev = filter_by_dept(employees, "開発")
for m in dev:
    print(f"{m['name']}（{m['department']}）")
print(f"開発部の給与合計: {total_salary(dev)}万円")
`,
      solution: `from dataclasses import dataclass

# 辞書の構造をデータクラスとして宣言する
@dataclass
class Employee:
    name: str
    department: str
    salary: int

def total_salary(members: list[Employee]) -> int:
    """指定した社員リストの給与合計を返す"""
    return sum(m.salary for m in members)

def filter_by_dept(members: list[Employee], dept: str) -> list[Employee]:
    """部署名で社員を絞り込む"""
    return [m for m in members if m.department == dept]

employees = [
    Employee("佐藤", "開発", 400),
    Employee("鈴木", "営業", 350),
    Employee("高橋", "開発", 450),
]

dev = filter_by_dept(employees, "開発")
for m in dev:
    print(f"{m.name}（{m.department}）")
print(f"開発部の給与合計: {total_salary(dev)}万円")
`,
      hints: [
        `@dataclassを付けたクラスにname: str、department: str、salary: intの3フィールドを並べます。`,
        `m["salary"]はm.salaryに、m["department"]はm.departmentに置き換えます。printの中のm['name']もm.nameに変えるのを忘れずに。`,
        `型ヒントはdef total_salary(members: list[Employee]) -> int:の形です。`
      ],
      expectedOutput: "開発部の給与合計: 850万円"
    },
    {
      id: 199,
      title: "総合ミニアプリ前編（図書館システム：モデル定義）",
      explanation: `<p>最後の2ステップでは、図書館の蔵書管理システムを前編・後編に分けて作ります。前編のテーマは<strong>モデル定義</strong>、つまり「システムが扱うデータの形を決める」工程です。実務のアプリ開発でも、いきなり処理を書き始めるのではなく、まず扱うデータの構造を固めるのが定石です。</p>
<p>今回のシステムに登場するデータを整理すると、次の3つに分けられます。</p>
<table>
<tr><th>データ</th><th>表現方法</th><th>理由</th></tr>
<tr><td>蔵書の状態（貸出可・貸出中）</td><td><code>Enum</code></td><td>とりうる値が2つに決まっている</td></tr>
<tr><td>蔵書（ID・タイトル・著者・状態）</td><td><code>@dataclass</code></td><td>複数の属性を持つデータの箱</td></tr>
<tr><td>会員（ID・名前・借りている本のIDリスト）</td><td><code>@dataclass</code></td><td>同上。リストを持つ点に注意</td></tr>
</table>
<p>第19章で学んだ設計判断がそのまま活きます。<code>Book</code>の<code>status</code>フィールドは<code>BookStatus</code>型でデフォルトを<code>BookStatus.AVAILABLE</code>にします（Enumメンバーは直接デフォルト値にできる）。一方<code>Member</code>の<code>borrowed_ids</code>はリストなので、<strong><code>field(default_factory=list)</code>が必須</strong>です。<code>= []</code>と書くとValueErrorになるのでした。</p>
<pre><code>@dataclass
class Member:
    member_id: str
    name: str
    borrowed_ids: list[str] = field(default_factory=list)</code></pre>
<p>もう1つの設計ポイントは、<code>Member</code>が<code>Book</code>オブジェクトそのものではなく<strong>IDのリスト</strong>を持つことです。オブジェクトを直接持ち合うとデータの持ち主が曖昧になりがちですが、IDで参照すれば「蔵書の実体は蔵書一覧が管理し、会員は借りている本のIDだけ知っている」という一方向の関係を保てます。データベース設計の外部キーと同じ発想です。モデルが固まれば、後編の貸出処理は驚くほど素直に書けます。</p>`,
      task: `2つのTODOを埋めてください。(1)<code>Book</code>に<code>title</code>・<code>author</code>（ともに<code>str</code>）と<code>status</code>（<code>BookStatus</code>型、デフォルト<code>BookStatus.AVAILABLE</code>）を追加、(2)<code>Member</code>データクラス（<code>member_id</code>・<code>name</code>・<code>borrowed_ids</code>）を定義、です。`,
      code: `from dataclasses import dataclass, field
from enum import Enum

class BookStatus(Enum):
    AVAILABLE = "貸出可"
    BORROWED = "貸出中"

# TODO: フィールドを追加してBookを完成させる
# title(str)・author(str)・status(BookStatus、デフォルトはBookStatus.AVAILABLE)
@dataclass
class Book:
    book_id: str

# TODO: Memberデータクラスを定義する
# member_id(str)・name(str)・
# borrowed_ids(list[str]、デフォルトは空リスト。default_factoryを使う)

books = [
    Book("B001", "吾輩は猫である", "夏目漱石"),
    Book("B002", "走れメロス", "太宰治"),
    Book("B003", "銀河鉄道の夜", "宮沢賢治"),
]
member = Member("M001", "佐藤")

print("蔵書一覧")
for b in books:
    print(f"{b.book_id} {b.title}（{b.author}）: {b.status.value}")
print(f"会員: {member.name} 貸出中: {len(member.borrowed_ids)}冊")
`,
      solution: `from dataclasses import dataclass, field
from enum import Enum

class BookStatus(Enum):
    AVAILABLE = "貸出可"
    BORROWED = "貸出中"

# 蔵書：複数の属性を持つデータの箱はdataclassで表す
@dataclass
class Book:
    book_id: str
    title: str
    author: str
    status: BookStatus = BookStatus.AVAILABLE

# 会員：Bookの実体ではなくIDのリストで参照する
@dataclass
class Member:
    member_id: str
    name: str
    borrowed_ids: list[str] = field(default_factory=list)

books = [
    Book("B001", "吾輩は猫である", "夏目漱石"),
    Book("B002", "走れメロス", "太宰治"),
    Book("B003", "銀河鉄道の夜", "宮沢賢治"),
]
member = Member("M001", "佐藤")

print("蔵書一覧")
for b in books:
    print(f"{b.book_id} {b.title}（{b.author}）: {b.status.value}")
print(f"会員: {member.name} 貸出中: {len(member.borrowed_ids)}冊")
`,
      hints: [
        `Bookのフィールドは定義順が引数順になります。book_idの下にtitle、author、statusの順で並べます。`,
        `statusはstatus: BookStatus = BookStatus.AVAILABLEと書けます。Enumメンバーは直接デフォルト値にできます。`,
        `Memberのborrowed_idsはリストなのでborrowed_ids: list[str] = field(default_factory=list)とします。`
      ],
      expectedOutput: "B001 吾輩は猫である（夏目漱石）: 貸出可"
    },
    {
      id: 200,
      title: "総合ミニアプリ後編（図書館システム：貸出処理と集計）",
      explanation: `<p>250ステップの折り返し地点、第20章の最終ステップです。前編で定義したモデルの上に、<strong>貸出処理と集計</strong>を持つ<code>Library</code>クラスを組み立てます。これまでの総決算として、使っている知識を挙げると、クラスと例外設計（ステップ193）、辞書内包表記（第9章）、Enumの状態管理（第19章）、リスト内包表記での集計、と本書の主要トピックが勢揃いします。</p>
<p>設計の要点は3つです。</p>
<p><strong>1. 蔵書はIDで引ける辞書として持つ。</strong>初期化時に辞書内包表記でリストを「ID→Book」の辞書に変換しておくと、以後の検索が<code>self.books.get(book_id)</code>の1行になります。リストをforで探し回るより速く、コードも短くなります。</p>
<pre><code>def __init__(self, books):
    self.books = {b.book_id: b for b in books}</code></pre>
<p><strong>2. 貸出の入口で二重にガードする。</strong>存在しないIDと貸出中の本、2つの異常をデータ変更の前に検証します。<code>get()</code>は見つからないとき<code>None</code>を返すので、まず<code>None</code>チェック、続いて<code>book.status is BookStatus.BORROWED</code>の状態チェック、と並べます。順番が重要です。逆にすると<code>None.status</code>で<code>AttributeError</code>になってしまいます。</p>
<pre><code>book = self.books.get(book_id)
if book is None:
    raise ValueError(f"存在しない蔵書IDです: {book_id}")
if book.status is BookStatus.BORROWED:
    raise ValueError(f"「{book.title}」は貸出中です")</code></pre>
<p><strong>3. 履歴は追記するだけのリストで持つ。</strong>貸出のたびに<code>history</code>へIDを追記しておけば、累計貸出回数は<code>len(self.history)</code>で出せます。現在貸出中の冊数は、蔵書の状態から内包表記で数えます。「現在の状態」と「累積の履歴」を別のデータで持つのは、集計要件に強いモデルの基本です。ここまで書けたら、あなたはPythonで小さな業務システムの中核を設計・実装できたことになります。</p>`,
      task: `<code>borrow</code>メソッドのTODOを埋めてください。(1)<code>book</code>が<code>None</code>なら<code>存在しない蔵書IDです: B999</code>の形式で<code>ValueError</code>、(2)貸出中なら<code>「走れメロス」は貸出中です</code>の形式で<code>ValueError</code>を送出します。チェックは状態変更の前に置きます。`,
      code: `from dataclasses import dataclass
from enum import Enum

class BookStatus(Enum):
    AVAILABLE = "貸出可"
    BORROWED = "貸出中"

@dataclass
class Book:
    book_id: str
    title: str
    status: BookStatus = BookStatus.AVAILABLE

class Library:
    def __init__(self, books):
        # 検索しやすいよう「ID→Book」の辞書に変換して持つ
        self.books = {b.book_id: b for b in books}
        self.history = []

    def borrow(self, book_id):
        book = self.books.get(book_id)
        # TODO: bookがNoneならValueError（メッセージ例: 存在しない蔵書IDです: B999）
        # TODO: 貸出中ならValueError（メッセージ例: 「走れメロス」は貸出中です）
        book.status = BookStatus.BORROWED
        self.history.append(book_id)

    def return_book(self, book_id):
        self.books[book_id].status = BookStatus.AVAILABLE

    def report(self):
        borrowed = [b for b in self.books.values() if b.status is BookStatus.BORROWED]
        print(f"貸出中: {len(borrowed)}冊 / 全{len(self.books)}冊")
        print(f"累計貸出回数: {len(self.history)}回")

library = Library([
    Book("B001", "吾輩は猫である"),
    Book("B002", "走れメロス"),
    Book("B003", "銀河鉄道の夜"),
])

library.borrow("B001")
library.borrow("B002")
library.return_book("B001")
library.borrow("B001")
try:
    library.borrow("B002")
except ValueError as e:
    print(f"エラー: {e}")
library.report()
`,
      solution: `from dataclasses import dataclass
from enum import Enum

class BookStatus(Enum):
    AVAILABLE = "貸出可"
    BORROWED = "貸出中"

@dataclass
class Book:
    book_id: str
    title: str
    status: BookStatus = BookStatus.AVAILABLE

class Library:
    def __init__(self, books):
        # 検索しやすいよう「ID→Book」の辞書に変換して持つ
        self.books = {b.book_id: b for b in books}
        self.history = []

    def borrow(self, book_id):
        book = self.books.get(book_id)
        # 状態を変更する前に、二段階のガードで異常を止める
        if book is None:
            raise ValueError(f"存在しない蔵書IDです: {book_id}")
        if book.status is BookStatus.BORROWED:
            raise ValueError(f"「{book.title}」は貸出中です")
        book.status = BookStatus.BORROWED
        self.history.append(book_id)

    def return_book(self, book_id):
        self.books[book_id].status = BookStatus.AVAILABLE

    def report(self):
        borrowed = [b for b in self.books.values() if b.status is BookStatus.BORROWED]
        print(f"貸出中: {len(borrowed)}冊 / 全{len(self.books)}冊")
        print(f"累計貸出回数: {len(self.history)}回")

library = Library([
    Book("B001", "吾輩は猫である"),
    Book("B002", "走れメロス"),
    Book("B003", "銀河鉄道の夜"),
])

library.borrow("B001")
library.borrow("B002")
library.return_book("B001")
library.borrow("B001")
try:
    library.borrow("B002")
except ValueError as e:
    print(f"エラー: {e}")
library.report()
`,
      hints: [
        `Noneチェックはif book is None:、状態チェックはif book.status is BookStatus.BORROWED:です。この順番で並べます。`,
        `メッセージはf"存在しない蔵書IDです: {book_id}"とf"「{book.title}」は貸出中です"のようにf-stringで組み立てます。`,
        `2つのif文はbook.status = BookStatus.BORROWEDより前に置きます。後に置くとデータが壊れてから例外が出てしまいます。`
      ],
      expectedOutput: "累計貸出回数: 3回"
    }
  ]
});
