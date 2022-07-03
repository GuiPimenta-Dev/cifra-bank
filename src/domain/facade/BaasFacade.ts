import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import TokenDTO from "../../application/dto/TokenDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<string>;
  consultAccountData(type: number, digitable: string, token: TokenDTO): Promise<any>;
  consultAvailableCountries(page: number, token: TokenDTO): Promise<any>;
  consultNationalProviders(stateCode: number, token: TokenDTO): Promise<any>;
  consultNationalRechargeValues(stateCode: number, providerId: number, token: TokenDTO): Promise<any>;
  consultInternationalRechargeValues(countryCode: number, number: number, token: TokenDTO): Promise<any>;
  makeBillPayment(input: MakeBillPaymentDTO, token: TokenDTO): Promise<any>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, token: TokenDTO): Promise<any>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, token: TokenDTO): Promise<any>;
}
