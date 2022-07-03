import env from "../../../../env";
import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import HttpClientInterface from "../../http/client/Client";

export default class MakeBillPayment {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(input: MakeBillPaymentDTO, token: string): Promise<any> {
    const data = {
      cpfcnpj: input.document,
      billData: {
        value: input.billData.value,
        originalValue: input.billData.originalValue,
      },
      barCode: {
        type: input.barCode.type,
        digitable: input.barCode.digitable,
      },
      dueDate: input.dueDate,
      transactionIdAuthorize: input.transactionId,
    };
    const { receipt, transactionId } = await this.httpClient.post(
      env.CELLCOIN_BASE_URL + "/transactions/billpayments",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { receiptFormatted } = receipt;
    return { receiptFormatted, transactionId };
  }

  async confirmBillPayment(transactionId: number, token: string) {
    const url = env.CELLCOIN_BASE_URL + `/transactions/billpayments/${transactionId}/capture`;
    const data = {};
    await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
