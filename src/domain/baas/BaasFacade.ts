import MakeBillPaymentDTO from "../../application/dto/MakeBillPaymentDTO";
import MakeInternationalRechargeDTO from "../../application/dto/MakeInternationalRechargeDTO";
import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../application/dto/OutputDTO";
import TokenDTO from "../../application/dto/TokenDTO";

export default interface BaasFacadeInterface {
  authorize(id: string): Promise<OutputDTO>;
  consultAccountData(type: number, digitable: string, token: TokenDTO): Promise<OutputDTO>;
  consultAvailableCountries(page: number, token: TokenDTO): Promise<OutputDTO>;
  consultNationalProviders(stateCode: number, token: TokenDTO): Promise<OutputDTO>;
  consultNationalRechargeValues(stateCode: number, providerId: number, token: TokenDTO): Promise<OutputDTO>;
  consultInternationalRechargeValues(countryCode: number, number: number, token: TokenDTO): Promise<OutputDTO>;
  makeBillPayment(input: MakeBillPaymentDTO, token: TokenDTO): Promise<OutputDTO>;
  makeNationalRecharge(input: MakeNationalRechargeDTO, token: TokenDTO): Promise<OutputDTO>;
  makeInternationalRecharge(input: MakeInternationalRechargeDTO, token: TokenDTO): Promise<OutputDTO>;
}
