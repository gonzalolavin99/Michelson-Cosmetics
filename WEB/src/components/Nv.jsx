// import React, { useState, useContext } from "react";
// import { TicketContext } from "../context/TicketContext";
// import { FaShoppingCart } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { NavLink } from "react-router-dom";

// export const Nv = () => {
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const { cantidadTickets, setCantidadTickets, handleCompra } =
//     useContext(TicketContext); // Consumir el contexto utilizando useContext  const [carritoAbierto, setCarritoAbierto] = useState(false); // Estado para controlar si el menú del carrito está abierto
//   const [carritoAbierto, setCarritoAbierto] = useState(false);
//   const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

//   const toggleCarrito = () => {
//     setCarritoAbierto(!carritoAbierto);
//   };

//   const sumarTicket = () => {
//     handleCompra(1); // Llama a la función del contexto para agregar un ticket
//   };

//   const restarTicket = () => {
//     // Asegúrate de que la cantidad de tickets sea mayor que 0 antes de restar
//     if (cantidadTickets > 0) {
//       handleCompra(-1); // Aquí deberías pasar -1 para restar un ticket
//     }
//   };

//   console.log("Cantidad de tickets:", cantidadTickets);

//   return (
//     <>
//       <Navbar expand="lg" className="bg-body-tertiary mb-3">
//         <Container fluid>
//           <Navbar.Brand>Logo</Navbar.Brand>
//           <Navbar.Toggle
//             aria-controls="offcanvasNavbar"
//             onClick={() => setShowOffcanvas(!showOffcanvas)}
//           />
//           <Navbar.Collapse id="offcanvasNavbar">
//             <Nav className="me-auto">
//               <NavLink className={setActiveClass} to="/">
//                 Home
//               </NavLink>
//               <NavLink className={setActiveClass} to="/compra">
//                 Compra tu número
//               </NavLink>
//               <NavLink className={setActiveClass} to="/premios">
//                 Premios
//               </NavLink>
//             </Nav>
//             <a className="cart-icon" onClick={toggleCarrito}>
//               <FaShoppingCart />
//               {cantidadTickets !== undefined && cantidadTickets > 0 && (
//                 <span>({cantidadTickets})</span>
//               )}
//             </a>
//             {carritoAbierto && (
//               <div className="cart-menu">
//                 <div className="ticket-container">
//                   <button className="btn-pink" onClick={sumarTicket}>
//                     +
//                   </button>
//                   <p> {cantidadTickets}</p>
//                   <button className="btn-pink" onClick={restarTicket}>
//                     -
//                   </button>
//                 </div>
//                 <NavLink className="btn-pink" to="/compra">
//                   Ir a Comprar
//                 </NavLink>
//               </div>
//             )}
//             <NavLink className={setActiveClass} to="/galeria">
//               Galería
//             </NavLink>
//             <NavLink className={setActiveClass} to="/terminos">
//               Términos y condiciones
//             </NavLink>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Offcanvas
//         show={showOffcanvas}
//         onHide={() => setShowOffcanvas(false)}
//         placement="end"
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Título</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body
//           style={{ height: "100%", display: "flex", flexDirection: "column" }}
//         >
//           <Nav className="me-auto">
//             <NavLink className={setActiveClass} to="/">
//               Home
//             </NavLink>
//             <NavLink className={setActiveClass} to="/compra">
//               Compra tu número
//             </NavLink>
//             <NavLink className={setActiveClass} to="/premios">
//               Premios
//             </NavLink>
//             <NavLink className={setActiveClass} to="/galeria">
//               Galería
//             </NavLink>
//             <NavLink className={setActiveClass} to="/terminos">
//               Términos y condiciones
//             </NavLink>
//           </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };
