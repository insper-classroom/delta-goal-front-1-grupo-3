import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css'; // Assuma que você tem um arquivo CSS para estilizar o header

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/time">Time</Link></li>
          <li><Link to="/partidas">Partidas</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
