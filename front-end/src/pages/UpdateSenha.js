import React, { useState } from 'react';

export default function UpdateSenha() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const response = await fetch('https://sprint-deltago-5179309dcfcb.herokuapp.com/login/update-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });
      if (response.ok) {
        setSuccessMessage('Senha alterada com sucesso!');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Ocorreu um erro ao processar sua solicitação.');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação de alteração de senha:', error);
      setErrorMessage('Ocorreu um erro ao processar sua solicitação.');
    }
  };
  return (
    <div>
      <h2>Altere Sua Senha</h2>
      <div>
        <label htmlFor="password">Nova Senha:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirme a Nova Senha:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button onClick={handleResetPassword}>Alterar Senha</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
