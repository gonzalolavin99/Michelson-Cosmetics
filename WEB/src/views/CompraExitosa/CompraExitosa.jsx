import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './CompraExitosa.css';
import { selectPersona } from "../../redux/reducer/PurchaseReducer";
import { useAppSelector } from "../../redux/hooks"

const CompraExitosa = () => {
  // const { state } = useLocation();
  // const { formData, totalTickets, totalPagar } = state;

  const persona = useAppSelector(selectPersona)
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
              <h3 className="compra-exitosa-subtitulo">Gracias por tu compra {persona.name}</h3>
              <h4 className="compra-exitosa-texto">Estamos verificando tu compra, si está todo bien, te enviaremos en unos minutos una notificación junto con el ticket a tu correo!</h4>
              <div className="compra-exitosa-detalles">
                <p>Número de ticket: {Math.floor(Math.random() * 1000000)}</p> {/* Número de ticket generado */}
                <p>Nombre: {persona.name}</p>
                <p>RUT: {persona.rut}</p>
                <p>Correo electrónico: {persona.email}</p>
                <p>Teléfono: {persona.phone}</p>
                <p>Región: {persona.region}</p>
                <p>Comuna: {persona.commune}</p>
                <p>Calle: {persona.street}</p>
                <p>Número de casa: {persona.houseNumber}</p>
                {persona.apartment && <p>Departamento: {persona.apartment}</p>}
                {/* <p>Total de tickets: {totalTickets}</p>
                <p>Total a pagar: ${totalPagar}</p> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CompraExitosa;
