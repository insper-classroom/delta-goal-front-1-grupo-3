import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CheckToken from './CheckToken.js'; 

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const checkLogin = useCallback(async () => {
    const authenticated = await CheckToken();

    if (authenticated) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return isAuthenticated ? <Outlet /> : null;
}
