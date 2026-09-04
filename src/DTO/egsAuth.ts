import z from "zod";

export const egsLoginSchema = z.object({
  chaveAcesso: z.string().min(1, { message: "Chave de acesso é obrigatória" }),
  username: z.string().min(1, { message: "Login é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});
