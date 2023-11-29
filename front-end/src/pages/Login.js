import React, { useState } from 'react';
import { Form, Button,Alert } from 'react-bootstrap';
import axios from 'axios';
import './style/Login.css'; 
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        cookies.set("token", response.data.token, { path: "/" });
        window.location.href = "/home";
        sessionStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setError("Credenciais não conferem. Confirme seu email e senha.");
      });
  }

  return (
    <div className="caixa">
      <img src="delta_goal_logo.png" alt="logo" />
      <div className="circle"></div>
      <div className="login">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Enviar</button>

          <div className="redefinicao_senha">
            <label>Esqueceu sua senha? Redefinir </label>
            <input type="hidden" />
          </div>
        </form>
      </div>
    </div>
  );
}