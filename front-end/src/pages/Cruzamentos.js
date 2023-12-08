import React, { useState, useEffect, useRef } from 'react';
import { fetchLancesCruzamentos, fetchDestaquesCruzamentos, fetchCruzamentos, fetchDesfechosCruzamentos, fetchCruzamentosPorcentagem } from '../functions/Requisicoes.js';
import { Chart } from "react-google-charts";
import './style/Cruzamentos.css';
import ReactPlayer from 'react-player';
import Header from './Header';

export default function Partidas() {
  const [lancesPalmeiras, setLancesPalmeiras] = useState([]);
  const [lancesBragantino, setLancesBragantino] = useState([]);
  const [desfechosPalmeiras, setDesfechosPalmeiras] = useState([]);
  const [desfechosBragantino, setDesfechosBragantino] = useState([]);
  const [destaquesPalmeiras, setDestaquesPalmeiras] = useState([]);
  const [destaquesBragantino, setDestaquesBragantino] = useState([]);
  const [cruzamentosPalmeiras, setCruzamentosPalmeiras] = useState([]);
  const [cruzamentosBragantino, setCruzamentosBragantino] = useState([]);
  const [porcentagemPalmeiras, setPorcentagemPalmeiras] = useState([]);
  const [selectedCruzamento, setSelectedCruzamento] = useState(null);

  const [videoStartTime, setVideoStartTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(null);

  const options = {
    legend: 'none',
    tooltip: { isHtml: true, trigger: 'selection' }, // Use HTML tooltip features
    chartArea: { left: "5%", top: "5%", width: "90%", height: "90%" }, // Increase chart area
    pieSliceText: 'percentage', // You can also set this to 'value' or 'label' depending on what you want to display
    pieHole: 0.4, // If you want a donut chart
    is3D: true,
  };
  

  const baroptions = {
    legend: { position: 'none' },
    colors: ['#ff8c00'], // Set the bars to an orange color
    // ... other options as needed
  };
  
  const teams = ["Palmeiras", "Red Bull Bragantino"]

  const handleVideoProgress = (state) => {
    if (videoStartTime && state.playedSeconds >= videoStartTime + 10) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const team of teams) {
          const lances = await fetchLancesCruzamentos(team);
          const destaques = await fetchDestaquesCruzamentos(team);
          const cruzamentos = await fetchCruzamentos(team);
          const desfechos = await fetchDesfechosCruzamentos(team);
          const porcentagem = await fetchCruzamentosPorcentagem(team)
          if (team === "Palmeiras") {
            setLancesPalmeiras(lances);
            setDestaquesPalmeiras(destaques);
            setCruzamentosPalmeiras(cruzamentos);
            setDesfechosPalmeiras(desfechos);
            setPorcentagemPalmeiras(porcentagem)
          }
          else {
            setLancesBragantino(lances);
            setDestaquesBragantino(destaques);
            setCruzamentosBragantino(cruzamentos);
            setDesfechosBragantino(desfechos);
          }
        }
      } catch (error) {
        console.log(error); 
      }
    };
    fetchData();
  });

  useEffect(() => {
    if (selectedCruzamento) {
      const [hours, minutes, seconds] = selectedCruzamento.instante_cruzamento.split(':').map(Number);
      const startTimeInSeconds = hours * 3600 + minutes * 60 + seconds - 5; // 5 segundos antes do início
      setVideoStartTime(startTimeInSeconds);
      setIsPlaying(true);
      playerRef.current.seekTo(startTimeInSeconds);
      
    }
  }, [selectedCruzamento]);

  const CruzamentosPalmeirasArray = Object.values(cruzamentosPalmeiras);
  const CruzamentosBragantinoArray = Object.values(cruzamentosBragantino);
  const DestaquesPalmeirasArray = Object.values(destaquesPalmeiras);
  const DestaquesBragantinoArray = Object.values(destaquesBragantino);

  const exibirDetalhesCruzamento = () => {
    if (selectedCruzamento) {
      return (
      <div className="detalhes-cruzamentos">
        <div>
          <h3>Atacando:</h3>
          <ul>
            {selectedCruzamento.nome_jogadores_time_cruzando.map((jogador, index) => (
              <li key={index}>{jogador}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Defendendo:</h3>
          <ul>
            {selectedCruzamento.nome_jogadores_time_defendendo.map((jogador, index) => (
              <li key={index}>{jogador}</li>
            ))}
          </ul>
        </div>
      </div>
      );
    }
  }

  const BotaoCruzamento = (cruzamento, index, imagemTime) => {
    const buttonID = `${index + 1}`;
    return (
    <button
      id={buttonID}
      className={`button-site ${selectedCruzamento === cruzamento ? 'button-selected' : ''}`}
      key={index}
      value={index}
      onClick={() => {
        setSelectedCruzamento({ ...cruzamento, id: buttonID });
      }}
    >
      <div className="botao-cruzamento-container">
        <div className='left-content'>
          {imagemTime && <img src={imagemTime} alt="Time" className="time-imagem" style={{ width: '25px', height: '25px', marginLeft: '10px' }}/>}
          <span className="cruzamento-instante">{`Cruzamento #${(index + 1).toString().padStart(3, '0')}`}</span>
        </div>
        <div className='right-content'>
          <span className="cruzamento-instante">{cruzamento.instante_cruzamento} | {cruzamento.desfecho} | Zona: {cruzamento.zona}</span>
        </div>
      </div>
    </button>
      );
    };

    const imagemPalmeiras = require('./img/palmeiras-logo.png');
    const imagemBragantino = require('./img/bragantino-logo.png');

  return (
    <>
      <Header />
      <div className="container-cruzamentos">
        <div className="visao-geral-cruz">
        <h1>Visão Geral</h1>
        <h3 className='frequencia'>Frequência nas zonas</h3>
        <div className='dados_cruzamento'>
          <div className="campo-futebol-cruzamento"><img src="campo-cruzamento.jpeg" alt="Campo de futebol" /></div>
          <div className='dados_cruzamento_campo'>
            {/* {Object.entries(porcentagemPalmeiras).map(([key, value]) => (
        <div key={key} className="item">
          <span className="chave"> {key}:</span>
          <span className="valor">{value}%/</span>
        </div>
      ))} */}
          </div>
          <div className="detalhes-cruzamentos">
            <div className="infos-palmeiras">
              <div className='destaques-sep'>
                <h3>Destaques SEP</h3>
                { <ul>
                  {DestaquesPalmeirasArray[0] && DestaquesPalmeirasArray[0].map((destaque, index) => (
                    <li key={index} value={index}>
                    {destaque.nome} - {destaque.cruzamentos}
                    </li>
                  ))} 
                </ul>}
              </div>
              <div className='envolvidos-sep'>
                <h3>Jogadores envolvidos SEP</h3>
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="100%"
                  data={lancesPalmeiras}
                  options={baroptions}
                />
              </div>
              <div className='desfechos-sep'>
                <h3>Desfechos SEP</h3>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={desfechosPalmeiras}
                  options={options}
                />
              </div>
            </div>

            <div className="infos-bragantino">
              <div className='destaques-red'>
                <h3>Destaques RED</h3>
                  <ul>
                    {DestaquesBragantinoArray[0] && DestaquesBragantinoArray[0].map((destaque, index) => (
                    <li key={index} value={index}>
                    {destaque.nome} - {destaque.cruzamentos}
                    </li>
                    ))}
                  </ul>
              </div>
              <div className='envolvidos-red'>
                <h3>Jogadores envolvidos RED</h3>
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="100%"
                  data={lancesBragantino}
                  options={baroptions}
                />
              </div>
              <div className='desfechos-red'>
                <h3>Desfechos RED</h3>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={desfechosBragantino}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
        </div>

      <div className='visao-geral2-cruz'>
        <h2>Lances</h2>
        <div className="lista-lances-cruz" style={{ width: '95%' }}>
          {CruzamentosPalmeirasArray[0] && CruzamentosPalmeirasArray[0].map((cruzamento, index) => (
            BotaoCruzamento(cruzamento, index, imagemPalmeiras)
          ))}
          {CruzamentosBragantinoArray[0] && CruzamentosBragantinoArray[0].map((cruzamento, index) => (
            BotaoCruzamento(cruzamento, index, imagemBragantino)
          ))}
        </div>
        {selectedCruzamento && (
          <div className="cruzamento-info-string">
            {`Cruzamento #${(selectedCruzamento.id).toString().padStart(3, '0')}`}
          </div>)}
        <div className="video-container" style={{ maxWidth: '100%', margin: '0 auto', paddingTop: '25%', position: 'relative' }}>
          <ReactPlayer
            ref={playerRef}
            url="https://www.youtube.com/watch?v=vqguX62PKFg"
            playing={isPlaying}
            controls
            width="94.85%"
            height="99%"
            style={{ position: 'absolute', top: '55%', left: '47.5%', transform: 'translate(-50%, -45%)', border: 'none', outline: 'none' }}
            onProgress={handleVideoProgress}
          />
        </div>
        {exibirDetalhesCruzamento()}
      </div>
    </div>
    </>
  );
}

