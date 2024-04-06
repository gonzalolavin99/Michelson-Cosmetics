// Home.jsx
import React, { useContext } from 'react';
import Carrusel from '../components/Carrusel';
import { TicketContext } from "../context/TicketContext";
import Info from "../components/Info";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const { handleCompra } = useContext(TicketContext);

  return (
    <Row className="m-4">
      <Col>
        <Carrusel />
        <h1>JR Michelson</h1>
        <Info />
      </Col>
    </Row>
  );
};

export default Home;
