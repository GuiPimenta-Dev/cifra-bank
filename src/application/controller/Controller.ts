import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import InputDTO from "../dto/InputDTO";
import OutputDTO from "../dto/OutputDTO";
import Authorize from "../usecase/Authorize";
import ConsultAvailableCountries from "../usecase/ConsultAvailableCountries";
import ConsultBill from "../usecase/ConsultBill";
import ConsultInternationalValues from "../usecase/ConsultInternationalValues";
import ConsultNationalProviders from "../usecase/ConsultNationalProviders";
import ConsultNationalValues from "../usecase/ConsultNationalValues";
import MakeBillPayment from "../usecase/MakeBillPayment";
import MakeInternationalRecharge from "../usecase/MakeInternationalRecharge";
import MakeNationalRecharge from "../usecase/MakeNationalRecharge";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const broker = new Broker();

export default class Controller {
  static async authorize(input: InputDTO): Promise<OutputDTO> {
    const { body } = input;
    const authorize = new Authorize(baasFactory);
    return await authorize.execute(body.id, body.document);
  }

  static async consultAvailableCountries(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultAvailableCountries = new ConsultAvailableCountries(baasFactory);
    return await consultAvailableCountries.execute(query.page, headers.auth);
  }

  static async consultInternationalValues(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultInternationalValues = new ConsultInternationalValues(baasFactory);
    return consultInternationalValues.execute(query.countryCode, query.phoneNumber, headers.auth);
  }

  static async consultBill(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultBill = new ConsultBill(baasFactory);
    return consultBill.execute(query.type, query.digitable, headers.auth);
  }

  static async makeBillPayment(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makeBillPayment = new MakeBillPayment(baasFactory, broker);
    return makeBillPayment.execute(body, headers.auth);
  }

  static async consultNationalProviders(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultNationalProviders = new ConsultNationalProviders(baasFactory);
    return await consultNationalProviders.execute(query.stateCode, headers.auth);
  }

  static async consultNationalValues(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultNationalValues = new ConsultNationalValues(baasFactory);
    return consultNationalValues.execute(query.stateCode, query.providerId, headers.auth);
  }

  static async makeInternationalRecharge(input: InputDTO): Promise<OutputDTO> {
    const { body, headers } = input;
    const makeInternationalRecharge = new MakeInternationalRecharge(baasFactory, broker);
    return makeInternationalRecharge.execute(body, headers.auth);
  }

  static async makeNationalRecharge(input: InputDTO): Promise<OutputDTO> {
    const { body, headers } = input;
    const makeNationalRechargeController = new MakeNationalRecharge(baasFactory, broker);
    return makeNationalRechargeController.execute(body, headers.auth);
  }
}
