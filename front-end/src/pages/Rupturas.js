import React, { useState, useEffect, useRef } from 'react';
import './style/Rupturas.css';
import { fetchDestaques, fetchLances, fetchDesfechos,fetchrupturaPorcentagem } from '../functions/Requisicoes.js';
import Header from './Header';
import { Chart } from "react-google-charts";
import ReactPlayer from 'react-player';

export default function Rupturas() {
  const [rupturas, setRupturas] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [desfechos, setDesfechos] = useState([]);
  const [selectedRuptura, setSelectedRuptura] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [porcentagemruptura, setPorcentagemruptura] = useState([]);

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
        const porcentagemData = await fetchrupturaPorcentagem(selectedTeam);
        setPorcentagemruptura(porcentagemData);
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

  const BotaoRuptura = (ruptura, index) => {
    const buttonID = `${index + 1}`;
    return (
    <button
      id={buttonID}
      className={`button-site ${selectedRuptura === ruptura ? 'button-selected' : ''}`}
      key={index}
      value={index}
      onClick={() => {
        setSelectedRuptura({ ...ruptura, id: buttonID });
      }}
    >
      <div className="botao-ruptura-container">
        <div className='left-content'>
          <span className="ruptura-instante">{`Ruptura #${(index + 1).toString().padStart(3, '0')}`}</span>
        </div>
        <div className='right-content'>
          <span className="ruptura-instante">{ruptura.instante_ruptura} | {ruptura.desfecho} | Zona: {ruptura.zona_defesa}</span>
        </div>
      </div>
    </button>
      );
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
            <div className="visao-gera_rupturas">
              <h1 className='rupturas-title'>RUPTURAS</h1>
              <h3 className='frequencia-rupturas'>Frequência nas zonas</h3>
              <div className="campo-futebol-ruptura">
                <img src="campo-ruptura.jpeg" alt="Campo de futebol" />
              </div>
              <div className='dados_cruzamento_campo'>
            {Object.entries(porcentagemruptura).map(([key, value]) => (
        <div key={key} className="item">
          <span className="chave"> {key}:</span>
          <span className="valor">{value}%/</span>
        </div>
      ))}
          </div>
            <div className="destaques-desfechos-rupturas">
              <div className="destaques-rupturas">
                <h2>Maior número de rupturas:</h2>
                <ul>
                  {destaquesArray[0] && destaquesArray[0].map((destaque, index) => (
                    <li key={index} value={index}>
                      {destaque.nome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="desfechos-rupturas">
                <h2>Desfechos:</h2>
                <div className='grafico-rupturas'>
                <Chart
                className='grafico-imagem-ruptura'
                  chartType="PieChart"
                  width="120%"
                  height="120%"
                  data={desfechos}
                  options={options}
                />
                </div>
              </div>
            </div>
            </div>
    
            <div className="visao-geral2-rupturas">
              <h2>Lances</h2>
              <div className="lista-lances" style={{ width: '95%' }}>
                {rupturasArray[0] && rupturasArray[0].map((ruptura, index) => (
                  BotaoRuptura(ruptura, index)
                ))}
              </div>


              <div className="video-container-rupturas"style={{ maxWidth: '100%', margin: '0 auto', paddingTop: '25%', position: 'relative' }}>
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
