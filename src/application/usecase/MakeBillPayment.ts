import Document from "../../domain/entity/Document";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import MakeBillPaymentDTO from "../dto/MakeBillPaymentDTO";

export default class MakeBillPayment implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface, readonly broker: Broker) {}

  async execute(input: MakeBillPaymentDTO): Promise<{ receipt: string }> {
    const { value } = input.billData;
    input.document = new Document(input.document).getDocument();
    const { receipt, transactionId } = await this.baasFacade.makeBillPayment(input);
    this.broker.publish(new BillPaymentMade(input.document, transactionId, value));
    return { receipt };
  }
}
