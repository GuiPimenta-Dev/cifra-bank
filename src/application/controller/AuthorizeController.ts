import ControllerInterface from "../../domain/application/Controller";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import Authorize from "../usecase/Authorize";

export default class AuthorizeController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(_: any, body: { id: string }): Promise<any> {
    const authorize = new Authorize(this.baasFactory);
    return await authorize.execute(body.id);
  }
}
