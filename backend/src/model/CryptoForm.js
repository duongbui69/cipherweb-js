export function normalizeForm(body) {
  return {
    algorithm: String(body.algorithm || "").toLowerCase(),
    mode: String(body.mode || "encrypt").toLowerCase(),
    text: String(body.text || ""),
    key: String(body.key || ""),
    extraKey: String(body.extraKey || ""),
  };
}
