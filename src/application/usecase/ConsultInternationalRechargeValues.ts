import InternationalPhone from "../../domain/entity/InternationalPhone";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";
import JwtPayload from "../dto/JwtPayload";

export default class ConsultInternationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(jwtPayload: JwtPayload, countryCode: number, number: number): Promise<any> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.baasFacade.consultInternationalRechargeValues(jwtPayload, phone.countryCode, phone.number);
  }
}
