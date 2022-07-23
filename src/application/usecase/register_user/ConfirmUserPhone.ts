import OutputDTO from "../../../domain/dto/application/OutputDTO";
import ConfirmUserPhoneDTO from "../../../domain/dto/usecase/ConfirmUserPhoneDTO";
import Document from "../../../domain/entity/Document";
import NationalPhone from "../../../domain/entity/NationalPhone";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class ConfirmUserPhone {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(input: ConfirmUserPhoneDTO): Promise<OutputDTO> {
    input.document = new Document(input.document).getDocument();
    const BRAZIL_COUNTRY_CODE = 55;
    new NationalPhone(BRAZIL_COUNTRY_CODE, input.stateCode, input.number);
    return await this.registerUser.confirmUserPhone(input);
  }
}
