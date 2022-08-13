import AuthDTO from "../../../domain/dto/application/AuthDTO";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import MakeTEDDTO from "../../../domain/dto/usecase/MakeTEDDTO";
import PaymentFacadeInterface from "../../../domain/infra/baas/facade/PaymentFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import ConsultBalance from "../arbi/payment/ConsultBalance";
import MakeTED from "../arbi/payment/MakeTED";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultBalance(bank: string, agency: string, account: string, auth: AuthDTO): Promise<OutputDTO> {
    const consultBalance = new ConsultBalance(this.httpClient);
    return await consultBalance.getBalance(bank, agency, account, auth);
  }

  async makeTED(input: MakeTEDDTO, auth: AuthDTO): Promise<OutputDTO> {
    const makeTED = new MakeTED(this.httpClient);
    return await makeTED.makeTED(input, auth);
  }
}
