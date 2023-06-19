import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { postData, getData, updateData, deleteData } from "../../utils";
import Container from "../../components/templates/Container/Container";

import "./Armazem.css";

export default function Armazem() {
  const [armazens, setArmazens] = useState([]);
  const [armazemAtual, setArmazemAtual] = useState(null);
  const [nome, setNome] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData("armazens");
    setArmazens(data || []);
  };

  const handleAddArmazem = async (event) => {
    event.preventDefault();

    const newArmazem = {
      id: generateId(),
      nome,
      tipoAnimal,
      situacao: "ativo",
    };

    setArmazemAtual(newArmazem);

    await postData("armazens", newArmazem);
    fetchData();
    resetForm();
  };

  const handleUpdateArmazem = async () => {
    const updatedArmazem = {
      id: editingId,
      nome,
      tipoAnimal,
    };

    setArmazemAtual(updatedArmazem);

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
    return false;
  };

  const resetForm = () => {
    setEditingId(null);
    setNome("");
    setTipoAnimal("");
  };

  const handleEditArmazem = async (armazem) => {
    setEditingId(armazem.id);
    setNome(armazem.nome);
    setTipoAnimal(armazem.tipoAnimal);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleSaveArmazem = () => {
    if (editingId) {
      handleUpdateArmazem();
    } else {
      handleAddArmazem();
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <Container title="Armazém">
      <div className="armazem-container">
        <h2 className="sub-title">Cadastro de Armazenamento</h2>
        <form>
          <div className="form-field">
            <label htmlFor="nome-input">Nome:</label>
            <input
              id="nome-input"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
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
            <Button type="button" onClick={handleSaveArmazem}>
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
              <th>Ações</th> {/* Nova coluna para as ações */}
            </tr>
          </thead>
          <tbody>
            {armazens.map((armazem) => (
              <tr key={armazem.id}>
                <td>{armazem.id}</td>
                <td>{armazem.nome}</td>
                <td>{armazem.tipoAnimal}</td>
                <td>{armazem.situacao}</td>
                <td>
                  <Button
                    className="Armazemsecondary"
                    onClick={() => handleEditArmazem(armazem)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="Armazemdanger"
                    onClick={() => handleRemoveArmazem(armazem.id)}
                    disabled={checkArmazemProducts(armazem.id)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
            {armazemAtual && (
              <tr>
                <td>{armazemAtual.id}</td>
                <td>{armazemAtual.nome}</td>
                <td>{armazemAtual.tipoAnimal}</td>
                <td>{armazemAtual.situacao}</td>
                <td>
                  <Button
                    className="Armazemsecondary"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="Armazemsuccess"
                    onClick={handleSaveArmazem}
                  >
                    Salvar
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
