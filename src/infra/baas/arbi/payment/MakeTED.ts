import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import MakeTedDTO from "../../../../dto/usecase/MakeTedDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
export default class MakeTed {
  constructor(readonly httpClient: HttpClientInterface) {}

  async makeTed(input: MakeTedDTO, auth: AuthDTO): Promise<OutputDTO> {
    const body = {
      contacorrente: {
        inscricaoparceiro: process.env.ARBI_SUBSCRIPTION,
        tokenusuario: process.env.ARBI_TOKEN,
        idrequisicao: uuidv4(),
        idmodulo: "1",
        idtransacao: "2",
        bancoorigem: input.originbank,
        agenciaorigem: input.payerAgency,
        contaorigem: input.payerAccount,
        tipocontadebitada: input.payerAccountType,
        bancodestino: input.targetBank,
        agenciadestino: input.targetAgency,
        contadestino: input.targetAccount,
        tipocontacreditada: input.targetAccountType,
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
