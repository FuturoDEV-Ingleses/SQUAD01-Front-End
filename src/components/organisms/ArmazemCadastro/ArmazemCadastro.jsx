import React, { useState } from "react";
import { postData } from "../../../utils/index";
import "./ArmazemCadastro.css";
import { Button, Input } from "../../index";

export default function ArmazemCadastro({ fetchData }) {
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

  const handleCadastro = async () => {
    try {
      await postData("armazens", {
        nome: armazem.nome,
        tipo: armazem.tipo,
        situacao: "Ativo",
      });
      setArmazem({ nome: "", tipo: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="armazem-cadastro">
      <div className="form-row">
        <label htmlFor="armazemName">Nome:</label>
        <Input
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
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>
      <div className="button-row">
        <Button className="cadastrar-buttonb" onClick={handleCadastro}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
