import z from "zod";

export const loginDTO = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerDTO = z.object({
  email: z.email(),
  password: z.string(),
});
