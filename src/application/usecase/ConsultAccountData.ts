import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import JwtPayload from "../dto/JwtPayload";

export default class ConsultAccountData implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayload, type: 1 | 2 | 3, digitable: string): Promise<any> {
    return this.baasFacade.consultAccountData(jwtPayload, type, digitable);
  }
}
