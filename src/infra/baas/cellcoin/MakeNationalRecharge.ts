import MakeNationalRechargeDTO from "../../../application/usecase/make_national_recharge/MakeNationalRechargeDTO";
import HttpClientInterface from "../../../domain/adapter/HttpClient";

import AuthorizeBaas from "./Authorize";

export default class MakeNationalRecharge extends AuthorizeBaas {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async reserveBalance(
    input: MakeNationalRechargeDTO,
    token: string
  ): Promise<{ receiptformatted: string; transactionId: number }> {
    const data = {
      topupData: { value: input.value },
      cpfCnpj: input.document,
      providerId: input.providerId,
      phone: input.phone,
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
