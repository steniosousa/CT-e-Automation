import express, { Request, request, Response } from "express"
import { User } from "./types/user"
import { AuthController } from "./controller/auth"


const app = express()

app.use(express.json())

const authRoutes = new AuthController()

export const users = new Map<string, User>()

app.get("/", (req: Request, res: Response) => {
    res.send("page/")
})

app.post("/register", authRoutes.register)

app.post("/login", authRoutes.login)

app.listen(3000, () => { console.log("system running in port http://localhost:3000") })