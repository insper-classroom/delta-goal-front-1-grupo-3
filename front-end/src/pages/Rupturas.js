import React, { useState, useEffect } from 'react';
import './style/Rupturas.css';
import { fetchDestaques, fetchLances, fetchDesfechos } from '../functions/Requisicoes.js';
import Header from './Header';

export default function Rupturas() {
  const [rupturas, setRupturas] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [desfechos, setDesfechos] = useState([]);
  const [selectedRuptura, setSelectedRuptura] = useState(null); 
  const [selectedTeam, setSelectedTeam] = useState(null);

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
        console.log(error); 
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
            <p>Posse de bola: {selectedRuptura.nome_jogador_posse_bola}</p>
            <p>Jogadores defesa: {selectedRuptura.nomes_jogadores_defesa}</p>
            <p>Desfecho: {selectedRuptura.desfecho}</p>
            <p>Jogador: {selectedRuptura.nome_jogador_ruptura}</p>
          </div>
        );
      }
      return null;
    };

  return (
    <>
          <Header />
              <div className="selecionar-time">
                <h2>Selecione um time:</h2> 
                {['Red Bull Bragantino', 'Palmeiras'].map((team, index) => (
                  <button 
                    className={`button-site ${selectedTeam === team ? 'button-selected' : ''}`}
                    key={index} 
                    onClick={() => {
                      setSelectedTeam(team);
                    }}
                  >
                    {team}
                  </button>
                ))}
              </div>
              
              {selectedTeam ? (
              <>
              <div className='container'>
                <div className="visao-geral">
                    <h2>Visão Geral:</h2>
                    <div className="campo-futebol">
                      <img src="campo.png" alt="Campo de futebol" />
                    </div>
                  <div className="destaques">
                    <h2>Maior número de rupturas:</h2>
                    <ul>
                      {destaquesArray[0] && destaquesArray[0].map((destaque, index) => (
                        <li key={index} value={index}>
                          {destaque.nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="desfechos">
                    <h2>Desfechos:</h2>
                  </div>
                </div>

                <div className="visao-geral2">
                  <h2>Lances</h2>
                  <div className="lista-lances">
                    {rupturasArray[0] && rupturasArray[0].map((ruptura, index) => (
                      <button 
                        className={`button-site ${selectedRuptura === ruptura ? 'button-selected' : ''}`}
                        key={index} 
                        value={index} 
                        onClick={() => {
                          const selectedRuptura = rupturasArray[0][index];
                          setSelectedRuptura(selectedRuptura);
                        }}>
                        {ruptura.inicio_ruptura + ' - '+ ruptura.zona_defesa + ' - ' + ruptura.zona_ataque}
                      </button>
                    ))}
                  </div>

                  <div className="video-container">
                    <video controls>
                      <source src="path_to_your_video.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  </div>
                  {exibirDetalhesRuptura()}
              </div>
          </div>
            </>
              ) : (
                <h2>Selecione um time para ver os destaques e lances</h2>
                )}
    </>
  );
}