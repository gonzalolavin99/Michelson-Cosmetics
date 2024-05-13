import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Carrusel, IgButton, Minicard } from "../listadoExportaciones.js";
import "./banner.css";
import { IgButtonJR } from "../IgButtons/IgButtonJR.jsx";

export const Banner = () => {
  const img1 = "Hola";
  const img2 = "Adiós";

  return (
    <Box className="banner_container">
      <div className="banner_content">
        <div className="text1">
          <p>{img1}</p>
        </div>
        <div className="text2">
          <p>SUZUKI SWIFT</p>
        </div>
        <div className="ig-container">
          <IgButton /> <IgButtonJR/>
        </div>
      </div>
      <div className="banner_carousel">
        <Carrusel />
      </div>
    </Box>
  );
};
