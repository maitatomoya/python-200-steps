/**
 * Cloudflare Pages Function：Pythonコード実行API
 *
 * ローカル開発時のserver.jsと同じインターフェースで、
 * Wandbox APIへサーバーサイドからプロキシする。
 * 教材のエラーメッセージはPython 3.14の実出力に合わせて書かれているため、
 * 処理系はcpython-3.14.0に固定する。
 */
const MAX_CODE_BYTES = 64 * 1024;
const WANDBOX_COMPILER = "cpython-3.14.0";

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context) {
  let code;
  try {
    const body = await context.request.json();
    code = body.code;
  } catch {
    return json({ error: "リクエストの形式が不正です。" }, 400);
  }
  if (typeof code !== "string" || code.trim() === "") {
    return json({ error: "コードが空です。" }, 400);
  }
  if (code.length > MAX_CODE_BYTES) {
    return json({ error: "コードが大きすぎます（上限64KB）。" }, 413);
  }

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler: WANDBOX_COMPILER, code }),
    });
    if (!res.ok) {
      return json(
        { error: "実行サービスが混み合っています。少し待って再実行してください。" },
        502
      );
    }
    const data = await res.json();
    // Pythonはインタープリタ実行なので、構文エラーも実行時エラーもprogram_errorに入る
    return json({
      success: data.status === "0" || data.status === 0,
      compiler: data.compiler_error || "",
      stdout: data.program_output || "",
      stderr: data.program_error || "",
      backend: "wandbox",
    });
  } catch (e) {
    return json(
      { error: "実行サービスに接続できませんでした。", detail: String(e && e.message ? e.message : e) },
      502
    );
  }
}
