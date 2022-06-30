import NationalRechargeConfirmed from "../../../../../src/domain/event/NationalRechargeConfirmed";
import Handler from "../../../../../src/infra/broker/Handler";

export default class FakeNationalRechargeConfirmedHandler implements Handler {
  name = "NationalRechargeConfirmed";
  constructor(readonly fakeRepository: NationalRechargeConfirmed[] = []) {}

  handle(event: NationalRechargeConfirmed): void {
    this.fakeRepository.push(event);
  }
}
