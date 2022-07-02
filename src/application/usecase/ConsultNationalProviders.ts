import { JwtPayload } from "jsonwebtoken";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultNationalProviders implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayload, stateCode: number): Promise<{ providers: string[] }> {
    return this.baasFacade.consultNationalProviders(jwtPayload, stateCode);
  }
}
