import crypto from "crypto";
function k(key) {
  return crypto
    .createHash("md5")
    .update(String(key || "secret"))
    .digest()
    .subarray(0, 8);
}
export function desEncrypt(text, key) {
  const iv = crypto.randomBytes(8);
  const c = crypto.createCipheriv(
    "des-ede-cbc",
    Buffer.concat([k(key), k(key)]),
    iv,
  );
  return (
    iv.toString("base64") +
    ":" +
    Buffer.concat([c.update(text, "utf8"), c.final()]).toString("base64")
  );
}
export function desDecrypt(data, key) {
  const [ivb, enc] = String(data).split(":");
  if (!ivb || !enc) throw new Error("DES decrypt cần dạng iv:ciphertext");
  const d = crypto.createDecipheriv(
    "des-ede-cbc",
    Buffer.concat([k(key), k(key)]),
    Buffer.from(ivb, "base64"),
  );
  return Buffer.concat([
    d.update(Buffer.from(enc, "base64")),
    d.final(),
  ]).toString("utf8");
}
