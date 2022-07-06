import UseCaseInterface from "../../domain/application/UseCase";
import Document from "../../domain/entity/Document";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import Broker from "../../infra/broker/Broker";
import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import MakeBillPaymentDTO from "../dto/MakeBillPaymentDTO";
import OutputDTO from "../dto/OutputDTO";

export default class MakeBillPayment implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
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
