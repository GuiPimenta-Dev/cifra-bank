import DomainEvent from "../../../../src/domain/event/interface/DomainEvent";

export default class FakeDomainEvent implements DomainEvent {
  name = "FakeDomainEventHappened";
}
