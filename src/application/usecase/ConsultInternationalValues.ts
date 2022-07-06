import UseCaseInterface from "../../domain/application/UseCase";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import OutputDTO from "../dto/OutputDTO";

export default class ConsultInternationalValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(countryCode: number, number: number, token: AuthDTO): Promise<OutputDTO> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.baasFacade.consultInternationalValues(phone.countryCode, phone.number, token);
  }
}
