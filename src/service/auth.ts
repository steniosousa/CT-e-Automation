import JsonWebToken from "jsonwebtoken";
import { read, save } from "../database/connection.js";
import bcrypt from "bcrypt";
import { env } from "../validadeEnv.js";

export class AuthService {
  async register(email: string, password: string) {
    const user = (await read()).users.find((u) => u.email === email);
    if (user) {
      throw new Error("USER ALREADY EXIST");
    }
    const userId = Math.random().toString();

    const hash = await bcrypt.hash(password, 10);
    await save({
      id: userId,
      email,
      password: hash,
    });
  }

  async login(email: string, password: string) {
    const user = (await read()).users.find((u) => u.email === email);

    if (!user) {
      throw new Error("INVALID EMAIL OR PASSWORD ");
    }

    const hashCompare = await bcrypt.compare(password, user.password);

    if (!hashCompare) {
      throw new Error("INVALID EMAIL OR PASSWORD");
    }

    const token = JsonWebToken.sign(
      {
        email,
      },
      env.JWT_TOKEN,
      { expiresIn: "1d" },
    );

    return token;
  }
}
