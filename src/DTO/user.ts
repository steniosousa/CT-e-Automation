import z from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  cpfCnpj: z.string().min(1, { message: "CPF/CNPJ is required" }),
  rntc: z.string().min(8, { message: "RNTC is required" }).max(8, { message: "RNTC must be 8 characters long" }),
  company: z.enum(["GADELOG", "INTERMEDIUM"], { message: "Invalid company" }),
  egstoken: z.string().min(1, { message: "Token is required" }),
});
