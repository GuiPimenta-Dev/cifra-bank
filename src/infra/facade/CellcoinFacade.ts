import JwtPayload from "../../application/dto/JwtPayload";
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

  async consultAccountData(jwtPayload: JwtPayload, type: 1 | 2 | 3, digitable: string): Promise<any> {
    const cellcoin = new ConsultAccountData(this.httpClient);
    return cellcoin.consultAccountData(type, digitable, jwtPayload.cellcoinToken);
  }

  async consultInternationalRechargeValues(jwtPayload: JwtPayload, countryCode: number, number: number): Promise<any> {
    const cellcoin = new ConsultInternationalRechargeValues(this.httpClient);
    return await cellcoin.consultInternationalRechargeValues(countryCode, number, jwtPayload.cellcoinToken);
  }

  async consultAvailableCountries(jwtPayload: JwtPayload, page: number): Promise<any> {
    const cellcoin = new ConsultAvailableCountries(this.httpClient);
    return await cellcoin.consultAvailableCountries(page, jwtPayload.cellcoinToken);
  }

  async consultNationalProviders(jwtPayload: JwtPayload, stateCode: number): Promise<any> {
    const cellcoin = new ConsultNationalProviders(this.httpClient);
    return await cellcoin.consultNationalProviders(stateCode, jwtPayload.cellcoinToken);
  }

  async consultNationalRechargeValues(jwtPayload: JwtPayload, stateCode: number, providerId: number): Promise<any> {
    const cellcoin = new ConsultNationalRechargeValues(this.httpClient);
    return await cellcoin.consultNationalRechargeValues(stateCode, providerId, jwtPayload.cellcoinToken);
  }

  async makeNationalRecharge(jwtPayload: JwtPayload, input: MakeNationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeNationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, jwtPayload.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, jwtPayload.cellcoinToken);
    return { receipt, transactionId };
  }

  async makeInternationalRecharge(jwtPayload: JwtPayload, input: MakeInternationalRechargeDTO): Promise<any> {
    const cellcoin = new MakeInternationalRecharge(this.httpClient);
    const { receiptformatted: receipt, transactionId } = await cellcoin.reserveBalance(input, jwtPayload.cellcoinToken);
    await cellcoin.confirmRecharge(transactionId, jwtPayload.cellcoinToken);
    return { receipt, transactionId };
  }
}
