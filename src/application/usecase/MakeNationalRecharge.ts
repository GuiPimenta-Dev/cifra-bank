import UseCaseInterface from "../../domain/application/UseCase";
import Document from "../../domain/entity/Document";
import NationalPhone from "../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import Broker from "../../infra/broker/Broker";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";

export default class NationalRecharge implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface, readonly broker: Broker) {}

  async execute(input: MakeNationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, providerId, phone } = input;
    new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Document(input.document).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(makeNationalRechargeDTO);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
