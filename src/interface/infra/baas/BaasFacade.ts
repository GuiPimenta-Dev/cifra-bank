import AuthDTO from "../../../application/dto/AuthDTO";
import MakeBillPaymentDTO from "../../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../application/dto/OutputDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<OutputDTO>;
  consultBill(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO>;
  consultAvailableCountries(page: number, auth: AuthDTO): Promise<OutputDTO>;
  consultNationalProviders(stateCode: number, auth: AuthDTO): Promise<OutputDTO>;
  consultNationalValues(stateCode: number, providerId: number, auth: AuthDTO): Promise<OutputDTO>;
  consultInternationalValues(countryCode: number, number: number, auth: AuthDTO): Promise<OutputDTO>;
  makeBillPayment(input: MakeBillPaymentDTO, auth: AuthDTO): Promise<OutputDTO>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO>;
}
