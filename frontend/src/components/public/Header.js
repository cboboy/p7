import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

import "./header.css";

const Header = () => {
  return (
    <header>
      <a href="./">
        <img src={logo} alt="Groupomania" className="logo" />
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/allusers">allUsers</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
