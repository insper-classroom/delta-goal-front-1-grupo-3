import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './components/Home/Home';
import Time from './components/Time/Time';
import Partidas from './components/Partidas/Partidas';
import Login from './components/Login/Login';

function Rotas() {
  const [token, setToken] = useState();

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