import Handler from "../../../application/handler/implements/Handler";
import DomainEvent from "../../../domain/event/implements/DomainEvent";

export default interface BrokerInterface {
  handlers: Handler[];
  register(handler: Handler): void;
  publish(event: DomainEvent): void;
}
