export const A = 65,
  Z = 90,
  a = 97,
  z = 122;
export function mod(n, m) {
  return ((n % m) + m) % m;
}
export function shiftChar(ch, s) {
  const c = ch.charCodeAt(0);
  if (c >= A && c <= Z) return String.fromCharCode(A + mod(c - A + s, 26));
  if (c >= a && c <= z) return String.fromCharCode(a + mod(c - a + s, 26));
  return ch;
}
export function cleanLetters(s) {
  return String(s)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}
export function egcd(a, b) {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = egcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}
export function invMod(n, m) {
  const [g, x] = egcd(mod(n, m), m);
  if (g !== 1) throw new Error(`${n} không có nghịch đảo mod ${m}`);
  return mod(x, m);
}
