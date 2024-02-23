// TicketContext.jsx
import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [cantidadTickets, setCantidadTickets] = useState(0);

  const handleCompra = () => {
    console.log("Compra realizada");
    setCantidadTickets(prevCantidadTickets => prevCantidadTickets + 1);
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
