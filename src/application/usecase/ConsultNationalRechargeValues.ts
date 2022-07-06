import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import OutputDTO from "../dto/OutputDTO";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }
  async execute(stateCode: number, providerId: number, token: AuthDTO): Promise<OutputDTO> {
    return this.baasFacade.consultNationalRechargeValues(stateCode, providerId, token);
  }
}
