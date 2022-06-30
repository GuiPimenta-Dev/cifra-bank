import DomainEvent from "../../infra/broker/DomainEvent";

export default class NationalRechargeMade implements DomainEvent {
  name = "NationalRechargeMade";
  constructor(
    readonly document: string,
    readonly transactionId: number,
    readonly value: number,
    readonly providerId: number
  ) {}
}
