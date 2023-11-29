import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style/Partidas.css';

export default function Partidas() {
  const [lances, setLances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLances = async () => {
      try {
        const responseLances = await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTI4ODEzMSwianRpIjoiYjlhNGNjNTUtNTdhMS00ZTVkLWI0ZWItMTJhMzc4NTE4ZjVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY1Njc0YjE5ODkwZmRmZjM0MmMyYzFkYSIsIm5iZiI6MTcwMTI4ODEzMSwiZXhwIjoxNzAxMjg5MDMxfQ.1-2WisDml4jkzS44IEsBM-x_E_M03cP4DlmCa1yqUQg",
          },
          redirect: 'follow',
        });

        if (responseLances.ok) {
          const data = await responseLances.json();
          console.log(data);
          setLances(data);
        } else {
          setError(`Erro ao buscar lances: ${responseLances.statusText}`);
        }
        const response_lista_rupturas= await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_lista/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTI4OTAyNCwianRpIjoiYTI4ZDJjM2MtNjg0ZC00OGY1LThjYjMtMjc3Y2Y5YmFkMWI1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY1Njc0YjE5ODkwZmRmZjM0MmMyYzFkYSIsIm5iZiI6MTcwMTI4OTAyNCwiZXhwIjoxNzAxMjg5OTI0fQ.Gq9BXAdD-S9mW1h1QrXBVCJRlpNjTj0W2K7jWZnwu8Y",
          },
          redirect: 'follow',
        });

        if (response_lista_rupturas.ok) {
          const data2 = await response_lista_rupturas.json();
          console.log(data2);
          setLances(data2);
        } else {
          setError(`Erro ao buscar lances: ${response_lista_rupturas.statusText}`);
        }
      } catch (error) {
        setError(`Erro na requisição: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    
    };

    // Faz todas as requisições
    fetchLances();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {/* Container principal para a página de Partidas */}
        <div className="visao-geral">
          <div className="campo-futebol">
            <div className="goal top-goal"></div>
            <div className="center-circle"></div>
            <div className="goal bottom-goal"></div>
            <div className="field top-area"></div>
            <div className="field bottom-area"></div>
            <div className="middle-line"></div>
            <div className="corners"></div>
            <div className="lines"></div>
          </div>
          <div className="destaques">Destaques</div>
          response_lista_rupturas: {JSON.stringify(lances)}
          <div className="envolvidos">Jogadores Envolvidos</div>
          <div className="desfechos">Desfechos</div>
        </div>

        <div className="lista-lances">
          Lista de Lances
          data: {JSON.stringify(lances)}
        </div>
        <div className="video-container">
          {/* Placeholder para o vídeo - substitua 'path_to_your_video.mp4' pelo caminho correto do seu vídeo */}
          <video controls>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
      </div>
    </>
  );
}
