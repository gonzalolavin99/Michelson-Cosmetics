// Home.jsx
import React from 'react';
import Carrusel from '../components/Carrusel';
import BuyButton from '../components/BuyButton';
import { useTicket } from "../context/TicketContext";

const Home = () => {
  const { handleCompra } = useTicket();

  return (
    <div>
      <Carrusel />
      <BuyButton onClick={handleCompra} />
    </div>
  );
}

export default Home;
