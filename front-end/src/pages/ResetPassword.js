import React, { useState } from 'react';
import NotHeader from './NotHeader';
import './style/Partidas.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRedefinirClick = async () => {
    try {
      // Realize um pedido ao servidor para redefinir a senha usando o email
      const response = await fetch('http://127.0.0.1:8080/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Verifique se a resposta foi bem-sucedida
      if (response.ok) {
        setFeedbackMessage('Um link de redefinição de senha foi enviado para o seu email.');
      } else {
        // Se a resposta não foi bem-sucedida, exiba uma mensagem de erro
        const data = await response.json();
        setFeedbackMessage(data.message || 'Ocorreu um erro ao processar sua solicitação.');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação de redefinição de senha:', error);
      setFeedbackMessage('Ocorreu um erro ao processar sua solicitação.');
    }
  };

  return (
    <div>
      <NotHeader />
      <div className="redefinir-container">
        <h2>Redefinir Senha</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <button onClick={handleRedefinirClick}>Redefinir Senha</button>
        {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      </div>
    </div>
  );
}