import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogin from "../../assets/teste.png";
import imgDev from "../../assets/logodev.svg";
import { Link } from "react-router-dom";
import { postData } from "../../service/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true }); // Redireciona para a página de dashboard
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    if (!email.value || !password.value) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true); // Exibe o loader durante o redirecionamento

      const response = await postData("api/login", {
        email: email.value,
        senha: password.value,
      });

      if (response) {
        localStorage.setItem("isLoggedIn", true); // Define o status de login como true no localStorage

        console.log("Redirecionando para /dashboard");
        handleReload();
      } else {
        setErrorMessage("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setErrorMessage("Ocorreu um erro ao processar a solicitação.");
    } finally {
      setIsLoading(false); // Oculta o loader após o redirecionamento
    }
  };

  const handleReload = () => {
    window.location.reload(); // Recarrega a página
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
            <span>Seja bem-vindo</span>
          </div>
          <form className="form-login" onSubmit={handleSubmit}>
            <input className="custom-input" type="email" placeholder="Email" name="email" />
            <input className="custom-input" type="password" placeholder="Senha" name="password" />
            <button className="custom-button" type="submit" disabled={isLoading}>
              {isLoading ? "Aguarde..." : "Entrar"}
            </button>
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
