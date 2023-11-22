import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './components/Home/Home';
import Time from './components/Time/Time';
import Partidas from './components/Partidas/Partidas';
import Login from './components/Login/Login';
import useToken from './useToken';

const { token, setToken } = useToken();

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}
 
function Rotas() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time" element={<Time />} />
        <Route path="/partidas" element={<Partidas />} />
      </Routes>
    </Router>
  </div>
    );
}

export default Rotas;