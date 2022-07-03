import ControllerInterface from "../../domain/application/Controller";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import ConsultAvailableCountries from "../usecase/ConsultAvailableCountries";

export default class ConsultAvailableCountriesController implements ControllerInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async handle(params: { page: number }, body: any): Promise<any> {
    const consultAvailableCountries = new ConsultAvailableCountries(this.baasFacade);
    return consultAvailableCountries.execute(params.page);
  }
}
