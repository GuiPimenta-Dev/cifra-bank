import { v4 as uuidv4 } from "uuid";
import AuthDTO from "../../../../dto/application/AuthDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class ConsultBalance {
  constructor(private httpClient: HttpClientInterface) {}

  async getBalance(bank: string, agency: string, payerAccount: string, auth: AuthDTO): Promise<any> {
    const body = {
      contacorrente: {
        inscricaoparceiro: process.env.ARBI_SUBSCRIPTION,
        tokenusuario: process.env.ARBI_TOKEN,
        idrequisicao: uuidv4(),
        idmodulo: "1",
        idtransacao: "3",
        bancoorigem: bank,
        agenciaorigem: agency,
        contaorigem: payerAccount,
        tipocontadebitada: "CC",
      },
    };
    const headers = {
      client_id: auth.arbiUsername,
      access_token: auth.arbiToken,
    };
    const { statusCode, data } = await this.httpClient.post(
      process.env.ARBI_BASE_URL + "/contacorrente/v2/contacorrente",
      body,
      headers
    );
    return { statusCode, data: { balance: data[0].resultado } };
  }
}
