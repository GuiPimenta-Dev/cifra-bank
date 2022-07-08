import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class consultInternationalValues {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultInternationalValues(countryCode: number, number: number, token: string): Promise<OutputDTO> {
    return await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/values",
      { countryCode, phoneNumber: number },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  }
}
