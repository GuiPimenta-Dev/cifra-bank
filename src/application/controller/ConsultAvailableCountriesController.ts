import ControllerInterface from "../../domain/application/Controller";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import HttpDTO from "../dto/InputDTO";
import ConsultAvailableCountries from "../usecase/ConsultAvailableCountries";

export default class ConsultAvailableCountriesController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(input: HttpDTO): Promise<any> {
    const { query, headers } = input;
    const consultAvailableCountries = new ConsultAvailableCountries(this.baasFactory);
    return await consultAvailableCountries.execute(query.page, headers.token);
  }
}
