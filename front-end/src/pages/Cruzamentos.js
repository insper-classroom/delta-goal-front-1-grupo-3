import React, { useState, useEffect } from 'react';
import { fetchLancesCruzamentos, fetchDestaquesCruzamentos, fetchCruzamentos, fetchDesfechosCruzamentos, fetchCruzamentosPorcentagem } from '../functions/Requisicoes.js';
import { Chart } from "react-google-charts";
import Header from './Header';
import './style/Cruzamentos.css';

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
  },[]);

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
        <div className='dados_cruzamento'>
          <div className="campo-futebol"><img src="campo-cruzamento.jpeg" alt="Campo de futebol" /></div>
          <div className='dados_cruzamento_campo'>
            {/* {JSON.stringify(porcentagemPalmeiras)} */}
            {Object.entries(porcentagemPalmeiras).map(([key, value]) => (
        <div key={key} className="item">
          <span className="chave"> {key}:</span>
          <span className="valor">{value}%/</span>
        </div>
      ))}
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

