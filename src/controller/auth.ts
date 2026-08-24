import { Request, Response } from "express";
import { loginDTO, registerDTO } from "../DTO/auth";
import jsonwebtoken from "jsonwebtoken"
import { users } from "../main";


export class AuthController {
    login(req: Request, res: Response) {
        const validade = loginDTO.safeParse(req.body)

        if (validade.error) {
            res.json({
                statusCode: 400,
                detail: validade.error.issues.map((error) => ({
                    message: error.message,
                    path: error.path
                }))
            })
            return
        }
        const { email, password } = validade.data
        const user = users.get(email)

        if (password !== user?.password) {
            res.json({
                statusCode: 400,
                detail: "Email Or Password Invalid"
            })
            return
        }


        const token = jsonwebtoken.sign({
            email
        }, "adnsm~çfd", { expiresIn: "1d" })

        res.send({ token }).status(200)
    }

    register(req: Request, res: Response) {
        const validade = registerDTO.safeParse(req.body)

        if (validade.error) {
            res.json({
                statusCode: 400,
                detail: validade.error.issues.map((error) => ({
                    message: error.message,
                    path: error.path
                }))
            })
            return
        }
        const userId = Math.random().toString()
        users.set(userId, {
            id: userId,
            email: validade.data.email,
            password: validade.data.password
        })

        res.send("SUCCESSFULLY REGISTERED").status(201)

    }
}