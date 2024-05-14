import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  Button,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { premiosMini } from "../../assets/arrays/premiosMini.js";
import { Link } from 'react-router-dom';
import "./Minicard.css"; // Importa tu archivo CSS

export const Minicard = () => {
  return (
    <>
      {premiosMini.map((premio) => (
        <Card
          key={premio.id}
          maxW="xs"
          border="2px"
          borderColor="pink"
          bg="#fafafa10"
          backdropFilter="blur(0.4rem)"
        >
          <CardBody>
            <Image
              src={premio.imagenes[0]} // Aquí se muestra solo la primera imagen
              alt={premio.nombre}
              borderRadius="lg"
              className="minicard-image" // Aplica la clase minicard-image a la imagen
            />
            <Stack mt="16" spacing="3">
              <Text>{premio.descripcionLarga}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter display="flex" alignItems="center" justifyContent="center">
            <Link to="/premios">
              <Button variant="ghost" colorScheme="black">
                More Info
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
