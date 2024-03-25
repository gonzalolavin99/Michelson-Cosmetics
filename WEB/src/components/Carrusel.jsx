import React, { useState } from 'react';
import imagen1 from '../assets/imgs/swift1.webp';
import imagen2 from '../assets/imgs/swift2.jpg';
import imagen3 from '../assets/imgs/swift3.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from "react-bootstrap/Carousel";

const Carrusel = () => {
  const [indice, setIndice] = useState(0);
  const imagenes = [imagen1, imagen2, imagen3];

  const siguienteImagen = () => {
    setIndice((indice + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setIndice((indice - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <Row className="m-4">
    <Col>
      <Carousel>
        <Carousel.Item>
          <Row >
            <Col className="text-center">
              <img alt="" src={imagen1} />
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row >
            <Col className="text-center">
              <img alt="" src={imagen2} />
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row >
            <Col className="text-center">
              <img alt="" src={imagen3} />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Col>
  </Row>
  );
};

export default Carrusel;
