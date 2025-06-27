import { FieldPacket, ResultSetHeader } from "mysql2";
import { Auth } from "./auth.service";
import { MySql } from "../../config/mysql";
import { Table } from "../interfaces/table.interface";

export class Artisan implements Table {
  id: number;
  name: string;
  email: string;

  constructor(name: string, email: string, id = -1) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  async insert(password: string): Promise<string | null> {
    try {
      const hashedPassword = await Auth.encrypt(password);
      const [result] = (await MySql.execute(
        "INSERT INTO artisan (name, email, password) VALUES (?, ?, ?)",
        [this.name, this.email, hashedPassword]
      )) as [ResultSetHeader, FieldPacket[]];

      this.id = result.insertId;
      return null;
    } catch (err: any) {
      console.log(err);
      return (err.code ?? "ER_UNKNOWN") as string;
    }
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
