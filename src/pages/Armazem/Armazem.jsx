import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { postData, getData, updateData, deleteData } from "../../service/api";
import Container from "../../components/templates/Container/Container";

import "./Armazem.css";

export default function Armazem() {
  const [armazens, setArmazens] = useState([]);
  const [nome, setNome] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [situacao, setSituacao] = useState("ativo");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData("armazem");
    setArmazens(data || []);
  };

  const handleAddArmazem = async (event) => {
    event.preventDefault();

    const newArmazem = {
      nome,
      animal: tipoAnimal,
      situacao: "ativo",
    };

    await postData("armazem", newArmazem);
    fetchData();
    resetForm();
  };

  const handleEditArmazem = async (armazem) => {
    setEditingId(armazem.id);
    setNome(armazem.nome);
    setTipoAnimal(armazem.animal);
  };

  const handleUpdateArmazem = async () => {
    const updatedArmazem = {
      id: editingId,
      nome,
      animal: tipoAnimal,
    };

    await updateData("armazem", editingId, updatedArmazem);
    fetchData();
    resetForm();
  };

  const handleRemoveArmazem = async (id) => {
    const armazem = armazens.find((armazem) => armazem.id === id);

    if (armazem) {
      const hasProducts = checkArmazemProducts(id);

      if (!hasProducts) {
        await deleteData("armazem", id);
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

        <section className="estoque-list">
          <h2 className="sub-title">Locais de Armazenamento Cadastrados</h2>

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
              {armazens.map((armazem) => (
                <tr key={armazem.id}>
                  <td>{armazem.id}</td>
                  <td>{armazem.nome}</td>
                  <td>{armazem.animal}</td>
                  <td>{armazem.situacao}</td>
                  <td className="edits">
                    <button
                      className="secondary"
                      onClick={() => handleEditArmazem(armazem)}
                    >
                      Editar
                    </button>
                    <button
                      className="danger"
                      onClick={() => handleRemoveArmazem(armazem.id)}
                      disabled={checkArmazemProducts(armazem.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Container>
  );
}
