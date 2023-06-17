import "./EstoqueList.css";
import { useState, useEffect } from "react";
import { Button } from "../../index";
import { getData } from "../../../utils";

export default function EstoqueList({ setOpenForm, setSelectedEstoque }) {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData("estoque");
    setEstoque(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3333/estoque/${id}`, {
      method: "DELETE",
    });
    fetchData();
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
            <th>Armazenado</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Categoria</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Estoque 01</td>
            <td>Ração</td>
            <td>20KG</td>
            <td>Adulto</td>
            <td>
              <Button classStyle="secondary">Editar</Button>
              <Button classStyle="danger">Remover</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Estoque 02</td>
            <td>Antiparasitária</td>
            <td>4</td>
            <td>Filhote</td>
            <td>
              <Button classStyle="secondary">Editar</Button>
              <Button classStyle="danger">Remover</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Estoque 03</td>
            <td>Ração</td>
            <td>300KG</td>
            <td>Adulto</td>
            <td>
              <Button classStyle="secondary">Editar</Button>
              <Button classStyle="danger">Remover</Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Estoque 04</td>
            <td>Antipulgas</td>
            <td>12</td>
            <td>Filhote</td>
            <td>
              <Button classStyle="secondary">Editar</Button>
              <Button classStyle="danger">Remover</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
