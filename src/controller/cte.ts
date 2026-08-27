import type { Request, Response } from "express";
import { readerPdf } from "../utils/readerPdf.js";

export class CteController {
  async create(req: Request, res: Response) {
    const file = req.file?.buffer;
    if (!file) {
      throw new Error("FILE NOT FOUND");
    }
    const text = await readerPdf(file);
    res.json(text);
  }
}
