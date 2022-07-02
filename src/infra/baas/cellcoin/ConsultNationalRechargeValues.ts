import env from "../../../../env";
import HttpClientInterface from "../../http/client/Client";

export default class consultNationalRechargeValues {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalRechargeValues(
    stateCode: number,
    providerId: number,
    token: string
  ): Promise<{ values: string[] }> {
    const { value: values } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/topups/provider-values",
      { stateCode, providerId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { values };
  }
}
