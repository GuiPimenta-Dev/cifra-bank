import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import MakeBillPaymentDTO from "../../dto/usecase/MakeBillPaymentDTO";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import BillFacadeInterface from "../../domain/infra/baas/facade/BillFacade";
import BrokerInterface from "../../domain/infra/broker/Broker";

export default class MakeBillPayment {
  constructor(private billFacade: BillFacadeInterface, private broker: BrokerInterface) {}

  async execute(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value } = input.billData;
    const { statusCode, data } = await this.billFacade.makeBillPayment(input, auth);
    this.broker.publish(new BillPaymentMade(auth.document, data.transactionId, value));
    return { statusCode, data };
  }
}
