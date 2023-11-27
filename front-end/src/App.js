import { Navigate, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Time from './pages/Time';
import Partidas from './pages/Partidas';
import Login from './pages/Login';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const isAuthenticated = () => {
  return !!cookies.get('token');
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