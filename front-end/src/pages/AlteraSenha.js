import React, { useState } from 'react';

export default function AlteraSenha() {
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
      // Verifique se as senhas coincidem
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }

      // Faça uma solicitação para o servidor para alterar a senha com o token
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch('http://127.0.0.1:8080/altera-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
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
