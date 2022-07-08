import AuthDTO from "../../../domain/dto/AuthDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import NationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/NationalRechargeFacade";

export default class ConsultNationalValues {
  constructor(private nationalRecharge: NationalRechargeFacadeInterface) {}

  async execute(stateCode: number, providerId: number, token: AuthDTO): Promise<OutputDTO> {
    return this.nationalRecharge.consultNationalValues(stateCode, providerId, token);
  }
}
