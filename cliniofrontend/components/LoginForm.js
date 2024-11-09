// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        username: cpf,
        password: password,
      });
      console.log(response.data); // Resposta do backend
      onLogin(cpf, password); // Redireciona para a tela Home
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <input 
          type="text" 
          id="cpf" 
          value={cpf} 
          placeholder="CPF" 
          onChange={(e) => setCpf(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          placeholder="Senha" 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
