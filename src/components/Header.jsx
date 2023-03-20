import React from "react";
import logo from "./logo.jpg"; 

function Header() {
  return (
    <div>
      <img class="scale-50" src={logo} alt="My Logo" />
    </div>
  );
}

export default Header;