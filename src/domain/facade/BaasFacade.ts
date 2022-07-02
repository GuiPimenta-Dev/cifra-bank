import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  consultAccountData(id: string, type: 1 | 2 | 3, digitable: string): Promise<any>;
  consultAvailableCountries(id: string, page: number): Promise<{ countries: any }>;
  consultNationalProviders(id: string, stateCode: number): Promise<{ providers: any }>;
  consultNationalRechargeValues(id: string, stateCode: number, providerId: number): Promise<{ values: any }>;
  consultInternationalRechargeValues(id: string, countryCode: number, number: number): Promise<{ data: any }>;
  makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
}
