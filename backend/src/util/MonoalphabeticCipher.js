const AL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function mapKey(key) {
  key = String(key || "QWERTYUIOPASDFGHJKLZXCVBNM")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  if (key.length !== 26 || new Set(key).size !== 26)
    throw new Error("Key Monoalphabetic phải đủ 26 chữ cái không trùng");
  return key;
}
function run(text, key, dec) {
  const k = mapKey(key);
  return [...text]
    .map((ch) => {
      const up = ch.toUpperCase();
      const idx = dec ? k.indexOf(up) : AL.indexOf(up);
      if (idx < 0) return ch;
      const out = dec ? AL[idx] : k[idx];
      return ch === up ? out : out.toLowerCase();
    })
    .join("");
}
export const monoEncrypt = (t, k) => run(t, k, false);
export const monoDecrypt = (t, k) => run(t, k, true);
