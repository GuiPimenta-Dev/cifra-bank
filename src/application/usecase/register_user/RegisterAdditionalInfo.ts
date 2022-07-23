import OutputDTO from "../../../domain/dto/application/OutputDTO";
import RegisterAdditionalInfoDTO from "../../../domain/dto/usecase/RegisterAdditionalInfoDTO";
import Document from "../../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class RegisterAdditionalInfo {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(input: RegisterAdditionalInfoDTO): Promise<OutputDTO> {
    input.document = new Document(input.document).getDocument();
    return await this.registerUser.registerAdditionalInfo(input);
  }
}
