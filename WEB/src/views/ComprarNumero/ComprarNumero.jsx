import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../context/TicketContext";
import { useAppDispatch } from "../../redux/hooks"

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
} from "@chakra-ui/react";
import "./comprarNumero.css";
import JuegoComprarNumero from "../../components/Juego/JuegoComprarNumero";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ApiPurchase from "../../api/purchase/Purchase";
import { loadPersona } from "../../redux/reducer/PurchaseReducer";


const ComprarNumero = () => {
  // Estado para controlar si la compra fue exitosa
  const [compraExitosa, setCompraExitosa] = useState(false);

  const dispatch = useAppDispatch()
  // Estado para almacenar los datos del formulario
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
  // Estado para controlar la visualización de los datos
  const [showDataReview, setShowDataReview] = useState(false);
  
  const navigate = useNavigate();
  const { setCantidadTickets } = useContext(TicketContext);

  // Función para actualizar los datos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para realizar la compra
  const handleCompra = async () => {
    setCantidadTickets((p)=>{p+1});
    const persona = {persona:{
      name: formData.name,
      email: formData.email,
      comune: formData.commune,
      apartment: formData.apartment,
      phone: formData.phone,
      houseNumber: formData.houseNumber,
      region: formData.region,
      street: formData.street,
      rut: formData.rut
    }}

    dispatch(loadPersona(persona))

    const newPurchasr  = {
      date: new Date(),
      rut: formData.name,
      idtransaction: '',
      id:0

    }
    let response  =  await ApiPurchase.CreatePurchase(newPurchasr)
    if(response.Data.success)
    {
      const form = document.createElement("form");
      form.method = "post";
      form.action = response.Data.urlPaymentKhipu;
      document.body.appendChild(form);
      form.submit();
    }
     // Pasa regionOptions como prop
    setCompraExitosa(true);
  };

  // Función para navegar a la página de compra fallida
  const handleCompraFallida = () => {
    navigate("/compra-fallida");
  };

  // Función para mostrar los datos ingresados
  const handleShowDataReview = () => {
    // Verifica que todos los campos obligatorios estén completos
    if (
      formData.name.trim() === "" ||
      formData.rut.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.region.trim() === "" ||
      formData.commune.trim() === "" ||
      formData.street.trim() === "" ||
      formData.houseNumber.trim() === ""
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setShowDataReview(true);
  };

  // Función para confirmar la compra
  const handleConfirmPurchase = () => {
    handleCompra();
    setShowDataReview(false);
  };

  // Opciones de región
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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        <Heading className="comprar-heading">Como respondiste correctamente, puede comprar tu número. Ingresa tus datos para hacer la compra!</Heading>
        <FormControl mb={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>RUT</FormLabel>
          <Input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Número de teléfono</FormLabel>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
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
        <FormControl mb={4}>
          <FormLabel>Comuna</FormLabel>
          <Input
            type="text"
            name="commune"
            value={formData.commune}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Calle</FormLabel>
          <Input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Número de casa</FormLabel>
          <Input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            isRequired
          />
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

      {/* Sección para mostrar los datos ingresados */}
      {showDataReview && (
        <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
          <Box maxW="md" w="full">
            <Heading mb={6}>Revisa tus datos</Heading>
            <Text mb={2}>Nombre: {formData.name}</Text>
            <Text mb={2}>RUT: {formData.rut}</Text>
            <Text mb={2}>Correo electrónico: {formData.email}</Text>
            <Text mb={2}>Teléfono: {formData.phone}</Text>
            <Text mb={2}>
              Región:{" "}
              {regionOptions.find((option) => option.value === formData.region)?.label}
            </Text>
            <Text mb={2}>Comuna: {formData.commune}</Text>
            <Text mb={2}>Calle: {formData.street}</Text>
            <Text mb={2}>Número de casa: {formData.houseNumber}</Text>
            <Text mb={2}>Departamento: {formData.apartment}</Text>
            <Flex justify="space-between">
              <Button colorScheme="pink" onClick={handleConfirmPurchase}>
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