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
    setSituacao(armazem.situacao);
  };

  const handleUpdateArmazem = async () => {
    const updatedArmazem = {
      id: editingId,
      nome,
      animal: tipoAnimal,
      situacao: situacao
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
        <form className="form-field" onSubmit={editingId ? handleUpdateArmazem : handleAddArmazem}>
          <div className="display-col">
            <label htmlFor="nome-input">Nome</label>
            <input
            className="campos"
              id="nome-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)} required
            />
          </div>

          <div className="display-col">
            <label htmlFor="estoque-select">Estoque para</label>
            <select 
              className="campos"
              id="estoque-select"
              value={tipoAnimal}
              onChange={(e) => setTipoAnimal(e.target.value)} required
            >
              <option value="">Selecione...</option>
              <option value="Gato">Gato</option>
              <option value="Cachorro">Cachorro</option>
            </select>
          </div>

          {editingId ? 
          
          <div className="display-col">
            <label htmlFor="estoque-select">Situação</label>
            <select 
              className="campos"
              id="estoque-select"
              value={situacao}
              onChange={(e) => setSituacao(e.target.value)} required
            >
              <option value="">Selecione...</option>
              <option value="Ativo">Ativo</option>
              <option value="Desativado">Desativado</option>
            </select>
          </div>

          : 
          
          ""}

          <div>
            <button className="add-product-buttonb " type="submit">
              {editingId ? "Atualizar" : "Cadastrar"}
            </button>
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
