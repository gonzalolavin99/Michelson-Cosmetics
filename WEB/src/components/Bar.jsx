import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import { FaShoppingCart } from "react-icons/fa";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { cantidadTickets, setCantidadTickets, handleCompra } =
    useContext(TicketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  const sumarTicket = () => {
    handleCompra(1);
  };

  const restarTicket = () => {
    if (cantidadTickets > 0) {
      handleCompra(-1);
    }
  };

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
            <a className="cart-icon" onClick={onOpen}>
              <FaShoppingCart />
              {cantidadTickets !== undefined && cantidadTickets > 0 && (
                <span>({cantidadTickets})</span>
              )}
            </a>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Carrito de compras</DrawerHeader>
                <DrawerBody>
                  <div className="ticket-container">
                    <Button
                      colorScheme="pink"
                      borderRadius="15px"
                      transition="background-color 0.25s, border-color 0.25s, color 0.25s"
                      _hover={{
                        backgroundColor: "#ffc0cb",
                        color: "black",
                      }}
                      onClick={sumarTicket}
                    >
                      +
                    </Button>
                    <p>{cantidadTickets}</p>
                    <Button
                      colorScheme="pink"
                      borderRadius="15px"
                      transition="background-color 0.25s, border-color 0.25s, color 0.25s"
                      _hover={{
                        backgroundColor: "#ffc0cb",
                        color: "black",
                      }}
                      onClick={restarTicket}
                    >
                      -
                    </Button>
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    as={NavLink}
                    to="/compra"
                    colorScheme="pink"
                    borderRadius="15px"
                    transition="background-color 0.25s, border-color 0.25s, color 0.25s"
                    _hover={{
                      backgroundColor: "#ffc0cb",
                      color: "black",
                    }}
                  >
                    Ir a Comprar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
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