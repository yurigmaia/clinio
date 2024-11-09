// src/components/Home.js

import React from 'react';
import './Home.css';
import Logo from './Logo'; // Reutilizando o componente de logo

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <Logo />
        <button className="sair-button">Sair</button>
      </div>
      <div className="home-sidebar">
        <ul>
          <li>Tela inicial</li>
          <li>Consultas</li>
        </ul>
      </div>
      <div className="home-main">
        <h1>Agendar nova consulta</h1>
        <button className="nova-consulta-button">Nova consulta</button>
        <div className="proxima-consulta">
          <h2>Próxima consulta</h2>
          <p>Local</p>
          <button className="qr-code-button">Baixar QR Code</button>
          <button className="cancelar-button">Desmarcar</button>
        </div>
      </div>
      <div className="home-calendar">
        <h2>Calendário</h2>
      </div>
    </div>
  );
};

export default Home;
