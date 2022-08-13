import InputDTO from "../../domain/dto/application/InputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultBill from "../../usecase/bill/ConsultBill";
import MakeBillPayment from "../../usecase/bill/MakeBillPayment";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const billFacade = baasFactory.createBillFacade();
const broker = new Broker();

export default class BillController {
  static async consultBill(input: InputDTO): Promise<any> {
    const { query, path, headers } = input;
    const consultBill = new ConsultBill(billFacade);
    return consultBill.execute(query.type, path.digitable, headers.auth);
  }

  static async makeBillPayment(input: InputDTO): Promise<any> {
    const { body, path, headers } = input;
    const { barCode, ...bill } = body;
    barCode.digitable = path.digitable;
    const data = { ...bill, barCode };
    const makeBillPayment = new MakeBillPayment(billFacade, broker);
    return makeBillPayment.execute(data, headers.auth);
  }
}
