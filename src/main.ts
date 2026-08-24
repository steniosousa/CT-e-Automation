import express, { Request, request, Response } from "express"
import { User } from "./types/user"


const app = express()

app.use(express.json())

const users = new Map<string,User>()

app.get("/", (req:Request, res:Response) =>{
    res.send("page/")
})

app.post("/login")

app.listen(3000,() =>{ console.log("system running in port http://localhost:3000")})