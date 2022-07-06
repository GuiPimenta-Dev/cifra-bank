import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../../interface/infra/http/HttpClient";

export default class ConsultAvailableCountries {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultAvailableCountries(page: number, token: string): Promise<OutputDTO> {
    const { statusCode, data } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/countrys",
      { page },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { countrys: countries } = data;
    return { statusCode, data: { countries } };
  }
}
