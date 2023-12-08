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
  const [selectedZona, setSelectedZona] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
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
      const [hours, minutes, seconds] = selectedRuptura.instante_ruptura.split(':').map(Number);
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
      const nomesJogadoresDefesa = selectedRuptura.nomes_jogadores_defesa || '';
  
      const dividirNomes = () => {
        const nomesIndividuais = [];
        let nomeAtual = '';
  
        for (let i = 0; i < nomesJogadoresDefesa.length; i++) {
          if (/[A-Z]/.test(nomesJogadoresDefesa[i])) {
            if (nomeAtual !== '') {
              nomesIndividuais.push(nomeAtual);
            }
            nomeAtual = nomesJogadoresDefesa[i];
          } else {
            nomeAtual += nomesJogadoresDefesa[i];
          }
        }
  
        if (nomeAtual !== '') {
          nomesIndividuais.push(nomeAtual);
        }
  
        return nomesIndividuais;
      };
  
      const nomesIndividuais = dividirNomes();
  
      return (
        <div className="detalhes-ruptura">
          <h2>DETALHES DA RUPTURA</h2>
          <div className='detalhes-ruptura-dados'>
            <div className='detalhes-ruptura-1'>
              <h3>Posse de bola</h3>
              <p>{selectedRuptura.nome_jogador_posse_bola}</p>
              <h3>Jogador ruptura</h3>
              <p>{selectedRuptura.nome_jogador_ruptura}</p>
            </div>
            <div className='detalhes-ruptura-2'>
              <h3>Jogadores defesa</h3>
              {nomesIndividuais.map((nome, index) => (
                <p key={index}>{nome}</p>
              ))}
            </div>
            <div className='detalhes-ruptura-3'>
              <h3>Desfecho</h3>
              <p>{selectedRuptura.desfecho}</p>
            </div>
          </div>
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
      <div className="botao-cruzamento-container">
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
        <div className='container'>
          <div className="visao-gera_rupturas">
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
            <h2 className='rupturas-title'>Rupturas</h2>
            <h3 className='permanencia-rupturas'>Permanência nas sub-zonas</h3>
            <div className="campo-futebol-ruptura">
              <img src="campo-ruptura.jpeg" alt="Campo de futebol" />
            </div>
            <div className='dados-cruzamento-campo'>
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
                <ul className='list'>
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

            <div>
              <label htmlFor="zona">Zona:</label>
              <select name="zona" id="zona" value={selectedZona} onChange={(e) => setSelectedZona(e.target.value)}>
                <option value="">Todos</option>
                {rupturasArray[0] && [...new Set(rupturasArray[0].map(ruptura => ruptura.zona_defesa))].map((zona, index) => (
                  <option key={index} value={zona}>{zona}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tipo">Tipo:</label>
              <select name="tipo" id="tipo" value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
                <option value="">Todos</option>
                {rupturasArray[0] && [...new Set(rupturasArray[0].map(ruptura => ruptura.desfecho))].map((desfecho, index) => (
                  <option key={index} value={desfecho}>{desfecho}</option>
                ))}
              </select>
            </div>

            <h3 className='textos-informacao-h3-rup'>Lista de Rupturas</h3>
            <div className="lista-lances-rup">
              {rupturasArray[0] && rupturasArray[0]
                .filter(ruptura => (
                  (selectedZona === '' || ruptura.zona_defesa === selectedZona) &&
                  (selectedTipo === '' || ruptura.desfecho === selectedTipo)
                ))
                .map((filteredRuptura, index) => (
                  BotaoRuptura(filteredRuptura, index)
                ))}
            </div>

            {selectedRuptura && (
              <div className="ruptura-info-string">
                {`Ruptura #${(selectedRuptura.id).toString().padStart(3, '0')}`}
              </div>
            )}

            <div className="video-container-rupturas" style={{ maxWidth: '100%', margin: '0 auto', paddingTop: '25%', position: 'relative' }}>
              <ReactPlayer
                ref={playerRef}
                url="https://www.youtube.com/watch?v=vqguX62PKFg"
                playing={isPlaying}
                controls
                width="92.7%"
                height="84%"
                style={{ position: 'absolute', top: '50%', left: '46.35%', transform: 'translate(-50%, -52.5%)', border: 'none', outline: 'none' }}
                onProgress={handleVideoProgress}
              />
            </div>
          {exibirDetalhesRuptura()}
        </div>
      </div>
    </>
  );
}
