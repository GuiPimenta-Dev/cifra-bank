import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";
import TokenDTO from "../../../application/dto/TokenDTO";
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
  public token: string = "";

  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<OutputDTO> {
    const cellcoin = new Authorize(this.httpClient);
    return await cellcoin.authorize(id);
  }

  async consultAccountData(type: number, digitable: string, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, token.cellcoinToken);
  }

  async consultInternationalRechargeValues(countryCode: number, number: number, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, token.cellcoinToken);
  }

  async consultAvailableCountries(page: number, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, token.cellcoinToken);
  }

  async consultNationalProviders(stateCode: number, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, token.cellcoinToken);
  }

  async consultNationalRechargeValues(stateCode: number, providerId: number, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, token.cellcoinToken);
  }

  async makeBillPayment(input: MakeBillPaymentDTO, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmBillPayment(transactionId, token.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, token.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO, token: TokenDTO): Promise<OutputDTO> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, token.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, token.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }
}
