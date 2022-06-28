import HttpClientInterface from "../../domain/http/HttpClient";
import NationalRechargeRequesterInterface from "../../domain/requester/NationalRechargeRequester";
import AuthorizeRequester from "./AuthorizeRequester";

export default class NationalRechargeRequester
  extends AuthorizeRequester
  implements NationalRechargeRequesterInterface
{
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async reserveBalance(value: number, token: string): Promise<{ receiptformatted: string; transactionId: number }> {
    const data = {
      topupData: {
        value,
      },
      cpfCnpj: "46949827881",
      providerId: 2086,
      phone: {
        stateCode: 15,
        countryCode: 55,
        number: 993134307,
      },
    };
    const { receipt, transactionId } = await this.httpClient.post("/transactions/topups", data, {
      Authorization: `Bearer ${token}`,
    });
    const { receiptformatted } = receipt;
    return { receiptformatted, transactionId };
  }

  async confirmRecharge(
    transactionId: number,
    token: string
  ): Promise<{ errorCode: string; message: string; status: number }> {
    const url = `/transactions/topups/${transactionId}/capture`;
    const data = {};
    return await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
