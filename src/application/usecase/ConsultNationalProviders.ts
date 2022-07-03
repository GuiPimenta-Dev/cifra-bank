import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import TokenDTO from "../dto/TokenDTO";

export default class ConsultNationalProviders implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }
  async execute(stateCode: number, token: TokenDTO): Promise<{ providers: string[] }> {
    return this.baasFacade.consultNationalProviders(stateCode, token);
  }
}
