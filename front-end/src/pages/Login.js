import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style/Login.css'; 
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      });
  }

  return (
    <div className='login-wrapper'>
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
            placeholder="Senha"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}