import ControllerInterface from "../../domain/application/Controller";
import BaasFacade from "../../domain/facade/BaasFacade";
import Authorize from "../usecase/Authorize";

export default class AuthorizeController implements ControllerInterface {
  constructor(readonly cellcoinFacade: BaasFacade) {}

  async handle(params: any, body: { id: string }): Promise<any> {
    const authorize = new Authorize(this.cellcoinFacade);
    return await authorize.execute(body.id);
  }
}
