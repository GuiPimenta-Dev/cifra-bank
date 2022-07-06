import InternationalRechargeMade from "../../../../../src/domain/event/InternationalRechargeMade";
import Handler from "../../../../../src/infra/broker/interface/Handler";

export default class FakeMakeInternationalRechargeHandler implements Handler {
  name = "InternationalRechargeMade";

  constructor(readonly fakeRepository: InternationalRechargeMade[] = []) {}

  handle(event: InternationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
