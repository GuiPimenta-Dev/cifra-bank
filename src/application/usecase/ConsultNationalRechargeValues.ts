import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import TokenDTO from "../dto/TokenDTO";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }
  async execute(stateCode: number, providerId: number, token: TokenDTO): Promise<{ values: string[] }> {
    return this.baasFacade.consultNationalRechargeValues(stateCode, providerId, token);
  }
}
