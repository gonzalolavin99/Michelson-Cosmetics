import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../../context/TicketContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import CartDrawer from "../CartDrawer/CartDrawer.jsx";
import "./Navbar.css"
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
  }

  return (
    
    <div className="navbar-container">
      <button className="abrir-menu"  onClick={toggleNavVisibility}><TiThMenu />
</button>
      <nav className={`navbar ${isNavVisible ? "nav-visible" : ""}`} id="nav">
        <button className="cerrar-menu" id="cerrar" onClick={toggleNavVisibility}><IoCloseSharp />
</button>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/compra">
              Compra tu número
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/premios">
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
                margin:"0",
                top:"0"
                
              }}
            >
              <a className="cart-icon" onClick={toggleDrawer}>
                <FaShoppingCart style={{ fontSize: "1em", paddingTop:"1px" }} />
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
            <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/galeria">
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