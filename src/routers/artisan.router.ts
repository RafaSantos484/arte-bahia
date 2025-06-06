import { Router } from "express";
import { Artisan } from "../classes/artisan.class";
import { validateBody } from "../middlewares/validate.middleware";
import { CreateArtisanSchema } from "../schemas/artisan.schema";

export const artisanRouter = Router();

artisanRouter.post("/", validateBody(CreateArtisanSchema), async (req, res) => {
  try {
    const newArtisan = new Artisan(req.body.name, req.body.email);
    const error = await newArtisan.insert(req.body.password);
    if (error) {
      if (error === "ER_DUP_ENTRY") {
        res.status(400).json({ message: "Artesão já cadastrado" });
      } else {
        res.status(500).json({ message: "Falha ao tentar criar artesão" });
      }
    } else {
      res.status(200).json(newArtisan.toJson());
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Falha ao tentar criar artesão" });
  }
});
