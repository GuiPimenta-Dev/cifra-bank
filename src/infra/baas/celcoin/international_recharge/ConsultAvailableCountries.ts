import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class ConsultAvailableCountries {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultAvailableCountries(page: number, token: string): Promise<OutputDTO> {
    const { statusCode, data } = await this.httpClient.get(
      process.env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/countrys",
      { page },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { countrys: countries } = data;
    return { statusCode, data: { countries } };
  }
}
