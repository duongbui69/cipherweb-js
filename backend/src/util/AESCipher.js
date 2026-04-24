import crypto from "crypto";
function k(key) {
  return crypto
    .createHash("sha256")
    .update(String(key || "secret"))
    .digest();
}
export function aesEncrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const c = crypto.createCipheriv("aes-256-cbc", k(key), iv);
  return (
    iv.toString("base64") +
    ":" +
    Buffer.concat([c.update(text, "utf8"), c.final()]).toString("base64")
  );
}
export function aesDecrypt(data, key) {
  const [ivb, enc] = String(data).split(":");
  if (!ivb || !enc) throw new Error("AES decrypt cần dạng iv:ciphertext");
  const d = crypto.createDecipheriv(
    "aes-256-cbc",
    k(key),
    Buffer.from(ivb, "base64"),
  );
  return Buffer.concat([
    d.update(Buffer.from(enc, "base64")),
    d.final(),
  ]).toString("utf8");
}
