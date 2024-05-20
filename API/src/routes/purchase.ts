import express from "express";
import PurchaseController from "@controllers/purchase";
import { PurchaseRequest } from "src/dto/PurchaseRequest";
import { NotifyRequest } from "@dto/NotifyRequest";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.json(await PurchaseController.getPurchase());
});

router.post("/", async (req, res) => {
 console.log(req.body)
  res.send( await PurchaseController.createNewPurchase(req.body as PurchaseRequest));
});
router.post("/notifyPurchase", async (req, res) => {
  console.log(req.body)
   res.send( await PurchaseController.notifyPurchase(req.body as NotifyRequest));
 });

export default router;
