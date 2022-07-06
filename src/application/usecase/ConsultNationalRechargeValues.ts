import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import OutputDTO from "../dto/OutputDTO";
import TokenDTO from "../dto/TokenDTO";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }
  async execute(stateCode: number, providerId: number, token: TokenDTO): Promise<OutputDTO> {
    return this.baasFacade.consultNationalRechargeValues(stateCode, providerId, token);
  }
}
