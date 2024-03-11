import React from 'react';
import BuyButton from './BuyButton';

const Info = () => {
  return (
    <div style={{ border: '2px solid blue', backgroundColor: '#ffc0cb', color: 'black', padding: '15px' }}>
      <h3>ESTE AUTO PUEDE SER TUYO!</h3>
      <p>Participa de un juego muy fácil y participa por este Suzuki Swift!</p>
     <BuyButton/>
    </div>
  );
};

export default Info;
