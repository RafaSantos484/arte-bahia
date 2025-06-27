// core/services/purchase.service.ts
import { FieldPacket, ResultSetHeader } from "mysql2";
import { MySql } from "../../config/mysql";
import { Table } from "../interfaces/table.interface";

export class Purchase implements Table {
  id: number;
  clientId: number;
  items: { productId: number; quantity: number }[];

  constructor(
    clientId: number,
    items: { productId: number; quantity: number }[],
    id = -1
  ) {
    this.id = id;
    this.clientId = clientId;
    this.items = items;
  }

  async insert(): Promise<string | null> {
    const pool = MySql.getPool();
    try {
      await pool.beginTransaction();

      const [purchaseResult] = (await pool.execute(
        "INSERT INTO purchase (client_id) VALUES (?)",
        [this.clientId]
      )) as [ResultSetHeader, FieldPacket[]];

      this.id = purchaseResult.insertId;

      for (const item of this.items) {
        await pool.execute(
          `INSERT INTO purchase_item (purchase_id, product_id, quantity)
           VALUES (?, ?, ?)`,
          [this.id, item.productId, item.quantity]
        );
      }

      await pool.commit();
      return null;
    } catch (err: any) {
      console.log(err);
      await pool.rollback();
      return err.code ?? "ER_UNKNOWN";
    }
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      clientId: this.clientId,
      items: this.items,
    };
  }
}
