import InputDTO from "../../domain/dto/InputDTO";
import OutputDTO from "../../domain/dto/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultNationalProviders from "../usecase/national_recharge/ConsultNationalProviders";
import ConsultNationalValues from "../usecase/national_recharge/ConsultNationalValues";
import MakeNationalRecharge from "../usecase/national_recharge/MakeNationalRecharge";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const nationalRechargeFacade = baasFactory.createNationalRechargeFacade();
const broker = new Broker();

export default class NationalRechargeController {
  static async consultNationalProviders(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultNationalProviders = new ConsultNationalProviders(nationalRechargeFacade);
    return await consultNationalProviders.execute(query.stateCode, headers.auth);
  }

  static async consultNationalValues(input: InputDTO): Promise<OutputDTO> {
    const { path, query, headers } = input;
    const consultNationalValues = new ConsultNationalValues(nationalRechargeFacade);
    return consultNationalValues.execute(query.stateCode, path.providerId, headers.auth);
  }

  static async makeNationalRecharge(input: InputDTO): Promise<any> {
    const { body, path, headers } = input;
    const data = { ...body, ...path };
    const makeNationalRecharge = new MakeNationalRecharge(nationalRechargeFacade, broker);
    return makeNationalRecharge.execute(data, headers.auth);
  }
}
