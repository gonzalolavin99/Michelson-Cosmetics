import React from "react";

function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      {/* Enlace de regreso a la página principal */}
      <a href="/">Volver a la página principal</a>
    </div>
  );
}

export default NotFound;
