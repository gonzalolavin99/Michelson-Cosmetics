import React from 'react';
import Spinner from './spinner/Spinner.jsx';

const CardGalería = ({ imagen, onClick, isLoaded, onLoad }) => {
  return (
    <div className="galeria-imagen" onClick={onClick}>
      {!isLoaded && <Spinner />}
      <img
        src={imagen}
        alt="Imagen de la galería"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onLoad={onLoad}
      />
    </div>
  );
};

export default CardGalería;