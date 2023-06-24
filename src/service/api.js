// services/api.js
const BASE_URL = "http://localhost:8080"; // URL base da sua API

// Função para fazer uma chamada GET
export const getData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();
  return data;
};

// Função para fazer uma chamada POST
export const postData = async (endpoint, body) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// Função para fazer uma chamada PUT (atualização)
export const updateData = async (endpoint, id, body) => {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// Função para fazer uma chamada DELETE
export const deleteData = async (endpoint, id) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
        method: "DELETE",
      });
    
      if (response.ok) {
        return true;
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
