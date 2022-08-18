import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import MakeNationalRechargeDTO from "../../../../dto/usecase/MakeNationalRechargeDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface NationalRechargeFacadeInterface {
  httpClient: HttpClientInterface;
  consultNationalProviders(stateCode: number, auth: AuthDTO): Promise<OutputDTO>;
  consultNationalValues(stateCode: number, providerId: number, auth: AuthDTO): Promise<OutputDTO>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
}
