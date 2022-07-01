import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultAvailableCountries implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(id: string, page: number): Promise<{ countries: any }> {
    return await this.baasFacade.consultAvailableCountries(id, page);
  }
}
