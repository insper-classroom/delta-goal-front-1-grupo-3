import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style/Cruzamentos.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Partidas() {
  const [lances, setLances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLances = async () => {
      try {
        // Obter todos os cookies do navegador
        const token = cookies.get('token');
        console.log(token)
        const response = await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/cruzamentos_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          redirect: 'follow',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setLances(data);
        } else {
          setError(`Erro ao buscar lances: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Erro na requisição: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLances();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {/* Container principal para a página de Partidas */}
        <div className="visao-geral">
          <div className="campo-futebol">
                <img src="campocru.png" alt="Campo de futebol" />
          </div>
          <div className="destaques">Destaques</div>
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

