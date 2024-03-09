import React, { useState } from 'react';
import imagen1 from '../assets/imgs/swift1.webp';
import imagen2 from '../assets/imgs/swift2.jpg';
import imagen3 from '../assets/imgs/swift3.jpg';


const Carrusel = () => {
  const [indice, setIndice] = useState(0);
  const imagenes = [imagen1, imagen2, imagen3];

  const siguienteImagen = () => {
    setIndice((indice + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setIndice((indice - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="carousel-container">
      <button className="btn-slide" onClick={imagenAnterior}>&lt;</button>
      <img src={imagenes[indice]} alt={`Imagen ${indice + 1}`} style={{ width: '20rem', maxHeight: '20rem' }} />
      <button className="btn-slide" onClick={siguienteImagen}>&gt;</button>
    </div>
  );
};

export default Carrusel;
