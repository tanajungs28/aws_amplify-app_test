import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [msg, setMsg] = useState("");

  async function callBedrock() {
    try {
      const res = await fetch("https://750xq60j1d.execute-api.us-east-1.amazonaws.com/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: "山田太郎",
          traits: ["盛り上げ役", "カラオケ好き"]
        })
      });
      const data = await res.json();
      setMsg(data.copy || JSON.stringify(data));
    } catch (e) {
      setMsg("Error: " + e);
    }
  }

  return (
    <>
      {/* 既存のVite+Reactの表示はそのままでOK */}
      <button onClick={callBedrock} style={{marginTop:16}}>Bedrockで生成</button>
      <p>Result: {msg}</p>
    </>
  );
}

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



export default App
