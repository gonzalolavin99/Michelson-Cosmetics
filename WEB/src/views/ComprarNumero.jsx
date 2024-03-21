import React, { useState, useContext } from "react";
import BuyButton from "../components/BuyButton";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../context/TicketContext"; // Importar el contexto

const ComprarNumero = () => {
  const [compraExitosa, setCompraExitosa] = useState(false);
  const navigate = useNavigate();
  const { setCantidadTickets } = useContext(TicketContext); // Obtener setCantidadTickets desde el contexto

  const handleCompra = () => {
    // Incrementa la cantidad de tickets
    setCantidadTickets((prevCantidad) => prevCantidad + 1);

    // Navigate to the `CompraExitosa` view
    navigate('/compra-exitosa');

    // Update purchase successful state
    setCompraExitosa(true);
  };

  return (
    <div>
      {/* Botón "Paga aquí" que llama a la función handleCompra */}
      <button className="btn-pink" onClick={handleCompra}>Paga aquí</button>

      {/* Botón "No pagues aquí" (opcional) */}
      <button className="btn-pink">No pagues aquí!</button>
    </div>
  );
};

export default ComprarNumero;