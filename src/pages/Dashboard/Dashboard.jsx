import { useState } from "react";
import { Cards, Container } from "../../components";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  return (
    <Container title="Dashboard">
      <Cards setFilter={setFilter} />
    </Container>
  );
}
