import AuthDTO from "../../../domain/dto/AuthDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import InternationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/InternationalRechargeFacade";

export default class ConsultAvailableCountries {
  constructor(private internationalRechargeFacade: InternationalRechargeFacadeInterface) {}

  async execute(page: number, token: AuthDTO): Promise<OutputDTO> {
    return await this.internationalRechargeFacade.consultAvailableCountries(page, token);
  }
}
