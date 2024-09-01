import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../context/TicketContext.jsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import "./comprarNumero.css";
import JuegoComprarNumero from "../../components/Juego/JuegoComprarNumero.jsx";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import FormularioDatos from "./FormularioDatos.jsx";
import VerificarDatos from "./VerificarDatos.jsx";
import ApiPurchase from "../../api/purchase/Purchase";
import { loadPersona } from "../../redux/reducer/PurchaseReducer";
import { selectToken } from "../../redux/reducer/TokenReducer";

const ComprarNumero = () => {
  const [compraExitosa, setCompraExitosa] = useState(false);

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
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
  const [showDataReview, setShowDataReview] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { cantidadTickets } = useContext(TicketContext);
  const [totalPagar, setTotalPagar] = useState(0);

  // Calcular el total a pagar en función de la cantidad de tickets
  useEffect(() => {
    const precioTicket = 5000; // Precio por ticket (puedes ajustar este valor)
    setTotalPagar(cantidadTickets * precioTicket);
  }, [cantidadTickets]);

  // Función para realizar la compra
  const handleCompra = async () => {
    //setCantidadTickets((p)=>{p+1});
    const persona = {
      persona: {
        name: formData.name,
        email: formData.email,
        commune: formData.commune,
        apartment: formData.apartment,
        phone: formData.phone,
        houseNumber: formData.houseNumber,
        region: formData.region,
        street: formData.street,
        rut: formData.rut,
      },
    };

    dispatch(loadPersona(persona));

    const newPurchasr = {
      person: {
        rut: persona.persona.rut,

        name: persona.persona.name,

        phone: persona.persona.phone,

        email: persona.persona.email,
      },
      purchase: {
        id: 0,

        rutPerson: persona.persona.rut,

        idtransaction: "",

        date: new Date(),

        amount: totalPagar,

        state: "PENDING",
      },
      tickets: generateTicket(),
      adress: {
        region: persona.persona.region,

        street: persona.persona.street,

        commune: persona.persona.commune,

        houseNumber: persona.persona.houseNumber,

        detail: persona.persona.detail,

        rutPerson: persona.persona.rut
      },
    };

    let response = await ApiPurchase.CreatePurchase(newPurchasr, token);
    if (response.Data.success) {
      const form = document.createElement("form");
      form.method = "post";
      form.action = response.Data.urlPaymentKhipu;
      document.body.appendChild(form);
      form.submit();
    }
    // Pasa regionOptions como prop
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
      errors.email =
        "El formato del correo electrónico no es válido. Ejemplo: prueba@ejemplo.com";
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

      const errorMessages = Object.entries(errors).map(
        ([key, value]) => `${key}: ${value}`
      );

      Toastify({
        text:
          "Por favor, corrige los siguientes errores:\n\n" +
          errorMessages.join("\n"),
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
    rut = rut.replace(/\./g, "").replace(/-/g, "");
    const dv = rut.slice(-1).toUpperCase();
    const body = rut.slice(0, -1);

    if (isNaN(parseInt(body))) {
      return false;
    }

    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= body.length; i++) {
      suma += parseInt(body.charAt(body.length - i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const expectedDv = 11 - (suma % 11);
    const dvInt = dv === "K" ? 10 : parseInt(dv);
    if (expectedDv === 10 && dvInt === 10) return true;
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
            email:
              "El formato del correo electrónico no es válido. Ejemplo: prueba@ejemplo.com",
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
      case "apartment":
        setFormErrors({ ...formErrors, apartment: "" });
        break;
      default:
        break;
    }
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
      duration: 8000,
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
    setMostrarFormulario(true);
  };

  const generateTicket = () => {
    let tickets = [];
    for (var i = 1; i <= cantidadTickets; i++) {
      //hacer metodo md5
      let pass =
        "sajdhgasjhdas" +
        new Date().getMilliseconds.toDateString +
        formData.name.charAt(Math.floor(Math.random() * formData.name.length)) +
        formData.rut.charAt(Math.floor(Math.random() * formData.name.length));
      tickets.push({
        id: 0,
        pass: pass,
        idPurchase: 0,
      });
    }
    return tickets;
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
            <FormularioDatos
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              regionOptions={regionOptions}
              totalTickets={cantidadTickets}
              totalPagar={totalPagar}
            />
            <Flex justify="space-between" marginTop={5}>
              <Button colorScheme="pink" onClick={handleShowDataReview}>
                Revisar datos
              </Button>
            </Flex>
          </Box>

          {showDataReview && (
            <VerificarDatos
              formData={formData}
              regionOptions={regionOptions}
              handleConfirmPurchase={handleConfirmPurchase}
              totalTickets={cantidadTickets}
              totalPagar={totalPagar}
            />
          )}
        </Box>
      )}
    </Flex>
  );
};

export default ComprarNumero;
