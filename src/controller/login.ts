import { Request, Response } from "express";
import { loginDTO } from "../DTO/auth";

export class LoginController {
    login(req: Request, res: Response) {
        const validade = loginDTO.safeParse(req.body)
        if(validade.error){
            res.json({
                statusCode:400,
                detail:validade.error.issues.map((error) =>({
                    message: error.message,
                    path:error.path
                }))
            })
        }
    }
}