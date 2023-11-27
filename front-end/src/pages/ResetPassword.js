import React, { UseState }from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/reset-password', {
                email,
            })
            .then((response) => {
                console.log(response);
                setMessage(response.data.message);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
        <h2>Password Reset</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleResetRequest}>Request Password Reset</button>
        <p>{message}</p>
      </div>
    )
    }