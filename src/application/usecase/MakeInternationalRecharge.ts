import UseCaseInterface from "../../domain/application/UseCase";
import Document from "../../domain/entity/Document";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import Broker from "../../infra/broker/Broker";
import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";
import OutputDTO from "../dto/OutputDTO";

export default class MakeInternationalRecharge implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeInternationalRechargeDTO, token: AuthDTO): Promise<OutputDTO> {
    const { value, productId, phone } = input;
    new InternationalPhone(phone.countryCode, phone.number);
    const document = new Document(input.document).getDocument();
    const makeInternationalRechargeDTO = { value, document, productId, phone };
    const { statusCode, data } = await this.baasFacade.makeInternationalRecharge(makeInternationalRechargeDTO, token);
    this.broker.publish(new InternationalRechargeMade(document, data.transactionId, value, productId));
    return { statusCode, data };
  }
}
