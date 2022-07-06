import Handler from "../../../domain/application/Handler";
import DomainEvent from "../../../domain/event/interface/DomainEvent";

export default interface BrokerInterface {
  handlers: Handler[];
  register(handler: Handler): void;
  publish(event: DomainEvent): void;
}
