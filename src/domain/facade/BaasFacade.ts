import MakeNationalRechargeDTO from "../../application/dto/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  consultNationalProviders(id: string, stateCode: number): Promise<any>;
  consultNationalRechargeValues(id: string, stateCode: number, providerId: number): Promise<any>;
  makeNationalRecharge(input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
}
