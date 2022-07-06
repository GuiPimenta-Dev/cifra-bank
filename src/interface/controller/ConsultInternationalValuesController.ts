import InputDTO from "../../application/dto/InputDTO";
import ControllerInterface from "../../application/interface/Controller";
import ConsultInternationalValues from "../../application/usecase/ConsultInternationalValues";
import BaasFactory from "../infra/baas/BaasFactory";

export default class ConsultInternationalValuesController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactory) {}

  handle(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultInternationalValues = new ConsultInternationalValues(this.baasFactory);
    return consultInternationalValues.execute(query.countryCode, query.phoneNumber, headers.auth);
  }
}
