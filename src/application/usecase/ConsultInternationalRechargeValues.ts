import InternationalPhone from "../../domain/entity/InternationalPhone";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import UseCaseInterface from "../../domain/usecase/UseCase";

export default class ConsultInternationalRechargeValues implements UseCaseInterface {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(id: string, countryCode: number, number: number): Promise<any> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.baasFacade.consultInternationalRechargeValues(id, phone.countryCode, phone.number);
  }
}
