import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class consultNationalRechargeValues {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalRechargeValues(stateCode: number, providerId: number, token: string): Promise<OutputDTO> {
    const { statusCode, data } = await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/topups/provider-values",
      { stateCode, providerId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { value: values } = data;
    return { statusCode, data: values };
  }
}
