import request from "supertest";
import { Artisan } from "../classes/artisan.class";
import { artisanRouter } from "./artisan.router";
import express, { Express } from "express";

describe("artisanRouter", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/artisans", artisanRouter);
  });

  it("Deve criar um novo artesão com dados válidos", async () => {
    const name = "João da Silva";
    const email = `joao${Date.now()}@teste.com`;
    const expectedRes = {
      id: 1,
      name,
      email,
    };

    const mockInsert = jest
      .spyOn(Artisan.prototype, "insert")
      .mockResolvedValue(null);
    const mockToJson = jest
      .spyOn(Artisan.prototype, "toJson")
      .mockReturnValue(expectedRes);

    const res = await request(app).post("/artisans").send({
      name,
      email,
      password: "senha123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRes);

    // Limpa os mocks após o teste
    mockInsert.mockRestore();
    mockToJson.mockRestore();
  });
});
