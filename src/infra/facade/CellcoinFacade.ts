import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import TokenDTO from "../../application/dto/TokenDTO";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import Authorize from "../baas/cellcoin/Authorize";
import ConsultAccountData from "../baas/cellcoin/ConsultAccountData";
import ConsultAvailableCountries from "../baas/cellcoin/ConsultAvailableCountries";
import ConsultInternationalRechargeValues from "../baas/cellcoin/ConsultInternationalRechargeValues";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../baas/cellcoin/ConsultNationalRechargeValues";
import MakeBillPayment from "../baas/cellcoin/MakeBillPayment";
import MakeInternationalRecharge from "../baas/cellcoin/MakeInternationalRecharge";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/interface/HttpClient";

export default class CellcoinFacade implements BaasFacadeInterface {
  public token: string = "";

  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<string> {
    const cellcoin = new Authorize(this.httpClient);
    return await cellcoin.authorize(id);
  }

  async consultAccountData(type: number, digitable: string, token: TokenDTO): Promise<any> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, token.cellcoinToken);
  }

  async consultInternationalRechargeValues(countryCode: number, number: number, token: TokenDTO): Promise<any> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, token.cellcoinToken);
  }

  async consultAvailableCountries(page: number, token: TokenDTO): Promise<any> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, token.cellcoinToken);
  }

  async consultNationalProviders(stateCode: number, token: TokenDTO): Promise<any> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, token.cellcoinToken);
  }

  async consultNationalRechargeValues(stateCode: number, providerId: number, token: TokenDTO): Promise<any> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, token.cellcoinToken);
  }

  async makeBillPayment(input: MakeBillPaymentDTO, token: TokenDTO): Promise<any> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    await cellcoin.confirmBillPayment(transactionId, token.cellcoinToken);
    return { receipt, transactionId };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO, token: TokenDTO): Promise<any> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, token.cellcoinToken);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO, token: TokenDTO): Promise<any> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, token.cellcoinToken);
    return { receipt, transactionId };
  }
}
