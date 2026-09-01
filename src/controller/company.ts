import type { Request, Response } from "express";
import { egsConnection } from "../axios.js";

export class CompanyController {
  async getCurrentCompany(req: Request, res: Response) {
    // const { company, token } = req.body;
    // const api = egsConnection(company, token);
    // const { data } = await api.get("//api/Sistema/GetUserSession");
    // res.json({ data });
    res.send("AUTHORIZED");
  }

}
