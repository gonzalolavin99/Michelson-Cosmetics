import React, { useState } from "react";
import { useEffect } from "react";
import ApiTicket from "../api/ticket/Ticket";
import { Ticket } from "../models/ticket";
import { ResponseBase } from "../api/ResponseBase";
import { Col, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";

const PruebaApi = () => {
  const [ticket, setTicket] = useState<Ticket[]>();
  const [isloading, setLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Ticket>();
  useEffect(() => {
    GetTickets();
    // eslint-disable-next-line
  }, []);

  const GetTickets = () => {
    setLoading(true);
    ApiTicket.GetTicket().then((res: ResponseBase<Ticket> | undefined) => {
      if (res?.Success) {
        console.log(res.DataList);
        setTicket(res.DataList as Ticket[]);
        setLoading(false);
      }
    });
  };

  const onSubmit: SubmitHandler<Ticket> = (data) => {
    ApiTicket.SaveTicket(data).then((res: ResponseBase<Ticket> | undefined) => {
      if (res?.Success) {
        GetTickets();
        reset();
      }
    });
  };
  return (
    <div className="mt-5">
      {isloading == true ? (
        <>
          <p>...Cargando</p>
        </>
      ) : (
        <>
          Respuesta Api:
          {ticket?.map((a, key) => {
            return (
              <div   key={key}>
                <p>Ticket id:{a.id}, Pass: {a.pass}, IdPurchase: {a.idPurchase}</p>
                <br />
              </div>
            );
          })}
          <Row>
            <Col>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" defaultValue="pass" {...register("pass", { required: true })} />

                <input type="number" {...register("idPurchase", { required: true , maxLength:10})} />

                <input type="submit" />
              </form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default PruebaApi;
