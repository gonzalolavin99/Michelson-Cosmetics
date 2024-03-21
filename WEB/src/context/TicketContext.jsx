import React, { useState, createContext } from "react";

const TicketContext = createContext({
  cantidadTickets: 0,
  setCantidadTickets: () => {},
  handleCompra: () => {},
});

const TicketProvider = ({ children }) => {
  const [cantidadTickets, setCantidadTickets] = useState(0);

  const handleCompra = (cantidad) => {
    setCantidadTickets((prevCantidadTickets) => prevCantidadTickets + cantidad);
  };

  return (
    <TicketContext.Provider value={{ cantidadTickets, setCantidadTickets, handleCompra }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
export { TicketContext };