import jwt from "jsonwebtoken";

import env from "../../../env";
import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";

export default class Authorize implements UseCaseInterface {
  cellcoinFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.cellcoinFacade = baasFactory.createCellcoinFacade();
  }

  async execute(id: string): Promise<any> {
    const cellcoinToken = await this.cellcoinFacade.authorize(id);

    const token = jwt.sign({ cellcoinToken }, env.JWT_SECRET, {
      expiresIn: "40min",
    });

    return { token };
  }
}
