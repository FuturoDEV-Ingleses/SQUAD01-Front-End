import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from "../../assets/teste.png";
import imgDev from "../../assets/logodev.svg";
import { Link } from "react-router-dom";
import { postData } from "../../service/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
  
    if (!email.value || !password.value) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await postData("api/login", {
        email: email.value,
        senha: password.value,
      });
  
      if (response) {
        // Autenticação bem-sucedida, redirecionar para a página "/dashboard"
        navigate("/dashboard");
      } else {
        // Autenticação falhou, exibir mensagem de erro
        setErrorMessage("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setErrorMessage("Ocorreu um erro ao processar a solicitação.");
    }
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
          <form className="form-login" onSubmit={handleSubmit}>
            <input className="custom-input" type="email" placeholder="Email" name="email" />
            <input className="custom-input" type="password" placeholder="Senha" name="password" />
            <button className="custom-button" type="submit">Entrar</button>
          </form>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          <p>
            Ainda não tem cadastro? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
