import React from "react";
import logo from "../images/logo.svg"; 

function Header() {
  return (
    <div id="header">
      <img src={logo} alt="My Logo" />
    </div>
  );
}

export default Header;