import env from "../../../../env";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class MakeInternationalRecharge {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(input: MakeInternationalRechargeDTO, token: string): Promise<OutputDTO> {
    const body = {
      value: input.value,
      cpfCnpj: input.document,
      topupProductId: input.productId,
      phone: input.phone,
    };
    const { statusCode, data } = await this.httpClient.post(
      env.CELLCOIN_BASE_URL + "/transactions/internationaltopups",
      body,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { receipt, transactionId } = data;
    const { receiptFormatted } = receipt;
    return { statusCode, data: { receiptFormatted, transactionId } };
  }

  async confirmRecharge(transactionId: number, token: string): Promise<OutputDTO> {
    const url = env.CELLCOIN_BASE_URL + `/transactions/internationaltopups/${transactionId}/capture`;
    const data = {};
    return await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
