import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class ConsultNationalProviders implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(stateCode: number): Promise<{ providers: string[] }> {
    return this.baasFacade.consultNationalProviders(stateCode);
  }
}
