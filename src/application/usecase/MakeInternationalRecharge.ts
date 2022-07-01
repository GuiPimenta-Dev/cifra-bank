import Client from "../../domain/entity/Client";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import BaasFacade from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";

export default class MakeInternationalRecharge implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacade, readonly broker: Broker) {}

  async execute(input: MakeInternationalRechargeDTO): Promise<{ receipt: string }> {
    const { id, value, productId, phone } = input;
    const internationalPhone = new InternationalPhone(phone.countryCode, phone.number);
    const document = new Client(input.document, internationalPhone).getDocument();
    const makeInternationalRechargeDTO = { id, value, document, productId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeInternationalRecharge(makeInternationalRechargeDTO);
    this.broker.publish(new InternationalRechargeMade(document, transactionId, value, productId));
    return { receipt };
  }
}
