import "./EstoqueList.css";
import { useState, useEffect } from "react";
import { Button } from "../../index";
import { getData } from "../../../utils";

export default function EstoqueList({ setOpenForm, setSelectedEstoque }) {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    getData("estoque", setEstoque);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3333/estoque/${id}`, {
      method: "DELETE",
    }).then(() => {
      getData("estoque", setEstoque);
    });
  };

  const handleEdit = (estoque) => {
    setSelectedEstoque(estoque);
    setOpenForm(true);
  };

  const renderEstoqueItems = () => {
    if (estoque.length === 0) {
      return (
        <tr>
          <td colSpan={6}>Nenhum produto encontrado.</td>
        </tr>
      );
    }

    return estoque.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.armazenada}</td>
        <td>{item.produto}</td>
        <td>{item.quantidade}</td>
        <td>{item.categoria}</td>
        <td>
          <Button onClick={() => handleEdit(item)} classStyle="secondary">
            Editar
          </Button>
          <Button onClick={() => handleDelete(item.id)} classStyle="danger">
            Remover
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <section className="estoque-list">
      <h2>Lista de Produtos</h2>
      <br />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Armazenada</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>{renderEstoqueItems()}</tbody>
      </table>
    </section>
  );
}
