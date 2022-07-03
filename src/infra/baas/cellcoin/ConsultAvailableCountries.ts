import env from "../../../../env";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class ConsultAvailableCountries {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultAvailableCountries(page: number, token: string): Promise<{ countries: any }> {
    const { countrys: countries } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/countrys",
      { page },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { countries };
  }
}
