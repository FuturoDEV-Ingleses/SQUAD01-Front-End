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
          </tr>
        </thead>

        <tbody>
          {estoque.map((item) => (
            <tr key={item.id}>
              <td>{item.armazenado}</td>
              <td>{item.produto}</td>
              <td>{item.Quantidade}</td>
              <td>{item.Categoria}</td>
              <td>{estoque.length}</td>
              <td>
                <Button onClick={() => handleEdit(item)} classStyle="green">
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(item.id)}
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
        classStyle="secondary add-product-button" // Adicionando a classe add-product-button
        onClick={() => setOpenForm(true)}
      >
        Cadastrar
      </Button>
    </section>
  );
}
