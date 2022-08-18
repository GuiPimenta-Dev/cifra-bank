import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import MakeBillPaymentDTO from "../../../../dto/usecase/MakeBillPaymentDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface BillFacadeInterface {
  httpClient: HttpClientInterface;
  consultBill(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO>;
  makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO>;
}
