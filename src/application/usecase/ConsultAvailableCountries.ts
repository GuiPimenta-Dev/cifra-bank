import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultAvailableCountries implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(id: string, page: number): Promise<{ countries: any }> {
    return await this.baasFacade.consultAvailableCountries(id, page);
  }
}
