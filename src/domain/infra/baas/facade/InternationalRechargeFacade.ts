import AuthDTO from "../../../dto/AuthDTO";
import MakeInternationalRechargeDTO from "../../../dto/MakeInternationalRechargeDTO";
import OutputDTO from "../../../dto/OutputDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface InternationalRechargeFacadeInterface {
  httpClient: HttpClientInterface;
  consultInternationalValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO>;
  consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
}
