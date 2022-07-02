import env from "../../../../env";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import HttpClientInterface from "../../http/client/Client";

export default class MakeNationalRecharge {
  constructor(readonly httpClient: HttpClientInterface) {}

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
    const { receipt, transactionId } = await this.httpClient.post(
      env.CELLCOIN_BASE_URL + "/transactions/topups",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { receiptformatted } = receipt;
    return { receiptformatted, transactionId };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<void> {
    const url = env.CELLCOIN_BASE_URL + `/transactions/topups/${transactionId}/capture`;
    const data = {};
    await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
