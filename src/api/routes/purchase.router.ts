// routes/purchase.router.ts
import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware";
import { CreatePurchaseSchema } from "../../core/schemas/purchase.schema";
import { Purchase } from "../../core/services/purchase.service";

export const purchaseRouter = Router();

purchaseRouter.post(
  "/",
  validateBody(CreatePurchaseSchema),
  async (req, res) => {
    try {
      const { clientId, items } = req.body;
      const newPurchase = new Purchase(clientId, items);
      const error = await newPurchase.insert();

      if (error) {
        if (
          error === "ER_NO_REFERENCED_ROW" ||
          error === "ER_NO_REFERENCED_ROW_2"
        ) {
          return res
            .status(400)
            .json({ message: "Produto ou cliente não encontrado" });
        } else {
          return res
            .status(500)
            .json({ message: "Erro ao registrar a compra" });
        }
      }

      res.status(201).json(newPurchase.toJson());
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Erro interno ao registrar compra" });
    }
  }
);
