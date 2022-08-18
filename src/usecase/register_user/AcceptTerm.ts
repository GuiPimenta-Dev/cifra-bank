import OutputDTO from "../../dto/application/OutputDTO";
import Document from "../../domain/entity/Document";
import RegisterUserFacadeInterface from "../../domain/infra/baas/facade/RegisterUserFacade";

export default class AcceptTerm {
  constructor(private registerUser: RegisterUserFacadeInterface) {}

  async execute(document: string, term: string, code: string): Promise<OutputDTO> {
    document = new Document(document).getDocument();
    return await this.registerUser.acceptTerm(document, term, code);
  }
}
