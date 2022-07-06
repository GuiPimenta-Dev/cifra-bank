import DomainEvent from "../../../../src/domain/event/implements/DomainEvent";

export default class FakeDomainEvent implements DomainEvent {
  name = "FakeDomainEventHappened";
}
