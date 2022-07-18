import jwt from "jsonwebtoken";

import env from "../../../../env";
import OutputDTO from "../../../domain/dto/OutputDTO";
import Document from "../../../domain/entity/Document";
import AuthorizeFacadeInterface from "../../../domain/infra/baas/facade/AuthorizeFacade";

export default class Authorize {
  constructor(private authorizeFacade: AuthorizeFacadeInterface) {}

  async execute(id: string, document: string): Promise<OutputDTO> {
    const { data: celcoinToken } = await this.authorizeFacade.authorize(id);
    document = new Document(document).getDocument();
    const token = jwt.sign({ document, celcoinToken }, env.JWT_SECRET, {
      expiresIn: "40min",
    });

    return { statusCode: 200, data: { token } };
  }
}
