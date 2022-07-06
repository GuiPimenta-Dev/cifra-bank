import InputDTO from "../../application/dto/InputDTO";
import OutputDTO from "../../application/dto/OutputDTO";
import ControllerInterface from "../../application/interface/Controller";
import MakeBillPayment from "../../application/usecase/MakeBillPayment";
import BaasFactory from "../infra/baas/BaasFactory";
import Broker from "../infra/broker/Broker";

export default class MakeBillPaymentController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactory, readonly broker: Broker) {}

  handle(input: InputDTO): Promise<OutputDTO> {
    const { body, headers } = input;
    const makeBillPayment = new MakeBillPayment(this.baasFactory, this.broker);
    return makeBillPayment.execute(body, headers.auth);
  }
}
