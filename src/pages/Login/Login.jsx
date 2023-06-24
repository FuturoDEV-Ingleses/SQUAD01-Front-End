import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from "../../assets/teste.png";
import imgDev from "../../assets/logodev.svg";
import { Link } from "react-router-dom";
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      if (response.ok) {
        // Autenticação bem-sucedida, redirecionar para a página "/dashboard"
        navigate("/dashboard");
      } else {
        // Autenticação falhou, exibir mensagem de erro
        const errorData = await response.json();
        setErrorMessage(errorData.message);
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
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Senha" name="password" />
            <Button type="submit">Entrar</Button>
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
