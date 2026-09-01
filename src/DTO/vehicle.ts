import z from "zod";

export const vehicleCreateSchema = z.object({
  company: z.enum(["GADELOG", "INTERMEDIUM"], { message: "Invalid company" }),
  egstoken: z.string().min(1, { message: "Token is required" }),
  vehicleData: z.object({
    placa: z.string().min(1, { message: "Placa is required" }),
    capacidade: z.number().min(1, { message: "Capacidade is required" }),
    tara: z.number().min(1, { message: "Tara is required" }),
    uf: z
      .string()
      .min(2, { message: "UF is required" })
      .max(2, { message: "UF must be 2 characters long" }),
    descricao: z.string().min(1, { message: "Descricao is required" }),
    renavam: z.string().min(1, { message: "Renavam is required" }),
    tipoCarroceria: z
      .string()
      .min(1, { message: "Tipo Carroceria is required" }),
    tipoRodado: z.string().min(1, { message: "Tipo Rodado is required" }),
    tipoVeiculo: z.string().min(1, { message: "Tipo Veiculo is required" }),
    rntc_veiculo: z
      .string()
      .min(8, { message: "RNTC Veiculo is required" })
      .max(8, { message: "RNTC Veiculo must be 8 characters long" }),
    eixos: z.string().min(1, { message: "Eixos is required" }),
    nome_motorista: z
      .string()
      .min(1, { message: "Nome Motorista is required" }),
  }),
});
