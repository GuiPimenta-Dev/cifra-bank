import ConsultAvailableCountries from "../../application/usecase/ConsultAvailableCountries";
import ControllerInterface from "../../domain/application/Controller";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";

export default class ConsultAvailableCountriesController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(params: { page: number }, body: any): Promise<any> {
    const consultAvailableCountries = new ConsultAvailableCountries(this.baasFactory);
    const response = await consultAvailableCountries.execute(params.page, body.token);
    return response;
  }
}
