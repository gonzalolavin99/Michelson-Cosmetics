import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../context/TicketContext";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import "./comprarNumero.css";
import JuegoComprarNumero from "../../components/Juego/JuegoComprarNumero";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const ComprarNumero = () => {
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    region: "",
    commune: "",
    street: "",
    houseNumber: "",
    apartment: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    commune: "",
    street: "",
    houseNumber: "",
  });
  const [showDataReview, setShowDataReview] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const navigate = useNavigate();
  const { setCantidadTickets } = useContext(TicketContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        if (value.trim() === "") {
          setFormErrors({ ...formErrors, name: "El nombre es requerido" });
        } else {
          setFormErrors({ ...formErrors, name: "" });
        }
        break;
      case "rut":
        if (!validateRut(value)) {
          setFormErrors({ ...formErrors, rut: "El RUT no es válido" });
        } else {
          setFormErrors({ ...formErrors, rut: "" });
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          setFormErrors({
            ...formErrors,
            email: "El formato del correo electrónico no es válido. Ejemplo: prueba@ejemplo.com",
          });
        } else {
          setFormErrors({ ...formErrors, email: "" });
        }
        break;
      case "phone":
        if (!validatePhone(value)) {
          setFormErrors({
            ...formErrors,
            phone: "El número de teléfono no es válido. Ejemplo: 987654321",
          });
        } else {
          setFormErrors({ ...formErrors, phone: "" });
        }
        break;
      case "commune":
        if (value.trim() === "") {
          setFormErrors({ ...formErrors, commune: "La comuna es requerida" });
        } else {
          setFormErrors({ ...formErrors, commune: "" });
        }
        break;
      case "street":
        if (value.trim() === "") {
          setFormErrors({ ...formErrors, street: "La calle es requerida" });
        } else {
          setFormErrors({ ...formErrors, street: "" });
        }
        break;
      case "houseNumber":
        if (value.trim() === "") {
          setFormErrors({
            ...formErrors,
            houseNumber: "El número de casa es requerido",
          });
        } else {
          setFormErrors({ ...formErrors, houseNumber: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleCompra = () => {
    setCantidadTickets((prevCantidad) => prevCantidad + 1);
    navigate("/compra-exitosa", { state: { formData, regionOptions } });
    setCompraExitosa(true);
  };

  const handleCompraFallida = () => {
    navigate("/compra-fallida");
  };

  const handleShowDataReview = () => {
    const errors = {};
  
    // Validar campos obligatorios
    if (formData.name.trim() === "") {
      errors.name = "El nombre es requerido";
    }
  
    if (formData.rut.trim() === "") {
      errors.rut = "El RUT es requerido";
    } else if (!validateRut(formData.rut)) {
      errors.rut = "El RUT no es válido";
    }
  
    if (formData.email.trim() === "") {
      errors.email = "El correo electrónico es requerido";
    } else if (!validateEmail(formData.email)) {
      errors.email = "El formato del correo electrónico no es válido. Ejemplo: prueba@ejemplo.com";
    }
  
    if (formData.phone.trim() === "") {
      errors.phone = "El número de teléfono es requerido";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "El número de teléfono no es válido. Ejemplo: 987654321";
    }
  
    if (formData.commune.trim() === "") {
      errors.commune = "La comuna es requerida";
    }
  
    if (formData.street.trim() === "") {
      errors.street = "La calle es requerida";
    }
  
    if (formData.houseNumber.trim() === "") {
      errors.houseNumber = "El número de casa es requerido";
    }
  
    if (Object.keys(errors).length === 0) {
      setShowDataReview(true);
    } else {
      setFormErrors(errors);
  
      const errorMessages = Object.entries(errors).map(([key, value]) => `${key}: ${value}`);
  
      Toastify({
        text: "Por favor, corrige los siguientes errores:\n\n" + errorMessages.join("\n"),
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffc0cb",
          color: "#000000",
        },
      }).showToast();
    }
  };

  const handleConfirmPurchase = () => {
    if (!validateRut(formData.rut)) {
      alert("Por favor, ingresa un RUT válido.");
      return;
    }

    handleCompra();
    setShowDataReview(false);
  };

  const validateRut = (rut) => {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    const dv = rut.slice(-1);
    const body = rut.slice(0, -1);

    if (isNaN(parseInt(body))) {
      setFormErrors({ ...formErrors, rut: 'El RUT debe contener solo números en el cuerpo.' });
      return false;
    }

    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= body.length; i++) {
      suma += parseInt(body.charAt(body.length - i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const expectedDv = 11 - (suma % 11);
    const dvInt = parseInt(dv);
    if (expectedDv === 10 && dvInt === 11) return true;
    if (expectedDv === 11 && dvInt === 0) return true;
    if (expectedDv === dvInt) return true;
    return false;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
  };

  const regionOptions = [
    { value: "", label: "Seleccione una región" },
    { value: "arica-parinacota", label: "Región de Arica y Parinacota" },
    { value: "tarapaca", label: "Región de Tarapacá" },
    { value: "antofagasta", label: "Región de Antofagasta" },
    { value: "atacama", label: "Región de Atacama" },
    { value: "coquimbo", label: "Región de Coquimbo" },
    { value: "valparaiso", label: "Región de Valparaíso" },
    { value: "metropolitana", label: "Región Metropolitana" },
    { value: "ohiggins", label: "Región de O'Higgins" },
    { value: "maule", label: "Región del Maule" },
    { value: "ñuble", label: "Región del Ñuble" },
    { value: "biobio", label: "Región del Biobío" },
    { value: "araucania", label: "Región de La Araucanía" },
    { value: "los-rios", label: "Región de Los Ríos" },
    { value: "los-lagos", label: "Región de Los Lagos" },
    { value: "aysen", label: "Región de Aysén" },
    { value: "magallanes", label: "Región de Magallanes" },
  ];

  // Función para manejar la respuesta correcta del juego
  const handleRespuestaCorrecta = () => {
    Toastify({
      text: "¡Respuesta correcta! Ahora puedes comprar tu número.",
      duration: 8000, // Duración de la notificación en milisegundos
      newWindow: true,
      close: true,
      gravity: "top", // Posición de la notificación
      position: "right", // Posición de la notificación
      stopOnFocus: true, // La notificación se mantendrá si la ventana está enfocada
      style: {
        background: "#ffc0cb", // Color de fondo de la notificación
        color: "#000000", // Color del texto de la notificación
      },
    }).showToast();
    setMostrarFormulario(true);

  };



  return (
    <Flex align="center" justify="center" minH="calc(100vh - 160px)">
      {!mostrarFormulario ? (
        <JuegoComprarNumero onRespuestaCorrecta={handleRespuestaCorrecta} />
      ) : (
        <Box className="comprar-container">
          <Box className="comprar-form" maxW="1000px">
            <Heading className="comprar-heading">
              Como respondiste correctamente, puede comprar tu número. Ingresa
              tus datos para hacer la compra!
            </Heading>
            <FormControl mb={4} isInvalid={formErrors.name !== ""} isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isRequired
              />
              {formErrors.name && (
                <FormErrorMessage>{formErrors.name}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={formErrors.rut !== ""} isRequired>
              <FormLabel>RUT</FormLabel>
              <Input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                isRequired
              />
              {formErrors.rut && (
                <FormErrorMessage>{formErrors.rut}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={formErrors.email !== ""} isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isRequired
              />
              {formErrors.email && (
                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={formErrors.phone !== ""} isRequired>
              <FormLabel>Número de teléfono</FormLabel>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isRequired
              />
              {formErrors.phone && (
                <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Región</FormLabel>
              <Select
                name="region"
                value={formData.region}
                onChange={handleChange}
                isRequired
              >
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              mb={4}
              isInvalid={formErrors.commune !== ""}
              isRequired
            >
              <FormLabel>Comuna</FormLabel>
              <Input
                type="text"
                name="commune"
                value={formData.commune}
                onChange={handleChange}
                isRequired
              />
              {formErrors.commune && (
                <FormErrorMessage>{formErrors.commune}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={formErrors.street !== ""} isRequired>
              <FormLabel>Calle</FormLabel>
              <Input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                isRequired
              />
              {formErrors.street && (
                <FormErrorMessage>{formErrors.street}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              mb={4}
              isInvalid={formErrors.houseNumber !== ""}
              isRequired
            >
              <FormLabel>Número de casa</FormLabel>
              <Input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                isRequired
              />
              {formErrors.houseNumber && (
                <FormErrorMessage>{formErrors.houseNumber}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Departamento (Opcional)</FormLabel>
              <Input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </FormControl>
            <Flex justify="space-between">
              <Button colorScheme="pink" onClick={handleShowDataReview}>
                Revisar datos
              </Button>
            </Flex>
          </Box>

          {showDataReview && (
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
                <Text mb={2}>Teléfono: {formData.phone}</Text>
                <Text mb={2}>
                  Región:{" "}
                  {
                    regionOptions.find(
                      (option) => option.value === formData.region
                    )?.label
                  }
                </Text>
                <Text mb={2}>Comuna: {formData.commune}</Text>
                <Text mb={2}>Calle: {formData.street}</Text>
                <Text mb={2}>Número de casa: {formData.houseNumber}</Text>
                <Text mb={2}>Departamento: {formData.apartment}</Text>
                <Flex justify="space-between">
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
          )}
        </Box>
      )}
    </Flex>
  );
};

export default ComprarNumero;