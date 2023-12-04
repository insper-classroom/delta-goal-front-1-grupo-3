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
        const destaquesData = await fetchDestaques();
        setDestaques(destaquesData);
        const rupturasData = await fetchLances();
        setRupturas(rupturasData);
        const desfechosData = await fetchDesfechos();
        setDesfechos(desfechosData);
      } catch (error) {
        setError(error); 
      }
    };

    fetchData();
  }, []);

    const rupturasArray = Object.values(rupturas);

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

          <div className="campo-futebol">
            <img src="campo.png" alt="Campo de futebol" />
          </div>

            <div className="destaques">Destaques
              data : {JSON.stringify(destaques)}
            </div>

            <div className="envolvidos">Jogadores Envolvidos</div>
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

