import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

const [cantidadTickets, setCantidadTickets] = useState(0); //Estado para almacenar la cantidad de compras

  // Función para manejar la acción de compra
const handleTickets = ()  =>  {
  // Incrementar la cantidad de compras en 1 cada vez que se presiona el botón de compra
  setCantidadTickets(cantidadTickets + 1);
}
  


  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className={setActiveClass} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={setActiveClass} to="/compra">
              Compra tu número
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={setActiveClass} to="/premios">
              Premios
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={setActiveClass} to="/carrito">
              Carrito {cantidadTickets > 0 && <span>({cantidadTickets})</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={setActiveClass} to="/galeria">
              Galería
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={setActiveClass} to="/terminos">
              Términos y condiciones
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
