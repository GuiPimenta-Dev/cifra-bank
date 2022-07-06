import UseCaseInterface from "../../domain/application/UseCase";
import BaasFacadeInterface from "../../domain/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import AuthDTO from "../dto/AuthDTO";
import OutputDTO from "../dto/OutputDTO";

export default class ConsultInternationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(countryCode: number, number: number, token: AuthDTO): Promise<OutputDTO> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.baasFacade.consultInternationalRechargeValues(phone.countryCode, phone.number, token);
  }
}
