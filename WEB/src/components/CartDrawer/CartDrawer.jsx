import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "antd";
import "./CartDrawer.css";

const CartDrawer = ({
  isOpen,
  onClose,
  cantidadTickets,
  sumarTicket,
  restarTicket,
  ticketResumen,
  totalCompra,
}) => {
  return (
    isOpen && (
      <div className="cart-menu">
        <div className="drawer-header">
          <h3>Carrito de compras</h3>
          <button className="drawer-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <Carousel autoplay style={{ height: "15em ", marginBottom: "5em" }}>
          <div>
            <img
              src="https://i.pinimg.com/736x/45/a2/bd/45a2bd8ff5413360222defb7c69a7a93.jpg"
              alt="Imagen 1"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/23/33/71/2333712fabe6078f28d05f6e1c181bfb.jpg"
              alt="Imagen 2"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/cb/ba/2d/cbba2d80077dc92c9b0d6e522acd31d2.jpg"
              alt="Imagen 3"
            />
          </div>
        </Carousel>
        <div style={{}}>
          <h3>Cuántos tickets quieres comprar?</h3>
        </div>
        <div className="ticket-container" style={{ display: "flex" }}>
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
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Ir a Comprar
        </NavLink>
      </div>
    )
  );
};

export default CartDrawer;
