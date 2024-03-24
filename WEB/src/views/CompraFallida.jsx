import React from 'react';
import { useNavigate } from 'react-router-dom';


const CompraFallida = () => {
    const navigate = useNavigate();
  
    const handleVolverAComprar = () => {
      navigate('/compra');
    };
  
    return (
      <div className="compra-fallida-container">
        <h2>¡Ups! Parece que hubo un problema con el pago</h2>
        <p>
          No te preocupes, a veces estas cosas pasan. Por favor, verifica tu
          método de pago y vuelve a intentarlo más tarde.
        </p>
        <p>
          Si el problema persiste, no dudes en contactar a nuestro equipo de
          soporte para obtener ayuda.
        </p>
        <button className="btn-volver" onClick={handleVolverAComprar}>
          Volver a intentar
        </button>
      </div>
    );
  };
  
  export default CompraFallida;