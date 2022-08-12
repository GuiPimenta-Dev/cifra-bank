import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import MakeNationalRechargeDTO from "../../../../domain/dto/usecase/MakeNationalRechargeDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class MakeNationalRecharge {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(input: MakeNationalRechargeDTO, document: string, token: string): Promise<OutputDTO> {
    const body = {
      topupData: { value: input.value },
      cpfCnpj: document,
      providerId: input.providerId,
      phone: input.phone,
    };
    const { statusCode, data } = await this.httpClient.post(
      process.env.CELLCOIN_BASE_URL + "/transactions/topups",
      body,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { statusCode, data };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<OutputDTO> {
    const url = process.env.CELLCOIN_BASE_URL + `/transactions/topups/${transactionId}/capture`;
    const data = {};
    return await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
