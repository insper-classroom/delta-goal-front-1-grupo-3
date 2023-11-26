import React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        cookies.remove('token', {path: '/'});
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button variant='danger' onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;