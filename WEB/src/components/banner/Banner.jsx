import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Carrusel, IgButton, Minicard } from "../listadoExportaciones.js";
import "./banner.css";

export const Banner = () => {
  const img1 = "Hola";
  const img2 = "Hola";
  const img3 = "Hola";
  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="banner_title">
            <div className="text1">
              <p>CONCURSA POR UN</p>
            </div>
            <div className="text2">
              <p>SUSUKI BALENO</p>
            </div>
            <IgButton />
          </div>
          <div className="banner_carousel">
            <Carrusel />
          </div>
        </div>
      </div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="2"
        flexWrap="wrap"
        mt="-8"
      >
        <Minicard img={img1} />
        <Minicard img={img2} />
        <Minicard img={img3} />
      </Box>
    </>
  );
};
