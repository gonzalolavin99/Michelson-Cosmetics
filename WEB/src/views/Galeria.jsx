import React, { useState } from "react";

import imagen1 from "../assets/imgs/swift1.webp";
import imagen2 from "../assets/imgs/swift2.jpg";
import imagen3 from "../assets/imgs/jenny1.jpeg";
import imagen4 from "../assets/imgs/swift3.jpg";
import imagen5 from "../assets/imgs/swift4.jpg";
import imagen6 from "../assets/imgs/swift5.jpg";
import imagen7 from "../assets/imgs/jenny2.jpeg";
import imagen8 from "../assets/imgs/jenny3.jpeg";
import imagen9 from "../assets/imgs/jenny4.jpeg";
import imagen10 from "../assets/imgs/int_tras.jpeg";

const Galeria = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceImagen, setIndiceImagen] = useState(0);

  const imagenes = [
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    imagen5,
    imagen6,
    imagen7,
    imagen8,
    imagen9,
    imagen10,
  ];

  const handleImagenClick = (index) => {
    setImagenSeleccionada(true);
    setIndiceImagen(index);
  };

  const handleCerrarCarrusel = () => {
    setImagenSeleccionada(null);
  };

  const handleSiguienteImagen = () => {
    setIndiceImagen((indiceImagen + 1) % imagenes.length);
  };

  const handleAnteriorImagen = () => {
    setIndiceImagen((indiceImagen - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="galeria">
      <div className="galeria-grid">
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            className="galeria-imagen"
            onClick={() => handleImagenClick(index)}
          >
            <img src={imagen} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>

      {imagenSeleccionada && (
        <div className="carrusel" onClick={handleCerrarCarrusel}>
          <div className="carrusel-contenido">
            <span className="cerrar-carrusel" onClick={handleCerrarCarrusel}>
              &times;
            </span>
            <button className="anterior" onClick={handleAnteriorImagen}>
              &lt;
            </button>
            <img src={imagenes[indiceImagen]} alt="Imagen seleccionada" />
            <button className="siguiente" onClick={handleSiguienteImagen}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
