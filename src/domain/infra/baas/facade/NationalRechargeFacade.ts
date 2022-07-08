import AuthDTO from "../../../dto/AuthDTO";
import MakeNationalRechargeDTO from "../../../dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../dto/OutputDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface NationalRechargeFacadeInterface {
  httpClient: HttpClientInterface;
  consultNationalProviders(stateCode: number, auth: AuthDTO): Promise<OutputDTO>;
  consultNationalValues(stateCode: number, providerId: number, auth: AuthDTO): Promise<OutputDTO>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
}
