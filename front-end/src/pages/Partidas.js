import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style/Partidas.css';

export default function Partidas() {
  const [lances, setLances] = useState([]);

  useEffect(() => {
    const fetchLances = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTI2NDQzMiwianRpIjoiMjlkZjJkMDMtMTVkYi00MmQ4LTkzNTQtZmFhN2JjOTZjZjE5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY1NjczYWEyYjhhOTdlMDg1YjE3MDQ3NSIsIm5iZiI6MTcwMTI2NDQzMiwiZXhwIjoxNzAxMjY1MzMyfQ.xONFqT9iCuJuUMeZPpT00SP17cqGLwkuhd29S5aw3oI";

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
          "jogo": "Palmeiras x Red Bull Bragantino",
          "time": "Red Bull Bragantino"
        });

        // Substitua 'YOUR_API_ENDPOINT' pela URL correta da sua API
        const response = await fetch("http://127.0.0.1:8080/rupturas_lista", {
          method: 'GET',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        });

        if (response.ok) {
          const data = await response.json();
          setLances(data);
        } else {
          console.error('Erro ao buscar lances:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    // Chama a função para buscar os lances quando o componente monta
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
          <div className="envolvidos">Jogadores Envolvidos</div>
          <div className="desfechos">Desfechos</div>
        </div>

        <div className="lista-lances">
          Lista de Lances
          {lances.map((lance) => (
            <p key={lance.id}>{lance.descricao}</p>
          ))}
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
