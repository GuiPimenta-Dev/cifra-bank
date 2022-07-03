import Document from "../../domain/entity/Document";
import NationalPhone from "../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import JwtPayloadDTO from "../dto/JwtPayloadDTO";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";

export default class NationalRecharge implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayloadDTO, input: MakeNationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, providerId, phone } = input;
    new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Document(input.document).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(jwtPayload, makeNationalRechargeDTO);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
