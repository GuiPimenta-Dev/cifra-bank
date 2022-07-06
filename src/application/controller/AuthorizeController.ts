import ControllerInterface from "../../domain/application/Controller";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import HttpDTO from "../dto/InputDTO";
import Authorize from "../usecase/Authorize";

export default class AuthorizeController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}
  setBaasFactory(baasFactory: BaasFactoryInterface): void {
    throw new Error("Method not implemented.");
  }

  async handle(input: HttpDTO): Promise<any> {
    const { body } = input;
    const authorize = new Authorize(this.baasFactory);
    return await authorize.execute(body.id);
  }
}
