import DomainEvent from "../../../../src/infra/broker/interface/DomainEvent";

export default class FakeDomainEvent implements DomainEvent {
  name = "FakeDomainEventHappened";
}
