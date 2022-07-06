import InputDTO from "../../application/dto/InputDTO";
import OutputDTO from "../../application/dto/OutputDTO";
import ControllerInterface from "../../application/interface/Controller";
import MakeInternationalRecharge from "../../application/usecase/MakeInternationalRecharge";
import MakeNationalRecharge from "../../application/usecase/MakeNationalRecharge";
import BaasFactory from "../infra/baas/BaasFactory";
import Broker from "../infra/broker/Broker";

export default class MakeNationalRechargeController implements ControllerInterface {
  constructor(readonly baasFactory: BaasFactory, readonly broker: Broker) {}

  handle(input: InputDTO): Promise<OutputDTO> {
    const { body, headers } = input;
    const makeNationalRechargeController = new MakeNationalRecharge(this.baasFactory, this.broker);
    return makeNationalRechargeController.execute(body, headers.auth);
  }
}
