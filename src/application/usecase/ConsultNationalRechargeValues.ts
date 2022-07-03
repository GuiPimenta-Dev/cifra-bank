import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(stateCode: number, providerId: number): Promise<{ values: string[] }> {
    return this.baasFacade.consultNationalRechargeValues(stateCode, providerId);
  }
}
