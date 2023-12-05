import React from 'react';
import Header from './Header'; // Ajuste o caminho do import conforme necessário
import './style//Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="welcome-section">
      <img 
      src="static\media\DeltaGoalPrincipal.9381cf8841f3dc93dc2f.png"
      className="custom-image"
      />
        <h1>Bem-Vindo!</h1>
        <h3>
          Artificial Intelligence to monitor players{' '}
          <span className="pink-text">every</span> instant of{' '}
          <span className="blue-text">every</span> match
        </h3>
      <h4>
        Este site foi criado com o objetivo de acessar os dados dos jogos do Palmeiras
        contra o Red Bull Bragantino, com acesso às rupturas e cruzamentos dos jogadores. O usuário pode acessar os
        mesmos através das abas disponíveis.
      </h4>
      <p>
        Desenvolvedores: Gabriel Mendes, João Gabriel Faraco, Jonas Pelegrina, Leonardo Freitas, Luigi Orlandi, Nina Savoy e Manoela Saragoça.
        Estudantes de Ciência de Computação do Insper. 
      </p>
      </div>
    </div>
  );
}

export default Home;