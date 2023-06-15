import { useState } from "react";
import Container from "../../components/templates/Container/Container";
import EstoqueList from "../../components/organisms/EstoqueList/EstoqueList";
import EstoqueCadastro from "../../components/organisms/EstoqueCadastro/EstoqueCadastro";
import Button from "../../components/atoms/Button/Button";

export default function Estoque() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState({});

  return (
    <Container title="Estoque">
      {!openForm && (
        <EstoqueList
          setOpenForm={setOpenForm}
          setSelectedEstoque={setSelectedEstoque}
        />
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
