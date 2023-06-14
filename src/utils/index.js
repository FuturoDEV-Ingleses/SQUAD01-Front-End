export const getData = (path, setData) => {
  fetch(`http://localhost:3333/${path}`)
    .then((res) => res.json())
    .then((dados) => setData(dados));
};

// Outras funções/utilitários podem ser adicionados aqui
