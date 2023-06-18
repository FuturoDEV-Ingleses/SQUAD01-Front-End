import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { postData, getData, updateData, deleteData } from "../../utils";
import Container from "../../components/templates/Container/Container";

import "./Armazem.css";

export default function Armazem() {
  const [armazens, setArmazens] = useState([]);
  const [nome, setNome] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData("armazens");
    setArmazens(data || []); // Verificação para garantir que seja uma matriz válida
  };

  const handleAddArmazem = async (event) => {
    event.preventDefault();

    const newArmazem = {
      id: generateId(),
      nome,
      tipoAnimal,
      situacao: "ativo",
    };

    await postData("armazens", newArmazem);
    fetchData();
    resetForm();
  };

  const handleEditArmazem = async (armazem) => {
    setEditingId(armazem.id);
    setNome(armazem.nome);
    setTipoAnimal(armazem.tipoAnimal);
  };

  const handleUpdateArmazem = async () => {
    const updatedArmazem = {
      id: editingId,
      nome,
      tipoAnimal,
    };

    await updateData("armazens", editingId, updatedArmazem);
    fetchData();
    resetForm();
  };

  const handleRemoveArmazem = async (id) => {
    const armazem = armazens.find((armazem) => armazem.id === id);

    if (armazem) {
      const hasProducts = checkArmazemProducts(id);

      if (!hasProducts) {
        await deleteData("armazens", id);
        fetchData();
      }
    }
  };

  const checkArmazemProducts = (id) => {
    // Lógica para verificar se o armazém possui produtos
    // Retorne true se houver produtos, caso contrário, retorne false
    return false;
  };

  const resetForm = () => {
    setEditingId(null);
    setNome("");
    setTipoAnimal("");
  };

  const generateId = () => {
    // Lógica para gerar um ID único para o armazém
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <Container title="Armazém">
      <div className="armazem-container">
        <h2 className="sub-title">Cadastro de Armazenamento</h2>
        <form onSubmit={editingId ? handleUpdateArmazem : handleAddArmazem}>
          <div className="form-field">
            <label htmlFor="nome-input">Nome:</label>
            <select
              id="nome-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Estoque 01">Estoque 01</option>
              <option value="Estoque 02">Estoque 02</option>
              <option value="Estoque 03">Estoque 03</option>
              <option value="Estoque 04">Estoque 04</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="estoque-select">Estoque para:</label>
            <select
              id="estoque-select"
              value={tipoAnimal}
              onChange={(e) => setTipoAnimal(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Gato">Gato</option>
              <option value="Cachorro">Cachorro</option>
            </select>
          </div>

          <div className="button-container">
            <Button type="submit">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>

        <h2>Locais de Armazenamento Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Animal</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {armazens &&
              armazens.map((armazem) => (
                <tr key={armazem.id}>
                  <td>{armazem.id}</td>
                  <td>{armazem.nome}</td>
                  <td>{armazem.tipoAnimal}</td>
                  <td>{armazem.situacao}</td>
                  <td>
                    <Button onClick={() => handleEditArmazem(armazem)}>
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleRemoveArmazem(armazem.id)}
                      disabled={checkArmazemProducts(armazem.id)}
                    >
                      Remover
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
