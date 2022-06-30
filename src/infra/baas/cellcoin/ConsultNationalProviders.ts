import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class ConsultNationalProviders extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultNationalProviders(stateCode: number, token: string): Promise<any> {
    const { providers } = await this.httpClient.get(
      "/transactions/topups/providers",
      { stateCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { providers };
  }
}
