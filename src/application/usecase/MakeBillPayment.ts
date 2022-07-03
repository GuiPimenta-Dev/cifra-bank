import Document from "../../domain/entity/Document";
import BillPaymentMade from "../../domain/event/BillPaymentMade";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import Broker from "../../infra/broker/Broker";
import JwtPayloadDTO from "../dto/JwtPayloadDTO";
import MakeBillPaymentDTO from "../dto/MakeBillPaymentDTO";

export default class MakeBillPayment implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayloadDTO, input: MakeBillPaymentDTO): Promise<{ receipt: string }> {
    const { value } = input.billData;
    input.document = new Document(input.document).getDocument();
    const { receipt, transactionId } = await this.baasFacade.makeBillPayment(jwtPayload, input);
    this.broker.publish(new BillPaymentMade(input.document, transactionId, value));
    return { receipt };
  }
}
