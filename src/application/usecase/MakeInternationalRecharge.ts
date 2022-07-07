import Document from "../../domain/entity/Document";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import BaasFacadeInterface from "../../domain/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AuthDTO from "../dto/AuthDTO";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";
import OutputDTO from "../dto/OutputDTO";

export default class MakeInternationalRecharge {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value, productId, phone } = input;
    new InternationalPhone(phone.countryCode, phone.number);
    const document = new Document(auth.document).getDocument();
    const makeInternationalRechargeDTO = { value, document, productId, phone };
    const { statusCode, data } = await this.baasFacade.makeInternationalRecharge(makeInternationalRechargeDTO, auth);
    this.broker.publish(new InternationalRechargeMade(document, data.transactionId, value, productId));
    return { statusCode, data };
  }
}
