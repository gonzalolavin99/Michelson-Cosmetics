// TicketContext.jsx
import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext(); //Se crea el contexto llamado TicketContext usando la función createContext. Esto contendrá la cantidad de tickets y la función para hacer el handle.

export const TicketProvider = ({ children }) => {
  const [cantidadTickets, setCantidadTickets] = useState(0); //Aquí se crea el estado cantidadTickets que  partirá en 0 usando  useState

  const handleCompra = () => {
   // Revisa si handle compra se está ejecutando correctamente console.log("Compra realizada");
    setCantidadTickets(prevCantidadTickets => prevCantidadTickets + 1); //Este handle se encargade que se auménte en 1 la cantidad de tickets
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
