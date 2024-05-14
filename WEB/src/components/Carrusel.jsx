

import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import imagen1 from "../assets/imgs/1foto.png";
import imagen2 from "../assets/imgs/2foto.png";
import imagen3 from "../assets/imgs/3foto.png";

export const Carrusel = () => {
  const [indice, setIndice] = useState(0);
  const imagenes = [imagen1, imagen2, imagen3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndice((indice + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [indice, imagenes.length]);

  return (
    <Flex justify="center" align="center" h="100%" w="100%">
      <Box w="100%" maxW="600px">
        <Image src={imagenes[indice]} alt={`Imagen ${indice + 1}`} />
      </Box>
    </Flex>
  );
};
