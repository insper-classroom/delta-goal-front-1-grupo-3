import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style/Partidas.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

  export default function Partidas() {
    const [rupturas, setRupturas] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [desfechos, setDesfechos] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = cookies.get('token');

    useEffect(() => {
      const fetchDestaques = async () => {
        try {
          const response = await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
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
            setDestaques(data);
          } else {
            setError(`Erro ao buscar destaques: ${response.statusText}`);
          }
        } catch (error) {
          setError(`Erro na requisição: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchLances = async () => {
        try {
            const response = await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_lista/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
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
            setRupturas(data);
          } else {
            setError(`Erro ao buscar lances: ${response.statusText}`);
          }
        } catch (error) {
          setError(`Erro na requisição: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchDesfechos = async () => {
        try {
          const response = await fetch("https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_grafico/jogo/Palmeiras x Red Bull Bragantino/time/Red Bull Bragantino", {
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
            setDesfechos(data);
          } else {
            setError(`Erro ao buscar desfechos: ${response.statusText}`);
          }
        } catch (error) {
          setError(`Erro na requisição: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDesfechos();
      fetchDestaques();
      fetchLances();
    }, []);

  return (
    <>
      <Header />
      <div className="container">
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

          <div className="destaques">  
            Destaques
            data : {JSON.stringify(destaques)}
          </div>

          <div className="envolvidos">Jogadores Envolvidos</div>

          <div class="chart-container">
          </div>
        </div>
        <div className="lista-lances">
          Lista de Rupturas
          data: {JSON.stringify(rupturas)}
        </div>
        <div className="video-container">
          <video controls>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
      </div>
    </>
  );
}
