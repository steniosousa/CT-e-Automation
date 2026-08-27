import type { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import type { jwtPayload } from "../types/user.js";
import { env } from "../env.js";

export function IsLogged(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    res
      .json({
        statusCode: 401,
        message: "MISSING AUTHORIZATION TOKEN",
      })
      .status(401);
    return;
  }
  const [type, token] = authorization?.split(" ");
  if (type !== "Bearer" || !token) {
    res
      .json({
        statusbar: 401,
        message: "INVALID AUTHORIZATION TOKEN",
      })
      .status(401);
    return;
  }

  const decoded = jsonwebtoken.verify(token, env.JWT_TOKEN) as jwtPayload;
  req.user === decoded;
  next();
}
