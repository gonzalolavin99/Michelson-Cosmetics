import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../context/TicketContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ComprarNumero = () => {
  // Estado para controlar si la compra fue exitosa
  const [compraExitosa, setCompraExitosa] = useState(false);
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
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
    setShowDataReview(true);
  };

  // Función para confirmar la compra
  const handleConfirmPurchase = () => {
    handleCompra();
    setShowDataReview(false);
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                >
                  <option value="">Seleccione una región</option>
                  <option value="arica-parinacota">
                    Región de Arica y Parinacota
                  </option>
                  <option value="tarapaca">Región de Tarapacá</option>
                  <option value="antofagasta">Región de Antofagasta</option>
                  <option value="atacama">Región de Atacama</option>
                  <option value="coquimbo">Región de Coquimbo</option>
                  <option value="valparaiso">Región de Valparaíso</option>
                  <option value="metropolitana">Región Metropolitana</option>
                  <option value="ohiggins">Región de O'Higgins</option>
                  <option value="maule">Región del Maule</option>
                  <option value="ñuble">Región del Ñuble</option>
                  <option value="biobio">Región del Biobío</option>
                  <option value="araucania">Región de La Araucanía</option>
                  <option value="los-rios">Región de Los Ríos</option>
                  <option value="los-lagos">Región de Los Lagos</option>
                  <option value="aysen">Región de Aysén</option>
                  <option value="magallanes">Región de Magallanes</option>
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
                />
              </Form.Group>
              <Form.Group controlId="formApartment">
                <Form.Label>Departamento (Opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
            <Button className="btn-pink" onClick={handleShowDataReview}>
              Revisar datos
            </Button>
          </Col>
        </Row>
      </div>

      {/* Sección para mostrar los datos ingresados */}
      {showDataReview && (
        <div>
          <Row>
            <Col>
              <h3>Revisa tus datos</h3>
              <p>Nombre: {formData.name}</p>
              <p>RUT: {formData.rut}</p>
              <p>Teléfono: {formData.phone}</p>
              <p>Región: {formData.region}</p>
              <p>Comuna: {formData.commune}</p>
              <p>Calle: {formData.street}</p>
              <p>Número de casa: {formData.houseNumber}</p>
              <p>Departamento: {formData.apartment}</p>
              <Button className="btn-pink" onClick={handleConfirmPurchase}>
                Confirmar
              </Button>
              <Button className="btn-pink" onClick={handleCompraFallida}>
                No pagues aquí!
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ComprarNumero;