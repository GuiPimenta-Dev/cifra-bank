import Client from "../../../domain/entity/Client";
import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import {
  NationalRechargeRequesterInterface,
  ReserveBalanceDTO,
} from "../../../domain/requester/NationalRechargeRequester";

export default class NationalRecharge {
  requester: NationalRechargeRequesterInterface;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createNationalRechargeRequester();
  }

  async execute(id: string, input: ReserveBalanceDTO): Promise<{ receipt: string }> {
    const { phone } = input;
    new Client(input.document, phone.stateCode, phone.countryCode, phone.number);
    const token = await this.requester.authorize(id);
    const { receiptformatted: receipt, transactionId } = await this.requester.reserveBalance(input, token);
    await this.requester.confirmRecharge(transactionId, token);
    return { receipt };
  }
}
