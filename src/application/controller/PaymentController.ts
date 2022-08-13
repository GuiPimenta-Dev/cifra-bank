import InputDTO from "../../domain/dto/application/InputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConsultBalance from "../../usecase/payment/ConsultBalance";
import ConsultExtract from "../../usecase/payment/ConsultExtract";
import MakeTED from "../../usecase/payment/MakeTED";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const paymentFacade = baasFactory.createPaymentFacade();

export default class PaymentController {
  static async consultBalance(input: InputDTO): Promise<any> {
    const { query, path, headers } = input;
    const consultBill = new ConsultBalance(paymentFacade);
    return consultBill.execute(query.bank, query.agency, path.account, headers.auth);
  }

  static async makeTED(input: InputDTO): Promise<any> {
    const { body, headers } = input;
    const makeTed = new MakeTED(paymentFacade);
    return makeTed.execute(body, headers.auth);
  }

  static async consultExtract(input: InputDTO): Promise<any> {
    const { query, path, headers } = input;
    query.account = path.account;
    const consultExtract = new ConsultExtract(paymentFacade);
    return consultExtract.execute(query, headers.auth);
  }
}
