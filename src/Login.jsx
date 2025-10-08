import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Login.css';

function Login({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.toLowerCase() === "bethel" && pass.toLowerCase() === "bbc") {
      localStorage.setItem("user", name);
      setIsLoggedIn(true);
      navigate("/dashboard"); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="main-text">Enter details to Login</div>
      <div className="login-box">
        <h2 className="login-text">Login</h2>
        <div className="line"></div>
        <div className="confirm">Confirm</div>
        <form className="form-box" onSubmit={handleSubmit}>
          <label id="name-label" htmlFor="username">Username</label>
          <input id="username" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label id="pass-label" htmlFor="password">Password</label>
          <input id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button id="submit" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
