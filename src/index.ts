import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { artisanRouter } from "./api/routes/artisan.router";
import { clientRouter } from "./api/routes/client.router";
import { productRouter } from "./api/routes/product.router";
import { purchaseRouter } from "./api/routes/purchase.router";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/artisan", artisanRouter);
app.use("/client", clientRouter);
app.use("/product", productRouter);
app.use("/purchase", purchaseRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
