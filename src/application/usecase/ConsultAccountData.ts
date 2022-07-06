import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import OutputDTO from "../dto/OutputDTO";
import TokenDTO from "../dto/TokenDTO";

export default class ConsultAccountData implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(type: number, digitable: string, token: TokenDTO): Promise<OutputDTO> {
    return this.baasFacade.consultAccountData(type, digitable, token);
  }
}
