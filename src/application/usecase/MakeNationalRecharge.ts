import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import Document from "../../domain/entity/Document";
import NationalPhone from "../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import Broker from "../../infra/broker/Broker";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";
import TokenDTO from "../dto/TokenDTO";

export default class NationalRecharge implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeNationalRechargeDTO, token: TokenDTO): Promise<{ receipt: string }> {
    const { value, providerId, phone } = input;
    new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Document(input.document).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(makeNationalRechargeDTO, token);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
