// BuyButton.jsx
import React, { useContext } from "react";
import Button from 'react-bootstrap/Button'
import { TicketContext } from "../context/TicketContext";

const BuyButton = () => {
  const { handleCompra } = useContext(TicketContext);

  const comprarTicket = () => {
    handleCompra(1);
  };

  return (
    <Button className="btn-pink" onClick={comprarTicket}>
     Comprar!
    </Button>
  );
};

export default BuyButton;
