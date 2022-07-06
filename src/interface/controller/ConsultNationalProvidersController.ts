import InputDTO from "../../application/dto/InputDTO";
import OutputDTO from "../../application/dto/OutputDTO";
import ControllerInterface from "../../application/interface/Controller";
import ConsultNationalProviders from "../../application/usecase/ConsultNationalProviders";
import BaasFactoryInterface from "../infra/baas/BaasFactory";

export default class ConsultNationalProvidersController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  async handle(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultNationalProviders = new ConsultNationalProviders(this.baasFactory);
    return await consultNationalProviders.execute(query.stateCode, headers.auth);
  }
}
