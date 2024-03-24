// Este componente se puede modificar para mostrar información específica de la compra
const CompraExitosa = () => {
  return (
    <div>
      <h1>Compra exitosa</h1>
      <p>¡Felicidades por tu compra!</p>
      {/* Aquí puedes mostrar información del ticket comprado, como número de ticket, fecha de compra, etc. */}
    </div>
  );
};

export default CompraExitosa;


// const CompraExitosa = () => {
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       const response = await fetch("/api/tickets/12345"); // Reemplaza 12345 con el ID del ticket
//       const ticketData = await response.json();
//       setTicket(ticketData);
//     };
//     fetchTicket();
//   }, []);

//   return (
//     <div>
//       <h1>Compra exitosa</h1>
//       {ticket && (
//         <div>
//           <h2>Información del ticket</h2>
//           <p>Número de ticket: {ticket.id}</p>
//           <p>Fecha de compra: {ticket.fechaCompra}</p>
//           <p>Precio: {ticket.precio}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompraExitosa;