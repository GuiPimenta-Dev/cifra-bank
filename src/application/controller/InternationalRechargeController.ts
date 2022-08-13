import InputDTO from "../../domain/dto/application/InputDTO";
import OutputDTO from "../../domain/dto/application/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultAvailableCountries from "../../usecase/international_recharge/ConsultAvailableCountries";
import ConsultInternationalValues from "../../usecase/international_recharge/ConsultInternationalValues";
import MakeInternationalRecharge from "../../usecase/international_recharge/MakeInternationalRecharge";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const internationalRechargeFacade = baasFactory.createInternationalRechargeFacade();
const broker = new Broker();

export default class InternationalRechargeController {
  static async consultAvailableCountries(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultAvailableCountries = new ConsultAvailableCountries(internationalRechargeFacade);
    return await consultAvailableCountries.execute(query.page, headers.auth);
  }

  static async consultInternationalValues(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultInternationalValues = new ConsultInternationalValues(internationalRechargeFacade);
    return await consultInternationalValues.execute(query.countryCode, query.phoneNumber, headers.auth);
  }

  static async makeInternationalRecharge(input: InputDTO): Promise<any> {
    const { body, path, headers } = input;
    const data = { ...body, ...path };
    const makeInternationalRecharge = new MakeInternationalRecharge(internationalRechargeFacade, broker);
    return await makeInternationalRecharge.execute(data, headers.auth);
  }
}
