// Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import imgLogin from "../../assets/cadastro2.jpeg";
import imgDev from "../../assets/logodev.svg";
import "./Cadastro.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nome, email, senha } = event.target.elements;

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.value,
          email: email.value,
          senha: senha.value,
        }),
      });

      if (response.ok) {
        // Cadastro bem-sucedido, redirecionar para a página de login
        navigate("/login");
      } else {
        // Cadastro falhou, exibir mensagem de erro
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setErrorMessage("Ocorreu um erro ao processar a solicitação.");
    }
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
          <form className="form-cadastro" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Nome" name="nome" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Senha" name="senha" />
            <Button type="submit">Cadastrar</Button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
