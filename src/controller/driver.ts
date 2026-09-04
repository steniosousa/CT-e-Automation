import type { Request, Response } from "express";
import type { DriverService } from "../service/driver.js";
import { userSchema } from "../DTO/user.js";
import type { Company } from "../types/global.types.js";

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
      res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async findDriver(req: Request, res: Response) {
    try {
      const { company, egstoken, cpfCnpj } = req.query;
      if (!company || !egstoken || !cpfCnpj) {
        res
          .status(400)
          .json({ message: "company, egstoken e cpfCnpj são obrigatórios" });
        return;
      }

      const datas = await this.service.findDriver(
        company as Company,
        egstoken as string,
        cpfCnpj as string,
      );
      res.json(datas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
