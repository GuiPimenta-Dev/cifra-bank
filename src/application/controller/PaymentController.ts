import InputDTO from "../../dto/application/InputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultBalance from "../../usecase/payment/ConsultBalance";
import ConsultExtract from "../../usecase/payment/ConsultExtract";
import MakePix from "../../usecase/payment/MakePix";
import MakeTed from "../../usecase/payment/MakeTed";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const paymentFacade = baasFactory.createPaymentFacade();

export default class PaymentController {
  static async consultBalance(input: InputDTO): Promise<any> {
    const { query, path, headers } = input;
    const consultBill = new ConsultBalance(paymentFacade);
    return consultBill.execute(query.bank, query.agency, path.account, headers.auth);
  }

  static async consultExtract(input: InputDTO): Promise<any> {
    const { query, path, headers } = input;
    query.account = path.account;
    const consultExtract = new ConsultExtract(paymentFacade);
    return consultExtract.execute(query, headers.auth);
  }

  static async makeTed(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makeTed = new MakeTed(paymentFacade);
    return makeTed.execute(body, headers.auth);
  }

  static async makePix(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makePix = new MakePix(paymentFacade);
    return makePix.execute(body, headers.auth);
  }
}
