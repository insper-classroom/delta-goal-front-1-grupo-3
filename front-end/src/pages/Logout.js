import React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cookies = new Cookies();

const Logout = () => {
    const navigate = useNavigate();
    const token = cookies.get('token')

    const handleLogout = (e) => {
        e.preventDefault();
        axios
        .post(('http://localhost:8080/logout'), {
            token 
        })
        .then((response) => { 
            console.log(response)
            cookies.remove('token', {path: '/'});
            sessionStorage.removeItem('token');
            navigate('/login');
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <button variant='danger' onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;