import Document from "../../domain/entity/Document";
import NationalPhone from "../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import BaasFacadeInterface from "../../domain/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import Broker from "../../infra/broker/Broker";
import AuthDTO from "../dto/AuthDTO";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";
import OutputDTO from "../dto/OutputDTO";

export default class NationalRecharge {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value, providerId, phone } = input;
    new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Document(auth.document).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { statusCode, data } = await this.baasFacade.makeNationalRecharge(makeNationalRechargeDTO, auth);
    this.broker.publish(new NationalRechargeMade(document, data.transactionId, value, providerId));
    return { statusCode, data };
  }
}
