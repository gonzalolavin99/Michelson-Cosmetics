import React, { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import { NavLink } from "react-router-dom";
import "./premios.css";
import { premios } from "../../assets/arrays/premios";

const Premios = ({ showModal }) => {
  const [visible, setVisible] = useState(false);
  const [selectedPremio, setSelectedPremio] = useState(null);

  const handleShowModal = (premio) => {
    setSelectedPremio(premio);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="cards-container">
      {premios.map((premio) => (
        <div key={premio.id} className="card">
          <img
            src={premio.imagenes[0]}
            alt={premio.nombre}
            className="card-image"
          />
          <div className="card-content">
            <h3 className="card-title">{premio.nombre}</h3>
            <p className="card-description">{premio.descripcionLarga}</p>
            <Button
              className="btn-pink"
              onClick={() => handleShowModal(premio)}
              type="primary"
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      ))}
      <Modal
        title={selectedPremio && selectedPremio.nombre}
        visible={visible}
        onCancel={handleCancel}
        bodyStyle={{ backgroundColor: "white" }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cerrar
          </Button>,
          <Button key="buy">
            <NavLink to="/compra" className="btn-pink">
              Ir a Comprar
            </NavLink>
          </Button>,
        ]}
      >
        <div className="modal-content">
          {selectedPremio && (
            <>
              <div className="modal-content-container">
                <Carousel autoplay autoplaySpeed={800} className="modal-carousel">
                  {selectedPremio.imagenes.map((imagen, index) => (
                    <div key={index}>
                      <img
                        src={imagen}
                        alt={`Imagen ${index + 1}`}
                        className="modal-image"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Premios;