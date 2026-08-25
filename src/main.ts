import express, { type Request, type Response } from "express";
import { AuthController } from "./controller/auth.js";
import { IsLogged } from "./middleware/isLogged.js";
import "./validadeEnv.js";
import { AuthService } from "./service/auth.js";
const authService = new AuthService();
const authRoutes = new AuthController(authService);
const app = express();

app.use(express.json());

app.post("/register", (req, res) => authRoutes.register(req, res));

app.post("/login", (req, res) => authRoutes.login(req, res));

app.get("/admin", IsLogged, (req: Request, res: Response) => {
  res.send("AUTHORIZED");
});

app.listen(3000, () => {
  console.log("system running in port http://localhost:3000");
});
