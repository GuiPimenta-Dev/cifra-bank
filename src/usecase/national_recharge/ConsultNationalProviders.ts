import AuthDTO from "../../domain/dto/application/AuthDTO";
import OutputDTO from "../../domain/dto/application/OutputDTO";
import NationalRechargeFacadeInterface from "../../domain/infra/baas/facade/NationalRechargeFacade";

export default class ConsultNationalProviders {
  constructor(private nationalRecharge: NationalRechargeFacadeInterface) {}

  async execute(stateCode: number, token: AuthDTO): Promise<OutputDTO> {
    return await this.nationalRecharge.consultNationalProviders(stateCode, token);
  }
}
