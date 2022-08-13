import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import AuthDTO from "../../../../domain/dto/application/AuthDTO";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import MakeTEDDTO from "../../../../domain/dto/usecase/MakeTEDDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
export default class MakeTED {
  constructor(readonly httpClient: HttpClientInterface) {}

  async makeTED(input: MakeTEDDTO, auth: AuthDTO): Promise<OutputDTO> {
    const body = {
      contacorrente: {
        inscricaoparceiro: process.env.ARBI_SUBSCRIPTION,
        tokenusuario: process.env.ARBI_TOKEN,
        idrequisicao: uuidv4(),
        idmodulo: "1",
        idtransacao: "2",
        bancoorigem: input.originbank,
        agenciaorigem: input.originAgency,
        contaorigem: input.originAccount,
        tipocontadebitada: input.typeOriginAccount,
        bancodestino: input.targetBank,
        agenciadestino: input.targetAgency,
        contadestino: input.targetAccount,
        tipocontacreditada: input.typeTargetAccount,
        cnpjcpfclicred: input.targetClientDocument,
        nomeclicred: input.targetClientName,
        tipopessoaclicred: input.targetClientType,
        finalidade: "10",
        historico: "",
        dataagendamento: moment().format("YYYY-MM-DD"),
        valor: input.value,
        canalentrada: "I",
      },
    };
    const headers = {
      client_id: auth.arbiUsername,
      access_token: auth.arbiToken,
    };
    await this.httpClient.post(process.env.ARBI_BASE_URL + "/contacorrente/v2/contacorrente", body, headers);
    return { statusCode: 200, data: { message: "TED created successfully" } };
  }
}
