import Client from "../../domain/entity/Client";
import NationalPhone from "../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../domain/event/NationalRechargeMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import JwtPayload from "../dto/JwtPayload";
import MakeNationalRechargeDTO from "../dto/MakeNationalRechargeDTO";

export default class NationalRecharge implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayload, input: MakeNationalRechargeDTO): Promise<{ receipt: string }> {
    const { value, providerId, phone } = input;
    const nationalPhone = new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Client(input.document, nationalPhone).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { receipt, transactionId } = await this.baasFacade.makeNationalRecharge(jwtPayload, makeNationalRechargeDTO);
    this.broker.publish(new NationalRechargeMade(document, transactionId, value, providerId));
    return { receipt };
  }
}
