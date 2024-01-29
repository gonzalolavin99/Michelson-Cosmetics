import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import imagen1 from '../assets/imgs/swift1.webp';
import imagen2 from '../assets/imgs/swift2.jpg';
import imagen3 from '../assets/imgs/swift3.jpg';

const Carrusel = () => {
  return (
    <div className="carousel-container">
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={imagen1} className="d-block" alt="..." style={{ width: '500px', height: '500px' }} /> 
        </div>
        <div className="carousel-item">
          <img src={imagen2} className="d-block" alt="..." style={{ width: '500px', height: '500px' }} /> 
        </div>
        <div className="carousel-item">
          <img src={imagen3} className="d-block" alt="..." style={{ width: '500px', height: '500px' }} /> 
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{ backgroundColor: 'grey' }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"style={{ backgroundColor: 'grey' }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  )
}

export default Carrusel;
