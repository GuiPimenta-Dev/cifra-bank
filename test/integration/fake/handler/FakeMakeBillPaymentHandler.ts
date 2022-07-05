import BillPaymentMade from "../../../../src/domain/event/BillPaymentMade";
import Handler from "../../../../src/infra/broker/interface/Handler";

export default class FakeMakeBillPaylmentHandler implements Handler {
  name = "BillPaymentMade";

  constructor(readonly fakeRepository: BillPaymentMade[] = []) {}

  handle(event: BillPaymentMade): void {
    this.fakeRepository.push(event);
  }
}
