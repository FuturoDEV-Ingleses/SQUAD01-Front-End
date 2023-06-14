import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from "../../assets/cadastro2.jpeg";
import imgDev from "../../assets/logodev.svg";
import "./Cadastro.css";

const Cadastro = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para processar o formulário de login

    // Redirecionar para a página "/dashboard"
    navigate("/dashboard");
  };

  return (
    <div className="cadastro-container">
      <div className="image-container">
        <img src={imgLogin} alt="imagem fundo" />
      </div>
      <div className="form-container">
        <div className="form-body">
          <div className="form-header">
            <img src={imgDev} alt="imagem fundo" />
            <span>Cadastro</span>
          </div>
          <form onSubmit={handleSubmit}>
            <Input type="nome" placeholder="Nome" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit" onClick={handleSubmit}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
