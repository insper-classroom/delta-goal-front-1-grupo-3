import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css'; 
import Logout from '../functions/Logout';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/rupturas">Rupturas</Link></li>
          <li><Link to="/cruzamentos">Cruzamentos</Link></li>
          <li><Logout /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
