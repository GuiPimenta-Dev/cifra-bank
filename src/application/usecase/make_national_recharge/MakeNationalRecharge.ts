import Client from "../../../domain/entity/Client";
import NationalRechargeMade from "../../../domain/event/NationalRechargeMade";
import BaasFacade from "../../../domain/facade/BaasFacade";
import Broker from "../../../infra/broker/Broker";
import MakeNationalRechargeDTO from "./MakeNationalRechargeDTO";

export default class NationalRecharge {
  constructor(readonly baasFacade: BaasFacade, readonly broker: Broker) {}

  async execute(id: string, input: MakeNationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, providerId, phone } = input;
    const document = new Client(input.document, phone.stateCode, phone.countryCode, phone.number).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(id, makeNationalRechargeDTO);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
