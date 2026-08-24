import z from "zod";

export const loginDTO = z.object({
    email: z.email(),
    password: z.string()
})