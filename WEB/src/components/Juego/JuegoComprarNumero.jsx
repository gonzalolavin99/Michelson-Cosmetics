import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  keyframes,
} from "@chakra-ui/react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


const JuegoComprarNumero = ({ onRespuestaCorrecta }) => {
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const opciones = [
    { id: 1, texto: "Mimi" },
    { id: 2, texto: "Terminator" },
    { id: 3, texto: "Luke Skywalker" },
    { id: 4, texto: "Pato Lucas" },
  ];

  const handleRespuesta = (opcion) => {
    setRespuestaSeleccionada(opcion);
    setMostrarRespuestas(true);
  
    if (opcion.texto === "Mimi") {
      setTimeout(() => {
        onRespuestaCorrecta();
      }, 2000);
    } else {
      Toastify({
        text: "Respuesta incorrecta. ¡Inténtalo de nuevo!",
        duration: 3000, // Duración de la notificación en milisegundos
        newWindow: true,
        close: true,
        gravity: "top", // Posición de la notificación
        position: "right", // Posición de la notificación
        backgroundColor: "#FF6347", // Color de fondo de la notificación
        stopOnFocus: true, // La notificación se mantendrá si la ventana está enfocada
      }).showToast();
    }
  };

  const animationKeyframes = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  `;

  const animation = `${animationKeyframes} 4s ease-in-out infinite`;

  return (
    <Flex justify="center" align="center" h="100vh">
      <Box
        bg="pink.100"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="md"
        textAlign="center"
        animation={animation}
      >
        <Heading mb={6}>¿Cómo se llama la perrita poodle de Ignacia?</Heading>
        {mostrarRespuestas ? (
          respuestaSeleccionada.texto === "Mimi" ? (
            <Text color="green.500" mb={4}>
              ¡Respuesta correcta!
            </Text>
          ) : (
            <Text color="red.500" mb={4}>
              Respuesta incorrecta. Inténtalo de nuevo.
            </Text>
          )
        ) : null}
        {opciones.map((opcion) => (
          <Button
            key={opcion.id}
            onClick={() => handleRespuesta(opcion)}
            mb={2}
            colorScheme={
              respuestaSeleccionada?.id === opcion.id
                ? respuestaSeleccionada.texto === "Mimi"
                  ? "green"
                  : "red"
                : "pink"
            }
            disabled={mostrarRespuestas}
          >
            {opcion.texto}
          </Button>
        ))}
      </Box>
    </Flex>
  );
};

export default JuegoComprarNumero;