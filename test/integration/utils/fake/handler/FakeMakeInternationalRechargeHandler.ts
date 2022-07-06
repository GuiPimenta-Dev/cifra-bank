import Handler from "../../../../../src/domain/application/Handler";
import InternationalRechargeMade from "../../../../../src/domain/event/InternationalRechargeMade";

export default class FakeMakeInternationalRechargeHandler implements Handler {
  name = "InternationalRechargeMade";

  constructor(readonly fakeRepository: InternationalRechargeMade[] = []) {}

  handle(event: InternationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
