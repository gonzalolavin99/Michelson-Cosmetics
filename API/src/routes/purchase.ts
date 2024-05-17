import express from "express";
import PurchaseController from "@controllers/purchase";
import { PurchaseRequest } from "src/dto/PurchaseRequest";

const router = express.Router();

router.get("/", async (_req, res) => {
 
  res.json(await PurchaseController.getPurchase());
});

router.post("/", async (req, res) => {
 console.log(req.body)
  res.send( await PurchaseController.createNewPurchase(req.body as PurchaseRequest));
});

export default router;
