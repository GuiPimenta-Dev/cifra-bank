import env from "../../../../env";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class MakeInternationalRecharge {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(
    input: MakeInternationalRechargeDTO,
    token: string
  ): Promise<{ receiptformatted: string; transactionId: number }> {
    const data = {
      value: input.value,
      cpfCnpj: input.document,
      topupProductId: input.productId,
      phone: input.phone,
    };
    const { receipt, transactionId } = await this.httpClient.post(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { receiptformatted } = receipt;
    return { receiptformatted, transactionId };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<void> {
    const url = env.CELLCOIN_BASE_URL + `/transactions/internationaltopups/${transactionId}/capture`;
    const data = {};
    await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
