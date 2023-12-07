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
        .post(('https://sprint-deltago-5179309dcfcb.herokuapp.com/logout'), {"token": token}, 
        { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then((response) => { 
            console.log(response)
            cookies.remove('token', {path: '/'});
            navigate('/login');
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <button className="logout-button" variant='danger' onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;