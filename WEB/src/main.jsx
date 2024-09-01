import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App.jsx";
import { Provider } from "react-redux"
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TicketProvider from "./context/TicketContext"; // Importar TicketProvider como la exportación principal
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store"
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <TicketProvider>
            <App />
          </TicketProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}