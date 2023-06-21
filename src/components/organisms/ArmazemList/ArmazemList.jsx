import { useState, useEffect } from "react";
import { getData } from "../../../utils";
import "./ArmazemList.css";

export default function ArmazemList({ setOpenForm, setSelectedArmazem }) {
  const [armazem, setArmazem] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
          <td colSpan={6}>Nenhum produto encontrado.</td>
        </tr>
      );
    }

    return armazem.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.nome}</td>
        <td>{item.animal}</td>
        <td>{item.situacao}</td>
        <td>
          <button onClick={() => handleEdit(item)} className="secondaryb">
            Editar
          </button>
          <button onClick={() => handleDelete(item.id)} className="dangerc">
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

        <tbody>
          <tr>
            <td>001</td>
            <td>Estoque 01</td>
            <td>Cachorro</td>
            <td>Ativo</td>
            <td className="editsArmazem">
              <button className="secondaryb">Editar</button>
              <button className="dangerc">Remover</button>
            </td>
          </tr>
          <tr>
            <td>002</td>
            <td>Estoque 02</td>
            <td>Gato</td>
            <td>Desativado</td>
            <td className="edits">
              <button className="secondaryb">Editar</button>
              <button className="dangerc">Remover</button>
            </td>
          </tr>
          <tr>
            <td>003</td>
            <td>Estoque 03</td>
            <td>Cachorro</td>
            <td>Ativo</td>
            <td className="editsarmazens">
              <button className="secondaryb">Editar</button>
              <button className="dangerc">Remover</button>
            </td>
          </tr>
          <tr>
            <td>004</td>
            <td>Estoque 04</td>
            <td>Gato</td>
            <td>Ativo</td>
            <td className="editsbutton">
              <button className="secondaryb">Editar</button>
              <button className="dangerc">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
