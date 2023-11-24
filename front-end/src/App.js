import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container, Col, Row } from "react-bootstrap";
import ProtectedRoutes from './ProtectedRoutes';
import React from 'react';
import Home from './pages/Home';
import Time from './pages/Time';
import Partidas from './pages/Partidas';
import Login from './pages/Login';

function App() {
  return (
    <div className="wrapper">
      <Container>
        <Row>
          <Col className="text-center">
            <section id="navigation">
              <a href="/home">Home</a>
              <a href="/time">Time</a>
              <a href="/partidas">Partidas</a>
            </section>
          </Col>
        </Row>
      </Container>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/time" element={<Time />} />
          <Route path="/partidas" element={<Partidas />} />
        </Routes>
    </div>
    );
}

export default App;