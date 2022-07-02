import env from "../../../../env";
import HttpClientInterface from "../../http/client/Client";

export default class consultInternationalRechargeValues {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultInternationalRechargeValues(countryCode: number, number: number, token: string): Promise<{ data: any }> {
    const { data } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/values",
      { countryCode, phoneNumber: number },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { data };
  }
}
