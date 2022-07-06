import Handler from "../../application/handler/implements/Handler";
import DomainEvent from "../../domain/event/implements/DomainEvent";
import BrokerInterface from "../../interface/infra/broker/Broker";

export default class Broker implements BrokerInterface {
  handlers: Handler[];

  constructor() {
    this.handlers = [];
  }

  register(handler: Handler) {
    this.handlers.push(handler);
  }

  publish(event: DomainEvent) {
    for (const handler of this.handlers) {
      if (handler.name === event.name) {
        handler.handle(event);
      }
    }
  }
}
