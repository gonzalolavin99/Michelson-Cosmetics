import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import { FaShoppingCart } from "react-icons/fa";
import CartDrawer from "./CartDrawer/CartDrawer.jsx";


const Navbar = () => {
  const { cantidadTickets, setCantidadTickets, handleCompra } =
    useContext(TicketContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketResumen, setTicketResumen] = useState("");
  const [totalCompra, setTotalCompra] = useState(0);


  useEffect(() => {
    // Generar el resumen y calcular el total de la compra
    if (cantidadTickets > 0) {
      const total = cantidadTickets * 5000; // Costo de cada ticket en pesos chilenos
      setTotalCompra(total);
      setTicketResumen(`Estás comprando ${cantidadTickets} ticket(s)`);
    } else {
      setTotalCompra(0);
      setTicketResumen(""); // Limpiar el resumen si no hay tickets
    }
  }, [cantidadTickets]);

  const sumarTicket = () => {
    handleCompra(1);
  };

  const restarTicket = () => {
    if (cantidadTickets > 0) {
      handleCompra(-1);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/compra"
            >
              Compra tu número
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/premios"
            >
              Premios
            </NavLink>
          </li>
          <li className="nav-item">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "36%",
                padding: "0.5em",
                backgroundColor: "#ffc0cb",
              }}
            >
              <a className="cart-icon" onClick={toggleDrawer}>
                <FaShoppingCart style={{ fontSize: "0.9em" }} />
              </a>
              {cantidadTickets > 0 && (
                <span style={{ marginLeft: "0.5em" }}>{cantidadTickets}</span>
              )}
            </div>
            {/* Renderizar el componente CartDrawer */}
            <CartDrawer
              isOpen={isDrawerOpen}
              onClose={toggleDrawer}
              cantidadTickets={cantidadTickets}
              sumarTicket={sumarTicket}
              restarTicket={restarTicket}
              ticketResumen={ticketResumen}
              totalCompra={totalCompra}
            />
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/galeria"
            >
              Galería
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/terminos"
            >
              Términos y condiciones
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
