import express from "express";
import cors from "cors";
//Importacion de Routes
import ticketRouter from "@routes/ticket"
import purchaseRouter from "@routes/purchase"
import loginRouter from "@routes/login"

const app = express();
// Then pass these options to cors:
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['https://jrmichelson.cl',
//'http://localhost:5173'
];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use("/ticket", ticketRouter);
app.use("/purchase", purchaseRouter);
app.use("/login", loginRouter);

export default app;