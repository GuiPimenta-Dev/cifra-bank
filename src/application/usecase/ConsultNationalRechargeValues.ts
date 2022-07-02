import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultNationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(id: string, stateCode: number, providerId: number): Promise<{ values: string[] }> {
    return this.baasFacade.consultNationalRechargeValues(id, stateCode, providerId);
  }
}
