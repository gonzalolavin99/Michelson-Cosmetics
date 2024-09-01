import React, { useState } from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import Toastify from "toastify-js";
import Spinner from "../../components/spinner/Spinner.jsx";

const VerificarDatos = ({
  formData,
  regionOptions,
  handleConfirmPurchase,
  handleCompraFallida,
  totalTickets,
  totalPagar,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const getRegionLabel = (regionValue) => {
    const region = regionOptions.find(option => option.value === regionValue);
    return region ? region.label : '';
  };

  const handlePurchaseClick = () => {
    if (totalTickets > 0) {
      setRedirecting(true);
      setTimeout(() => {
        handleConfirmPurchase();
      }, 4000); // Simula un retraso de 2 segundos antes de la redirección
    } else {
      Toastify({
        text: "Debe al menos comprar un ticket.",
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ff4c4c",
          color: "#ffffff",
        },
      }).showToast();
    }
  };

  if (redirecting) {
    return (
      <Box
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="1em"
        textAlign="center"
      >
        <Box>
          <Heading mb={6}>Te estamos redireccionando a KHIPU para que puedas pagar :) </Heading>
          <Spinner />
        </Box>
      </Box>
    );
  }

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
        <div style={{ display: "flex", justifyContent: "center", width: '100px', height: '100px' }}>
          {!imageLoaded && <Spinner />}
          <img
            src="https://www.khipu.com/wp-content/uploads/2022/03/16-Isotipo-blanco-borde.svg"
            style={{ display: imageLoaded ? "block" : "none", width: '100%', height: '100%' }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <Flex justify="space-between" mt={4}>
          <Button
            colorScheme="pink"
            marginRight="0.5em"
            onClick={handlePurchaseClick}
          >
            Ir a pagar con Khipu
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default VerificarDatos;
