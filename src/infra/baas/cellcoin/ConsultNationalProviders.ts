import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";

export default class ConsultNationalProviders {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalProviders(stateCode: number, token: string): Promise<OutputDTO> {
    return await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/topups/providers",
      { stateCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  }
}
