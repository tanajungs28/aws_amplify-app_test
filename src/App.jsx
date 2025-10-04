import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("loading...")

  useEffect(() => {
    fetch("https://za12cl7u0b.execute-api.ap-southeast-2.amazonaws.com/hello") // 👈 API GatewayのInvoke URL + パス
      .then(res => res.text())
      .then(setMsg)
      .catch(err => setMsg("Error: " + err))
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* 👇 Lambdaから返ってきたメッセージを表示 */}
      <p style={{ marginTop: "20px", color: "green" }}>
        API Response: {msg}
      </p>
    </>
  )
}

export default App
