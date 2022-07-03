import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import JwtPayloadDTO from "../dto/JwtPayloadDTO";

export default class ConsultNationalProviders implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayloadDTO, stateCode: number): Promise<{ providers: string[] }> {
    return this.baasFacade.consultNationalProviders(jwtPayload, stateCode);
  }
}
