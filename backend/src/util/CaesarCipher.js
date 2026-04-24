import { shiftChar } from "./common.js";
export function caesarEncrypt(text, key = "3") {
  const k = parseInt(key || "3");
  return [...text].map((c) => shiftChar(c, k)).join("");
}
export function caesarDecrypt(text, key = "3") {
  const k = parseInt(key || "3");
  return [...text].map((c) => shiftChar(c, -k)).join("");
}
