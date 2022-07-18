import Handler from "../../../../src/application/handler/implements/Handler";
import FakeDomainEvent from "./FakeDomainEvent";

export default class FakeHandler implements Handler {
  name = "FakeDomainEventHappened";
  constructor(readonly fakeRepository: FakeDomainEvent[] = []) {}

  handle(event: FakeDomainEvent): void {
    this.fakeRepository.push(event);
  }
}
