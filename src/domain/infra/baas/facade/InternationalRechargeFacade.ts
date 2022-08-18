import AuthDTO from "../../../../dto/application/AuthDTO";
import OutputDTO from "../../../../dto/application/OutputDTO";
import MakeInternationalRechargeDTO from "../../../../dto/usecase/MakeInternationalRechargeDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface InternationalRechargeFacadeInterface {
  httpClient: HttpClientInterface;
  consultInternationalValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO>;
  consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
}
