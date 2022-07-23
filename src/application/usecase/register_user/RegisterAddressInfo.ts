import OutputDTO from "../../../domain/dto/application/OutputDTO";
import RegisterAddressInfoDTO from "../../../domain/dto/usecase/RegisterAddressInfoDTO";
import Document from "../../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class RegisterAddressInfo {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(input: RegisterAddressInfoDTO): Promise<OutputDTO> {
    input.document = new Document(input.document).getDocument();
    return await this.registerUser.registerAddressInfo(input);
  }
}
