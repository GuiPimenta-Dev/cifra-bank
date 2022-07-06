import AuthDTO from "../../../application/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";
import BaasFacadeInterface from "../../../interface/infra/baas/BaasFacade";
import HttpClientInterface from "../../../interface/infra/http/HttpClient";
import Authorize from "../cellcoin/Authorize";
import ConsultAvailableCountries from "../cellcoin/ConsultAvailableCountries";
import ConsultBill from "../cellcoin/ConsultBill";
import ConsultInternationalValues from "../cellcoin/ConsultInternationalValues";
import ConsultNationalProviders from "../cellcoin/ConsultNationalProviders";
import ConsultNationalValues from "../cellcoin/ConsultNationalValues";
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

  async consultBill(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultBill(this.httpClient);
    return cellcoin.consultBill(type, digitable, auth.cellcoinToken);
  }

  async consultInternationalValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultInternationalValues(this.httpClient);
    return await cellcoin.consultInternationalValues(countryCode, number, auth.cellcoinToken);
  }

  async consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, auth.cellcoinToken);
  }

  async consultNationalProviders(stateCode: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, auth.cellcoinToken);
  }

  async consultNationalValues(stateCode: number, providerId: number, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new ConsultNationalValues(this.httpClient);
    return await cellcoin.consultNationalValues(stateCode, providerId, auth.cellcoinToken);
  }

  async makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.document, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmBillPayment(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeNationalRecharge(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.document, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }

  async makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { data } = await cellcoin.reserveBalance(input, auth.document, auth.cellcoinToken);
    const { receiptformatted: receipt, transactionId } = data;
    await cellcoin.confirmRecharge(transactionId, auth.cellcoinToken);
    return { statusCode: 200, data: { receipt } };
  }
}
