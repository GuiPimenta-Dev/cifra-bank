import OutputDTO from "../../dto/application/OutputDTO";
import Document from "../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../domain/infra/baas/facade/RegisterUserFacade";

export default class UploadSelfie {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(document: string, file: File | string): Promise<OutputDTO> {
    document = new Document(document).getDocument();
    return await this.registerUser.uploadSelfie(document, file);
  }
}
