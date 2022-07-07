import Document from "../../domain/entity/Document";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import BaasFacadeInterface from "../../domain/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import BrokerInterface from "../../domain/infra/broker/Broker";
import AuthDTO from "../dto/AuthDTO";
import MakeBillPaymentDTO from "../dto/MakeBillPaymentDTO";
import OutputDTO from "../dto/OutputDTO";

export default class MakeBillPayment {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: BrokerInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value } = input.billData;
    auth.document = new Document(auth.document).getDocument();
    const { statusCode, data } = await this.baasFacade.makeBillPayment(input, auth);
    this.broker.publish(new BillPaymentMade(auth.document, data.transactionId, value));
    return { statusCode, data };
  }
}
