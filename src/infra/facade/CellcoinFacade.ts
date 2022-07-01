import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../baas/cellcoin/ConsultNationalRechargeValues";
import MakeInternationalRecharge from "../baas/cellcoin/MakeInternationalRecharge";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFacade implements BaasFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultNationalProviders(id: string, stateCode: number): Promise<{ providers: string[] }> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultNationalProviders(stateCode, token);
  }

  async consultNationalRechargeValues(
    id: string,
    stateCode: number,
    providerId: number
  ): Promise<{ values: string[] }> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, token);
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const token = await cellcoin.authorize(input.id);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token);
    await cellcoin.confirmRecharge(transactionId, token);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(
    input: MakeInternationalRechargeDTO
  ): Promise<{ receipt: string; transactionId: number }> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const token = await cellcoin.authorize(input.id);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token);
    await cellcoin.confirmRecharge(transactionId, token);
    return { receipt, transactionId };
  }
}
