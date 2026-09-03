# Python 200 Steps

Pythonを基礎から250ステップで学べる学習Webサービス。
各ステップは「解説→課題→コード編集→実行→答え合わせ」を1ページで完結できる。

## 特徴

- 25章×10ステップ=250ステップのカリキュラム（printからクラス・ジェネレータ・デコレータ・型ヒント、よくあるエラー50選まで）
- ブラウザ上のエディタでPythonコードを編集し、その場で実行
- トレースバック（エラーメッセージ）をそのまま表示（エラーを読む訓練も学習の一部）
- 1から書かせず、例コードの部分修正・穴埋め・意図的なエラーの修正を中心とした課題設計
- ヒント（段階表示）、模範解答、期待出力による自動クリア判定
- 進捗はブラウザのlocalStorageに保存

公開URL：https://python-200-steps.pages.dev

## 必要環境

- Node.js 18以上（依存パッケージなし。npm install不要）
- Python 3（ローカル開発時はローカルのpython3でコードを実行する）

本番（Cloudflare Pages）ではPages Functions（`functions/api/`）がWandbox APIの`cpython-3.14.0`へプロキシしてコードを実行する。
教材のエラーメッセージはPython 3.14の実出力に合わせて書いているため、処理系のバージョンは固定している。

## 使い方

```bash
cd python-200-steps
node server.js
```

起動するとターミナルにURLが表示されるので、ブラウザで開く（デフォルトは http://localhost:3948 ）。
ポートは環境変数PORTで変更できる。

```bash
PORT=8080 node server.js
```

## カリキュラム

| 章 | テーマ |
|----|--------|
| 1 | はじめてのPython |
| 2 | 数値と変数 |
| 3 | 文字列とf-string |
| 4 | リストとタプル |
| 5 | 辞書と集合 |
| 6 | 条件分岐 |
| 7 | ループ |
| 8 | 関数 |
| 9 | 内包表記とラムダ |
| 10 | 例外処理 |
| 11 | クラスの基礎 |
| 12 | クラスの応用 |
| 13 | イテレータとジェネレータ |
| 14 | デコレータとスコープ |
| 15 | 標準ライブラリ活用 |
| 16 | 文字列処理と正規表現 |
| 17 | 日付と時刻 |
| 18 | 型ヒント |
| 19 | dataclassとEnum |
| 20 | 総合演習 |
| 21 | よくあるエラー：名前と構文 |
| 22 | よくあるエラー：型と値 |
| 23 | よくあるエラー：コレクション |
| 24 | よくあるエラー：関数とクラス |
| 25 | よくあるエラー：論理と実践 |

## 教材の検証

```bash
node scripts/validate.js
node scripts/check-solutions.js
```

## デプロイ

Cloudflare Pagesへの直接アップロード方式（Node.js 22以上が必要）。

```bash
npx wrangler pages deploy public --project-name=python-200-steps
```

`functions/`配下のPages Functionsは自動的にバンドルされる。

## 構成

```
server.js              ローカル開発用サーバー（静的配信＋python3実行API）
functions/api/         本番用Pages Functions（Wandboxプロキシ）
public/
  index.html
  app.js               学習UI
  content/             教材データ（chapter01〜25.js、intro.js）
scripts/
  validate.js          教材の構造検証
  check-solutions.js   模範解答の実行検証
```
