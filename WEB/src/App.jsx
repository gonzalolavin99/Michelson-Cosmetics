import React from "react";
import Navbar from "./components/Bar";
import Home from "./views/Home";
import Galeria from "./views/Galeria";
import Terminos from "./views/Terminos";
import Carrito from "./views/Carrito";
import ComprarNumero from "./views/ComprarNumero";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Premios from "./views/Premios";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/compra" element={<ComprarNumero />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/premios" element={<Premios />} />

      </Routes>
    </div>
  );
};

export default App;
