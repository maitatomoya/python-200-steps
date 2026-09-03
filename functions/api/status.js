/**
 * Cloudflare Pages Function：実行バックエンドの情報
 */
export function onRequestGet() {
  return new Response(
    JSON.stringify({ backend: "wandbox", pythonVersion: "Python 3.14.0" }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
