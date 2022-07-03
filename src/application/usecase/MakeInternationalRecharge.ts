import Document from "../../domain/entity/Document";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../domain/event/InternationalRechargeMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import MakeInternationalRechargeDTO from "../dto/MakeInternationalRechargeDTO";

export default class MakeInternationalRecharge implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface, readonly broker: Broker) {}

  async execute(input: MakeInternationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, productId, phone } = input;
    new InternationalPhone(phone.countryCode, phone.number);
    const document = new Document(input.document).getDocument();
    const makeInternationalRechargeDTO = { value, document, productId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeInternationalRecharge(makeInternationalRechargeDTO);
    this.broker.publish(new InternationalRechargeMade(document, transactionId, value, productId));
    return { receipt };
  }
}
