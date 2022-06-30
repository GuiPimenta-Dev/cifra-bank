import MakeNationalRechargeDTO from "../../application/usecase/make_national_recharge/MakeNationalRechargeDTO";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import CellcoinFactory from "../factory/CellcoinFactory";

export default class CellcoinFacade implements BaasFacadeInterface {
  constructor(readonly factory: CellcoinFactory) {}

  async consultNationalProviders(id: string, stateCode: number): Promise<{ providers: string }> {
    const cellcoin = this.factory.createConsultProviders();
    const token = await cellcoin.authorize(id);
    const { providers } = await cellcoin.consultNationalProviders(stateCode, token);
    return { providers };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }> {
    const cellcoin = this.factory.createMakeNationalRecharge();
    const token = await cellcoin.authorize(input.id);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token);
    await cellcoin.confirmRecharge(transactionId, token);
    return { receipt, transactionId };
  }
}
