import type { Request, Response } from "express";
import type { TruckService } from "../service/truck.js";
import { vehicleCreateSchema } from "../DTO/vehicle.js";
import type { Company } from "../types/global.types.js";

export class TruckController {
  constructor(readonly truckService: TruckService) {}

  async findTruck(req: Request, res: Response) {
    try {
      const { company, egstoken, placa } = req.query;
      if (!company || !egstoken || !placa) {
        res
          .status(400)
          .json({ message: "company, egstoken e placa são obrigatórios" });
        return;
      }

      const datas = await this.truckService.listTrucks(
        company as Company,
        egstoken as string,
        placa as string,
      );
      res.json(datas.value);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validade = vehicleCreateSchema.safeParse(req.body);
      if (!validade.success) {
        return res.status(400).json({
          message: "Campos inválidos",
          errors: validade.error.issues.map((issue) => issue.message),
        });
      }
      const result = await this.truckService.createTruck(validade.data);
      res
        .status(201)
        .json({ message: "Caminhão registrado com sucesso", data: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }
}
