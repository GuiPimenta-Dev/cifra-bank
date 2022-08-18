import AuthDTO from "../../../dto/application/AuthDTO";
import OutputDTO from "../../../dto/application/OutputDTO";
import ConsultExtractDTO from "../../../dto/usecase/ConsultExtractDTO";
import MakeTEDDTO from "../../../dto/usecase/MakeTedDTO";
import PaymentFacadeInterface from "../../../domain/infra/baas/facade/PaymentFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import ConsultBalance from "../arbi/payment/ConsultBalance";
import ConsultExtract from "../arbi/payment/ConsultExtract";
import MakePixDTO from "../../../dto/usecase/MakePixDTO";
import MakePix from "../arbi/payment/MakePix";
import MakeTed from "../arbi/payment/MakeTED";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultBalance(bank: string, agency: string, account: string, auth: AuthDTO): Promise<OutputDTO> {
    const consultBalance = new ConsultBalance(this.httpClient);
    return await consultBalance.getBalance(bank, agency, account, auth);
  }

  async consultExtract(input: ConsultExtractDTO, auth: AuthDTO): Promise<OutputDTO> {
    const consultExtract = new ConsultExtract(this.httpClient);
    return await consultExtract.getExtract(input, auth);
  }

  async makeTed(input: MakeTEDDTO, auth: AuthDTO): Promise<OutputDTO> {
    const makeTed = new MakeTed(this.httpClient);
    return await makeTed.makeTed(input, auth);
  }

  async makePix(input: MakePixDTO, auth: AuthDTO): Promise<OutputDTO> {
    const makePix = new MakePix(this.httpClient);
    const transactionId = await makePix.getEndToEndKey(input.key, auth);
    return await makePix.makePix(input, transactionId, auth);
  }
}
