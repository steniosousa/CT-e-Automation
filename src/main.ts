import express, { type Request, type Response } from "express";
import { AuthController } from "./controller/auth.js";
import { IsLogged } from "./middleware/isLogged.js";
import "./env.js";
import { AuthService } from "./service/auth.js";
import { CompanyController } from "./controller/company.js";
import multer from "multer";
import { CteController } from "./controller/cte.js";

const authService = new AuthService();
const authRoutes = new AuthController(authService);
const company = new CompanyController();
const cte = new CteController();
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(express.json());

app.post("/register", (req, res) => authRoutes.register(req, res));
app.post("/login", (req, res) => authRoutes.login(req, res));

app.get(
  "/admin",
  IsLogged,
  async (req, res) => await company.getCurrentCompany(req, res),
);

app.post(
  "/admin/crlv",
  upload.single("file"),
  IsLogged,
  async (req, res) => await cte.create(req, res),
);

app.post("/admin/xml",
  upload.single("file"),
  IsLogged,
  async(req,res) => await cte.xml(req,res)
)

app.listen(3000, () => {
  console.log("system running in port http://localhost:3000");
});
