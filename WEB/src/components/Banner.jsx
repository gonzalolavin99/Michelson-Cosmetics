import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Carrusel, IgButton } from "./listadoExportaciones.js";

import "../banner.css";

export const Banner = () => {
  return (
    <div className="banner_container">
      <div className="banner_title">
        <div>
          <p>CONCURSO</p>
        </div>
        <div>
          <p>CONCURSO</p>
        </div>
        <IgButton />
      </div>
      <div className="banner_carousel">
        <Carrusel />
      </div>
    </div>
  );
};
