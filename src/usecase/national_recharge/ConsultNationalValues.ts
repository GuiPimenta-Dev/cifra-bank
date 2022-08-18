import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import NationalRechargeFacadeInterface from "../../domain/infra/baas/facade/NationalRechargeFacade";

export default class ConsultNationalValues {
  constructor(private nationalRecharge: NationalRechargeFacadeInterface) {}

  async execute(stateCode: number, providerId: number, token: AuthDTO): Promise<OutputDTO> {
    return await this.nationalRecharge.consultNationalValues(stateCode, providerId, token);
  }
}
