import { Router } from "express";
import { normalizeForm } from "../model/CryptoForm.js";
import { caesarEncrypt, caesarDecrypt } from "../util/CaesarCipher.js";
import { affineEncrypt, affineDecrypt } from "../util/AffineCipher.js";
import { vigenereEncrypt, vigenereDecrypt } from "../util/VigenereCipher.js";
import { monoEncrypt, monoDecrypt } from "../util/MonoalphabeticCipher.js";
import { rowEncrypt, rowDecrypt } from "../util/RowTranspositionCipher.js";
import { playfairEncrypt, playfairDecrypt } from "../util/PlayfairCipher.js";
import { hillEncrypt, hillDecrypt } from "../util/HillCipher.js";
import { aesEncrypt, aesDecrypt } from "../util/AESCipher.js";
import { desEncrypt, desDecrypt } from "../util/DESCipher.js";
import { rsaEncrypt, rsaDecrypt } from "../util/RSACipher.js";
const router = Router();
const run = {
  caesar: { encrypt: caesarEncrypt, decrypt: caesarDecrypt },
  affine: { encrypt: affineEncrypt, decrypt: affineDecrypt },
  vigenere: { encrypt: vigenereEncrypt, decrypt: vigenereDecrypt },
  monoalphabetic: { encrypt: monoEncrypt, decrypt: monoDecrypt },
  rowtransposition: { encrypt: rowEncrypt, decrypt: rowDecrypt },
  playfair: { encrypt: playfairEncrypt, decrypt: playfairDecrypt },
  hill: { encrypt: hillEncrypt, decrypt: hillDecrypt },
  aes: { encrypt: aesEncrypt, decrypt: aesDecrypt },
  des: { encrypt: desEncrypt, decrypt: desDecrypt },
  rsa: { encrypt: rsaEncrypt, decrypt: rsaDecrypt },
};
router.post("/", (req, res) => {
  try {
    const form = normalizeForm(req.body);
    const fn = run[form.algorithm]?.[form.mode];
    if (!fn)
      return res
        .status(400)
        .json({ error: "Thuật toán hoặc chế độ không hợp lệ" });
    const result = fn(form.text, form.key, form.extraKey);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
export default router;
