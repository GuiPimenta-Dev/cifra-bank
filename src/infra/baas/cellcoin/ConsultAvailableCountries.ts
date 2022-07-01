import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class ConsultAvailableCountries extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }
  async consultAvailableCountries(page: number, token: string): Promise<{ countries: any }> {
    const { countrys: countries } = await this.httpClient.get(
      "/transactions/internationaltopups/countrys",
      { page },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { countries };
  }
}
