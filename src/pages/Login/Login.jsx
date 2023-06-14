import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from '../../assets/teste.png';
import imgDev from '../../assets/logodev.svg';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = (pathname) => {
    navigate(pathname);
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={imgLogin} alt="imagem fundo" />
      </div>
      <div className="form-container">
        <div className="form-body">

          <div className="form-header">
            <img src={imgDev} alt="imagem fundo" />
            <span>Seja bem vindo</span>
          </div>
          <form>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit" onClick={() => handleClick("/dashboard")}>Login</Button>
          </form>
          <p>
            Ainda não tem cadastro? <a href="#">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
