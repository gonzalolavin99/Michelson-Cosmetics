import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {Carrusel} from "../Carrusel.jsx";
import { IgButton } from "../IgButtons/IgButton.jsx";
import { Minicard } from "../Minicards/Minicard.jsx";
import "./banner.css";
import { IgButtonJR } from "../IgButtons/IgButtonJR.jsx";

export const Banner = () => {
 
  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="banner_title">
            <div className="text1">
              <p>CONCURSA POR UN</p>
            </div>
            <div className="text2">
              <p>SUZUKI SWIFT</p>
            </div>
            <div className="ig-container">
              <div style={{ marginRight: "1rem" }}>
                <IgButton />
              </div>
              <div>
                {" "}
                <IgButtonJR />
              </div>
            </div>
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
        mt="8"
      >
        <Minicard/>
      </Box>
    </>
  );
};
