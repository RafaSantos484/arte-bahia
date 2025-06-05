import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { artisanRouter } from "./routers/artisan.router";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/artisan", artisanRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
