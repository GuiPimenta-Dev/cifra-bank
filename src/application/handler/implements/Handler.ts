import DomainEvent from "../../../domain/event/implements/DomainEvent";

export default interface Handler {
  name: string;
  handle(event: DomainEvent): void;
}
