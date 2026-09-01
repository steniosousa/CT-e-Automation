import type { Request, Response } from "express";
import type { TruckService } from "../service/truck.js";
import { vehicleCreateSchema } from "../DTO/vehicle.js";

export class TruckController {
  constructor(readonly truckService: TruckService) {}
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
