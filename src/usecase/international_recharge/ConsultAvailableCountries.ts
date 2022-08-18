import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import InternationalRechargeFacadeInterface from "../../domain/infra/baas/facade/InternationalRechargeFacade";

export default class ConsultAvailableCountries {
  constructor(private internationalRechargeFacade: InternationalRechargeFacadeInterface) {}

  async execute(page: number, token: AuthDTO): Promise<OutputDTO> {
    return await this.internationalRechargeFacade.consultAvailableCountries(page, token);
  }
}
