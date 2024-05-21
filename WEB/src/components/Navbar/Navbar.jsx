import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../../context/TicketContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import CartDrawer from "../CartDrawer/CartDrawer.jsx";
import "./Navbar.css";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const { cantidadTickets, setCantidadTickets, handleCompra } = useContext(TicketContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketResumen, setTicketResumen] = useState("");
  const [totalCompra, setTotalCompra] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

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

  useEffect(() => {
    // Cerrar el Navbar cuando se cambia de ruta o se hace clic fuera de él
    const handleRouteChange = () => {
      setIsNavVisible(true);
    };

    const handleOutsideClick = (event) => {
      const navbar = document.getElementById("nav");
      if (navbar && !navbar.contains(event.target)) {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    document.addEventListener("click", handleOutsideClick);

    // Limpiar los eventos cuando se desmonte el componente
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="navbar-container">
      <button className="abrir-menu" onClick={toggleNavVisibility}>
        <TiThMenu />
      </button>
      <nav className={`navbar ${isNavVisible ? "nav-visible" : ""}`} id="nav">
        <button className="cerrar-menu" id="cerrar" onClick={toggleNavVisibility}>
          <IoCloseSharp />
        </button>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/"
              onClick={() => setIsNavVisible(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/compra"
              onClick={() => setIsNavVisible(false)}
            >
              Compra tu número
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/premios"
              onClick={() => setIsNavVisible(false)}
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
                padding: "0.2em",
                backgroundColor: "#ffc0cb",
                margin: "0",
                top: "0",
              }}
            >
              <a className="cart-icon" onClick={toggleDrawer}>
                <FaShoppingCart style={{ fontSize: "1em", paddingTop: "1px" }} />
              </a>
              {cantidadTickets > 0 && <span style={{ marginLeft: "0.5em" }}>{cantidadTickets}</span>}
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
              onClick={() => setIsNavVisible(false)}
            >
              Galería
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/terminos"
              onClick={() => setIsNavVisible(false)}
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