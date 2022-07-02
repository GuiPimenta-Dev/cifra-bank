import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class consultInternationalRechargeValues extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultInternationalRechargeValues(countryCode: number, number: number, token: string): Promise<{ data: any }> {
    const { data } = await this.httpClient.get(
      "/transactions/internationaltopups/values",
      { countryCode, phoneNumber: number },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { data };
  }
}
