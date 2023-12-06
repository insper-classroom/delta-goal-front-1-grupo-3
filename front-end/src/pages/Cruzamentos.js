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
    legend: "none",
  };

  const teams = ["Palmeiras", "Red Bull Bragantino"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const team of teams) {
          const lances = await fetchLancesCruzamentos(team);
          const destaques = await fetchDestaquesCruzamentos(team);
          const cruzamentos = await fetchCruzamentos(team);
          if (team === "Palmeiras") {
            setLancesPalmeiras(lances);
            setDestaquesPalmeiras(destaques);
            setCruzamentosPalmeiras(cruzamentos);
          }
          else {
            setLancesBragantino(lances);
            setDestaquesBragantino(destaques);
            setCruzamentosBragantino(cruzamentos);
          }
        }
      } catch (error) {
        console.log(error); 
      }
    };
    fetchData();
  }, []);

  const CruzamentosPalmeirasArray = Object.values(cruzamentosPalmeiras);
  const CruzamentosBragantinoArray = Object.values(cruzamentosBragantino);
  const DestaquesPalmeirasArray = Object.values(destaquesPalmeiras);
  const DestaquesBragantinoArray = Object.values(destaquesBragantino);

  return (
    <>
      <Header />
      <div className="container">
        <div className="visao-geral-cruz">
          <h2>Visão Geral</h2>
          <div className="campo-futebol"><img src="campo.png" alt="Campo de futebol" /></div>
          
          <div className="detalhes-cruzamentos">
            <div className="infos-palmeiras">
              <div className='destaques-sep'>
                <h3>Destaques SEP</h3>
                <ul>
                  {DestaquesPalmeirasArray[0] && DestaquesPalmeirasArray[0].map((destaque, index) => (
                    <li key={index} value={index}>
                    {destaque.nome} - {destaque.cruzamentos}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='envolvidos-sep'>
                <h3>Jogadores envolvidos SEP</h3>
              </div>
              <div className='desfechos-sep'>
                <h3>Desfechos SEP</h3>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={lancesPalmeiras}
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
              </div>
              <div className='desfechos-red'>
                <h3>Desfechos RED</h3>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={lancesBragantino}
                  options={options}
                />
              </div>
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

