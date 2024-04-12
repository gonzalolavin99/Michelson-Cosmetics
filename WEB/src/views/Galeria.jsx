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
    "https://i.pinimg.com/originals/a1/94/aa/a194aa98a9fef26ac8ee6143c3de3b0a.jpg",
    "https://i.pinimg.com/originals/50/ac/55/50ac55bea0d0be5ad28a1e161a2e4a32.jpg",
    "https://i.pinimg.com/originals/09/15/e4/0915e4a73f09e4f9fe259c2d587553fc.jpg",
    "https://i.pinimg.com/originals/25/19/3f/25193fb54bfad03fe14edd31d49b5543.jpg",
    "https://i.pinimg.com/originals/bf/57/65/bf57651f8d6355a5c814e6442a95f2c5.jpg",
    "https://i.pinimg.com/originals/86/2d/81/862d81560a8a4b184cfd8cca75f8f37f.jpg",
    "https://i.pinimg.com/originals/c0/45/d9/c045d923c66155a54383f5e2938f620c.jpg",
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

  // Manejar el movimiento del cursor sobre la imagen en el carrusel
  const handleCursorMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });

    if (imageRef.current) {
      if (e.type === "mousemove") {
        const maxScale = 2; // Define el nivel máximo de zoom permitido
        const currentScale =
          imageRef.current.getBoundingClientRect().width / imageSize.width;

        if (currentScale < maxScale) {
          // Calcular los porcentajes de posición del cursor en relación al tamaño de la imagen

          imageRef.current.style.transformOrigin = `${
            x / (imageSize.width / 100)
          }% ${y / (imageSize.height / 100)}%`;
        }
      } else if (e.type === "mouseenter") {
        imageRef.current.style.transformOrigin = "center center";
      } else if (e.type === "mouseleave") {
        imageRef.current.style.transformOrigin = "center center";
      }
    }
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
              onMouseMove={handleCursorMove}
              onMouseEnter={handleCursorMove}
              onMouseLeave={handleCursorMove}
              onLoad={handleImageLoad}
              ref={imageRef}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            <button className="siguiente" onClick={handleSiguienteImagen}>
              &gt;
            </button>
            <h1>Hola</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
