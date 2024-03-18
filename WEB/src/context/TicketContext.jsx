// TicketContext.jsx
import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext(); // Se crea el contexto llamado TicketContext usando la función createContext. Esto contendrá la cantidad de tickets y la función para manejar la compra.

export const TicketProvider = ({ children }) => {
  const [cantidadTickets, setCantidadTickets] = useState(0); // Se crea el estado cantidadTickets que partirá en 0 usando useState

  const handleCompra = (cantidad) => {
    // Revisa si handleCompra se está ejecutando correctamente console.log("Compra realizada");
    setCantidadTickets((prevCantidadTickets) => prevCantidadTickets + cantidad); // Este handle se encarga de aumentar o disminuir la cantidad de tickets según el argumento recibido
  };

  return (
    <TicketContext.Provider value={{ cantidadTickets, handleCompra }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  return useContext(TicketContext);
};
