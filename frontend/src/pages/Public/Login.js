import React, { useState } from "react";
import axios from "axios";

import "./login.css";

const Login = () => {
  const [userPwd, setUserPwd] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      withCredentials: false,
      data: {
        email: userEmail,
        password: userPwd,
      },
    })
      .then((resultat) => {
        console.log("resultat", resultat.data.access_token);
      })
      .catch((err) => {
        showPopup("login_popup");
        console.log(err);
      });
    // showPopup("login_popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  return (
    <div className="page">
      <div className="card_login">
        <h1>Connexion</h1>
        <input
          id="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPwd(e.target.value)}
          value={userPwd}
          required
        />
        <div className="login_btn" onClick={popup}>
          connexion
        </div>
      </div>
      <div className={popupStyle}>
        <h3>Connexion échoué</h3>
        <p>Email ou password incorrect</p>
      </div>
    </div>
  );
};
export default Login;
