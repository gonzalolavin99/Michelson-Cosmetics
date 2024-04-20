import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./premios.css"; // Asegúrate de importar tus estilos CSS aquí

const Premios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPremio, setSelectedPremio] = useState(null);

  const premios = [
    {
      id: 1,
      nombre: "Primer Premio",
      descripcion: "Descripción corta del primer premio.",
      imagenes: [
        "https://i.pinimg.com/736x/45/a2/bd/45a2bd8ff5413360222defb7c69a7a93.jpg",
        "https://i.pinimg.com/736x/33/cb/82/33cb820dae66900f1def6f8223033ba9.jpg",
        "imagen3.jpg",
      ],
      descripcionLarga: "Descripción más detallada del primer premio.",
    },
    {
      id: 2,
      nombre: "Segundo Premio",
      descripcion: "Descripción corta del segundo premio.",
      imagenes: [
        "https://i.pinimg.com/736x/23/33/71/2333712fabe6078f28d05f6e1c181bfb.jpg",
        "https://i.pinimg.com/736x/5a/8d/0b/5a8d0b8872b360bb64e6d58ea95e17fd.jpg",
        "imagen6.jpg",
      ],
      descripcionLarga: "Descripción más detallada del segundo premio.",
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

  const openModal = (premio) => {
    setSelectedPremio(premio);
    setIsOpen(true);
    console.log(selectedPremio);
    console.log(isOpen);
  };

  const closeModal = () => {
    setSelectedPremio(null);
    setIsOpen(false);
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
            <button onClick={() => openModal(premio)} className="btn-pink">
              Ver Detalles
            </button>
          </div>
        </div>
      ))}

      {isOpen && selectedPremio && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedPremio.nombre}</h2>
            <div className="modal-content">
              {/* Carrusel de imágenes */}
              <div className="modal-carousel">
                {selectedPremio.imagenes.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="modal-image"
                  />
                ))}
              </div>
              {/* Descripción larga */}
              <div className="modal-description">
                <p>{selectedPremio.descripcionLarga}</p>
                <NavLink to="/compra" className="btn-pink">
                  Ir a Comprar
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premios;
