import AuthDTO from "../../../dto/application/AuthDTO";
import OutputDTO from "../../../dto/application/OutputDTO";
import MakeTEDDTO from "../../../dto/usecase/MakeTEDDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface PaymentFacadeInterface {
  httpClient: HttpClientInterface;
  consultBalance(bank: string, agency: string, account: string, auth: AuthDTO): Promise<OutputDTO>;
  makeTED(input: MakeTEDDTO, auth: AuthDTO): Promise<OutputDTO>;
}
