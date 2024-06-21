import { useState } from "react"
import Login from "./components/Login"
import Home from "./components/Home"

function App() {
  const [onLoginPage, setOnLoginPage] = useState(true)
  const [loginData, setLoginData] = useState({ videoURL: "", userName: "" })



  return (
    <>
      {onLoginPage ? (
        <Login
          setLoginData={setLoginData}
          loginData={loginData}
          setOnLoginPage={setOnLoginPage}
        />
      ) : (
        <Home loginData={loginData} />
      )}
    </>
  )
}

export default App
