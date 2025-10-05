import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = "https://750xq60j1d.execute-api.us-east-1.amazonaws.com"; // ←あなたのInvoke URL

export default function App() {
  const [name, setName] = useState("");
  const [traits, setTraits] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);     // ← 履歴

  // 生成
  async function generate() {
    try {
      setLoading(true);
      setMsg("生成中…");

      const traitsArr = traits.split(",").map(s => s.trim()).filter(Boolean);
      const inputText = traitsArr.length ? `${name}（${traitsArr.join("、")}）` : name;

      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: inputText })
      });
      const data = await res.json();
      setMsg(data.result ?? JSON.stringify(data));

      // 生成後に自動で履歴を最新化
      // await loadHistory(true);
    } catch (e) {
      setMsg(`Error: ${String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  // 履歴取得
  async function loadHistory(silent = false) {
    try {
      if (!silent) setMsg("履歴を読み込み中…");
      const res = await fetch(`${API_URL}/history`, { method: "GET" });
      if (!res.ok) {
        const text = await res.text();
        setMsg(`History Error: ${res.status} ${text}`);
        setItems([]);
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      if (!silent) setMsg(`履歴 ${data.items?.length ?? 0} 件`);
    } catch (e) {
      setItems([]);
      setMsg(`History Fetch Failed: ${String(e)}`);
    }
  }

  // 日付整形（ISO → ローカル）
  const fmt = (iso) => {
    try { return new Date(iso).toLocaleString(); } catch { return iso || ""; }
  };

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", lineHeight: 1.8 }}>
      <h1>AIキャッチコピーメーカー</h1>

      <label>名前</label>
      <input value={name} onChange={e => setName(e.target.value)} style={{ width: "100%" }} />
      <label>特徴（カンマ区切り）</label>
      <input value={traits} onChange={e => setTraits(e.target.value)} style={{ width: "100%" }} />

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={generate} disabled={loading}>生成</button>
        <button onClick={() => loadHistory()} disabled={loading}>履歴を読み込む</button>
      </div>

      {/* 結果メッセージ */}
      {msg && (
        <p style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{String(msg).trim()}</p>
      )}

      {/* 履歴一覧 */}
      {items.length > 0 && (
        <>
          <h2 style={{ marginTop: 24 }}>履歴</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {items.map(item => (
              <div key={item.id}
                   style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{fmt(item.created_at)}</div>
                <div><strong>入力:</strong> {item.input_text}</div>
                <div><strong>結果:</strong> {item.output_text}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {items.length === 0 && (
        <p style={{ color: "#6b7280", marginTop: 16 }}>履歴はまだありません。</p>
      )}
    </div>
  );
}

// export default function App() {
//   const [name, setName] = useState("");
//   const [traits, setTraits] = useState(""); // カンマ区切り入力
//   const [msg, setMsg] = useState("");

//   async function generate() {
//     setMsg("生成中…");
//     const res = await fetch("https://750xq60j1d.execute-api.us-east-1.amazonaws.com/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         traits: traits.split(",").map(s => s.trim()).filter(Boolean)
//       })
//     });
//     const data = await res.json();
//     setMsg(data.copy || JSON.stringify(data));
//   }

//   return (
//     <div style={{maxWidth:480, margin:"40px auto", lineHeight:1.8}}>
//       <h1>AIキャッチコピーメーカー</h1>
//       <label>名前</label>
//       <input value={name} onChange={e=>setName(e.target.value)} style={{width:"100%"}} />
//       <label>特徴（カンマ区切り）</label>
//       <input value={traits} onChange={e=>setTraits(e.target.value)} style={{width:"100%"}} />
//       <button onClick={generate} style={{marginTop:12}}>生成</button>
//       <p style={{marginTop:16, whiteSpace:"pre-wrap"}}>{msg}</p>
//     </div>
//   );
// }

// function App() {
//   const [msg, setMsg] = useState("");

//   async function callBedrock() {
//     try {
//       const res = await fetch("https://750xq60j1d.execute-api.us-east-1.amazonaws.com/generate", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           name: "山田太郎",
//           traits: ["盛り上げ役", "カラオケ好き"]
//         })
//       });
//       const data = await res.json();
//       setMsg(data.copy || JSON.stringify(data));
//     } catch (e) {
//       setMsg("Error: " + e);
//     }
//   }

//   return (
//     <>
//       {/* 既存のVite+Reactの表示はそのままでOK */}
//       <button onClick={callBedrock} style={{marginTop:16}}>Bedrockで生成</button>
//       <p>Result: {msg}</p>
//     </>
//   );
// }

// function App() {
//   const [msg, setMsg] = useState("まだ呼んでない");

//   async function callPost() {
//     const res = await fetch("https://za12cl7u0b.execute-api.ap-southeast-2.amazonaws.com/hello", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: "JUN" })
//     });
//     const data = await res.json();
//     setMsg(data.echo || JSON.stringify(data));
//   }

//   return (
//     <>
//       <h1>API Test</h1>
//       <button onClick={callPost}>POSTで呼ぶ</button>
//       <p>Response: {msg}</p>
//     </>
//   );
// }

// function App() {
//   const [count, setCount] = useState(0)
//   const [msg, setMsg] = useState("loading...")

//   useEffect(() => {
//     fetch("https://za12cl7u0b.execute-api.ap-southeast-2.amazonaws.com/hello") // 👈 API GatewayのInvoke URL + パス
//     .then(res => res.json())
//     .then(data => setMsg(`${data.message}`))
//     .catch(err => setMsg("Error: " + err));
//   }, [])

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//       {/* 👇 Lambdaから返ってきたメッセージを表示 */}
//       <p style={{ marginTop: "20px", color: "green" }}>
//         API Response: {msg}
//       </p>
//     </>
//   )
// }



// export default App
