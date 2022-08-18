import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import ConsultExtractDTO from "../../../../dto/usecase/ConsultExtractDTO";
import MakePixDTO from "../../../../dto/usecase/MakePixDTO";
import MakeTedDTO from "../../../../dto/usecase/MakeTedDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface PaymentFacadeInterface {
  httpClient: HttpClientInterface;
  consultBalance(bank: string, agency: string, account: string, auth: AuthDTO): Promise<OutputDTO>;
  consultExtract(input: ConsultExtractDTO, auth: AuthDTO): Promise<OutputDTO>;
  makeTed(input: MakeTedDTO, auth: AuthDTO): Promise<OutputDTO>;
  makePix(input: MakePixDTO, auth: AuthDTO): Promise<OutputDTO>;
}
