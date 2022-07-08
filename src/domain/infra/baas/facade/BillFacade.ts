import AuthDTO from "../../../dto/AuthDTO";
import MakeBillPaymentDTO from "../../../dto/MakeBillPaymentDTO";
import OutputDTO from "../../../dto/OutputDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface BillFacadeInterface {
  httpClient: HttpClientInterface;
  consultBill(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO>;
  makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO>;
}
