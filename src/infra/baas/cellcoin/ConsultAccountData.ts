import env from "../../../../env";
import HttpClientInterface from "../../http/interface/HttpClient";
export default class ConsultAccountData {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultAccountData(type: number, digitable: string, token: string): Promise<any> {
    const data = {
      barCode: {
        type,
        digitable,
      },
    };
    return await this.httpClient.post(env.CELLCOIN_BASE_URL + "/transactions/billpayments/authorize", data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
