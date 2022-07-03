import jwt from "jsonwebtoken";

import env from "../../../env";
import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class Authorize implements UseCaseInterface {
  constructor(readonly cellcoinFacade: BaasFacadeInterface) {}

  async execute(id: string): Promise<any> {
    await this.cellcoinFacade.authorize(id);

    const token = jwt.sign({}, env.JWT_SECRET, {
      expiresIn: "40min",
    });

    return { token };
  }
}
