import "./EstoqueCadastro.css";
import { useState } from "react";
import { Button, Input } from "../../index";

export default function EstoqueCadastro({
  setOpenForm,
  selectedEstoque,
  setSelectedEstoque,
}) {
  const emptyState = {
    armazenado: "",
    produto: "",
    quantidade: "",
    categoria: "",
  };

  const [form, setForm] = useState(selectedEstoque || emptyState);

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
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSave}>
        {["armazenado", "produto", "quantidade", "categoria"].map((campo) => (
          <div key={campo}>
            <label htmlFor={campo}>{capitalizeFirstLetter(campo)}</label>
            <Input
              required
              type="text"
              name={campo}
              id={campo}
              value={form[campo]}
              onChange={(e) => {
                setForm({
                  ...form,
                  [campo]: e.target.value,
                });
              }}
            />
          </div>
        ))}

        <Button classStyle="secondary" type="submit">
          Salvar
        </Button>
      </form>
    </section>
  );
}
