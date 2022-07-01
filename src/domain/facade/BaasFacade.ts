import ConsultAvailableCountriesDTO from "../../application/dto/ConsultAvailableCountriesDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  consultNationalProviders(id: string, stateCode: number): Promise<{ providers: string[] }>;
  consultNationalRechargeValues(id: string, stateCode: number, providerId: number): Promise<{ values: string[] }>;
  consultAvailableCountries(id: string, page: number): Promise<{ countries: ConsultAvailableCountriesDTO[] }>;
  makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
}
