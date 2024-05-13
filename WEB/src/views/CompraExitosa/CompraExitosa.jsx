import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './CompraExitosa.css';

const CompraExitosa = () => {
  const { state } = useLocation();
  const { formData } = state;
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    if (!componentMounted) {
      Toastify({
        text: "¡Compra exitosa! Gracias por tu compra.",
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffc0cb",
          color: "#000000",
        },
      }).showToast();
      setComponentMounted(true);
    }
  }, [componentMounted]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="compra-exitosa-container">
        <Row>
          <Col md={8} className="mx-auto">
            <div className="compra-exitosa-content">
              <h2 className="compra-exitosa-titulo">¡Compra exitosa!</h2>
              <h3 className="compra-exitosa-subtitulo">Gracias por tu compra {formData.name}</h3>
              <h4 className="compra-exitosa-texto">En unos minutos te llegará un correo electrónico con los datos de tu ticket, aquí están los detalles de tu ticket:</h4>
              <div className="compra-exitosa-detalles">
                <p>Número de ticket</p>
                <p>Nombre: {formData.name}</p>
                <p>RUT: {formData.rut}</p>
                <p>Correo electrónico: {formData.email}</p>
                <p>Teléfono: {formData.phone}</p>
                
                <p>Comuna: {formData.commune}</p>
                <p>Calle: {formData.street}</p>
                <p>Número de casa: {formData.houseNumber}</p>
                <p></p>

              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CompraExitosa;