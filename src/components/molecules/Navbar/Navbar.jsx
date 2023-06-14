import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logodev.svg";
import imgDashboard from "../../../assets/dashboard.svg";
import imgEstoque from "../../../assets/estoque.svg";
import imgSair from "../../../assets/sai2.png";
import imgArmazem from "../../../assets/armazem.svg";
import "./Navbar.css";

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
      <img src={logo} alt="Solar Energia Logo" onClick={() => navigate("/")} />

      <button className={isSelected("/")} onClick={() => handleClick("/")}>
        <img src={imgDashboard} alt="Icone do Dashboard" />
        <span>Dashboard</span>
      </button>

      <button
        className={isSelected("/unidades-consulmidora")}
        onClick={() => handleClick("/unidades-consulmidora")}
      >
        <img src={imgEstoque} alt="Icone da Unidade Consumidora" />
        <span>Estoque</span>
      </button>

      <button
        className={isSelected("/cadastro-energia-gerada")}
        onClick={() => handleClick("/cadastro-energia-gerada")}
      >
        <img src={imgArmazem} alt="Icone de Cadastro de Energia Gerada" />
        <span>Armazem</span>
      </button>

      <button className={isSelected("/login")}
        onClick={() => handleClick("/login")}>
        <img src={imgSair} alt="Icone Sair" />
        <span>Sair</span>
      </button>
    </nav>
  );
}