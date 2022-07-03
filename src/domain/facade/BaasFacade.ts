import JwtPayloadDTO from "../../application/dto/JwtPayloadDTO";
import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<any>;
  consultAccountData(jwtPayload: JwtPayloadDTO, type: number, digitable: string): Promise<any>;
  consultAvailableCountries(jwtPayload: JwtPayloadDTO, page: number): Promise<any>;
  consultNationalProviders(jwtPayload: JwtPayloadDTO, stateCode: number): Promise<any>;
  consultNationalRechargeValues(jwtPayload: JwtPayloadDTO, stateCode: number, providerId: number): Promise<any>;
  consultInternationalRechargeValues(jwtPayload: JwtPayloadDTO, countryCode: number, number: number): Promise<any>;
  makeBillPayment(jwtPayload: JwtPayloadDTO, input: MakeBillPaymentDTO): Promise<any>;
  makeNationalRecharge(jwtPayload: JwtPayloadDTO, input: MakeNationalRechargeDTO): Promise<any>;
  makeInternationalRecharge(jwtPayload: JwtPayloadDTO, input: MakeInternationalRechargeDTO): Promise<any>;
}
