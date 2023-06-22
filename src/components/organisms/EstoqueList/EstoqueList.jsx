import "./EstoqueList.css";
import { useState, useEffect } from "react";
import { getData } from "../../../utils";

export default function EstoqueList({ setOpenForm, setSelectedEstoque }) {
  const [estoque, setEstoque] = useState([
    {
      id: 1,
      armazenada: "Estoque 01",
      produto: "Ração",
      quantidade: "20KG",
      categoria: "Adulto",
    },
    {
      id: 2,
      armazenada: "Estoque 02",
      produto: "Antiparasitária",
      quantidade: "4",
      categoria: "Filhote",
    },
    {
      id: 3,
      armazenada: "Estoque 03",
      produto: "Ração",
      quantidade: "300KG",
      categoria: "Adulto",
    },
    {
      id: 4,
      armazenada: "Estoque 04",
      produto: "Antipulgas",
      quantidade: "12",
      categoria: "Filhote",
    },
  ]);

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
    setEstoque((prevEstoque) => prevEstoque.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setSelectedEstoque(item);
    setOpenForm(true);
  };

  const renderEstoqueItems = () => {
    if (!estoque || estoque.length === 0) {
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
        <td className="edits">
          <button
            onClick={() => handleEdit(item.id)}
            className="edits secondary"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="edits danger"
          >
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

        <tbody>{renderEstoqueItems()}</tbody>
      </table>
    </section>
  );
}
