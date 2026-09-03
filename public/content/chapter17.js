// 第17章：日付と時刻
registerChapter({
  number: 17,
  title: "日付と時刻",
  description: "datetimeモジュールを中心に、日付・時刻の作成、書式変換、日数計算、UNIX時間、処理時間の計測までを学びます。",
  steps: [
    {
      id: 161,
      title: "dateオブジェクトの作成と属性",
      explanation: `<p>日付を扱うには、標準ライブラリの<code>datetime</code>モジュールにある<code>date</code>クラスを使います。<code>date(年, 月, 日)</code>と書くと、1つの日付を表すオブジェクトを作れます。</p>
<pre><code>from datetime import date

d = date(2026, 4, 1)
print(d)              # 2026-04-01
print(d.year)         # 2026
print(d.month)        # 4
print(d.day)          # 1
print(d.isoformat())  # 2026-04-01（ISO形式の文字列）</code></pre>
<p>作ったオブジェクトからは、<code>year</code>・<code>month</code>・<code>day</code>という属性（オブジェクトが内部に持つ値）で年・月・日を取り出せます。<code>print()</code>すると「YYYY-MM-DD」形式で表示されます。これはISO 8601（日付表記の国際規格）の形式で、同じ文字列が欲しいときは<code>isoformat()</code>メソッドでも取得できます。</p>
<p>「日付なんて文字列で持てばいいのでは」と思うかもしれませんが、dateオブジェクトには文字列にない強みがあります。まず、存在しない日付を作ろうとすると即座に<code>ValueError</code>になるので、不正なデータに早く気づけます。</p>
<pre><code>date(2026, 2, 30)  # ValueError: day is out of range for month</code></pre>
<p>さらに、この後のステップで学ぶ「日数の計算」や「日付同士の比較」がそのままできます。実務では、外部から受け取った日付はできるだけ早くdateオブジェクトへ変換し、プログラム内部では文字列ではなくオブジェクトのまま扱うのが定石です。</p>`,
      task: `属性<code>month</code>と<code>day</code>を使って、「月: 3」「日: 25」の2行を追加で出力してください。`,
      code: `from datetime import date

# 卒業式の日付：2026年3月25日
graduation = date(2026, 3, 25)

print(graduation)
print(f"年: {graduation.year}")
# TODO: 上の行を参考に、「月: 3」と「日: 25」も出力する
`,
      solution: `from datetime import date

# 卒業式の日付：2026年3月25日
graduation = date(2026, 3, 25)

print(graduation)
print(f"年: {graduation.year}")
print(f"月: {graduation.month}")
print(f"日: {graduation.day}")
`,
      hints: [
        `年をyear属性で取り出しているのと同じ形で、月はmonth属性、日はday属性で取り出せます`,
        `print(f"月: {graduation.month}")のように、f-stringの中に属性を埋め込みます`
      ],
      expectedOutput: "月: 3"
    },
    {
      id: 162,
      title: "datetimeオブジェクト",
      explanation: `<p>日付だけでなく時刻も一緒に扱いたいときは、<code>datetime</code>モジュールの<code>datetime</code>クラスを使います（モジュール名とクラス名が同じなので最初は混乱しがちです）。<code>datetime(年, 月, 日, 時, 分, 秒)</code>の形で作ります。</p>
<pre><code>from datetime import datetime

dt = datetime(2026, 9, 3, 14, 30, 0)
print(dt)         # 2026-09-03 14:30:00
print(dt.hour)    # 14
print(dt.minute)  # 30
print(dt.second)  # 0</code></pre>
<p>dateの属性（year・month・day）に加えて、<code>hour</code>・<code>minute</code>・<code>second</code>で時・分・秒を取り出せます。また、<code>date()</code>メソッドで日付部分だけ、<code>time()</code>メソッドで時刻部分だけを切り出せます。</p>
<p>datetimeモジュールの主なクラスを整理すると次のようになります。</p>
<table>
<tr><th>クラス</th><th>表すもの</th><th>例</th></tr>
<tr><td>date</td><td>日付のみ</td><td>2026-09-03</td></tr>
<tr><td>datetime</td><td>日付＋時刻</td><td>2026-09-03 14:30:00</td></tr>
<tr><td>time</td><td>時刻のみ</td><td>14:30:00</td></tr>
<tr><td>timedelta</td><td>期間（時間の長さ）</td><td>3日と5時間</td></tr>
</table>
<p>「誕生日」のように時刻が意味を持たないデータはdate、「会議の開始日時」のように時刻まで必要なデータはdatetimeと、表したい情報に合わせて使い分けます。なお、この教材では実行のたびに結果が変わらないよう、現在時刻を取る<code>now()</code>や<code>today()</code>ではなく固定の日時を使って練習します。</p>`,
      task: `TODOの2行を実装し、「分: 30」と「日付部分: 2026-09-03」を出力してください。`,
      code: `from datetime import datetime

# 会議の開始日時：2026年9月3日 14時30分0秒
meeting = datetime(2026, 9, 3, 14, 30, 0)

print(meeting)
print(f"時: {meeting.hour}")
# TODO: 分（minute属性）を「分: 30」の形式で出力する
# TODO: date()メソッドで「日付部分: 2026-09-03」の形式で出力する
`,
      solution: `from datetime import datetime

# 会議の開始日時：2026年9月3日 14時30分0秒
meeting = datetime(2026, 9, 3, 14, 30, 0)

print(meeting)
print(f"時: {meeting.hour}")
print(f"分: {meeting.minute}")
print(f"日付部分: {meeting.date()}")
`,
      hints: [
        `分はminute属性です。hourの行と同じ形で書けます`,
        `date()は属性ではなくメソッドなので、meeting.date()と丸カッコが必要です`
      ],
      expectedOutput: "日付部分: 2026-09-03"
    },
    {
      id: 163,
      title: "strftimeで整形",
      explanation: `<p>datetimeオブジェクトを「2026年09月03日」のような好きな形式の文字列に変換するには、<code>strftime()</code>メソッド（string format timeの略）を使います。書式コードと呼ばれる「%＋英字」の記号を並べて、出力の形を指定します。</p>
<pre><code>from datetime import datetime

dt = datetime(2026, 9, 3, 14, 30, 0)
print(dt.strftime("%Y年%m月%d日"))      # 2026年09月03日
print(dt.strftime("%H:%M:%S"))          # 14:30:00
print(f"開始は{dt:%H時%M分}です")        # 開始は14時30分です</code></pre>
<p>主な書式コードは次の通りです。</p>
<table>
<tr><th>コード</th><th>意味</th><th>例</th></tr>
<tr><td>%Y</td><td>4桁の年</td><td>2026</td></tr>
<tr><td>%m</td><td>2桁の月（ゼロ埋め）</td><td>09</td></tr>
<tr><td>%d</td><td>2桁の日（ゼロ埋め）</td><td>03</td></tr>
<tr><td>%H</td><td>24時間制の時</td><td>14</td></tr>
<tr><td>%M</td><td>分</td><td>30</td></tr>
<tr><td>%S</td><td>秒</td><td>00</td></tr>
<tr><td>%a</td><td>曜日の略称（英語）</td><td>Thu</td></tr>
<tr><td>%A</td><td>曜日の正式名（英語）</td><td>Thursday</td></tr>
</table>
<p>%mや%dはゼロ埋めされるため、9月は「09」と表示される点に注意してください。書式コード以外の文字（「年」「/」「:」など）はそのまま出力されるので、日本語を混ぜた書式も自由に作れます。また、3つ目の例のようにf-stringのコロンの後ろに書式コードを直接書くこともでき、実務のログ出力などでよく使われる書き方です。</p>`,
      task: `TODOの2行を実装し、「2026-09-03 14:30」と「2026/09/03 (Thu)」を出力してください。`,
      code: `from datetime import datetime

dt = datetime(2026, 9, 3, 14, 30, 0)

# %Yは4桁の年、%mは2桁の月、%dは2桁の日
print(dt.strftime("%Y年%m月%d日"))
# TODO: 「2026-09-03 14:30」の形式で出力する（時と分は%Hと%M）
# TODO: 「2026/09/03 (Thu)」の形式で出力する（曜日の略称は%a）
`,
      solution: `from datetime import datetime

dt = datetime(2026, 9, 3, 14, 30, 0)

# %Yは4桁の年、%mは2桁の月、%dは2桁の日
print(dt.strftime("%Y年%m月%d日"))
print(dt.strftime("%Y-%m-%d %H:%M"))
print(dt.strftime("%Y/%m/%d (%a)"))
`,
      hints: [
        `書式コードの間に置いた「-」「:」「/」などの文字は、そのまま出力されます`,
        `1つ目はstrftime("%Y-%m-%d %H:%M")、2つ目は%aを丸カッコで挟んで(%a)と書きます`
      ],
      expectedOutput: "2026-09-03 14:30"
    },
    {
      id: 164,
      title: "strptimeで解析",
      explanation: `<p>strftimeとは逆に、「2026-12-25 18:00」のような文字列からdatetimeオブジェクトを作るには、<code>datetime.strptime()</code>（string parse timeの略）を使います。第1引数に解析したい文字列、第2引数にその文字列の形を表す書式を渡します。</p>
<pre><code>from datetime import datetime

dt = datetime.strptime("2026/12/25", "%Y/%m/%d")
print(dt)        # 2026-12-25 00:00:00
print(dt.month)  # 12</code></pre>
<p>重要なのは、<strong>書式が文字列の形と完全に一致している必要がある</strong>ことです。区切り文字が「/」なのか「-」なのか、時刻があるのかないのかまで正確に合わせます。一致していないと次のような<code>ValueError</code>が発生します。</p>
<pre><code>ValueError: time data '2026-12-25 18:00' does not match format '%Y/%m/%d'</code></pre>
<p>このエラーメッセージは「与えた文字列が書式に合いません」という意味で、どの文字列とどの書式で失敗したかを教えてくれるので、落ち着いて読めば原因はすぐ特定できます。CSVやログファイルの日付列を読み取るとき、strptimeは実務で最も出番が多い関数のひとつです。</p>
<p>なお、「2026-12-25」のようなISO形式に限っては、書式指定なしで解析できる<code>date.fromisoformat()</code>・<code>datetime.fromisoformat()</code>という近道もあります。ISO形式ならこちら、独自形式ならstrptime、と使い分けるとコードが簡潔になります。</p>`,
      task: `実行すると<code>ValueError</code>になります。トレースバックを読み、書式指定を文字列「2026-12-25 18:00」の形に合わせて修正してください。`,
      code: `from datetime import datetime

text = "2026-12-25 18:00"
# 書式指定が文字列の形式と合っていないためValueErrorになる
dt = datetime.strptime(text, "%Y/%m/%d")

print(dt)
print(f"月: {dt.month}")
`,
      solution: `from datetime import datetime

text = "2026-12-25 18:00"
# 文字列の形式（-区切りの日付＋半角スペース＋時:分）に書式を合わせる
dt = datetime.strptime(text, "%Y-%m-%d %H:%M")

print(dt)
print(f"月: {dt.month}")
`,
      hints: [
        `文字列は「-」区切りで、後ろに半角スペースを挟んで「時:分」が続いています`,
        `書式は"%Y-%m-%d %H:%M"です。スペースの位置まで正確に合わせます`
      ],
      expectedOutput: "2026-12-25 18:00:00"
    },
    {
      id: 165,
      title: "timedeltaと日付の計算",
      explanation: `<p>「100日後は何月何日？」「締切まであと何日？」といった計算には、期間（時間の長さ）を表す<code>timedelta</code>クラスを使います。dateやdatetimeにtimedeltaを足し引きすると、ずらした日付が得られます。</p>
<pre><code>from datetime import date, timedelta

start = date(2026, 1, 1)
print(start + timedelta(days=30))    # 2026-01-31
print(start - timedelta(weeks=1))    # 2025-12-25

# 日付同士の引き算はtimedeltaになる
diff = date(2026, 3, 1) - start
print(diff.days)                     # 59</code></pre>
<p><code>timedelta()</code>には<code>days</code>・<code>weeks</code>・<code>hours</code>・<code>minutes</code>・<code>seconds</code>などのキーワード引数を渡せます。逆に、日付同士を引き算すると結果はtimedeltaオブジェクトになり、<code>days</code>属性で日数を、<code>total_seconds()</code>メソッドで合計秒数を取り出せます。</p>
<p>月をまたぐ計算を自動でやってくれるのが最大の利点です。1月は31日、2月は28日…といった月ごとの日数の違いを自分で処理する必要はありません。一方で、timedeltaには<code>months=</code>や<code>years=</code>という引数は<strong>存在しません</strong>。「1か月後」は月によって28〜31日後のどれなのか曖昧だからです。「翌月の同じ日」が必要な場合は、year・month属性から自分で組み立てるか、外部ライブラリを使うのが実務での対処法です。</p>`,
      task: `TODOの2か所を実装し、「2週間前: 2026-08-20」と「大晦日まで: 119日」を出力してください。`,
      code: `from datetime import date, timedelta

start = date(2026, 9, 3)

# 100日後を計算する
after = start + timedelta(days=100)
print(f"100日後: {after}")

# TODO: timedelta(weeks=2)を使い、「2週間前: 2026-08-20」と出力する

# TODO: 大晦日date(2026, 12, 31)からstartを引き算し、
#       結果のdays属性を使って「大晦日まで: 119日」と出力する
`,
      solution: `from datetime import date, timedelta

start = date(2026, 9, 3)

# 100日後を計算する
after = start + timedelta(days=100)
print(f"100日後: {after}")

# 2週間前は引き算で求める
before = start - timedelta(weeks=2)
print(f"2週間前: {before}")

# 日付同士の引き算はtimedeltaオブジェクトになる
diff = date(2026, 12, 31) - start
print(f"大晦日まで: {diff.days}日")
`,
      hints: [
        `「前」の日付を求めるには、足し算ではなく引き算を使います`,
        `diff = date(2026, 12, 31) - start とすると、diff.daysで日数が取れます`
      ],
      expectedOutput: "大晦日まで: 119日"
    },
    {
      id: 166,
      title: "日付の比較と曜日（weekday）",
      explanation: `<p>dateやdatetimeのオブジェクト同士は、数値と同じように不等号で比較できます。「締切を過ぎていないか」のような判定が素直に書けるほか、<code>min()</code>・<code>max()</code>・<code>sorted()</code>もそのまま使えます。</p>
<pre><code>from datetime import date

a = date(2026, 9, 3)
b = date(2026, 10, 1)
print(a &lt; b)             # True（aの方が過去）
print(max(a, b))          # 2026-10-01
print(sorted([b, a]))     # 古い順に並ぶ</code></pre>
<p>曜日は<code>weekday()</code>メソッドで取得します。戻り値は<strong>月曜日が0、日曜日が6</strong>の整数です。似たメソッドに<code>isoweekday()</code>（月曜日が1、日曜日が7）もあるので、混同しないよう注意してください。</p>
<table>
<tr><th>曜日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th><th>日</th></tr>
<tr><td>weekday()</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
<tr><td>isoweekday()</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
</table>
<p>weekday()が0始まりなのは、日本語の曜日名リストと組み合わせるときに便利です。</p>
<pre><code>names = ["月", "火", "水", "木", "金", "土", "日"]
d = date(2026, 9, 3)
print(names[d.weekday()])  # 木</code></pre>
<p>戻り値をそのままリストの添字（インデックス）に使えるため、変換テーブルを別途用意する必要がありません。「0始まりの連番はリストの添字と相性が良い」という感覚は、日付に限らずPython全般で役立つ考え方です。</p>`,
      task: `TODOを実装し、<code>weekday()</code>と曜日名リスト<code>names</code>を使って「2026-09-03は木曜日」と出力してください。`,
      code: `from datetime import date

release = date(2026, 9, 3)
deadline = date(2026, 10, 1)

# 日付は不等号で比較できる
print(release < deadline)
print(f"早い方: {min(release, deadline)}")

names = ["月", "火", "水", "木", "金", "土", "日"]
# TODO: weekday()の戻り値（月曜=0〜日曜=6）をnamesの添字に使い、
#       「2026-09-03は木曜日」と出力する
`,
      solution: `from datetime import date

release = date(2026, 9, 3)
deadline = date(2026, 10, 1)

# 日付は不等号で比較できる
print(release < deadline)
print(f"早い方: {min(release, deadline)}")

names = ["月", "火", "水", "木", "金", "土", "日"]
# weekday()は月曜=0〜日曜=6を返すので、リストの添字にそのまま使える
print(f"{release}は{names[release.weekday()]}曜日")
`,
      hints: [
        `release.weekday()は整数を返すので、names[その整数]で曜日名が取れます`,
        `f-stringの中に{release}と{names[release.weekday()]}を埋め込み、末尾に「曜日」を付けます`
      ],
      expectedOutput: "2026-09-03は木曜日"
    },
    {
      id: 167,
      title: "timestampとUNIX時間",
      explanation: `<p>コンピュータの世界では、日時を「<strong>1970年1月1日0時0分0秒（UTC）からの経過秒数</strong>」という1つの数値で表す方法が広く使われています。これをUNIX時間（またはタイムスタンプ、エポック秒）と呼びます。ログの記録やAPIのやり取り、データベースなど、システム間で日時を受け渡す場面の共通言語です。</p>
<pre><code>from datetime import datetime, timezone

dt = datetime(2026, 1, 1, tzinfo=timezone.utc)
print(dt.timestamp())    # 1767225600.0

restored = datetime.fromtimestamp(1767225600, tz=timezone.utc)
print(restored)          # 2026-01-01 00:00:00+00:00</code></pre>
<p><code>timestamp()</code>メソッドでdatetimeをUNIX時間（float）に変換でき、逆に<code>datetime.fromtimestamp()</code>でUNIX時間からdatetimeを作れます。</p>
<p>ここで重要なのが<code>tzinfo=timezone.utc</code>という指定です。UTC（協定世界時）は世界共通の基準時刻で、日本時間はここから9時間進んでいます。タイムゾーン情報を持たないdatetime（naiveなdatetimeと呼びます）で<code>timestamp()</code>を呼ぶと、<strong>実行しているマシンのタイムゾーン設定で解釈される</strong>ため、同じコードでも日本のPCとサーバー（多くはUTC設定）で結果が変わってしまいます。<code>tzinfo=timezone.utc</code>を付けてタイムゾーンを明示すれば、どの環境でも同じ値になります。「システム間でやり取りする日時にはタイムゾーンを明示する」は、実務でのトラブルを防ぐ鉄則です。</p>`,
      task: `TODOの2か所を実装し、「UNIX時間: 1767225600」と「復元: 2026-01-01 00:00:00+00:00」を出力してください。`,
      code: `from datetime import datetime, timezone

# 2026年1月1日 0時0分0秒（UTC）
dt = datetime(2026, 1, 1, 0, 0, 0, tzinfo=timezone.utc)

# TODO: timestamp()の結果をint()で整数にしてtsに代入し、
#       「UNIX時間: 1767225600」と出力する
ts = 0

# TODO: datetime.fromtimestamp(ts, tz=timezone.utc)で日時に戻し、
#       「復元: 2026-01-01 00:00:00+00:00」と出力する
`,
      solution: `from datetime import datetime, timezone

# 2026年1月1日 0時0分0秒（UTC）
dt = datetime(2026, 1, 1, 0, 0, 0, tzinfo=timezone.utc)

# timestamp()は1970年1月1日(UTC)からの経過秒数をfloatで返す
ts = int(dt.timestamp())
print(f"UNIX時間: {ts}")

# fromtimestampでUNIX時間から日時を復元できる
restored = datetime.fromtimestamp(ts, tz=timezone.utc)
print(f"復元: {restored}")
`,
      hints: [
        `timestamp()はfloatを返すので、int(dt.timestamp())で整数にします`,
        `復元はrestored = datetime.fromtimestamp(ts, tz=timezone.utc)と書き、そのままprintします`
      ],
      expectedOutput: "UNIX時間: 1767225600"
    },
    {
      id: 168,
      title: "timeモジュールと処理時間の計測",
      explanation: `<p>datetimeとは別に、より低レベルな時刻機能を提供する<code>time</code>モジュールがあります。代表的な関数を整理します。</p>
<table>
<tr><th>関数</th><th>用途</th><th>特徴</th></tr>
<tr><td>time.time()</td><td>現在のUNIX時間を取得</td><td>OSの時計に連動（時刻合わせで飛ぶことがある）</td></tr>
<tr><td>time.perf_counter()</td><td>処理時間の計測</td><td>高精度で、逆戻りしない</td></tr>
<tr><td>time.sleep(秒)</td><td>指定秒数だけ停止</td><td>この教材では0.05秒以下のみ使用可</td></tr>
</table>
<p>「この処理に何秒かかったか」を計測するときの定番は<code>perf_counter()</code>です。使い方は、処理の前後で値を取り、差を求めるだけです。</p>
<pre><code>import time

start = time.perf_counter()
# （計測したい処理）
elapsed = time.perf_counter() - start
print(f"{elapsed:.4f}秒")</code></pre>
<p>time.time()でも一見同じ計測ができますが、こちらはOSの時計そのものなので、計測中にNTP（ネットワーク経由の時刻合わせ）で時計が修正されると経過時間が狂い、まれにマイナスにさえなります。perf_counter()は計測専用に設計された単調増加（絶対に逆戻りしない）のカウンタで、精度も高いため、<strong>経過時間の計測には常にperf_counterを使う</strong>と覚えてください。</p>
<p>なお、perf_counter()の戻り値そのものは「ある基準点からの経過秒数」で、基準点はプログラムごとに異なります。単体の値には意味がなく、<strong>2回の呼び出しの差だけが意味を持つ</strong>点に注意してください。実行のたびに計測値は微妙に変わるため、このステップでは経過時間が0以上であることだけを確認します。</p>`,
      task: `2か所の<code>time.time()</code>を、処理時間の計測に適した<code>time.perf_counter()</code>に書き換えてください。`,
      code: `import time

# TODO: time.time()をtime.perf_counter()に書き換える
start = time.time()

total = 0
for i in range(1, 100001):
    total += i

# TODO: こちらもtime.perf_counter()に書き換える
elapsed = time.time() - start

print(f"合計: {total}")
print(f"経過時間は0以上: {elapsed >= 0}")
`,
      solution: `import time

# perf_counterは処理時間の計測専用の高精度なタイマー
start = time.perf_counter()

total = 0
for i in range(1, 100001):
    total += i

elapsed = time.perf_counter() - start

print(f"合計: {total}")
print(f"経過時間は0以上: {elapsed >= 0}")
`,
      hints: [
        `計測の開始と終了の両方で、同じ関数を使う必要があります`,
        `time.time()の部分を2か所ともtime.perf_counter()に置き換えるだけです`
      ],
      expectedOutput: "合計: 5000050000"
    },
    {
      id: 169,
      title: "うるう年判定とcalendarモジュール",
      explanation: `<p>うるう年（2月が29日まである年）の判定ルールは、意外と複雑です。</p>
<ol>
<li>4で割り切れる年はうるう年（例：2024年）</li>
<li>ただし100で割り切れる年はうるう年ではない（例：2100年）</li>
<li>ただし400で割り切れる年はうるう年（例：2000年）</li>
</ol>
<p>これを自分でif文にすると条件の入れ子で間違えやすいのですが、標準ライブラリの<code>calendar</code>モジュールに<code>isleap()</code>という判定関数が用意されています。</p>
<pre><code>import calendar

print(calendar.isleap(2024))  # True
print(calendar.isleap(2100))  # False（100で割り切れる）
print(calendar.isleap(2000))  # True（400で割り切れる）</code></pre>
<p>もうひとつ実務でよく使うのが<code>monthrange(年, 月)</code>です。「その月の1日の曜日」と「その月の日数」の2つをタプルで返します。</p>
<pre><code>first, days = calendar.monthrange(2026, 2)
print(days)   # 28（2026年2月は28日まで）</code></pre>
<p>「その月の末日は何日か」は月によって28〜31日と変わり、2月はさらにうるう年で変わるため、自力で計算すると面倒です。monthrangeを使えば1行で確実に求められます。戻り値がタプルなので、上の例のように2つの変数へのアンパック（分解代入）で受け取るのがきれいな書き方です。このほかcalendarモジュールには、テキストのカレンダーを丸ごと出力する<code>calendar.month(年, 月)</code>のような遊び心のある関数もあります。</p>`,
      task: `TODOを実装してください。<code>calendar.monthrange(2026, 2)</code>の戻り値を2つの変数にアンパックし、「2026年2月は28日まで」と出力します。`,
      code: `import calendar

# うるう年かどうかを判定する
for year in [2024, 2025, 2026, 2028]:
    print(f"{year}年: {calendar.isleap(year)}")

# TODO: calendar.monthrange(2026, 2)の戻り値（月初の曜日, 日数）を
#       first, daysの2つの変数にアンパックして受け取り、
#       「2026年2月は28日まで」と出力する
`,
      solution: `import calendar

# うるう年かどうかを判定する
for year in [2024, 2025, 2026, 2028]:
    print(f"{year}年: {calendar.isleap(year)}")

# monthrangeは（月初の曜日, その月の日数）のタプルを返す
first, days = calendar.monthrange(2026, 2)
print(f"2026年2月は{days}日まで")
`,
      hints: [
        `タプルはfirst, days = のように左辺にカンマ区切りの変数を並べて受け取れます`,
        `日数は2つ目の変数daysに入るので、f-stringで{days}を埋め込みます`
      ],
      expectedOutput: "2026年2月は28日まで"
    },
    {
      id: 170,
      title: "総合演習：記念日までの日数計算",
      explanation: `<p>この章の総仕上げとして、「基準日から各記念日まであと何日か」を一覧表示するプログラムを完成させます。使う道具はすべて学習済みです。</p>
<table>
<tr><th>処理</th><th>使う道具</th><th>学んだステップ</th></tr>
<tr><td>文字列を日時に変換</td><td>datetime.strptime()</td><td>164</td></tr>
<tr><td>日付部分の取り出し</td><td>date()メソッド</td><td>162</td></tr>
<tr><td>日数の計算</td><td>日付の引き算と.days</td><td>165</td></tr>
<tr><td>曜日の表示</td><td>weekday()と曜日名リスト</td><td>166</td></tr>
</table>
<p>処理の流れを言葉にすると次のようになります。</p>
<ol>
<li>記念日データは（名前, "YYYY-MM-DD"形式の文字列）のタプルのリストで持つ</li>
<li>各記念日の文字列をstrptimeで解析し、date()で日付に変換する</li>
<li>基準日との引き算で残り日数を求める（関数に切り出してある）</li>
<li>weekday()で曜日名を引き、f-stringで1行にまとめて出力する</li>
</ol>
<p>ポイントは、日数計算を<code>days_until()</code>という小さな関数に切り出していることです。「目標日から基準日を引いてdaysを返す」だけの関数ですが、名前が付いていることでメインのループが読みやすくなり、テストもしやすくなります。</p>
<pre><code># 日付の引き算はtimedeltaを返すので、daysで日数を取り出す
def days_until(base, target):
    return (target - base).days</code></pre>
<p>実務でも「文字列で受け取る→オブジェクトに変換→計算→整形して出力」という流れは、日付処理の典型パターンです。この形を体で覚えておくと、レポート生成やリマインダーのような処理をすぐに書けるようになります。</p>`,
      task: `TODOの2か所を実装してください。<code>days_until()</code>は日付の引き算で日数を返し、ループ内では<code>strptime</code>で文字列を解析して日付に変換します。`,
      code: `from datetime import date, datetime

def days_until(base, target):
    """基準日から目標日までの日数を返す"""
    # TODO: 日付同士の引き算とdays属性を使って日数を返す
    pass

base = date(2026, 9, 3)
events = [
    ("クリスマス", "2026-12-25"),
    ("元日", "2027-01-01"),
    ("創立記念日", "2026-10-10"),
]

names = ["月", "火", "水", "木", "金", "土", "日"]
for name, text in events:
    # TODO: strptime（書式は"%Y-%m-%d"）で解析し、date()で日付に変換する
    target = None
    rest = days_until(base, target)
    youbi = names[target.weekday()]
    print(f"{name}({youbi}): あと{rest}日")
`,
      solution: `from datetime import date, datetime

def days_until(base, target):
    """基準日から目標日までの日数を返す"""
    return (target - base).days

base = date(2026, 9, 3)
events = [
    ("クリスマス", "2026-12-25"),
    ("元日", "2027-01-01"),
    ("創立記念日", "2026-10-10"),
]

names = ["月", "火", "水", "木", "金", "土", "日"]
for name, text in events:
    # 文字列をdatetimeに解析し、date()で日付部分だけ取り出す
    target = datetime.strptime(text, "%Y-%m-%d").date()
    rest = days_until(base, target)
    youbi = names[target.weekday()]
    print(f"{name}({youbi}): あと{rest}日")
`,
      hints: [
        `days_untilの中身はreturn (target - base).daysの1行です`,
        `targetはdatetime.strptime(text, "%Y-%m-%d").date()で作れます。strptimeの結果はdatetimeなので、date()で日付だけにします`
      ],
      expectedOutput: "クリスマス(金): あと113日"
    }
  ]
});
