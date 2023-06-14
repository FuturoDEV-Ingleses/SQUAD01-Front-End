import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from "../../assets/teste.png";
import imgDev from "../../assets/logodev.svg";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para processar o formulário de login

    // Redirecionar para a página "/dashboard"
    navigate("/dashboard");
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
          <form onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit" onClick={handleSubmit}>
              Entrar
            </Button>
          </form>
          <p>
            Ainda não tem cadastro? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
