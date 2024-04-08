import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const ComprarNumero = () => {
  // Estado para controlar si la compra fue exitosa
  const [compraExitosa, setCompraExitosa] = useState(false);
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    region: "",
    commune: "",
    street: "",
    houseNumber: "",
    apartment: "",
  });
  // Estado para controlar la visualización de los datos
  const [showDataReview, setShowDataReview] = useState(false);
  const navigate = useNavigate();
  const { setCantidadTickets } = useContext(TicketContext);

  // Función para actualizar los datos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para realizar la compra
  const handleCompra = () => {
    setCantidadTickets((prevCantidad) => prevCantidad + 1);
    navigate("/compra-exitosa");
    setCompraExitosa(true);
  };

  // Función para navegar a la página de compra fallida
  const handleCompraFallida = () => {
    navigate("/compra-fallida");
  };

  // Función para mostrar los datos ingresados
  const handleShowDataReview = () => {
    // Verifica que todos los campos obligatorios estén completos
    if (
      formData.name.trim() === "" ||
      formData.rut.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.region.trim() === "" ||
      formData.commune.trim() === "" ||
      formData.street.trim() === "" ||
      formData.houseNumber.trim() === ""
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setShowDataReview(true);
  };

  // Función para confirmar la compra
  const handleConfirmPurchase = () => {
    handleCompra();
    setShowDataReview(false);
  };

  // Opciones de región
  const regionOptions = [
    { value: "", label: "Seleccione una región" },
    { value: "arica-parinacota", label: "Región de Arica y Parinacota" },
    { value: "tarapaca", label: "Región de Tarapacá" },
    { value: "antofagasta", label: "Región de Antofagasta" },
    { value: "atacama", label: "Región de Atacama" },
    { value: "coquimbo", label: "Región de Coquimbo" },
    { value: "valparaiso", label: "Región de Valparaíso" },
    { value: "metropolitana", label: "Región Metropolitana" },
    { value: "ohiggins", label: "Región de O'Higgins" },
    { value: "maule", label: "Región del Maule" },
    { value: "ñuble", label: "Región del Ñuble" },
    { value: "biobio", label: "Región del Biobío" },
    { value: "araucania", label: "Región de La Araucanía" },
    { value: "los-rios", label: "Región de Los Ríos" },
    { value: "los-lagos", label: "Región de Los Lagos" },
    { value: "aysen", label: "Región de Aysén" },
    { value: "magallanes", label: "Región de Magallanes" },
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <Row>
          <Col md={8} className="mx-auto">
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formRut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formRegion">
                <Form.Label>Región</Form.Label>
                <Form.Control
                  as="select"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                >
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCommune">
                <Form.Label>Comuna</Form.Label>
                <Form.Control
                  type="text"
                  name="commune"
                  value={formData.commune}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formStreet">
                <Form.Label>Calle</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formHouseNumber">
                <Form.Label>Número de casa</Form.Label>
                <Form.Control
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <Form.Group controlId="formApartment">
                <Form.Label>Departamento (Opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  style={{ width: '80%' }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button className="btn-pink" onClick={handleShowDataReview}>
                  Revisar datos
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Sección para mostrar los datos ingresados */}
      {showDataReview && (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div>
            <Row>
              <Col md={8} className="mx-auto">
                <h3>Revisa tus datos</h3>
                <p>Nombre: {formData.name}</p>
                <p>RUT: {formData.rut}</p>
                <p>Correo electrónico: {formData.email}</p>
                <p>Teléfono: {formData.phone}</p>
                <p>Región: {regionOptions.find((option) => option.value === formData.region)?.label}</p>
                <p>Comuna: {formData.commune}</p>
                <p>Calle: {formData.street}</p>
                <p>Número de casa: {formData.houseNumber}</p>
                <p>Departamento: {formData.apartment}</p>
                <div className="d-flex justify-content-between">
                  <Button className="btn-pink" onClick={handleConfirmPurchase}>
                    Confirmar
                  </Button>
                  <Button className="btn-pink" onClick={handleCompraFallida}>
                    No pagues aquí!
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default ComprarNumero;