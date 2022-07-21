import React, { useState } from "react";

import "./signup.css";

const Signup = () => {
  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    showPopup("login_popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  return (
    <div className="page">
      <div className="card_login">
        <h1>Inscription</h1>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div className="login_btn" onClick={popup}>
          Enregistrer
        </div>
      </div>
      <div className={popupStyle}>
        <h3>Inscription échoué</h3>
        <p>Email ou password incorrect</p>
      </div>
    </div>
  );
};

export default Signup;
