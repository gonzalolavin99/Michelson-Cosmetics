import { LoginRequest } from './../dto/LoginRequest';
import LoginController from "@controllers/login";
import express from "express";


const router = express.Router();

router.post("/", async (_req, res) => {
  res.json(await LoginController.login(_req.body as LoginRequest));
});




export default router;
