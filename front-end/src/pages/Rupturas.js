import React, { useState, useEffect } from 'react';
import { fetchDestaques, fetchLances, fetchDesfechos } from './Requisicoes.js';
import Header from './Header';
import './style/Rupturas.css';

export default function Rupturas() {
  const [rupturas, setRupturas] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [desfechos, setDesfechos] = useState([]);
  const [selectedRuptura, setSelectedRuptura] = useState(null); 
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destaquesData = await fetchDestaques(selectedTeam);
        setDestaques(destaquesData);
        console.log(selectedTeam)
        const rupturasData = await fetchLances(selectedTeam);
        setRupturas(rupturasData);
        const desfechosData = await fetchDesfechos(selectedTeam);
        setDesfechos(desfechosData);
      } catch (error) {
        setError(error); 
      }
    };

    fetchData();
  }, [selectedTeam]);

    const rupturasArray = Object.values(rupturas);
    const destaquesArray = Object.values(destaques);

    const exibirDetalhesRuptura = () => {
      if (selectedRuptura) {
        return (
          <div className="detalhes-ruptura">
            <p>{selectedRuptura.nome_jogador_ruptura}</p>
          </div>
        );
      }
      return null;
    };

  return (
    <>
      <Header />
      <div className="container">
        <div className="visao-geral">

          <div className="selecionar-time">
            Selecione um time: 
            <select
              onChange={(e) => {
                const value = e.target.value;
                setSelectedTeam(value);
              }}
            >
              <option value=""> </option>
              <option value="Red Bull Bragantino">Red Bull Bragantino</option>
              <option value="Palmeiras">Palmeiras</option>
            </select>
          </div>

          <div className="campo-futebol">
            <img src="campo.png" alt="Campo de futebol" />
          </div>

            <div className="destaques">Destaques
              <ul>
                {destaquesArray[0] && destaquesArray[0].map((destaque, index) => (
                  <li key={index} value={index}>
                    {destaque.nome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="desfechos">Desfechos</div>
  
        </div>

        <div className="visao-geral2">
          <div className="lista-lances">
            Lista de Rupturas
            <select 
              onChange={(e) => {
              const value = e.target.value;
              const selectedRuptura = rupturasArray[0][value];
              setSelectedRuptura(selectedRuptura);
              }}>
              <option value="">Selecione uma ruptura</option>
              {rupturasArray[0] && rupturasArray[0].map((ruptura, index) => (
                <option key={index} value={index}>{ruptura.inicio_ruptura}</option>
              ))}
            </select>
            {exibirDetalhesRuptura()}
          </div>
          
          <div className="video-container">
            <video controls>
              <source src="path_to_your_video.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
        
      </div>
    </>
    );
  };

