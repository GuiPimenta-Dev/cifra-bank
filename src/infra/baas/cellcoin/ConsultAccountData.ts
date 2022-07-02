import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class ConsultAccountData extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultAccountData(type: 1 | 2 | 3, digitable: string, token: string): Promise<any> {
    const data = {
      barCode: {
        type,
        digitable,
      },
    };
    return await this.httpClient.post("/transactions/billpayments/authorize", data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
