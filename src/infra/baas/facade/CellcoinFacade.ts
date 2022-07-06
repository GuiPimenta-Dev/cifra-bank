import AuthDTO from "../../../application/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";
import BaasFacadeInterface from "../../../domain/baas/BaasFacade";
import HttpClientInterface from "../../http/interface/HttpClient";
import Authorize from "../cellcoin/Authorize";
import ConsultAccountData from "../cellcoin/ConsultAccountData";
import ConsultAvailableCountries from "../cellcoin/ConsultAvailableCountries";
import ConsultInternationalRechargeValues from "../cellcoin/ConsultInternationalRechargeValues";
import ConsultNationalProviders from "../cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../cellcoin/ConsultNationalRechargeValues";
import MakeBillPayment from "../cellcoin/MakeBillPayment";
import MakeInternationalRecharge from "../cellcoin/MakeInternationalRecharge";
import MakeNationalRecharge from "../cellcoin/MakeNationalRecharge";

export default class CellcoinFacade implements BaasFacadeInterface {
  public auth: string = "";

  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<OutputDTO> {
    const cellcoin = new Authorize(this.httpClient);
    return await cellcoin.authorize(id);
  }

  async consultAccountData(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, auth.cellcoinToken);
  }

  async consultInternationalRechargeValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, auth.cellcoinToken);
  }

  async consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, auth.cellcoinToken);
  }

  async consultNationalProviders(stateCode: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, auth.cellcoinToken);
  }

  async consultNationalRechargeValues(stateCode: number, providerId: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, auth.cellcoinToken);
  }

  async makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmBillPayment(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }
}
