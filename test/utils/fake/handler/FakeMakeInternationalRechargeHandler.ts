import Handler from "../../../../src/application/handler/implements/Handler";
import InternationalRechargeMade from "../../../../src/domain/event/InternationalRechargeMade";

export default class FakeMakeInternationalRechargeHandler implements Handler {
  name = "InternationalRechargeMade";

  constructor(readonly fakeRepository: InternationalRechargeMade[] = []) {}

  handle(event: InternationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
