import OutputDTO from "../../../domain/dto/application/OutputDTO";
import Document from "../../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class UploadSignature {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(document: string, file: File | string, type: string): Promise<OutputDTO> {
    document = new Document(document).getDocument();
    return await this.registerUser.uploadSignature(document, file, type);
  }
}
