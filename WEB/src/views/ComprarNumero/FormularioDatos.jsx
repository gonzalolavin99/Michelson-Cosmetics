import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import { TicketContext } from "../../context/TicketContext";

const FormularioDatos = ({
  formData,
  formErrors,
  handleChange,
  regionOptions,
  totalTickets,
}) => {
  const { cantidadTickets, setCantidadTickets } = useContext(TicketContext);
  const precioTicket = 5000;

  const sumarTicket = () => {
    setCantidadTickets(cantidadTickets + 1);
  };

  const restarTicket = () => {
    if (cantidadTickets > 0) {
      setCantidadTickets(cantidadTickets - 1);
    }
  };

  const totalPagar = cantidadTickets * precioTicket;

  // Función para formatear el RUT
  const formatRUT = (rut) => {
    rut = rut.replace(/^0+/, "").replace(/\./g, "").replace(/-/g, "");
    if (rut.length > 1) {
      const verifier = rut.slice(-1).toUpperCase();
      let body = rut.slice(0, -1);
      body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `${body}-${verifier}`;
    }
    return rut;
  };

  // Maneja el cambio de RUT y lo formatea
  const handleRutChange = (e) => {
    const formattedRut = formatRUT(e.target.value);
    handleChange({
      target: {
        name: e.target.name,
        value: formattedRut,
      },
    });
    const isValid = validateRut(formattedRut);
    setFormErrors({ ...formErrors, rut: isValid ? '' : 'El RUT no es válido' });
  };

  return (
    <>
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
          onChange={handleRutChange}
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

      <FormControl mb={4} isInvalid={formErrors.commune !== ""} isRequired>
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

      <FormControl mb={4} isInvalid={formErrors.houseNumber !== ""} isRequired>
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

      <div className="ticket-container" style={{display:"flex", flexDirection:"column"}}>
        <h3>¿Cuántos tickets quieres comprar?</h3>
<div style={{display:"flex"}}>

        <button className="btn-black" onClick={sumarTicket}>
          +
        </button>
        <p>{cantidadTickets}</p>
        <button className="btn-black" onClick={restarTicket}>
          -
        </button>
</div>
      </div>

      {/* Mostrar el resumen solo si la cantidad de tickets es mayor que 0 */}
      {cantidadTickets > 0 && (
        <>
          <p>Total de tickets: {cantidadTickets}</p>
          <p>Total a pagar: ${totalPagar}</p>
        </>
      )}
    </>
  );
};

export default FormularioDatos;
