import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
  const { cantidadTickets, setCantidadTickets, handleCompra } =
    useContext(TicketContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketResumen, setTicketResumen] = useState("");
  const [totalCompra, setTotalCompra] = useState(0);
  const drawerRef = useRef(null);

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
            {isDrawerOpen && (
              <div
                className="cart-menu"
                ref={drawerRef}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "300px",
                  height: "100%",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  padding: "20px",
                  overflow: "auto",
                  zIndex: 1000,
                }}
              >
                <div className="drawer-header">
                  <h3>Carrito de compras</h3>
                  <button
                    className="drawer-close"
                    onClick={toggleDrawer}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div className="ticket-container">
                  <button className="btn-pink" onClick={sumarTicket}>
                    +
                  </button>
                  <p>{cantidadTickets}</p>
                  <button className="btn-pink" onClick={restarTicket}>
                    -
                  </button>
                </div>
                {/* Mostrar el resumen solo si la cantidad de tickets es mayor que 0 */}
                {cantidadTickets > 0 && (
                  <>
                    <p>{ticketResumen}</p>
                    <p>Total: ${totalCompra}</p>
                  </>
                )}
                <NavLink
                  to="/compra"
                  className="btn-pink"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  Ir a Comprar
                </NavLink>
              </div>
            )}
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
