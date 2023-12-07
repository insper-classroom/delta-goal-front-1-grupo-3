import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; 
import './style/Partidas.css';

const Partidas = () => {
  return (
  <>
    <Header />
      <div className='partidas-wrapper'>
        <div className='partidas-container'>
        <img src="static\media\DeltaGoalPrincipal.9381cf8841f3dc93dc2f.png" />
          <div className='partidas-content'>
              <h2>Palmeiras X Red Bull Bragantino:</h2>
                <p className='rupturas'><Link to="/rupturas">Rupturas</Link></p>
                <p className='cruzamentos'><Link to="/cruzamentos">Cruzamentos</Link></p>
          </div>
        </div>
    </div>
  </>
  );
}

export default Partidas;