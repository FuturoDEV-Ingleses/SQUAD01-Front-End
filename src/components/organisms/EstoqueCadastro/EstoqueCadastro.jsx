import "./EstoqueCadastro.css";
import { useState, useEffect } from "react";
import { Button, Input } from "../../index";

export default function EstoqueCadastro({
  setOpenForm,
  selectedEstoque,
  setSelectedEstoque,
}) {
  const emptyState = {
    armazenada: "",
    produto: "",
    quantidade: "",
    animal: "",
    categoria: "",
  };

  const [form, setForm] = useState(selectedEstoque || emptyState);
  const [armazenamentos, setArmazenamentos] = useState([]);

  useEffect(() => {
    fetchArmazenamentos();
  }, []);

  const fetchArmazenamentos = () => {
    // Fetch armazenamentos from the server
    fetch("http://localhost:3333/armazenamentos")
      .then((response) => response.json())
      .then((data) => {
        setArmazenamentos(data);
      })
      .catch((error) => {
        console.log("Error fetching armazenamentos:", error);
      });
  };

  const createEstoque = () => {
    fetch("http://localhost:3333/estoque", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const editEstoque = () => {
    fetch(`http://localhost:3333/estoque/${selectedEstoque?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    selectedEstoque ? editEstoque() : createEstoque();

    setSelectedEstoque(emptyState);
    setOpenForm(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <section className="estoque-cadastro">
      <h2 className="sub-title">Cadastro de Produtos</h2>
      <form onSubmit={handleSave}>
        <div className="form-field">
          <label htmlFor="armazenada">Armazenamento</label>
          <select
            required
            name="armazenada"
            id="armazenada"
            value={form.armazenada}
            onChange={(e) => {
              setForm({
                ...form,
                armazenada: e.target.value,
              });
            }}
          >
            <option value="">Selecione o local de armazenamento</option>
            <option value="Estoque 01">Estoque 01</option>
            <option value="Estoque 02">Estoque 02</option>
            <option value="Estoque 03">Estoque 03</option>
            <option value="Estoque 04">Estoque 04</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="produto">Produto</label>
          <select
            required
            name="produto"
            id="produto"
            value={form.produto}
            onChange={(e) => {
              setForm({
                ...form,
                produto: e.target.value,
              });
            }}
          >
            <option value="">Selecione o tipo de produto</option>
            <option value="Ração">Ração</option>
            <option value="Antiparasitário">Antiparasitário</option>
            <option value="Antipulgas">Antipulgas</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="quantidade">Quantidade</label>
          <Input
            required
            type="number"
            name="quantidade"
            id="quantidade"
            value={form.quantidade}
            onChange={(e) => {
              setForm({
                ...form,
                quantidade: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-field">
          <label htmlFor="animal">Animal</label>
          <select
            required
            name="animal"
            id="animal"
            value={form.animal}
            onChange={(e) => {
              setForm({
                ...form,
                animal: e.target.value,
                armazenada: "",
              });
            }}
          >
            <option value="">Selecione o animal</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="categoria">Categoria</label>
          <select
            required
            name="categoria"
            id="categoria"
            value={form.categoria}
            onChange={(e) => {
              setForm({
                ...form,
                categoria: e.target.value,
              });
            }}
          >
            <option value="">Selecione a categoria</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
          </select>
        </div>

        <Button classStyle="secondary" type="submit">
          Salvar
        </Button>
      </form>
    </section>
  );
}
