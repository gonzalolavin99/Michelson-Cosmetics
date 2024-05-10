import React from "react";
import { Footer} from "./components/listadoExportaciones.js";
import Home from "./views/Home";
import Galeria from "./views/Galeria";
import Terminos from "./views/Terminos";
import Carrito from "./views/Carrito";
import ComprarNumero from "./views/ComprarNumero/ComprarNumero.jsx";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Premios from "./views/Premios/Premios.jsx";
import "./index.css";
import PruebaApi from "./components/PruebaApi";
import CompraExitosa from "./views/CompraExitosa/CompraExitosa.jsx";
import CompraFallida from "./views/CompraFallida";
import TicketProvider from "./context/TicketContext";
import NotFound from "./views/NotFound.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar.jsx";


const App = () => {
  return (
    <ChakraProvider>
      <TicketProvider>
        <div className="row">
          <div className="col-12">
            <Navbar />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/compra" element={<ComprarNumero />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/premios" element={<Premios />} />
              <Route path="/pruebaApi" element={<PruebaApi />} />
              <Route path="/compra-exitosa" element={<CompraExitosa />} />
              <Route path="/compra-fallida" element={<CompraFallida />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </TicketProvider>
    </ChakraProvider>
  );
};

export default App;