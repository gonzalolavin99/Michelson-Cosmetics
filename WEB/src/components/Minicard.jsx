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

export const Minicard = (img) => {
  return (
    <>
      <Card
        maxW="xs"
        border="2px"
        borderColor="pink"
        bg="#fafafa10"
        backdropFilter="blur(0.4rem)"
      >
        <CardBody>
          <Image src={img} alt="Premios" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
              accusantium enim rerum eaque officiis qui..
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter display="flex" alignItems="center" justifyContent="center">
          <Button variant="ghost" colorScheme="black">
            More Info
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
