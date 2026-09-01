import type z from "zod";
import { egsConnection } from "../axios.js";
import type { vehicleCreateSchema } from "../DTO/vehicle.js";
import type { Company } from "../types/global.types.js";

export class TruckService {
  async listTrucks(company: Company, token: string, placa: string) {
    try {
      const api = egsConnection(company, token);
      const { data } = await api.get("/odata/Gveiculo", {
        params: {
          $filter: `(contains(tolower(PLACA), '${placa}')) and (STATUS ne 'C')`,
          $count: true,
          $top: 20,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Error fetching truck data", { cause: error });
    }
  }

  async createTruck(datas: z.infer<typeof vehicleCreateSchema>) {
    const alrerdyExist = await this.listTrucks(
      datas.company,
      datas.egstoken,
      datas.vehicleData.placa,
    );
    if (alrerdyExist.value.length > 0) {
      throw new Error("Caminhão já cadastrado");
    }

    const vehicleData = {
      PLACA: datas.vehicleData.placa,
      CAPACIDADEKG: datas.vehicleData.capacidade,
      TARA: datas.vehicleData.tara,
      UF: datas.vehicleData.uf,
      DESCRICAO: datas.vehicleData.descricao,
      RENAVAN: datas.vehicleData.renavam,
      TIPOPROPRIETARIO: "1",
      TIPOCARROCERIA: datas.vehicleData.tipoCarroceria,
      IDGRUPOVEICULO: datas.vehicleData.tipoRodado,
      TIPOVEICULO: datas.vehicleData.tipoVeiculo,
      RNTC: datas.vehicleData.rntc_veiculo,
      OBSVEICMOTVEIC: `Veiculo: ${datas.vehicleData.placa}\nMotorista: ${datas.vehicleData.nome_motorista}`,
      CATCOMBVEICULAR: datas.vehicleData.eixos,
    };

    const api = egsConnection(datas.company, datas.egstoken);
    const { data } = await api.post("/api/GveiculoApi/Post", vehicleData);
    return data;
  }
}
