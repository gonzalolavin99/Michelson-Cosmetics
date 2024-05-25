import express from "express";
import { Ticket } from "@models/Ticket";
import TicketController from "@controllers/ticket";
import LoginController from "@controllers/login";

const router = express.Router();

router.get("/", LoginController.verifyToken,async (_req, res) => {
 
  res.json(await TicketController.getTicket());
});

router.post("/", LoginController.verifyToken,async (req, res) => {
 console.log(req.body)
  res.send( await TicketController.saveTicket(req.body as Ticket));
});

export default router;
