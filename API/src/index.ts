import express from "express";
import cors from "cors";
//Importacion de Routes
import ticketRouter from "./routes/ticket";
// const allowedOrigins = ["*"];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };
const app = express();
// Then pass these options to cors:
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/ticket", ticketRouter);

app.get("/test", (_, res) => {
  console.log("Hola mundoooo!");
  res.send("Hola mundoooo jeje!");
});

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
