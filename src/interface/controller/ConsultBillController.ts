import InputDTO from "../../application/dto/InputDTO";
import ControllerInterface from "../../application/interface/Controller";
import ConsultBill from "../../application/usecase/ConsultBill";
import BaasFactoryInterface from "../infra/baas/BaasFactory";

export default class ConsultBillController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactoryInterface) {}

  handle(input: InputDTO): Promise<any> {
    const { query, headers } = input;
    const consultBill = new ConsultBill(this.baasFactory);
    return consultBill.execute(query.type, query.digitable, headers.auth);
  }
}
