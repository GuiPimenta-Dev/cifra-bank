import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import MakePixDTO from "../../../../dto/usecase/MakePixDTO";
import moment from "moment";

export default class MakePix {
  constructor(readonly httpClient: HttpClientInterface) {}

  async getEndToEndKey(key: string, auth: AuthDTO): Promise<string> {
    const headers = {
      client_id: auth.arbiUsername,
      access_token: auth.arbiToken,
    };
    const { data } = await this.httpClient.get(
      process.env.ARBI_BASE_URL + "/pix/v2/enderecamento/dict/" + key + "/" + process.env.ARBI_SUBSCRIPTION,
      {},
      headers
    );
    const parsedData = JSON.parse(data[0].response);
    return parsedData.endToEnd;
  }

  async makePix(input: MakePixDTO, transactionId: string, auth: AuthDTO): Promise<OutputDTO> {
    const body = {
      endToEnd: transactionId,
      codInstituicaoPagador: input.payerBank,
      codAgenciaPagador: input.payerAgency,
      nroContaPagador: input.payerAccount,
      tipoContaPagador: input.payerAccountType,
      cpfCnpjPagador: input.payerDocument,
      valorOperacao: input.value,
      codUsuario: input.payerCode,
      dataPagamento: moment().format("YYYY-MM-DD"),
      nomePagador: input.payerName,
      campoLivre: input.text,
    };
    const headers = {
      client_id: auth.arbiUsername,
      access_token: auth.arbiToken,
    };
    const { data } = await this.httpClient.post(
      process.env.ARBI_BASE_URL + "/pix/v2/operacao/ordem_pagamento",
      body,
      headers
    );
    const parsedData = JSON.parse(data[0].response);
    const result = {
      orderId: parsedData.idOrdemPagamento,
      transactionId: parsedData.endToEnd,
    };
    return { statusCode: 200, data: result };
  }
}
