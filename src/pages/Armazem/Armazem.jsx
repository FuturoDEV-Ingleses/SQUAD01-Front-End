import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import { postData, getData, updateData } from "../../utils";
import Container from "../../components/templates/Container/Container";

import "./Armazem.css";

export default function Armazem() {
  const [armazens, setArmazens] = useState([]);
  const [nome, setNome] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getData("armazens", setArmazens);
  };

  const handleAddArmazem = async (event) => {
    event.preventDefault();

    const newArmazem = {
      nome,
      tipoAnimal,
    };

    await postData("armazens", newArmazem);
    fetchData();
    resetForm();
  };

  const handleEditArmazem = async (armazem) => {
    const updatedArmazem = {
      id: armazem.id,
      nome: armazem.nome,
      tipoAnimal: armazem.tipoAnimal,
    };

    await updateData("armazens", armazem.id, updatedArmazem);
    fetchData();
  };

  const resetForm = () => {
    setNome("");
    setTipoAnimal("");
  };

  return (
    <Container title="Armazém">
      <div className="armazem-container">
        <h2>Cadastro de Armazenamento</h2>
        <form onSubmit={handleAddArmazem}>
          <Input
            type="text"
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="text"
            label="Estoque para:"
            value={tipoAnimal}
            onChange={(e) => setTipoAnimal(e.target.value)}
          />
          <Button type="submit">Cadastrar</Button>
        </form>

        <h2>Locais de Armazenamento Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Animal</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {armazens.map((armazem) => (
              <tr key={armazem.id}>
                <td>{armazem.id}</td>
                <td>{armazem.nome}</td>
                <td>{armazem.tipoAnimal}</td>
                <td>
                  <Button onClick={() => handleEditArmazem(armazem)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
