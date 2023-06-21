import React, { useEffect, useState } from "react";
import Container from "../../components/templates/Container/Container";
import Cards from "../../components/organisms/Cards/Cards";
import Card from "../../components/molecules/Card/Card";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);

  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fazer a solicitação ao back-end para obter os dados necessários
      // Substitua a URL abaixo pela URL real da sua API
      const response = await fetch("https://api.example.com/dashboard-data");
      const data = await response.json();

      // Atualizar o estado com os dados recebidos
      setData(data);
    } catch (error) {
      console.log("Erro ao buscar os dados do dashboard:", error);
    }
  };

  return (
    <Container title="Dashboard">
      {data ? (
        <Cards data={data} filter={filter} setFilter={handleSetFilter}>
          {/* Cards para Cachorro Filhote */}
          <section className="card-container">
            <h2>Cachorro Filhote</h2>
            <Card title="Kg de Ração" value={data.cachorroFilhote.kgRacao} />
            <Card
              title="Antiparasitária"
              value={data.cachorroFilhote.antiparasitaria}
            />
            <Card title="Antipulgas" value={data.cachorroFilhote.antipulgas} />
            <Card
              title="Total de Animais"
              value={data.cachorroFilhote.totalAnimais}
            />
          </section>

          {/* Cards para Cachorro Adulto */}
          <section className="card-container">
            <h2>Cachorro Adulto</h2>
            <Card title="Kg de Ração" value={data.cachorroAdulto.kgRacao} />
            <Card
              title="Antiparasitária"
              value={data.cachorroAdulto.antiparasitaria}
            />
            <Card title="Antipulgas" value={data.cachorroAdulto.antipulgas} />
            <Card
              title="Total de Animais"
              value={data.cachorroAdulto.totalAnimais}
            />
          </section>

          {/* Cards para Gato Filhote */}
          <section className="card-container">
            <h2>Gato Filhote</h2>
            <Card title="Kg de Ração" value={data.gatoFilhote.kgRacao} />
            <Card
              title="Antiparasitária"
              value={data.gatoFilhote.antiparasitaria}
            />
            <Card title="Antipulgas" value={data.gatoFilhote.antipulgas} />
            <Card
              title="Total de Animais"
              value={data.gatoFilhote.totalAnimais}
            />
          </section>

          {/* Cards para Gato Adulto */}
          <section className="card-container">
            <h2>Gato Adulto</h2>
            <Card title="Kg de Ração" value={data.gatoAdulto.kgRacao} />
            <Card
              title="Antiparasitária"
              value={data.gatoAdulto.antiparasitaria}
            />
            <Card title="Antipulgas" value={data.gatoAdulto.antipulgas} />
            <Card
              title="Total de Animais"
              value={data.gatoAdulto.totalAnimais}
            />
          </section>
        </Cards>
      ) : (
        <p>Carregando dados do dashboard...</p>
      )}
    </Container>
  );
}
