import { v4 as uuidv4 } from "uuid";
import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import ConsultExtractDTO from "../../../../dto/usecase/ConsultExtractDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class ConsultExtract {
  constructor(private httpClient: HttpClientInterface) {}

  async getExtract(input: ConsultExtractDTO, auth: AuthDTO): Promise<OutputDTO> {
    const body = {
      contacorrente: {
        inscricaoparceiro: process.env.ARBI_SUBSCRIPTION,
        tokenusuario: process.env.ARBI_TOKEN,
        idrequisicao: uuidv4(),
        idmodulo: "1",
        idtransacao: "4",
        bancoorigem: input.bank,
        agenciaorigem: input.agency,
        contaorigem: input.account,
        tipocontadebitada: input.accountType,
        datainicial: input.startDate,
        datafinal: input.finalDate,
        canalentrada: "I",
      },
    };
    const headers = {
      client_id: auth.arbiUsername,
      access_token: auth.arbiToken,
    };
    return await this.httpClient.post(process.env.ARBI_BASE_URL + "/contacorrente/v2/contacorrente", body, headers);
  }
}
