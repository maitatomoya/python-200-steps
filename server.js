/**
 * Python 200 Steps 開発サーバー
 *
 * 依存パッケージゼロ（Node標準ライブラリのみ）で動作する。
 * - public/ 配下の静的ファイル配信
 * - POST /api/run：Pythonコードの実行
 *   - ローカルのpython3で一時ディレクトリのmain.pyを実行する
 *   - Pythonはコンパイル工程がないため、レスポンスのcompilerは常に空文字
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3948;
const PUBLIC_DIR = path.join(__dirname, "public");
const MAX_CODE_BYTES = 64 * 1024;
const RUN_TIMEOUT_MS = 8000;

// 起動時に一度だけローカルpython3の有無を判定する
const pyCheck = spawnSync("python3", ["--version"], { encoding: "utf8" });
const HAS_PYTHON = pyCheck.status === 0;
const PYTHON_VERSION = HAS_PYTHON
  ? (pyCheck.stdout || pyCheck.stderr).trim()
  : null;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".wasm": "application/wasm",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

/** ローカルのpython3で実行する */
function runWithLocalPython(code) {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "python-tutor-"));
  const srcPath = path.join(workDir, "main.py");
  try {
    fs.writeFileSync(srcPath, code, "utf8");

    const run = spawnSync("python3", [srcPath], {
      encoding: "utf8",
      timeout: RUN_TIMEOUT_MS,
      cwd: workDir,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });
    const timedOut =
      run.error && (run.error.code === "ETIMEDOUT" || run.signal === "SIGTERM");
    return {
      success: !timedOut && run.status === 0,
      compiler: "",
      stdout: run.stdout || "",
      stderr: timedOut
        ? "実行がタイムアウトしました（8秒）。無限ループがないか確認してください。"
        : run.stderr || "",
      backend: "local",
    };
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (urlPath === "/") urlPath = "/index.html";

  // ディレクトリトラバーサル対策：public配下に正規化されるパスのみ許可
  const filePath = path.normalize(path.join(PUBLIC_DIR, urlPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/status") {
    sendJson(res, 200, {
      backend: "local",
      pythonVersion: PYTHON_VERSION,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/run") {
    let body = "";
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_CODE_BYTES) {
        sendJson(res, 413, { error: "コードが大きすぎます（上限64KB）。" });
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => {
      let code;
      try {
        code = JSON.parse(body).code;
      } catch {
        sendJson(res, 400, { error: "リクエストの形式が不正です。" });
        return;
      }
      if (typeof code !== "string" || code.trim() === "") {
        sendJson(res, 400, { error: "コードが空です。" });
        return;
      }
      if (!HAS_PYTHON) {
        sendJson(res, 503, {
          error:
            "python3が見つかりません。Python 3をインストールしてからサーバーを再起動してください。",
        });
        return;
      }
      try {
        sendJson(res, 200, runWithLocalPython(code));
      } catch (e) {
        sendJson(res, 500, {
          error: "コードの実行中にサーバー内部でエラーが発生しました。",
          detail: String(e && e.message ? e.message : e),
        });
      }
    });
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method Not Allowed");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Python 200 Steps: http://localhost:" + PORT);
  if (HAS_PYTHON) {
    console.log("実行バックエンド: ローカルpython3（" + PYTHON_VERSION + "）");
  } else {
    console.warn(
      "警告: python3が見つかりません。/api/runは利用できません。Python 3をインストールしてください。"
    );
  }
});
