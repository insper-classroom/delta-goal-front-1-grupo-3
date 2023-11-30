import React, { useState } from 'react';
import { Form, Button,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import logoBranco from './img/DeltaGoalBranco.png';
import './style/Login.css'; 
const cookies = new Cookies();


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://sprint-deltago-5179309dcfcb.herokuapp.com/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        cookies.set("token", response.data.token, { path: "/" });
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
        setError("Credenciais não conferem. Confirme seu email e senha.");
      });
  }

  return (    
    <div className='login-wrapper'>
      <img src={logoBranco} alt='logo'/>
    
    <div className='login-text'>
      <h1 id="login-text">Login</h1>
        <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </Form.Group>
          <div className='login-button'>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <div className='reset-button'>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => navigate('/reset-password')}
            >
              Esqueci minha senha
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}