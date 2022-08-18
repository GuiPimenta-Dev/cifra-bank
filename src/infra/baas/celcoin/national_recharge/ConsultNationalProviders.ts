import OutputDTO from "../../../../dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class ConsultNationalProviders {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalProviders(stateCode: number, token: string): Promise<OutputDTO> {
    return await this.httpClient.get(
      process.env.CELLCOIN_BASE_URL + "/transactions/topups/providers",
      { stateCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  }
}
