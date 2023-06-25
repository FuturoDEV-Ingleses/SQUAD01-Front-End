import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import imgLogin from "../../assets/cadastro2.jpeg";
import imgDev from "../../assets/logodev.svg";
import { cadastrarUsuario } from "../../service/api";
import "./Cadastro.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = {
      nome,
      email,
      senha,
    };

    try {
      const response = await cadastrarUsuario(usuario);

      if (response.success) {
        navigate("/login");
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setErrorMessage("Ocorreu um erro ao processar a solicitação.");
    }
    console.log(usuario)
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
            <input
            className="custom-input"

              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)} required
            />
            <input
            className="custom-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)} required
            />
            <input
            className="custom-input"

              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)} required
            />
            <button className="custom-button" type="submit">Cadastrar</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
