import React from "react";
import BuyButton from "../components/BuyButton";

const ComprarNumero = ({ setCantidadTickets }) => {
  const handleCompra = () => {
    setCantidadTickets((prevCantidad) => prevCantidad + 1);
  };

  return (
    <div>
      <BuyButton onClick={handleCompra} />
    </div>
  );
};

export default ComprarNumero;
