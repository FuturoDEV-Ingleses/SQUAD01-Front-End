import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logodev.svg";
import imgDashboard from "../../../assets/dashboard.svg";
import imgEstoque from "../../../assets/estoque.svg";
import imgSair from "../../../assets/sair.png";
import imgArmazem from "../../../assets/armazem.svg";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (pathname) => {
    return location.pathname === pathname ? "selected" : "";
  };

  const handleClick = (pathname) => {
    if (pathname === "/login") {
      // Remover o item "isLoggedIn" do localStorage
      localStorage.removeItem("isLoggedIn");
    }
    navigate(pathname);
  };

  return (
    <nav className="Navbar">
      <img className="logo" src={logo} alt="Logo" onClick={() => navigate("/dashboard")} />

      <button className={isSelected("/dashboard")} onClick={() => handleClick("/dashboard")}>
        <img src={imgDashboard} alt="Icone do Dashboard" />
        <span>Dashboard</span>
      </button>

      <button className={isSelected("/estoque")} onClick={() => handleClick("/estoque")}>
        <img src={imgEstoque} alt="Icone Estoque" />
        <span>Estoque</span>
      </button>

      <button className={isSelected("/armazem")} onClick={() => handleClick("/armazem")}>
        <img src={imgArmazem} alt="Icone de Armazem" />
        <span>Armazem</span>
      </button>

      <button className={isSelected("/login")} onClick={() => handleClick("/login")}>
        <img src={imgSair} alt="Icone Sair" />
        <span>Sair</span>
      </button>
    </nav>
  );
}
