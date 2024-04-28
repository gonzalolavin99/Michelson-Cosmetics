import express from "express";
import { Ticket } from "@models/Ticket";
import TicketController from "@controllers/ticket";

const router = express.Router();

router.get("/", async (_req, res) => {
 
  res.json(await TicketController.getTicket());
});

router.post("/", async (req, res) => {
 console.log(req.body)
  res.send( await TicketController.saveTicket(req.body as Ticket));
});

export default router;
