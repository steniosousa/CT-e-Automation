import type { Request, Response } from "express";
import type { DriverService } from "../service/driver.js";
import { userSchema } from "../DTO/user.js";

export class DriverController {
  constructor(private service: DriverService) {}
  async registerDriver(req: Request, res: Response) {
    try {
      const validade = userSchema.safeParse(req.body);
      if (!validade.success) {
        return res
          .status(400)
          .json({
            message: "Campos inválidos",
            errors: validade.error.issues.map((issue) => issue.message),
          });
      }

      const { username, cpfCnpj, rntc, company, egstoken } = validade.data;

      await this.service.registerDriver(company, egstoken, {
        username,
        cpfCnpj,
        rntc,
      });
      res.status(201).json({ message: "Motorista registrado com sucesso" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async driverExist(req: Request, res: Response) {
    try {
      const datas = await this.service.findDriver(
        "GADELOG",
        "yF0vFH7yDOwMaxvW899Him2lWI9PBr6a5F_w8nxRYsWLj96lPUz4NW4ZcwLjqP7WsKtQ0ShXDOQVnej48J8oBa4he02zqV5s_I5z5jhFJyy6irkJ1Tt3x1TJKMkGqr4_wlkv9Lm6UvxN4R6kqo2rAdqIXb-ykCf25Ol7sJSsRtyydnQZD_eqqqy4j5utZzvWsbJGr4cr76Ykossk3GQS6yPNZbgAAJH6BLnND9DN7of7VnDOWf0dTb8myyxwyoIgFJ7PHko5XZOsUNVCvOoCGuBjO5_i-4BsUE2mvVQbJ2doNaGKits-a5UKU8fXJBMgJ7QRkHweKMmWtN7N3dcf4KMZq9AyHX_BR9hgkzBY4w9-XMWj9Jm8eW1GaE4nJ_BAyYzVJSvGdHXU9CA6WuHBj0USLieJ2NvGupIXZh50DneXmW8eIo6MlsO2sowUnai6NopFghfJIedN32kGDOnZfEWeDEueTwwxW-TpEISxudPnwjeAK_9X5-VFG6lxKoRkQfB5QSGZRclz1VxXOT1tT-3jQSF4RwBd6Q90vKJ0OKOhxyi42IkG0K5svtcjQkMH",
        "70558116604",
      );
      res.json(datas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
