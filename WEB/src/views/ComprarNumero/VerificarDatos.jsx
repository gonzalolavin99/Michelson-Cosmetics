import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

const VerificarDatos = ({
  formData,
  regionOptions,
  handleConfirmPurchase,
  handleCompraFallida,
  totalTickets,
  totalPagar,
}) => {
  const getRegionLabel = (regionValue) => {
    const region = regionOptions.find(option => option.value === regionValue);
    return region ? region.label : '';
  };

  return (
    <Box
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginLeft="1em"
      padding="1em"
    >
      <Box maxW="md" w="full">
        <Heading mb={6}>Revisa tus datos</Heading>
        <Text mb={2}>Nombre: {formData.name}</Text>
        <Text mb={2}>RUT: {formData.rut}</Text>
        <Text mb={2}>Correo electrónico: {formData.email}</Text>
        <Text mb={2}>Número de teléfono: {formData.phone}</Text>
        <Text mb={2}>Región: {getRegionLabel(formData.region)}</Text>
        <Text mb={2}>Comuna: {formData.commune}</Text>
        <Text mb={2}>Calle: {formData.street}</Text>
        <Text mb={2}>Número de casa: {formData.houseNumber}</Text>
        {formData.apartment && <Text mb={2}>Departamento: {formData.apartment}</Text>}
        <Text mb={2}>Total de tickets: {totalTickets}</Text>
        <Text mb={2}>Total a pagar: ${totalPagar}</Text>
        <Flex justify="space-between" mt={4}>
          <Button
            colorScheme="pink"
            marginRight="0.5em"
            onClick={handleConfirmPurchase}
          >
            Confirmar
          </Button>
          <Button colorScheme="pink" onClick={handleCompraFallida}>
            No pagues aquí!
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default VerificarDatos;
