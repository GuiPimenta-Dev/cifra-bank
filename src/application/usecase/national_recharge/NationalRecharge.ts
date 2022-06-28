import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import NationalRechargeRequester from "../../../domain/requester/NationalRechargeRequester";
import { NationalRechargeOutputDTO } from "./NationalRechargeDTO";

export default class NationalRecharge {
  requester: NationalRechargeRequester;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createNationalRechargeRequester();
  }

  async execute(cpf: string, value: number): Promise<NationalRechargeOutputDTO> {
    const token = await this.requester.authorize(cpf);
    const { receiptformatted: receipt, transactionId } = await this.requester.reserveBalance(value, token);
    const { errorCode, message, status } = await this.requester.confirmRecharge(transactionId, token);
    return { receipt, errorCode, message, status };
  }
}
