/*import "./Estoque.css";
import { useState, useEffect } from "react";
import { Button } from "../../index";

import { getData } from "../../../utils";

export default function EstoqueList({ setOpenForm, setSelectedEstoque }) {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    getData("estoque", setEstoque);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3333/unidades/${id}`, {
      method: "DELETE",
    });
    getData("estoque", setEstoque);
  };

  const handleEdit = (estoque) => {
    setSelectedUnit(estoque);
    setOpenForm(true);
  };

  return (
    <section className="estoque-list">
      <h2>Lista de Produtos</h2>
      <br />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Armazenado</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {estoque.map((estoque) => (
            <tr key={estoque.id}>
              <td>{estoque.id}</td>
              <td>{estoque.armazenado}</td>
              <td>{estoque.produto}</td>
              <td>{estoque.quantidade}</td>
              <td>{estoque.categoria}</td>
              <td>
                <Button onClick={() => handleEdit(estoque)} classStyle="green">
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(estoque.id)}
                  classStyle="danger"
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <Button
        id="new-estoque"
        classStyle="secondary"
        onClick={() => setOpenForm(true)}
      >
        Nova Unidade
      </Button>
    </section>
  );
};*/
