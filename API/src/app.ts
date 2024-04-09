import express from "express";
import cors from "cors";
//Importacion de Routes
import ticketRouter from "./routes/ticket";

const app = express();
// Then pass these options to cors:
app.use(cors());
app.use(express.json());
app.use("/ticket", ticketRouter);

export default app;