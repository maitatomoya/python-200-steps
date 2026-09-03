/**
 * 模範解答の実行検証スクリプト
 *
 * 全ステップのsolutionをローカルのpython3で実際に実行し、
 * expectedOutputが標準出力に含まれるかを検証する。
 *
 * content未生成の章（chapterNN.jsが存在しない章）はスキップして動作する。
 *
 * 使い方：
 *   node scripts/check-solutions.js            # 存在する全ステップ
 *   node scripts/check-solutions.js 41 60      # ステップ41〜60のみ
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const CONTENT_DIR = path.join(__dirname, "..", "public", "content");
const chapters = [];
global.registerChapter = (ch) => chapters.push(ch);
global.window = { PYTHON_TUTOR_CHAPTERS: chapters };

// 存在するchapterNN.jsのみ読み込む（未生成の章はスキップ）
const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => /^chapter\d{2}\.js$/.test(f))
  .sort();
for (const f of files) {
  try {
    require(path.join(CONTENT_DIR, f));
  } catch (e) {
    console.error(`${f}: 読み込みエラー: ${e.message}`);
    process.exit(1);
  }
}

const steps = chapters
  .flatMap((c) => c.steps || [])
  .sort((a, b) => a.id - b.id);

if (steps.length === 0) {
  console.log("検証対象の章ファイルがありません（public/content/chapterNN.js未生成）。スキップして終了します。");
  process.exit(0);
}

const from = Number(process.argv[2] || 1);
const to = Number(process.argv[3] || Number.MAX_SAFE_INTEGER);
const targets = steps.filter((s) => s.id >= from && s.id <= to);

const pyCheck = spawnSync("python3", ["--version"], { encoding: "utf8" });
if (pyCheck.status !== 0) {
  console.error("python3が見つかりません。Python 3をインストールしてください。");
  process.exit(1);
}
const PYTHON_VERSION = (pyCheck.stdout || pyCheck.stderr).trim();

function runLocal(code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "python-check-"));
  try {
    const src = path.join(dir, "main.py");
    fs.writeFileSync(src, code, "utf8");
    const r = spawnSync("python3", [src], {
      encoding: "utf8",
      timeout: 8000,
      cwd: dir,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });
    const timedOut =
      r.error && (r.error.code === "ETIMEDOUT" || r.signal === "SIGTERM");
    return {
      success: !timedOut && r.status === 0,
      stdout: r.stdout || "",
      stderr: timedOut ? "タイムアウト（8秒）" : r.stderr || "",
    };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

console.log(
  `検証対象: ${targets.length}件（読み込んだ章: ${chapters.length}） バックエンド: ${PYTHON_VERSION}`
);
const failures = [];

for (const s of targets) {
  const result = runLocal(s.solution);

  if (!result.success) {
    failures.push({
      id: s.id,
      title: s.title,
      reason: "実行失敗",
      detail: (result.stderr || "").slice(0, 1500),
    });
    console.log(`  ${s.id}: 失敗（実行エラー）`);
  } else if (
    s.expectedOutput != null &&
    s.expectedOutput !== "" &&
    !result.stdout.includes(s.expectedOutput)
  ) {
    failures.push({
      id: s.id,
      title: s.title,
      reason: "expectedOutput不一致",
      detail:
        "期待: " + JSON.stringify(s.expectedOutput) +
        "\n実際: " + JSON.stringify(result.stdout.slice(0, 500)),
    });
    console.log(`  ${s.id}: 失敗（期待出力の不一致）`);
  } else {
    console.log(`  ${s.id}: OK`);
  }
}

console.log("");
if (failures.length === 0) {
  console.log("全件OK");
} else {
  console.log(`失敗: ${failures.length}件`);
  for (const f of failures) {
    console.log(`\n--- ステップ${f.id}: ${f.title}（${f.reason}）---`);
    if (f.detail) console.log(f.detail);
  }
  process.exit(1);
}
