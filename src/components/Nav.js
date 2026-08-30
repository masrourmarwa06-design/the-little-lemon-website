import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list container">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/#about">About</a>
        </li>
        <li>
          <a href="/#menu">Menu</a>
        </li>
        <li>
          <Link to="/booking">Reservations</Link>
        </li>
        <li>
          <a href="/#order-online">Order Online</a>
        </li>
        <li>
          <a href="/#login">Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
