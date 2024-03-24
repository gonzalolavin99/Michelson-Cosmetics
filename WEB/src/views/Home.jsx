// Home.jsx
import React, { useContext } from 'react';
import Carrusel from '../components/Carrusel';
import BuyButton from '../components/BuyButton';
import { TicketContext } from "../context/TicketContext";
import IgButton from '../components/IgButton';
import Info from '../components/Info';

const Home = () => {
  const { handleCompra } = useContext(TicketContext);

  return (
    <div>
      <Carrusel />
      <Info />
      <BuyButton />
      <IgButton></IgButton>
    </div>
  );
};

export default Home;
