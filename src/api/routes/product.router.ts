import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware";
import { CreateProductSchema } from "../../core/schemas/product.schema";
import { Product } from "../../core/services/product.service";

export const productRouter = Router();

productRouter.post("/", validateBody(CreateProductSchema), async (req, res) => {
  try {
    const { name, description, price, artisanId, category } = req.body;

    const newProduct = new Product(
      name,
      description,
      price,
      artisanId,
      category
    );
    const error = await newProduct.insert();

    if (error) {
      if (
        error === "ER_NO_REFERENCED_ROW" ||
        error === "ER_NO_REFERENCED_ROW_2"
      ) {
        res.status(400).json({ message: "Artesão não encontrado" });
      } else {
        res.status(500).json({ message: "Falha ao tentar criar produto" });
      }
    } else {
      res.status(200).json(newProduct.toJson());
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Falha ao tentar criar produto" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(product.toJson());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const artisanId = req.query.artisanId
      ? Number(req.query.artisanId)
      : undefined;
    const name = req.query.name?.toString();
    const category = req.query.category?.toString();

    if (artisanId && isNaN(artisanId)) {
      return res.status(400).json({ message: "artisanId inválido" });
    }

    const products = await Product.findAll({ artisanId, name, category });
    res.status(200).json(products.map((p) => p.toJson()));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
});
