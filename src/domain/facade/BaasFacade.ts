import { JwtPayload } from "jsonwebtoken";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<any>;
  consultAccountData(jwtPayload: JwtPayload, type: 1 | 2 | 3, digitable: string): Promise<any>;
  consultAvailableCountries(jwtPayload: JwtPayload, page: number): Promise<any>;
  consultNationalProviders(jwtPayload: JwtPayload, stateCode: number): Promise<any>;
  consultNationalRechargeValues(jwtPayload: JwtPayload, stateCode: number, providerId: number): Promise<any>;
  consultInternationalRechargeValues(jwtPayload: JwtPayload, countryCode: number, number: number): Promise<any>;
  makeNationalRecharge(jwtPayload: JwtPayload, input: MakeNationalRechargeDTO): Promise<any>;
  makeInternationalRecharge(jwtPayload: JwtPayload, input: MakeInternationalRechargeDTO): Promise<any>;
}
