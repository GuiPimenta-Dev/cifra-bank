import env from "../../../../../env";
import MakeBillPaymentDTO from "../../../../domain/dto/MakeBillPaymentDTO";
import OutputDTO from "../../../../domain/dto/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class MakeBillPayment {
  constructor(readonly httpClient: HttpClientInterface) {}

  async reserveBalance(input: MakeBillPaymentDTO, document: string, token: string): Promise<OutputDTO> {
    const body = {
      cpfcnpj: document,
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
    const { statusCode, data } = await this.httpClient.post(
      env.CELLCOIN_BASE_URL + "/transactions/billpayments",
      body,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { receipt, transactionId } = data;
    return { statusCode, data: { receipt, transactionId } };
  }

  async confirmBillPayment(transactionId: number, token: string): Promise<OutputDTO> {
    const url = env.CELLCOIN_BASE_URL + `/transactions/billpayments/${transactionId}/capture`;
    const data = {};
    return await this.httpClient.put(url, data, {
      Authorization: `Bearer ${token}`,
    });
  }
}
