import React from "react";
import BuyButton from "./BuyButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IgButton from "./IgButton";
import "../index.css";


const Info = () => {
  return (
    <>
    <Row>
      <Col className="text-center align-items-center align-content-center col-info">
        <h3>ESTE AUTO PUEDE SER TUYO!</h3>
        <p>
          Participa de un juego muy fácil y participa por este Suzuki Swift!
        </p>
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

export default Info;
