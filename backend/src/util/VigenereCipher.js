import { shiftChar } from "./common.js";
function run(text, key, sign) {
  key = String(key || "KEY")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();
  if (!key) throw new Error("Key Vigenere không được rỗng");
  let i = 0;
  return [...text]
    .map((c) => {
      if (!/[a-zA-Z]/.test(c)) return c;
      const s = (key.charCodeAt(i++ % key.length) - 65) * sign;
      return shiftChar(c, s);
    })
    .join("");
}
export const vigenereEncrypt = (t, k) => run(t, k, 1);
export const vigenereDecrypt = (t, k) => run(t, k, -1);
