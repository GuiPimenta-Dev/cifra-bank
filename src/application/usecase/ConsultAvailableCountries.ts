import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class ConsultAvailableCountries implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(page: number): Promise<{ countries: any }> {
    return await this.baasFacade.consultAvailableCountries(page);
  }
}
