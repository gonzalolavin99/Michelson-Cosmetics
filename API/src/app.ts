import express from "express";
import cors from "cors";
//Importacion de Routes
import ticketRouter from "@routes/ticket"
import purchaseRouter from "@routes/purchase"

const app = express();
// Then pass these options to cors:
app.use(cors());
app.use(express.json());
app.use("/ticket", ticketRouter);
app.use("/purchase", purchaseRouter);

export default app;