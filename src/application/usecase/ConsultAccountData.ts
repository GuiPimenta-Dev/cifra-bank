import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class ConsultAccountData implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(type: number, digitable: string): Promise<any> {
    return this.baasFacade.consultAccountData(type, digitable);
  }
}
