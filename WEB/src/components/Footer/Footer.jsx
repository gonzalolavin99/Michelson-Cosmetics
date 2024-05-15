import React from "react";
import "./Footer.css";
import { IgButton } from "../IgButtons/IgButton";
import { IgButtonJR } from "../IgButtons/IgButtonJR";
import Premios from "../../views/Premios/Premios.jsx";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const handlePremioClick = (premioId) => {
    // Implementa la lógica para mostrar el modal o navegar a la vista de Premios
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-newsletter">
          <h1 className="footer-newsletter__header">
            Quieres contactarte con el equipo de soporte?
          </h1>
          <h3>Escríbenos a soportejrmichelson@gmail.com</h3>
        </div>
        <div className="footer-body">
          <div className="footer-body__content">
            <h4>Ya compraste tu número? Entonces visita nuestras redes sociales!</h4>
            <div className="social-buttons">
              <IgButton />
              <IgButtonJR />
            </div>
          </div>
          <nav className="footer-body__nav">
          <ul className="footer-body__nav-list">
  <li className="footer-body__nav-item">
    Participa acá!
    <ul className="footer-body__nav-sublist">
      <li className="footer-body__nav-subitem">
        <a href="/compra" className="footer-body__nav-link liHead">
          Comprar un número
        </a>
      </li>
      <li className="footer-body__nav-subitem">
        <a href="/terminos" className="footer-body__nav-link">
          Términos y condiciones
        </a>
      </li>
    
      
    </ul>
  </li>
  <li className="footer-body__nav-item">
    Premios
    <ul className="footer-body__nav-sublist">
      <li className="footer-body__nav-subitem">
        <NavLink to="/premios" className="footer-body__nav-link">
          Suzuki Swift
        </NavLink>
      </li>
      <li className="footer-body__nav-subitem">
        <NavLink to="/premios" className="footer-body__nav-link">
          Cartera Moschino
        </NavLink>
      </li>
      <li className="footer-body__nav-subitem">
        <NavLink to="/premios" className="footer-body__nav-link">
          Brazalete Pandora
        </NavLink>
      </li>
    </ul>
  </li> {/* Agrega el cierre de la etiqueta li aquí */}
 
</ul>
          </nav>
        </div>
        <div className="footer-attribute">
          <p>&copy; JrMichelson SPA 2024. All right reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
