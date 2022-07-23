import OutputDTO from "../../../domain/dto/application/OutputDTO";
import Document from "../../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class CreatePassword {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(document: string, password: string, confirmPassword: string): Promise<OutputDTO> {
    document = new Document(document).getDocument();
    return await this.registerUser.createPassword(document, password, confirmPassword);
  }
}
