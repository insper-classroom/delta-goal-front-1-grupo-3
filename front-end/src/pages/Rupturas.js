import React, { useState, useEffect, useRef } from 'react';
import './style/Rupturas.css';
import { fetchDestaques, fetchLances, fetchDesfechos } from '../functions/Requisicoes.js';
import Header from './Header';
import { Chart } from "react-google-charts";
import ReactPlayer from 'react-player';

export default function Rupturas() {
  const [rupturas, setRupturas] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [desfechos, setDesfechos] = useState([]);
  const [selectedRuptura, setSelectedRuptura] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [videoStartTime, setVideoStartTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(null);

  const options = {
    legend: "none",
  };

  const handleVideoProgress = (state) => {
    if (videoStartTime && state.playedSeconds >= videoStartTime + 10) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destaquesData = await fetchDestaques(selectedTeam);
        setDestaques(destaquesData);
        console.log(selectedTeam);
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

  useEffect(() => {
    if (selectedRuptura) {
      const [hours, minutes, seconds] = selectedRuptura.inicio_ruptura.split(':').map(Number);
      const startTimeInSeconds = hours * 3600 + minutes * 60 + seconds - 5; // 5 segundos antes do início
      setVideoStartTime(startTimeInSeconds);
      setIsPlaying(true);
      playerRef.current.seekTo(startTimeInSeconds);
    }
  }, [selectedRuptura]);

  const rupturasArray = Object.values(rupturas);
  const destaquesArray = Object.values(destaques);

  const exibirDetalhesRuptura = () => {
    if (selectedRuptura) {
      return (
        <div className="detalhes-ruptura">
          <h2>DETALHES DA RUPTURA</h2>
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
              <h2>RUPTURAS</h2>
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
            <div>
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={desfechos}
                options={options}
              />
            </div>

            <div className="visao-geral2">
              <h2>Lances</h2>
              <div className="lista-lances" style={{ width: '95%' }}>
                {rupturasArray[0] && rupturasArray[0].map((ruptura, index) => (
                  <button
                    className={`button-site ${selectedRuptura === ruptura ? 'button-selected' : ''}`}
                    key={index}
                    value={index}
                    onClick={() => {
                      const selectedRuptura = rupturasArray[0][index];
                      setSelectedRuptura(selectedRuptura);
                    }}>
                    {ruptura.inicio_ruptura + ' - ' + ruptura.zona_defesa + ' - ' + ruptura.zona_ataque}
                  </button>
                ))}
              </div>

              <div className="video-container"style={{ maxWidth: '100%', margin: '0 auto', paddingTop: '25%', position: 'relative' }}>
                <ReactPlayer
                  ref={playerRef}
                  url="https://www.youtube.com/watch?v=vqguX62PKFg"
                  playing={isPlaying}
                  controls
                  width="94.85%"
                  height="99%"
                  style={{ position: 'absolute', top: '50%', left: '47.5%', transform: 'translate(-50%, -45%)', border: 'none', outline: 'none' }}
                  onProgress={handleVideoProgress}
                />
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
