// core/services/product.service.ts
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { MySql } from "../../config/mysql";
import { Table } from "../interfaces/table.interface";

export class Product implements Table {
  id: number;
  name: string;
  description: string;
  price: number;
  artisanId: number;
  category: string;

  constructor(
    name: string,
    description: string,
    price: number,
    artisanId: number,
    category: string,
    id = -1
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.artisanId = artisanId;
    this.category = category;
  }

  async insert(): Promise<string | null> {
    try {
      const [result] = (await MySql.execute(
        `INSERT INTO product (name, description, price, artisan_id, category)
         VALUES (?, ?, ?, ?, ?)`,
        [
          this.name,
          this.description,
          this.price.toString(),
          this.artisanId.toString(),
          this.category,
        ]
      )) as [ResultSetHeader, FieldPacket[]];

      this.id = result.insertId;
      return null;
    } catch (err: any) {
      console.log(err);
      return (err.code ?? "ER_UNKNOWN") as string;
    }
  }

  static async findById(id: number): Promise<Product | null> {
    const [rows] = (await MySql.execute("SELECT * FROM product WHERE id = ?", [
      id.toString(),
    ])) as [RowDataPacket[], FieldPacket[]];

    if (rows.length === 0) return null;

    const p = rows[0];
    return new Product(
      p.name,
      p.description,
      p.price,
      p.artisan_id,
      p.category,
      p.id
    );
  }

  static async findAll(filters?: {
    artisanId?: number;
    name?: string;
    category?: string;
  }): Promise<Product[]> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (filters?.artisanId !== undefined) {
      conditions.push("artisan_id = ?");
      params.push(filters.artisanId);
    }

    if (filters?.name) {
      conditions.push("name LIKE ?");
      params.push(`%${filters.name}%`);
    }

    if (filters?.category) {
      conditions.push("category = ?");
      params.push(filters.category);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";
    const query = `SELECT * FROM product ${whereClause}`;

    const [rows] = (await MySql.execute(query, params)) as [
      RowDataPacket[],
      FieldPacket[]
    ];

    return rows.map(
      (p) =>
        new Product(
          p.name,
          p.description,
          p.price,
          p.artisan_id,
          p.category,
          p.id
        )
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      artisanId: this.artisanId,
      category: this.category,
    };
  }
}
