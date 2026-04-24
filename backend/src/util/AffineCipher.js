import { mod, invMod } from "./common.js";
function parseKey(key) {
  const [aa, bb] = String(key || "5,8")
    .split(/[ ,;:-]+/)
    .map(Number);
  if (!aa && aa !== 0) throw new Error("Key Affine dạng: a,b ví dụ 5,8");
  return [aa, bb || 0];
}
function trans(text, key, dec = false) {
  const [A, B] = parseKey(key);
  const inv = dec ? invMod(A, 26) : null;
  return [...text]
    .map((ch) => {
      let c = ch.charCodeAt(0),
        base = c >= 97 ? 97 : 65;
      if (!/[a-zA-Z]/.test(ch)) return ch;
      let x = c - base;
      let y = dec ? mod(inv * (x - B), 26) : mod(A * x + B, 26);
      return String.fromCharCode(base + y);
    })
    .join("");
}
export const affineEncrypt = (t, k) => trans(t, k, false);
export const affineDecrypt = (t, k) => trans(t, k, true);
