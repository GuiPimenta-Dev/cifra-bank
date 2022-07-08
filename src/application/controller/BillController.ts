import InputDTO from "../../domain/dto/InputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultBill from "../usecase/bill/ConsultBill";
import MakeBillPayment from "../usecase/bill/MakeBillPayment";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const billFacade = baasFactory.createBillFacade();
const broker = new Broker();

export default class BillController {
  static async consultBill(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultBill = new ConsultBill(billFacade);
    return consultBill.execute(query.type, query.digitable, headers.auth);
  }

  static async makeBillPayment(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makeBillPayment = new MakeBillPayment(billFacade, broker);
    return makeBillPayment.execute(body, headers.auth);
  }
}
