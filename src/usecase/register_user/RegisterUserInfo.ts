import OutputDTO from "../../domain/dto/application/OutputDTO";
import RegisterUserDTO from "../../domain/dto/usecase/RegisterUserInfoDTO";
import Document from "../../domain/entity/Document";
import NationalPhone from "../../domain/entity/NationalPhone";
import RegisterUserFacadeInterface from "../../domain/infra/baas/facade/RegisterUserFacade";

export default class RegisterUserInfo {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(input: RegisterUserDTO): Promise<OutputDTO> {
    input.document = new Document(input.document).getDocument();
    const phone = input.phone;
    const BRAZIL_COUNTRY_CODE = 55;
    new NationalPhone(BRAZIL_COUNTRY_CODE, phone.stateCode, phone.number);
    return await this.registerUser.registerUserInfo(input);
  }
}
