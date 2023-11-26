import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import React from 'react';
const cookies = new Cookies();

export default function ProtectedRoutes() {
  const isAuthenticated = cookies.get('token');
  const location = useLocation();

  return (
    isAuthenticated ? 
        <Outlet /> 
      : <Navigate to={{ pathname: '/login', state: { from: location } }} />
      );

}