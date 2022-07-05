import DomainEvent from "./interface/DomainEvent";
import Handler from "./interface/Handler";

export default class Broker {
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
