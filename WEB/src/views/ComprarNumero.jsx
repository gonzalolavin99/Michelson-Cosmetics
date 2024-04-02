import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ComprarNumero = () => {
  const [compraExitosa, setCompraExitosa] = useState(false);
  const navigate = useNavigate();
  const { setCantidadTickets } = useContext(TicketContext);

  const handleCompra = () => {
    setCantidadTickets((prevCantidad) => prevCantidad + 1);
    navigate('/compra-exitosa');
    setCompraExitosa(true);
  };

  const handleCompraFallida = () => {
    navigate('/compra-fallida');
  };

  return (
<Row>
  <Col>
  <button className="btn-pink" onClick={handleCompra}>
        Paga aquí
      </button>
      <button className="btn-pink" onClick={handleCompraFallida}>
        No pagues aquí!
      </button>
  </Col>


</Row>

  
  );
};

export default ComprarNumero;