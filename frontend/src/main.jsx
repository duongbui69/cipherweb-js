import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
const algs = [
  "caesar",
  "affine",
  "vigenere",
  "monoalphabetic",
  "rowtransposition",
  "playfair",
  "hill",
  "aes",
  "des",
  "rsa",
];
function hint(a, m) {
  const h = {
    caesar: "3",
    affine: "5,8",
    vigenere: "KEY",
    monoalphabetic: "QWERTYUIOPASDFGHJKLZXCVBNM",
    rowtransposition: "4312567",
    playfair: "KEYWORD",
    hill: "3,3,2,5",
    aes: "secret",
    des: "secret",
    rsa: m === "encrypt" ? "3233,17" : "3233,2753",
  };
  return h[a];
}
function App() {
  const [algorithm, setAlgorithm] = useState("caesar"),
    [mode, setMode] = useState("encrypt"),
    [text, setText] = useState("HELLO"),
    [key, setKey] = useState("3"),
    [result, setResult] = useState(""),
    [err, setErr] = useState("");
  const changeAlg = (a) => {
    setAlgorithm(a);
    setKey(hint(a, mode));
  };
  const changeMode = (m) => {
    setMode(m);
    setKey(hint(algorithm, m));
  };
  async function submit(e) {
    e.preventDefault();
    setErr("");
    setResult("");
    const res = await fetch(API + "/api/crypto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ algorithm, mode, text, key }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Lỗi");
    else setResult(data.result);
  }
  return (
    <div className="wrap">
      <h1>CipherWeb JS</h1>
      <p>React + Node.js Express</p>
      <form onSubmit={submit} className="card">
        <label>Thuật toán</label>
        <select value={algorithm} onChange={(e) => changeAlg(e.target.value)}>
          {algs.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <label>Chế độ</label>
        <select value={mode} onChange={(e) => changeMode(e.target.value)}>
          <option value="encrypt">Mã hóa</option>
          <option value="decrypt">Giải mã</option>
        </select>
        <label>Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
        />
        <label>Key</label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={hint(algorithm, mode)}
        />
        <button>Thực hiện</button>
      </form>
      {err && <div className="err">{err}</div>}
      <h2>Kết quả</h2>
      <textarea readOnly value={result} rows="6" />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
