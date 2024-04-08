import React from "react";
import { BuyButton, IgButton } from "./listadoExportaciones.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.css";

export const Info = () => {
  return (
    <>
      <Row>
        <Col className="text-center align-items-center align-content-center col-info">
          <h3>ESTE AUTO PUEDE SER TUYO!</h3>
          <p>Participa de un juego muy fácil y GANA este Suzuki Swift!</p>
          <BuyButton />
        </Col>
      </Row>
      <Row>
        <Col className="text-center m-3">
          <IgButton></IgButton>
        </Col>
      </Row>
    </>
  );
};
