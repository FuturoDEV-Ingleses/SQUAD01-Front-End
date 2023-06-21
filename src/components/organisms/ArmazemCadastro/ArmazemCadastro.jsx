import React, { useState } from "react";
import "./ArmazemCadastro.css";

export default function ArmazemCadastro() {
  const [armazem, setArmazem] = useState({
    nome: "",
    tipo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArmazem((prevArmazem) => ({
      ...prevArmazem,
      [name]: value,
    }));
  };

  return (
    <div className="armazem-cadastro">
      <div className="form-row">
        <label htmlFor="armazemName">Nome:</label>
        <input
          type="text"
          id="armazemName"
          name="nome"
          value={armazem.nome}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label className="selectLabel" htmlFor="armazemType">
          Estoque para:
        </label>
        <select
          className="selectField"
          name="tipo"
          id="armazemType"
          value={armazem.tipo}
          onChange={handleChange}
        >
          <option value="">Selecione a opção</option>
          <option value="1">Cachorro</option>
          <option value="2">Gato</option>
        </select>
      </div>
      <button className="cadastrar-button">Cadastrar</button>
    </div>
  );
}
