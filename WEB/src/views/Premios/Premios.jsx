import React, { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import { NavLink } from 'react-router-dom';

import "./premios.css"; // Asegúrate de importar tus estilos CSS aquí

const Premios = () => {
  const [visible, setVisible] = useState(false);
  const [selectedPremio, setSelectedPremio] = useState(null);

  const premios = [
    {
      id: 1,
      nombre: "Primer Premio",
      descripcion: "Descripción corta del primer premio.",
      imagenes: [
        "https://i.pinimg.com/736x/45/a2/bd/45a2bd8ff5413360222defb7c69a7a93.jpg",
        "https://i.pinimg.com/736x/9f/0d/99/9f0d99956cfe2dc486b9434f3587f8c9.jpg",
        "https://i.pinimg.com/736x/33/cb/82/33cb820dae66900f1def6f8223033ba9.jpg",
      ],
      descripcionLarga: "Descripción más detallada del primer premio.",
    },
    {
      id: 2,
      nombre: "Moschino Couture Bag",
      descripcion: "Premio segundo lugar",
      imagenes: [
        "https://i.pinimg.com/736x/23/33/71/2333712fabe6078f28d05f6e1c181bfb.jpg",
        "https://i.pinimg.com/736x/5a/8d/0b/5a8d0b8872b360bb64e6d58ea95e17fd.jpg",
        "https://i.pinimg.com/736x/2a/b8/28/2ab828acbb8b2d1403caf24b31631966.jpg",
      ],
      descripcionLarga: "Esta bolsa de mano Moschino Couture es un accesorio imprescindible para cualquier ocasión. Con un diseño de corazón en rosa, cierre de cremallera y magnético, y detalles de hardware dorado, es tanto elegante como práctica. Hecha de poliuretano de alta calidad y fabricada en Italia, es perfecta para viajes, fiestas, trabajo o eventos formales.",
    },
    {
      id: 3,
      nombre: "Tercer Premio",
      descripcion: "Descripción corta del tercer premio.",
      imagenes: [
        "https://i.pinimg.com/736x/cb/ba/2d/cbba2d80077dc92c9b0d6e522acd31d2.jpg",
        "https://i.pinimg.com/736x/cb/ba/2d/cbba2d80077dc92c9b0d6e522acd31d2.jpg",
        "imagen9.jpg",
      ],
      descripcionLarga: "Descripción más detallada del tercer premio.",
    },
  ];

  const showModal = (premio) => {
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
            <p className="card-description">{premio.descripcion}</p>
            <Button className="btn-pink" onClick={() => showModal(premio)} type="primary">
              Ver Detalles
            </Button>
          </div>
        </div>
      ))}

<Modal
  title={selectedPremio && selectedPremio.nombre}
  visible={visible}
  onCancel={handleCancel}
  bodyStyle={{ backgroundColor: '#ffc0cb' }} // Cambiar color de fondo del modal
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
              <Carousel autoplay  autoplaySpeed={1000}>
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
              <div className="modal-description">
                <p>{selectedPremio.descripcionLarga}</p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Premios;
