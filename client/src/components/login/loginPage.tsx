import { useState } from "react";
import Login from "./login";
import Register from "./register";

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ?
        <Login setShowLogin={setShowLogin}/> :
        <Register setShowLogin={setShowLogin}/>
      }
    </>
  )
}

export default LoginPage;