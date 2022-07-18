import AuthDTO from "../../../domain/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../domain/dto/MakeBillPaymentDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import BillFacadeInterface from "../../../domain/infra/baas/facade/BillFacade";
import HttpClient from "../../../domain/infra/http/HttpClient";
import ConsultBill from "../celcoin/bill/ConsultBill";
import MakeBillPayment from "../celcoin/bill/MakeBillPayment";

export default class BillFacade implements BillFacadeInterface {
  constructor(readonly httpClient: HttpClient) {}

  async consultBill(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO> {
    const bill = new ConsultBill(this.httpClient);
    return await bill.consultBill(type, digitable, auth.celcoinToken);
  }

  async makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const bill = new MakeBillPayment(this.httpClient);
    const { data } = await bill.reserveBalance(input, auth.document, auth.celcoinToken);
    const { receipt, transactionId } = data;
    await bill.confirmBillPayment(transactionId, auth.celcoinToken);
    return { statusCode: 200, data: { receipt, transactionId } };
  }
}
