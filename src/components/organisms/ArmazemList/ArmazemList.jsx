import { useState, useEffect } from "react";
import { getData } from "../../../utils";
import "./ArmazemList.css";

export default function ArmazemList({ list, setOpenForm, setSelectedArmazem }) {
  const [armazem, setArmazem] = useState([]);

  useEffect(() => {
    setArmazem(list);
  }, [list]);

  const fetchData = async () => {
    const data = await getData("armazem");
    setArmazem(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3333/armazem/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleEdit = (armazem) => {
    setSelectedArmazem(armazem);
    setOpenForm(true);
  };

  const renderArmazemItems = () => {
    if (armazem.length === 0) {
      return (
        <tr>
          <td colSpan={4}>Nenhum produto encontrado.</td>
        </tr>
      );
    }

    return armazem.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.nome}</td>
        <td>{item.animal}</td>
        <td>{item.situacao}</td>
        <td className="edits">
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
    <section className="armazem-list">
      <h2 className="sub-title">Locais de Armazenamento Cadastrados</h2>
      <br />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Animal</th>
            <th>Situação</th>
          </tr>
        </thead>

        <tbody>{renderArmazemItems()}</tbody>
      </table>
    </section>
  );
}
