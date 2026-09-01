import { egsConnection } from "../axios.js";
import type { Company } from "../types/global.types.js";
import { convertToCpfCnpj } from "../utils/conversor.js";

export class DriverService {
  async findDriver(company: Company, token: string, cpfCnpj: string) {
    const api = egsConnection(company, token);
    const convertToCnpj = convertToCpfCnpj(cpfCnpj);

    try {
      const { data } = await api.get(
        `/odata/Gcadastro?$filter=(contains(tolower(CPFCNPJ),%27${convertToCnpj}%27))+and+(STATUS+ne+%27C%27)&$count=true&$top=20`,
      );
      return data.value;
    } catch (error) {
      throw new Error("Error fetching driver data", { cause: error });
    }
  }

  async registerDriver(
    company: Company,
    token: string,
    driverData: { username: string; cpfCnpj: string; rntc: string },
  ) {
    const alrerdyExist = await this.findDriver(
      company,
      token,
      driverData.cpfCnpj,
    );
    if (alrerdyExist.length > 0) {
      throw new Error("Motorista já cadastrado");
    }
    const convertToCnpj = convertToCpfCnpj(driverData.cpfCnpj);

    const novoProprietario = {
      RAZAOSOCIAL: driverData.username,
      CPFCNPJ: convertToCnpj.replace(/\D/g, ""),
      RNTC: driverData.rntc,
    };
    const api = egsConnection(company, token);
    try {
      const { data } = await api.post(
        `/api/GcadastroApi/post`,
        novoProprietario,
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao registrar motorista", { cause: error });
    }
  }
}
