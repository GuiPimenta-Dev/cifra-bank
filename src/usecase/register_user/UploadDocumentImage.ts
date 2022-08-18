import OutputDTO from "../../dto/application/OutputDTO";
import UploadDocumentImageDTO from "../../dto/usecase/UploadDocumentImageDTO";
import Document from "../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../domain/infra/baas/facade/RegisterUserFacade";

export default class UploadDocumentImage {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(input: UploadDocumentImageDTO): Promise<OutputDTO> {
    const { document } = input;
    input.document = new Document(document).getDocument();
    return await this.registerUser.uploadDocumentImage(input);
  }
}
