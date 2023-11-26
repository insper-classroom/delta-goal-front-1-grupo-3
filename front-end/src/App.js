import {  Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Time from './pages/Time';
import Partidas from './pages/Partidas';
import Login from './pages/Login';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}> 
            <Route path="/home" element={<Home />} />
            <Route path="/time" element={<Time />} />
            <Route path="/partidas" element={<Partidas />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    );
}

export default App;