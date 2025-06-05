import bcrypt from "bcrypt";

export class Auth {
  public static async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, 12);
  }
}
