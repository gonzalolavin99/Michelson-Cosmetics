import express from "express";
import PurchaseController from "@controllers/purchase";
import { PurchaseRequest } from "src/dto/PurchaseRequest";
import { NotifyRequest } from "@dto/NotifyRequest";
import LoginController from "@controllers/login";

const router = express.Router();

router.get("/", LoginController.verifyToken,async (_req, res) => {
  res.json(await PurchaseController.getPurchase());
});

router.post("/", LoginController.verifyToken,async (req, res) => {
 console.log(req.body)
  res.send( await PurchaseController.createNewPurchase(req.body as PurchaseRequest));
});
router.post("/notifyPurchase", LoginController.verifyToken,async (req, res) => {
  console.log(req.body)
   res.send( await PurchaseController.notifyPurchase(req.body as NotifyRequest));
 });

export default router;
