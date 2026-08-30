import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header container">
      <img
        src="/logo.png"
        alt="Little Lemon logo"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
