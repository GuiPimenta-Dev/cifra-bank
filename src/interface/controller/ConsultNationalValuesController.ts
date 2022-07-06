import InputDTO from "../../application/dto/InputDTO";
import OutputDTO from "../../application/dto/OutputDTO";
import ControllerInterface from "../../application/interface/Controller";
import ConsultNationalValues from "../../application/usecase/ConsultNationalValues";
import BaasFactoryInterface from "../infra/baas/BaasFactory";

export default class ConsultNationalValuesController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  handle(input: InputDTO): Promise<OutputDTO> {
    const { query, headers } = input;
    const consultNationalValues = new ConsultNationalValues(this.baasFactory);
    return consultNationalValues.execute(query.stateCode, query.providerId, headers.auth);
  }
}
