function order(key) {
  key = String(key || "4312567");
  return [...key]
    .map((c, i) => ({ c, i }))
    .sort((a, b) => a.c.localeCompare(b.c) || a.i - b.i)
    .map((x) => x.i);
}
export function rowEncrypt(text, key) {
  const ord = order(key),
    cols = ord.length,
    rows = Math.ceil(text.length / cols);
  const pad = text.padEnd(rows * cols, "X");
  let out = "";
  for (const c of ord) for (let r = 0; r < rows; r++) out += pad[r * cols + c];
  return out;
}
export function rowDecrypt(text, key) {
  const ord = order(key),
    cols = ord.length,
    rows = Math.ceil(text.length / cols);
  const grid = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(""));
  let p = 0;
  for (const c of ord)
    for (let r = 0; r < rows; r++) grid[r][c] = text[p++] || "";
  return grid
    .map((r) => r.join(""))
    .join("")
    .replace(/X+$/, "");
}
