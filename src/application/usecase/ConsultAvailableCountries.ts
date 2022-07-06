import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import OutputDTO from "../dto/OutputDTO";

export default class ConsultAvailableCountries implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(page: number, token: AuthDTO): Promise<OutputDTO> {
    return await this.baasFacade.consultAvailableCountries(page, token);
  }
}
