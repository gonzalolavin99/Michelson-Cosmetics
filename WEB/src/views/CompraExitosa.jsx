import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useEffect, useState } from 'react';

const CompraExitosa = () => {
  const { state } = useLocation();
  const { formData, regionOptions } = state;

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
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <Row>
          <Col md={8} className="mx-auto">
            <h2>¡Compra exitosa!</h2>
            <h3>En unos minutos te llegará un correo electrónico con los datos de tu ticket.</h3>
            <p>Gracias por tu compra, aquí están los detalles de tu ticket:</p>
            <p>Nombre: {formData.name}</p>
            <p>RUT: {formData.rut}</p>
            <p>Correo electrónico: {formData.email}</p>
            <p>Teléfono: {formData.phone}</p>
            <p>Región: {regionOptions.find((option) => option.value === formData.region)?.label}</p>
            <p>Comuna: {formData.commune}</p>
            <p>Calle: {formData.street}</p>
            <p>Número de casa: {formData.houseNumber}</p>
            <p>Departamento: {formData.apartment}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CompraExitosa;