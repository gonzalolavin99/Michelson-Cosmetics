import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import TicketProvider from "./context/TicketContext"; // Importar TicketProvider como la exportación principal

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketProvider>
        <App />
      </TicketProvider>
    </BrowserRouter>
  </React.StrictMode>
);