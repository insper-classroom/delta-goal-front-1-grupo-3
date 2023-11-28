import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const checkLogin = async () => {
    try {
      const token = cookies.get('token');
      if (token) {
        const response = await axios.post('http://localhost:8080/verificar-login', {
          token,
      });
        console.log('Response:', response);
        if (response.status === 200 && response.data.message === 'Autorizado') {
          setIsAuthenticated(true);
        } else {
          console.log('Falha na autenticação:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Erro durante a verificação de autenticação:', error);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    isAuthenticated ?
      <Outlet />
      : <Navigate to={{ pathname: '/login', state: { from: location } }} />
  );
}
