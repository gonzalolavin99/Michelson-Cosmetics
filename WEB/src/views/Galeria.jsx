import React, { useState, useRef } from "react";

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
import imagen11 from "../assets/imgs/apertura_pta.jpg";
import imagen12 from "../assets/imgs/del_der.jpg";
import imagen13 from "../assets/imgs/der.jpg";
import imagen14 from "../assets/imgs/izq.jpg";
import imagen15 from "../assets/imgs/motor.jpg";
import imagen16 from "../assets/imgs/swift_frontal.jpg";
import imagen17 from "../assets/imgs/tras_der.jpg";
import imagen18 from "../assets/imgs/tras_izq.jpg";
import imagen19 from "../assets/imgs/tras.jpg";

const Galeria = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

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
    imagen11,
    imagen12,
    imagen13,
    imagen14,
    imagen15,
    imagen16,
    imagen17,
    imagen18,
    imagen19,
  ];

  const handleImagenClick = (index) => {
    setImagenSeleccionada(true);
    setIndiceImagen(index);
  };

  const handleCerrarCarrusel = () => {
    setImagenSeleccionada(null);
  };

  const handleSiguienteImagen = (e) => {
    e.stopPropagation(); // Evitar propagación del evento
    setIndiceImagen((indiceImagen + 1) % imagenes.length);
  };

  const handleAnteriorImagen = (e) => {
    e.stopPropagation(); // Evitar propagación del evento
    setIndiceImagen((indiceImagen - 1 + imagenes.length) % imagenes.length);
  };

  const handleCursorMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  
    if (imageRef.current) {
      if (e.type === 'mousemove') {
        const maxScale = 2; // Define el nivel máximo de zoom permitido
        const currentScale = imageRef.current.getBoundingClientRect().width / imageRef.current.offsetWidth;
  
        if (currentScale < maxScale) {
          imageRef.current.style.transformOrigin = `${x}px ${y}px`;
        }
      } else if (e.type === 'mouseenter') {
        imageRef.current.style.transformOrigin = 'center center';
      } else if (e.type === 'mouseleave') {
        imageRef.current.style.transformOrigin = 'center center';
      }
    }
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
            <img
              src={imagenes[indiceImagen]}
              alt="Imagen seleccionada"
              onMouseMove={handleCursorMove}
              onMouseEnter={handleCursorMove}
              onMouseLeave={handleCursorMove}
              ref={imageRef}
            />
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
