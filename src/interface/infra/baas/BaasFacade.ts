import AuthDTO from "../../../application/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<OutputDTO>;
  consultAccountData(type: number, digitable: string, token: AuthDTO): Promise<OutputDTO>;
  consultAvailableCountries(page: number, token: AuthDTO): Promise<OutputDTO>;
  consultNationalProviders(stateCode: number, token: AuthDTO): Promise<OutputDTO>;
  consultNationalRechargeValues(stateCode: number, providerId: number, token: AuthDTO): Promise<OutputDTO>;
  consultInternationalRechargeValues(countryCode: number, number: number, token: AuthDTO): Promise<OutputDTO>;
  makeBillPayment(input: MakeBillPaymentDTO, token: AuthDTO): Promise<OutputDTO>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, token: AuthDTO): Promise<OutputDTO>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, token: AuthDTO): Promise<OutputDTO>;
}
