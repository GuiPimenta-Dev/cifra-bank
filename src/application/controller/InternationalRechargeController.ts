import InputDTO from "../../domain/dto/InputDTO";
import OutputDTO from "../../domain/dto/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultAvailableCountries from "../usecase/international_recharge/ConsultAvailableCountries";
import ConsultInternationalValues from "../usecase/international_recharge/ConsultInternationalValues";
import MakeInternationalRecharge from "../usecase/international_recharge/MakeInternationalRecharge";

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
    return consultInternationalValues.execute(query.countryCode, query.phoneNumber, headers.auth);
  }

  static async makeInternationalRecharge(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makeInternationalRecharge = new MakeInternationalRecharge(internationalRechargeFacade, broker);
    return makeInternationalRecharge.execute(body, headers.auth);
  }
}
