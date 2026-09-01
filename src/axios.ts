import axios, { type AxiosInstance } from "axios";
import type { Company } from "./types/global.types.js";


export function egsConnection(company: Company, token: string): AxiosInstance {
  const baseURL =
    company === "GADELOG"
      ? "https://api.egssistemas.com.br/EGSAPP4/"
      : "https://api.egssistemas.com.br/EGSCTE/";

  return axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
