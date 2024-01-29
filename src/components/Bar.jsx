// Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
  return (
    <div className="navbar-container">
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><NavLink className={setActiveClass} to="/">Home</NavLink></li>
         <li className="nav-item"><NavLink className={setActiveClass} to="/compra">Compra tu número</NavLink></li> 
        <li className="nav-item"><NavLink className={setActiveClass} to="/carrito">Carrito</NavLink></li>
        <li className="nav-item"><NavLink className={setActiveClass} to="/terminos">Términos y condiciones</NavLink></li>
        <li className="nav-item"><NavLink className={setActiveClass} to="/galeria">Galería</NavLink></li> 
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;
