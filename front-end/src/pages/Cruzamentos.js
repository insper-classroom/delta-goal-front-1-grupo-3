import React, { useState, useEffect } from 'react';
import { fetchLancesCruzamentos, fetchDestaquesCruzamentos, fetchCruzamentos } from '../functions/Requisicoes.js';
import { Chart } from "react-google-charts";
import Header from './Header';
import './style/Cruzamentos.css';

export default function Partidas() {
  const [lancesPalmeiras, setLancesPalmeiras] = useState([]);
  const [lancesBragantino, setLancesBragantino] = useState([]);
  const [destaquesPalmeiras, setDestaquesPalmeiras] = useState([]);
  const [destaquesBragantino, setDestaquesBragantino] = useState([]);
  const [cruzamentosPalmeiras, setCruzamentosPalmeiras] = useState([]);
  const [cruzamentosBragantino, setCruzamentosBragantino] = useState([]);

  const [selectedCruzamento, setSelectedCruzamento] = useState(null);

  const options = {
    title: "Cruzamentos dos Jogadores",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Cruzamentos",
      minValue: 0,
    },
    vAxis: {
      title: "Jogadores",
    },
  }; 

  const teams = ["Palmeiras", "Red Bull Bragantino"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const team of teams) {
          const JsonData = await fetchLancesCruzamentos(team);
          const destaques = await fetchDestaquesCruzamentos(team);
          const cruzamentos = await fetchCruzamentos(team);
          const data = [["jogadores", "cruzamentos"]]
          if (team === "Palmeiras") {
            JsonData.jogadores.forEach((jogador) => {
              data.push([jogador.nome_jogador, jogador.cruzamentos])
            })
            setLancesPalmeiras(data);
            setDestaquesPalmeiras(destaques);
            setCruzamentosPalmeiras(cruzamentos);
          }
          else {
            JsonData.jogadores.forEach((jogador) => {
              data.push([jogador.nome_jogador, jogador.cruzamentos])
            })
            setLancesBragantino(data);
            setDestaquesBragantino(destaques);
            setCruzamentosBragantino(cruzamentos);
          }
        }
      } catch (error) {
        console.log(error); 
      }
    };
    fetchData();
  }, );

  const CruzamentosPalmeirasArray = Object.values(cruzamentosPalmeiras);
  const CruzamentosBragantinoArray = Object.values(cruzamentosBragantino);
  const DestaquesPalmeirasArray = Object.values(destaquesPalmeiras);
  const DestaquesBragantinoArray = Object.values(destaquesBragantino);

  return (
    <>
      <Header />
      <div className="container">
        <div className="visao-geral">
          <div className="campo-futebol"><img src="campo.png" alt="Campo de futebol" /></div>

          <div className="destaques-cruzamentos">
            <div className="destaques-palmeiras">
              <h3>Destaques SEP</h3>
              <ul>
                {DestaquesPalmeirasArray[0] && DestaquesPalmeirasArray[0].map((destaque, index) => (
                  <li key={index} value={index}>
                  {destaque.nome}
                  </li>
                ))}
              </ul>
            </div>
            <div className="destaques-bragantino">
              <h3>Destaques RED</h3>
              <ul>
                {DestaquesBragantinoArray[0] && DestaquesBragantinoArray[0].map((destaque, index) => (
                  <li key={index} value={index}>
                  {destaque.nome}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="envolvidos">Jogadores Envolvidos</div>
          {/* fazer os outros gráficos aqui (boa sorte luigi) */}

          <div className="grafico-barras">
            <h3>Desfechos SEP</h3>
            <div className='grafico-palmeiras'>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={lancesPalmeiras}
                options={options}
              />
            </div>
            <h3>Desfechos RED</h3>
            <div className='grafico-bragantino'>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={lancesBragantino}
                options={options}
              />
            </div>
          </div>
        </div>

      <div className='visao-geral2'>
        <h2>Lances</h2>
        <div className="lista-lances">
          {CruzamentosPalmeirasArray[0] && CruzamentosPalmeirasArray[0].map((cruzamento, index) => (
            <button 
              className={`button-site ${selectedCruzamento === cruzamento ? 'button-selected' : ''}`}
              key = {index}
              value={index}
              onClick={() => {
                const selectedCruzamento = CruzamentosPalmeirasArray[0][index]
                setSelectedCruzamento(selectedCruzamento)
              }}>
              {cruzamento.instante_cruzamento}
            </button>
          ))}
          {CruzamentosBragantinoArray[0] && CruzamentosBragantinoArray[0].map((cruzamento, index) => (
            <button 
              className={`button-site ${selectedCruzamento === cruzamento ? 'button-selected' : ''}`}
              key = {index}
              value={index}
              onClick={() => {
                const selectedCruzamento = CruzamentosBragantinoArray[0][index]
                setSelectedCruzamento(selectedCruzamento)
              }}>
              {cruzamento.instante_cruzamento}
            </button>
          ))}
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
}

