import Handler from "../../../../../src/domain/application/Handler";
import NationalRechargeMade from "../../../../../src/domain/event/NationalRechargeMade";

export default class FakeMakeNationalRechargeHandler implements Handler {
  name = "NationalRechargeMade";

  constructor(readonly fakeRepository: NationalRechargeMade[] = []) {}

  handle(event: NationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
