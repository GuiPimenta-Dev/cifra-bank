import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  token: string;
  authorize(id: string): Promise<void>;
  consultAccountData(type: number, digitable: string): Promise<any>;
  consultAvailableCountries(page: number): Promise<any>;
  consultNationalProviders(stateCode: number): Promise<any>;
  consultNationalRechargeValues(stateCode: number, providerId: number): Promise<any>;
  consultInternationalRechargeValues(countryCode: number, number: number): Promise<any>;
  makeBillPayment(input: MakeBillPaymentDTO): Promise<any>;
  makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<any>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO): Promise<any>;
}
