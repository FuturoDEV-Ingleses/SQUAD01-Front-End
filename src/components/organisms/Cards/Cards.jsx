import { useEffect, useState } from "react";
import { Card } from "../../index";

import { getData } from "../../../utils/index";

export default function Cards({ setFilter }) {
  const [estoque, setEstoque] = useState([]);
  const [cadastro, setCadastro] = useState([]);

  useEffect(() => {
    getData("estoque", setEstoque);
    getData("cadastro", setCadastro);
  }, []);

  const estoqueTotal = estoque?.length;
  const activeEstoque = estoque?.filter((item) => item.ativa).length;
  const inactiveEstoque = estoqueTotal - activeEstoque;

  const cards = [
    {
      id: "all",
      title: "Total de produtos",
      value: estoqueTotal,
      clickable: true,
    },
    {
      id: "active",
      title: "Produtos em estoque",
      value: activeEstoque,
      clickable: true,
    },
    {
      id: "inactive",
      title: "Sem produtos em estoque",
      value: inactiveEstoque,
      clickable: true,
    },
  ];

  return (
    <section style={{ display: "flex", justifyContent: "space-between" }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={() => {
            setFilter(card.id);
          }}
          {...card}
        />
      ))}
    </section>
  );
}
