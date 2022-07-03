import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import JwtPayloadDTO from "../dto/JwtPayloadDTO";

export default class ConsultAvailableCountries implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayloadDTO, page: number): Promise<{ countries: any }> {
    return await this.baasFacade.consultAvailableCountries(jwtPayload, page);
  }
}
