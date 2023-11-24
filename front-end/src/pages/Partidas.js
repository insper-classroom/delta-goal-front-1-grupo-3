import React from 'react';
import Header from './Header';
import './style/Partidas.css'; // Importando o CSS para o componente Partidas

export default function Partidas() {
  return (
    // Fragmento React, representado por <></>, para envolver múltiplos elementos sem adicionar uma nova div ao DOM
    <>
      <Header />
      <div className="container">
        {/* Container principal para a página de Partidas */}
        <div className="visao-geral">
            <div className="campo-futebol">
                <div class="goal top-goal"></div>
                <div class="center-circle"></div>
                <div class="goal bottom-goal"></div>  
                <div class="field top-area"></div>
                <div class="field bottom-area"></div>
                <div class="middle-line"></div>
                <div class="corners"></div>
                <div class="lines"></div>
            </div>
            <div className="destaques">Destaques</div>
            <div className="envolvidos">Jogadores Envolvidos</div>
            <div className="desfechos">Desfechos</div>
        </div>

        <div className="lances">
            <div className="lista-lances">Lista de Lances</div>
            <div className="video-container">
                {/* Placeholder para o vídeo - substitua 'path_to_your_video.mp4' pelo caminho correto do seu vídeo */}
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

