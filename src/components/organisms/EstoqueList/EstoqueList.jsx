import "./EstoqueList.css";
import { useState, useEffect } from "react";
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
    await fetch(`http://localhost:8080/estoque/${id}`, {
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
          <button onClick={() => handleEdit(item)} className="secondary">
            Editar
          </button>
          <button onClick={() => handleDelete(item.id)} className="danger">
            Remover
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <section className="estoque-list">
      <h2 className="sub-title">Lista de Produtos</h2>
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
            <td className="edits">
              <button className="secondary">Editar</button>
              <button className="danger">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
