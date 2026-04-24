import { cleanLetters } from "./common.js";
function square(key) {
  const s = [
    ...new Set(
      cleanLetters(key + "ABCDEFGHIKLMNOPQRSTUVWXYZ").replace(/J/g, "I"),
    ),
  ];
  return s.slice(0, 25);
}
function pos(s, ch) {
  const i = s.indexOf(ch === "J" ? "I" : ch);
  return [Math.floor(i / 5), i % 5];
}
function pairs(text) {
  let t = cleanLetters(text).replace(/J/g, "I"),
    a = [];
  for (let i = 0; i < t.length; i++) {
    let x = t[i],
      y = t[i + 1] || "X";
    if (x === y) {
      a.push([x, "X"]);
    } else {
      a.push([x, y]);
      i++;
    }
  }
  return a;
}
function run(text, key, dec) {
  const s = square(key);
  return pairs(text)
    .map(([x, y]) => {
      let [r1, c1] = pos(s, x),
        [r2, c2] = pos(s, y),
        d = dec ? -1 : 1;
      if (r1 === r2) {
        c1 = (c1 + d + 5) % 5;
        c2 = (c2 + d + 5) % 5;
      } else if (c1 === c2) {
        r1 = (r1 + d + 5) % 5;
        r2 = (r2 + d + 5) % 5;
      } else {
        [c1, c2] = [c2, c1];
      }
      return s[r1 * 5 + c1] + s[r2 * 5 + c2];
    })
    .join("");
}
export const playfairEncrypt = (t, k) => run(t, k || "KEYWORD", false);
export const playfairDecrypt = (t, k) => run(t, k || "KEYWORD", true);
