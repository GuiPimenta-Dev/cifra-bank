import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import JwtPayloadDTO from "../dto/JwtPayloadDTO";

export default class ConsultAccountData implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayloadDTO, type: number, digitable: string): Promise<any> {
    return this.baasFacade.consultAccountData(jwtPayload, type, digitable);
  }
}
