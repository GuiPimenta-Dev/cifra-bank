import DomainEvent from "../../../../src/infra/broker/DomainEvent";

export default class FakeDomainEvent implements DomainEvent {
  name = "FakeDomainEventHappened";
}
