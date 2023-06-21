import React, { useEffect, useState } from "react";
import { Card } from "../../index";
import { getData } from "../../../utils";

export default function Cards({ setFilter }) {
  const [estoque, setEstoque] = useState([]);
  const [totalAnimais, setTotalAnimais] = useState(0);

  useEffect(() => {
    fetchData();
    fetchTotalAnimais();
  }, []);

  const fetchData = async () => {
    const data = await getData("estoque");
    setEstoque(data || []);
  };

  const fetchTotalAnimais = () => {
    // Lógica para buscar o total de animais no backend
    const totalAnimais = 10; // Exemplo: Total de animais é 10
    setTotalAnimais(totalAnimais);
  };

  const kgRacao = estoque
    ?.filter((item) => item.categoria === "Ração")
    .reduce((total, item) => total + item.quantidade, 0);
  const antiparasitaria = estoque
    ?.filter((item) => item.categoria === "Antiparasitária")
    .reduce((total, item) => total + item.quantidade, 0);
  const antipulgas = estoque
    ?.filter((item) => item.categoria === "Antipulgas")
    .reduce((total, item) => total + item.quantidade, 0);

  const cachorroFilhotes = estoque
    ?.filter(
      (item) => item.animal === "Cachorro" && item.categoria === "Filhote"
    )
    .reduce((total, item) => total + item.quantidade, 0);
  const cachorroAdulto = estoque
    ?.filter(
      (item) => item.animal === "Cachorro" && item.categoria === "Adulto"
    )
    .reduce((total, item) => total + item.quantidade, 0);

  const gatoFilhotes = estoque
    ?.filter((item) => item.animal === "Gato" && item.categoria === "Filhote")
    .reduce((total, item) => total + item.quantidade, 0);
  const gatoAdulto = estoque
    ?.filter((item) => item.animal === "Gato" && item.categoria === "Adulto")
    .reduce((total, item) => total + item.quantidade, 0);

  const cards = [
    {
      id: "all",
      title: "Kg de ração",
      value: kgRacao,
      clickable: true,
    },
    {
      id: "antiparasitaria",
      title: "Antiparasitária",
      value: antiparasitaria,
      clickable: true,
    },
    {
      id: "antipulgas",
      title: "Antipulgas",
      value: antipulgas,
      clickable: true,
    },
    {
      id: "cachorroFilhotes",
      title: "Cachorro - Filhotes",
      value: cachorroFilhotes,
      clickable: true,
    },
    {
      id: "cachorroAdulto",
      title: "Cachorro - Adulto",
      value: cachorroAdulto,
      clickable: true,
    },
    {
      id: "gatoFilhotes",
      title: "Gato - Filhotes",
      value: gatoFilhotes,
      clickable: true,
    },
    {
      id: "gatoAdulto",
      title: "Gato - Adulto",
      value: gatoAdulto,
      clickable: true,
    },
  ];

  return (
    <section style={{ display: "flex", justifyContent: "space-between" }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={() => {
            if (card.id === "mean") return;
            setFilter(card.id);
          }}
          {...card}
        />
      ))}
      <Card title="Total de Animais" value={totalAnimais} />
    </section>
  );
}
