import UseCaseInterface from "../../domain/application/UseCase";
import Document from "../../domain/entity/Document";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import Broker from "../../infra/broker/Broker";
import MakeBillPaymentDTO from "../dto/MakeBillPaymentDTO";
import TokenDTO from "../dto/TokenDTO";

export default class MakeBillPayment implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeBillPaymentDTO, token: TokenDTO): Promise<{ receipt: string }> {
    const { value } = input.billData;
    input.document = new Document(input.document).getDocument();
    const { receipt, transactionId } = await this.baasFacade.makeBillPayment(input, token);
    this.broker.publish(new BillPaymentMade(input.document, transactionId, value));
    return { receipt };
  }
}
