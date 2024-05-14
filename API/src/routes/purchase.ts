import express from "express";
import PurchaseController from "@controllers/purchase";
import { Purchase } from "@models/Purchase";

const router = express.Router();

router.get("/", async (_req, res) => {
 
  res.json(await PurchaseController.getPurchase());
});

router.post("/", async (req, res) => {
 console.log(req.body)
  res.send( await PurchaseController.savePurchase(req.body as Purchase));
});

export default router;
