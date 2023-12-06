import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; 
const Partidas = () => {
  return (
    <div>
      <Header />
        <h1>Partidas</h1>
            <p><Link to="/rupturas">Rupturas</Link></p>
            <p><Link to="/cruzamentos">Cruzamentos</Link></p>
    </div>
  );
}

export default Partidas;