import JwtPayloadDTO from "../../application/dto/JwtPayloadDTO";
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
  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<any> {
    const cellcoin = new Authorize(this.httpClient);
    return await cellcoin.authorize(id);
  }

  async consultAccountData(jwtPayload: JwtPayloadDTO, type: number, digitable: string): Promise<any> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, jwtPayload.cellcoinToken);
  }

  async consultInternationalRechargeValues(
    jwtPayload: JwtPayloadDTO,
    countryCode: number,
    number: number
  ): Promise<any> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, jwtPayload.cellcoinToken);
  }

  async consultAvailableCountries(jwtPayload: JwtPayloadDTO, page: number): Promise<any> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, jwtPayload.cellcoinToken);
  }

  async consultNationalProviders(jwtPayload: JwtPayloadDTO, stateCode: number): Promise<any> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, jwtPayload.cellcoinToken);
  }

  async consultNationalRechargeValues(jwtPayload: JwtPayloadDTO, stateCode: number, providerId: number): Promise<any> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, jwtPayload.cellcoinToken);
  }

  async makeBillPayment(jwtPayload: JwtPayloadDTO, input: MakeBillPaymentDTO): Promise<any> {
    const cellcoin = new MakeBillPayment(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, jwtPayload.cellcoinToken);
    await cellcoin.confirmBillPayment(transactionId, jwtPayload.cellcoinToken);
    return { receipt, transactionId };
  }

  async makeNationalRecharge(jwtPayload: JwtPayloadDTO, input: MakeNationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, jwtPayload.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, jwtPayload.cellcoinToken);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(jwtPayload: JwtPayloadDTO, input: MakeInternationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, jwtPayload.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, jwtPayload.cellcoinToken);
    return { receipt, transactionId };
  }
}
