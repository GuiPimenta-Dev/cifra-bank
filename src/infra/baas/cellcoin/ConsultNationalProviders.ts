import env from "../../../../env";
import HttpClientInterface from "../../http/client/Client";

export default class ConsultNationalProviders {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalProviders(stateCode: number, token: string): Promise<{ providers: string[] }> {
    const { providers } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/topups/providers",
      { stateCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { providers };
  }
}
