import "./Navbar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logoDevin.jpeg";
// import login from "../../../assets/login.jpg";
// import cadastro from "../../../assets/cadastro.webp";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (pathname) => {
    return location.pathname === pathname ? "selected" : "";
  };

  const handleClick = (pathname) => {
    navigate(pathname);
  };

  return (
    <nav className="Navbar">
      <img src={logo} alt="" onClick={() => navigate("/")} />

      <button className={isSelected("/")} onClick={() => handleClick("/")}>
        {/* <img src={login} alt="login" /> */}
      </button>
      {/* outros botões */}
    </nav>
  );
}
