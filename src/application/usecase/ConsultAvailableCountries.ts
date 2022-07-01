import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import ConsultAvailableCountriesDTO from "../dto/ConsultAvailableCountriesDTO";

export default class ConsultAvailableCountries implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(id: string, page: number): Promise<{ countries: ConsultAvailableCountriesDTO[] }> {
    return await this.baasFacade.consultAvailableCountries(id, page);
  }
}
