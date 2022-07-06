import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../http/interface/HttpClient";
export default class ConsultAccountData {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultAccountData(type: number, digitable: string, token: string): Promise<OutputDTO> {
    const body = {
      barCode: {
        type,
        digitable,
      },
    };
    return await this.httpClient.post(env.CELLCOIN_BASE_URL + "/transactions/billpayments/authorize", body, {
      Authorization: `Bearer ${token}`,
    });
  }
}
