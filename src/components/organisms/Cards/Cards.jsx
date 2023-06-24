import React, { useEffect, useState } from "react";
import { Card } from "../../index";
import { getData } from "../../../utils";
import cachorroAdultoImg from "../../../assets/cachorro_adulto.png";
import cachorroFilhoteImg from "../../../assets/cachorro_filhote.png";
import gatoAdultoImg from "../../../assets/gato_adulto.png";
import gatoFilhoteImg from "../../../assets/gato_filhote.png";
import editIcon from "../../../assets/edit.png";

export default function Cards({ setFilter }) {
  const [estoque, setEstoque] = useState([]);
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchData();
    fetchTotalAnimais();
  }, []);

  const fetchData = async () => {
    const data = await getData("estoque");
    setEstoque(data || []);
  };

  const fetchTotalAnimais = () => {
    // buscar o total de animais no backend
    const totalAnimais = 10;
    setTotalAnimais(totalAnimais);
  };

  const calcularQuantidade = (animal, categoria, cardId) => {
    return estoque
      ?.filter(
        (item) =>
          item.animal === animal &&
          item.categoria === categoria &&
          item.cardId === cardId
      )
      .reduce((total, item) => total + item.quantidade, 0);
  };

  const calcularTotalClasse = (animal, categoria) => {
    return cards
      .map((card) => calcularQuantidade(animal, categoria, card.id))
      .reduce((total, quantidade) => total + quantidade, 0);
  };

  const cards = [
    {
      id: "kgRacao",
      title: "Kg de Ração",
      clickable: true,
    },
    {
      id: "antiparasitaria",
      title: "Antiparasitária",
      clickable: true,
    },
    {
      id: "antipulgas",
      title: "Antipulgas",
      clickable: true,
    },
    {
      id: "totalClasse",
      title: "Total",
      clickable: true,
    },
  ];

  const filtrarCardsCachorro = (categoria) => {
    const cardsCachorro = cards.map((card, index) => {
      if (card.id === "totalClasse") {
        return (
          <Card
            key={index}
            title={card.title}
            value={calcularTotalClasse("Cachorro", categoria)}
            clickable={card.clickable}
            icon={editIcon}
            onClick={() => handleEdit("Cachorro", categoria)}
          />
        );
      }

      return (
        <Card
          key={index}
          onClick={() => {
            if (card.id === "") return;
            setFilter(card.id);
          }}
          title={card.title}
          value={calcularQuantidade("Cachorro", categoria, card.id)}
          clickable={card.clickable}
        />
      );
    });

    return cardsCachorro;
  };

  const filtrarCardsGato = (categoria) => {
    const cardsGato = cards.map((card, index) => {
      if (card.id === "totalClasse") {
        return (
          <Card
            key={index}
            title={card.title}
            value={calcularTotalClasse("Gato", categoria)}
            clickable={card.clickable}
            icon={editIcon}
            onClick={() => handleEdit("Gato", categoria)}
          />
        );
      }

      return (
        <Card
          key={index}
          onClick={() => {
            if (card.id === "") return;
            setFilter(card.id);
          }}
          title={card.title}
          value={calcularQuantidade("Gato", categoria, card.id)}
          clickable={card.clickable}
        />
      );
    });

    return cardsGato;
  };

  const handleEdit = (animal, categoria) => {
    setIsEditing(true);
    setEditingCard({ animal, categoria });
  };

  const handleSave = () => {
    // salvar as alterações do card no backend

    setIsEditing(false);
    setEditingCard(null);
  };

  if (isEditing) {
    return (
      <div>
        {/* Renderize o formulário de edição aqui */}
        <button onClick={handleSave}>Salvar</button>
      </div>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={cachorroAdultoImg}
          alt="Cachorro Adulto"
          style={{ width: "30px", marginRight: "10px" }}
        />
        <h2 style={{ marginBottom: "0" }}>Adulto</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filtrarCardsCachorro("Adulto")}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={cachorroFilhoteImg}
          alt="Cachorro Filhote"
          style={{ width: "30px", marginRight: "10px" }}
        />
        <h2 style={{ marginBottom: "0" }}>Filhote</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filtrarCardsCachorro("Filhote")}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={gatoAdultoImg}
          alt="Gato Adulto"
          style={{ width: "30", marginRight: "10px" }}
        />
        <h2 style={{ marginBottom: "0" }}>Adulto</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filtrarCardsGato("Adulto")}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={gatoFilhoteImg}
          alt="Gato Filhote"
          style={{ width: "30px", marginRight: "10px" }}
        />
        <h2 style={{ marginBottom: "0" }}>Filhote</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filtrarCardsGato("Filhote")}
      </div>
    </section>
  );
}
