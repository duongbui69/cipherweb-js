import { cleanLetters, mod, invMod } from "./common.js";
function keyM(key) {
  const nums = String(key || "3,3,2,5")
    .split(/[ ,;:-]+/)
    .map(Number);
  if (nums.length !== 4) throw new Error("Key Hill 2x2 dạng: 3,3,2,5");
  return nums;
}
export function hillEncrypt(text, key) {
  const [a, b, c, d] = keyM(key);
  let t = cleanLetters(text);
  if (t.length % 2) t += "X";
  let out = "";
  for (let i = 0; i < t.length; i += 2) {
    const x = t.charCodeAt(i) - 65,
      y = t.charCodeAt(i + 1) - 65;
    out += String.fromCharCode(
      65 + mod(a * x + b * y, 26),
      65 + mod(c * x + d * y, 26),
    );
  }
  return out;
}
export function hillDecrypt(text, key) {
  const [a, b, c, d] = keyM(key);
  const det = mod(a * d - b * c, 26),
    inv = invMod(det, 26);
  const ia = mod(d * inv, 26),
    ib = mod(-b * inv, 26),
    ic = mod(-c * inv, 26),
    id = mod(a * inv, 26);
  return hillEncrypt(text, `${ia},${ib},${ic},${id}`);
}
