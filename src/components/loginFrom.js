import React, { useEffect, useState } from "react";

import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from "../firebase";

const LoginForm = ({ isShowLogin, handleLoginClick }) => {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const register = () => {
        if (!name) alert("Please enter a name");
        return registerWithEmailAndPassword(name, email, password);
    };


  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
            {isLogin ? (
          <div>
            <h1 className="login-text">Sign In</h1>
            <label>Email</label>
            <br></br>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-box" />
            <br></br>
            <button onClick={() => {
              logInWithEmailAndPassword(email, password);
              handleLoginClick();
              }} className="login-btn">LOGIN</button>
            <br></br>
            <label className="register-login" >Don't have an account? <label className="bold" onClick={() => setIsLogin(false)}>Signup now</label></label>
          </div>
            ) : (
                <div>
                <h1 className="login-text">Registration</h1>
                <label>Email</label>
                <br></br>
                <input type="text" name="email" value={email} onChange= {(e) => setEmail(e.target.value)} className="login-box" />
                <br></br>
                <label>Username</label>
                <br></br>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="login-box" />
                <br></br>
                <label>Password</label>
                <br></br>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-box" />
                <br></br>
                <button onClick={()=>{
                  register();
                  handleLoginClick();
                }} className="login-btn">REGISTER</button>
                <br></br>
                <label className="register-login" >Already have an account? <label className="bold" onClick={() => setIsLogin(true)}>login now</label></label>
              </div>  
            )}

        </div>

      </div>
    </div>
  );
};

export default LoginForm;
