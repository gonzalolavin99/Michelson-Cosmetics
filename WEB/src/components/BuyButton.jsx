import React from 'react'
import Button from 'react-bootstrap/Button';
import { useTicket } from '../context/TicketContext';


const BuyButton = () => {
const {handleCompra} =useTicket(); // Obtener handleCompra del contexto

const comprarTicket = () =>{
  handleCompra(1)
}

  return (
    <div>
    <div>
      <Button className='btn-pink' onClick={comprarTicket}>
        <div className='btn-text'>
          Comprar!
        </div>
      </Button>
    </div>
  </div>
  )
  
}

export default BuyButton