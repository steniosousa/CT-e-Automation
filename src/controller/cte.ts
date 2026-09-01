import type { Request, Response } from "express";
import { ReaderCRLV } from "../utils/readerCRLV.js";
import ReaderXML from "../utils/readerXML.js";

export class CteController {
  async create(req: Request, res: Response) {
    const file = req.file?.buffer;
    if (!file) {
      throw new Error("FILE NOT FOUND");
    }
    const text = await ReaderCRLV(file);
    res.json(text);
  }

  async xml(req:Request, res:Response) {
    const file = req.file?.buffer;
    if (!file) {
      throw new Error("FILE NOT FOUND");
    }
    const text = await ReaderXML(file);
    res.json(text);
  }
}
