import Handler from "../../../../../src/application/handler/implements/Handler";
import BillPaymentMade from "../../../../../src/domain/event/BillPaymentMade";

export default class FakeMakeBillPaylmentHandler implements Handler {
  name = "BillPaymentMade";

  constructor(readonly fakeRepository: BillPaymentMade[] = []) {}

  handle(event: BillPaymentMade): void {
    this.fakeRepository.push(event);
  }
}
