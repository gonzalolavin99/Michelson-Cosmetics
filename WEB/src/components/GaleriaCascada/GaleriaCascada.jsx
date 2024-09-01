import React from "react";

const GaleriaCascada = ({ imagenes }) => {
  return (
    <div className="galeria-cascada">
      {imagenes.map((imagen, index) => (
        <div key={index} className="imagen-container">
          <img src={imagen} alt={`Imagen ${index}`} className="imagen" />
        </div>
      ))}
    </div>
  );
};

export default GaleriaCascada;
