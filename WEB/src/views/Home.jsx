// Home.jsx
import React, { useContext } from "react";
import { TicketContext } from "../context/TicketContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Banner } from "../components/banner/Banner";

const Home = () => {
  const { handleCompra } = useContext(TicketContext);

  return (
    <Row className="m-4">
      <Col>
        <Banner />
      </Col>
    </Row>
  );
};

export default Home;
