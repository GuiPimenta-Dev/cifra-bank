import DomainEvent from "../event/interface/DomainEvent";

export default interface Handler {
  name: string;
  handle(event: DomainEvent): void;
}
