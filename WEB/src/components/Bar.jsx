import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cantidadTickets, setCantidadTickets, handleCompra } = useContext(TicketContext); // Consumir el contexto utilizando useContext  const [carritoAbierto, setCarritoAbierto] = useState(false); // Estado para controlar si el menú del carrito está abierto
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  const sumarTicket = () => {
    handleCompra(1); // Llama a la función del contexto para agregar un ticket
  };

  const restarTicket = () => {
    // Asegúrate de que la cantidad de tickets sea mayor que 0 antes de restar
    if (cantidadTickets > 0) {
      handleCompra(-1); // Aquí deberías pasar -1 para restar un ticket
    }
  };

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
            <a className="cart-icon" onClick={toggleCarrito}>
              <FaShoppingCart />
              {cantidadTickets !== undefined && cantidadTickets > 0 && (
                <span>({cantidadTickets})</span>
              )}
            </a>
            {carritoAbierto && (
              <div className="cart-menu">
                <div className="ticket-container">
                <button className="btn-pink" onClick={sumarTicket}>
                  +
                </button>
                <p> {cantidadTickets}</p>
                <button className="btn-pink" onClick={restarTicket}>
                  -
                </button>
                </div>
                <NavLink className="btn-pink" to="/compra">
                  Ir a Comprar
                </NavLink>
              </div>
            )}
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
