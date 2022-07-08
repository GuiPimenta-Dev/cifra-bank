import AuthDTO from "../../../domain/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../domain/dto/MakeBillPaymentDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import Document from "../../../domain/entity/Document";
import BillPaymentMade from "../../../domain/event/BillPaymentMade";
import BillFacadeInterface from "../../../domain/infra/baas/facade/BillFacade";
import BrokerInterface from "../../../domain/infra/broker/Broker";

export default class MakeBillPayment {
  constructor(private billFacade: BillFacadeInterface, private broker: BrokerInterface) {}

  async execute(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value } = input.billData;
    auth.document = new Document(auth.document).getDocument();
    const { statusCode, data } = await this.billFacade.makeBillPayment(input, auth);
    this.broker.publish(new BillPaymentMade(auth.document, data.transactionId, value));
    return { statusCode, data };
  }
}
