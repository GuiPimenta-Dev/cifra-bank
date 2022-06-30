import NationalRechargeMade from "../../../src/domain/event/NationalRechargeMade";
import Handler from "../../../src/infra/broker/Handler";

export default class FakeMakeNationalRechargeHandler implements Handler {
  name = "NationalRechargeMade";

  constructor(readonly fakeRepository: NationalRechargeMade[] = []) {}

  handle(event: NationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
