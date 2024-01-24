// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/compra">Compra tu número</Link></li>
        <li className="nav-item"><Link to="/carrito">Carrito</Link></li>
        <li className="nav-item"><Link to="/terminos">Términos y condiciones</Link></li>
        <li className="nav-item"><Link to="/galeria">Galería</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
