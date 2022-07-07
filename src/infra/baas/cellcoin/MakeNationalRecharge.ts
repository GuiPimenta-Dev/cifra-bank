import env from "../../../../env";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";

export default class MakeNationalRecharge {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(input: MakeNationalRechargeDTO, document: string, token: string): Promise<OutputDTO> {
    const body = {
      topupData: { value: input.value },
      cpfCnpj: document,
      providerId: input.providerId,
      phone: input.phone,
    };
    const { statusCode, data } = await this.httpClient.post(env.CELLCOIN_BASE_URL + "/transactions/topups", body, {
      Authorization: `Bearer ${token}`,
    });
    return { statusCode, data };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<OutputDTO> {
    const url = env.CELLCOIN_BASE_URL + `/transactions/topups/${transactionId}/capture`;
    const data = {};
    return await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
