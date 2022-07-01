import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class consultNationalRechargeValues extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultNationalRechargeValues(
    stateCode: number,
    providerId: number,
    token: string
  ): Promise<{ values: string[] }> {
    const { value: values } = await this.httpClient.get(
      "/transactions/topups/provider-values",
      { stateCode, providerId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { values };
  }
}
