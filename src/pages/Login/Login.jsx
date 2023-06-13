import React from "react";
import Button from "../../../src/components/atoms/Button/Button";
import Input from "../../../src/components/atoms/Input/Input";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src="login.jpg" alt="imagem fundo" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button>Login</Button>
        <p>
          Ainda não tem cadastro? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
