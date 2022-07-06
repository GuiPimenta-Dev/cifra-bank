import DomainEvent from "./interface/DomainEvent";

export default class BillPaymentMade implements DomainEvent {
  name = "BillPaymentMade";
  constructor(readonly document: string, readonly transactionId: number, readonly value: number) {}
}
