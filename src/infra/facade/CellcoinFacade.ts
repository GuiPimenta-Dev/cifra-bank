import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
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
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFacade implements BaasFacadeInterface {
  public token: string = "";

  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<void> {
    const cellcoin = new Authorize(this.httpClient);
    this.token = await cellcoin.authorize(id);
  }

  async consultAccountData(type: number, digitable: string): Promise<any> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, this.token);
  }

  async consultInternationalRechargeValues(countryCode: number, number: number): Promise<any> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, this.token);
  }

  async consultAvailableCountries(page: number): Promise<any> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, this.token);
  }

  async consultNationalProviders(stateCode: number): Promise<any> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, this.token);
  }

  async consultNationalRechargeValues(stateCode: number, providerId: number): Promise<any> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, this.token);
  }

  async makeBillPayment(input: MakeBillPaymentDTO): Promise<any> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, this.token);
    await cellcoin.confirmBillPayment(transactionId, this.token);
    return { receipt, transactionId };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, this.token);
    await cellcoin.confirmRecharge(transactionId, this.token);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, this.token);
    await cellcoin.confirmRecharge(transactionId, this.token);
    return { receipt, transactionId };
  }
}
