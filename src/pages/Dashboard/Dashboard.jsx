import React, { useEffect, useState } from "react";
import Container from "../../components/templates/Container/Container";
import Cards from "../../components/organisms/Cards/Cards";

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
        <Cards data={data} filter={filter} setFilter={handleSetFilter} />
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
}
