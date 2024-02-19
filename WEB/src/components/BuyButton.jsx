import React from 'react'
import Button from 'react-bootstrap/Button';


const BuyButton = ({onClick}) => {
  return (
    <div><div> <Button className='btn-pink' onClick={onClick}>Comprar tu número</Button>
        </div></div>
  )
  
}

export default BuyButton