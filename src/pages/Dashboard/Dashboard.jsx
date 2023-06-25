import React, { useState } from "react";
import { Cards, Container } from "../../components";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");

  return (
    <Container title="Dashboard">
      <Cards setFilter={setFilter} />
    </Container>
  );
};

export default Dashboard;
