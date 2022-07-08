import AuthDTO from "../../../domain/dto/AuthDTO";
import MakeInternationalRechargeDTO from "../../../domain/dto/MakeInternationalRechargeDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import InternationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/InternationalRechargeFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import ConsultAvailableCountries from "../celcoin/international_recharge/ConsultAvailableCountries";
import ConsultInternationalValues from "../celcoin/international_recharge/ConsultInternationalValues";
import MakeInternationalRecharge from "../celcoin/international_recharge/MakeInternationalRecharge";

export default class InternationalRechargeFacade implements InternationalRechargeFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultInternationalValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO> {
    const internationalRecharge = new ConsultInternationalValues(this.httpClient);
    return await internationalRecharge.consultInternationalValues(countryCode, number, auth.celcoinToken);
  }

  async consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO> {
    const internationalRecharge = new ConsultAvailableCountries(this.httpClient);
    return await internationalRecharge.consultAvailableCountries(page, auth.celcoinToken);
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const internationalRecharge = new MakeInternationalRecharge(this.httpClient);
    const { data } = await internationalRecharge.reserveBalance(input, auth.document, auth.celcoinToken);
    const { receipt, transactionId } = data;
    await internationalRecharge.confirmRecharge(transactionId, auth.celcoinToken);
    return { statusCode: 200, data: { receipt } };
  }
}
