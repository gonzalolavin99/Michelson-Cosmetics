import React, { useState, useRef, useEffect } from "react";
import useMediaQuery from "react-responsive";
import CardGalería from "../components/CardGalería";

const Galeria = () => {
  // Verificar el tamaño de pantalla para determinar el número de columnas en la grilla

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const columnas = isDesktop ? 4 : isTablet ? 3 : isMobile ? 2 : 1;

  // Actualizar las columnas del grid cuando cambie el tamaño de la pantalla

  useEffect(() => {
    const handleResize = () => {
      // Actualizar las columnas del grid cuando cambie el tamaño de la pantalla
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Estados para manejar la imagen seleccionada y el cursor
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  // Arreglo de URLs de las imágenes
  const imagenes = [
    "https://i.pinimg.com/originals/45/a2/bd/45a2bd8ff5413360222defb7c69a7a93.jpg",
    "https://i.pinimg.com/originals/f8/49/3e/f8493e3737a88f214cbb2bdbb61da009.jpg",
    "https://i.pinimg.com/originals/33/cb/82/33cb820dae66900f1def6f8223033ba9.jpg",
    "https://i.pinimg.com/originals/9f/0d/99/9f0d99956cfe2dc486b9434f3587f8c9.jpg",
    "https://i.pinimg.com/originals/e1/57/5c/e1575cb6c48b36548f41609a601a3fc0.jpg",
    "https://i.pinimg.com/736x/e2/2c/0f/e22c0f19cc96ffec99b4449f8b0b525a.jpg",
    "https://i.pinimg.com/736x/9a/d0/13/9ad013e9b645899dba9c0dba518ea10a.jpg",

    "https://i.pinimg.com/736x/5c/04/79/5c0479879338eb89ca7d099fe2c85b75.jpg",
    "https://i.pinimg.com/736x/e4/54/d3/e454d32bb89c176f4041d18974d28433.jpg",
    "https://i.pinimg.com/736x/43/13/6a/43136a62dc4961c3525ed384315b1d0d.jpg",
    "https://i.pinimg.com/736x/96/1d/f4/961df4c9fa9e1cd9d3d8200221c0ac4e.jpg",
    "https://i.pinimg.com/originals/eb/70/8d/eb708df657317958227fd532224bf02e.jpg",
    "https://i.pinimg.com/originals/76/01/0e/76010e9095791df99b7c688fadf22b00.jpg",
  ];

  // Manejar el clic en una imagen de la galería
  const handleImagenClick = (index) => {
    setImagenSeleccionada(true);
    setIndiceImagen(index);
  };

  // Cerrar el carrusel de imagen seleccionada
  const handleCerrarCarrusel = () => {
    setImagenSeleccionada(null);
  };

  // Manejar el cambio a la siguiente imagen en el carrusel
  const handleSiguienteImagen = (e) => {
    e.stopPropagation(); // Evitar propagación del evento
    setIndiceImagen((indiceImagen + 1) % imagenes.length);
  };

  // Manejar el cambio a la imagen anterior en el carrusel
  const handleAnteriorImagen = (e) => {
    e.stopPropagation(); // Evitar propagación del evento
    setIndiceImagen((indiceImagen - 1 + imagenes.length) % imagenes.length);
  };

  // Manejar la carga de la imagen en el carrusel
  const handleImageLoad = (e) => {
    const { width, height } = e.target;
    setImageSize({ width, height });
  };

  return (
    <div className="galeria">
      <div className="galeria-grid">
        {imagenes.map((imagen, index) => (
          <CardGalería
            key={index}
            imagen={imagen}
            onClick={() => handleImagenClick(index)}
          />
        ))}
      </div>

      {imagenSeleccionada && (
        <div className="carrusel" onClick={handleCerrarCarrusel}>
          <div className="carrusel-contenido">
            <button className="anterior" onClick={handleAnteriorImagen}>
              &lt;
            </button>
            <img
              src={imagenes[indiceImagen]}
              alt="Imagen seleccionada"
              ref={imageRef}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            <button className="siguiente" onClick={handleSiguienteImagen}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
