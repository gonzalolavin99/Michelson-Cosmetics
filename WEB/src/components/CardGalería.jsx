import React from "react";

const CardGalería = ({ imagen, onClick }) => {
  return (
    <div className="galeria-imagen" onClick={onClick}>
      <img src={imagen} alt="Imagen de la galería" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default CardGalería;