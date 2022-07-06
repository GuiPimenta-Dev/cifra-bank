import HttpDTO from "../../application/dto/InputDTO";
import ControllerInterface from "../../application/interface/Controller";
import Authorize from "../../application/usecase/Authorize";
import BaasFactoryInterface from "../infra/baas/BaasFactory";

export default class AuthorizeController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(input: HttpDTO): Promise<any> {
    const { body } = input;
    const authorize = new Authorize(this.baasFactory);
    return await authorize.execute(body.id, body.document);
  }
}
