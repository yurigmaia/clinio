// src/App.js

import React from 'react';
import Login from './components/Login';

const App = () => {
  const handleLogin = (cpf, password) => {
    console.log('Logging in with', cpf, password);
    // Lógica de autenticação aqui
  };

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default App;
