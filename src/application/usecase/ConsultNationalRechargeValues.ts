import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(stateCode: number, providerId: number): Promise<{ values: string[] }> {
    return this.baasFacade.consultNationalRechargeValues(stateCode, providerId);
  }
}
