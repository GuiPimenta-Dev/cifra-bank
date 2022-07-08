import AuthDTO from "../../../domain/dto/AuthDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import InternationalPhone from "../../../domain/entity/InternationalPhone";
import InternationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/InternationalRechargeFacade";

export default class ConsultInternationalValues {
  constructor(private internationalRecharge: InternationalRechargeFacadeInterface) {}

  async execute(countryCode: number, number: number, token: AuthDTO): Promise<OutputDTO> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.internationalRecharge.consultInternationalValues(phone.countryCode, phone.number, token);
  }
}
