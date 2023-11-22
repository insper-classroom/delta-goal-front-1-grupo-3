import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [person, setPerson] = useState(null);
  const [cepData, setCepData] = useState(null);

  useEffect(() => {
    const fetchDataStarWars = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/1');
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    const fetchDataCep = async () => {
      try {
        const response = await fetch('https://viacep.com.br/ws/01001000/json/');
        const data = await response.json();
        setCepData(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchDataCep();
    fetchDataStarWars();
  }, []);

  return (
    <div>
    <h1>Oi</h1>
    {person && (
      <div>
        <h2>Informações da API:</h2>
        <p>Nome: {person.name}</p>
        <p>Altura: {person.height}</p>
      </div>
    )}

    {cepData && (
      <div>
        <h2>Informações da API:</h2>
        <p>CEP: {cepData.cep}</p>
        <p>Logradouro: {cepData.logradouro}</p>
        <p>Bairro: {cepData.bairro}</p>
        <p>Cidade: {cepData.localidade}</p>
        <p>Estado: {cepData.uf}</p>
      </div>
    )}
  </div>
    );
}

export default App;
