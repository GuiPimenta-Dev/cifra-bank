import BaasFacade from "../../domain/facade/BaasFacade";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultNationalProviders implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacade) {}

  async execute(id: string, stateCode: number): Promise<{ providers: string[] }> {
    return this.baasFacade.consultNationalProviders(id, stateCode);
  }
}
