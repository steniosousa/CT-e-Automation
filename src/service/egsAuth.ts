import axios from "axios";

const EGS_CLIENT_SECRET = "eg$ystem";

export interface EgsLoginResult {
  token: string;
  urlapi: string;
}

interface ServerUrlResponse {
  URLAPI: string;
  AUXTOKEN: string;
}

interface TokenResponse {
  access_token: string;
  [key: string]: unknown;
}

export async function egsLogin(
  chaveAcesso: string,
  username: string,
  password: string,
): Promise<EgsLoginResult> {
  const { data: serverInfo } = await axios.get<ServerUrlResponse>(
    "https://api.egssistemas.com.br/EGSWEB/api/Sistema/GetServerUrlByChaveAcessoV1",
    { params: { CHAVEACESSO: chaveAcesso, EGSERP: true } },
  );

  const basicAuth = Buffer.from(`${chaveAcesso}:${EGS_CLIENT_SECRET}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    auxtoken: serverInfo.AUXTOKEN,
    captcha: "",
    codigo2fa: "",
  });

  const { data: tokenData } = await axios.post<TokenResponse>(
    `${serverInfo.URLAPI}token`,
    body.toString(),
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return { token: tokenData.access_token, urlapi: serverInfo.URLAPI };
}
