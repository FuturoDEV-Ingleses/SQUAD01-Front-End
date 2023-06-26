import { useState, useEffect } from "react";
import { getData, updateData, deleteData } from "../../utils/index";
import { Cards, Container } from "../../components";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData("dashboard");
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    }
  };

  return (
    <Container title="Dashboard">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Cards data={data} setFilter={setFilter} />
      )}
    </Container>
  );
}
