import mysql, { Pool } from "mysql2/promise";

export class MySql {
  private static pool: Pool | null = null;

  public static getPool(): Pool {
    if (!this.pool) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "my_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    return this.pool;
  }

  public static async execute(sql: string, params?: string[]) {
    const pool = this.getPool();
    return await pool.execute(sql, params);
  }
}
