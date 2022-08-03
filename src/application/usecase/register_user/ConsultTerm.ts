import OutputDTO from "../../../domain/dto/application/OutputDTO";
import Document from "../../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";

export default class ConsultTerm {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(document: string, term: string): Promise<OutputDTO> {
    document = new Document(document).getDocument();
    return await this.registerUser.consultTerm(document, term);
  }
}
