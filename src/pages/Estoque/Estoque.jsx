import { useState } from "react";
import Container from "../../components/templates/Container/Container";
import EstoqueList from "../../components/organisms/EstoqueList/EstoqueList";
import EstoqueCadastro from "../../components/organisms/EstoqueCadastro/EstoqueCadastro";
import "./Estoque.css";

export default function Estoque() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState({});

  const handleOpenForm = () => {
    setSelectedEstoque({});
    setOpenForm(true);
  };

  return (
    <Container title="Estoque">
      {!openForm && (
        <>
          <EstoqueList
            setOpenForm={setOpenForm}
            setSelectedEstoque={setSelectedEstoque}
          />
          <button onClick={handleOpenForm} className="add-product-buttonb">
            Cadastrar
          </button>
        </>
      )}

      {openForm && (
        <EstoqueCadastro
          setOpenForm={setOpenForm}
          selectedEstoque={selectedEstoque}
          setSelectedEstoque={setSelectedEstoque}
        />
      )}
    </Container>
  );
}
