import jwt from "jsonwebtoken";

import OutputDTO from "../../../domain/dto/application/OutputDTO";
import Document from "../../../domain/entity/Document";
import AuthorizeFacadeInterface from "../../../domain/infra/baas/facade/AuthorizeFacade";

export default class Authorize {
  constructor(private authorizeFacade: AuthorizeFacadeInterface) {}

  async execute(id: string, document: string, username: string, password: string): Promise<OutputDTO> {
    const { data } = await this.authorizeFacade.authorize(id, username, password);
    document = new Document(document).getDocument();
    const token = jwt.sign({ document, ...data }, process.env.JWT_SECRET as string, {
      expiresIn: "40min",
    });
    return { statusCode: 200, data: { token } };
  }
}
