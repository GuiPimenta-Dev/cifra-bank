import Client from "../../domain/entity/Client";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import BaasFacade from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";

export default class MakeInternationalRecharge implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacade, readonly broker: Broker) {}

  async execute(input: MakeInternationalRechargeDTO): Promise<any> {
    const { id, value, productId, phone } = input;
    const document = new Client(input.document, 10, phone.countryCode, phone.number).getDocument();
    const makeInternationalRechargeDTO = { id, value, document, productId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeInternationalRecharge(makeInternationalRechargeDTO);
    this.broker.publish(new InternationalRechargeMade(document, transactionId, value, productId));
    return { receipt };
  }
}
