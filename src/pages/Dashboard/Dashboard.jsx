import React, { useState } from "react";
import Container from "../../components/templates/Container/Container";
import Cards from "../../components/organisms/Cards/Cards";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <Container title="Dashboard">
      <Cards filter={filter} setFilter={handleSetFilter} />
    </Container>
  );
}
