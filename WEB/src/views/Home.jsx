import React from 'react'
import Carrusel from '../components/Carrusel'
import BuyButton from '../components/BuyButton'


const Home = () => {
  return (
    <div><Carrusel/>
    <BuyButton onClick={handleCompra} />
   
    </div>
  )
}

export default Home