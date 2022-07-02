import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import Authorize from "../baas/cellcoin/Authorize";
import ConsultAccountData from "../baas/cellcoin/ConsultAccountData";
import ConsultAvailableCountries from "../baas/cellcoin/ConsultAvailableCountries";
import ConsultInternationalRechargeValues from "../baas/cellcoin/ConsultInternationalRechargeValues";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../baas/cellcoin/ConsultNationalRechargeValues";
import MakeInternationalRecharge from "../baas/cellcoin/MakeInternationalRecharge";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFacade implements BaasFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<any> {
    const cellcoin = new Authorize(this.httpClient);
    return await cellcoin.authorize(id);
  }

  async consultAccountData(id: string, type: 1 | 2 | 3, digitable: string): Promise<any> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    const token = await cellcoin.authorize(id);
    return cellcoin.consultAccountData(type, digitable, token);
  }

  async consultInternationalRechargeValues(id: string, countryCode: number, number: number): Promise<{ data: any }> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, token);
  }

  async consultAvailableCountries(id: string, page: number): Promise<{ countries: any }> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    const token = await cellcoin.authorize(id);
    return await cellcoin.consultAvailableCountries(page, token);
  }

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
