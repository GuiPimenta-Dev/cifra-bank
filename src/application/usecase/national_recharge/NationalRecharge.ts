import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import NationalRechargeRequester from "../../../domain/requester/NationalRechargeRequester";

export default class NationalRecharge {
  requester: NationalRechargeRequester;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createNationalRechargeRequester();
  }

  async execute(cpf: string, value: number): Promise<{ receipt: string }> {
    const token = await this.requester.authorize(cpf);
    const { receiptformatted: receipt, transactionId } = await this.requester.reserveBalance(value, token);
    await this.requester.confirmRecharge(transactionId, token);
    return { receipt };
  }
}
