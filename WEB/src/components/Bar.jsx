import React from "react";
import { NavLink } from "react-router-dom";
import { useTicket } from "../context/TicketContext";

const Navbar = () => {
  const { cantidadTickets } = useTicket(); // Consumir el contexto

  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  console.log("Cantidad de tickets:", cantidadTickets);

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
              Carrito{" "}
              {cantidadTickets !== undefined && (
                <span>({cantidadTickets})</span>
              )} 
              {/* Aquí mostramos la cantidad de tickets seleccionados por el cliente solo si  es mayor a  0  */}
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
