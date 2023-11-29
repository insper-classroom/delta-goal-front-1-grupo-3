import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css'; 
import Logout from './Logout';

const Header = () => {
  return (
    <>
      <header>
        <img src="delta_goal_logo.png" alt="logo" />
        <button className="head"><a>Home</a></button>
        <button className="head"><a>Início</a></button>
        <button className="head"><a>Partidas</a></button>
        <button className="sair"><a>Logout</a></button>
      </header>
      <h1>
        Seja bem-vindo!
      </h1>
    </>
  );
}

export default Header;
