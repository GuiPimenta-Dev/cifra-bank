import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class consultInternationalRechargeValues {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultInternationalRechargeValues(countryCode: number, number: number, token: string): Promise<OutputDTO> {
    return await this.httpClient.get(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups/values",
      { countryCode, phoneNumber: number },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  }
}
