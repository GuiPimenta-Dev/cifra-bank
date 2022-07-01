import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import CellcoinFactory from "../factory/CellcoinFactory";

export default class CellcoinFacade implements BaasFacadeInterface {
  constructor(readonly factory: CellcoinFactory) {}

  async consultNationalProviders(id: string, stateCode: number): Promise<{ providers: string[] }> {
    const cellcoin = this.factory.createConsultProviders();
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultNationalProviders(stateCode, token);
  }

  async consultNationalRechargeValues(id: string, stateCode: number, providerId: number): Promise<any> {
    const cellcoin = this.factory.createConsultNationalRechargeValues();
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, token);
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }> {
    const cellcoin = this.factory.createMakeNationalRecharge();
    const token = await cellcoin.authorize(input.id);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token);
    await cellcoin.confirmRecharge(transactionId, token);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(
    input: MakeInternationalRechargeDTO
  ): Promise<{ receipt: string; transactionId: number }> {
    const cellcoin = this.factory.createMakeInternationalRecharge();
    const token = await cellcoin.authorize(input.id);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token);
    await cellcoin.confirmRecharge(transactionId, token);
    return { receipt, transactionId };
  }
}
