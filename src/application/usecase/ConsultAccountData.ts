import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import TokenDTO from "../dto/TokenDTO";

export default class ConsultAccountData implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(type: number, digitable: string, token: TokenDTO): Promise<any> {
    return this.baasFacade.consultAccountData(type, digitable, token);
  }
}
