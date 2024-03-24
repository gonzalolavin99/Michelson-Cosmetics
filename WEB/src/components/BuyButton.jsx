// BuyButton.jsx
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { TicketContext } from '../context/TicketContext';

const BuyButton = () => {
  const { handleCompra } = useContext(TicketContext);

  const comprarTicket = () => {
    handleCompra(1);
  };

  return (
    <div>
      <div>
        <Button className="btn-pink" onClick={comprarTicket}>
          <div className="btn-text">Comprar!</div>
        </Button>
      </div>
    </div>
  );
};

export default BuyButton;