import DomainEvent from "../../infra/broker/DomainEvent";

export default class NationalRechargeConfirmed implements DomainEvent {
  name = "NationalRechargeConfirmed";
  constructor(
    readonly document: string,
    readonly transactionId: number,
    readonly value: number,
    readonly providerId: number
  ) {}
}
