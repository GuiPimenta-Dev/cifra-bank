import ConsultAvailableCountriesDTO from "../../../application/dto/ConsultAvailableCountriesDTO";
import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class ConsultAvailableCountries extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }
  async consultAvailableCountries(token: string, page: number): Promise<{ countries: ConsultAvailableCountriesDTO[] }> {
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
