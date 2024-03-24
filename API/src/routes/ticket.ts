import express from "express";
import { Ticket } from "../models/ticket";



const router = express.Router();

router.get("/", (_req, res) => {
  const ticket: Ticket = {
    id: 23,
    pass: "Jordan",
    idPurchase: 32

  };

  res.send(ticket);
});

router.post("/", (req, res) => {
  const ticket: Ticket = req.body as Ticket;
  res.send(`Ticket recibido ${ticket.pass} - ${ticket.id}`);
});

export default router;
