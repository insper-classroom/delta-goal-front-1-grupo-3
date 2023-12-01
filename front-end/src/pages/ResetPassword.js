import React, { useState } from 'react';
import logoPrincipal from './img/DeltaGoalPrincipal.png';
import './style/ResetPassword.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRedefinirClick = async () => {
    try {
      // Realize um pedido ao servidor para redefinir a senha usando o email
      const response = await fetch('https://sprint-deltago-5179309dcfcb.herokuapp.com/reset-password', {
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
    <div className="reset-container">
      <div className="reset-wrapper">
        <div className="logo-container">
          <img src={logoPrincipal} alt='logo'/>
        
          <div className="logo-text">
            <h1 id='logo-text'>Redefinir Senha</h1>
            <div className="redefinir-container">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Digite seu email'/>
              </div>
              <button className="reset-button" onClick={handleRedefinirClick}>Redefinir Senha</button>
              {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
            </div>
          </div>
          </div>
      </div>
      <footer>
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}