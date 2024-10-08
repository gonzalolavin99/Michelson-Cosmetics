import express from "express";
import cors from "cors";
//Importacion de Routes
import ticketRouter from "@routes/ticket";
import purchaseRouter from "@routes/purchase";
import loginRouter from "@routes/login";
import { env } from "env";

const app = express();

const allowedOrigins = ["https://jrmichelson.cl","http://3.145.103.55"];

const options: cors.CorsOptions = {
  origin: (origin, callback) => {
    console.log("Se esta validando el siguiente origin: "+origin)
    if (allowedOrigins.find((o) => o == origin) || env().isLocal) {
    
      callback(null, true);
    } else {
      
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use("/ticket", ticketRouter);
app.use("/purchase", purchaseRouter);
app.use("/login", loginRouter);

export default app;
