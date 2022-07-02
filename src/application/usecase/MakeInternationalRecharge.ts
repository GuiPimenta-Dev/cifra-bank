import Client from "../../domain/entity/Client";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import JwtPayload from "../dto/JwtPayload";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";

export default class MakeInternationalRecharge implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayload, input: MakeInternationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, productId, phone } = input;
    const internationalPhone = new InternationalPhone(phone.countryCode, phone.number);
    const document = new Client(input.document, internationalPhone).getDocument();
    const makeInternationalRechargeDTO = { value, document, productId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeInternationalRecharge(
      jwtPayload,
      makeInternationalRechargeDTO
    );
    this.broker.publish(new InternationalRechargeMade(document, transactionId, value, productId));
    return { receipt };
  }
}
