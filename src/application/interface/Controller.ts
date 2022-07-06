import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import HttpDTO from "../dto/InputDTO";
import OutputDTO from "../dto/OutputDTO";

export default interface ControllerInterface {
  readonly baasFactory: BaasFactoryInterface;
  handle(input: HttpDTO): Promise<OutputDTO>;
}
