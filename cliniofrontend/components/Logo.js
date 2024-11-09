// src/components/Logo.js

import React from 'react';
import logo from '../assets/logo.svg'; // Importando o logo

const Logo = () => (
  <img src={logo} alt="clinio logo" className="logo" />
);

export default Logo;
