import DomainEvent from "../../infra/broker/interface/DomainEvent";

export default class InternationalRechargeMade implements DomainEvent {
  name = "InternationalRechargeMade";
  constructor(
    readonly document: string,
    readonly transactionId: number,
    readonly value: number,
    readonly productId: number
  ) {}
}
