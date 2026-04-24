function modPow(b, e, m) {
  b = BigInt(b);
  e = BigInt(e);
  m = BigInt(m);
  let r = 1n;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return r;
}
export function rsaEncrypt(text, key = "3233,17") {
  const [n, e] = key.split(/[ ,;:-]+/).map(BigInt);
  return [...text]
    .map((ch) => modPow(ch.charCodeAt(0), e, n).toString())
    .join(" ");
}
export function rsaDecrypt(text, key = "3233,2753") {
  const [n, d] = key.split(/[ ,;:-]+/).map(BigInt);
  return text
    .trim()
    .split(/\s+/)
    .map((x) => String.fromCharCode(Number(modPow(x, d, n))))
    .join("");
}
