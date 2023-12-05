import React, { useState, useEffect } from 'react';
import { fetchDestaques, fetchLances, fetchDesfechos } from './Requisicoes.js';
import Header from './Header';
import './style/Rupturas.css';

const Rupturas = () => {
  const [rupturas, setRupturas] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [desfechos, setDesfechos] = useState([]);
  const [selectedRuptura, setSelectedRuptura] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoPausedAtEnd, setVideoPausedAtEnd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destaquesData = await fetchDestaques(selectedTeam);
        setDestaques(destaquesData);
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

  const convertToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleVideoTimeUpdate = (currentTime) => {
    setVideoTime(currentTime);

    if (selectedRuptura) {
      const rupturaStartTime = convertToSeconds(selectedRuptura.inicio_ruptura);
      const fiveSecondsBefore = rupturaStartTime - 5;
      const fiveSecondsAfter = rupturaStartTime + 5;

      if (currentTime < fiveSecondsBefore || currentTime > fiveSecondsAfter) {
        const videoElement = document.getElementById('videoPlayer');
        videoElement.currentTime = fiveSecondsBefore;

        if (!videoPausedAtEnd) {
          videoElement.pause();
        }
      }
    }
  };

  const handleRupturaButtonClick = (index) => {
    const selectedRuptura = rupturasArray[0][index];
    setSelectedRuptura(selectedRuptura);

    if (videoTime !== 0) {
      const videoElement = document.getElementById('videoPlayer');
      const rupturaStartTime = convertToSeconds(selectedRuptura.inicio_ruptura);
      const desiredTime = Math.max(rupturaStartTime - 5, 0);
      videoElement.currentTime = desiredTime;
      videoElement.play();
      setVideoPausedAtEnd(false);
    }
  };

  const handleVideoEnded = () => {
    setVideoPausedAtEnd(true);
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
          <div className="container">
            <div className="visao-geral">
              <h2>Visão Geral:</h2>
              <div className="campo-futebol">
                <img src="campo.png" alt="Campo de futebol" />
              </div>
              <div className="destaques">
                <h2>Maior número de rupturas:</h2>
                <ul>
                  {destaquesArray[0] &&
                    destaquesArray[0].map((destaque, index) => (
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
                {rupturasArray[0] &&
                  rupturasArray[0].map((ruptura, index) => (
                    <button
                      className={`button-site ${selectedRuptura === ruptura ? 'button-selected' : ''}`}
                      key={index}
                      value={index}
                      onClick={() => handleRupturaButtonClick(index)}
                    >
                      {ruptura.inicio_ruptura}
                    </button>
                  ))}
              </div>

              <div className="video-container">
                {selectedRuptura && (
                  <video
                    id="videoPlayer"
                    controls
                    onTimeUpdate={(e) => handleVideoTimeUpdate(e.target.currentTime)}
                    onEnded={handleVideoEnded}
                  >
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/sprint-966a1.appspot.com/o/Jogo_Palmeiras_x_Bragantino.mp4?alt=media&token=1b61f300-d986-49b0-89fb-eb0c150fb95a"
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>
                )}
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
};

export default Rupturas;