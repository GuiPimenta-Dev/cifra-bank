import Client from "../../domain/entity/Client";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import BaasFacade from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";

export default class NationalRecharge implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacade, readonly broker: Broker) {}

  async execute(input: MakeNationalRechargeDTO): Promise<{ receipt: string }> {
    const { id, value, providerId, phone } = input;
    const document = new Client(input.document, phone.stateCode, phone.countryCode, phone.number).getDocument();
    const makeNationalRechargeDTO = { id, value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(makeNationalRechargeDTO);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
