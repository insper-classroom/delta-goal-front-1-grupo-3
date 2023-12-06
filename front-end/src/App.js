import { Navigate, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Rupturas from './pages/Rupturas';
import Cruzamentos from './pages/Cruzamentos';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import UpdateSenha from './pages/UpdateSenha';
import Partidas from './pages/Partidas';

import ProtectedRoutes from './functions/ProtectedRoutes';
import CheckToken from './functions/CheckToken';

const isAuthenticated = async () => {
  return await CheckToken();
}

function App() {
  return (
    <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-senha" element={<UpdateSenha />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}> 
            <Route path="/partidas" element={<Partidas />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rupturas" element={<Rupturas />} />
            <Route path="/cruzamentos" element={<Cruzamentos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    );
}

export default App;