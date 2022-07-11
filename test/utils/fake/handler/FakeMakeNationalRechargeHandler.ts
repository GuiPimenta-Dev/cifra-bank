import Handler from "../../../../src/application/handler/implements/Handler";
import NationalRechargeMade from "../../../../src/domain/event/NationalRechargeMade";

export default class FakeMakeNationalRechargeHandler implements Handler {
  name = "NationalRechargeMade";

  constructor(readonly fakeRepository: NationalRechargeMade[] = []) {}

  handle(event: NationalRechargeMade): void {
    this.fakeRepository.push(event);
  }
}
