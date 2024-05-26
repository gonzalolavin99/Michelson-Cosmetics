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
      border="1px"
      borderColor="#ffc0cb"
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
        <div style={{display:"flex", justifyContent:"center", width: '100px', height: '100px' }}>
  <img src="https://www.khipu.com/wp-content/uploads/2022/03/16-Isotipo-blanco-borde.svg" style={{ width: '100%', height: '100%' }} />
</div>
        <Flex justify="space-between" mt={4}>
        
          <Button
            colorScheme="pink"
            marginRight="0.5em"
            onClick={handleConfirmPurchase}
          >
            Ir a pagar con Khipu
          </Button>
          
        </Flex>
      </Box>
    </Box>
  );
};

export default VerificarDatos;
