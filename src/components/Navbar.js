import { React, useState } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/Nheza-Logo.png";
import RegisterButton from "../components/RegisterButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

function Navbar() {
  const [state, updateState] = useState(false);
  return (
    <div className="navbar">
      <img src={Logo} className="logo"></img>
      <ul className={state === false ? "menu-list" : "menu-list-dropdown"}>
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <li>About</li>
        <li>Membership</li>
        <li>Process</li>
        <li>Contact</li>
      </ul>
      <RegisterButton styleVariant="btn-navbar" path="/Register" />
      <GiHamburgerMenu
        className="dropdown-menu"
        onClick={() => updateState(!state)}
      />
    </div>
  );
}

export default Navbar;
