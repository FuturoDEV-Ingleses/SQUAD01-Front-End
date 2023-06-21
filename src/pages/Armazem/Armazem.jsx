import React, { useState, useEffect } from "react";
import { Container, ArmazemList, ArmazemCadastro } from "../../components";
import { getData } from "../../utils/index";

export default function Armazem() {
  const [armazens, setArmazens] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData("armazens");
      setArmazens(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container title="Armazem">
        <ArmazemCadastro />
        <ArmazemList list={armazens} />
      </Container>
    </div>
  );
}
