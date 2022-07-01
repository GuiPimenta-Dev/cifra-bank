import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import HttpClientInterface from "../../http/client/Client";
import Authorize from "./Authorize";

export default class MakeInternationalRecharge extends Authorize {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

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
    const { receipt, transactionId } = await this.httpClient.post("/transactions/internationaltopups", data, {
      Authorization: `Bearer ${token}`,
    });
    const { receiptformatted } = receipt;
    return { receiptformatted, transactionId };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<void> {
    const url = `/transactions/internationaltopups/${transactionId}/capture`;
    const data = {};
    await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
