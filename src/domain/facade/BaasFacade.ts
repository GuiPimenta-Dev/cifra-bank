import MakeNationalRechargeDTO from "../../application/usecase/make_national_recharge/MakeNationalRechargeDTO";

export default interface BaasFacadeInterface {
  consultNationalProviders(id: string, stateCode: number): Promise<any>;
  makeNationalRecharge(id: string, input: MakeNationalRechargeDTO): Promise<{ receipt: string; transactionId: number }>;
}
