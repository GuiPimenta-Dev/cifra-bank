import HttpDTO from "../../application/dto/InputDTO";
import ControllerInterface from "../../application/interface/Controller";
import ConsultAvailableCountries from "../../application/usecase/ConsultAvailableCountries";
import BaasFactoryInterface from "../infra/baas/BaasFactory";

export default class ConsultAvailableCountriesController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(input: HttpDTO): Promise<any> {
    const { query, headers } = input;
    const consultAvailableCountries = new ConsultAvailableCountries(this.baasFactory);
    return await consultAvailableCountries.execute(query.page, headers.auth);
  }
}
