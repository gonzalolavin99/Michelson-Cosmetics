import React, { useState } from "react";
import { useEffect } from "react";
import ApiTicket from "../api/ticket/Ticket";
import { Ticket } from "../models/ticket";
import { ResponseBase } from "../api/ResponseBase";

const PruebaApi = () => {
  const [ticket, setTicket] = useState<Ticket>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    ApiTicket.GetTicket().then((res: ResponseBase<Ticket> | undefined) => {
      if (res?.Data != undefined) {
        setTicket(res.Data);
        setLoading(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  // Modals del componente

  return (
    <>
      {!loading ? (
        <>
          <p>...Cargando</p>
        </>
      ) : (
        <>
          Respuesta Api: Ticket {ticket?.id} - {ticket?.nombre}
        </>
      )}
    </>
  );
};

export default PruebaApi;
